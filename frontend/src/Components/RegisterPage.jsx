import { React, useState } from 'react';
import icon1 from "../assets/preview.png";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Apis/authAPI";
import Popup from './popup';
import Loader from './Loader';

const RegisterPage = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setaddress] = useState('');
  const [loader, setloader] = useState(false);
  const [buttonText, setButtonText] = useState('Register'); // For button text control
  const navigate = useNavigate(); // For redirection
  const [popupVisible, setPopupVisible] = useState(false);


  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);
    setButtonText('Loading...');

    try {
      const userData = { name, email, password, address };
      const response = await register(userData);
      console.log(response);

      setPopupVisible(true); // Show popup on success
      setTimeout(() => {
        setPopupVisible(false); // Hide popup after 3 seconds
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.log(error);
      setloader(false);
      setButtonText('Register');
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={icon1} className="mx-auto h-52 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register Yourself
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            {/* Name input */}
             {/* Profile Picture Input */}
          <div>
            
            <div className="mt-2">
              
            </div>
          </div>
            <div>
              
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  autoComplete="email"
                  className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              ></label>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="block pl-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Address input */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm/6 font-medium text-gray-900"
              ></label>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Address
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  autoComplete="email"
                  onChange={(e) => setaddress(e.target.value)}
                  className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Register button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loader ? (
                  <div
                  className="inline-block h-8 w-8 animate-spinner-grow rounded-full bg-current align-[-0.125em] text-surface opacity-100 motion-reduce:animate-spinner-grow dark:text-white"
                  role="status"
                >
                  <Loader/>
                </div>
                
                ) : (
                  buttonText
                )}
              </button>
            </div>
          </form>

          {/* Link to login page */}
          <Link to={"/login"}>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already a member?{" "}
              <a
                
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Signin here!
              </a>
            </p>
          </Link>
        </div>
      </div>
      {popupVisible && (
        <Popup
        message={"Sucessfully Registered"}
        isVisible={true}
        />
      )}


    </>
  );
};

export default RegisterPage;
