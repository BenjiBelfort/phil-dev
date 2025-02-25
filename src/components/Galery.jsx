import { useState, useEffect, useCallback, useMemo } from "react";
import imagesData from "../data/images.json";

const stains = [
  "/taches/tache1.png",
  "/taches/tache2.png",
  "/taches/tache3.png"
];

const categoryDescriptions = {
  "bullet-art": {
    longTitle: "Bullet Art",
    longText:
      "Bullet Art – Ceci est la description complète et détaillée de la catégorie Bullet Art, qui explique l’univers et les inspirations derrière ces œuvres. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt mollitia quae saepe, nostrum error quisquam impedit nisi maxime excepturi architecto harum repudiandae iste numquam facilis doloribus reprehenderit fugiat. Ipsum, explicabo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      
  },
  mondrian: {
    longTitle: "Mondrian",
    longText:
      "Mondrian – Voici la description complète de la catégorie Mondrian, présentant les influences et le style particulier inspiré de l'art abstrait."
  },
  autres: {
    longTitle: "Autres",
    longText:
      "Autres – Cette catégorie regroupe diverses œuvres. Voici une description complète qui détaille le style et la variété de mes autres créations."
  }
};

const Galery = () => {
  const [filter, setFilter] = useState("all");
  const [randomAllImages, setRandomAllImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
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

  // Calcul des éléments à afficher selon le filtre
  const filteredImages = useMemo(() => {
    if (filter === "all") {
      return randomAllImages;
    } else {
      const imagesForCat = imagesData
        .filter((img) => img.category === filter)
        .sort((a, b) => a.id - b.id);
      // Crée un objet description pour la catégorie
      const descObj = {
        id: `desc-${filter}`,
        type: "desc",
        category: filter,
        longTitle: categoryDescriptions[filter]?.longTitle,
        longText: categoryDescriptions[filter]?.longText
      };
      return [descObj, ...imagesForCat];
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

  // Lors d'un changement de filtre, on génère une tache aléatoire (uniquement pour les catégories autres que "all")
  const handleClick = (cat) => {
    if (filter === cat) return;
    setFilter(cat);
    setStain({
      src: stains[Math.floor(Math.random() * stains.length)],
      rotation: Math.random() * 360
    });
  };

  return (
    <section id="gallery">
      <div className="container mx-auto px-4 py-10">
        <h3 className="uppercase text-white text-3xl text-center my-12">Galerie</h3>
        
        {/* Boutons de filtres : ils sont disposés en grille pour avoir 2 colonnes en mobile et 4 en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-4 mb-6">
          {["all", "bullet-art", "mondrian", "autres"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className={`relative w-full px-4 py-2 rounded-lg font-medium transition cursor-custom ${
                filter === cat ? "text-black bg-slate-400" : "text-white bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {cat === "all" ? "TOUS" : cat.toUpperCase()}
              {/* Affichage de la tache dans le bouton actif pour les catégories autres que "all" */}
              {filter === cat && stain && (
                <img
                  src={stain.src}
                  alt="Tâche"
                  className="absolute left-1/2 top-1/2 w-12 h-12 pointer-events-none stain-animation"
                  style={{ transform: `translate(-50%, -50%) rotate(${stain.rotation}deg)` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Galerie d'images (les cellules restent carrées) */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-4">
        {filteredImages.map((item, index) => (
            <div
                key={item.id}
                className="cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-square flex items-center justify-center"
                onClick={() => openLightbox(index)}
            >
                {item.type === "desc" ? (
                // Card de description dans la grille
                <div className="w-full h-full bg-white text-black relative p-3 pb-10 md:p-6 flex flex-col">
                    {/* Titre en gras et majuscules */}
                    <div className="font-bold uppercase">{item.longTitle}</div>

                    {/* Conteneur du texte avec gestion de l'overflow */}
                    <div className="relative flex-1 mt-1 text-xs md:text-base overflow-hidden min-h-[4rem] ">
                        <div>{item.longText}</div>

                        {/* Dégradé ajusté pour couvrir uniquement la zone coupée */}
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-0"></div>
                    </div>

                    {/* Bouton "Lire la suite" toujours visible sur fond blanc */}
                    <span className="absolute bottom-3 right-3 text-blue-600 text-xs cursor-pointer z-10 px-1">
                        lire la suite...
                    </span>
                </div>
                ) : (
                <img
                    src={item.path}
                    alt={item.alt}
                    className="w-full h-full object-cover rounded-lg"
                />
                )}
            </div>
            ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
          <div className={`transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
            {filteredImages[currentIndex].type === "desc" ? (
              // Grande card descriptive avec défilement vertical si nécessaire
              <div className="max-w-[80vw] md:max-w-[50vw] max-h-[85vh] bg-white text-black p-8 rounded-lg overflow-auto">
                <div className="font-bold text-xl">{filteredImages[currentIndex].longTitle}</div>
                <div className="mt-4">{filteredImages[currentIndex].longText}</div>
              </div>
            ) : (
              <img
                src={filteredImages[currentIndex].path}
                alt={filteredImages[currentIndex].alt}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              />
            )}
          </div>
          <button
            className="absolute top-4 right-4 md:right-20 xl:right-40 text-white text-4xl cursor-pointer"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            className="absolute left-4 md:left-20 xl:left-40 text-white text-4xl md:text-7xl cursor-pointer filter drop-shadow-xl"
            onClick={prevImage}
          >
            &#8249;
          </button>
          <button
            className="absolute right-4 md:right-20 xl:right-40 text-white text-4xl md:text-7xl cursor-pointer filter drop-shadow-xl"
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
