import {
  createUserService,
  getUserByIdService,
  getUsersService,
} from "../service/userService.js";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req, res) => {
  const { email, firstName, lastName, phone } = req.body;

  const options = {
    method: "POST",
    url: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
      "Api-Token": process.env.API_TOKEN,
    },
    data: {
      contact: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        fieldValues: [
          { field: "1", value: "The Value for First Field" },
          { field: "6", value: "2008-01-20" },
        ],
      },
    },
  };

  try {
    const user = await createUserService(req.body);

    if (user) {
      const response = await axios.request(options);
      res.status(201).json({ api: user, activeApi: response.data });
    }
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

export const listUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const userApi = await getUserByIdService(id);

    /* if (userApi) {
      const user = await axios.get(`${process.env.API_URL}/${req.body.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Api-Token": process.env.API_TOKEN,
        },
      });
      console.log(user.data); */
    res.status(200).json(userApi);
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

export const listAllUser = async (req, res) => {
  try {
    const allUsersApi = await getUsersService();

    if (allUsersApi) {
      const options = {
        method: "GET",
        url: process.env.API_URL,
        params: {
          search: "null",
          segmentid: "null",
          status: "-1",
          "orders[id]": "ASC",
          "orders[email]": "ASC",
        },
        headers: {
          accept: "application/json",
          "Api-Token": process.env.API_TOKEN,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          res
            .status(200)
            .json({ AllUsersApi: allUsersApi, usersActive: response.data });
        })
        .catch(function (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching data" });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
