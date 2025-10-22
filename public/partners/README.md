# Partner Logos

This directory contains partner logos for the KmerHosting website.

## Required Logo Files

Place the following SVG files in this directory:

1. `sectigo.svg` - Sectigo SSL Certificate Provider
2. `litespeed.svg` - LiteSpeed Web Server
3. `cloudlinux.svg` - CloudLinux OS
4. `whmcs.svg` - WHMCS Billing Platform
5. `softaculous.svg` - Softaculous Auto Installer
6. `cloudflare.svg` - Cloudflare CDN
7. `white_directadmin.svg` - DirectAdmin Control Panel
8. `jetbackup.svg` - JetBackup Backup Solution

## Logo Requirements

- **Format**: SVG (preferred for scalability)
- **Size**: Optimize for web (keep file size under 50KB)
- **Dimensions**: Logos will be displayed in a 192x96px container
- **Color**: Can be full color (grayscale filter applied via CSS)
- **Background**: Transparent background recommended

## Where to Get Logos

Most partner logos can be downloaded from:

1. **Sectigo**: <https://sectigo.com/company/brand-assets>
2. **LiteSpeed**: <https://www.litespeedtech.com/company/press-center>
3. **CloudLinux**: <https://www.cloudlinux.com/company/press-center>
4. **WHMCS**: <https://www.whmcs.com/company/media-kit>
5. **Softaculous**: <https://www.softaculous.com/media>
6. **Cloudflare**: <https://www.cloudflare.com/press/>
7. **DirectAdmin**: <https://www.directadmin.com/company/media-kit>
8. **JetBackup**: <https://www.jetbackup.com/company/media-kit>

## Image Optimization

Before adding logos, optimize them:

```bash
# Using SVGO (install with: npm install -g svgo)
svgo logo.svg -o optimized-logo.svg
```

## Usage

These logos are automatically loaded by the Partners component:
`components/sections/partners.tsx`

## Legal Notice

Partner logos are trademarks of their respective companies. Use according to each company's brand guidelines and trademark policies.
