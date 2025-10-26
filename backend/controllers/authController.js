const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate JWT TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {
  // Registration logic here
  console.log("KELGAN BODY:", req.body);
  const { fullName, email, password, profileImageUrl } = req.body;

  //Validation: Check for mising fields

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }

  try {
    //Check if email already exists
console.log("BODY:", req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    //Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//login User
exports.loginUser = async (req, res) => {
  // Login logic here

  const { email, password } = req.body;

  if(!email || !password) {
    return  res.status(400).json({ message: "All fields are required" });
  }

  try{
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  }catch(error){
    return res.status(500).json({ message: "Error login user", error: error.message });
  }
};

//Get User Info
exports.getUserInfo = async (req, res) => {
  // Get User Info logic here

  try {
  const user = await User.findById(req.user.id).select("-password");

  if(!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
  }catch(error){
    return res.status(500).json({ message: "Error getting user info", error: error.message });
  }
};

