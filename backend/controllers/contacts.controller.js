import User from "../models/user.model.js";

export const addContacts = async (req, res) => {
    try {
        const { contactID } = req.body;
        const userID = req.user._id;

        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.contacts.includes(contactID)) {
            return res.status(400).json({ message: "This user is already in the contact list" });
        }

        if (!contactID) {
            return res.status(400).json({ message: "Contact ID is not provided" });
        }

        user.contacts.push(contactID);
        await user.save();

        res.json({ success: true, message: "User successfully added" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};

export const getContacts = async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await User.findById(userID).populate("contacts", "fullname username profilePic customID");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ success: true, contacts: user.contacts });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
};

export const removeContacts = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);

        const { contactID } = req.body;
        const userID = req.user._id;

        if (!contactID) {
            return res.status(400).json({ message: "contactID is not provided" });
        }

        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.contacts.some(id => id.toString() === contactID.toString())) {
            user.contacts = user.contacts.filter(id => id.toString() !== contactID.toString());
            await user.save();

            return res.status(200).json({ message: "Contact successfully removed", contacts: user.contacts });
        } else {
            return res.status(400).json({ message: "This user is not in the contact list" });
        }

    } catch (error) {
        console.error("Error during deletion:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
};
