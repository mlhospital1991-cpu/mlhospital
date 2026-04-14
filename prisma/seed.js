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
      permissions: JSON.stringify(["view_all", "edit_status", "forward", "delete", "manage_users"]),
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
        permissions: JSON.stringify(["view_all", "edit_status", "forward"]),
      },
    });
  }

  console.log("Database seeded successfully with Admin and Doctors.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
