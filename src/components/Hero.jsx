

export default function Hero() {
    return (
      <section id="about" className="relative h-screen overflow-hidden bg-gray-900">
              
        {/* Contenu */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-5xl font-bold md:text-6xl font-primary">Bienvenue dans mon univers</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Un voyage entre rythme, émotions et mélodies. Plongez dans ma musique.
          </p>
        </div>
      </section>
    );
  }
  