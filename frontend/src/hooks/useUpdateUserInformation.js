import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateUserInformation  = () => {
    const [loading, setLoading] = useState(false);

    const updateInformation = async ( fullname, biography ) => {
        if (!fullname) return;

        setLoading(true);
        try {
            const res = await fetch("/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullname, biography  })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "An error occurred");
            }

            toast.success("Data updated successfully");
            return data.user;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { updateInformation, loading };
};

export default useUpdateUserInformation ;
