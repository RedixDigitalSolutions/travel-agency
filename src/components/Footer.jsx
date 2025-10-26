import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const logo = '/travel-agency/redix_logo.png';

const Footer = () => {
    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.column}>
                        <div className={styles.logoContainer}>
                            <img src={logo} alt="Redix Digital Solutions" className={styles.logo} />
                        </div>
                        <p className={styles.description}>
                            Transforming businesses through innovative digital solutions. Based in Tunisia,
                            serving clients worldwide with cutting-edge technology.
                        </p>
                        <div className={styles.socials}>
                            <a
                                href="https://www.instagram.com/redixdigitalsolutions/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61560535962106"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://wa.me/21692861655"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaWhatsapp />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/redix-digital-solutions/posts/?feedView=all"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Our Services</h4>
                        <ul className={styles.links}>
                            <li><a href="https://redixsolutions.pro/" target="_blank" rel="noopener noreferrer">Web Development</a></li>
                            <li><a href="https://redixsolutions.pro/" target="_blank" rel="noopener noreferrer">Video Production</a></li>
                            <li><a href="https://redixsolutions.pro/" target="_blank" rel="noopener noreferrer">Digital Marketing</a></li>
                            <li><a href="https://redixsolutions.pro/" target="_blank" rel="noopener noreferrer">Photography</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Get In Touch</h4>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <MapPin className={styles.icon} />
                                <span>Smart Technopark Manouba, Tunisia</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone className={styles.icon} />
                                <span>(+216) 21-999-898</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Mail className={styles.icon} />
                                <a href="mailto:contact@redixsolutions.pro">contact@redixsolutions.pro</a>
                            </div>
                            <div className={styles.contactItem}>
                                <Globe className={styles.icon} />
                                <a href="https://redixsolutions.pro/" target="_blank" rel="noopener noreferrer">redixsolutions.pro</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; 2025 Redix Digital Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
