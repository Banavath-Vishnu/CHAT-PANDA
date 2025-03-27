import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { renameSync } from "fs";

import NewUser from "../schemas/userSignupschema.js";

const secret = "wy8vcryeo8cbpiw4816481234567!@#$fgcx";
const maxAge = 3 * 24 * 60 * 60 * 60;

const createToken = (email, id) => {
  return jwt.sign(
    {
      email: email,
      id: id,
    },
    secret,
    { expiresIn: maxAge }
  );
};

export const signUpController = async (req, res) => {
  try {
    const existingUser = await NewUser.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(201).json({ message: "User already exists" });
    }
    const newUser = new NewUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    res.cookie("jwt", createToken(newUser.email, newUser._id), {
      httpOnly: true,
      secure: true,
      maxAge: maxAge,
    });

    return res.status(200).json({
      message: "User created successfully",
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
      profileSetup: newUser.profileSetup,
      bio: newUser.bio,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.log("error in signUpController from authController.js\n", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await NewUser.findOne({ email });

    if (!existingUser) {
      return res.status(201).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res
        .status(201)
        .json({ message: "incorrect username or password" });
    } else {
      res.cookie("jwt", createToken(existingUser.email, existingUser._id), {
        httpOnly: true,
        secure: true,
        maxAge: maxAge,
      });
      return res.status(200).json({
        message: "User logged in successfully",
        name: existingUser.name,
        email: existingUser.email,
        profilePic: existingUser.profilePic,
        profileSetup: existingUser.profileSetup,
        bio: existingUser.bio,
        createdAt: existingUser.createdAt,
      });
    }
  } catch (error) {
    console.log("error in loginController from authController.js\n", error);
    res.status(500).json({ message: error.message });
  }
};

export const profileSetup = async (req, res) => {
  try {
    const email = req.email;
    const { name, bio } = req.body;

    if (name === "" || email === undefined) {
      return res.status(201).json({ message: "Name and email are required" });
    }

    await NewUser.findOneAndUpdate(
      { email: email },
      { name: name, bio: bio, profileSetup: true }
    );
    return res
      .status(200)
      .json({ message: "Profile updated successfully", bio, name });
  } catch (err) {
    console.log("error in profileSetup from authController.js\n", err);
  }
};

export const imageSetUpContrller = async (req, res) => {
  const email = req.email;

  if (!req.file) {
    return res.status(201).json({ message: "No image is uploaded" });
  }
  try {
    const date = Date.now();
    const originalname = req.file.originalname.replace(/\s+/g, "_");
    const newPath = `${req.file.path}-${date}-${originalname}`;
    renameSync(req.file.path, newPath, (err) => {
      console.log("error in renaming the file\n", err);
    });
    const userProfilePic = `http://localhost:3000/${newPath}`;

    const existingUser = await NewUser.findOneAndUpdate(
      { email },
      { profilePic: userProfilePic },
      { new: true }
    );

    return res.status(201).send({
      message: "Profile Image Updated Successfully",
      profilePic: existingUser.profilePic,
    });
  } catch (err) {
    console.log("error in imagesetupController.js", err);
  }
};

export const deleteImageController = async (req, res) => {
  const email = req.email;

  try {
    const existing = await NewUser.findOneAndUpdate(
      { email },
      { profilePic: "" },
      { new: true }
    );
    return res.status(201).send({
      message: "Profile Image Deleted Successfully",
      profilePic: existing.profilePic,
    });
  } catch (err) {
    console.log("error in deleting the profile pic\n", err);
  }
};

export const getUserDetailsController = async (req, res) => {
  const email = req.email;

  try {
    const existingUser = await NewUser.findOne({ email }).select("-password");
    return res.status(200).json(existingUser);
  } catch (err) {
    console.log(
      "error in getUserDetailsController from auth controller.js\n",
      err
    );
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const email = req.email;

    await NewUser.findOneAndDelete({ email });
    res.cookie("jwt", "", { httpOnly: true, secure: true, maxAge: 1 });

    res.status(200).json({ message: "Account Deleted Successfully" });
  } catch (err) {
    console.error(
      "Error in deleteUserController from auth controller.js\n",
      err
    );

    // Send an error response
    return res.status(500).json({ message: "deleteUserController Failed" });
  }
};

export const logOutController = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, secure: true, maxAge: 1 });

    return res.status(200).json({ message: "Log Out Successful" });
  } catch (err) {
    console.error("Error in logOutController from auth controller.js\n", err);

    return res.status(500).json({ message: "Log Out Failed" });
  }
};
