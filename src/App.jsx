import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <section id="gallery" className="h-screen bg-gray-800 text-white flex items-center justify-center text-3xl">Galerie</section>
      <section id="agenda" className="h-screen bg-gray-700 text-white flex items-center justify-center text-3xl">Agenda</section>
      <section id="contact" className="h-screen bg-gray-600 text-white flex items-center justify-center text-3xl">Contact</section>
      <Footer />
    </div>
  );
}

export default App;