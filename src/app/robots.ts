import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://my-project-topaz-kappa.vercel.app/sitemap.xml',
    host: 'https://my-project-topaz-kappa.vercel.app',
  };
}
