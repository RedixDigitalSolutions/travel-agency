import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const logo = '/travel-agency/redix_logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        setIsMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <a href="#home" className={styles.logoLink} onClick={() => scrollToSection('home')}>
                    <img src={logo} alt="Redix Digital Solutions" className={styles.logo} />
                </a>

                <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
                    <a href="#home" onClick={() => scrollToSection('home')}>Home</a>
                    <a href="#videos" onClick={() => scrollToSection('videos')}>Videos</a>
                    <a href="#websites" onClick={() => scrollToSection('websites')}>Websites</a>
                    <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
                </div>

                <a
                    href="https://redixsolutions.pro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaButton}
                >
                    Get Started
                </a>

                <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
