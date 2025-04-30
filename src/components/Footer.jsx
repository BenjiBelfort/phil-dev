

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-slate-800 text-white flex flex-col items-center justify-center gap-1 p-4 sm:flex-row'>
            <div className="flex items-center gap-1">
                <p>&#169; {currentYear} - Phil Bullet Art</p>
                <img src="/target.png" alt="Cible blanche" className="w-4"/>
            </div>
            <p>Tous droits réservés.</p>
            <a className="hover:text-amber-400 transition-colors" href="https://benji-belfort-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Dev by Benji Belfort</a>
        </footer>
    );
}
  
export default Footer;