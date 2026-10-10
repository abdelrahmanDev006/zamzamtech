import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  X,
  Globe,
  Sun,
  Moon,
  Printer,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Radio,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  Monitor,
  GraduationCap,
  ShoppingBag,
  Layers,
  Check,
  ChevronRight,
} from 'lucide-react';
import { projectsData } from '../data/projects';
import './Presentation.css';

interface PresentationProps {
  setIsHovering?: (val: boolean) => void;
  theme: string;
  onToggleTheme: () => void;
}
const slides = [
  { key: 'cover' },
  { key: 'about' },
  { key: 'services' },
  { key: 'riwaq', project: 'riwaq-platform' },
  { key: 'center', project: 'center-control' },
  { key: 'flow', project: 'flow-accounting' },
  { key: 'dustout', project: 'dustout-platform' },
  { key: 'more' },
  { key: 'process' },
  { key: 'engineering' },
  { key: 'delivery' },
  { key: 'contact' },
];
const secondaryProjects = [
  'crm-system',
  'supermarket-pos',
  'zamzam-system',
  'quran-audio-platform',
];
const logo = `${import.meta.env.BASE_URL}logo.png`;

export default function Presentation({
  setIsHovering,
  theme,
  onToggleTheme,
}: PresentationProps) {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [laser, setLaser] = useState(false);
  const [laserPosition, setLaserPosition] = useState({ x: -100, y: -100 });
  const dialogRef = useRef<HTMLDivElement>(null);
  const gridButtonRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const rtl = i18n.language === 'ar';
  const copy = (key: string, field: string) =>
    t(`presentation.profile.${key}.${field}`);
  const ui = (key: string) => t(`presentation.${key}`);
  const navigate = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(slides.length - 1, index)));
    stageRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      /* The browser can decline fullscreen; navigation remains available. */
    }
  }, []);

  useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);
  useEffect(() => {
    if (!showGrid) return;
    const trigger = gridButtonRef.current;
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return () => trigger?.focus();
  }, [showGrid]);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"]'))
        return;
      if (showGrid) {
        if (event.key === 'Escape') setShowGrid(false);
        if (event.key === 'Tab') {
          const buttons =
            dialogRef.current?.querySelectorAll<HTMLButtonElement>('button');
          if (!buttons?.length) return;
          const first = buttons[0],
            last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const forward = rtl
          ? event.key === 'ArrowLeft'
          : event.key === 'ArrowRight';
        navigate(current + (forward ? 1 : -1));
      } else if (event.key === ' ' && !target.closest('button, a')) {
        event.preventDefault();
        navigate(current + 1);
      } else if (event.key.toLowerCase() === 'g') setShowGrid(true);
      else if (event.key.toLowerCase() === 'f') void toggleFullscreen();
      else if (event.key.toLowerCase() === 'l') setLaser((value) => !value);
      else if (event.key === 'Escape') setLaser(false);
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [current, navigate, rtl, showGrid, toggleFullscreen]);
  useEffect(() => {
    if (!laser) return;
    const track = (event: MouseEvent) =>
      setLaserPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', track);
    return () => window.removeEventListener('mousemove', track);
  }, [laser]);

  const toggleLanguage = () => {
    const next = rtl ? 'en' : 'ar';
    void i18n.changeLanguage(next);
    localStorage.setItem('lng', next);
  };
  const Forward = rtl ? ArrowLeft : ArrowRight;
  const Back = rtl ? ArrowRight : ArrowLeft;
  const screenshot = (id: string) =>
    projectsData.find((project) => project.id === id)?.mainImage;
  const heading = (key: string) => (
    <div className="profile-heading">
      <span className="profile-eyebrow">{copy(key, 'eyebrow')}</span>
      <h2>{copy(key, 'title')}</h2>
      <p>{copy(key, 'subtitle')}</p>
    </div>
  );
  const renderSlide = (index: number) => {
    const { key, project: projectId } = slides[index];
    if (key === 'cover')
      return (
        <section className="profile-slide profile-cover">
          <div className="profile-cover-copy">
            <span className="profile-eyebrow">
              {copy(key, 'eyebrow')} <span>2026</span>
            </span>
            <div className="profile-wordmark" dir="ltr">
              ZAMZAM
              <span>
                TECH<span className="profile-square">.</span>
              </span>
            </div>
            <h1>{copy(key, 'title')}</h1>
            <p className="profile-intro">{copy(key, 'subtitle')}</p>
            <div className="profile-cover-tags">
              {[1, 2, 3].map((n) => (
                <span key={n}>{copy(key, `tag${n}`)}</span>
              ))}
            </div>
            <button className="profile-primary" onClick={() => navigate(3)}>
              {ui('exploreWork')}
              <Forward size={18} />
            </button>
          </div>
          <div className="profile-cover-art">
            <div className="profile-art-label">
              <span>{ui('selectedWork')}</span>
              <span dir="ltr">01 — 08</span>
            </div>
            <div className="profile-cover-image">
              <img
                src={screenshot('riwaq-platform')}
                alt={t('portfolio.title_riwaq-platform')}
              />
              <span className="profile-image-caption">RIWAQ / E-LEARNING</span>
            </div>
            <div className="profile-art-bottom">
              <span>{copy(key, 'artText')}</span>
              <span className="profile-large-arrow">↗</span>
            </div>
          </div>
        </section>
      );
    if (projectId) {
      const project = projectsData.find((item) => item.id === projectId)!;
      return (
        <section className="profile-slide profile-project">
          {heading(key)}
          <div className="profile-project-layout">
            <div className="profile-project-visual">
              <div className="profile-image-bar">
                <span />
                <span />
                <span />
                <span className="profile-image-type">{copy(key, 'type')}</span>
              </div>
              <img
                src={project.mainImage}
                alt={t(`portfolio.title_${project.id}`)}
              />
              <div className="profile-tech">
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
            <div className="profile-case-copy">
              {['challenge', 'solution', 'value'].map((field, n) => (
                <div className="profile-case-row" key={field}>
                  <span className="profile-row-index">0{n + 1}</span>
                  <div>
                    <h3>{ui(field)}</h3>
                    <p>{copy(key, field)}</p>
                  </div>
                </div>
              ))}
              <Link
                className="profile-text-link"
                to={`/project/${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui('viewProjectDetails')}
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </section>
      );
    }
    if (key === 'about')
      return (
        <section className="profile-slide">
          {heading(key)}
          <div className="profile-about-layout">
            <p className="profile-about-statement">{copy(key, 'body')}</p>
            <div className="profile-about-list">
              {[1, 2, 3].map((n) => (
                <div className="profile-about-row" key={n}>
                  <span>0{n}</span>
                  <div>
                    <h3>{copy(key, `item${n}Title`)}</h3>
                    <p>{copy(key, `item${n}Body`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="profile-footnote">{copy(key, 'footnote')}</div>
        </section>
      );
    if (key === 'more')
      return (
        <section className="profile-slide">
          {heading(key)}
          <div className="profile-more-grid">
            {secondaryProjects.map((id, n) => (
              <Link
                key={id}
                to={`/project/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-more-project"
              >
                <img src={screenshot(id)} alt={t(`portfolio.title_${id}`)} />
                <div>
                  <span className="profile-eyebrow">0{n + 5}</span>
                  <h3>{t(`portfolio.title_${id}`)}</h3>
                  <p>{copy(key, `item${n + 1}Body`)}</p>
                  <span className="profile-text-link">
                    {ui('viewProjectDetails')}
                    <ExternalLink size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      );
    if (key === 'contact')
      return (
        <section className="profile-slide profile-contact">
          <div className="profile-contact-main">
            <span className="profile-eyebrow">{copy(key, 'eyebrow')}</span>
            <h2>
              {copy(key, 'title')}
              <span className="profile-square">.</span>
            </h2>
            <p>{copy(key, 'subtitle')}</p>
            <a
              className="profile-primary"
              href="https://wa.me/201009693397"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} />
              {ui('whatsapp')}
            </a>
            <a
              className="profile-text-link"
              href="mailto:zamzamtech006@gmail.com"
            >
              {ui('email')}
              <Forward size={18} />
            </a>
          </div>
          <div className="profile-contact-details">
            <img src={logo} className="profile-logo" alt="Zamzam Tech" />
            <a href="mailto:zamzamtech006@gmail.com">
              <Mail size={20} />
              <span dir="ltr">zamzamtech006@gmail.com</span>
            </a>
            <a href="tel:+201009693397">
              <Phone size={20} />
              <span dir="ltr">+20 100 969 3397</span>
            </a>
            <Link to="/">
              <Globe size={20} />
              <span>zamzamtech / portfolio</span>
            </Link>
            <p>{copy(key, 'location')}</p>
            <div className="profile-contact-note">{copy(key, 'note')}</div>
          </div>
        </section>
      );
    const icons = [Monitor, GraduationCap, ShoppingBag, Layers];
    return (
      <section className={`profile-slide profile-${key}`}>
        {heading(key)}
        <div
          className={key === 'process' ? 'profile-steps' : 'profile-info-grid'}
        >
          {[1, 2, 3, 4].map((n) => {
            const Icon = icons[n - 1];
            return (
              <div className="profile-info-item" key={n}>
                <div className="profile-info-top">
                  <span className="profile-row-index">0{n}</span>
                  {key === 'services' ? (
                    <Icon size={24} />
                  ) : (
                    <Check size={22} />
                  )}
                </div>
                <h3>{copy(key, `item${n}Title`)}</h3>
                <p>{copy(key, `item${n}Body`)}</p>
              </div>
            );
          })}
        </div>
        <div className="profile-footnote">{copy(key, 'footnote')}</div>
      </section>
    );
  };

  return (
    <div
      className={`profile ${laser ? 'profile-laser-on' : ''}`}
      dir={rtl ? 'rtl' : 'ltr'}
      onMouseOver={() => setIsHovering?.(false)}
    >
      <header className="profile-toolbar">
        <Link to="/" className="profile-return" aria-label={ui('exit')}>
          <Back size={18} />
          <span>{ui('exit')}</span>
        </Link>
        <div className="profile-toolbar-title">
          ZAMZAM TECH <span>/ {ui('headerBadge')}</span>
        </div>
        <div className="profile-tools">
          <button
            ref={gridButtonRef}
            onClick={() => setShowGrid(true)}
            aria-label={ui('gridOverview')}
            title={ui('gridOverview')}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setLaser((value) => !value)}
            aria-label={ui('laserPointer')}
            aria-pressed={laser}
            title={ui('laserPointer')}
          >
            <Radio size={18} />
          </button>
          <button
            onClick={onToggleTheme}
            aria-label={ui(theme === 'dark' ? 'lightMode' : 'darkMode')}
            title={ui(theme === 'dark' ? 'lightMode' : 'darkMode')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={toggleLanguage}
            aria-label={rtl ? 'English' : 'العربية'}
          >
            <span>{rtl ? 'EN' : 'AR'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="profile-export"
            aria-label={ui('exportPdf')}
          >
            <Printer size={17} />
            <span>PDF</span>
          </button>
          <button
            onClick={() => void toggleFullscreen()}
            aria-label={ui(fullscreen ? 'exitFullscreen' : 'fullscreen')}
            title={ui(fullscreen ? 'exitFullscreen' : 'fullscreen')}
          >
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </header>
      <main ref={stageRef} className="profile-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="profile-slide-wrap"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
          >
            {renderSlide(current)}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="profile-navigation">
        <div className="profile-page-label">
          <span>{String(current + 1).padStart(2, '0')}</span>
          <span>/ {String(slides.length).padStart(2, '0')}</span>
          <span className="profile-current-title">
            {copy(slides[current].key, 'eyebrow')}
          </span>
        </div>
        <div
          className="profile-progress"
          role="group"
          aria-label={ui('progress')}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              onClick={() => navigate(index)}
              aria-label={t('presentation.slideLabel', { number: index + 1 })}
              aria-current={current === index ? 'step' : undefined}
              className={index <= current ? 'filled' : ''}
            />
          ))}
        </div>
        <div className="profile-arrows">
          <button
            onClick={() => navigate(current - 1)}
            disabled={current === 0}
            aria-label={ui('previous')}
          >
            <Back size={20} />
          </button>
          <button
            onClick={() => navigate(current + 1)}
            disabled={current === slides.length - 1}
            aria-label={ui('next')}
          >
            <Forward size={20} />
          </button>
        </div>
      </footer>
      {laser && (
        <div
          className="profile-laser"
          style={{ left: laserPosition.x, top: laserPosition.y }}
        />
      )}
      {showGrid && (
        <div
          className="profile-modal-backdrop"
          onClick={() => setShowGrid(false)}
        >
          <div
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-index-title"
            ref={dialogRef}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profile-modal-heading">
              <h2 id="profile-index-title">{ui('gridOverview')}</h2>
              <button
                onClick={() => setShowGrid(false)}
                aria-label={ui('closeGrid')}
              >
                <X size={22} />
              </button>
            </div>
            <div className="profile-index">
              {slides.map((slide, index) => (
                <button
                  key={slide.key}
                  className={current === index ? 'active' : ''}
                  onClick={() => {
                    navigate(index);
                    setShowGrid(false);
                  }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <small>{copy(slide.key, 'eyebrow')}</small>
                    <h3>{copy(slide.key, 'title')}</h3>
                  </div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="profile-print">
        {slides.map((slide, index) => (
          <article className="profile-print-page" key={slide.key}>
            <header>
              <span>ZAMZAM TECH / {ui('headerBadge')}</span>
              <span>
                {index + 1} / {slides.length}
              </span>
            </header>
            {renderSlide(index)}
            <footer>
              <span>zamzamtech006@gmail.com</span>
              <span dir="ltr">+20 100 969 3397</span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
