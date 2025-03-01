import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Biography from "./components/Biography";
import Galery from "./components/Galery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


const App = () => {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Hero />
      <Biography />
      <Galery />
      {/* <section id="agenda" className="uppercase font-primary h-screen bg-slate-900 text-white text-5xl md:text-7xl flex items-center justify-center">Agenda</section> */}
      <Contact />

      <Footer />
    </div>
  );
}

export default App;