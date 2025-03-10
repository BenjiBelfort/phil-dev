

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-slate-950 text-white flex flex-col items-center justify-center gap-1 p-4 sm:flex-row'>
            <p>Copyright &#169; {currentYear} - Phil Bullet Art.</p>
            <p>Tous droits réservés.</p>
            <a href="https://benji-belfort-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Dev by Benji Belfort.</a>
        </footer>
    );
}
  
export default Footer;