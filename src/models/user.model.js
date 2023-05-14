import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    // maxLength: [50, "name must be less than 50 chars"],
  },
  // email: {
  //   type: String,
  //   required: [true, "email is required"],
  // },
  // password: {
  //   type: String,
  //   required: [true, "password is required"],
  //   minLength:[3,"password must be at least 8 chars"]
  // },
})

export default mongoose.model("User", userSchema)
