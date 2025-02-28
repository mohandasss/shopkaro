"use client";

import React, { useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  AiFillHome,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import shopkaro from "../assets/preview.png";
import me from "../assets/staticdp.jpg";
import admin from "../assets/admin.jpg";
import Popup from "./popup";
import Loader from "./Loader";
import ProfileModal from "./ProfileModal";
import { Search } from "lucide-react";
import { searchProducts } from "../Apis/productAPI";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getLoggedInUserProfile();
        console.log(profile.role);

        setUser(profile);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true);
      setError(null);
      try {
        const results = await searchProducts(searchQuery);

        if (results.products.length > 0) {
          setProducts(results.products);
          navigate("/search", { state: { product: results.products } });
        } else {
          setVisible(true)
          setError("No products found.");
        }
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a search query.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      navigate("/login");
    }, 2000);
  };

  const handleProfile = async () => {
    const profile = await getLoggedInUserProfile();
    setProfile(profile);
    setModal(true);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <Loader />
      </div>
    );
  }

  if(isVisible)
  {
    setTimeout(() => {
      setVisible(false); // Hide popup after 2 seconds
    }, 2000);
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-900 shadow-lg">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-auto"
                        src={shopkaro || "/placeholder.svg"}
                        alt="ShopKaro"
                      />
                    </Link>
                  </div>

                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {[
                      {
                        name: "Home",
                        href: "/",
                        icon: <AiFillHome className="mr-1" />,
                      },
                      {
                        name: "Products",
                        href: "/products",
                        icon: <FaProductHunt className="mr-1" />,
                      },
                      {
                        name: "Wishlist",
                        href: "/wishlist",
                        icon: <AiOutlineHeart className="mr-1" />,
                      },
                      {
                        name: "Cart",
                        href: "/cart",
                        icon: <AiOutlineShoppingCart className="mr-1" />,
                      },
                      {
                        name: "Orders",
                        href: "/orders",
                        icon: <FaShoppingBag className="mr-1" />,
                      }
                    ].map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center px-1 pt-1 text-sm font-medium"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="flex items-center mt-2.5 border rounded-full overflow-hidden transition-all duration-300 ease-in-out
                           w-64 bg-white"
                  >
                    <Search className="h-10  text-gray-500 transition-all duration-300 ease-in-out ml-3" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full py-2 px-3 outline-none bg-transparent transition-all duration-300 ease-in-out 
                             opacity-100"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      onClick={handleSearch}
                      className=" text-white p-2  bg-blue-500 rounded-3xl  "
                    >
                      Search
                    </button>
                  </div>
                </div>

                

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {user?.role === "admin" && (
                  <button onClick={()=> navigate("/adminpanel")} className="px-3 py-2 m-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                    Admin
                  </button>
                )}
                  {!user ? (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                      >
                        Register
                      </button>
                    </div>
                  ) : (
                    <Menu as="div" className="ml-3 relative">
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.role === "admin" ? admin : me}
                          alt="User profile"
                        />
                      </Menu.Button>
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleProfile}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
              {isVisible && <Popup message={error} isVisible={isVisible} />}
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {[
                  {
                    name: "Home",
                    href: "/",
                    icon: <AiFillHome className="mr-2" />,
                  },
                  {
                    name: "Products",
                    href: "/products",
                    icon: <FaProductHunt className="mr-2" />,
                  },
                  {
                    name: "Wishlist",
                    href: "/wishlist",
                    icon: <AiOutlineHeart className="mr-2" />,
                  },
                  {
                    name: "Cart",
                    href: "/cart",
                    icon: <AiOutlineShoppingCart className="mr-2" />,
                  },
                  {
                    name: "Orders",
                    href: "/orders",
                    icon: <FaShoppingBag className="mr-2" />,
                  }
                ].map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    <span className="flex items-center">
                      {item.icon}
                      {item.name}
                    </span>
                  </Disclosure.Button>
                ))}

                {!user && (
                  <div className="mt-4 space-y-2">
                    <Disclosure.Button
                      as="button"
                      onClick={() => navigate("/login")}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                    >
                      Login
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="button"
                      onClick={() => navigate("/register")}
                      className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                    >
                      Register
                    </Disclosure.Button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {popupVisible && <Popup message="Successfully Logged out" isVisible />}

      {modal && profile && (
        <ProfileModal
          name={profile.name}
          address={profile.address}
          email={profile.email}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
