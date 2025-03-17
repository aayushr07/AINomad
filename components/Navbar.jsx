'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-5 left-0 right-0 mx-auto max-w-6xl bg-white text-black px-6 py-3 rounded-lg shadow-2xl z-50 transform transition-all duration-300 ease-in-out hover:scale-105 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <motion.div
          className="text-2xl font-extrabold tracking-wide"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="hover:opacity-80">
            FoodLookup
          </Link>
        </motion.div>

        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/search" className="hover:text-gray-600 text-l">
            Search
          </Link>
          <Link href="/about" className="hover:text-gray-600 text-l">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-600 text-l">
            Contact
          </Link>
          {isLoggedIn && (
            <Link href="/profile" className="hover:text-gray-600 text-l">
              Profile
            </Link>
          )}
          <button
            onClick={handleLoginLogout}
            className="px-4 py-2 border rounded-lg hover:bg-gray-200 text-l"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden focus:outline-none"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 space-y-4"
        >
          <Link href="/search" className="block text-center py-2 hover:bg-gray-200 rounded">
            Search
          </Link>
          <Link href="/about" className="block text-center py-2 hover:bg-gray-200 rounded">
            About
          </Link>
          <Link href="/contact" className="block text-center py-2 hover:bg-gray-200 rounded">
            Contact
          </Link>
          {isLoggedIn && (
            <Link href="/profile" className="block text-center py-2 hover:bg-gray-200 rounded">
              Profile
            </Link>
          )}
          <button
            onClick={handleLoginLogout}
            className="w-full text-center py-2 border rounded-lg hover:bg-gray-200"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
