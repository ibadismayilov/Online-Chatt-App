import User from "../models/user.model.js";

const generateCustomID = async () => {
    console.log("generateCustomID function called");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newId;
    let exists = true;
    let attempts = 0;

    while (exists && attempts < 10) {
        newId = "";
        for (let i = 0; i < 5; i++) {
            newId += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        console.log("Generated ID:", newId);
        exists = await User.findOne({ customID: newId });
        console.log("Database check:", exists ? "This ID already exists" : "New ID can be used");

        attempts++;
    }

    if (exists) {
        console.log("10 attempts made, unable to find a unique ID! Creating a fallback ID...");
        newId = "FB" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    }

    console.log("Final selected ID:", newId);
    return newId;
};

export default generateCustomID;
