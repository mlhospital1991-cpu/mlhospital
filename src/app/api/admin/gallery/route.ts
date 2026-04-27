import { NextResponse } from "next/server";
import p from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("GET /api/admin/gallery - Fetching images...");
    const images = await p.galleryImage.findMany({
      orderBy: { order: "asc" }
    });
    console.log(`GET /api/admin/gallery - Found ${images.length} images`);
    return NextResponse.json(images);
  } catch (error: any) {
    console.error("GET /api/admin/gallery - Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const image = await p.galleryImage.create({
      data: {
        url: body.url,
        caption: body.caption,
        collection: body.collection,
        aspect: body.aspect || "square",
        order: body.order || 0
      }
    });
    return NextResponse.json(image);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
