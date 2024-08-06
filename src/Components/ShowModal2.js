import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import './Modal.css';

const ShowModal2 = ({onClose1,loggedInUser})=>{

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');


  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const openChatroomComponent = () => { 
    navigate(`/chatroom?loggedInUser=${encodeURIComponent(loggedInUser)}&groupId=${encodeURIComponent(inputValue)}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission
    console.log('Input Value:', inputValue);
    openChatroomComponent();
    setInputValue(''); // Reset input value after submission
  };
    return(
        <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose1}>
          <IoClose size={24} />
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="modal-input">Enter meeting key to join chat room:</label>
          <input
            type="text"
            id="modal-input"
            value={inputValue}
            onChange={handleChange}
            required
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
    );
};

export default ShowModal2;