import React from 'react';
// import './UserInput.scss';

const UserInput = ({ type, placeholder, value, name, onChange }) => {
  return (
    <input
      className="userInput"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
    />
  );
};

export default UserInput;