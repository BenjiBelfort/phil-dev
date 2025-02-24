import Navbar from "./components/Navbar";
import MainImg from "./components/MainImg";
import Footer from "./components/Footer";
import Galery from "./components/Galery";
// import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <MainImg />
      {/* <Hero /> */}
      <Galery />
      <section>Galerie</section>
      <section id="agenda" className="h-screen bg-gray-700 text-white flex items-center justify-center text-3xl">Agenda</section>
      <section id="contact" className="h-screen bg-gray-600 text-white flex items-center justify-center text-3xl">Contact</section>
      <Footer />
    </div>
  );
}

export default App;