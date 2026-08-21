import { MetadataRoute } from 'next'
import { createClient } from "@supabase/supabase-js";

const BASE_URL = 'https://archstrucgroup.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  let projectPages: MetadataRoute.Sitemap = []

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: projects } = await supabase
      .from('projects')
      .select('slug, updated_at')

    if (projects) {
      projectPages = projects.map(
        (project: { slug: string; updated_at?: string | null }) => ({
          url: `${BASE_URL}/projects/${project.slug}`,
          lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })
      )
    }
  } catch (error) {
    console.error('Sitemap: failed to fetch projects', error)
  }

  return [...staticPages, ...projectPages]
}