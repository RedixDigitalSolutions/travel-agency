import { Sparkles, Video, Globe, TrendingUp } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.gradient}></div>

            <div className={styles.content}>
                <div className={styles.badge}>
                    <Sparkles className={styles.badgeIcon} />
                    <span>Travel & Tourism Digital Marketing Specialists</span>
                </div>

                <h1 className={styles.title}>
                    Inspire Wanderlust with
                    <span className={styles.highlight}> Captivating Travel Content</span>
                </h1>

                <p className={styles.description}>
                    We create stunning visual content for travel agencies and tour operators.
                    Discover our portfolio of successful campaigns showcasing breathtaking destinations and unforgettable experiences.
                </p>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <Video className={styles.statIcon} />
                        <div>
                            <h3>14+</h3>
                            <p>Travel Videos</p>
                        </div>
                    </div>
                    <div className={styles.stat}>
                        <Globe className={styles.statIcon} />
                        <div>
                            <h3>2+</h3>
                            <p>Travel Agencies</p>
                        </div>
                    </div>
                    <div className={styles.stat}>
                        <TrendingUp className={styles.statIcon} />
                        <div>
                            <h3>100K+</h3>
                            <p>Views Generated</p>
                        </div>
                    </div>
                </div>

                <a href="#videos" className={styles.cta}>
                    Explore Our Work
                </a>
            </div>
        </section>
    );
};

export default Hero;
