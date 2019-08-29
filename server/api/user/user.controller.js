import { User } from "./user.model";

export const getAllUsers = async (req, res, next) => {
  try {
    let user = await User.find();
    return res.json(user);
  } catch (error) {
    throw new Error(error);
  }
};
