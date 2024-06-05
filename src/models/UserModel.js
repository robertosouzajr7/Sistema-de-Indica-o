import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  leads: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Lead",
    default: [],
  },
  hasDiscount: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
