import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mlhospital.in'; // Replace with actual domain if different

  const routes = [
    '',
    '/services',
    '/insurance',
    '/gallery',
    '/about',
    '/contact',
    '/second-opinion',
    '/emergency',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : 0.8,
  }));
}
