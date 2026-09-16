import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Printer,
  X,
  Globe,
  Monitor,
  Laptop,
  Palette,
  Server,
  ShieldCheck,
  Zap,
  Clock,
  Award,
  Sparkles,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Send
} from 'lucide-react';
import { projectsData } from '../data/projects';

interface PresentationProps {
  setIsHovering?: (val: boolean) => void;
}

const TOTAL_SLIDES = 10;

const Presentation: React.FC<PresentationProps> = ({ setIsHovering }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isRTL = i18n.language === 'ar';

  const goToSlide = useCallback((newSlide: number) => {
    if (newSlide < 1 || newSlide > TOTAL_SLIDES) return;
    setDirection(newSlide > currentSlide ? 1 : -1);
    setCurrentSlide(newSlide);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lng', newLang);
  };

  const handlePrint = () => {
    window.print();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (isRTL) prevSlide();
        else nextSlide();
      } else if (e.key === 'ArrowLeft') {
        if (isRTL) nextSlide();
        else prevSlide();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [nextSlide, prevSlide, isRTL, isFullscreen]);

  // Framer Motion slide variants
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (isRTL ? -120 : 120) : (isRTL ? 120 : -120),
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? (isRTL ? 120 : -120) : (isRTL ? -120 : 120),
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
    })
  };

  // Center Control, Flow Accounting, DustOut project objects
  const centerProject = projectsData.find(p => p.id === 'center-control');
  const flowProject = projectsData.find(p => p.id === 'flow-accounting');
  const dustoutProject = projectsData.find(p => p.id === 'dustout-platform');

  const renderSlideContent = (index: number) => {
    switch (index) {
      case 1:
        // Cover Slide
        return (
          <div className="deck-slide deck-slide-cover">
            <div className="deck-cover-glow"></div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="deck-badge"
            >
              <Sparkles size={16} className="text-accent" />
              <span>{t('presentation.slides.1.tag')}</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="deck-logo-wrap"
            >
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="Zamzam Tech Logo" 
                className="deck-main-logo"
              />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="deck-cover-title text-gradient"
            >
              {t('presentation.slides.1.title')}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="deck-cover-subtitle"
            >
              {t('presentation.slides.1.subtitle')}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="deck-cover-desc"
            >
              {t('presentation.slides.1.desc')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="deck-badges-row"
            >
              <div className="deck-pill">
                <ShieldCheck size={16} /> {t('presentation.slides.1.badge1')}
              </div>
              <div className="deck-pill">
                <Zap size={16} /> {t('presentation.slides.1.badge2')}
              </div>
              <div className="deck-pill">
                <Clock size={16} /> {t('presentation.slides.1.badge3')}
              </div>
            </motion.div>
          </div>
        );

      case 2:
        // About Us & Vision
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.2.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.2.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.2.subtitle')}</p>
            </div>

            <div className="deck-about-grid">
              <div className="deck-card deck-card-primary">
                <div className="deck-card-icon">
                  <Award size={32} />
                </div>
                <h3>{t('nav.about')}</h3>
                <p>{t('presentation.slides.2.aboutText')}</p>
              </div>

              <div className="deck-about-subgrid">
                <div className="deck-card">
                  <div className="deck-card-icon text-accent">
                    <Sparkles size={28} />
                  </div>
                  <h4>{t('presentation.slides.2.visionTitle')}</h4>
                  <p>{t('presentation.slides.2.visionText')}</p>
                </div>

                <div className="deck-card">
                  <div className="deck-card-icon text-accent">
                    <Zap size={28} />
                  </div>
                  <h4>{t('presentation.slides.2.missionTitle')}</h4>
                  <p>{t('presentation.slides.2.missionText')}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        // Core Services
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.3.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.3.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.3.subtitle')}</p>
            </div>

            <div className="deck-services-grid">
              <div className="deck-service-item">
                <div className="deck-service-icon">
                  <Laptop size={32} />
                </div>
                <h3>{t('presentation.slides.3.service1Title')}</h3>
                <p>{t('presentation.slides.3.service1Desc')}</p>
              </div>

              <div className="deck-service-item">
                <div className="deck-service-icon">
                  <Monitor size={32} />
                </div>
                <h3>{t('presentation.slides.3.service2Title')}</h3>
                <p>{t('presentation.slides.3.service2Desc')}</p>
              </div>

              <div className="deck-service-item">
                <div className="deck-service-icon">
                  <Palette size={32} />
                </div>
                <h3>{t('presentation.slides.3.service3Title')}</h3>
                <p>{t('presentation.slides.3.service3Desc')}</p>
              </div>

              <div className="deck-service-item">
                <div className="deck-service-icon">
                  <Server size={32} />
                </div>
                <h3>{t('presentation.slides.3.service4Title')}</h3>
                <p>{t('presentation.slides.3.service4Desc')}</p>
              </div>
            </div>
          </div>
        );

      case 4:
        // Why Choose Us
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.4.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.4.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.4.subtitle')}</p>
            </div>

            <div className="deck-points-grid">
              <div className="deck-point-card">
                <div className="deck-point-num">01</div>
                <div className="deck-point-body">
                  <h4>{t('presentation.slides.4.point1Title')}</h4>
                  <p>{t('presentation.slides.4.point1Desc')}</p>
                </div>
              </div>

              <div className="deck-point-card">
                <div className="deck-point-num">02</div>
                <div className="deck-point-body">
                  <h4>{t('presentation.slides.4.point2Title')}</h4>
                  <p>{t('presentation.slides.4.point2Desc')}</p>
                </div>
              </div>

              <div className="deck-point-card">
                <div className="deck-point-num">03</div>
                <div className="deck-point-body">
                  <h4>{t('presentation.slides.4.point3Title')}</h4>
                  <p>{t('presentation.slides.4.point3Desc')}</p>
                </div>
              </div>

              <div className="deck-point-card">
                <div className="deck-point-num">04</div>
                <div className="deck-point-body">
                  <h4>{t('presentation.slides.4.point4Title')}</h4>
                  <p>{t('presentation.slides.4.point4Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        // Case Study 1: Center Control
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.5.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.5.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.5.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.5.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.5.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.5.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.5.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.5.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.5.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.5.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.5.stat3Label')}</span>
                  </div>
                </div>
              </div>

              <div className="deck-case-preview">
                <div className="deck-browser-frame">
                  <div className="deck-browser-dots">
                    <span className="deck-dot red"></span>
                    <span className="deck-dot yellow"></span>
                    <span className="deck-dot green"></span>
                  </div>
                  <img 
                    src={centerProject?.mainImage || `${import.meta.env.BASE_URL}project-center-control.jpg`} 
                    alt="Center Control" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        // Case Study 2: Flow Accounting
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.6.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.6.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.6.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.6.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.6.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.6.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.6.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.6.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.6.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.6.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.6.stat3Label')}</span>
                  </div>
                </div>
              </div>

              <div className="deck-case-preview">
                <div className="deck-browser-frame">
                  <div className="deck-browser-dots">
                    <span className="deck-dot red"></span>
                    <span className="deck-dot yellow"></span>
                    <span className="deck-dot green"></span>
                  </div>
                  <img 
                    src={flowProject?.mainImage || `${import.meta.env.BASE_URL}project-flow.jpg`} 
                    alt="Flow Accounting" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        // Case Study 3: DustOut E-Commerce
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.7.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.7.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.7.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.7.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.7.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.7.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.7.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.7.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.7.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.7.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.7.stat3Label')}</span>
                  </div>
                </div>
              </div>

              <div className="deck-case-preview">
                <div className="deck-browser-frame">
                  <div className="deck-browser-dots">
                    <span className="deck-dot red"></span>
                    <span className="deck-dot yellow"></span>
                    <span className="deck-dot green"></span>
                  </div>
                  <img 
                    src={dustoutProject?.mainImage || `${import.meta.env.BASE_URL}project-dustout.png`} 
                    alt="DustOut Platform" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        // Key Metrics & Trust
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.8.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.8.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.8.subtitle')}</p>
            </div>

            <div className="deck-stats-grid">
              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.8.stat1Num')}</div>
                <h4>{t('presentation.slides.8.stat1Title')}</h4>
                <p>{t('presentation.slides.8.stat1Desc')}</p>
              </div>

              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.8.stat2Num')}</div>
                <h4>{t('presentation.slides.8.stat2Title')}</h4>
                <p>{t('presentation.slides.8.stat2Desc')}</p>
              </div>

              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.8.stat3Num')}</div>
                <h4>{t('presentation.slides.8.stat3Title')}</h4>
                <p>{t('presentation.slides.8.stat3Desc')}</p>
              </div>

              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.8.stat4Num')}</div>
                <h4>{t('presentation.slides.8.stat4Title')}</h4>
                <p>{t('presentation.slides.8.stat4Desc')}</p>
              </div>
            </div>
          </div>
        );

      case 9:
        // Methodology
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.9.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.9.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.9.subtitle')}</p>
            </div>

            <div className="deck-steps-grid">
              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.9.step1Num')}</div>
                <h3>{t('presentation.slides.9.step1Title')}</h3>
                <p>{t('presentation.slides.9.step1Desc')}</p>
              </div>

              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.9.step2Num')}</div>
                <h3>{t('presentation.slides.9.step2Title')}</h3>
                <p>{t('presentation.slides.9.step2Desc')}</p>
              </div>

              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.9.step3Num')}</div>
                <h3>{t('presentation.slides.9.step3Title')}</h3>
                <p>{t('presentation.slides.9.step3Desc')}</p>
              </div>

              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.9.step4Num')}</div>
                <h3>{t('presentation.slides.9.step4Title')}</h3>
                <p>{t('presentation.slides.9.step4Desc')}</p>
              </div>
            </div>
          </div>
        );

      case 10:
        // Contact & CTA
        return (
          <div className="deck-slide deck-slide-contact">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.10.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.10.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.10.subtitle')}</p>
            </div>

            <div className="deck-contact-layout">
              <div className="deck-contact-info">
                <p className="deck-contact-highlight">{t('presentation.slides.10.ctaText')}</p>

                <div className="deck-contact-list">
                  <div className="deck-contact-row">
                    <MapPin className="text-accent" size={22} />
                    <span>{t('presentation.slides.10.location')}</span>
                  </div>

                  <div className="deck-contact-row">
                    <Phone className="text-accent" size={22} />
                    <span dir="ltr">{t('presentation.slides.10.phones')}</span>
                  </div>

                  <div className="deck-contact-row">
                    <Mail className="text-accent" size={22} />
                    <span>{t('presentation.slides.10.email')}</span>
                  </div>

                  <div className="deck-contact-row">
                    <Globe className="text-accent" size={22} />
                    <span>{t('presentation.slides.10.website')}</span>
                  </div>
                </div>

                <div className="deck-contact-btns">
                  <a 
                    href="https://wa.me/201000444566" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <MessageSquare size={18} /> {t('presentation.slides.10.whatsappBtn')}
                  </a>
                  <button 
                    onClick={() => {
                      navigate('/');
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="btn btn-outline"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <Send size={18} /> {t('presentation.slides.10.consultationBtn')}
                  </button>
                </div>
              </div>

              <div className="deck-contact-branding">
                <img 
                  src={`${import.meta.env.BASE_URL}logo.png`} 
                  alt="Zamzam Tech" 
                  className="deck-contact-logo"
                />
                <h3 className="text-gradient">Zamzam Tech</h3>
                <p className="deck-slogan">{t('hero.subtitle')}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercent = ((currentSlide - 1) / (TOTAL_SLIDES - 1)) * 100;

  return (
    <div className={`deck-container ${isFullscreen ? 'deck-fullscreen' : ''}`}>
      {/* Top Deck Header Bar */}
      <header className="deck-top-bar">
        <div className="deck-top-left">
          <Link 
            to="/" 
            className="deck-action-btn deck-exit-btn"
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={t('presentation.exit')}
          >
            <X size={18} />
            <span className="deck-btn-label">{t('presentation.exit')}</span>
          </Link>

          <div className="deck-counter-badge">
            {t('presentation.slideCounter', { current: currentSlide.toString().padStart(2, '0'), total: TOTAL_SLIDES.toString().padStart(2, '0') })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="deck-progress-track">
          <div 
            className="deck-progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="deck-top-right">
          <button 
            type="button"
            className="deck-action-btn"
            onClick={toggleLanguage}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={i18n.language === 'en' ? 'العربية' : 'English'}
          >
            <Globe size={18} />
            <span className="deck-btn-label">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button 
            type="button"
            className="deck-action-btn deck-print-btn"
            onClick={handlePrint}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={t('presentation.exportPdf')}
          >
            <Printer size={18} />
            <span className="deck-btn-label">{t('presentation.exportPdf')}</span>
          </button>

          <button 
            type="button"
            className="deck-action-btn"
            onClick={toggleFullscreen}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={isFullscreen ? t('presentation.exitFullscreen') : t('presentation.fullscreen')}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="deck-stage">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="deck-slide-wrapper"
          >
            {renderSlideContent(currentSlide)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation Controls */}
      <footer className="deck-bottom-bar">
        <div className="deck-shortcuts-hint">
          <span>{t('presentation.shortcutsHint')}</span>
        </div>

        <div className="deck-nav-cluster">
          <button
            type="button"
            className="deck-nav-arrow"
            onClick={isRTL ? nextSlide : prevSlide}
            disabled={isRTL ? currentSlide === TOTAL_SLIDES : currentSlide === 1}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="deck-dots">
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`deck-dot-btn ${currentSlide === idx + 1 ? 'active' : ''}`}
                onClick={() => goToSlide(idx + 1)}
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <button
            type="button"
            className="deck-nav-arrow"
            onClick={isRTL ? prevSlide : nextSlide}
            disabled={isRTL ? currentSlide === 1 : currentSlide === TOTAL_SLIDES}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </footer>

      {/* Printable All-Slides Container for PDF Export */}
      <div className="deck-print-container">
        {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
          <div key={idx} className="deck-print-page">
            <div className="deck-print-page-header">
              <div className="deck-print-logo-row">
                <img 
                  src={`${import.meta.env.BASE_URL}logo.png`} 
                  alt="Zamzam Tech" 
                  className="deck-print-logo"
                />
                <span className="deck-print-brand">Zamzam Tech • Company Profile</span>
              </div>
              <span className="deck-print-page-num">{idx + 1} / {TOTAL_SLIDES}</span>
            </div>
            <div className="deck-print-page-content">
              {renderSlideContent(idx + 1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presentation;
