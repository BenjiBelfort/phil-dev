import { useState, useEffect } from "react";
import instaLogo from "../assets/instagram_blanc.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gestion du scroll pour changer la couleur de fond
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Désactiver le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu") && !event.target.closest(".menu-btn")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 px-6 h-20 transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      } text-white`}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo cliquable */}
        <div
          className="inline-flex items-center gap-5 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src="/phil-logo-white.png" alt="Logo de l'artiste" className="h-12 w-auto" />
        </div>

        {/* MENU EN VERSION GRAND ÉCRAN */}
        <ul className="hidden md:flex space-x-8 uppercase">
          <li>
            <a href="#about" className="font-secondary hover:text-gray-500">
              Présentation
            </a>
          </li>
          <li>
            <a href="#gallery" className="font-secondary hover:text-gray-500">
              Galerie
            </a>
          </li>
          <li>
            <a href="#agenda" className="font-secondary hover:text-gray-500">
              Agenda
            </a>
          </li>
          <li>
            <a href="#contact" className="font-secondary hover:text-gray-500">
              Contact
            </a>
          </li>
        </ul>

        {/* Bouton Menu Hamburger animé pour MOBILE */}
        <button
          className="menu-btn md:hidden flex flex-col justify-between w-10 h-7 relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block bg-white h-1 w-full rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-3" : ""}`}></span>
          <span className={`block bg-white h-1 w-full rounded transition-all duration-300 ${isOpen ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}`}></span>
          <span className={`block bg-white h-1 w-full rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-3" : ""}`}></span>
        </button>

        {/* MENU MOBILE */}
        <div
          className={`uppercase mobile-menu fixed top-0 right-0 h-full w-full bg-black shadow-lg transform transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col justify-center space-y-4 w-full h-full text-center gap-4">
            <li>
              <a
                href="#about"
                className="font-secondary block text-lg hover:text-gray-400 transition-transform duration-300 ease-in"
                onClick={() => setIsOpen(false)}
              >
                Présentation
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="font-secondary block text-lg hover:text-gray-400 transition-transform duration-400 ease-in"
                onClick={() => setIsOpen(false)}
              >
                Galerie
              </a>
            </li>
            <li>
              <a
                href="#agenda"
                className="font-secondary block text-lg hover:text-gray-400 transition-transform duration-500 ease-in"
                onClick={() => setIsOpen(false)}
              >
                Agenda
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="font-secondary block text-lg hover:text-gray-400 transition-transform duration-600 ease-in"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
            <li className="self-center">
              <a href="https://www.instagram.com/philippegueutal/" target="_blank" rel="noopener noreferrer">
                <img
                  src={instaLogo}
                  alt="logo instagram"
                  className={`w-10 transition-all duration-800 ease-in ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                  onClick={() => setIsOpen(false)}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
