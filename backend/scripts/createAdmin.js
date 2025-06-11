const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Admin = require('../models/Admin');

// Get credentials from command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log('❌ Please provide username and password as arguments:');
  console.log('node createAdmin.js <username> <password>');
  process.exit(1);
}

const [username, password] = args;

// Validate input
if (username.length < 3) {
  console.log('❌ Username must be at least 3 characters long');
  process.exit(1);
}

if (password.length < 6) {
  console.log('❌ Password must be at least 6 characters long');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

async function createAdmin() {
  try {
    // Check if admin already exists
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('❌ Admin with this username already exists.');
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();
    console.log('\n✅ Admin user created successfully!');
    console.log('\nCredentials:');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('\n⚠️ Please save these credentials securely.');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin(); 