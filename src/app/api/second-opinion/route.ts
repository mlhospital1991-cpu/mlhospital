import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const patientName = formData.get("patientName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    
    // Fix: Handle empty string or invalid number for age
    const rawAge = formData.get("age") as string;
    const age = (rawAge && !isNaN(Number(rawAge))) ? Number(rawAge) : null;
    
    const gender = formData.get("gender") as string;
    const symptoms = formData.get("symptoms") as string;
    const currentDiagnosis = formData.get("currentDiagnosis") as string;
    const questions = formData.get("questions") as string;
    
    // Support both direct file uploads (small files) and client-side URLs (large files)
    const reportUrls: string[] = [];
    
    // 1. Check for client-side uploaded URLs first
    const clientUrls = formData.getAll("reportUrls") as string[];
    if (clientUrls.length > 0) {
      reportUrls.push(...clientUrls);
    }
    
    // 2. Fallback: Handle files via Vercel Blob (server-side)
    const files = formData.getAll("reports") as File[];
    if (files.length > 0) {
      for (const file of files) {
        if (file && file.size > 0) {
          try {
            const blob = await put(`reports/${Date.now()}-${file.name}`, file, {
              access: 'public',
            });
            reportUrls.push(blob.url);
          } catch (uploadError) {
            console.error("Blob Upload Error:", uploadError);
          }
        }
      }
    }

    if (!patientName || !email || !phone || !symptoms) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const secondOpinion = await prisma.secondOpinion.create({
      data: {
        patientName,
        email,
        phone,
        age,
        gender,
        symptoms,
        currentDiagnosis,
        questions,
        reportUrls,
        status: "pending",
      },
    });

    return NextResponse.json(secondOpinion, { status: 201 });
  } catch (error: any) {
    console.error("Error creating second opinion request:", error);
    return NextResponse.json({ 
      error: "Failed to submit request",
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await prisma.secondOpinion.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching second opinion requests:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}
