// Sitemap generator for SEO
export default function sitemap() {
  const base = 'https://75daysenglish.com';
  const routes = [
    '', '/login', '/register', '/75-days-challenge',
    '/dashboard', '/vocabulary', '/grammar-reference',
    '/leaderboard', '/achievements', '/progress',
    '/analytics', '/ai-tutor', '/assessment',
    '/speaking', '/writing', '/profile',
  ];
  const days = Array.from({ length: 75 }, (_, i) => `/75-days-challenge/${i + 1}`);

  return [...routes, ...days].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
