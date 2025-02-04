import icon from "../assets/preview.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Apis/authAPI";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import Popup from "./popup";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state to show a loading spinner if needed
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true); // Start loading when submitting
      const loginData = { email, password };
     await login(loginData);
     
  
      // Fetch the user profile after login
      const profile = await getLoggedInUserProfile();
  
      if (profile) {
        setLoading(false); // Stop loading
        localStorage.setItem("user", JSON.stringify(profile)); // Store profile in local storage
         // Redirect to the home page after successful login
        setPopupVisible(true); // Show popup on success
      setTimeout(() => {
        setPopupVisible(false); // Hide popup after 3 seconds
        navigate('/');
      }, 0);
      }
  
    } catch (error) {
      setLoading(false); // Stop loading
      console.error(error); // Handle error
    }
  };
  
  

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={icon} className="mx-auto h-52 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
  <button
    type="submit"
    disabled={loading} // Disable button while loading
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {loading ? "Loading..." : "Sign in"}
  </button>
  <div className="flex justify-end mt-2">
    <Link to="/forgetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
      Forgot password?
    </Link>
  </div>
</div>

          </form>
          <Link to={"/register"}>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Register now!
              </a>
            </p>
          </Link>
        </div>
      </div>
      {popupVisible && (
        <Popup
        message={"Sucessfully Logged out"}
        isVisible={true}
        />
      )}
    </>
  );
};

export default LoginPage;
