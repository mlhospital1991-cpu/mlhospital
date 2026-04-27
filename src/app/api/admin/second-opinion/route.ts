import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const requests = await prisma.secondOpinion.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // This route should be in [id]/route.ts, but I'll make a unified one for now or just the main one
  return NextResponse.json({ error: "Use [id] route" }, { status: 400 });
}
