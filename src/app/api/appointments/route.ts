import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/appointments - Fetch appointments (Role-based filtering)
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let whereClause = {};
    
    // Role-based filtering: Doctors see their own appointments + Emergencies
    if (session.role === "DOCTOR") {
      whereClause = {
        OR: [
          { doctor: session.name },
          { doctor: "EMERGENCY" }
        ]
      };
    }
    
    // Note: Other roles (ADMIN, NURSE) can see all by default, 
    // but specific permissions could be added here in the future.

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

// POST /api/appointments - Create a new appointment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, location, issue, doctor, date, time, opNumber } = body;

    if (!name || !doctor || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        name,
        location: location || null,
        issue: issue || null,
        doctor,
        date,
        time,
        opNumber: opNumber || null,
        status: body.status || "pending",
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error: any) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ 
      error: "Failed to save appointment",
      details: error.message 
    }, { status: 500 });
  }
}
