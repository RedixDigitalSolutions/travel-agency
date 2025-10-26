import { useState } from 'react';
import { travelVideos } from '../data/data';  // ← Changed
import VideoCard from './VideoCard';
import { Filter } from 'lucide-react';
import styles from './VideoGallery.module.css';

const VideoGallery = () => {
    const [filter, setFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const clients = [...new Set(travelVideos.map(video => video.client))];  // ← Changed
    const types = [...new Set(travelVideos.map(video => video.type))];

    const filteredVideos = travelVideos.filter(video => {  // ← Changed
        const matchesClient = filter === 'all' || video.client === filter;
        const matchesType = typeFilter === 'all' || video.type === typeFilter;
        return matchesClient && matchesType;
    });

    return (
        <section id="videos" className={styles.gallery}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Travel Video Portfolio</h2>
                    <p className={styles.subtitle}>
                        Showcasing our best video content for travel agencies and tour operators
                    </p>
                </div>

                <div className={styles.filterSection}>
                    <div className={styles.filterGroup}>
                        <div className={styles.filterLabel}>
                            <Filter size={18} />
                            <span>Filter by Client</span>
                        </div>
                        <div className={styles.filters}>
                            <button
                                className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                All Clients
                            </button>
                            {clients.map((client) => (
                                <button
                                    key={client}
                                    className={`${styles.filterBtn} ${filter === client ? styles.active : ''}`}
                                    onClick={() => setFilter(client)}
                                >
                                    {client}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <div className={styles.filterLabel}>
                            <Filter size={18} />
                            <span>Filter by Type</span>
                        </div>
                        <div className={styles.filters}>
                            <button
                                className={`${styles.filterBtn} ${typeFilter === 'all' ? styles.active : ''}`}
                                onClick={() => setTypeFilter('all')}
                            >
                                All Types
                            </button>
                            {types.map((type) => (
                                <button
                                    key={type}
                                    className={`${styles.filterBtn} ${typeFilter === type ? styles.active : ''}`}
                                    onClick={() => setTypeFilter(type)}
                                >
                                    {type === 'reel' && 'Reels (9:16)'}
                                    {type === 'landscape' && 'Landscape (16:9)'}
                                    {type === 'animated' && 'Square (1:1)'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.resultCount}>
                    Showing {filteredVideos.length} of {travelVideos.length} videos
                </div>

                <div className={styles.grid}>
                    {filteredVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoGallery;
