import { useState } from "react";
import { getUserByNumber } from "../Apis/userAPI";  // Assuming this is your API function
import OTP from "./OTP";
import { sendOtp } from "../Apis/OTP";

const Forget = () => {
  const [formData, setFormData] = useState({ phone: "" });
  const [userFound, setUserFound] = useState(false);  // Track user validation status
  const [otpSent, setOtpSent] = useState(false);  // Track OTP status

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getUserByNumber(formData.phone);
      console.log(response);
      if (response) {
        setUserFound(true);  // User found, proceed with OTP
        await sendOtp(formData.phone)
        setOtpSent(true);  // OTP sent successfully
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-h-84 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Recover Password
        </h2>
        {!userFound ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Registered Mobile number
              </label>
              <input
                type="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="8420XXXXXX"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        ) : otpSent ? (
          <OTP phone={formData.phone} />
        ) : (
          <p>User not found!</p>
        )}
      </div>
    </div>
  );
};

export default Forget;
