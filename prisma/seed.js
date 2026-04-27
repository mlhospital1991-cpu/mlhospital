const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const commonPassword = "mlhospitaldoctor2026";
  const hashedDoctorPassword = await bcrypt.hash(commonPassword, 10);
  const hashedAdminPassword = await bcrypt.hash("mlhospitaladmin2026", 10);

  // 1. Admin
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedAdminPassword,
      name: "Master Admin",
      role: "ADMIN",
      permissions: JSON.stringify(["view_all", "edit_status", "forward", "delete", "manage_users", "manage_doctors", "manage_gallery", "manage_reviews"]),
    },
  });

  // 2. Doctors
  const docs = [
    { username: "dr_manimekalai", name: "Dr. S. Manimekalai" },
    { username: "dr_radhakrishnan", name: "Dr. M. Radhakrishnan" },
    { username: "dr_aravind", name: "Dr. R. Aravind" },
    { username: "dr_keerthana", name: "Dr. Keerthana" },
    { username: "dr_aarthy", name: "Dr. Aarthy" },
  ];

  for (const doc of docs) {
    await prisma.user.upsert({
      where: { username: doc.username },
      update: {},
      create: {
        username: doc.username,
        password: hashedDoctorPassword,
        name: doc.name,
        role: "DOCTOR",
        permissions: JSON.stringify(["view_all", "edit_status", "forward", "delete", "manage_doctors", "manage_gallery", "manage_reviews"]),
      },
    });
  }

  // 3. Detailed Doctor Profiles for Frontend
  const doctorProfiles = [
    {
      name: "Dr. M. Radhakrishnan",
      specialty: "Retd. Dean Kanyakumari medical college, Consultant plastic and reconstructive surgeon",
      qualification: "M.S.,Mch. Plastic surgery",
      experience: "40 years of excellence",
      image: "/doctors/dr-radhakrishnan.jpg",
      tags: ["40 years of excellence", "burns specialist", "liposuction", "flap cover", "skin graft", "microssurgery", "trauma specialist"],
      whatsapp: "918885553193",
      order: 1
    },
    {
      name: "Dr. S. Manimekalai",
      specialty: "Director of ML Hospital, Consultant obstetrician and gynecologist",
      qualification: "M.D.,DGO",
      experience: "40 years of excellence",
      image: "/doctors/dr-manimekalai.jpg",
      tags: ["40 years of excellence", "pregnancy", "obstetrics", "gynecology", "Laparoscopy specialist"],
      whatsapp: "918885553193",
      order: 2
    },
    {
      name: "Dr. R. Keerthana",
      specialty: "Consultant gynaecologist & laparoscopic surgeon",
      qualification: "MS (OBG)., DNB OG,PDF( Endogynaecology)",
      experience: "Infertility Specialist",
      image: "/doctors/dr-keerthana.jpg",
      tags: ["infertility specialist", "pregnancy", "laparoscopy specialist", "fertility"],
      whatsapp: "918885553193",
      order: 3
    },
    {
      name: "Dr. R. Aravind",
      specialty: "Consultant Orthopaedic surgeon",
      qualification: "M.S.,Ortho.",
      experience: "Trauma Specialist",
      image: "/doctors/dr-aravind.jpg",
      tags: ["trauma specialist", "fracture", "spine surgery", "joint replacement", "arthroscopy", "key hole surgery", "deformity correction"],
      whatsapp: "918885553193",
      order: 4
    },
    {
      name: "Dr. B. Aarthy",
      specialty: "Consultant plastic and cosmetic surgeon",
      qualification: "M.S.,MCH ( plastic surgery)",
      experience: "Cosmetic Surgery Expert",
      image: "/doctors/dr-aarthy.jpg",
      tags: ["cosmetic surgery", "aesthetic surgery", "flap cover", "microsurgery", "trauma and reconstructive surgery"],
      whatsapp: "918885553193",
      order: 5
    }
  ];

  for (const profile of doctorProfiles) {
    await prisma.doctor.upsert({
      where: { id: `seed_doc_${profile.order}` }, // Unique-ish ID for seeding
      update: profile,
      create: {
        id: `seed_doc_${profile.order}`,
        ...profile
      }
    });
  }

  // 4. Initial Gallery Images
  const gallerySeed = [
    { url: "/WhatsApp Image 2026-04-10 at 4.44.28 PM (1).jpeg", caption: "Main Entrance", collection: "Infrastructure", aspect: "wide", order: 1 },
    { url: "/WhatsApp Image 2026-04-10 at 4.44.28 PM.jpeg", caption: "Modern Building Interior", collection: "Infrastructure", aspect: "square", order: 2 },
    { url: "/WhatsApp Image 2026-04-10 at 4.44.29 PM (1).jpeg", caption: "State-of-the-art Equipment", collection: "Medical Care", aspect: "square", order: 3 },
    { url: "/WhatsApp Image 2026-04-10 at 4.44.29 PM.jpeg", caption: "Patient Ward", collection: "Medical Care", aspect: "tall", order: 4 },
    { url: "/WhatsApp Image 2026-04-10 at 4.44.30 PM (1).jpeg", caption: "Trauma Unit", collection: "Medical Care", aspect: "wide", order: 5 },
    { url: "/WhatsApp Image 2026-04-10 at 4.44.30 PM (2).jpeg", caption: "Surgical Theatre", collection: "Medical Care", aspect: "square", order: 6 },
    { url: "/WhatsApp Image 2026-04-10 at 4.44.31 PM.jpeg", caption: "Emergency Response", collection: "Medical Care", aspect: "square", order: 7 },
  ];

  for (let i = 0; i < gallerySeed.length; i++) {
    const img = gallerySeed[i];
    await prisma.galleryImage.upsert({
      where: { id: `seed_img_${i}` },
      update: img,
      create: { id: `seed_img_${i}`, ...img }
    });
  }

  console.log("Database seeded successfully with Admin, Staff, Doctors, and Gallery Collections.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
