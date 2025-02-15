import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetContacts = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/contacts/get-contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Contacts could not be retrieved");
                }

                setContacts(data.contacts);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getContacts();
    }, []);

    return { loading, contacts, setContacts };
};

export default useGetContacts;
