import { userModel } from "../models/user.model.js";
import { generateToken } from "../utils/auth.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "User already exists",
      errors: [
        {
          path: "email",
          message: "User already exists",
        },
      ],
    });
  }

  const user = await userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const { accessToken, refreshToken } = generateToken({ userId: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(201).json({
    message: "user registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
    accessToken,
  });
};

export const loginController = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({
    email,
  });
  let passwordHash = await bcrypt.hash(password, 12)
  let isPassCorrect = await bcrypt.compare(user.passwordHash, passwordHash)
  if (!user) {
    return res.status(400).json({
      msg: "User Not Found",
    });
  }

  res.status(200).json({
    msg: "User Found",
    data: {
      user,
      isPassCorrect
    }
  });
};

export const testController = (req, res) => {
  res.status(200).json({
    msg: "test is working",
  });
};
