export interface ProductFeature {
  name: string
  description: string
  included: boolean
}

export interface ProductInfo {
  name: string
  description: string
  features: ProductFeature[]
  isPopular?: boolean
}

export const productInfoData: Record<string, ProductInfo> = {
  // Shared Hosting - cPanel
  "/products/shared/cpanel/wordpress": {
    name: "WordPress Hosting (cPanel)",
    description: "Optimized WordPress hosting with pre-installed WordPress, automatic updates, and enhanced performance for WordPress websites.",
    isPopular: true,
    features: [
      { name: "Pre-installed WordPress", description: "Ready-to-use WordPress installation", included: true },
      { name: "Automatic Updates", description: "WordPress core and plugin updates", included: true },
      { name: "WP-CLI Access", description: "Command line interface for WordPress", included: true },
      { name: "WordPress Toolkit", description: "Advanced WordPress management tools", included: true },
      { name: "Free SSL Certificate", description: "Secure your website with SSL encryption", included: true },
      { name: "Daily Backups", description: "Automatic daily website backups", included: true },
      { name: "99.9% Uptime", description: "Guaranteed server uptime", included: true },
      { name: "24/7 Support", description: "Round-the-clock technical assistance", included: true },
    ]
  },
  "/products/shared/cpanel/nodejs": {
    name: "Node.js Hosting (cPanel)",
    description: "High-performance Node.js hosting environment with full npm support and process management for modern web applications.",
    features: [
      { name: "Latest Node.js Versions", description: "Support for multiple Node.js versions", included: true },
      { name: "NPM Package Manager", description: "Full npm and yarn support", included: true },
      { name: "Process Management", description: "PM2 process manager included", included: true },
      { name: "MongoDB Support", description: "Database support for Node.js apps", included: true },
      { name: "Git Integration", description: "Deploy directly from Git repositories", included: true },
      { name: "Express.js Ready", description: "Pre-configured for Express.js applications", included: true },
      { name: "WebSocket Support", description: "Real-time communication support", included: true },
      { name: "SSD Storage", description: "Fast SSD storage for better performance", included: true },
    ]
  },
  "/products/shared/cpanel/php": {
    name: "PHP Hosting (cPanel)",
    description: "Professional PHP hosting with multiple PHP versions, advanced caching, and optimized server configurations for PHP applications.",
    features: [
      { name: "Multiple PHP Versions", description: "PHP 7.4, 8.0, 8.1, 8.2, 8.3 support", included: true },
      { name: "OPcache Enabled", description: "PHP opcode caching for better performance", included: true },
      { name: "Composer Support", description: "PHP dependency manager included", included: true },
      { name: "MySQL/MariaDB", description: "Database support with phpMyAdmin", included: true },
      { name: "Zend Extensions", description: "Popular PHP extensions pre-installed", included: true },
      { name: "Error Logging", description: "Detailed PHP error logs", included: true },
      { name: "Memory Allocation", description: "Optimized PHP memory limits", included: true },
      { name: "Cron Jobs", description: "Scheduled task execution", included: true },
    ]
  },
  "/products/shared/cpanel/python": {
    name: "Python Hosting (cPanel)",
    description: "Advanced Python hosting with multiple Python versions, virtual environments, and framework support for data science and web development.",
    features: [
      { name: "Python 3.x Support", description: "Latest Python versions available", included: true },
      { name: "Virtual Environments", description: "Isolated Python environments", included: true },
      { name: "pip Package Manager", description: "Install Python packages easily", included: true },
      { name: "Django/Flask Ready", description: "Pre-configured for popular frameworks", included: true },
      { name: "PostgreSQL Support", description: "Advanced database support", included: true },
      { name: "Jupyter Notebooks", description: "Interactive Python development", included: true },
      { name: "NumPy/Pandas", description: "Data science libraries included", included: true },
      { name: "WSGI Support", description: "Python web application deployment", included: true },
    ]
  },
  "/products/shared/cpanel/ruby": {
    name: "Ruby Hosting (cPanel)",
    description: "Ruby hosting environment with RVM support, Rails framework, and optimized configurations for Ruby applications.",
    features: [
      { name: "Ruby Version Manager", description: "Multiple Ruby versions with RVM", included: true },
      { name: "Ruby on Rails", description: "Full Rails framework support", included: true },
      { name: "Bundler Support", description: "Gem dependency management", included: true },
      { name: "PostgreSQL/MySQL", description: "Database support for Rails apps", included: true },
      { name: "Asset Pipeline", description: "Optimized asset compilation", included: true },
      { name: "Puma Web Server", description: "High-performance Ruby web server", included: true },
      { name: "Rake Tasks", description: "Automated task execution", included: true },
      { name: "Passenger Deploy", description: "Easy Ruby application deployment", included: true },
    ]
  },
  "/products/shared/cpanel/ecommerce": {
    name: "E-commerce Hosting (cPanel)",
    description: "Specialized hosting for online stores with PCI compliance, enhanced security, and e-commerce platform optimizations.",
    isPopular: true,
    features: [
      { name: "PCI DSS Compliance", description: "Secure payment processing standards", included: true },
      { name: "SSL Certificate", description: "256-bit SSL encryption included", included: true },
      { name: "Shopping Cart Software", description: "Multiple e-commerce platforms", included: true },
      { name: "Payment Gateway Integration", description: "Support for major payment providers", included: true },
      { name: "Inventory Management", description: "Stock tracking and management", included: true },
      { name: "CDN Integration", description: "Fast global content delivery", included: true },
      { name: "Advanced Security", description: "DDoS protection and firewall", included: true },
      { name: "Backup & Recovery", description: "Automated e-commerce backups", included: true },
    ]
  },
  "/products/shared/cpanel/woocommerce": {
    name: "WooCommerce Hosting (cPanel)",
    description: "Optimized WordPress hosting specifically configured for WooCommerce stores with enhanced performance and security features.",
    isPopular: true,
    features: [
      { name: "WooCommerce Pre-installed", description: "Ready-to-use WooCommerce setup", included: true },
      { name: "WordPress + WooCommerce Optimized", description: "Server tuned for WooCommerce", included: true },
      { name: "WooCommerce Plugins", description: "Essential WooCommerce extensions", included: true },
      { name: "Payment Gateways", description: "PayPal, Stripe, and more", included: true },
      { name: "Product Import/Export", description: "Bulk product management tools", included: true },
      { name: "Order Management", description: "Advanced order processing", included: true },
      { name: "Shipping Integration", description: "Multiple shipping providers", included: true },
      { name: "Performance Caching", description: "WooCommerce-specific caching", included: true },
    ]
  },

  // Shared Hosting - DirectAdmin (similar features but with DirectAdmin panel)
  "/products/shared/directadmin/wordpress": {
    name: "WordPress Hosting (DirectAdmin)",
    description: "WordPress hosting with DirectAdmin control panel, offering a lightweight and efficient management interface.",
    features: [
      { name: "Pre-installed WordPress", description: "Ready-to-use WordPress installation", included: true },
      { name: "DirectAdmin Panel", description: "Lightweight, fast control panel", included: true },
      { name: "WordPress Toolkit", description: "Advanced WordPress management tools", included: true },
      { name: "Free SSL Certificate", description: "Secure your website with SSL encryption", included: true },
      { name: "Daily Backups", description: "Automatic daily website backups", included: true },
      { name: "99.9% Uptime", description: "Guaranteed server uptime", included: true },
      { name: "Resource Monitoring", description: "Real-time resource usage tracking", included: true },
      { name: "24/7 Support", description: "Round-the-clock technical assistance", included: true },
    ]
  },

  // Reseller Hosting - cPanel
  "/products/reseller/cpanel/alpha": {
    name: "Alpha Reseller (cPanel)",
    description: "Our premium reseller hosting solution with maximum resources, white-label capabilities, and advanced management tools.",
    isPopular: true,
    features: [
      { name: "White-label Hosting", description: "Brand the hosting service as your own", included: true },
      { name: "Unlimited cPanel Accounts", description: "Create unlimited hosting accounts", included: true },
      { name: "WHM Control Panel", description: "Web Host Manager for resellers", included: true },
      { name: "Free WHMCS License", description: "Professional billing software included", included: true },
      { name: "Custom Packages", description: "Create your own hosting plans", included: true },
      { name: "Resource Allocation", description: "Flexible resource distribution", included: true },
      { name: "Client Management", description: "Advanced customer management tools", included: true },
      { name: "Reseller Support", description: "Dedicated reseller assistance", included: true },
    ]
  },
  "/products/reseller/cpanel/master": {
    name: "Master Reseller (cPanel)",
    description: "Advanced reseller hosting with the ability to create sub-resellers, perfect for hosting companies and agencies.",
    features: [
      { name: "Create Sub-resellers", description: "Allow your clients to resell hosting", included: true },
      { name: "Master Reseller Panel", description: "Advanced management interface", included: true },
      { name: "Multi-level Management", description: "Manage resellers and end users", included: true },
      { name: "Branding Options", description: "White-label your hosting brand", included: true },
      { name: "WHMCS Integration", description: "Professional billing management", included: true },
      { name: "Priority Support", description: "Higher priority support level", included: true },
      { name: "Resource Monitoring", description: "Track usage across all accounts", included: true },
      { name: "Migration Assistance", description: "Help moving existing accounts", included: true },
    ]
  },
  "/products/reseller/cpanel/reseller": {
    name: "Reseller Hosting (cPanel)",
    description: "Start your hosting business with our entry-level reseller package, featuring essential tools and reliable infrastructure.",
    features: [
      { name: "cPanel/WHM Access", description: "Industry-standard control panels", included: true },
      { name: "Multiple Hosting Accounts", description: "Create and manage hosting accounts", included: true },
      { name: "Free SSL Certificates", description: "SSL for all your clients", included: true },
      { name: "White-label Options", description: "Brand customization available", included: true },
      { name: "Billing Integration", description: "Connect with billing systems", included: true },
      { name: "99.9% Uptime SLA", description: "Reliable hosting infrastructure", included: true },
      { name: "Technical Support", description: "Support for you and your clients", included: true },
      { name: "Migration Tools", description: "Easy account migration", included: true },
    ]
  },

  // VPS Hosting
  "/products/vps/managed": {
    name: "Managed VPS Hosting",
    description: "Fully managed virtual private servers with expert support, automated updates, and comprehensive monitoring.",
    isPopular: true,
    features: [
      { name: "Full Server Management", description: "We handle all server administration", included: true },
      { name: "24/7 Server Monitoring", description: "Continuous server health monitoring", included: true },
      { name: "Automatic Security Updates", description: "OS and software updates included", included: true },
      { name: "Free Control Panel", description: "cPanel/DirectAdmin included", included: true },
      { name: "DDoS Protection", description: "Advanced DDoS mitigation", included: true },
      { name: "Daily Backups", description: "Automated daily server backups", included: true },
      { name: "Expert Support", description: "Linux/Windows server experts", included: true },
      { name: "Performance Optimization", description: "Server tuning and optimization", included: true },
    ]
  },
  "/products/vps/unmanaged": {
    name: "Unmanaged VPS Hosting",
    description: "Self-managed virtual private servers for experienced users who want full control over their server environment.",
    features: [
      { name: "Full Root Access", description: "Complete server administrative control", included: true },
      { name: "Choice of OS", description: "Linux distributions or Windows", included: true },
      { name: "KVM Virtualization", description: "Hardware-level virtualization", included: true },
      { name: "Dedicated Resources", description: "Guaranteed CPU, RAM, and storage", included: true },
      { name: "Network Security", description: "Firewall and network protection", included: true },
      { name: "Hardware Monitoring", description: "Server hardware health monitoring", included: true },
      { name: "Basic Support", description: "Hardware and network support only", included: true },
      { name: "Scalable Resources", description: "Easy resource upgrades", included: true },
    ]
  },

  // AI Services
  "/products/ai/website-builder": {
    name: "AI Website Builder",
    description: "Create professional websites in minutes using our AI-powered website builder with intelligent design suggestions.",
    isPopular: true,
    features: [
      { name: "AI-Powered Design", description: "Intelligent layout and design suggestions", included: true },
      { name: "One-Click Generation", description: "Create complete websites instantly", included: true },
      { name: "Responsive Templates", description: "Mobile-optimized designs", included: true },
      { name: "Content Generation", description: "AI-written content for your industry", included: true },
      { name: "SEO Optimization", description: "Built-in SEO best practices", included: true },
      { name: "E-commerce Ready", description: "Online store capabilities", included: true },
      { name: "Custom Branding", description: "Add your logos and brand colors", included: true },
      { name: "Free Hosting", description: "Hosting included with website", included: true },
    ]
  },

  // Self-hosted n8n
  "/products/n8n": {
    name: "Self-hosted n8n Automation",
    description: "Deploy your own n8n automation platform with pre-configured workflows and seamless integrations.",
    isPopular: true,
    features: [
      { name: "Pre-configured n8n", description: "Ready-to-use n8n installation", included: true },
      { name: "Workflow Templates", description: "Pre-built automation workflows", included: true },
      { name: "API Integrations", description: "Connect 300+ services and APIs", included: true },
      { name: "Custom Nodes", description: "Create custom automation nodes", included: true },
      { name: "Database Included", description: "PostgreSQL database for workflows", included: true },
      { name: "Secure Environment", description: "Isolated and secure n8n instance", included: true },
      { name: "Backup & Recovery", description: "Automated workflow backups", included: true },
      { name: "Expert Support", description: "n8n automation specialists", included: true },
    ]
  },

  // Tools
  "/domain-search": {
    name: "Domain Search Tool",
    description: "Find the perfect domain name for your website with our advanced domain search and suggestion tool.",
    features: [
      { name: "Domain Availability", description: "Real-time domain availability checking", included: true },
      { name: "TLD Options", description: "Hundreds of domain extensions", included: true },
      { name: "Domain Suggestions", description: "AI-powered domain name suggestions", included: true },
      { name: "Bulk Search", description: "Search multiple domains at once", included: true },
      { name: "Price Comparison", description: "Compare prices across registrars", included: true },
      { name: "WHOIS Information", description: "Domain ownership details", included: true },
      { name: "Domain History", description: "Historical domain information", included: true },
      { name: "Instant Registration", description: "Register domains immediately", included: true },
    ]
  },
  "/tools/whois-lookup": {
    name: "WHOIS Lookup Tool",
    description: "Comprehensive domain WHOIS information lookup to research domain ownership and technical details.",
    features: [
      { name: "Domain Information", description: "Complete domain registration details", included: true },
      { name: "Owner Details", description: "Registrant contact information", included: true },
      { name: "Technical Contacts", description: "Administrative and technical contacts", included: true },
      { name: "Registration History", description: "Domain registration timeline", included: true },
      { name: "Nameserver Info", description: "DNS nameserver configuration", included: true },
      { name: "Expiration Dates", description: "Domain renewal information", included: true },
      { name: "Registrar Details", description: "Domain registrar information", included: true },
      { name: "Bulk Lookup", description: "Check multiple domains at once", included: true },
    ]
  },

  // Extra Services
  "/products/ssl-certificates": {
    name: "SSL Certificates",
    description: "Secure your website with industry-standard SSL certificates for enhanced security and SEO benefits.",
    features: [
      { name: "Domain Validation", description: "Quick domain-validated certificates", included: true },
      { name: "Organization Validation", description: "Business-verified certificates", included: true },
      { name: "Extended Validation", description: "Highest level SSL certificates", included: true },
      { name: "Wildcard Support", description: "Secure unlimited subdomains", included: true },
      { name: "Multi-domain SSL", description: "Secure multiple domains", included: true },
      { name: "Free Installation", description: "We install your SSL certificate", included: true },
      { name: "99.9% Browser Trust", description: "Trusted by all major browsers", included: true },
      { name: "Warranty Included", description: "SSL certificate warranty", included: true },
    ]
  },
  "/products/email-hosting": {
    name: "Professional Email Hosting",
    description: "Professional email hosting with your domain, advanced spam protection, and collaboration tools.",
    features: [
      { name: "Custom Domain Email", description: "Email addresses with your domain", included: true },
      { name: "IMAP/POP3 Support", description: "Access from any email client", included: true },
      { name: "Webmail Interface", description: "Access email from any browser", included: true },
      { name: "Spam Protection", description: "Advanced anti-spam filtering", included: true },
      { name: "Virus Scanning", description: "Real-time virus protection", included: true },
      { name: "Calendar & Contacts", description: "Shared calendars and contacts", included: true },
      { name: "Mobile Sync", description: "Sync with smartphones and tablets", included: true },
      { name: "Email Archiving", description: "Long-term email storage", included: true },
    ]
  },
  "/products/database-hosting": {
    name: "Database Hosting",
    description: "Dedicated database hosting with high performance, automated backups, and expert database administration.",
    features: [
      { name: "MySQL/PostgreSQL", description: "Support for major database systems", included: true },
      { name: "High Performance", description: "SSD storage and optimized configs", included: true },
      { name: "Automated Backups", description: "Daily database backups", included: true },
      { name: "Database Replication", description: "Master-slave replication", included: true },
      { name: "Query Optimization", description: "Database performance tuning", included: true },
      { name: "Remote Access", description: "Secure remote database access", included: true },
      { name: "Monitoring Tools", description: "Database performance monitoring", included: true },
      { name: "Expert DBA Support", description: "Database administrator assistance", included: true },
    ]
  },
  "/products/free-static-hosting": {
    name: "Free Static Site Hosting",
    description: "Free hosting for static websites with CDN, SSL certificates, and simple deployment options.",
    features: [
      { name: "100% Free Hosting", description: "No cost for static websites", included: true },
      { name: "Global CDN", description: "Fast worldwide content delivery", included: true },
      { name: "Free SSL Certificate", description: "HTTPS encryption included", included: true },
      { name: "Git Integration", description: "Deploy from GitHub/GitLab", included: true },
      { name: "Custom Domain", description: "Use your own domain name", included: true },
      { name: "SPA Support", description: "Single Page Application support", included: true },
      { name: "Form Handling", description: "Contact form processing", included: true },
      { name: "Analytics Integration", description: "Google Analytics support", included: true },
    ]
  }
}