import { useState, useRef } from "react";
import { verifyOtp } from "../Apis/OTP";
import ResetPassword from "./ResetPassword";

function OTP({ phone }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/^[0-9]$/)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (index < 3 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData("text").slice(0, 4);
    setOtp(pastedValue.split("").map((char) => char || ""));
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const response = await verifyOtp(phone, otp.join("")); // Ensure OTP is a string
      console.log(response);
      setIsVerified(true); // OTP is verified, show ResetPassword
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerified) {
    return <ResetPassword phone={phone} />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-bold">Mobile Phone Verification</h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Enter the 4-digit verification code that was sent to your phone number.
      </p>
      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-2xl rounded-md border focus:border-2 focus:border-blue-500 focus:outline-none"
            maxLength={1}
          />
        ))}
      </div>
      <button
        onClick={handleVerify}
        disabled={otp.some((digit) => !digit) || isVerifying}
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-blue-300 focus:outline-none"
      >
        {isVerifying ? "Verifying..." : "Verify Account"}
      </button>
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500">Didn't receive code? </span>
        <button
          className="text-blue-500 hover:underline focus:outline-none"
        >
          Resend
        </button>
      </div>
     
    </div>
  );
}

export default OTP;
