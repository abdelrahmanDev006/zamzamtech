import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { projectsData } from '../data/projects';

interface ProjectDetailsProps {
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrowserMockup = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    style={{
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-main)',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      gap: '8px'
    }}>
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
    </div>
    <div style={{ position: 'relative' }}>
      {children}
    </div>
  </motion.div>
);

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ setIsHovering }) => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  
  const project = projectsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <div style={{ paddingTop: '200px', textAlign: 'center' }}>Project not found</div>;
  }

  const isRTL = i18n.language === 'ar';
  const ArrowBack = isRTL ? ArrowRight : ArrowLeft;

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
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
        
        <div style={{ marginBottom: '4rem' }}>
          <BrowserMockup>
            <img 
              src={project.mainImage} 
              alt={t(`portfolio.title_${id}`)}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </BrowserMockup>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
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
                <span key={tech} style={{ padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '100px', border: '1px solid var(--border-color)', fontWeight: '600' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          {isRTL ? 'جولة داخل النظام' : 'System Tour'}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div 
            key={currentGalleryIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <BrowserMockup>
              <img 
                src={project.gallery[currentGalleryIdx]} 
                alt={`Gallery View`} 
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
                  opacity: currentGalleryIdx === idx ? 1 : 0.4,
                  transition: 'all 0.3s ease',
                  background: 'var(--bg-secondary)'
                }}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
