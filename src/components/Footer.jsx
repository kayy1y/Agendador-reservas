import React from 'react';
import { UtensilsCrossed, MapPin, Phone, Clock, Mail, ExternalLink, Utensils, AlertCircle } from 'lucide-react';
import { restaurantConfig } from '../config/restaurantConfig';
import './Footer.css';

export const Footer = ({ onOpenMenu, onScrollToSection }) => {
  return (
    <footer id="contacto" className="lavid-footer">
      <div className="lavid-container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="brand-icon">
                <UtensilsCrossed size={22} />
              </div>
              <span className="brand-name">LA VID</span>
            </div>
            <p className="footer-tagline">{restaurantConfig.subtitle}</p>
            <p className="footer-desc">{restaurantConfig.tagline}</p>
            
            <div className="social-links">
              <a 
                href={restaurantConfig.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram de La Vid" 
                title="Instagram @la_vid_steakhouse"
              >
                <InstagramSvg size={18} />
              </a>
              <a 
                href={restaurantConfig.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook de La Vid" 
                title="Facebook LaVidSteakHouse"
              >
                <FacebookSvg size={18} />
              </a>
              <a 
                href={`https://wa.me/${restaurantConfig.whatsappClean}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp de La Vid" 
                title="WhatsApp +506 6118 1464"
              >
                <WhatsAppSvg size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegación</h4>
            <ul className="footer-links">
              <li><a href="#inicio" onClick={(e) => { e.preventDefault(); onScrollToSection('inicio'); }}>Inicio</a></li>
              <li>
                <button type="button" className="footer-link-btn" onClick={onOpenMenu}>
                  <Utensils size={14} />
                  <span>Ver Menú Gastronómico</span>
                </button>
              </li>
              <li><a href="#reservar" onClick={(e) => { e.preventDefault(); onScrollToSection('reservar'); }}>Reservar Mesa</a></li>
              <li><a href="#restaurante" onClick={(e) => { e.preventDefault(); onScrollToSection('restaurante'); }}>El Restaurante</a></li>
              <li><a href="#galeria" onClick={(e) => { e.preventDefault(); onScrollToSection('galeria'); }}>Galería de Fotos</a></li>
            </ul>
          </div>

          {/* Contact & Map Location */}
          <div className="footer-col">
            <h4 className="footer-col-title">Ubicación & Contacto</h4>
            <ul className="footer-info-list">
              <li>
                <MapPin size={20} className="info-icon" />
                <div className="location-text-box">
                  <strong>{restaurantConfig.name}</strong>
                  <span>{restaurantConfig.address}</span>
                  <a 
                    href={restaurantConfig.mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="maps-btn"
                  >
                    <span>Buscar en Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li>
                <Phone size={18} className="info-icon" />
                <a href={`tel:+50661181464`} className="phone-link">{restaurantConfig.phone}</a>
              </li>
              <li>
                <WhatsAppSvg size={18} className="info-icon" />
                <a 
                  href={`https://wa.me/${restaurantConfig.whatsappClean}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-link"
                >
                  WhatsApp: +506 6118 1464
                </a>
              </li>
            </ul>
          </div>

          {/* Hours Section */}
          <div className="footer-col">
            <h4 className="footer-col-title">Horarios de Atención</h4>
            <div className="hours-card">
              <Clock size={20} className="hours-icon" />
              <div>
                <strong>Lunes a Domingo</strong>
                <span className="hours-time">7:00 AM – 10:00 PM</span>
                <span className="kitchen-note">Cocina abierta continuamente</span>
                <span className="hours-notice">{restaurantConfig.openingHoursNotice}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {restaurantConfig.name}. Todos los derechos reservados.</p>
          <p className="local-tag">La Vid Steak House & Pizza</p>
        </div>
      </div>
    </footer>
  );
};

// Social icon components
const InstagramSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const WhatsAppSvg = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);
