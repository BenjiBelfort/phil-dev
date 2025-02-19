import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="bg-black text-white px-6 h-20 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo cliquable */}
        <div className="inline-flex items-center gap-5 cursor-pointer"
          onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <img 
            src="/phil-logo-white.png"  
            alt="Logo de l'artiste"
            className="h-12 w-auto"
          />
        <h1 className="hidden md:flex">bullet art</h1>
        </div>

        {/* MENU EN VERSION GRAND ÉCRAN */}
        <ul className="hidden md:flex space-x-8 uppercase">
          <li><a href="#about" className="hover:text-gray-400">Présentation</a></li>
          <li><a href="#gallery" className="hover:text-gray-400">Galerie</a></li>
          <li><a href="#agenda" className="hover:text-gray-400">Agenda</a></li>
          <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
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

        {/* Overlay semi-transparent */}
        {/* <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)}></div> */}

        {/* MENU MOBILE */}
        <div className={`uppercase mobile-menu fixed top-0 right-0 h-full w-full bg-black shadow-lg transform transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            <ul className="flex flex-col justify-center space-y-4 w-full h-full text-center">
                <li><a href="#about" className="block py-2 text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Présentation</a></li>
                <li><a href="#gallery" className="block py-2 text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Galerie</a></li>
                <li><a href="#agenda" className="block py-2 text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Agenda</a></li>                    <li><a href="#contact" className="block py-2 text-lg hover:text-gray-400" onClick={() => setIsOpen(false)}>Contact</a></li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
