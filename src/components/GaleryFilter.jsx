import PropTypes from 'prop-types';

const GalleryFilter = ({ currentFilter, onChangeFilter, stain }) => {
  const categories = ["all", "bullet art", "mondrian", "autres"];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-10 gap-4 mb-6 md:mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChangeFilter(cat)}
          className={`relative w-full px-4 py-2 rounded-lg font-secondary md:text-xl font-medium transition cursor-custom ${
            currentFilter === cat
              ? "text-black bg-slate-400 hover:scale-110"
              : "text-white bg-slate-700 hover:bg-slate-600 hover:scale-110"
          }`}
        >
          {cat === "all" ? "TOUS" : cat.toUpperCase()}
          {currentFilter === cat && stain && (
            <img
              src={stain.src}
              alt="Tâche"
              className="absolute left-1/2 top-1/2 w-12 h-12 pointer-events-none"
              style={{
                transform: `translate(-50%, -50%) rotate(${stain.rotation}deg)`,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

GalleryFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  stain: PropTypes.shape({
    src: PropTypes.string.isRequired,
    rotation: PropTypes.number.isRequired,
  }),
};

export default GalleryFilter;
