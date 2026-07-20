import React, { useState, useEffect } from 'react';
import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Monitor, Smartphone, Palette, Server, ArrowRight, Hexagon, Laptop, Phone } from 'lucide-react';
import { projectsData } from './data/projects';
import ProjectDetails from './pages/ProjectDetails';

const Home = ({ setIsHovering }: any) => {
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);
  const navigate = useNavigate();

  const fadeUp: any = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
  };
  
  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            style={{ opacity: opacityHero }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="hero-badge">
              <span>✦</span> {t('hero.subtitle')}
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="hero-title text-gradient">
              {t('hero.title')}
            </motion.h1>
            
            <motion.p variants={fadeUp} className="hero-desc">
              {t('hero.description')}
            </motion.p>
            
            <motion.div variants={fadeUp} className="hero-btns">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
                style={{ fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {t('hero.cta')} <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-outline"
                style={{ fontFamily: 'inherit', fontSize: 'inherit', cursor: 'pointer' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {t('hero.secondaryCta')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {['React', 'Node.js', '.NET', 'Next.js', 'PostgreSQL', 'TypeScript', 'AWS', 'Docker', 'Python', 'React Native'].map((tech, i) => (
            <span key={i} className="marquee-item">{tech}</span>
          ))}
          {/* Duplicate for infinite effect */}
          {['React', 'Node.js', '.NET', 'Next.js', 'PostgreSQL', 'TypeScript', 'AWS', 'Docker', 'Python', 'React Native'].map((tech, i) => (
            <span key={`dup-${i}`} className="marquee-item">{tech}</span>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="section-subtitle">{t('services.subtitle')}</span>
            <h2 className="section-title text-accent">{t('services.title')}</h2>
          </motion.div>

          <motion.div 
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: <Monitor size={32}/>, title: t('services.web'), desc: t('services.webDesc') },
              { icon: <Smartphone size={32}/>, title: t('services.mobile'), desc: t('services.mobileDesc') },
              { icon: <Laptop size={32}/>, title: t('services.desktop'), desc: t('services.desktopDesc') },
              { icon: <Palette size={32}/>, title: t('services.uiux'), desc: t('services.uiuxDesc') },
              { icon: <Server size={32}/>, title: t('services.backend'), desc: t('services.backendDesc') },
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp} 
                className="service-card"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <span className="section-subtitle">{t('portfolio.subtitle')}</span>
            <h2 className="section-title text-accent">{t('portfolio.title')}</h2>
          </motion.div>

          <motion.div 
            className="portfolio-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {projectsData.map((project) => (
              <motion.div 
                key={project.id} 
                variants={fadeUp} 
                className="portfolio-item"
                onClick={() => navigate(`/project/${project.id}`)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="portfolio-img-wrapper">
                  <img src={project.mainImage} alt={t(`portfolio.title_${project.id}`)} className="portfolio-img" />
                </div>
                <div className="portfolio-overlay">
                  <span className="portfolio-category">{t(`portfolio.cat_${project.id}`)}</span>
                  <h3 className="portfolio-title">{t(`portfolio.title_${project.id}`)}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div 
            className="contact-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="contact-info">
              <span className="section-subtitle" style={{ display: 'block', marginBottom: '1rem' }}>
                {t('contact.subtitle')}
              </span>
              <h2 className="contact-title">{t('contact.title')}</h2>
              
              <div className="contact-info-item">
                <div className="contact-icon"><Hexagon /></div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t('contact.location')}</h4>
                  <p className="service-desc">{t('contact.locationValue')}</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <div className="contact-icon"><Globe /></div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t('contact.emailUs')}</h4>
                  <p className="service-desc">zamzamtech006@gmail.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon"><Phone /></div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{t('contact.callUs')}</h4>
                  <p className="service-desc" style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span>+201000444566</span>
                    <span>+201026449249</span>
                  </p>
                </div>
              </div>
            </div>

            <form className="contact-form" action="https://formsubmit.co/zamzamtech006@gmail.com" method="POST" target="_blank">
              <input type="hidden" name="_subject" value="ZAMZAM TECH 🚀 - رسالة جديدة من الموقع" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_autoresponse" value="شكرًا لتواصلك مع ZAMZAM TECH! لقد تلقينا رسالتك وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن. / Thank you for contacting ZAMZAM TECH! We have received your message and will reply shortly." />
              <input type="text" name="1. اسم العميل (Client Name)" className="form-input" placeholder={t('contact.name')} required />
              <input type="email" name="2. البريد الإلكتروني (Email)" className="form-input" placeholder={t('contact.email')} required />
              <input type="tel" name="3. رقم الهاتف (Phone)" className="form-input" placeholder={t('contact.phone')} style={{ textAlign: i18n.language === 'ar' ? 'right' : 'left' }} required />
              <textarea name="4. نص الرسالة (Message)" className="form-input" placeholder={t('contact.message')} required></textarea>
              <button 
                type="submit"
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {t('contact.send')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

function AppContent() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorRef = React.useRef<HTMLDivElement>(null);
  const lightRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        }
        if (lightRef.current) {
          lightRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
        }
        
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
          (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');

  return (
    <>
      <div className="bg-grid"></div>
      <div 
        ref={lightRef}
        className="ambient-light" 
        style={{ top: 0, left: 0 }}
      ></div>

      <div 
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{ top: 0, left: 0 }}
      ></div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <motion.div 
            className="logo-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src="/logo.png" alt="ZAMZAM TECH" className="brand-logo" style={{ height: '110px', objectFit: 'contain' }} />
            </Link>
          </motion.div>
          <ul className="nav-links">
            {['home', 'services', 'portfolio', 'contact'].map((item, idx) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <button 
                  onClick={() => {
                    if (item === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
                    else document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="nav-link"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}
                >
                  {t(`nav.${item}`)}
                </button>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            className="nav-controls"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button className="icon-btn" onClick={toggleLanguage} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <Globe size={18} />
            </button>
            <button className="icon-btn" onClick={toggleTheme} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home setIsHovering={setIsHovering} />} />
        <Route path="/project/:id" element={<ProjectDetails setIsHovering={setIsHovering} />} />
      </Routes>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo-text">
              <img src="/logo.png" alt="ZAMZAM TECH" className="brand-logo" style={{ height: '140px', objectFit: 'contain' }} />
            </div>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/zamzam-tech-software" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/abdelrahmanDev006" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://wa.me/201000444566" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="WhatsApp" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592211776886" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Facebook" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
