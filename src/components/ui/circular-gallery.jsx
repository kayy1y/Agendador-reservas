import React, { useEffect, useRef, useState } from 'react';
import './circular-gallery.css';

const CircularGallery = ({ items, radius = 430, className = '' }) => {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const touchStartXRef = useRef(null);

  const rotateFromDelta = (delta) => {
    if (Math.abs(delta) < 1) return;
    setRotation((current) => current - delta * 0.35);
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 180);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling) setRotation((current) => current + 0.02);
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };

    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isScrolling]);

  const anglePerItem = 360 / items.length;

  const handleWheel = (event) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    event.preventDefault();
    rotateFromDelta(delta);
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    if (touchStartXRef.current === null) return;
    const currentX = event.touches[0].clientX;
    const delta = touchStartXRef.current - currentX;
    if (Math.abs(delta) > 4) {
      event.preventDefault();
      rotateFromDelta(delta);
      touchStartXRef.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
  };

  return (
    <div
      className={`circular-gallery ${className}`}
      role="region"
      aria-label="Galeria circular de La Vid"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="circular-gallery-track"
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        {items.map((item, index) => {
          const itemAngle = index * anglePerItem;
          const relativeAngle = (itemAngle + (rotation % 360) + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.36, 1 - normalizedAngle / 220);

          return (
            <article
              key={item.photo.url}
              className="circular-gallery-card"
              aria-label={item.common}
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                opacity,
              }}
            >
              <img src={item.photo.url} alt={item.photo.text} style={{ objectPosition: item.photo.pos || 'center' }} />
              <div className="circular-gallery-caption">
                <span>{item.binomial}</span>
                <h3>{item.common}</h3>
                <p>{item.photo.by}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export { CircularGallery };
export default CircularGallery;
