import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/dashboard/',
          '/login',
          '/sign-up',
        ],
      },
    ],
    sitemap: 'https://archstrucgroup.com/sitemap.xml',
  }
}