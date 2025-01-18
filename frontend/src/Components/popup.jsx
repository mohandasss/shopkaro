import React from "react";
import "./Popup.css"; // Import the CSS file for animations

const Popup = ({ message, isVisible }) => {
  return (
<>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            top: "80px", // Adjust based on your navbar height
            right: "20px",
            zIndex: 9999,
          }}
          className="popup bg-indigo-800 text-white py-3 px-4 rounded-lg shadow-md flex items-center"
        >
          <span className="font-bold uppercase text-xs bg-indigo-500 py-1 px-2 rounded-full mr-3">
            Info
          </span>
          <span className="flex-auto text-sm">{message}</span>
          <svg
            className="fill-current opacity-75 h-4 w-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default Popup;
