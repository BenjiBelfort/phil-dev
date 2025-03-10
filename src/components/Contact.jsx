import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import de Framer Motion pour les animations
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_g942k8k", // Remplacez par votre ID de service
        "template_hy5hrht", // Remplacez par votre ID de template
        form.current,
        "vX579AdagFxAVIYa6" // Remplacez par votre user/public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setResponseMsg("Merci de m'avoir contacté\nJe vous répondrai au plus vite !");
          setLoading(false);
          setIsSubmitted(true); // ✅ Masquer le formulaire et afficher le message
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setResponseMsg("Une erreur est survenue. Réessayez.");
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 flex flex-col items-center"
    >
      {/* Titre */}
      <h3 className="uppercase font-primary text-white text-5xl md:text-7xl text-center mb-12">
        Contact
      </h3>

      {/* Image cercle */}
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-white overflow-hidden">
        <img
          src="/contact.webp"
          alt="Photo de contact"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Texte intro */}
      <div className="text-white text-center text-lg md:text-2xl px-4 mt-10">
        <p>Vous souhaitez une œuvre personnalisée ? Contactez-moi !</p>
      </div>

      {/* ✅ Gestion des animations avec AnimatePresence */}
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="formulaire"
            ref={form}
            onSubmit={handleSubmit}
            className="px-7 md:px-0 mt-10 w-full max-w-md flex flex-col gap-4"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }} // ✅ Zoom out au départ
          >
            <input
              type="text"
              name="user_name"
              placeholder="Votre nom"
              className="p-3 rounded-lg border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Votre email"
              className="p-3 rounded-lg border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="message"
              placeholder="Votre message"
              rows="5"
              className="p-3 rounded-lg border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 text-white font-secondary uppercase rounded-lg hover:bg-slate-600 transition-transform duration-300 ease-in-out cursor-custom"
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
            {responseMsg && !isSubmitted && (
              <p className="px-4 py-2 bg-slate-700 text-white font-secondary uppercase rounded-lg hover:bg-slate-600 transition-transform duration-300 ease-in-out hover:scale-110 cursor-custom">
                {responseMsg}
              </p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="confirmation"
            className="p-3 px-2.5 md:px-0 flex flex-col items-center justify-center text-white mt-10 w-full max-w-md"
            style={{ minHeight: "275px" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <EnvelopeIcon className="h-16 w-16 text-white mb-4" /> {/* ✅ Logo enveloppe */}
            <p className="text-center text-xl whitespace-pre-line">{responseMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
