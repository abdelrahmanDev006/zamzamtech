export interface ProjectItem {
  id: string;
  category: 'web' | 'desktop';
  tech: string[];
  mainImage: string;
  gallery: string[];
  features?: string[];
}

export const projectsData: ProjectItem[] = [
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
    mainImage: '/project-crm.png',
    gallery: [
      '/crm-1.png',
      '/crm-2.png',
      '/crm-3.png',
      '/crm-4.png',
      '/crm-5.png'
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
    mainImage: '/project-quran.png',
    gallery: [
      '/quran-1.png',
      '/quran-2.png',
      '/quran-3.png',
      '/quran-4.png',
      '/quran-5.png',
      '/quran-6.png'
    ]
  },
  {
    id: 'dustout-platform',
    category: 'web',
    tech: ['React 19', 'Vite', 'Vanilla CSS3', 'React Router v7', 'Supabase', 'Nginx'],
    features: [
      'B2B & B2C Product Showcase & Catalog',
      'Glassmorphic & Sleek Modern Aesthetics',
      'Lightning Fast Single Page Application (SPA)',
      'Optimized RTL & Arabic User Experience'
    ],
    mainImage: '/project-dustout.png',
    gallery: [
      '/dustout-1.png',
      '/dustout-2.png',
      '/dustout-3.png',
      '/dustout-4.png',
      '/dustout-5.png',
      '/dustout-6.png',
      '/dustout-7.png',
      '/dustout-8.png'
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
    mainImage: '/project-pos.png',
    gallery: [
      '/pos-1.png',
      '/pos-2.png',
      '/pos-3.png',
      '/pos-4.png',
      '/pos-5.png',
      '/pos-6.png',
      '/pos-7.png',
      '/pos-8.png',
      '/pos-9.png'
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
    mainImage: '/project-zamzam.png',
    gallery: [
      '/zamzam-1.png',
      '/zamzam-2.png',
      '/zamzam-3.png',
      '/zamzam-4.png',
      '/zamzam-5.png'
    ]
  }
];
