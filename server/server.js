const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// Test route

app.get("/", (req, res) => {

  res.send("Login Signup Backend is Running");

});


// Auth routes

app.use("/api/auth", authRoutes);


// MongoDB connection

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {

      console.log(
        `Server running on http://localhost:${process.env.PORT}`
      );

    });

  })

  .catch((error) => {

    console.log("MongoDB Connection Error");

    console.log(error);

  });