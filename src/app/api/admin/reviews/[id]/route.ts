import { NextResponse } from "next/server";
import p from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isApproved } = body;

    if (!p.review) {
      console.error("Prisma 'review' model missing in PATCH [id]");
      return NextResponse.json({ error: "Database client out of sync. Please run npx prisma generate." }, { status: 500 });
    }

    const review = await p.review.update({
      where: { id },
      data: { isApproved }
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error("PATCH Review Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await p.review.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE Review Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Force refresh: 13:26
