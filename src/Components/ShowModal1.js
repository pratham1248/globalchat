import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './Modal.css';

const ShowModal1 = ({onClose})=>{
    const [inputValue, setInputValue] = useState('');


  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission
    console.log('Input Value:', inputValue);
    window.alert("Use this code to join group meet:-",inputValue);
    setInputValue(''); // Reset input value after submission
  };
    return(
        <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <IoClose size={24} />
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="modal-input">Enter meeting key to create chat room:</label>
          <input
            type="text"
            id="modal-input"
            value={inputValue}
            onChange={handleChange}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
    );
};

export default ShowModal1;