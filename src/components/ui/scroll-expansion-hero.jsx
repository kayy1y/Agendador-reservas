import React, { useEffect, useRef, useState } from 'react';
import './scroll-expansion-hero.css';

export const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const resetState = () => {
      setScrollProgress(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
      setTouchStartY(0);
    };

    resetState();
    window.addEventListener('resetSection', resetState);

    return () => window.removeEventListener('resetSection', resetState);
  }, [mediaType]);

  useEffect(() => {
    const isSectionActive = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      return rect.top <= 120 && rect.bottom >= window.innerHeight * 0.45;
    };

    const handleWheel = (event) => {
      if (!isSectionActive()) return;

      if (mediaFullyExpanded && event.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        setShowContent(false);
        event.preventDefault();
        return;
      }

      if (!mediaFullyExpanded) {
        event.preventDefault();
        const scrollDelta = event.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);

        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (event) => {
      if (!isSectionActive()) return;
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchMove = (event) => {
      if (!touchStartY || !isSectionActive()) return;

      const touchY = event.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        setShowContent(false);
        event.preventDefault();
      } else if (!mediaFullyExpanded) {
        event.preventDefault();

        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);

        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  const renderVideo = () => {
    if (mediaSrc.includes('youtube.com') || mediaSrc.includes('youtu.be')) {
      const embedSrc = mediaSrc.includes('embed')
        ? `${mediaSrc}${mediaSrc.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1`
        : `${mediaSrc.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1&playlist=${mediaSrc.split('v=')[1] || ''}`;

      return (
        <div className="seh-media-frame seh-media-frame-video">
          <iframe
            title={title || 'Video hero'}
            width="100%"
            height="100%"
            src={embedSrc}
            className="seh-video-embed"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="seh-media-shade" />
        </div>
      );
    }

    return (
      <div className="seh-media-frame seh-media-frame-video">
        <video
          src={mediaSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="seh-video"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="seh-media-shade" />
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="seh-root">
      <section className="seh-shell">
        <div className="seh-stage">
          <div
            className="seh-background"
            style={{ opacity: 1 - scrollProgress }}
          >
            <img
              src={bgImageSrc}
              alt="Ambient background"
              className="seh-background-image"
              loading="eager"
            />
            <div className="seh-background-overlay" />
          </div>

          <div className="seh-content-wrap">
            <div className="seh-viewport">
              <div
                className="seh-media-box"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                }}
              >
                {mediaType === 'video' ? (
                  renderVideo()
                ) : (
                  <div className="seh-media-frame">
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className="seh-image"
                      loading="eager"
                    />
                    <div
                      className="seh-media-shade seh-media-shade-image"
                      style={{ opacity: 0.7 - scrollProgress * 0.3 }}
                    />
                  </div>
                )}

                <div className="seh-meta">
                  {scrollToExpand && (
                    <p
                      className="seh-scroll-prompt"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`seh-title-group ${textBlend ? 'blend-difference' : ''}`}
              >
                <h2
                  className="seh-title seh-title-first"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </h2>
                <h2
                  className="seh-title seh-title-second"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </h2>
                {date && <p className="seh-location">{date}</p>}
              </div>
            </div>

            <section
              className="seh-expanded-content"
              style={{ opacity: showContent ? 1 : 0 }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
