
interface SitemapData {
  articles: { id: string; updated_at: string }[]
  categories: { slug: string; updated_at: string }[]
  authors: { id: string; updated_at: string }[]
}

const SITE_URL = 'https://banglarvoice.com'

const STATIC_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/mission', priority: 0.7, changefreq: 'monthly' },
  { url: '/e-paper', priority: 0.8, changefreq: 'daily' },
  { url: '/learning-hub', priority: 0.7, changefreq: 'weekly' },
  { url: '/breaking', priority: 0.9, changefreq: 'hourly' },
  { url: '/national', priority: 0.9, changefreq: 'daily' },
  { url: '/politics', priority: 0.9, changefreq: 'daily' },
  { url: '/economy', priority: 0.9, changefreq: 'daily' },
  { url: '/international', priority: 0.9, changefreq: 'daily' },
  { url: '/sports', priority: 0.9, changefreq: 'daily' },
  { url: '/entertainment', priority: 0.8, changefreq: 'daily' },
  { url: '/tech', priority: 0.8, changefreq: 'daily' },
  { url: '/education', priority: 0.8, changefreq: 'daily' },
  { url: '/health', priority: 0.8, changefreq: 'daily' },
]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toISOString().split('T')[0]
}

export function generateSitemap(data: SitemapData): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // Static pages
  for (const page of STATIC_PAGES) {
    xml += `  <url>\n`
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`
    xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`
    xml += `  </url>\n`
  }

  // Categories
  for (const cat of data.categories) {
    xml += `  <url>\n`
    xml += `    <loc>${SITE_URL}/category/${cat.slug}</loc>\n`
    xml += `    <lastmod>${formatDate(cat.updated_at)}</lastmod>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `    <changefreq>daily</changefreq>\n`
    xml += `  </url>\n`
  }

  // Articles
  for (const article of data.articles) {
    xml += `  <url>\n`
    xml += `    <loc>${SITE_URL}/article/${article.id}</loc>\n`
    xml += `    <lastmod>${formatDate(article.updated_at)}</lastmod>\n`
    xml += `    <priority>0.9</priority>\n`
    xml += `    <changefreq>daily</changefreq>\n`
    xml += `  </url>\n`
  }

  // Authors
  for (const author of data.authors) {
    xml += `  <url>\n`
    xml += `    <loc>${SITE_URL}/author/${author.id}</loc>\n`
    xml += `    <lastmod>${formatDate(author.updated_at)}</lastmod>\n`
    xml += `    <priority>0.6</priority>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `  </url>\n`
  }

  xml += '</urlset>'
  return xml
}

export function SitemapLink() {
  return (
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
  )
}
