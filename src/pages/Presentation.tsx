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
  Sun,
  Moon,
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
  Send,
  LayoutGrid,
  Radio,
  ExternalLink,
  Lock,
  FileCode,
  GraduationCap,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { projectsData } from '../data/projects';

interface PresentationProps {
  setIsHovering?: (val: boolean) => void;
}

const TOTAL_SLIDES = 15;

const Presentation: React.FC<PresentationProps> = ({ setIsHovering }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showGrid, setShowGrid] = useState(false);
  const [isLaserMode, setIsLaserMode] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: -100, y: -100 });

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

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

  // Laser pointer position tracking
  useEffect(() => {
    if (!isLaserMode) return;
    const handleMouseMove = (e: MouseEvent) => {
      setLaserPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLaserMode]);

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
      } else if (e.key === 'g' || e.key === 'G') {
        setShowGrid(prev => !prev);
      } else if (e.key === 'l' || e.key === 'L') {
        setIsLaserMode(prev => !prev);
      } else if (e.key === 'Escape') {
        if (showGrid) {
          setShowGrid(false);
        } else if (isFullscreen) {
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
  }, [nextSlide, prevSlide, isRTL, isFullscreen, showGrid]);

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

  // All 7 Portfolio Projects
  const centerProject = projectsData.find(p => p.id === 'center-control');
  const flowProject = projectsData.find(p => p.id === 'flow-accounting');
  const dustoutProject = projectsData.find(p => p.id === 'dustout-platform');
  const crmProject = projectsData.find(p => p.id === 'crm-system');
  const posProject = projectsData.find(p => p.id === 'supermarket-pos');
  const zamzamProject = projectsData.find(p => p.id === 'zamzam-system');
  const quranProject = projectsData.find(p => p.id === 'quran-audio-platform');

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

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/center-control" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/flow-accounting" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/dustout-platform" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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
        // Case Study 4: Smart CRM System
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.8.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.8.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.8.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.8.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.8.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.8.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.8.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.8.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.8.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.8.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.8.stat3Label')}</span>
                  </div>
                </div>

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/crm-system" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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
                    src={crmProject?.mainImage || `${import.meta.env.BASE_URL}project-crm.png`} 
                    alt="CRM System" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        // Case Study 5: Supermarket POS System
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.9.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.9.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.9.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.9.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.9.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.9.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.9.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.9.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.9.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.9.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.9.stat3Label')}</span>
                  </div>
                </div>

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/supermarket-pos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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
                    src={posProject?.mainImage || `${import.meta.env.BASE_URL}project-pos.png`} 
                    alt="Supermarket POS" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        // Case Study 6: Zamzam Maintenance System
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.10.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.10.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.10.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.10.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.10.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.10.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.10.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.10.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.10.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.10.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.10.stat3Label')}</span>
                  </div>
                </div>

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/zamzam-system" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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
                    src={zamzamProject?.mainImage || `${import.meta.env.BASE_URL}project-zamzam.png`} 
                    alt="Zamzam Maintenance" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 11:
        // Case Study 7: Quran Audio Platform
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.11.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.11.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.11.subtitle')}</p>
            </div>

            <div className="deck-case-layout">
              <div className="deck-case-info">
                <p className="deck-case-desc">{t('presentation.slides.11.desc')}</p>
                
                <div className="deck-case-tech">
                  <span className="deck-tech-badge">{t('presentation.slides.11.tech')}</span>
                </div>

                <div className="deck-case-metrics">
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.11.stat1')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.11.stat1Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.11.stat2')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.11.stat2Label')}</span>
                  </div>
                  <div className="deck-metric-box">
                    <span className="deck-metric-val">{t('presentation.slides.11.stat3')}</span>
                    <span className="deck-metric-lbl">{t('presentation.slides.11.stat3Label')}</span>
                  </div>
                </div>

                <div className="deck-case-action-row">
                  <Link 
                    to="/project/quran-audio-platform" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="deck-case-btn"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <ExternalLink size={16} />
                    <span>{t('presentation.viewProjectDetails')}</span>
                  </Link>
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
                    src={quranProject?.mainImage || `${import.meta.env.BASE_URL}project-quran.png`} 
                    alt="Quran Audio Platform" 
                    className="deck-preview-img"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 12:
        // Key Metrics & Trust
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.12.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.12.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.12.subtitle')}</p>
            </div>

            <div className="deck-stats-grid">
              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.12.stat1Num')}</div>
                <h4>{t('presentation.slides.12.stat1Title')}</h4>
                <p>{t('presentation.slides.12.stat1Desc')}</p>
              </div>

              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.12.stat2Num')}</div>
                <h4>{t('presentation.slides.12.stat2Title')}</h4>
                <p>{t('presentation.slides.12.stat2Desc')}</p>
              </div>

              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.12.stat3Num')}</div>
                <h4>{t('presentation.slides.12.stat3Title')}</h4>
                <p>{t('presentation.slides.12.stat3Desc')}</p>
              </div>

              <div className="deck-stat-card">
                <div className="deck-stat-num text-gradient">{t('presentation.slides.12.stat4Num')}</div>
                <h4>{t('presentation.slides.12.stat4Title')}</h4>
                <p>{t('presentation.slides.12.stat4Desc')}</p>
              </div>
            </div>
          </div>
        );

      case 13:
        // Methodology
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.13.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.13.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.13.subtitle')}</p>
            </div>

            <div className="deck-steps-grid">
              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.13.step1Num')}</div>
                <h3>{t('presentation.slides.13.step1Title')}</h3>
                <p>{t('presentation.slides.13.step1Desc')}</p>
              </div>

              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.13.step2Num')}</div>
                <h3>{t('presentation.slides.13.step2Title')}</h3>
                <p>{t('presentation.slides.13.step2Desc')}</p>
              </div>

              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.13.step3Num')}</div>
                <h3>{t('presentation.slides.13.step3Title')}</h3>
                <p>{t('presentation.slides.13.step3Desc')}</p>
              </div>

              <div className="deck-step-card">
                <div className="deck-step-badge">{t('presentation.slides.13.step4Num')}</div>
                <h3>{t('presentation.slides.13.step4Title')}</h3>
                <p>{t('presentation.slides.13.step4Desc')}</p>
              </div>
            </div>
          </div>
        );

      case 14:
        // Guarantees & Quality Standards
        return (
          <div className="deck-slide">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.14.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.14.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.14.subtitle')}</p>
            </div>

            <div className="deck-guarantee-grid">
              <div className="deck-guarantee-card">
                <div className="deck-guarantee-icon">
                  <Lock size={28} />
                </div>
                <h3>{t('presentation.slides.14.guarantee1Title')}</h3>
                <p>{t('presentation.slides.14.guarantee1Desc')}</p>
              </div>

              <div className="deck-guarantee-card">
                <div className="deck-guarantee-icon">
                  <FileCode size={28} />
                </div>
                <h3>{t('presentation.slides.14.guarantee2Title')}</h3>
                <p>{t('presentation.slides.14.guarantee2Desc')}</p>
              </div>

              <div className="deck-guarantee-card">
                <div className="deck-guarantee-icon">
                  <ShieldCheck size={28} />
                </div>
                <h3>{t('presentation.slides.14.guarantee3Title')}</h3>
                <p>{t('presentation.slides.14.guarantee3Desc')}</p>
              </div>

              <div className="deck-guarantee-card">
                <div className="deck-guarantee-icon">
                  <GraduationCap size={28} />
                </div>
                <h3>{t('presentation.slides.14.guarantee4Title')}</h3>
                <p>{t('presentation.slides.14.guarantee4Desc')}</p>
              </div>
            </div>
          </div>
        );

      case 15:
        // Contact & CTA
        return (
          <div className="deck-slide deck-slide-contact">
            <div className="deck-slide-header">
              <span className="deck-slide-tag">{t('presentation.slides.15.tag')}</span>
              <h2 className="deck-slide-title text-gradient">{t('presentation.slides.15.title')}</h2>
              <p className="deck-slide-subtitle">{t('presentation.slides.15.subtitle')}</p>
            </div>

            <div className="deck-contact-layout">
              <div className="deck-contact-info">
                <p className="deck-contact-highlight">{t('presentation.slides.15.ctaText')}</p>

                <div className="deck-contact-list">
                  <div className="deck-contact-row">
                    <MapPin className="text-accent" size={22} />
                    <span>{t('presentation.slides.15.location')}</span>
                  </div>

                  <div className="deck-contact-row">
                    <Phone className="text-accent" size={22} />
                    <span dir="ltr">{t('presentation.slides.15.phones')}</span>
                  </div>

                  <div className="deck-contact-row">
                    <Mail className="text-accent" size={22} />
                    <span>{t('presentation.slides.15.email')}</span>
                  </div>

                  <div className="deck-contact-row">
                    <Globe className="text-accent" size={22} />
                    <span>{t('presentation.slides.15.website')}</span>
                  </div>
                </div>

                <div className="deck-contact-btns">
                  <a 
                    href="https://wa.me/201009693397" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    onMouseEnter={() => setIsHovering?.(true)}
                    onMouseLeave={() => setIsHovering?.(false)}
                  >
                    <MessageSquare size={18} /> {t('presentation.slides.15.whatsappBtn')}
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
                    <Send size={18} /> {t('presentation.slides.15.consultationBtn')}
                  </button>
                </div>
              </div>

              <div className="deck-contact-branding">
                <div className="deck-contact-logo-box">
                  <img 
                    src={`${import.meta.env.BASE_URL}logo.png`} 
                    alt="Zamzam Tech" 
                    className="deck-contact-logo"
                  />
                </div>
                
                <div className="deck-contact-trust-badges">
                  <div className="deck-trust-item">
                    <ShieldCheck size={18} className="text-accent" />
                    <span>{t('presentation.slides.1.badge1')}</span>
                  </div>
                  <div className="deck-trust-item">
                    <Zap size={18} className="text-accent" />
                    <span>{t('presentation.slides.1.badge2')}</span>
                  </div>
                  <div className="deck-trust-item">
                    <Clock size={18} className="text-accent" />
                    <span>{t('presentation.slides.1.badge3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercent = ((currentSlide - 1) / (TOTAL_SLIDES - 1)) * 100;

  const slidesCatalog = [
    { num: 1, tag: t('presentation.slides.1.tag'), title: t('presentation.slides.1.title'), icon: Sparkles },
    { num: 2, tag: t('presentation.slides.2.tag'), title: t('presentation.slides.2.title'), icon: Award },
    { num: 3, tag: t('presentation.slides.3.tag'), title: t('presentation.slides.3.title'), icon: Laptop },
    { num: 4, tag: t('presentation.slides.4.tag'), title: t('presentation.slides.4.title'), icon: Zap },
    { num: 5, tag: t('presentation.slides.5.tag'), title: t('presentation.slides.5.title'), icon: Monitor },
    { num: 6, tag: t('presentation.slides.6.tag'), title: t('presentation.slides.6.title'), icon: Layers },
    { num: 7, tag: t('presentation.slides.7.tag'), title: t('presentation.slides.7.title'), icon: Globe },
    { num: 8, tag: t('presentation.slides.8.tag'), title: t('presentation.slides.8.title'), icon: Server },
    { num: 9, tag: t('presentation.slides.9.tag'), title: t('presentation.slides.9.title'), icon: Monitor },
    { num: 10, tag: t('presentation.slides.10.tag'), title: t('presentation.slides.10.title'), icon: Laptop },
    { num: 11, tag: t('presentation.slides.11.tag'), title: t('presentation.slides.11.title'), icon: Sparkles },
    { num: 12, tag: t('presentation.slides.12.tag'), title: t('presentation.slides.12.title'), icon: Award },
    { num: 13, tag: t('presentation.slides.13.tag'), title: t('presentation.slides.13.title'), icon: Zap },
    { num: 14, tag: t('presentation.slides.14.tag'), title: t('presentation.slides.14.title'), icon: ShieldCheck },
    { num: 15, tag: t('presentation.slides.15.tag'), title: t('presentation.slides.15.title'), icon: Send },
  ];

  return (
    <div className={`deck-container ${isFullscreen ? 'deck-fullscreen' : ''} ${isLaserMode ? 'deck-laser-mode' : ''}`}>
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
            onClick={() => setShowGrid(true)}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={t('presentation.gridOverview') + ' (G)'}
          >
            <LayoutGrid size={18} />
            <span className="deck-btn-label">{t('presentation.gridOverview')}</span>
          </button>

          <button 
            type="button"
            className={`deck-action-btn ${isLaserMode ? 'deck-laser-btn-active' : ''}`}
            onClick={() => setIsLaserMode(prev => !prev)}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={t('presentation.laserPointer') + ' (L)'}
          >
            <Radio size={18} />
            <span className="deck-btn-label">{t('presentation.laserPointer')}</span>
          </button>

          <button 
            type="button"
            className="deck-action-btn"
            onClick={toggleTheme}
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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

      {/* Laser Pointer Tool */}
      {isLaserMode && (
        <div 
          className="deck-laser-dot"
          style={{
            left: `${laserPos.x}px`,
            top: `${laserPos.y}px`
          }}
        >
          <div className="deck-laser-pulse"></div>
        </div>
      )}

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

      {/* Slide Grid Drawer Modal */}
      <AnimatePresence>
        {showGrid && (
          <motion.div 
            className="deck-grid-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGrid(false)}
          >
            <motion.div 
              className="deck-grid-modal"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="deck-grid-header">
                <div className="deck-grid-title-group">
                  <LayoutGrid size={22} className="text-accent" />
                  <h2>{t('presentation.gridOverview')}</h2>
                  <span className="deck-grid-count">{TOTAL_SLIDES} {isRTL ? 'شريحة' : 'Slides'}</span>
                </div>
                <button 
                  type="button" 
                  className="deck-grid-close-btn"
                  onClick={() => setShowGrid(false)}
                  title={t('presentation.closeGrid')}
                  onMouseEnter={() => setIsHovering?.(true)}
                  onMouseLeave={() => setIsHovering?.(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="deck-grid-cards">
                {slidesCatalog.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = currentSlide === item.num;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      className={`deck-grid-card ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        goToSlide(item.num);
                        setShowGrid(false);
                      }}
                      onMouseEnter={() => setIsHovering?.(true)}
                      onMouseLeave={() => setIsHovering?.(false)}
                    >
                      <div className="deck-grid-card-top">
                        <span className="deck-grid-num">{item.num.toString().padStart(2, '0')}</span>
                        <div className="deck-grid-card-icon">
                          <IconComponent size={18} />
                        </div>
                      </div>
                      <span className="deck-grid-tag">{item.tag}</span>
                      <h4 className="deck-grid-card-title">{item.title}</h4>
                      {isActive && (
                        <div className="deck-grid-active-badge">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <span className="deck-print-brand">Zamzam Tech • Company Profile 2026</span>
              </div>
              <span className="deck-print-page-num">{idx + 1} / {TOTAL_SLIDES}</span>
            </div>
            <div className="deck-print-page-content">
              {renderSlideContent(idx + 1)}
            </div>
            <div className="deck-print-page-footer">
              <span>Zamzam Tech Software & Digital Solutions • +201009693397 • zamzamtech006@gmail.com</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presentation;
