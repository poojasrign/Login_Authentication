const express = require("express");
const User = require("../models/User");
const router = express.Router();


// ==========================
// SIGNUP
// ==========================

router.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      confirmPassword
    } = req.body;


    // Check empty fields

    if (!name || !email || !password || !confirmPassword) {

      return res.status(400).json({
        message: "Please fill all fields"
      });

    }


    // Check password

    if (password !== confirmPassword) {

      return res.status(400).json({
        message: "Passwords do not match"
      });

    }


    // Check existing email

    const existingUser = await User.findOne({
      email: email
    });


    if (existingUser) {

      return res.status(400).json({
        message: "Email already exists"
      });

    }


    // Create user

    const newUser = new User({
      name: name,
      email: email,
      password: password
    });


    // Save user

    await newUser.save();


    res.status(201).json({
      message: "Signup successful"
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


// ==========================
// LOGIN
// ==========================

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Check fields

    if (!email || !password) {

      return res.status(400).json({
        message: "Please enter email and password"
      });

    }


    // Find user

    const user = await User.findOne({
      email: email
    });


    if (!user) {

      return res.status(400).json({
        message: "Invalid email or password"
      });

    }


    // Check password

    if (user.password !== password) {

      return res.status(400).json({
        message: "Invalid email or password"
      });

    }


    // Login successful

    res.status(200).json({

      message: "Login successful",

      user: {
        name: user.name,
        email: user.email
      }

    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});


module.exports = router;