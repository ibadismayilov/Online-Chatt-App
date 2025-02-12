import { useState } from "react";
import toast from "react-hot-toast";

const useRemoveContacts = () => {
    const [loading, setLoading] = useState(false);

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
                throw new Error(data.message || "Kontaktı silmək mümkün olmadı");
            }

            toast.success("Kontakt uğurla silindi!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { removeContacts, loading };
};

export default useRemoveContacts;
