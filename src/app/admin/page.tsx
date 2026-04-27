import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminDashboard, { UserProfile } from "@/components/admin/AdminDashboard";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    return <AdminLoginForm />;
  }

  // Fetch ALL initial data on the server for instant loading
  const [appointments, doctors, reviews, users, gallery] = await Promise.all([
    prisma.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.doctor.findMany({ orderBy: { order: "asc" } }),
    prisma.review.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.galleryImage.findMany({ orderBy: { order: "asc" } })
  ]);

  // Convert to plain objects and map permissions correctly
  const plainData = JSON.parse(JSON.stringify({
    appointments,
    doctors,
    reviews,
    users: users.map(u => ({
      ...u,
      permissions: typeof u.permissions === 'string' ? JSON.parse(u.permissions) : u.permissions
    })),
    gallery
  }));
  
  // Parse permissions for the current session user
  let currentPermissions: string[] = [];
  try {
    if (Array.isArray(session.permissions)) {
      currentPermissions = session.permissions;
    } else if (typeof session.permissions === "string") {
      if (session.permissions.startsWith("[")) {
        currentPermissions = JSON.parse(session.permissions);
      } else {
        currentPermissions = session.permissions.split(",").map((p: string) => p.trim());
      }
    }
  } catch (e) {
    console.error("Failed to parse permissions:", e);
  }

  const userProfile: UserProfile = {
    id: String(session.id),
    username: String(session.username),
    role: String(session.role),
    name: String(session.name),
    permissions: currentPermissions
  };

  return (
    <AdminDashboard 
      initialData={plainData}
      userProfile={userProfile} 
    />
  );
}
