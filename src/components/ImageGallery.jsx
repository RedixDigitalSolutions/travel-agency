import { useState, useEffect, useRef } from 'react';
import { furnitureImages } from '../data/data';
import { Filter, X } from 'lucide-react';
import styles from './ImageGallery.module.css';

const ImageGallery = () => {
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);

    const clients = [...new Set(furnitureImages.map(img => img.client))];
    const categories = [...new Set(furnitureImages.map(img => img.category))];

    const filteredImages = furnitureImages.filter(img => {
        const matchesClient = filter === 'all' || img.client === filter;
        const matchesCategory = categoryFilter === 'all' || img.category === categoryFilter;
        return matchesClient && matchesCategory;
    });

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <section id="images" className={styles.gallery}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Furniture Image Gallery</h2>
                    <p className={styles.subtitle}>
                        Professional photography showcasing our furniture design projects
                    </p>
                </div>


                <div className={styles.resultCount}>
                    Showing {filteredImages.length} of {furnitureImages.length} images
                </div>

                <div className={styles.grid}>
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className={styles.imageCard}
                            onClick={() => openLightbox(image)}
                        >
                            <img
                                src={image.path}
                                alt={`${image.client} - ${image.category}`}
                                loading="lazy"
                            />
                            <div className={styles.overlay}>
                                <div className={styles.info}>
                                    <h3 className={styles.client}>{image.client}</h3>
                                    <p className={styles.category}>{image.category}</p>
                                    <p className={styles.description}>{image.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className={styles.lightbox} onClick={closeLightbox}>
                    <button className={styles.closeBtn} onClick={closeLightbox}>
                        <X size={32} />
                    </button>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage.path} alt={selectedImage.description} />
                        <div className={styles.lightboxInfo}>
                            <h3>{selectedImage.client}</h3>
                            <p className={styles.lightboxCategory}>{selectedImage.category}</p>
                            <p className={styles.lightboxDescription}>{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ImageGallery;
