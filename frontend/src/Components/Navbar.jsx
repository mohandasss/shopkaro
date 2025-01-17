import React, { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AiFillHome, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import shaopkaro from "../assets/preview.png";
import me from "../assets/staticdp.jpg";
import admin from "../assets/admin.jpg";
import Popup from "./popup";
import Loader from "./Loader";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user profile data
  const [loading, setLoading] = useState(true); // Track loading state
  const [popupVisible, setPopupVisible] = useState(false);
  const [profile, setprofile] = useState(null);
  const [modal, setModal] = useState(false); // Modal state for profile

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getLoggedInUserProfile();
        setUser(profile);
      } catch (error) {
        setUser(null); // Clear user state if not authenticated
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPopupVisible(true); // Show popup on success
    setTimeout(() => {
      setPopupVisible(false); // Hide popup after 2 seconds
      navigate("/login");
    }, 2000);
  };

  const handleProfile = async () => {
    const profile = await getLoggedInUserProfile();
    setprofile(profile);
    setModal(true); // Show profile modal when button clicked
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">  
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
              {/* Logo */}
              <div className="flex-shrink-0 hidden sm:block">
                <Link to={"/"}>
                  <img
                    alt="Your Company"
                    src={shaopkaro}
                    className="h-11 w-auto"
                  />
                </Link>
              </div>

              {/* Centered Navigation Links */}
              <div className="hidden sm:flex sm:space-x-6 sm:flex-grow justify-center">
                {[{ name: "Home", href: "/", icon: <AiFillHome size={24} /> }, { name: "Products", href: "/products", icon: <FaProductHunt size={24} /> }, { name: "Wishlist", href: "/wishlist", icon: <AiOutlineHeart size={24} /> }, { name: "Cart", href: "/cart", icon: <AiOutlineShoppingCart size={24} /> }]
                  .map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-2"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
              </div>

              {/* Profile Section */}
              <div className="flex items-center space-x-4 md:space-x-4 justify-center sm:justify-center md:justify-start">
  {!user ? (
    <>
      <button
        onClick={() => navigate("/login")}
        className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm"
      >
        Register
      </button>
    </>
  ) : (
    <Menu as="div" className="relative">
      <MenuButton>
        <img
          src={user.role === "admin" ? admin : me}
          alt="Profile"
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <MenuItem>
          {({ active }) => (
            <button
              onClick={handleProfile} // Open profile modal
              className={`${
                active ? "bg-gray-100" : ""
              } block w-full px-4 py-2 text-left text-sm text-gray-700`}
            >
              Profile
            </button>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={logout}
              className={`${
                active ? "bg-gray-100" : ""
              } block w-full px-4 py-2 text-left text-sm text-gray-700`}
            >
              Logout
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  )}
</div>

            </div>
          </div>
        </div>
      </Disclosure>

      {/* Show popup on logout */}
      {popupVisible && <Popup message={"Successfully Logged out"} isVisible />}

      {/* Profile Modal */}
      {modal && profile && (
        <ProfileModal
          name={profile.name}
          address={profile.address}
          email={profile.email}
          onClose={() => setModal(false)} // Close modal on button click
        />
      )}
    </>
  );
};

export default Navbar;
