import { useState, useEffect } from "react";

/**
 * Hook pour détecter le sens de défilement : "up" ou "down"
 * @param {number} threshold - seuil minimal de pixels pour détecter un vrai scroll (évite les micro-mouvements)
 * @returns {"up" | "down"} scrollDirection
 */
export default function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState("down"); // direction initiale
  const [lastScrollY, setLastScrollY] = useState(0); // dernière position Y connue

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (Math.abs(currentScrollY - lastScrollY) < threshold) {
        // Si le déplacement est trop faible, on ne change rien
        return;
      }

      // Détection de la direction
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      // Si la direction change, on la met à jour
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }

      // Mise à jour de la dernière position connue
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, scrollDirection, threshold]);

  return scrollDirection;
}
