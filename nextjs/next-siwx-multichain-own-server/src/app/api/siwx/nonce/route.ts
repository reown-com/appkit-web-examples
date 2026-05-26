import { NextRequest, NextResponse } from "next/server";
import { issueNonce } from "@/lib/server/nonce";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const chainId = req.nextUrl.searchParams.get("chainId");
  const address = req.nextUrl.searchParams.get("address");

  if (!chainId || !address) {
    return NextResponse.json(
      { error: "chainId and address are required" },
      { status: 400 },
    );
  }

  try {
    const nonce = issueNonce(chainId, address);
    return NextResponse.json({ nonce });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to issue nonce";
    console.error("[siwx/nonce]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
