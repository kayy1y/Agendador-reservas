import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './lip-scroll-zoomin-animation.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SEROTONIN_LIP_PATH =
  'M94.5053 14.6345C101.806 21.8528 109.576 28.4892 117.183 35.3664C117.5 35.6528 118.143 36.1983 118.391 36.4777C118.488 36.586 118.486 36.8137 118.583 36.8866C118.626 36.919 118.776 36.8339 118.94 36.9271C119.6 37.3015 120.309 38.3035 121 38.7073C119.258 40.2498 117.259 41.4714 115.196 42.5291C111.659 51.5094 106.633 60.1751 101.083 68.0401C97.8398 72.6351 94.5254 76.9982 89.8775 80.236C83.5141 84.67 75.4141 87.7104 67.7704 88.9421C66.7866 89.101 65.7837 89.1475 64.8229 89.3641L64.7727 88.9593L64.5214 89.2123L64.7214 89.3631C63.5999 89.4694 62.4773 89.6728 61.3538 89.768C54.7181 90.3297 47.6582 89.9663 41.3773 87.6223C35.851 85.5596 31.0704 81.9727 26.533 78.2786V77.726C26.3532 77.6622 26.2848 77.8909 26.1823 77.894C26.0014 77.899 23.7433 75.8455 23.4157 75.551C19.9707 72.4519 16.7739 69.0664 13.6143 65.6769L13.6686 65.1759C13.0294 65.3388 13.2998 65.2639 13.0214 64.9704C10.2759 62.0809 7.78657 58.9545 5.32644 55.8139L0.100663 54.5468C0.306679 54.3292 -0.0219412 54.1126 0.00117277 53.9952C0.0162471 53.9162 0.230302 53.8707 0.304669 53.7644C0.692582 53.2098 1.20813 52.2847 1.65433 51.81C1.81512 51.639 2.17891 51.5206 2.19499 51.4943C2.25228 51.4001 2.18193 51.1684 2.26032 51.0044C2.32664 50.8657 2.59597 50.805 2.70953 50.636C2.78892 50.5186 2.72461 50.3425 2.7638 50.2888C2.82912 50.2008 3.00901 50.2969 3.06529 50.2028C3.16076 50.0429 3.18789 49.7231 3.33663 49.4559C4.94456 46.5825 7.1635 43.7001 8.86188 40.7498C13.6475 32.4364 17.2563 22.875 22.6308 15.0434C29.4715 5.07617 41.4999 -0.321381 51.9042 8.29668C52.5886 8.86346 53.3966 9.8877 54.0156 10.3199C54.101 10.3796 54.1151 10.4606 54.2668 10.4191C55.911 4.51951 61.7437 1.02472 67.4951 0.208961C73.7771 -0.68169 80.8248 1.30709 85.5753 5.55793C88.6354 8.29668 91.5447 11.7105 94.5013 14.6345H94.5053Z';

const LIP_MASK_SVG_URI = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121 90" fill="%23000000"><path d="${SEROTONIN_LIP_PATH}"/></svg>`;

export const LipScrollZoominAnimation = ({
  title = 'SABOR EN MOVIMIENTO.',
  subtitle = (
    <>
      DESCUBRE LA <span className="lip-accent">ENERGIA</span> DE LA VID ENTRE FUEGO,
      BRASA Y DETALLES DE AUTOR. CADA ESPACIO ESTA PENSADO PARA HACER DE TU RESERVA
      UNA NOCHE <span className="lip-accent">MEMORABLE</span>.
    </>
  ),
  outroTitle = (
    <>
      TU MESA TE <span className="lip-accent">ESPERA.</span>
    </>
  ),
  outroSubtitle = (
    <>
      VIVE UNA EXPERIENCIA DONDE EL AMBIENTE, LA PARRILLA Y LA CAVA SE ENCUENTRAN
      EN UNA PROPUESTA DE <span className="lip-accent">ALTA GASTRONOMIA</span> HECHA
      PARA COMPARTIR.
    </>
  ),
  videoSrc = 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.mp4',
  posterSrc = 'https://res.cloudinary.com/dsuwzuaxp/video/upload/cinematic_drone_videos_shew9q.jpg',
  className = '',
}) => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const maskLayerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return undefined;

    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      const getInitialSize = () => {
        if (typeof window === 'undefined') return 360;
        if (window.innerWidth < 640) return 260;
        if (window.innerWidth < 1024) return 340;
        return 420;
      };

      const initialSize = getInitialSize();

      if (maskLayerRef.current) {
        maskLayerRef.current.style.setProperty('--maskW', `${initialSize}px`);
        maskLayerRef.current.style.webkitMaskSize = `${initialSize}px`;
        maskLayerRef.current.style.maskSize = `${initialSize}px`;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=260%',
          scrub: 1.2,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const startSize = getInitialSize();
            const currentSize = startSize + Math.pow(progress, 2.3) * 4500;

            if (maskLayerRef.current) {
              maskLayerRef.current.style.setProperty('--maskW', `${currentSize}px`);
              maskLayerRef.current.style.webkitMaskSize = `${currentSize}px`;
              maskLayerRef.current.style.maskSize = `${currentSize}px`;
            }
          },
        },
      }).to(
        videoRef.current,
        {
          scale: 1.22,
          ease: 'none',
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`lip-root ${className}`}>
      <section className="lip-intro">
        <div className="lip-copy-shell">
          <span className="lip-eyebrow">Experiencia audiovisual</span>
          <h2 className="lip-title">{title}</h2>
          <p className="lip-subtitle">{subtitle}</p>
        </div>
      </section>

      <div ref={containerRef} className="lip-scroll-stage">
        <div ref={pinRef} className="lip-pin">
          <div className="lip-corners lip-corner-top-left" />
          <div className="lip-corners lip-corner-top-right" />
          <div className="lip-corners lip-corner-bottom-left" />
          <div className="lip-corners lip-corner-bottom-right" />

          <div className="lip-watermark">
            <span>LA VID</span>
          </div>

          <div className="lip-video-shell">
            <div
              ref={maskLayerRef}
              className="lip-mask-layer"
              style={{
                WebkitMaskImage: `url('${LIP_MASK_SVG_URI}')`,
                maskImage: `url('${LIP_MASK_SVG_URI}')`,
              }}
            >
              <video
                ref={videoRef}
                className="lip-video"
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                poster={posterSrc}
              >
                <source src={videoSrc} type="video/mp4" />
                <source
                  src="https://res.cloudinary.com/dsuwzuaxp/video/upload/856381-hd_1920_1080_30fps_gsq11b.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>

      <footer className="lip-outro">
        <div className="lip-copy-shell">
          <h2 className="lip-title">{outroTitle}</h2>
          <p className="lip-subtitle">{outroSubtitle}</p>
        </div>
      </footer>
    </div>
  );
};

export default LipScrollZoominAnimation;
