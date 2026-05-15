import React from "react";
import prisma from "@/lib/prisma";
import GalleryClient from "@/components/gallery/GalleryClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Fetch images directly on the server (SSR)
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" }
  });

  // Convert to plain objects for props
  const plainImages = JSON.parse(JSON.stringify(images));

  return <GalleryClient initialImages={plainImages} />;
}
