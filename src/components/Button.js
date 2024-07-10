import React from "react";

const Button = ({ buttonText, onClick, type }) => {
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center"
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default Button;
