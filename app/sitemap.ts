import { MetadataRoute } from 'next';

/**
 * Generates the sitemap for the portfolio site
 * Next.js will automatically serve this at /sitemap.xml
 * @returns Sitemap configuration for search engines
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://allanilyasov.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/Allan Resume Portfolio.pdf`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
