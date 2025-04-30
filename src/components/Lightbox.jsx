import PropTypes from "prop-types";

const Lightbox = ({
  images,
  currentIndex,
  fade,
  closeLightbox,
  nextImage,
  prevImage,
  statusColors,
}) => {
  const currentItem = images[currentIndex];

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
      <div
        className={`transition-opacity duration-200 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentItem.type === "desc" ? (
          // Grande card descriptive pour les descriptions
          <div className="max-w-[80vw] md:max-w-[50vw] max-h-[80vh] bg-white text-black p-6 md:p-10 rounded-lg overflow-auto">
            <div className="font-secondary text-2xl md:text-3xl uppercase">
              {currentItem.longTitle}
            </div>
            <div className="mt-3 md:mt-4 md:text-xl">{currentItem.longText}</div>
          </div>
        ) : (
          // Affichage de l'image avec bandeau de statut et description dans la lightbox
          <div className="relative inline-block overflow-hidden rounded-lg">
            <img
              src={currentItem.path}
              alt={`${currentItem.alt} - Bullet Art`}
              loading="lazy"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
            {currentItem.status && (
              <div
                className={`absolute top-25 left-[-40px] transform -rotate-45 origin-top-left text-center text-white font-bold px-2 py-1 logo-shadow ${
                  statusColors[currentItem.status.toLowerCase()] || "bg-gray-500"
                }`}
                style={{ width: "200px" }}
              >
                {currentItem.status.toUpperCase()}
              </div>
            )}
            {currentItem.description && (
              <div className="absolute bottom-0 left-0 w-full bg-white/80 text-black text-right text-xs p-2">
                {currentItem.description}
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
      <img
        src="/phil-logo-white.png"
        alt="Logo Phil dans lightbox"
        className="block absolute bottom-4 right-4 md:right-20 w-16 md:w-20"
      />
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string,
      longTitle: PropTypes.string,
      longText: PropTypes.node,
      path: PropTypes.string,
      alt: PropTypes.string,
      status: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  fade: PropTypes.bool.isRequired,
  closeLightbox: PropTypes.func.isRequired,
  nextImage: PropTypes.func.isRequired,
  prevImage: PropTypes.func.isRequired,
  statusColors: PropTypes.object.isRequired,
};

export default Lightbox;