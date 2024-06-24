import User from '../models/user.model.js';

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

    const profilePicture = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}&size=200`;

    const newUser = new User({
      name,
      username,
      password,
      profilePicture
    })

    const user = await newUser.save();

    res.status(201).json({ user });

  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}

export const logout = (req, res) => {
  console.log("logoutUser")
}

export const login = (req, res) => {
  console.log("signupUser")
}