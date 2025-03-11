import { motion } from "framer-motion";
import PropTypes from "prop-types";

const GalleryItem = ({ item, onClick, statusColors }) => {
  return (
    <motion.div
      className="cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-square flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {item.type === "desc" ? (
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
    </motion.div>
  );
};

GalleryItem.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    longTitle: PropTypes.string,
    longText: PropTypes.string,
    path: PropTypes.string,
    alt: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  statusColors: PropTypes.object.isRequired,
};

export default GalleryItem;
