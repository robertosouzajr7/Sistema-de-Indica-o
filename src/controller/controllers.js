import User from "../model/models.js";
import axios from "axios";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const user = new User({ firstName, lastName, email, phone });
    await user.save();

    const contact = {
      email,
      firstName,
      lastName,
      phone,
      fieldValues: [
        { field: "1", value: "The Value for First Field" },
        { field: "6", value: "2008-01-20" },
      ],
    };

    const response = await axios.post(
      process.env.API_URL,
      { contact },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Token": process.env.API_TOKEN,
        },
      }
    );

    res.status(201).json({ user, externalApiResponse: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
