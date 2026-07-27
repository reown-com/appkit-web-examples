import { NextRequest, NextResponse } from "next/server";
import { verifyNonce } from "@/lib/server/nonce";
import { setSessionCookie } from "@/lib/server/session";
import { verifyForChain } from "@/siwx/verifiers";

export const runtime = "nodejs";

interface VerifyBody {
  data: {
    accountAddress: string;
    chainId: string;
    nonce: string;
  };
  message: string;
  signature: string;
}

export async function POST(req: NextRequest) {
  let body: VerifyBody;
  try {
    body = (await req.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { data, message, signature } = body;
  const missing: string[] = [];
  if (!data?.accountAddress) missing.push("data.accountAddress");
  if (!data?.chainId) missing.push("data.chainId");
  if (!data?.nonce) missing.push("data.nonce");
  if (!message) missing.push("message");
  if (!signature) missing.push("signature");
  if (missing.length) {
    console.warn("[siwx/verify] missing fields:", missing, "received:", {
      hasData: !!data,
      dataKeys: data ? Object.keys(data) : [],
      messageLen: message?.length,
      signatureLen: signature?.length,
    });
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    if (!verifyNonce(data.nonce, data.chainId, data.accountAddress)) {
      return NextResponse.json(
        { error: "Invalid or expired nonce" },
        { status: 401 },
      );
    }

    const ok = await verifyForChain(data.chainId, {
      message,
      signature,
      address: data.accountAddress,
    });

    if (!ok) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    await setSessionCookie({
      chainId: data.chainId,
      address: data.accountAddress,
      message,
      signature,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verify failed";
    console.error("[siwx/verify]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
