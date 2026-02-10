// 1. DNS FIX (MUST BE AT THE VERY TOP)
// This forces your server to use IPv4, which fixes the Gmail connection error
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

// 2. IMPORTS & CONFIG
require('dotenv').config(); // Load the .env file (passwords) FIRST
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Import the email library

const app = express();

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 4. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 5. DEFINE PROJECT MODEL
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  image: String,
  link: String
});
// Prevent "OverwriteModelError" if the code re-runs
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// 6. CONFIGURE EMAIL (GLOBAL)
// We define this ONCE here, so we don't recreate it every time someone emails.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Built-in Gmail service knows the host/port automatically
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// --- ROUTES ---

// GET: Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    
    // If database is empty, return your hardcoded fallback data
    if (projects.length === 0) {
      console.log("📂 Database empty, returning fallback projects.");
      return res.json([
        {
          _id: "1",
          title: "Event Website",
          description: "A Planning website that showcase upcoming events.",
          tags: ["Next.js", "Three.js", "Stripe"],
          image: "https://plan-kohl-six.vercel.app/farm.jpeg",
          link: "https://plan-kohl-six.vercel.app/"
        },
        {
          _id: "2",
          title: "To do list",
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

// POST: Handle Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📩 Attempting to send email from: ${email}`);

  const mailOptions = {
    from: email, // This shows who the email is "from"
    to: process.env.EMAIL_USER, // Sent TO you
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("❌ Email Failed:", error);
    res.status(500).json({ success: false, message: "Email failed to send.", error: error.message });
  }
});

// 7. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));