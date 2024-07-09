const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.API_PORT);

const saltRounds = 10;
const secret = "234tyuklkjgfdsazx";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const upload = multer({ dest: "uploads/" });

mongoose
  .connect(
    "mongodb+srv://blog-one:YBN9GDC2b5SLSuEA@cluster0.yk3jl8m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.status(201).json(userDoc);
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Token generation failed" });
      }
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), (req, res) => {
  const { title, content } = req.body;
  const { file } = req;
  let newFilePath = "";

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    try {
      if (file) {
        const ext = path.extname(file.originalname);
        newFilePath = `${file.path}${ext}`;
        fs.rename(file.path, newFilePath, async (err) => {
          if (err) {
            console.error("File renaming error:", err.message);
            return res.status(500).json({ message: "File renaming failed" });
          }

          const postDoc = await Post.create({
            title,
            content,
            cover: newFilePath,
            author: info.id,
          });

          res.json(postDoc);
        });
      } else {
        const postDoc = await Post.create({
          title,
          content,
          author: info.id,
        });

        res.json(postDoc);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("author", "username"); // Ensure author info is populated
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate("author", "username"); // Ensure author info is populated
    res.json(postDoc);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/post/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { file } = req;

  let updatedFields = { title, content };

  if (file) {
    const ext = path.extname(file.originalname);
    const newFilePath = `${file.path}${ext}`;
    fs.rename(file.path, newFilePath, (err) => {
      if (err) {
        console.error("File renaming error:", err.message);
        return res.status(500).json({ message: "File renaming failed" });
      }
    });
    updatedFields.cover = newFilePath;
  }

  try {
    const postDoc = await Post.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.json(postDoc);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT);
}

module.exports = app;
