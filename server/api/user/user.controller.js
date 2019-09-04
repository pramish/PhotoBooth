import { User } from './user.model';

export const getAllUsers = async (req, res, next) => {
  try {
    let user = await User.find();
    return res.json(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const saveAllUsers = async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    const result = await user.find({ email: email });

    if (result) {
      req.send('User is already registered');
    }

    user.save();

    res.redirect('/api');
  } catch (error) {}
};
