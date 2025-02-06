import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./popup";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState(""); // New state to capture email input
  const [isVisible, setVisible] = useState(false);
  const [messagee, setMessage] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Update email state when email input changes
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback/submit",
        {
          email: email, // Using email from state
          feedback: feedback, // Using feedback from state
        }
      );
      // Check if the response data is an object, and if so, extract the message
      const responseMessage = typeof response.data === 'object' ? response.data.message : response.data;
      setMessage(responseMessage);
      console.log("Feedback submitted:", responseMessage);
      setVisible(true);
      // Optionally, clear the input fields after submission
      setEmail("");
      setFeedback("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  // Effect to hide the popup after 3 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount or visibility change
    }
  }, [isVisible]);

  return (
    <div className="max-w-md py-3 px-3 my-8 sm:mx-auto">
      <div className="flex flex-col rounded-xl bg-slate-200 shadow-lg">
        <div className="px-12 py-5">
          <h2 className="whitespace-nowrap text-center font-semibold text-gray-800 sm:text-xl">
            Your opinion matters to us!
          </h2>
        </div>
        <div className="flex w-full flex-col items-center bg-[#fdfeff]">
          <div className="flex flex-col items-center space-y-3 py-6">
            <span className="text-lg font-medium text-gray-500">
              How was your experience?
            </span>
          </div>
          <div className="flex w-3/4 flex-col">
            {/* Email input field */}
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              className="mb-4 rounded-xl bg-gray-100 p-4 text-gray-500 outline-none focus:ring"
            />
            <textarea
              rows="3"
              value={feedback}
              onChange={handleFeedbackChange}
              className="resize-none rounded-xl bg-gray-100 p-4 text-gray-500 outline-none focus:ring"
              placeholder="Leave a message, if you want"
            />
            <button
              onClick={handleSubmit}
              className="my-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 py-3 text-base text-white"
            >
              Send now
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center py-5">
          <a href="#" className="text-sm text-gray-600">
            Maybe later
          </a>
        </div>
      </div>
      {isVisible && <Popup message={messagee} isVisible={isVisible} />}
    </div>
  );
};

export default Feedback;
