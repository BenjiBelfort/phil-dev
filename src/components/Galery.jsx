import { useState, useEffect, useCallback, useMemo } from "react";
import imagesData from "../data/images.json";
import GalleryFilter from "./GaleryFilter";
import GalleryGrid from "./GaleryGrid";
import Lightbox from "./Lightbox";
import { shuffleArray } from "../utils/helpers";

const stains = [
  "/taches/tache1.png",
  "/taches/tache2.png",
  "/taches/tache3.png"
];

const statusColors = {
  // "dispo": "bg-green-500",
  "vendu": "bg-red-500",
  // "en cours": "bg-yellow-500",
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
  useEffect(() => {
    if (filter === "all") {
      setRandomAllImages(shuffleArray(imagesData));
      setVisibleCount(20);
    }
  }, [filter]);

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
        <h3 className="uppercase font-primary text-white text-5xl md:text-7xl text-center my-12">
          Galerie
        </h3>

        {/* Intégration du composant GalleryFilter */}
        <GalleryFilter
          currentFilter={filter}
          onChangeFilter={handleClick}
          stain={stain}
        />

        {/* Intégration du composant GalleryGrid */}
        <GalleryGrid
          images={filteredImages}
          openLightbox={openLightbox}
          statusColors={statusColors}
        />

        {/* Bouton "Afficher +" pour "TOUS" */}
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

      {/* Intégration du composant Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          currentIndex={currentIndex}
          fade={fade}
          closeLightbox={closeLightbox}
          nextImage={nextImage}
          prevImage={prevImage}
          statusColors={statusColors}
        />
      )}
    </section>
  );
};

export default Galery;

