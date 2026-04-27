import { NextResponse } from "next/server";
import p from "@/lib/prisma";

export async function GET() {
  try {
    if (!p.review) {
      return NextResponse.json({ error: "Database client out of sync. Please run npx prisma generate." }, { status: 500 });
    }
    const reviews = await p.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error("Public Reviews GET Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Force refresh: 13:26
