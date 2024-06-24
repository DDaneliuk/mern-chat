import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
// utils
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try{
    const { name, username, password, confirmPassword } = req.body;
    if (password !== confirmPassword){
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const isUser = await User.findOne({ username });

    if (isUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // GENERATE PROFILE PICTURE
    const profilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}&size=200`;

    const newUser = new User({
      name,
      username,
      password: hasedPassword,
      profilePicture
    })

    const user = await newUser.save();

    if(user){
      // Generate JWT token
      generateTokenAndSetCookie(user._id, res);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        profilePicture: user.profilePicture
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}

export const logout = (req, res) => {
  try{
    res.cookie('token', '', {maxAge: 0});
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (e){
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || ""); 

    if(!user || !isPassword){
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      profilePicture: user.profilePicture
    });

  } catch (e){
    res.status(500).json({ error: 'Internal Server Error' });
  }
}