// Robots.txt configuration
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    ],
    sitemap: 'https://75daysenglish.com/sitemap.xml',
  };
}
