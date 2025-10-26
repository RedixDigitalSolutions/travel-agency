import { websiteLinks } from '../data/links';
import { ExternalLink, Code } from 'lucide-react';
import styles from './WebsiteShowcase.module.css';

const WebsiteShowcase = () => {
    return (
        <section id="websites" className={styles.showcase}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Web Development Project</h2>
                    <p className={styles.subtitle}>
                        Full-stack travel booking platform built with modern technologies
                    </p>
                </div>

                <div className={styles.grid}>
                    {websiteLinks.map((project) => (
                        <a
                            key={project.id}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.card}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.iconWrapper}>
                                    <Code size={32} />
                                </div>
                                <h3 className={styles.projectName}>{project.name}</h3>
                                <p className={styles.description}>{project.description}</p>

                                <div className={styles.technologies}>
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className={styles.tech}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.category}>{project.category}</div>
                            </div>

                            <div className={styles.linkIcon}>
                                <ExternalLink size={20} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WebsiteShowcase;
