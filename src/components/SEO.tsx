import { useEffect } from 'react'

interface SEOSchemaProps {
  title?: string
  description?: string
  article?: {
    id: string
    title: string
    summary: string
    image: string
    author: string
    publishedAt: string
    category: string
    tags: string[]
  } | null
  breadcrumbs?: { name: string; url: string }[]
}

const SITE_URL = 'https://banglarvoice.com'
const SITE_NAME = 'BANGLAR VOICE'
const LOGO_URL = 'https://banglarvoice.com/logo.png'

export function SEOSchema({ title, description, article, breadcrumbs }: SEOSchemaProps) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — বাংলার ভয়েস`
  const pageDesc = description || 'বাংলাদেশের সবচেয়ে নির্ভরযোগ্য সংবাদ পortal। আমরা সঠিক, নিরপেক্ষ ও সময়োপযোগী সংবাদ প্রকাশে প্রতিশ্রুতিবদ্ধ।'

  useEffect(() => {
    document.title = pageTitle

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', pageDesc)
    else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = pageDesc
      document.head.appendChild(meta)
    }
  }, [pageTitle, pageDesc])

  const schemas: Record<string, unknown>[] = []

  // WebSite
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  })

  // Organization
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://facebook.com/banglarvoice',
      'https://twitter.com/banglarvoice',
      'https://youtube.com/banglarvoice',
      'https://instagram.com/banglarvoice',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1712-345678',
      contactType: 'Customer Support',
      areaServed: 'BD',
      availableLanguage: 'Bengali',
    },
  })

  // Person (CEO)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'MD DULAL HOSSAIN SARDER',
    jobTitle: 'Chief Executive Officer',
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  })

  // BreadcrumbList
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.url}`,
      })),
    })
  }

  // NewsArticle
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.summary,
      image: {
        '@type': 'ImageObject',
        url: article.image,
        width: 1200,
        height: 630,
      },
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: { '@type': 'ImageObject', url: LOGO_URL },
      },
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      articleSection: article.category,
      keywords: article.tags.join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/article/${article.id}`,
      },
    })
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  )
}
