import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Biography from "./components/Biography";
import Galery from "./components/Galery";
import Footer from "./components/Footer";


const App = () => {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <Hero />
      <Biography />
      <Galery />
      <section id="agenda" className="uppercase font-primary h-screen bg-slate-900 text-white text-5xl md:text-7xl flex items-center justify-center">Agenda</section>
      <section id="contact" className="uppercase font-primary h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white text-5xl md:text-7xl flex items-center justify-center">Contact</section>
      <Footer />
    </div>
  );
}

export default App;