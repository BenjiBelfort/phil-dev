import { useState, useEffect, useMemo } from "react";
import imagesData from "../data/images.json";

const Galery = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  // Mélanger une seule fois les images au montage du composant
  useEffect(() => {
    setImages([...imagesData].sort(() => Math.random() - 0.5));
  }, []);

  // Appliquer le filtre sans changer l'ordre
  const filteredImages = useMemo(() => {
    return filter === "all" ? images : images.filter((img) => img.category === filter);
  }, [filter, images]);

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

  const nextImage = () => {
    changeImage((currentIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    changeImage((currentIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:flex md:justify-center gap-4 mb-6">
          {["all", "bullet-art", "mondrian", "autres"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-white font-medium transition ${
                filter === cat ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {cat === "all" ? "TOUS" : cat.toUpperCase()}
            </button>
          ))}
        </div>

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

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className={`transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"}`}>
            <img
              src={filteredImages[currentIndex]?.path}
              alt={filteredImages[currentIndex]?.alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>

          <button className="absolute top-4 right-4 text-white text-4xl" onClick={closeLightbox}>
            &times;
          </button>

          <button className="absolute left-4 text-white text-4xl" onClick={prevImage}>
            &#8249;
          </button>
          <button className="absolute right-4 text-white text-4xl" onClick={nextImage}>
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
};

export default Galery;
