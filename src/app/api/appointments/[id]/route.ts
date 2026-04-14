import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// PATCH /api/appointments/[id] - Update status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check for permission
  const permissions = session.permissions as string[];
  if (!permissions.includes("edit_status") && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden: Missing edit_status permission" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const { id } = await params;

    // Ownership check for Doctors
    if (session.role === "DOCTOR") {
      const appointment = await prisma.appointment.findUnique({ where: { id } });
      if (appointment?.doctor !== session.name) {
        return NextResponse.json({ error: "Forbidden: You can only update your own appointments" }, { status: 403 });
      }
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

// DELETE /api/appointments/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check for permission
  const permissions = session.permissions as string[];
  if (!permissions.includes("delete") && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden: Missing delete permission" }, { status: 403 });
  }

  try {
    const { id } = await params;

    // Ownership check for Doctors
    if (session.role === "DOCTOR") {
      const appointment = await prisma.appointment.findUnique({ where: { id } });
      if (appointment?.doctor !== session.name) {
        return NextResponse.json({ error: "Forbidden: You can only delete your own appointments" }, { status: 403 });
      }
    }

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}
