import React, { useContext, useState, useEffect } from "react";
import LogoIcon from "../assets/LogoIcon";
import githubLogo from "../assets/github-logo.png";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { api, endpoints } from "../api/api";
import { motion } from "motion/react";
import { FaBars, FaXmark } from "react-icons/fa6";
const Navbar = () => {
  const { setUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const handleLogOut = async () => {
    await api.post(endpoints.auth.logout);
    setUser(null);
  };
  const NavLinks = [
    {
      to: "/",
      heading: "Home",
    },
    {
      to: "/tasks",
      heading: "Tasks",
    },
    {
      to: "/notes",
      heading: "Notes",
    },
  ];
  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-1/2 select-none transform -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[92%] z-50 mt-3 md:mt-4 rounded-xl md:rounded-2xl flex text-white justify-between items-center px-4 md:px-8 py-2.5 md:py-3 backdrop-blur-lg bg-black/30 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <LogoIcon width={48} height={48} />
        <div className="text-sm md:text-base font-semibold tracking-tight">
          <span className="text-green-400">E</span>du
          <span className="text-green-500">Z</span>ap
        </div>
      </div>
      {/* Desktop Icons */}
      <div className="md:block bg-transparent px-3 py-1 rounded-xl hidden">
        <ul className="flex gap-8">
          {NavLinks.map((link, id) => {
            return (
              <NavLink
                key={id}
                className={(e) =>
                  e.isActive
                    ? "text-sm md:text-base text-amber-300 font-semibold border-b-2 border-amber-300 pb-1 transition-all duration-200"
                    : "text-sm md:text-base text-gray-300 hover:text-white transition-all duration-200"
                }
                to={link.to}
              >
                <li className="transition-all hover:cursor-pointer">
                  {link.heading}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>

      {/* Mobile Icons */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-16 left-0 right-0 mx-auto w-[95%] bg-black/90 border border-white/10 rounded-xl backdrop-blur-lg shadow-lg"
        >
          <ul className="flex flex-col gap-4 p-4">
            {NavLinks.map((link, id) => {
              return (
                <NavLink
                  onClick={() => setShowMenu(!showMenu)}
                  key={id}
                  className={(e) =>
                    e.isActive
                      ? "text-sm md:text-base text-amber-300 font-semibold border-l-2 border-amber-300 pl-3 transition-all duration-200"
                      : "text-sm md:text-base text-gray-300 hover:text-white transition-all duration-200 pl-3"
                  }
                  to={link.to}
                >
                  <li className="transition-all hover:cursor-pointer">
                    {link.heading}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </motion.div>
      )}
      {/* Mobile buttons */}
      <div className="md:hidden">
        {showMenu ? (
          <FaXmark
            onClick={() => setShowMenu(!showMenu)}
            className="hover:cursor-pointer"
          />
        ) : (
          <FaBars
            onClick={() => setShowMenu(!showMenu)}
            className="hover:cursor-pointer"
          />
        )}
      </div>

      <div className="md:flex hidden gap-2 items-center">
        <Link
          to="https://github.com/MuhammadAhmadCode/edu-zap"
          target="_blank"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium border border-slate-600/50 hover:border-slate-500/50"
        >
          <img className="w-5" src={githubLogo} alt="GitHub" />
          GitHub
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogOut}
          className="px-4 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white transition-all duration-200 text-sm font-medium"
        >
          LogOut
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
