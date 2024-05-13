
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL
);

console.log("connected to mongodb");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  summary: String,
  education: [{ institution: String, degree: String}],
  workExperience: [{ company: String, position: String }],
  skills: [String],
});

const User = mongoose.model("User", userSchema);
const Resume = mongoose.model("Resume", resumeSchema);

module.exports = {
  User,
  Resume
};