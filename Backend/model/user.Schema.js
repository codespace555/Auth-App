const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    minLength: [5, "Name must be at least 5 char"],
    maxLength: [50, "Name must be less then 50 char"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    lowercase: true,
    unique: [true, "email is already exist"],
  },
  password: {
    type: String,
    select: false, // this field will not show in response data
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpireTime: {
    type: String,
  },
},{
    timestamps:true,

});


userSchema.pre("save",async function (next) {
  if (!this.isModified("password")){
    return next()
  }
  this.password = await bcrypt.hash(this.password,10)
  return next()
  
})


// ..................................................
userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
};
// create model and export it to use wherever needed

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
