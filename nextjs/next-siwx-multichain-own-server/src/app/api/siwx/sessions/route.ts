import { NextRequest, NextResponse } from "next/server";
import { readSession } from "@/lib/server/session";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  let session: Awaited<ReturnType<typeof readSession>>;
  try {
    session = await readSession();
  } catch (err) {
    console.error("[siwx/sessions]", err);
    return NextResponse.json({ sessions: [] });
  }
  if (!session) return NextResponse.json({ sessions: [] });

  const chainId = req.nextUrl.searchParams.get("chainId");
  const address = req.nextUrl.searchParams.get("address");

  if (chainId && session.chainId !== chainId) {
    return NextResponse.json({ sessions: [] });
  }
  if (
    address &&
    session.address.toLowerCase() !== address.toLowerCase()
  ) {
    return NextResponse.json({ sessions: [] });
  }

  return NextResponse.json({
    sessions: [
      {
        data: {
          accountAddress: session.address,
          chainId: session.chainId,
        },
        message: session.message,
        signature: session.signature,
      },
    ],
  });
}
