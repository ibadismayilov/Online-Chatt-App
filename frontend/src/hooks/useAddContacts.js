import { useState } from "react";
import toast from "react-hot-toast";
import useContactStore from "../zustand/useContactStore";
import useGetContacts from "./useGetContacs";
const useAddContact = () => {
    const [loading, setLoading] = useState(false);
    const { contacts,  setContacts } = useGetContacts();

    const addContact = async (contactID) => {
        if (!contactID) return;

        try {
            const res = await fetch('/api/contacts/add-contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contactID })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            setContacts([...contacts, data.contact]);

            toast.success('User added successfully');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return { addContact, loading };
};

export default useAddContact;
