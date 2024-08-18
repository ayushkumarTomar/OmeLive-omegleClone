import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://omelive.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 1,
    },
    {
      url: 'https://omelive.vercel.app/meet',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.9,
    }
  ]
}