import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const patientName = formData.get("patientName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const age = formData.get("age") ? parseInt(formData.get("age") as string) : null;
    const gender = formData.get("gender") as string;
    const symptoms = formData.get("symptoms") as string;
    const currentDiagnosis = formData.get("currentDiagnosis") as string;
    const questions = formData.get("questions") as string;
    
    // Handle files
    const files = formData.getAll("reports") as File[];
    const reportUrls: string[] = [];
    
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const path = require("path").join(process.cwd(), "public", "reports", filename);
        
        const fs = require("fs/promises");
        await fs.writeFile(path, buffer);
        
        reportUrls.push(`/reports/${filename}`);
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
