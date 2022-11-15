import React from 'react';

export const Button = ({ title, handleOnClick }) => {
  return (
    <>
      <button onClick={handleOnClick}>{title}</button>
    </>
  );
};
