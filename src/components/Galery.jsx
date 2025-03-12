import { useState, useEffect, useCallback, useMemo } from "react";
import imagesData from "../data/images.json";

const stains = [
  "/taches/tache1.png",
  "/taches/tache2.png",
  "/taches/tache3.png"
];

const statusColors = {
  "dispo": "bg-green-500",
  "vendu": "bg-red-500",
  "en cours": "bg-yellow-500",
};

const categoryDescriptions = {
  "bullet art": {
    longTitle: "Bullet Art : Quand le tir devient art",
    longText: (
      <>
        <p>
          Tireur sportif assidu et conscient des enjeux écologiques, j’ai eu l’idée de transformer les déchets issus du tir – étuis et cibles – en véritables œuvres d’art. Ainsi est né <strong>le Bullet Art</strong>.
        </p>
        <br />
        <p>
          D’un côté, les cibles perforées par les impacts deviennent des toiles uniques, où je mets en scène personnages et motifs pour créer des œuvres originales et personnalisées. De l’autre, les étuis de munitions sont récupérés et intégrés dans des compositions en relief, apportant une touche de <strong>3D</strong> aux tableaux.
        </p>
        <br />
        <p>
          À la croisée du recyclage et de la créativité, <strong>le Bullet Art donne une seconde vie aux traces du tir</strong>, les sublimant en objets artistiques uniques et porteurs de sens.
        </p>
      </>
    ),
  },
  mondrian: {
    longTitle: "Clin d’œil à Mondrian",
    longText: (
      <>
        <p>
          Piet Mondrian, dont le nom évoque immédiatement un style contemporain dénommé l’abstraction dont il fut l’un des pionniers, est une source d’inspiration majeure pour moi. J’admire son travail et l’idée d’intégrer des personnages ou d’autres éléments au sein de ses célèbres carrés me fascine...
        </p>
        <br />
        <p>
          Cette approche permet de <strong>faire vivre la toile</strong>, de la rendre unique et entièrement personnalisable, tant par ses dimensions et ses couleurs que par l’univers que l’on souhaite y insuffler. Chaque composition devient ainsi une œuvre à part entière, où l’abstraction rencontre la narration.
        </p>
      </>
    ),
  },
  autres: {
    longTitle: "Œuvres classiques",
    longText: (
      <>
        <p>
          Mes créations classiques sont le fruit d’un mélange d’influences entre <strong>le graffiti, le street art, le pop art et l’univers des comics</strong>. Chaque œuvre possède un sens caché, laissant à chacun la liberté d’y projeter sa propre interprétation.
        </p>
        <br />
        <p>
          La technique utilisée reste traditionnelle, combinant <strong>peinture acrylique sous toutes ses formes, feutre, bombe, aérosol, tube et aérographe</strong>, pour donner vie à des compositions vibrantes et expressives.
        </p>
      </>
    ),
  },
};

const Galery = () => {
  const [filter, setFilter] = useState("all");
  const [randomAllImages, setRandomAllImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [stain, setStain] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  // Fonction de mélange (Fisher-Yates)
  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Au chargement initial et si le filtre est "all", on mélange les images et on initialise visibleCount
  useEffect(() => {
    if (filter === "all") {
      setRandomAllImages(shuffleArray(imagesData));
      setVisibleCount(20);
    }
  }, [filter]);

  // Calcul des éléments à afficher selon le filtre
  const filteredImages = useMemo(() => {
    if (filter === "all") {
      return randomAllImages.slice(0, visibleCount);
    } else {
      const imagesForCat = imagesData
        .filter((img) => img.category === filter)
        .sort((a, b) => a.id - b.id);
      const descObj = {
        id: `desc-${filter}`,
        type: "desc",
        category: filter,
        longTitle: categoryDescriptions[filter]?.longTitle,
        longText: categoryDescriptions[filter]?.longText,
      };
      return [descObj, ...imagesForCat];
    }
  }, [filter, randomAllImages, visibleCount]);

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
    let isZooming = false;
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        isZooming = true;
      } else {
        isZooming = false;
        touchStartX = e.touches[0].clientX;
      }
    };
    const handleTouchEnd = (e) => {
      if (isZooming) return;
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

  const handleClick = (cat) => {
    if (filter === cat) return;
    setFilter(cat);
    setStain({
      src: stains[Math.floor(Math.random() * stains.length)],
      rotation: Math.random() * 360,
    });
  };

  return (
    <section id="gallery">
      <div className="container mx-auto px-4 py-10">
        <h3 className="uppercase font-primary text-white text-5xl md:text-7xl text-center my-12">Galerie</h3>
        
        {/* Boutons de filtres */}
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-10 gap-4 mb-6 md:mb-8">
          {["all", "bullet art", "mondrian", "autres"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className={`relative w-full px-4 py-2 rounded-lg font-secondary md:text-xl font-medium transition cursor-custom ${
                filter === cat
                  ? "text-black bg-slate-400 transition-transform duration-300 ease-in-out hover:scale-110"
                  : "text-white bg-slate-700 hover:bg-slate-600 transition-transform duration-300 ease-in-out hover:scale-110"
              }`}
            >
              {cat === "all" ? "TOUS" : cat.toUpperCase()}
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
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-10 gap-4">
          {filteredImages.map((item, index) => (
            <div
              key={item.id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-square flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
              onClick={() => openLightbox(index)}
            >
              {item.type === "desc" ? (
                // Card de description dans la grille
                <div className="w-full h-full bg-white text-black relative p-3 pb-10 md:p-4 flex flex-col">
                  <div className="font-secondary md:text-xl uppercase">{item.longTitle}</div>
                  <div className="relative flex-1 mt-1 text-xs md:text-base overflow-hidden min-h-[4rem]">
                    <div>{item.longText}</div>
                    <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-0"></div>
                  </div>
                  <span className="absolute bottom-3 right-3 text-blue-600 text-xs cursor-pointer z-10 px-1 font-bold">
                    lire la suite...
                  </span>
                </div>
              ) : (
                // Image avec bandeau de statut
                <div className="relative w-full h-full">
                  <img
                    src={item.path}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {item.status && (
                    <div
                      className={`absolute top-16 left-[-23px] transform -rotate-45 origin-top-left text-center text-white text-xs font-bold px-2 py-1 logo-shadow ${
                        statusColors[item.status.toLowerCase()] || "bg-gray-500"
                      }`}
                      style={{ width: "120px" }}
                    >
                      {item.status.toUpperCase()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Afficher plus (seulement pour "TOUS") */}
        {filter === "all" && visibleCount < randomAllImages.length && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 my-5 bg-slate-700 text-white font-secondary uppercase rounded-lg hover:bg-slate-600 transition-transform duration-300 ease-in-out hover:scale-110 cursor-custom"
              onClick={() => setVisibleCount(visibleCount + 20)}
            >
              Afficher +
            </button>
          </div>
        )}

      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <div className={`transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
            {filteredImages[currentIndex].type === "desc" ? (
              // Grande card descriptive pour les descriptions
              <div className="max-w-[80vw] md:max-w-[50vw] max-h-[80vh] bg-white text-black p-6 md:p-10 rounded-lg overflow-auto">
                <div className="font-secondary text-2xl md:text-3xl uppercase">
                  {filteredImages[currentIndex].longTitle}
                </div>
                <div className="mt-3 md:mt-4 md:text-xl">
                  {filteredImages[currentIndex].longText}
                </div>
              </div>
            ) : (
              // Affichage de l'image avec bandeau de statut et bandeau de description dans la lightbox
              <div className="relative inline-block overflow-hidden rounded-lg">
                <img
                  src={filteredImages[currentIndex].path}
                  alt={filteredImages[currentIndex].alt}
                  className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
                />
                {filteredImages[currentIndex].status && (
                  <div
                    className={`absolute top-25 left-[-40px] transform -rotate-45 origin-top-left text-center text-white font-bold px-2 py-1 logo-shadow ${
                      statusColors[filteredImages[currentIndex].status.toLowerCase()] || "bg-gray-500"
                    }`}
                    style={{ width: "200px" }}
                  >
                    {filteredImages[currentIndex].status.toUpperCase()}
                  </div>
                )}
                {filteredImages[currentIndex].description && (
                  <div className="absolute bottom-0 left-0 w-full bg-white/80 text-black text-right text-xs p-2">
                    {filteredImages[currentIndex].description}
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            className="absolute top-4 right-4 md:right-20 xl:right-35 text-white text-4xl cursor-pointer hover:scale-110"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            className="absolute left-4 md:left-20 xl:left-35 text-white text-4xl md:text-7xl cursor-pointer filter nav-shadow hover:scale-110"
            onClick={prevImage}
          >
            &#8249;
          </button>
          <button
            className="absolute right-4 md:right-20 xl:right-35 text-white text-4xl md:text-7xl cursor-pointer filter nav-shadow hover:scale-110"
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

