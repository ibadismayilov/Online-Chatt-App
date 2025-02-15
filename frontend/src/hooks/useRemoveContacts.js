import { useState } from "react";
import toast from "react-hot-toast";
import useGetContacts from "./useGetContacs";
const useRemoveContacts = () => {
    const [loading, setLoading] = useState(false);
    const { contacts,  setContacts } = useGetContacts();

    const removeContacts = async (contactID) => {
        setLoading(true);

        try {

            const res = await fetch('/api/contacts/remove-contacts', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contactID })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Contacts could not be retrieved");
            }

            setContacts(contacts.filter((item)=> {item._id !== contactID}));

            toast.success("Contact deleted successfully!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { removeContacts, loading };
};

export default useRemoveContacts;
