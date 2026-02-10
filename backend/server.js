// 1. Force IPv4 (Crucial for Render/Gmail)
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 4. Define Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String,
  tags: [String]
});
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// 5. Configure Email
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

// --- ROUTES ---

// GET Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    console.log(`📂 Found ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('❌ Project Fetch Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 👇 NEW: SEED ROUTE (Run this once to fill your database!)
app.get('/api/seed', async (req, res) => {
  const sampleProjects = [
    {
      title: "E-Commerce Dashboard",
      description: "A full-stack dashboard for managing products and orders.",
      image: "https://via.placeholder.com/300",
      link: "https://github.com",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Portfolio Website",
      description: "My personal developer portfolio built with Next.js.",
      image: "https://via.placeholder.com/300",
      link: "https://github.com",
      tags: ["Next.js", "Tailwind", "Framer Motion"]
    },
    {
      title: "Task Manager API",
      description: "A RESTful API for creating and managing daily tasks.",
      image: "https://via.placeholder.com/300",
      link: "https://github.com",
      tags: ["Express", "MongoDB", "JWT"]
    }
  ];

  try {
    await Project.deleteMany({}); // Clear old data
    await Project.insertMany(sampleProjects); // Add new data
    res.json({ message: "✅ Database seeded successfully! Refresh your portfolio." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST Contact (Send Email)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📩 New message attempt from: ${email}`);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('❌ EMAIL FAILED:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));