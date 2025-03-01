const Contact = () => {
  return (
    <section id="contact" className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 flex flex-col items-center">
      {/* Titre */}
      <h3 className="uppercase font-primary text-white text-5xl md:text-7xl text-center mb-12">Contact</h3>

      {/* Image dans un cercle */}
      <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-white overflow-hidden">
        <img 
          src="/contact.webp"
          alt="Photo de contact"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-white text-lg md:text-2xl px-4 md:p-50">
            <p>Vous souhaitez une oeuvre personnalisée ? contactez-moi</p>
        </div>

      {/* Adresse e-mail */}
      <p className="text-white text-lg md:text-xl mt-6">
        <a href="mailto:exemple@email.com" className="hover:underline">
          philippe.gueutal@gmail.com
        </a>
      </p>
    </section>
  )
}

export default Contact;