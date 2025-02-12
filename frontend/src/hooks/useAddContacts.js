import { useState } from "react";
import toast from "react-hot-toast";

const useAddContact = () => {
    const [loading, setLoading] = useState(false);

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
                throw new Error(data.message || 'Xəta baş verdi');
            }

            toast.success('İstifadəçi uğurla əlavə edildi');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return { addContact, loading };
};

export default useAddContact;
