
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserID = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserID } }).select('-password');
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error('Error in getUsersForSidebar :', error.message);
        res.status(500).json({ error: 'Intervar server error' });
    }
}


export const updateUserInformation = async (req, res) => {
    try {
        const userID = req.user._id;

        if (!req.body.fullname) {
            return res.status(400).json({ message: "Name and Surname not included" });
        }

        const user = await User.findByIdAndUpdate( userID,
            { fullname: req.body.fullname },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
