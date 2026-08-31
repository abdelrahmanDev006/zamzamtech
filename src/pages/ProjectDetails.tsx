import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2, CheckCircle2, Maximize2, X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { projectsData } from '../data/projects';

interface ProjectDetailsProps {
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrowserMockup = ({ children, onZoom }: { children: React.ReactNode; onZoom?: () => void }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    style={{
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-main)',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      position: 'relative'
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
      </div>
      {onZoom && (
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onZoom();
          }} 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem'
          }}
          aria-label="Zoom screenshot"
        >
          <Maximize2 size={16} />
        </button>
      )}
    </div>
    <div style={{ position: 'relative', cursor: onZoom ? 'pointer' : 'default' }} onClick={onZoom}>
      {children}
    </div>
  </motion.div>
);

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ setIsHovering }) => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const project = projectsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const allImages = useMemo(() => {
    if (!project) return [];
    const list = [project.mainImage, ...project.gallery];
    return Array.from(new Set(list));
  }, [project]);

  const openLightbox = useCallback((imgSrc: string) => {
    const idx = allImages.indexOf(imgSrc);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setIsLightboxOpen(true);
  }, [allImages]);

  const nextLightboxImage = useCallback(() => {
    if (allImages.length === 0) return;
    setLightboxIndex(prev => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevLightboxImage = useCallback(() => {
    if (allImages.length === 0) return;
    setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') {
      setIsLightboxOpen(false);
    } else if (e.key === 'ArrowRight') {
      if (i18n.language === 'ar') prevLightboxImage();
      else nextLightboxImage();
    } else if (e.key === 'ArrowLeft') {
      if (i18n.language === 'ar') nextLightboxImage();
      else prevLightboxImage();
    }
  }, [isLightboxOpen, i18n.language, nextLightboxImage, prevLightboxImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project) {
    return (
      <div style={{ paddingTop: '200px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Project not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const isRTL = i18n.language === 'ar';
  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  const handleContactRedirect = () => {
    navigate('/');
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 5) {
        setTimeout(() => tryScroll(attempts + 1), 60);
      }
    };
    setTimeout(() => tryScroll(), 50);
  };

  return (
    <div style={{ paddingTop: '150px', paddingBottom: '100px' }} className="container">
      <Link 
        to="/" 
        className="btn btn-outline"
        style={{ marginBottom: '2rem', display: 'inline-flex' }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ArrowBack size={20} /> {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
      </Link>

      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <span className="section-subtitle">{t(`portfolio.cat_${id}`)}</span>
        <h1 className="section-title text-accent" style={{ marginBottom: '2rem' }}>
          {t(`portfolio.title_${id}`)}
        </h1>
        
        {/* Main Cover Mockup */}
        <div style={{ marginBottom: '4rem' }}>
          <BrowserMockup onZoom={() => openLightbox(project.mainImage)}>
            <img 
              src={project.mainImage} 
              alt={t(`portfolio.title_${id}`)}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </BrowserMockup>
        </div>

        {/* Project Description & Tech Stack */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{isRTL ? 'عن المشروع' : 'About the Project'}</h3>
            <p className="service-desc" style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {t(`portfolio.desc_${id}`)}
            </p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 className="text-accent" /> {isRTL ? 'التقنيات المستخدمة' : 'Technologies Used'}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.tech.map(tech => (
                <span key={tech} style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '100px', border: '1px solid var(--border-color)', fontWeight: '600', fontSize: '0.95rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>
              {t('portfolio.features')}
            </h3>
            <div className="features-grid">
              {project.features.map((feat, idx) => (
                <div key={idx} className="feature-badge-card">
                  <div className="feature-icon-wrapper">
                    <CheckCircle2 size={24} />
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery / Interactive System Tour */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '2rem' }}>
            {isRTL ? 'جولة داخل النظام' : 'System Tour'}
          </h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            {t('portfolio.clickToZoom')}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div 
            key={currentGalleryIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <BrowserMockup onZoom={() => openLightbox(project.gallery[currentGalleryIdx])}>
              <img 
                src={project.gallery[currentGalleryIdx]} 
                alt={`Gallery View ${currentGalleryIdx + 1}`} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </BrowserMockup>
          </motion.div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {project.gallery.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentGalleryIdx(idx)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                style={{
                  width: '100px',
                  height: '65px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: currentGalleryIdx === idx ? '2px solid var(--accent)' : '2px solid transparent',
                  opacity: currentGalleryIdx === idx ? 1 : 0.45,
                  transform: currentGalleryIdx === idx ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  background: 'var(--bg-secondary)'
                }}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Thumb ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Project Bottom CTA Banner */}
        <div className="project-cta-banner">
          <h3 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
            {t('portfolio.ctaTitle')}
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
            {t('portfolio.ctaDesc')}
          </p>
          <button 
            type="button"
            onClick={handleContactRedirect}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <MessageSquare size={20} /> {t('portfolio.ctaBtn')}
          </button>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-top-bar">
                <span className="lightbox-counter">
                  {t('portfolio.imageCounter', { current: lightboxIndex + 1, total: allImages.length })}
                </span>
                <button 
                  type="button"
                  className="lightbox-close-btn" 
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close Lightbox"
                >
                  <X size={24} />
                </button>
              </div>

              <button 
                type="button"
                className="lightbox-nav-btn lightbox-nav-prev" 
                onClick={prevLightboxImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img 
                  key={allImages[lightboxIndex]}
                  src={allImages[lightboxIndex]} 
                  alt="Enlarged screenshot" 
                  className="lightbox-img" 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              <button 
                type="button"
                className="lightbox-nav-btn lightbox-nav-next" 
                onClick={nextLightboxImage}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
