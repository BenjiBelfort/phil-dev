import { useState, useEffect, useCallback, useMemo } from "react";
import imagesData from "../data/images.json";

const stains = [
  "/taches/tache1.png",
  "/taches/tache2.png",
  "/taches/tache3.png"
];

const Galery = () => {
  const [filter, setFilter] = useState("all");
  const [randomAllImages, setRandomAllImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  // On stocke ici l'image de la tache et sa rotation
  const [stain, setStain] = useState(null);

  // Fonction de mélange (Fisher-Yates)
  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Au chargement initial et si le filtre est "all", on mélange les images
  useEffect(() => {
    if (filter === "all") {
      setRandomAllImages(shuffleArray(imagesData));
    }
  }, [filter]);

  // Calcul des images à afficher selon le filtre
  const filteredImages = useMemo(() => {
    if (filter === "all") {
      return randomAllImages;
    } else {
      return imagesData
        .filter((img) => img.category === filter)
        .sort((a, b) => a.id - b.id);
    }
  }, [filter, randomAllImages]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const changeImage = (newIndex) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(false);
    }, 200);
  };

  const nextImage = useCallback(() => {
    changeImage((currentIndex + 1) % filteredImages.length);
  }, [currentIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    changeImage((currentIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [currentIndex, filteredImages.length]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  useEffect(() => {
    if (!lightboxOpen) return;
    let touchStartX = 0;
    const handleTouchStart = (e) => (touchStartX = e.touches[0].clientX);
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) nextImage();
      if (touchEndX - touchStartX > 50) prevImage();
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightboxOpen, nextImage, prevImage]);

  // Lors d'un changement de filtre, si le bouton n'est pas déjà actif, on met à jour la tache
  const handleClick = (cat) => {
    if (filter === cat) return;
    setFilter(cat);
    // Générer une tache aléatoire avec rotation aléatoire
    setStain({
      src: stains[Math.floor(Math.random() * stains.length)],
      rotation: Math.random() * 360,
    });
  };

  return (
    <section id="gallery">
      <div className="container mx-auto px-4 py-10">
        <h3 className="uppercase text-white text-3xl text-center my-12">Galerie</h3>
        
        {/* Conteneur des boutons avec la même grille que la galerie d'images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {["all", "bullet-art", "mondrian", "autres"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className={`relative w-full px-4 py-2 rounded-lg font-medium transition cursor-custom ${
                filter === cat ? "text-black bg-slate-400" : "text-white bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {cat === "all" ? "TOUS" : cat.toUpperCase()}
              {filter === cat && stain && (
                <img
                  src={stain.src}
                  alt="Tâche"
                  className="absolute left-[27%] top-1/2 w-12 h-12 pointer-events-none"
                  style={{ transform: `translate(-50%, -50%) rotate(${stain.rotation}deg)` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Galerie d'images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.path}
                alt={image.alt}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className={`transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
            <img
              src={filteredImages[currentIndex].path}
              alt={filteredImages[currentIndex].alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-4xl drop-shadow-lg"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white text-4xl drop-shadow-lg"
            onClick={prevImage}
          >
            &#8249;
          </button>
          <button
            className="absolute right-4 text-white text-4xl drop-shadow-lg"
            onClick={nextImage}
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
};

export default Galery;
