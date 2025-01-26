import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the close icon from react-icons

const ProfileModal = ({ name, address, email }) => {
  // Local state for editing profile
  const [editedName, setEditedName] = useState(name);
  const [editedAddress, setEditedAddress] = useState(address);
  const [editedEmail, setEditedEmail] = useState(email);

  const [open, setOpen] = useState(true); // Set initial state to true to open the modal automatically

  const handleOpen = () => setOpen(!open);

  const handleSave = () => {
    // Logic for saving the updated profile (e.g., API call)
   
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="relative">
              <h4 className="text-xl font-semibold text-gray-800">Edit Profile</h4>
              <p className="text-gray-600 mt-1">Update your personal details.</p>
              <button
                onClick={handleOpen}
                className="absolute top-2 right-2 text-gray-600"
              >
                <FaTimes className="h-5 w-5" /> {/* Using the FaTimes icon */}
              </button>
            </div>
            <div className="space-y-4 mt-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Alice Johnson"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="alice.johnson@example.com"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  rows={4}
                  placeholder="123 Main St, Springfield, IL, 62701"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
            <button onClick={handleSave} className="w-full duration-400 bg-gray-900/10 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 py-2 px-4 rounded-md">
          Update
        </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
