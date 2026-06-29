import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SITE_URL = "https://banglarvoice.com";

const STATIC_PAGES = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/about", priority: 0.7, changefreq: "monthly" },
  { url: "/mission", priority: 0.7, changefreq: "monthly" },
  { url: "/e-paper", priority: 0.8, changefreq: "daily" },
  { url: "/learning-hub", priority: 0.7, changefreq: "weekly" },
  { url: "/breaking", priority: 0.9, changefreq: "hourly" },
  { url: "/national", priority: 0.9, changefreq: "daily" },
  { url: "/politics", priority: 0.9, changefreq: "daily" },
  { url: "/economy", priority: 0.9, changefreq: "daily" },
  { url: "/international", priority: 0.9, changefreq: "daily" },
  { url: "/sports", priority: 0.9, changefreq: "daily" },
  { url: "/entertainment", priority: 0.8, changefreq: "daily" },
  { url: "/tech", priority: 0.8, changefreq: "daily" },
  { url: "/education", priority: 0.8, changefreq: "daily" },
  { url: "/health", priority: 0.8, changefreq: "daily" },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const headers = {
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
    };

    // Fetch articles
    const articlesRes = await fetch(
      `${supabaseUrl}/rest/v1/articles?select=id,updated_at&limit=1000&order=updated_at.desc`,
      { headers }
    );
    const articles = await articlesRes.json();

    // Fetch categories
    const categoriesRes = await fetch(
      `${supabaseUrl}/rest/v1/categories?select=slug,updated_at`,
      { headers }
    );
    const categories = await categoriesRes.json();

    // Fetch authors
    const authorsRes = await fetch(
      `${supabaseUrl}/rest/v1/authors?select=id,updated_at`,
      { headers }
    );
    const authors = await authorsRes.json();

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    for (const page of STATIC_PAGES) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
      xml += `    <priority>${page.priority.toFixed(1)}</priority>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `  </url>\n`;
    }

    // Categories
    for (const cat of categories) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/category/${cat.slug}</loc>\n`;
      xml += `    <lastmod>${formatDate(cat.updated_at || new Date().toISOString())}</lastmod>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `  </url>\n`;
    }

    // Articles
    for (const article of articles) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/article/${article.id}</loc>\n`;
      xml += `    <lastmod>${formatDate(article.updated_at || new Date().toISOString())}</lastmod>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `  </url>\n`;
    }

    // Authors
    for (const author of authors) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/author/${author.id}</loc>\n`;
      xml += `    <lastmod>${formatDate(author.updated_at || new Date().toISOString())}</lastmod>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `  </url>\n`;
    }

    xml += "</urlset>";

    return new Response(xml, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
