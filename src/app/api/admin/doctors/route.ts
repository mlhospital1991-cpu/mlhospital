import { NextResponse } from "next/server";
import p from "@/lib/prisma";

export async function GET() {
  try {
    const doctors = await p.doctor.findMany({
      orderBy: { order: "asc" }
    });
    return NextResponse.json(doctors);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const doctor = await p.doctor.create({
      data: body
    });
    return NextResponse.json(doctor);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
