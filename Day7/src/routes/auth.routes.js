const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userModel = require("../models/user.model");

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
   const hash=crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({ name, email, password:hash });

    

    const token=jwt.sign(
      {
      id:user._id,
      email:user.email
      
    },
    process.env.JWT_SECRET,
  )

  res.cookie("token",token);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Unable to register user",
    });
  }
});
authRouter.post("/Protected", async (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "Protected route accessed successfully",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  const user = await userModel.findOne({ email, password });
  if (!user) {
    return res.status(404).json({
      message: "Invalid email ",
    });
  }

  const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid  password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
});


module.exports = authRouter;
