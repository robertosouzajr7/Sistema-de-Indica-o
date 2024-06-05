import mongoose from "mongoose";
import UserModel from "./UserModel.js";

const LeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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

  referradBy: {
    type: String,
    required: true,
  },
});

LeadSchema.post("save", async function (doc, next) {
  try {
    const user = await UserModel.findById(doc.referradBy).populate("leads");
    if (user.leads.length >= 2 && !user.hasDiscount) {
      user.hasDiscount = true;
      await user.save();
      console.log(`Usuario: ${user.email},  conseguiu ativar desconto`);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Lead = mongoose.model("Lead", LeadSchema);

export default Lead;
