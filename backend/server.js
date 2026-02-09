// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Middleware (Allows frontend to talk to backend)
app.use(cors());
app.use(express.json());

// 1. DATABASE CONNECTION (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 2. DEFINE DATA MODELS
// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  image: String,
  link: String
});
const Project = mongoose.model('Project', ProjectSchema);

// 3. API ROUTES

// GET: Fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    // If no projects exist, return dummy data for the portfolio
    const projects = await Project.find();
    if (projects.length === 0) {
      return res.json([
        {
          _id: "1",
          title: "Event Website",
          description: "A Planning website that showcase upconing events.",
          tags: ["Next.js", "Three.js", "Stripe"],
          image: "https://plan-kohl-six.vercel.app/farm.jpeg",
          link: "https://plan-kohl-six.vercel.app/"
        },
        {
          _id: "2",
          title: "To do list",
          description: "To do list",
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
  
  // Create a transporter (using Gmail as an example)
  // For production, use a service like SendGrid
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  // 👇 THIS IS THE MAGIC LINE THAT FIXES IT
  family: 4 
});

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

// 4. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));