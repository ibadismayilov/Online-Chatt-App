
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";
import generateCustomID from "../utils/generateCustomID.js";

export const signup = async (req, res, body) => {
    try {
        const { fullname, username, biography, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password dont match' });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // HASH PASSOWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const customID = await generateCustomID();

        const newUser = new User({
            customID,
            fullname,
            username,
            biography,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                customID: newUser.customID,
                fullname: newUser.fullname,
                username: newUser.username,
                biography: newUser.biography,
                profilePic: newUser.profilePic
            });
        } else {
            return res.status(400).json({ error: 'Username already exists' });
        }

    } catch (error) {
        console.log('Error in signup controller', error.message);

        return res.status(500).json({ error: 'Internal user Data' });
    }
    console.log('signup');
}

export const loginUser = async (req, res) => {
    // console.log('loginUser');
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            customID: user.customID,
            fullname: user.fullname,
            username: user.username,
            biography: user.biography,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log('Error in login controller', error.message);

        return res.status(500).json({ error: 'Internal user Data' });
    }
}

export const logout = async (req, res) => {
    try {

        res.cookie('jwt', '', { maxAge: 0 });
        return res.status(200).json({ message: 'Logout out successfuly' });

    } catch (error) {

        console.log('Error in logout controller', error.message);
        return res.status(500).json({ error: 'Internal user Data' });

    }
}