import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('');  // New state to capture email input

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);  // Update email state when email input changes
  };

  const handleSubmit = async () => {
    try {
      // Assuming you have a way to get the logged-in user's email (e.g., from localStorage or a state)
      setUserEmail(localStorage.getItem('userEmail'));  // Or get it from Redux/Context API, etc.

      // Ensure that user email is set
      if (!email) {
        alert('Please provide your email address.');
        return;
      }

      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, email: email || userEmail }),  // Send the email entered by the user
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
      } else {
        alert('Something went wrong, please try again later.');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="max-w-md py-3 px-3 my-8 sm:mx-auto">
      <div className="flex flex-col rounded-xl bg-slate-200 shadow-lg">
        <div className="px-12 py-5">
          <h2 className="whitespace-nowrap text-center font-semibold text-gray-800 sm:text-xl">Your opinion matters to us!</h2>
        </div>
        <div className="flex w-full flex-col items-center bg-[#fdfeff]">
          <div className="flex flex-col items-center space-y-3 py-6">
            <span className="text-lg font-medium text-gray-500">How was your experience?</span>
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
          <a href="#" className="text-sm text-gray-600">Maybe later</a>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
