import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminDashboard, { UserProfile } from "@/components/admin/AdminDashboard";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    return <AdminLoginForm />;
  }

  // Fetch ALL initial data on the server for instant loading
  let appointmentWhere: any = {};
  if (session.role === "DOCTOR") {
    appointmentWhere = {
      OR: [
        { doctor: session.name },
        { doctor: "EMERGENCY" }
      ]
    };
  }

  let appointments, doctors, reviews, users, gallery, secondOpinions;

  try {
    [appointments, doctors, reviews, users, gallery, secondOpinions] = await Promise.all([
      prisma.appointment.findMany({ 
        where: appointmentWhere,
        orderBy: { createdAt: "desc" }, 
        take: 100 
      }),
      prisma.doctor.findMany({ orderBy: { order: "asc" } }),
      prisma.review.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.galleryImage.findMany({ orderBy: { order: "asc" } }),
      prisma.secondOpinion.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
    ]);
  } catch (error) {
    console.error("Database connection error:", error);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[48px] shadow-xl border border-slate-100 max-w-md text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <AlertTriangle size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Database Connection Offline</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We couldn't reach your Neon database server. This often happens if the database is "sleeping" on the free tier. Please wait a few seconds and try refreshing.
          </p>
          <a 
            href="/admin"
            className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all text-center"
          >
            Retry Connection
          </a>
        </div>
      </div>
    );
  }

  // Convert to plain objects and map permissions correctly
  const plainData = JSON.parse(JSON.stringify({
    appointments,
    doctors,
    reviews,
    users: users.map(u => ({
      ...u,
      permissions: typeof u.permissions === 'string' ? JSON.parse(u.permissions) : u.permissions
    })),
    gallery,
    secondOpinions
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
