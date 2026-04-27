import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ReviewsSection from "@/components/ReviewsSection";
import Doctors from "@/components/Doctors";
import Services from "@/components/Services";
import { RefreshCw } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Safety check for generated client sync
  if (!(prisma as any).doctor || !(prisma as any).review) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-10 text-center">
        <div className="max-w-md bg-white p-12 rounded-[40px] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="animate-spin" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Database Out of Sync</h2>
          <p className="text-slate-500 mb-8 font-medium">Please stop your server and run <code className="bg-slate-100 px-2 py-1 rounded">npx prisma generate</code> to register the new models.</p>
        </div>
      </div>
    );
  }

  try {
    const [reviews, doctors] = await Promise.all([
      prisma.review.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: "desc" }
      }),
      prisma.doctor.findMany({
        orderBy: { order: "asc" }
      })
    ]);

    // Convert Prisma objects to plain JS objects for props
    const plainReviews = JSON.parse(JSON.stringify(reviews));
    const plainDoctors = JSON.parse(JSON.stringify(doctors));

    return (
      <main className="min-h-screen bg-white">
        <Hero />
        <Features />
        <ReviewsSection reviews={plainReviews} />
        <Doctors doctors={plainDoctors} />
        <Services />
      </main>
    );
  } catch (error) {
    console.error("Database fetch error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-10 text-center">
        <div className="max-w-md bg-white p-12 rounded-[40px] shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="animate-spin" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Database Table Missing</h2>
          <p className="text-slate-500 mb-8 font-medium">Your database is out of sync. Please stop the server and run:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl text-xs font-mono mb-4 text-left">
            npx prisma db push
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Then refresh the page</p>
        </div>
      </div>
    );
  }
}
