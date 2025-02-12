import React, { useState } from 'react';
import useGetConversations from '../hooks/useGetConversations';
import { useSocketContext } from '../context/SocketContext';
import useAddContact from '../hooks/useAddContacts';
import useGetContacts from '../hooks/useGetContacs';
import useRemoveContacts from '../hooks/useRemoveContacts';
import toast from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { conversations = [] } = useGetConversations();
  const { onlineUsers } = useSocketContext();
  const { addContact, loading: addLoading } = useAddContact();
  const { contacts } = useGetContacts();
  const { removeContacts, loading: removeLoading } = useRemoveContacts();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Minimum 3 simvol daxil edin");
    }
  };

  const handleClear = () => {
    setSearch('');
  };

  const filteredConversations = search && conversations ? 
    conversations.filter((user) => 
      user?.customID?.toLowerCase().includes(search.toLowerCase())
    ) : [];

  return (
    <div className='search-input'>
      <form onSubmit={handleSubmit}>
        <div className='search-container'>
          <IoSearchOutline className='search-icon' />
        <input
          type="text"
            placeholder='İstifadəçi axtar...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          {search && (
            <button 
              type="button" 
              className='clear-button'
              onClick={handleClear}
            >
              <IoCloseOutline />
        </button>
          )}
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
