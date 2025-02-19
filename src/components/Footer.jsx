

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-gray-900 text-white flex flex-col items-center justify-center gap-1 p-4 sm:flex-row'>
            <p>Copyright &#169; {currentYear} - Phil bullet art.</p>
            <p>Tous droits réservés.</p>
            <a href="https://benji-belfort-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Dev by Benji Belfort.</a>
        </footer>
    );
}
  
export default Footer;