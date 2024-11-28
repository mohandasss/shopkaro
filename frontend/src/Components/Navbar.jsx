import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AiFillHome, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import shaopkaro from "../assets/preview.png";
import me from "../assets/staticdp.jpg";
import { useNavigate, Link } from 'react-router-dom';
import { FcCustomerSupport } from "react-icons/fc";
import { useState } from 'react';
import support from "../assets/support.png";

const navigation = [
  { name: 'Home', href: '/', icon: <AiFillHome size={24} /> },
  { name: 'Products', href: '/products', icon: <FaProductHunt size={24} /> },
  { name: 'Wishlist', href: '/wishlist', icon: <AiOutlineHeart size={24} /> },
  { name: 'Cart', href: '/cart', icon: <AiOutlineShoppingCart size={24} /> },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 hidden sm:block">
              <Link to={"/"}>
                <img alt="Your Company" src={shaopkaro} className="h-11 w-auto" />
              </Link>
            </div>

            {/* Centered Navigation Links with Icons */}
            <div className="hidden sm:flex sm:space-x-6 sm:flex-grow justify-center">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 flex items-center justify-center text-sm font-medium',
                  )}
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Profile dropdown */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <FcCustomerSupport
                onClick={() => openModal('support')}
                size={25}
                aria-hidden="true"
                className="text-white hover:text-gray-300 cursor-pointer"
              />

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img alt="" src={me} className="h-8 w-8 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a onClick={logout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.icon}
              <span className="sr-only">{item.name}</span>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>

      {/* Support Modal */}
      {modal === 'support' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 lg:w-1/3 flex flex-col sm:flex-row">
            <div className="hidden sm:block sm:w-1/4">
              <img src={support} alt="Support" className="w-full rounded-l-lg object-cover" />
            </div>
            <div className="sm:w-2/3 p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Support</h2>
              <p className="text-gray-600 mb-4">
                For any issues, contact us at 6295631554 or email gamermohan39@gmail.com. We're here to help!
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="rounded-md bg-slate-800 py-2 px-4 text-white hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
