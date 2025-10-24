import type { MetadataRoute } from "next"

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 0,
      },
    ],
    sitemap: "https://kmerhosting.com/sitemap.xml",
    host: "https://kmerhosting.com",
  }
}
