import { useEffect, useRef, useState } from 'react';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    SkipForward,
    SkipBack
} from 'lucide-react';
import styles from './VideoCard.module.css';

const VideoCard = ({ video }) => {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', updateProgress);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('loadedmetadata', updateProgress);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setPlaybackRate(newSpeed);
        if (videoRef.current) {
            videoRef.current.playbackRate = newSpeed;
        }
    };

    const skipForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 5;
        }
    };

    const skipBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 5;
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
        }
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getAspectRatioClass = () => {
        switch (video.type) {
            case 'reel':
                return styles.aspectRatio9_16;
            case 'landscape':
                return styles.aspectRatio16_9;
            case 'animated':
                return styles.aspectRatio1_1;
            default:
                return styles.aspectRatio9_16;
        }
    };

    return (
        <div ref={cardRef} className={styles.videoCard}>
            <div
                className={`${styles.videoWrapper} ${getAspectRatioClass()}`}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                <video
                    ref={videoRef}
                    className={styles.video}
                    loop
                    playsInline
                    onClick={togglePlay}
                >
                    <source src={video.path} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className={styles.typeBadge}>
                    {video.type === 'reel' && '9:16'}
                    {video.type === 'landscape' && '16:9'}
                    {video.type === 'animated' && '1:1'}
                </div>

                <div className={`${styles.controlsOverlay} ${showControls || !isPlaying ? styles.visible : ''}`}>
                    <button className={styles.centerPlayButton} onClick={togglePlay}>
                        {isPlaying ? <Pause size={48} /> : <Play size={48} />}
                    </button>

                    <div className={styles.controlsBar}>
                        <div className={styles.progressContainer}>
                            <input
                                ref={progressBarRef}
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleProgressChange}
                                className={styles.progressBar}
                            />
                            <div className={styles.timeDisplay}>
                                <span>{formatTime(currentTime)}</span>
                                <span>/</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.leftControls}>
                                <button onClick={togglePlay} className={styles.controlBtn}>
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>

                                <button onClick={skipBackward} className={styles.controlBtn}>
                                    <SkipBack size={20} />
                                </button>

                                <button onClick={skipForward} className={styles.controlBtn}>
                                    <SkipForward size={20} />
                                </button>

                                <div className={styles.volumeControl}>
                                    <button onClick={toggleMute} className={styles.controlBtn}>
                                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className={styles.volumeSlider}
                                    />
                                </div>
                            </div>

                            <div className={styles.rightControls}>
                                <select
                                    value={playbackRate}
                                    onChange={handleSpeedChange}
                                    className={styles.speedControl}
                                >
                                    <option value="0.5">0.5x</option>
                                    <option value="1">1x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2">2x</option>
                                </select>

                                <button onClick={toggleFullscreen} className={styles.controlBtn}>
                                    <Maximize size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.info}>
                <h3 className={styles.client}>{video.client}</h3>
                <p className={styles.category}>{video.category}</p>
            </div>
        </div>
    );
};

export default VideoCard;
