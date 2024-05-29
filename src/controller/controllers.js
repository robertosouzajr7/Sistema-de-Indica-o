import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const createUser = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    const contact = {
      email,
      fullName,
      phone,
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

    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await axios.get(`${process.env.API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.API_TOKEN,
      },
    });
    console.log(user.data);
    res.json(user.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from external api" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
