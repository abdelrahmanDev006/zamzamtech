export interface ProjectItem {
  id: string;
  category: 'web' | 'desktop';
  tech: string[];
  mainImage: string;
  gallery: string[];
  features?: string[];
}

const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const img = (filename: string) => `${BASE}${filename.replace(/^\//, '')}`;

export const projectsData: ProjectItem[] = [
  {
    id: 'center-control',
    category: 'desktop',
    tech: ['Rust (Tauri v2)', 'React 19', 'TypeScript', 'SQLite (WAL)', 'Tailwind CSS', 'Recharts', 'Telegram Bot API', 'WhatsApp API'],
    features: [
      'Ultra-Fast Barcode Attendance Engine (< 100ms)',
      'Automated WhatsApp & Telegram Notifications',
      'Hardware Fingerprinting & Anti-Tamper Clock Guard',
      'Dynamic Pricing, Financial Analytics & Excel Export'
    ],
    mainImage: img('project-center-control.jpg'),
    gallery: [
      img('center-1.png'),
      img('center-2.png'),
      img('center-3.png'),
      img('center-4.png'),
      img('center-5.png'),
      img('center-6.png'),
      img('center-7.png')
    ]
  },
  {
    id: 'flow-accounting',
    category: 'desktop',
    tech: ['Electron 33', 'React 18', 'TypeScript 5', 'Better-SQLite3 (WAL)', 'Ant Design v5', 'Zustand v5', 'Express 5 (LAN)', 'bcryptjs'],
    features: [
      '100% Offline-First Architecture & LAN Sharing',
      'Robust tx() ACID Transactions Wrapper',
      'High Security & Privacy Mode (👁️)',
      'POS, Shifts, Inventory & Instant P&L Statements'
    ],
    mainImage: img('project-flow.jpg'),
    gallery: [
      img('flow-1.png'),
      img('flow-2.png'),
      img('flow-3.png'),
      img('flow-4.png'),
      img('flow-5.png'),
      img('flow-6.png'),
      img('flow-7.png')
    ]
  },
  {
    id: 'crm-system',
    category: 'web',
    tech: ['React', 'Vite', 'Vanilla CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Zod', 'JWT', 'xlsx-populate'],
    features: [
      'Client-Server Architecture & Fast API',
      'Role-Based Access Control (RBAC)',
      'Large Datasets Handling & Excel Export',
      'Secure Authentication & Token Management'
    ],
    mainImage: img('project-crm.png'),
    gallery: [
      img('crm-1.png'),
      img('crm-2.png'),
      img('crm-3.png'),
      img('crm-4.png'),
      img('crm-5.png')
    ]
  },
  {
    id: 'quran-audio-platform',
    category: 'web',
    tech: ['HTML5 & CSS3', 'Vanilla JS (ES6+)', 'PWA', 'Service Worker', 'Custom Audio Player', 'DOM Manipulation'],
    features: [
      'Progressive Web App (PWA) Offline-Ready',
      'Custom Audio Player with Continuous Play',
      'Natural Sort Surah Algorithm',
      'Instant Search & Responsive UI'
    ],
    mainImage: img('project-quran.png'),
    gallery: [
      img('quran-1.png'),
      img('quran-2.png'),
      img('quran-3.png'),
      img('quran-4.png'),
      img('quran-5.png'),
      img('quran-6.png')
    ]
  },
  {
    id: 'dustout-platform',
    category: 'web',
    tech: ['React 19', 'Vite 8', 'React Router v7', 'Custom CSS Design System', 'Supabase', 'REST API', 'Meta / TikTok / Snap Pixels', 'Microsoft Clarity'],
    features: [
      'Dual-Mode E-Commerce (Direct Sale & Monthly Rental)',
      'Interactive Slide-Over Cart & Instant Order Form',
      'Comprehensive Admin Dashboard for Orders & Products',
      'Multi-Platform Ad Pixel Injections & Session Analytics'
    ],
    mainImage: img('project-dustout.png'),
    gallery: [
      img('dustout-1.png'),
      img('dustout-2.png'),
      img('dustout-3.png'),
      img('dustout-4.png'),
      img('dustout-5.png'),
      img('dustout-6.png'),
      img('dustout-7.png'),
      img('dustout-8.png'),
      img('dustout-9.png'),
      img('dustout-10.png')
    ]
  },
  {
    id: 'supermarket-pos',
    category: 'desktop',
    tech: ['React.js', 'Electron.js', 'SQLite3', 'Tailwind CSS'],
    features: [
      '100% Offline-First Data Architecture',
      'Complete Point-of-Sale & Cashier Cycle',
      'Shift Earnings & Net Profit Calculation',
      'Direct Thermal Receipt Printer Support'
    ],
    mainImage: img('project-pos.png'),
    gallery: [
      img('pos-1.png'),
      img('pos-2.png'),
      img('pos-3.png'),
      img('pos-4.png'),
      img('pos-5.png'),
      img('pos-6.png'),
      img('pos-7.png'),
      img('pos-8.png'),
      img('pos-9.png')
    ]
  },
  {
    id: 'zamzam-system',
    category: 'desktop',
    tech: ['React.js', 'Electron.js', 'SQLite3', 'Vanilla CSS'],
    features: [
      'Full Repair Lifecycle Ticketing System',
      'Interactive Analytics & Insights Dashboard',
      'Instant Invoice Generation & Printing',
      'Fast CSV Database Backup & Restore'
    ],
    mainImage: img('project-zamzam.png'),
    gallery: [
      img('zamzam-1.png'),
      img('zamzam-2.png'),
      img('zamzam-3.png'),
      img('zamzam-4.png'),
      img('zamzam-5.png')
    ]
  }
];
