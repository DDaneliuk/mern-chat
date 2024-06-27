import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try{
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");

    res.status(200).json({ users })

  } catch (e){
    console.log('[GET] Users', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}