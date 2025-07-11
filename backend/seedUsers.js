const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb+srv://dpsayush2004:QO4xoFm1ma1uB6uR@autoxperiocluster.4prqzeq.mongodb.net/autoxperio?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Updated users with secure emails & passwords
const users = [
  { email: "arsh@autoxperio.com", password: "arsh_autoxperio123#", role: "customer" },
  { email: "priyank@autoxperio.com", password: "priyank_autoxperio123#", role: "customer" },
  { email: "ayush@autoxperio.com", password: "ayush_autoxperio123#", role: "customer" },
  { email: "shubham@autoxperio.com", password: "shubham_autoxperio123#", role: "customer" },
  { email: "neel@autoxperio.com", password: "neel_autoxperio123#", role: "customer" },
  { email: "abhishek@autoxperio.com", password: "abhishek_autoxperio123#", role: "customer" },
  { email: "utkarsh@autoxperio.com", password: "utkarsh_autoxperio123#", role: "customer" }
];

// Insert or update users
async function insertUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const existing = await User.findOne({ email: user.email });
    if (existing) {
      existing.password = hashedPassword;
      existing.role = user.role;
      await existing.save();
      console.log(`🔄 Updated: ${user.email}`);
    } else {
      const newUser = new User({
        email: user.email,
        password: hashedPassword,
        role: user.role
      });

      await newUser.save();
      console.log(`✅ Inserted: ${user.email}`);
    }
  }

  mongoose.disconnect();
}

insertUsers();

