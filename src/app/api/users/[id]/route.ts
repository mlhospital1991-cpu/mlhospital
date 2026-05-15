import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// PATCH /api/users/[id] - Update user role/permissions (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const { role, permissions, name, password } = await request.json();

    const data: any = {
      role,
      name,
      permissions: permissions ? JSON.stringify(permissions) : undefined,
    };

    if (password && password.trim() !== "") {
      const { hashPassword } = await import("@/lib/auth");
      data.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      role: updatedUser.role,
      permissions: JSON.parse(updatedUser.permissions),
    });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete user (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;

    // Prevent admin from deleting themselves
    if (id === session.id) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
