import UserModel from "../models/UserModel.js";
import { createLeadService } from "../service/leadService.js";

export const createLeadController = async (req, res) => {
  const { email, firstName, lastName, phone, referradBy } = req.body;

  const leadData = {
    email,
    firstName,
    lastName,
    phone,
    referradBy,
  };

  try {
    const newLead = await createLeadService(leadData);
    await newLead.save();
    await UserModel.findByIdAndUpdate(referradBy, {
      $push: { leads: newLead._id },
    });

    res.status(201).json(newLead);
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

export const listLeadsByUserController = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).populate("leads");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.leads);
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};
