import User from "../models/user";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!User) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    blogs:[]
  });
  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user: user });
};

export const login = async (req, res,next) => {
  const { email, password } = req.body;
  let existingUser;
 try{
    existingUser = await User.findOne({email})
 }
 catch (err) {
    return console.log(err)
 }
 if(!existingUser || !password || !email ){
    return res.status(404).json({message:"User does not exist"})   
 }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({existingUser:existingUser})
};

