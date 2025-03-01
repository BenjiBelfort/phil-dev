const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Image de fond */}
      <img 
        src="/hero-phil.webp" 
        alt="Phil dans son atelier" 
        className="w-full h-full object-cover"
      />

      {/* Filtre vignettage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_20%,_rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
    </div>
  );
};

export default Hero;
