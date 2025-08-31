"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6 bg-white">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Real Estate Agent
        </Link>

        {/* Hamburger (shown only on mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center space-y-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-emerald-600 transition-all ${isOpen? 'rotate-45 translate-y-[3px]' : ''} `}></span>
          <span className={!isOpen ?"w-6 h-0.5 bg-emerald-600" : 'hidden'}></span>
          <span className={`w-6 h-0.5 bg-emerald-600 transition-all ${isOpen? '-rotate-45 -translate-y-0.5' : ''} `}></span>
        </button>

        {/* Navigation — responsive behavior */}
        <nav
          className={`fixed top-16 left-0 w-full bg-white px-6 py-6 shadow-md flex flex-col gap-4 text-emerald-500 font-medium text-base transition-all duration-300 text-center md:text-left  md:static md:flex-row md:p-0 md:shadow-none md:bg-transparent md:top-auto md:w-auto md:opacity-100 md:translate-y-0 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6 pointer-events-none md:pointer-events-auto md:opacity-100 md:translate-y-0"
          }`}
        >
          <Link href="/buy" onClick={closeMenu} className="hover:text-emerald-700">
            Contact Us
          </Link>
          <Link href="/buy" onClick={closeMenu} className="hover:text-emerald-700">
            Broker
          </Link>
          <Link href="/buy" onClick={closeMenu} className="hover:text-emerald-700">
            Customers
          </Link>
          <Link href="/buy" onClick={closeMenu} className="hover:text-emerald-700">
            Buy
          </Link>
          <Link href="/sell" onClick={closeMenu} className="hover:text-emerald-700">
            Sell
          </Link>
          <Link href="/rent" onClick={closeMenu} className="hover:text-emerald-700">
            Rent
          </Link>
          <Link href="/login" onClick={closeMenu} className="hover:text-emerald-700">
            Login
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black -z-1 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-75 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />
    </header>
  );
};

export default Header;
