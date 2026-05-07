import React, { useContext } from "react";
import LogoIcon from "../assets/LogoIcon";
import AuthContext from "../context/AuthContext";

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg  w-full bg-black/30 border-t border-white/10 text-white py-6 flex items-center justify-center  gap-3 shadow-lg">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-xs md:text-sm font-semibold tracking-tight">
          <span className="text-green-400">@E</span>du
          <span className="text-green-500">Z</span>ap
        </div>
      </div>
      <div className="text-xs md:text-sm text-gray-400">
        Created with ❤️ by M Ahmad
      </div>
    </footer>
  );
};

export default Footer;
