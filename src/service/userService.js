import UserModel from "../models/UserModel.js";

export const createUserService = async (userData) => {
  const { email, firstName, lastName, phone } = userData;
  const user = new UserModel({ email, firstName, lastName, phone, leads: [] });
  await user.save();
  return user;
};

export const getUsersService = async () => {
  const users = await UserModel.find();
  return users;
};

export const getUserByIdService = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

export const getUserByEmailService = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};
