const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function createSuperAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    const Admin = mongoose.model(
      "Admin",
      new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        role: String,
        isActive: Boolean,
      })
    );

    const hashedPassword = await bcrypt.hash("admin123", 12);

    const superAdmin = new Admin({
      username: "superadmin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "super_admin",
      isActive: true,
    });

    await superAdmin.save();
    console.log("Super admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating super admin:", error);
    process.exit(1);
  }
}

createSuperAdmin();
