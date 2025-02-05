import React, { useState } from 'react';
import useGetConversations from '../hooks/useGetConversations';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

import { RiUserSearchLine } from "react-icons/ri";

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((cat) =>
      cat.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <div className='search-input-sidebar'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Search Users'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <RiUserSearchLine className='search-icon' />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
