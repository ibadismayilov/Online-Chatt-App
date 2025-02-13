import React, { useState } from 'react';
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import useGetConversations from '../hooks/useGetConversations';
import { useSocketContext } from '../context/SocketContext';
import useAddContact from '../hooks/useAddContacts';
import useGetContacts from '../hooks/useGetContacs';
import useRemoveContacts from '../hooks/useRemoveContacts';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { conversations = [] } = useGetConversations();
  const { onlineUsers } = useSocketContext();
  const { addContact, loading: addLoading } = useAddContact();
  const { contacts } = useGetContacts();
  const { removeContacts, loading: removeLoading } = useRemoveContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Enter a minimum of 3 characters");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.querySelector('.search-input input')?.focus(), 100);
    } else {
      setSearch('');
    }
  };

  const filteredConversations = search && conversations ? 
    conversations.filter((user) => 
      user?.customID?.toLowerCase().includes(search.toLowerCase())
    ) : [];
    

  return (
    <div className='search-input'>
      <form onSubmit={handleSubmit}>
        <div className='search-container'>
          <button
            type="button"
            className="search-toggle-btn"
            onClick={toggleSearch}
          >
            {isSearchOpen ? <IoCloseOutline /> : <IoSearchOutline />}
          </button>
          
          <div className={`search-input-wrapper ${isSearchOpen ? 'show' : ''}`}>
            <input
              type="text"
              placeholder='Search user...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </form>

      {search && filteredConversations.length > 0 && (
        <div className='search-results'>
          {filteredConversations.map((user) => {
            const isOnline = onlineUsers.includes(user?._id);
            const isAdded = contacts.some((c) => c._id === user._id);
            
            return (
              <div key={user?.customID} className='search-result-item'>
                <div className='d-flex align-items-center'>
                  <div className='users-logo'>
                    <img
                      src={user?.profilePic}
                      alt="Profile"
                      className="small-image"
                    />
                    <div className={`status-dot ${isOnline ? 'online' : 'offline'}`}></div>
                  </div>
                  <div className='users-name mx-4'>
                    <p>{user?.fullname}</p>
                    <span className='user-id'>@{user?.customID}</span>
                  </div>
                </div>

                <div className='d-flex align-items-center'>
                  {isAdded ? (
                    <button
                      type='button'
                      onClick={() => removeContacts(user._id)}
                      disabled={removeLoading}
                      className="remove-button"
                    >
                      {removeLoading ? 'Silinir...' : 'Sil'}
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={() => addContact(user._id)}
                      disabled={addLoading}
                      className="add-button"
                    >
                      {addLoading ? 'Əlavə edilir...' : 'Əlavə et'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
