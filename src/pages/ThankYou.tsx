import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ThankYou({ setIsHovering }: { setIsHovering: (val: boolean) => void }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="project-details" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
      <motion.div 
        className="container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={50} color="#25D366" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="section-title text-gradient" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          {t('thankYou.title')}
        </motion.h1>
        
        <motion.p 
          className="hero-desc" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}
        >
          {t('thankYou.message')}
        </motion.p>
        
        <motion.button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {t('thankYou.backHome')}
        </motion.button>
      </motion.div>
    </div>
  );
}
