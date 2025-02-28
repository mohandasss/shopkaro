import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePasswordById, getUserByNumber } from "../Apis/userAPI";
import { useNavigate } from "react-router-dom";
import Popup from "./popup";

function ResetPassword({ phone }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(phone);
    
    const { _id } = await getUserByNumber(phone);
    console.log(_id);
    
    const res = await changePasswordById(_id, newPassword);
    if (res.message === "Password updated successfully") {
      setMessage("Password updated successfully!");
      setVisible(true); // Show popup

      setTimeout(() => {
        setVisible(false); // Hide popup after 2 seconds
        navigate("/login"); // Redirect after hiding popup
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-bold">Reset Password</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative mb-4">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Reset Password
        </button>
      </form>

      {/* Show Popup when isVisible is true */}
      {isVisible && <Popup message={message} isVisible={isVisible} />}
    </div>
  );
}

export default ResetPassword;
