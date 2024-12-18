"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export const FloatingNav = ({}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [scrolling, setScrolling] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolling(true);
      setVisible(false);

      // Jika scrolling berhenti, navbar akan muncul lagi
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrolling(false);
        setVisible(true);
      }, 300); // Durasi 300ms untuk mendeteksi berhentinya scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Tombol Hamburger - Hanya untuk mode mobile */}
      <button
        className="fixed top-5 left-5 z-[6000] p-2 text-white bg-black rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar untuk mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 h-full w-[70%] bg-black/10 backdrop-blur-[2px] text-white z-[5000] flex flex-col space-y-5 p-5 md:hidden"
          >
            {/* Konten Sidebar */}
            <div className="mt-12">
              {[
                { name: "Home", link: "/" },
                { name: "About", link: "#about" },
                { name: "Our Member", link: "#our-member" },
                { name: "Join", link: "#join" },
              ].map((navItem, idx) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className="block text-xl font-semibold text-purple-300 hover:text-purple-500 transition duration-200"
                  onClick={() => setIsSidebarOpen(false)} // Menutup sidebar setelah klik
                >
                  {navItem.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar untuk desktop */}
      <AnimatePresence mode="wait">
        {!scrolling && visible && (
          <motion.div
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              y: -100,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className={cn(
              "hidden md:flex fixed top-10 inset-x-0 mx-auto border border-white rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(255,255,255,0.5),0px_1px_0px_0px_rgba(255,255,255,0.2),0px_0px_8px_2px_rgba(255,255,255,0.7)] z-[99999] pr-4 pl-4 py-5 px-10 items-center justify-center space-x-6 text-white w-fit"
            )}
          >
            {[
              { name: "Home", link: "#hero-section" },
              { name: "About", link: "#about" },
              { name: "Our Member", link: "#our-member" },
              { name: "Join", link: "#join" },
            ].map((navItem, idx) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className="text-lg font-semibold hover:text-neutral-300"
              >
                {navItem.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
