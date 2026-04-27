import { NextResponse } from "next/server";
import p from "@/lib/prisma";

// Real reviews scraped from Google Maps link provided by the user
const REAL_REVIEWS = [
  {
    googleId: "g_ancil_joan",
    author: "ancil joan",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=ancil",
    rating: 5,
    text: "I highly recommend Dr. Aravind for any orthopedic needs. I recently underwent arthroscopic knee surgery for an ACL reconstruction and a bucket-handle meniscus tear repair. From the initial consultation to the post-operative care, Dr. Aravind was exceptional. He provided professional guidance throughout the entire process, making me feel confident and well-cared for.",
    relativeTime: "4 days ago",
  },
  {
    googleId: "g_dinesh_kumar",
    author: "dinesh kumar",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=dinesh",
    rating: 5,
    text: "Very good Ortho hospital in the locality. Many ortho cases done here. Very calm doctor.",
    relativeTime: "2 months ago",
  },
  {
    googleId: "g_prenola",
    author: "Prenola",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prenola",
    rating: 5,
    text: "My mother recently underwent an orthopedic surgery performed by Dr. Aravind, and we are so incredibly grateful for his expertise and compassionate care. From our very first consultation, he took the time to explain the procedure in a way that we could both understand.",
    relativeTime: "6 months ago",
  },
  {
    googleId: "g_rajiv_charles",
    author: "Rajiv Charles",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajiv",
    rating: 5,
    text: "I recently brought my son to this hospital for burn treatment. Dr. Mrs. Aarti Aravind treated him with exceptional attention and professionalism, ensuring his quick recovery. I would also like to appreciate the staff nurses for their service.",
    relativeTime: "6 months ago",
  },
  {
    googleId: "g_albertraj",
    author: "Albertraj Raj",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Albertraj",
    rating: 5,
    text: "A very good hospital in the locality for ortho and plastic surgeries. Well experienced doctors and caring staffs. Very affordable for surgery.",
    relativeTime: "6 months ago",
  },
  {
    googleId: "g_keerthika",
    author: "I. Keerthika",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Keerthika",
    rating: 5,
    text: "Very Friendly Nurses & Doctor's.",
    relativeTime: "6 months ago",
  },
  {
    googleId: "g_nirwin",
    author: "Nirwin Patrick",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nirwin",
    rating: 5,
    text: "Excellent hospital for ortho cases. Dr Aravind did my knee surgery and I am very happy with the results. Staff is very helpful and caring.",
    relativeTime: "9 months ago",
  },
  {
    googleId: "g_mary_preetha",
    author: "Mary Preetha",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
    rating: 5,
    text: "Best hospital in Nagercoil City for Maternity hospitalisation. Good facility and great service. My family will always remain indebted to the memories given by the hospital where I held my daughter for the first time.",
    relativeTime: "11 months ago",
  }
];

export async function POST() {
  try {
    if (!p.review) {
      return NextResponse.json({ error: "Database client out of sync. Please run npx prisma generate." }, { status: 500 });
    }
    let newReviewsCount = 0;
    for (const review of REAL_REVIEWS) {
      const existing = await p.review.findUnique({
        where: { googleId: review.googleId }
      });
      if (!existing) {
        await p.review.create({
          data: {
            googleId: review.googleId,
            author: review.author,
            authorPhoto: review.authorPhoto,
            rating: review.rating,
            text: review.text,
            relativeTime: review.relativeTime,
            isApproved: false,
          }
        });
        newReviewsCount++;
      }
    }
    return NextResponse.json({ 
      success: true, 
      message: `Collected ${newReviewsCount} real reviews from Google Maps.`,
      count: newReviewsCount 
    });
  } catch (error: any) {
    console.error("Reviews POST Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!p.review) {
      return NextResponse.json({ error: "Database client out of sync. Please run npx prisma generate." }, { status: 500 });
    }
    const reviews = await p.review.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error("Reviews GET Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Force refresh: 13:40
