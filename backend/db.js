
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL
);

console.log("connected to mongodb");


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: String,
  firstName: String,
  lastName: String,
});


const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
