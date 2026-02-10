// 1. DNS FIX (Backup)
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

// 2. IMPORTS
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 4. DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 5. MODEL
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  image: String,
  link: String
});
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// 6. EMAIL CONFIG (Simplified)
// We rely on the Render Environment Variable to handle the connection type now.
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// 🔍 VERIFY CONNECTION
transporter.verify((error, success) => {
  if (error) {
    console.log("🚨 EMAIL ERROR:", error);
  } else {
    console.log("✅ READY TO SEND EMAILS");
  }
});

// --- ROUTES ---

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length === 0) {
      return res.json([
        {
          _id: "1",
          title: "Event Website",
          description: "A Planning website that showcases upcoming events.",
          tags: ["Next.js", "Three.js", "Stripe"],
          image: "https://plan-kohl-six.vercel.app/farm.jpeg",
          link: "https://plan-kohl-six.vercel.app/"
        },
        {
          _id: "2",
          title: "To Do List",
          description: "Simple task management app.",
          tags: ["HTML", "CSS", "JS"],
          image: "https://specials-images.forbesimg.com/dam/imageserve/1092571024/960x0.jpg?fit=scale",
          link: "https://to-do-app-two-lilac.vercel.app/"
        }
      ]);
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📩 New message from: ${email}`);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Email Failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));