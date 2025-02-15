import { create } from "zustand";

const useContactStore = create((set) => ({
    contacts: [],
    setContacts: (newContacts) => set({ contacts: newContacts }),
    addContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
    removeContact: (contactID) => set((state) => ({ contacts: state.contacts.filter(c => c._id !== contactID) })),
}));

export default useContactStore;
