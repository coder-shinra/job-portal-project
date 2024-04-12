import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    midLength: [3, "Name must contain atleast 3 letters"],
    maxLength: [30, "Name must contain max 30 letters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your mail address"],
    validator: [validator.isEmail, "Please Provide valid mail address"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone numbers"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "Password should be more than 8 characters"],
    maxLength: [32, "Password should be not more than 32 characters"],
  },
  role: {
    type: String,
    required: [true, "Please Provide your role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hasing the password

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING PASSWORD

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENRATING JWT TOKKEN FOR AUTHORIZATION

userSchema.methods.getJWTTOKEN = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


export const User = mongoose.model("User",userSchema);