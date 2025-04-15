import { useRef, useState, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import instaLogo from "../assets/instagram_blanc.png";


const stains = [
  "/taches/tache1.png",
  "/taches/tache2.png",
  "/taches/tache3.png"
];

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  // États pour le captcha
  const [captchaOrder, setCaptchaOrder] = useState([]);
  const [userClicks, setUserClicks] = useState([]);
  const [captchaClicked, setCaptchaClicked] = useState([null, null, null]);
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  // On encapsule shuffleCaptcha dans un useCallback pour éviter l'avertissement ESLint
  const shuffleCaptcha = useCallback(() => {
    let numbers = [1, 2, 3];
    // On mélange l'ordre
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setCaptchaOrder(numbers);
    setUserClicks([]);
    setCaptchaClicked([null, null, null]);
    setCaptchaSuccess(false);
    setCaptchaError(false);
  }, []);

  // Au chargement, on génère le captcha
  useEffect(() => {
    shuffleCaptcha();
  }, [shuffleCaptcha]);

  // Gestion des clics sur les images du captcha
  const handleCaptchaClick = (number, index) => {
    if (captchaClicked[index]) return;
    const newClicks = [...userClicks, number];
    setUserClicks(newClicks);

    // Génère une tâche aléatoire pour cet index
    const randomStain = {
      src: stains[Math.floor(Math.random() * stains.length)],
      rotation: Math.random() * 360
    };
    const newCaptchaClicked = [...captchaClicked];
    newCaptchaClicked[index] = randomStain;
    setCaptchaClicked(newCaptchaClicked);

    if (newClicks.length === 3) {
      if (JSON.stringify(newClicks) === JSON.stringify([1, 2, 3])) {
        setCaptchaSuccess(true);
        setCaptchaError(false);
      } else {
        setCaptchaError(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaSuccess) return;
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
          setIsSubmitted(true);
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
      className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 flex flex-col items-center scroll-mt-4"
    >
      {/* Titre */}
      <h3 className="uppercase font-primary text-white text-5xl md:text-7xl text-center mb-12">Contact</h3>

      {/* Image dans un cercle */}
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-white overflow-hidden">
        <img src="/contact.webp" alt="Photo de contact" className="w-full h-full object-cover" />
      </div>

      {/* Texte intro */}
      <div className="text-white text-center text-lg md:text-2xl px-5 mt-10">
        <p>Intéressé par une œuvre ou besoin d’informations ?<br />Je suis à votre disposition, <br /> contactez-moi !</p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="formulaire"
            ref={form}
            onSubmit={handleSubmit}
            className="px-7 md:px-0 mt-8 w-full max-w-md flex flex-col gap-4"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }}
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

            {/* CAPTCHA personnalisé */}
            <div className="mt-6">
              {/* Texte explicatif */}
              <p className="text-center mb-4 text-xs text-white">
                Pour envoyer votre message, touchez les cibles dans l&apos;ordre croissant
              </p>

              {/* Cibles */}
              <div className="flex justify-center gap-4">
                {captchaOrder.map((number, index) => (
                  <div
                    key={index}
                    onClick={() => handleCaptchaClick(number, index)}
                    className="relative cursor-pointer border-3 border-white rounded-full overflow-hidden w-20 h-20 md:w-26 md:h-26 cursor-custom"
                  >
                    <img src="/cible-captcha.webp" alt="captcha" className="w-full h-full object-cover" />
                    {captchaClicked[index] ? (
                      <img
                        src={captchaClicked[index].src}
                        alt="Tâche"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ transform: `rotate(${captchaClicked[index].rotation}deg)` }}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-xl text-drop-shadow">
                        {number}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>


            {/* Zone fixe pour le message d'erreur ou de succès */}
              <div className="min-h-[48px] flex items-center justify-center mt-4">
                {captchaError && (
                  <button
                    type="button"
                    onClick={shuffleCaptcha}
                    className="px-4 py-2 bg-red-600 text-white uppercase rounded-lg"
                  >
                    Rejouer
                  </button>
                )}
                {captchaSuccess && (
                  <p className="text-green-500 text-center">✅ vous êtes bien un sniper !</p>
                )}
              </div>

            <button
              type="submit"
              className={`px-4 py-2 bg-slate-700 text-white font-secondary uppercase rounded-lg transition duration-300 ${
                captchaSuccess ? "hover:bg-slate-600 cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!captchaSuccess || loading}
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
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
            <EnvelopeIcon className="h-16 w-16 text-white mb-4" />
            <p className="text-center text-xl whitespace-pre-line">{responseMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center my-16">
        <a
          href="https://www.instagram.com/philippegueutal/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={instaLogo}
            alt="Instagram"
            className="w-16 h-16 transition-transform duration-300 hover:scale-110 logo-shadow"
          />
        </a>
      </div>

    </section>
  );
};

export default Contact;
