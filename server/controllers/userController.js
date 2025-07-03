import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // validation
    if (!fullName || !username || !password || !gender || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    // Check the existence
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exist" });
    }

    // Encrypt password
    const hashedPaswword = await bcrypt.hash(password, 10);

    // Profile Photo
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create user
    await User.create({
      fullName,
      username,
      password: hashedPaswword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res
      .status(201)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validation
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check the existence
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    //  Password match
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    // Generate token
    const tokenData = {
      userId: user?._id,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Login success
    res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
      })
      .json({
        fullName: user?.fullName,
        username: user?.username,
        _id: user?._id,
        profilePhoto: user?.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;

    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
