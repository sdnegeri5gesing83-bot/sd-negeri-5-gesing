import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sdn5gesing.sch.id/sitemap.xml',
    host: 'https://sdn5gesing.sch.id',
  };
}
