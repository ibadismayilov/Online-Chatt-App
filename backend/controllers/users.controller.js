
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
        const { fullname, biography } = req.body;

        if (!fullname && !biography) {
            return res.status(400).json({ message: "No data provided for update" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { $set: { ...(fullname && { fullname }), ...(biography && { biography }) } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
