import React, { useState, useEffect } from "react";
import { IoArrowBack, IoCamera } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useUpdateUserInformation from "../hooks/useUpdateUserInformation";
import toast from "react-hot-toast";

const Profile = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const { updateInformation, loading } = useUpdateUserInformation();

    const [fullname, setFullname] = useState(authUser.fullname);
    const [biography, setBiography] = useState(authUser.biography);

    if (!authUser) return null;

    useEffect(() => {
        setFullname(authUser?.fullname || "");
        setBiography(authUser?.biography || "");
    }, [authUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (fullname === authUser.fullname && biography === authUser.biography) {
            toast.error("No changes detected");
            return;
        }
    
        const updatedUser = await updateInformation(fullname, biography);
        
        if (!updatedUser) {
            toast.error("Update failed. Please try again.");
            return;
        }
    
        setAuthUser(prev => ({
            ...prev,
            fullname: updatedUser.fullname ?? prev.fullname,
            biography: updatedUser.biography ?? prev.biography
        }));

    };
    

    return (
        <div className="profile-wrapper">
            <form className="profile-container" onSubmit={handleSubmit}>
                <div className="profile-header">
                    <Link to="/" className="back-button">
                        <IoArrowBack />
                    </Link>
                    <h1>Profile</h1>
                </div>

                <div className="profile-content">
                    <div className="profile-avatar-section">
                        <div className="avatar-container">
                            <img
                                src={authUser.profilePic}
                                alt="Profile"
                                className="profile-avatar"
                            />
                            <button className="change-avatar-button">
                                <IoCamera />
                            </button>
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="info-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>

                        <div className="info-group">
                            <label>Custom ID</label>
                            <input
                                type="text"
                                placeholder="@username"
                                value={authUser.customID || "@" + authUser.username}
                                readOnly
                            />
                        </div>

                        <div className="info-group">
                            <label>Biography</label>
                            <textarea
                                placeholder="Write something about yourself..."
                                rows="4"
                                value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                            />
                        </div>

                        <div className="info-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={authUser.email}
                                readOnly
                            />
                        </div>

                        <button className="save-profile-button" type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Information"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
