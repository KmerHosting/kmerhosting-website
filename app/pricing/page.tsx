"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Check, Gift, ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"

type BillingPeriod = "monthly" | "quarterly" | "semi-annually" | "annually"

interface PricingPlan {
  name: string
  basePrice: number
  description: string
  features: string[]
  allFeatures: string[]
  popular?: boolean
  badge?: string
  color?: string
}

const billingDiscounts: Record<BillingPeriod, { discount: number; label: string; months: number }> = {
  "monthly": { discount: 0, label: "Monthly", months: 1 },
  "quarterly": { discount: 5, label: "Quarterly", months: 3 },
  "semi-annually": { discount: 10, label: "Semi-Annual", months: 6 },
  "annually": { discount: 15, label: "Annual", months: 12 },
}

// Node.js Hosting Plans
const nodejsPlans: PricingPlan[] = [
  {
    name: "Node.js Starter",
    basePrice: 3175,
    description: "Perfect for Node.js applications",
    features: ["1 Node.js App", "10 GB SSD Storage", "Node.js 18/20/21", "Free SSL Certificate"],
    allFeatures: [
      "1 Node.js Application", "10 GB SSD Storage", "Unlimited Bandwidth", "Node.js 18/20/21",
      "Free SSL Certificate", "PM2 Process Manager", "NPM & Yarn Support",
      "99.9% Uptime Guarantee", "24/7 Support", "Git Deployment", "Daily Backups",
    ],
  },
  {
    name: "Node.js Plus",
    basePrice: 3250,
    description: "Great for growing Node.js apps",
    badge: "Popular",
    color: "blue",
    features: ["5 Node.js Apps", "50 GB SSD Storage", "Node.js All Versions", "Free SSL Certificate"],
    allFeatures: [
      "5 Node.js Applications", "50 GB SSD Storage", "Unlimited Bandwidth", "Node.js All Versions",
      "Free SSL Certificate", "PM2 + Clustering", "NPM & Yarn Support", "MongoDB/Redis Access",
      "99.9% Uptime Guarantee", "Priority Support", "Git + CI/CD", "Daily Backups", "SSH Access",
    ],
  },
  {
    name: "Node.js Pro",
    basePrice: 4100,
    description: "For production Node.js apps",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Apps", "100 GB SSD Storage", "All Node.js Versions", "Free SSL + CDN"],
    allFeatures: [
      "Unlimited Node.js Apps", "100 GB SSD Storage", "Unlimited Bandwidth", "All Node.js Versions",
      "Free SSL + CDN", "PM2 + Load Balancing", "NPM & Yarn Support", "MongoDB/Redis/PostgreSQL",
      "99.99% Uptime SLA", "VIP Support (24/7)", "Advanced Git + CI/CD", "Hourly Backups",
      "SSH + Root Access", "Staging Environment", "Auto-Scaling",
    ],
  },
]

// PHP Hosting Plans
const phpPlans: PricingPlan[] = [
  {
    name: "PHP Starter",
    basePrice: 3175,
    description: "Perfect for PHP websites",
    features: ["1 Website", "10 GB SSD Storage", "PHP 7.4/8.0/8.1/8.2", "Free SSL Certificate"],
    allFeatures: [
      "1 Website", "10 GB SSD Storage", "Unlimited Bandwidth", "PHP 7.4/8.0/8.1/8.2",
      "Free SSL Certificate", "LiteSpeed Web Server", "MySQL Database",
      "99.9% Uptime Guarantee", "24/7 Support", "Free Migration", "Daily Backups",
    ],
  },
  {
    name: "PHP Plus",
    basePrice: 3250,
    description: "Great for PHP applications",
    badge: "Popular",
    color: "blue",
    features: ["5 Websites", "50 GB SSD Storage", "PHP All Versions", "Free SSL Certificate"],
    allFeatures: [
      "5 Websites", "50 GB SSD Storage", "Unlimited Bandwidth", "PHP All Versions",
      "Free SSL Certificate", "LiteSpeed + Redis", "Unlimited MySQL Databases",
      "99.9% Uptime Guarantee", "Priority Support", "Free Migration", "Daily Backups",
      "SSH Access", "Composer Support", "OPcache Enabled",
    ],
  },
  {
    name: "PHP Pro",
    basePrice: 4100,
    description: "For high-traffic PHP sites",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Websites", "100 GB SSD Storage", "PHP All Versions", "Free SSL + CDN"],
    allFeatures: [
      "Unlimited Websites", "100 GB SSD Storage", "Unlimited Bandwidth", "PHP All Versions",
      "Free SSL + CDN", "LiteSpeed + Redis + Memcached", "Unlimited MySQL/PostgreSQL",
      "99.99% Uptime SLA", "VIP Support (24/7)", "Free Migration", "Hourly Backups",
      "SSH + WP-CLI", "Composer Support", "Advanced Security", "Staging Environment",
    ],
  },
]

// WordPress Hosting Plans
const wordpressPlans: PricingPlan[] = [
  {
    name: "WordPress Starter",
    basePrice: 3175,
    description: "Perfect for WordPress blogs",
    features: ["1 WordPress Site", "10 GB SSD Storage", "WordPress Optimized", "Free SSL Certificate"],
    allFeatures: [
      "1 WordPress Site", "10 GB SSD Storage", "Unlimited Bandwidth", "WordPress Pre-installed",
      "Free SSL Certificate", "LiteSpeed + LSCache", "Automatic Updates",
      "99.9% Uptime Guarantee", "24/7 Support", "Free Migration", "Daily Backups",
      "WordPress Hardening", "Malware Scanning",
    ],
  },
  {
    name: "WordPress Plus",
    basePrice: 3250,
    description: "Great for WordPress businesses",
    badge: "Popular",
    color: "blue",
    features: ["5 WordPress Sites", "50 GB SSD Storage", "Advanced Optimization", "Free SSL Certificate"],
    allFeatures: [
      "5 WordPress Sites", "50 GB SSD Storage", "Unlimited Bandwidth", "WordPress Pre-installed",
      "Free SSL Certificate", "LiteSpeed + Redis + Object Cache", "Automatic Updates",
      "99.9% Uptime Guarantee", "Priority Support", "Free Migration", "Daily Backups",
      "WP-CLI Access", "Staging Environment", "Advanced Security", "CDN Integration",
    ],
  },
  {
    name: "WordPress Pro",
    basePrice: 4100,
    description: "For WordPress agencies",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited WP Sites", "100 GB SSD Storage", "Enterprise Optimization", "Free SSL + CDN"],
    allFeatures: [
      "Unlimited WordPress Sites", "100 GB SSD Storage", "Unlimited Bandwidth", "WordPress Pre-installed",
      "Free SSL + Premium CDN", "LiteSpeed + Redis + Memcached + Object Cache", "Automatic Updates",
      "99.99% Uptime SLA", "VIP Support (24/7)", "White Glove Migration", "Hourly Backups",
      "SSH + WP-CLI", "Multiple Staging", "WAF + DDoS Protection", "Performance Monitoring",
    ],
  },
]

// WooCommerce Hosting Plans
const woocommercePlans: PricingPlan[] = [
  {
    name: "WooCommerce Starter",
    basePrice: 3175,
    description: "Perfect for new online stores",
    features: ["1 WooCommerce Store", "20 GB SSD Storage", "WooCommerce Optimized", "Free SSL Certificate"],
    allFeatures: [
      "1 WooCommerce Store", "20 GB SSD Storage", "Unlimited Bandwidth", "WooCommerce Pre-installed",
      "Free SSL Certificate", "LiteSpeed + Redis", "Payment Gateway Support",
      "99.9% Uptime Guarantee", "24/7 Support", "Free Migration", "Daily Backups",
      "PCI Compliance Ready", "Product Import Tools",
    ],
  },
  {
    name: "WooCommerce Plus",
    basePrice: 3250,
    description: "Great for growing stores",
    badge: "Popular",
    color: "blue",
    features: ["3 WooCommerce Stores", "60 GB SSD Storage", "Advanced Optimization", "Free SSL + CDN"],
    allFeatures: [
      "3 WooCommerce Stores", "60 GB SSD Storage", "Unlimited Bandwidth", "WooCommerce Pre-installed",
      "Free SSL + CDN", "LiteSpeed + Redis + Object Cache", "All Payment Gateways",
      "99.9% Uptime Guarantee", "Priority Support", "Free Migration", "Daily Backups",
      "PCI Compliance", "Advanced Security", "Staging Environment", "Analytics Dashboard",
    ],
  },
  {
    name: "WooCommerce Pro",
    basePrice: 4100,
    description: "For high-volume stores",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Stores", "120 GB SSD Storage", "Enterprise Optimization", "Free SSL + Premium CDN"],
    allFeatures: [
      "Unlimited WooCommerce Stores", "120 GB SSD Storage", "Unlimited Bandwidth", "WooCommerce Pre-installed",
      "Free SSL + Premium CDN", "LiteSpeed + Full Caching Stack", "All Payment Gateways",
      "99.99% Uptime SLA", "VIP Support (24/7)", "White Glove Migration", "Hourly Backups",
      "Full PCI Compliance", "WAF + DDoS Protection", "Multiple Staging", "Dedicated Resources",
    ],
  },
]

// E-Commerce Hosting Plans
const ecommercePlans: PricingPlan[] = [
  {
    name: "E-Commerce Starter",
    basePrice: 3175,
    description: "Perfect for any e-commerce platform",
    features: ["1 Store", "25 GB SSD Storage", "Magento/PrestaShop/OpenCart", "Free SSL Certificate"],
    allFeatures: [
      "1 E-Commerce Store", "25 GB SSD Storage", "Unlimited Bandwidth", "Magento/PrestaShop/OpenCart",
      "Free SSL Certificate", "LiteSpeed + Redis", "Multi-Payment Support",
      "99.9% Uptime Guarantee", "24/7 Support", "Free Migration", "Daily Backups",
      "PCI Compliance Ready", "1-Click Installer",
    ],
  },
  {
    name: "E-Commerce Plus",
    basePrice: 3250,
    description: "Great for growing e-commerce",
    badge: "Popular",
    color: "blue",
    features: ["3 Stores", "70 GB SSD Storage", "All E-Commerce Platforms", "Free SSL + CDN"],
    allFeatures: [
      "3 E-Commerce Stores", "70 GB SSD Storage", "Unlimited Bandwidth", "All E-Commerce Platforms",
      "Free SSL + CDN", "LiteSpeed + Full Cache", "Multi-Currency Support",
      "99.9% Uptime Guarantee", "Priority Support", "Free Migration", "Daily Backups",
      "Full PCI Compliance", "Advanced Security", "Staging Environment", "Dedicated IP",
    ],
  },
  {
    name: "E-Commerce Pro",
    basePrice: 4100,
    description: "For enterprise e-commerce",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Stores", "150 GB SSD Storage", "Enterprise Optimization", "Free SSL + Premium CDN"],
    allFeatures: [
      "Unlimited E-Commerce Stores", "150 GB SSD Storage", "Unlimited Bandwidth", "All E-Commerce Platforms",
      "Free SSL + Premium CDN", "LiteSpeed + Full Stack", "Multi-Currency + Multi-Language",
      "99.99% Uptime SLA", "VIP Support (24/7)", "White Glove Migration", "Hourly Backups",
      "Enterprise PCI Compliance", "WAF + Advanced DDoS", "Multiple Staging", "Auto-Scaling",
    ],
  },
]

// Python Hosting Plans
const pythonPlans: PricingPlan[] = [
  {
    name: "Python Starter",
    basePrice: 3175,
    description: "Perfect for Python applications",
    features: ["1 Python App", "15 GB SSD Storage", "Python 3.9/3.10/3.11/3.12", "Free SSL Certificate"],
    allFeatures: [
      "1 Python Application", "15 GB SSD Storage", "Unlimited Bandwidth", "Python 3.9/3.10/3.11/3.12",
      "Free SSL Certificate", "Django/Flask Support", "PostgreSQL/MySQL",
      "99.9% Uptime Guarantee", "24/7 Support", "Git Deployment", "Daily Backups",
      "Virtual Environment", "pip Support",
    ],
  },
  {
    name: "Python Plus",
    basePrice: 3250,
    description: "Great for Python projects",
    badge: "Popular",
    color: "blue",
    features: ["5 Python Apps", "60 GB SSD Storage", "All Python Versions", "Free SSL Certificate"],
    allFeatures: [
      "5 Python Applications", "60 GB SSD Storage", "Unlimited Bandwidth", "All Python Versions",
      "Free SSL Certificate", "Django/Flask/FastAPI", "PostgreSQL/MySQL/MongoDB",
      "99.9% Uptime Guarantee", "Priority Support", "Git + CI/CD", "Daily Backups",
      "SSH Access", "Conda Support", "Redis Access", "Celery Support",
    ],
  },
  {
    name: "Python Pro",
    basePrice: 4100,
    description: "For production Python apps",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Apps", "120 GB SSD Storage", "All Python Versions", "Free SSL + CDN"],
    allFeatures: [
      "Unlimited Python Apps", "120 GB SSD Storage", "Unlimited Bandwidth", "All Python Versions",
      "Free SSL + CDN", "Django/Flask/FastAPI + More", "All Databases",
      "99.99% Uptime SLA", "VIP Support (24/7)", "Advanced Git + CI/CD", "Hourly Backups",
      "SSH + Root Access", "Conda + pip", "Redis + RabbitMQ", "Auto-Scaling", "ML Libraries",
    ],
  },
]

// Ruby Hosting Plans
const rubyPlans: PricingPlan[] = [
  {
    name: "Ruby Starter",
    basePrice: 3175,
    description: "Perfect for Ruby applications",
    features: ["1 Ruby App", "15 GB SSD Storage", "Ruby 2.7/3.0/3.1/3.2", "Free SSL Certificate"],
    allFeatures: [
      "1 Ruby Application", "15 GB SSD Storage", "Unlimited Bandwidth", "Ruby 2.7/3.0/3.1/3.2",
      "Free SSL Certificate", "Rails Support", "PostgreSQL/MySQL",
      "99.9% Uptime Guarantee", "24/7 Support", "Git Deployment", "Daily Backups",
      "RVM/rbenv Support", "Bundler",
    ],
  },
  {
    name: "Ruby Plus",
    basePrice: 3250,
    description: "Great for Ruby on Rails",
    badge: "Popular",
    color: "blue",
    features: ["5 Ruby Apps", "60 GB SSD Storage", "All Ruby Versions", "Free SSL Certificate"],
    allFeatures: [
      "5 Ruby Applications", "60 GB SSD Storage", "Unlimited Bandwidth", "All Ruby Versions",
      "Free SSL Certificate", "Rails + Sinatra", "PostgreSQL/MySQL/MongoDB",
      "99.9% Uptime Guarantee", "Priority Support", "Git + CI/CD", "Daily Backups",
      "SSH Access", "RVM/rbenv/chruby", "Redis + Sidekiq", "Asset Pipeline",
    ],
  },
  {
    name: "Ruby Pro",
    basePrice: 4100,
    description: "For production Ruby apps",
    badge: "Best Value",
    color: "purple",
    features: ["Unlimited Apps", "120 GB SSD Storage", "All Ruby Versions", "Free SSL + CDN"],
    allFeatures: [
      "Unlimited Ruby Apps", "120 GB SSD Storage", "Unlimited Bandwidth", "All Ruby Versions",
      "Free SSL + CDN", "Rails + All Frameworks", "All Databases",
      "99.99% Uptime SLA", "VIP Support (24/7)", "Advanced Git + CI/CD", "Hourly Backups",
      "SSH + Root Access", "Version Managers", "Redis + Sidekiq Pro", "Auto-Scaling", "Monitoring",
    ],
  },
]

// cPanel Reseller Plans
const cpanelResellerPlans: PricingPlan[] = [
  {
    name: "cPanel Reseller Bronze",
    basePrice: 5000,
    description: "Entry-level reseller hosting",
    features: ["25 GB SSD Storage", "250 GB Bandwidth", "15 cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "25 GB SSD Storage", "250 GB Bandwidth", "15 cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Email Support", "Daily Backups", "99.9% Uptime SLA",
    ],
  },
  {
    name: "cPanel Reseller Silver",
    basePrice: 8000,
    description: "Growing reseller business",
    badge: "Popular",
    color: "blue",
    features: ["50 GB SSD Storage", "500 GB Bandwidth", "30 cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "50 GB SSD Storage", "500 GB Bandwidth", "30 cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Priority Support", "Daily Backups", "99.9% Uptime SLA",
      "Free Website Migration",
    ],
  },
  {
    name: "cPanel Reseller Gold",
    basePrice: 12000,
    description: "Professional reseller hosting",
    badge: "Best Value",
    color: "purple",
    features: ["100 GB SSD Storage", "1 TB Bandwidth", "50 cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "1 TB Bandwidth", "50 cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Priority Support", "Daily Backups", "99.9% Uptime SLA",
      "Free Website Migration", "Advanced Security",
    ],
  },
  {
    name: "cPanel Reseller Platinum",
    basePrice: 18000,
    description: "Premium reseller hosting",
    badge: "Premium",
    color: "orange",
    features: ["200 GB SSD Storage", "2 TB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License"],
    allFeatures: [
      "200 GB SSD Storage", "2 TB Bandwidth", "Unlimited cPanel Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis + Memcached",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Free Website Migration", "Advanced Security", "Dedicated IP",
    ],
  },
]

// cPanel Master Reseller Plans
const cpanelMasterResellerPlans: PricingPlan[] = [
  {
    name: "cPanel Master Reseller Bronze",
    basePrice: 15000,
    description: "Entry-level master reseller",
    features: ["50 GB SSD Storage", "1 TB Bandwidth", "15 Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "50 GB SSD Storage", "1 TB Bandwidth", "15 Reseller Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Master Reseller Support", "Daily Backups", "99.9% Uptime SLA",
      "Create Sub-Resellers",
    ],
  },
  {
    name: "cPanel Master Reseller Silver",
    basePrice: 22000,
    description: "Growing master reseller business",
    badge: "Popular",
    color: "blue",
    features: ["100 GB SSD Storage", "2 TB Bandwidth", "30 Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "2 TB Bandwidth", "30 Reseller Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Priority Support", "Daily Backups", "99.9% Uptime SLA",
      "Create Sub-Resellers", "Advanced Security",
    ],
  },
  {
    name: "cPanel Master Reseller Gold",
    basePrice: 30000,
    description: "Professional master reseller",
    badge: "Best Value",
    color: "purple",
    features: ["200 GB SSD Storage", "4 TB Bandwidth", "50 Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "200 GB SSD Storage", "4 TB Bandwidth", "50 Reseller Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis + Memcached",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Create Sub-Resellers", "Advanced Security", "Dedicated IP",
    ],
  },
  {
    name: "cPanel Master Reseller Platinum",
    basePrice: 40000,
    description: "Premium master reseller",
    badge: "Premium",
    color: "orange",
    features: ["400 GB SSD Storage", "8 TB Bandwidth", "Unlimited Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "400 GB SSD Storage", "8 TB Bandwidth", "Unlimited Reseller Accounts", "Free WHMCS License",
      "WHM Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Full Stack",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Create Sub-Resellers", "Enterprise Security", "Multiple Dedicated IPs", "Custom Branding",
    ],
  },
]

// cPanel Alpha Reseller Plans
const cpanelAlphaResellerPlans: PricingPlan[] = [
  {
    name: "cPanel Alpha Reseller Bronze",
    basePrice: 35000,
    description: "Entry-level alpha reseller",
    features: ["100 GB SSD Storage", "2 TB Bandwidth", "15 Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "2 TB Bandwidth", "15 Master Resellers", "Free WHMCS License",
      "WHM Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Alpha Reseller Support", "Daily Backups", "99.9% Uptime SLA",
      "Multi-Level Reselling", "Dedicated IP",
    ],
  },
  {
    name: "cPanel Alpha Reseller Silver",
    basePrice: 50000,
    description: "Growing alpha reseller business",
    badge: "Popular",
    color: "blue",
    features: ["200 GB SSD Storage", "4 TB Bandwidth", "30 Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "200 GB SSD Storage", "4 TB Bandwidth", "30 Master Resellers", "Free WHMCS License",
      "WHM Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Redis + Memcached",
      "Private Nameservers", "Priority Support", "Hourly Backups", "99.99% Uptime SLA",
      "Multi-Level Reselling", "Multiple Dedicated IPs", "Custom Branding",
    ],
  },
  {
    name: "cPanel Alpha Reseller Gold",
    basePrice: 70000,
    description: "Professional alpha reseller",
    badge: "Best Value",
    color: "purple",
    features: ["400 GB SSD Storage", "8 TB Bandwidth", "50 Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "400 GB SSD Storage", "8 TB Bandwidth", "50 Master Resellers", "Free WHMCS License",
      "WHM Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Full Stack",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Multi-Level Reselling", "Multiple Dedicated IPs", "Custom Branding", "API Access",
    ],
  },
  {
    name: "cPanel Alpha Reseller Platinum",
    basePrice: 100000,
    description: "Premium alpha reseller",
    badge: "Premium",
    color: "orange",
    features: ["800 GB SSD Storage", "16 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "800 GB SSD Storage", "16 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License",
      "WHM Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Enterprise Stack",
      "Private Nameservers", "VIP Support (24/7)", "Real-time Backups", "99.99% Uptime SLA",
      "Multi-Level Reselling", "Multiple Dedicated IPs", "Custom Branding", "Full API Access", "SLA Guarantee",
    ],
  },
]

// DA (DirectAdmin) Reseller Plans
const daResellerPlans: PricingPlan[] = [
  {
    name: "DA Reseller Bronze",
    basePrice: 4500,
    description: "Entry-level DA reseller hosting",
    features: ["25 GB SSD Storage", "250 GB Bandwidth", "15 DA Accounts", "Free WHMCS License"],
    allFeatures: [
      "25 GB SSD Storage", "250 GB Bandwidth", "15 DirectAdmin Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Email Support", "Daily Backups", "99.9% Uptime SLA",
    ],
  },
  {
    name: "DA Reseller Silver",
    basePrice: 7500,
    description: "Growing DA reseller business",
    badge: "Popular",
    color: "blue",
    features: ["50 GB SSD Storage", "500 GB Bandwidth", "30 DA Accounts", "Free WHMCS License"],
    allFeatures: [
      "50 GB SSD Storage", "500 GB Bandwidth", "30 DirectAdmin Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Priority Support", "Daily Backups", "99.9% Uptime SLA",
      "Free Website Migration",
    ],
  },
  {
    name: "DA Reseller Gold",
    basePrice: 11000,
    description: "Professional DA reseller hosting",
    badge: "Best Value",
    color: "purple",
    features: ["100 GB SSD Storage", "1 TB Bandwidth", "50 DA Accounts", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "1 TB Bandwidth", "50 DirectAdmin Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Priority Support", "Daily Backups", "99.9% Uptime SLA",
      "Free Website Migration", "Advanced Security",
    ],
  },
  {
    name: "DA Reseller Platinum",
    basePrice: 16500,
    description: "Premium DA reseller hosting",
    badge: "Premium",
    color: "orange",
    features: ["200 GB SSD Storage", "2 TB Bandwidth", "Unlimited DA Accounts", "Free WHMCS License"],
    allFeatures: [
      "200 GB SSD Storage", "2 TB Bandwidth", "Unlimited DirectAdmin Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis + Memcached",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Free Website Migration", "Advanced Security", "Dedicated IP",
    ],
  },
]

// DA (DirectAdmin) Master Reseller Plans
const daMasterResellerPlans: PricingPlan[] = [
  {
    name: "DA Master Reseller Bronze",
    basePrice: 14000,
    description: "Entry-level DA master reseller",
    features: ["50 GB SSD Storage", "1 TB Bandwidth", "15 Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "50 GB SSD Storage", "1 TB Bandwidth", "15 Reseller Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed Web Server",
      "Private Nameservers", "Master Reseller Support", "Daily Backups", "99.9% Uptime SLA",
      "Create Sub-Resellers",
    ],
  },
  {
    name: "DA Master Reseller Silver",
    basePrice: 20000,
    description: "Growing DA master reseller",
    badge: "Popular",
    color: "blue",
    features: ["100 GB SSD Storage", "2 TB Bandwidth", "30 Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "2 TB Bandwidth", "30 Reseller Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Priority Support", "Daily Backups", "99.9% Uptime SLA",
      "Create Sub-Resellers", "Advanced Security",
    ],
  },
  {
    name: "DA Master Reseller Gold",
    basePrice: 28000,
    description: "Professional DA master reseller",
    badge: "Best Value",
    color: "purple",
    features: ["200 GB SSD Storage", "4 TB Bandwidth", "50 Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "200 GB SSD Storage", "4 TB Bandwidth", "50 Reseller Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Redis + Memcached",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Create Sub-Resellers", "Advanced Security", "Dedicated IP",
    ],
  },
  {
    name: "DA Master Reseller Platinum",
    basePrice: 37000,
    description: "Premium DA master reseller",
    badge: "Premium",
    color: "orange",
    features: ["400 GB SSD Storage", "8 TB Bandwidth", "Unlimited Reseller Accounts", "Free WHMCS License"],
    allFeatures: [
      "400 GB SSD Storage", "8 TB Bandwidth", "Unlimited Reseller Accounts", "Free WHMCS License",
      "DirectAdmin Control Panel", "White Label Hosting", "Free SSL Certificates", "LiteSpeed + Full Stack",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Create Sub-Resellers", "Enterprise Security", "Multiple Dedicated IPs", "Custom Branding",
    ],
  },
]

// DA (DirectAdmin) Alpha Reseller Plans
const daAlphaResellerPlans: PricingPlan[] = [
  {
    name: "DA Alpha Reseller Bronze",
    basePrice: 32000,
    description: "Entry-level DA alpha reseller",
    features: ["100 GB SSD Storage", "2 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "100 GB SSD Storage", "2 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License",
      "DirectAdmin Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Redis",
      "Private Nameservers", "Alpha Reseller Support", "Daily Backups", "99.9% Uptime SLA",
      "Multi-Level Reselling", "Dedicated IP",
    ],
  },
  {
    name: "DA Alpha Reseller Silver",
    basePrice: 45000,
    description: "Growing DA alpha reseller",
    badge: "Popular",
    color: "blue",
    features: ["200 GB SSD Storage", "4 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "200 GB SSD Storage", "4 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License",
      "DirectAdmin Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Redis + Memcached",
      "Private Nameservers", "Priority Support", "Hourly Backups", "99.99% Uptime SLA",
      "Multi-Level Reselling", "Multiple Dedicated IPs", "Custom Branding",
    ],
  },
  {
    name: "DA Alpha Reseller Gold",
    basePrice: 65000,
    description: "Professional DA alpha reseller",
    badge: "Best Value",
    color: "purple",
    features: ["400 GB SSD Storage", "8 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "400 GB SSD Storage", "8 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License",
      "DirectAdmin Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Full Stack",
      "Private Nameservers", "VIP Support (24/7)", "Hourly Backups", "99.99% Uptime SLA",
      "Multi-Level Reselling", "Multiple Dedicated IPs", "Custom Branding", "API Access",
    ],
  },
  {
    name: "DA Alpha Reseller Platinum",
    basePrice: 95000,
    description: "Premium DA alpha reseller",
    badge: "Premium",
    color: "orange",
    features: ["800 GB SSD Storage", "16 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License"],
    allFeatures: [
      "800 GB SSD Storage", "16 TB Bandwidth", "Unlimited Master Resellers", "Free WHMCS License",
      "DirectAdmin Control Panel", "Full White Label", "Free SSL Certificates", "LiteSpeed + Enterprise Stack",
      "Private Nameservers", "VIP Support (24/7)", "Real-time Backups", "99.99% Uptime SLA",
      "Multi-Level Reselling", "Multiple Dedicated IPs", "Custom Branding", "Full API Access", "SLA Guarantee",
    ],
  },
]

// VPS Plans
const vpsPlans: PricingPlan[] = [
  {
    name: "VPS Basic",
    basePrice: 12000,
    description: "Entry-level VPS",
    features: ["2 vCPU Cores", "4 GB RAM", "50 GB NVMe SSD", "2 TB Bandwidth"],
    allFeatures: [
      "2 vCPU Cores", "4 GB RAM", "50 GB NVMe SSD", "2 TB Bandwidth",
      "Full Root Access", "Choice of OS", "DDoS Protection", "99.9% Uptime SLA",
      "KVM Virtualization", "IPv4 + IPv6", "Snapshots", "24/7 Support",
    ],
  },
  {
    name: "VPS Pro",
    basePrice: 20000,
    description: "High-performance VPS",
    popular: true,
    badge: "Popular",
    color: "blue",
    features: ["4 vCPU Cores", "8 GB RAM", "100 GB NVMe SSD", "4 TB Bandwidth"],
    allFeatures: [
      "4 vCPU Cores", "8 GB RAM", "100 GB NVMe SSD", "4 TB Bandwidth",
      "Full Root Access", "Choice of OS", "Advanced DDoS Protection", "99.9% Uptime SLA",
      "KVM Virtualization", "IPv4 + IPv6", "Automated Backups", "Priority Support",
      "Free cPanel License (Optional)", "Snapshots & Cloning",
    ],
  },
  {
    name: "VPS Elite",
    basePrice: 35000,
    description: "Maximum VPS power",
    badge: "Best Performance",
    color: "orange",
    features: ["8 vCPU Cores", "16 GB RAM", "200 GB NVMe SSD", "8 TB Bandwidth"],
    allFeatures: [
      "8 vCPU Cores", "16 GB RAM", "200 GB NVMe SSD", "8 TB Bandwidth",
      "Full Root Access", "Choice of OS", "Enterprise DDoS Protection", "99.99% Uptime SLA",
      "KVM Virtualization", "IPv4 + IPv6 (Multiple IPs)", "Automated Backups", "VIP Support",
      "Free cPanel/Plesk License", "Snapshots & Cloning", "Custom Configurations", "Dedicated Support Manager",
    ],
  },
]

function calculatePrice(basePrice: number, period: BillingPeriod) {
  const { discount, months } = billingDiscounts[period]
  const discountedPrice = basePrice * (1 - discount / 100)
  const totalPrice = discountedPrice * months
  return { monthlyPrice: discountedPrice, totalPrice: totalPrice, discount: discount }
}

// Additional plan groups
const cloudVpsResellerPlans: PricingPlan[] = [
  {
    name: "Cloud VPS Reseller",
    basePrice: 18000,
    description: "Offer cloud VPS to your clients with white-label control",
    features: ["Custom VPS Templates", "Automated Provisioning", "Billing Integration"],
    allFeatures: ["Custom VPS Templates", "Automated Provisioning", "Billing Integration", "Private Nameservers", "WHMCS Integration", "Multi-Region Availability"],
    badge: "Reseller",
    color: "green",
  },
]

const dedicatedPlans: PricingPlan[] = [
  {
    name: "Managed Dedicated",
    basePrice: 120000,
    description: "Fully managed dedicated server with monitoring and backups",
    features: ["Full Stack Management", "Daily Backups", "Priority Support"],
    allFeatures: ["Full Stack Management", "Daily Backups", "Priority Support", "Hardware SLA", "DDoS Protection", "Custom Hardware Options"],
    badge: "Enterprise",
    color: "orange",
  },
  {
    name: "Unmanaged Dedicated",
    basePrice: 80000,
    description: "Raw dedicated hardware for advanced users",
    features: ["Root Access", "Custom OS", "No Managed Services"],
    allFeatures: ["Root Access", "Custom OS", "No Managed Services", "Optional Managed Addons", "DDoS Protection"],
    color: "purple",
  },
]

const bareMetalPlans: PricingPlan[] = [
  {
    name: "Managed Server",
    basePrice: 90000,
    description: "Managed bare-metal servers with enterprise support",
    features: ["Managed OS", "Backups", "24/7 Support"],
    allFeatures: ["Managed OS", "Backups", "24/7 Support", "Custom Networking", "Hardware Monitoring"],
    color: "orange",
  },
  {
    name: "Unmanaged Server",
    basePrice: 60000,
    description: "Bare metal for maximum control",
    features: ["Raw Hardware", "Full Root Access", "Custom Configurations"],
    allFeatures: ["Raw Hardware", "Full Root Access", "Custom Configurations", "Optional Managed Addons"],
    color: "purple",
  },
]

const n8nPlans: PricingPlan[] = [
  {
    name: "Self-hosted n8n",
    basePrice: 0,
    description: "Deploy n8n on your infrastructure with our one-click installer",
    features: ["1 GB Storage", "5,000 Inodes", "Visual Workflow Editor", "400+ Integrations"],
    allFeatures: ["1 GB Storage", "5,000 Inodes", "Visual Workflow Editor", "400+ Integrations", "Self-hosted Support", "Backups & Restore", "Private Networking", "Enterprise Integrations"],
    badge: "Free",
    color: "green",
  },
  {
    name: "Preinstalled n8n",
    basePrice: 6000,
    description: "n8n preinstalled on our domain, ready to use",
    features: ["Preinstalled & Configured", "Custom Subdomain", "Automatic Updates", "24/7 Support"],
    allFeatures: ["Preinstalled & Configured", "Custom Subdomain (n8n.kmerhosting.com)", "Automatic Updates", "24/7 Support", "SSL Certificate", "Daily Backups", "Visual Workflow Editor", "400+ Integrations", "Managed Hosting"],
    badge: "Popular",
    color: "blue",
  },
]

// AI Plans
const aiWebsiteBuilderPlans: PricingPlan[] = [
  {
    name: "AI Website Builder",
    basePrice: 0,
    description: "Build stunning websites with AI-powered design",
    features: ["AI-Powered Design", "Instant Content Generation", "Drag & Drop Editor"],
    allFeatures: ["AI-Powered Design", "Instant Content Generation", "Drag & Drop Editor", "Mobile Responsive", "SEO Optimization", "Free Hosting"],
    badge: "Free",
    color: "green",
  },
]

const aiFreeAccessPlans: PricingPlan[] = [
  {
    name: "Free AI Access",
    basePrice: 0,
    description: "Access 8 AI models for free",
    features: ["8 Free AI Models", "GPT-3.5 Turbo", "Claude Instant", "Gemini Flash"],
    allFeatures: ["8 Free AI Models", "GPT-3.5 Turbo", "Claude Instant", "Gemini Flash", "Llama 2", "Mistral", "Command", "Stable Diffusion", "Basic Rate Limits"],
    badge: "Free",
    color: "green",
  },
]

const aiPaidAccessPlans: PricingPlan[] = [
  {
    name: "AI Pro",
    basePrice: 5000,
    description: "Access 10+ premium AI models",
    features: ["10+ Premium Models", "GPT-4", "Claude 3 Opus", "Gemini Pro"],
    allFeatures: ["10+ Premium Models", "GPT-4 & GPT-4 Turbo", "Claude 3 Opus & Sonnet", "Gemini Pro & Ultra", "DALL-E 3", "Midjourney", "API Access", "Unlimited Requests", "Priority Support"],
    badge: "Popular",
    color: "blue",
  },
  {
    name: "AI Enterprise",
    basePrice: 15000,
    description: "Enterprise-grade AI with custom models",
    features: ["Custom Fine-tuned Models", "Dedicated Support", "API White-labeling"],
    allFeatures: ["Custom Fine-tuned Models", "All Pro Models", "Dedicated Support", "API White-labeling", "Custom Rate Limits", "SLA Guarantee", "Priority Processing", "Advanced Analytics"],
    badge: "Enterprise",
    color: "purple",
  },
]

function PricingCard({ plan, billingPeriod }: { plan: PricingPlan; billingPeriod: BillingPeriod }) {
  const { monthlyPrice, totalPrice, discount } = calculatePrice(plan.basePrice, billingPeriod)
  const isAnnual = billingPeriod === "annually"
  
  return (
    <Card className="group relative overflow-hidden border hover:border-green-500/50 transition-all duration-300">
      {plan.badge && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className={`rounded-full px-3 py-1 text-xs ${
            plan.color === 'blue' ? 'bg-blue-500' :
            plan.color === 'purple' ? 'bg-purple-500' :
            plan.color === 'orange' ? 'bg-orange-500' :
            plan.color === 'green' ? 'bg-green-500' : 'bg-primary'
          }`}>
            {plan.badge}
          </Badge>
        </div>
      )}
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
          <p className="text-xs text-muted-foreground">{plan.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{Math.round(monthlyPrice).toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">FCFA/mo</span>
          </div>
          {discount > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-green-500/10 text-green-600 border-green-500/20">
                Save {discount}%
              </Badge>
              <span className="text-xs text-muted-foreground line-through">
                {plan.basePrice.toLocaleString()} FCFA
              </span>
            </div>
          )}
          {billingPeriod !== "monthly" && (
            <p className="text-xs text-muted-foreground mt-1">
              Billed {Math.round(totalPrice).toLocaleString()} FCFA {billingDiscounts[billingPeriod].label.toLowerCase()}
            </p>
          )}
        </div>

        {isAnnual && (
          <div className="mb-4 p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-600">Free .com domain included</span>
            </div>
          </div>
        )}

        <ul className="space-y-1.5 mb-4">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs">
              <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mb-3 h-7 text-xs">
              View all {plan.allFeatures.length} features
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{plan.name} - All Features</DialogTitle>
              <DialogDescription>{plan.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              {plan.allFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Button asChild className="w-full h-8 text-xs">
          <Link href="/signup">
            Get Started
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </Card>
  )
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "shared-hosting": true,
  })
  const [openSubcategories, setOpenSubcategories] = useState<Record<string, boolean>>({
    "shared-cpanel": true,
    "ai-website-builder": false,
    "ai-free-access": false,
    "ai-paid-access": false,
  })
  const [openTechStacks, setOpenTechStacks] = useState<Record<string, boolean>>({
    "cpanel-nodejs": false,
    "cpanel-php": false,
    "cpanel-wordpress": false,
    "cpanel-woocommerce": false,
    "cpanel-ecommerce": false,
    "cpanel-python": false,
    "cpanel-ruby": false,
    "directadmin-nodejs": false,
    "directadmin-php": false,
    "directadmin-wordpress": false,
    "directadmin-woocommerce": false,
    "directadmin-ecommerce": false,
    "directadmin-python": false,
    "directadmin-ruby": false,
  })
  const [openResellerTypes, setOpenResellerTypes] = useState<Record<string, boolean>>({
    "cpanel-reseller": false,
    "cpanel-master": false,
    "cpanel-alpha": false,
    "da-reseller": false,
    "da-master": false,
    "da-alpha": false,
  })

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/50 to-background">
          <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="text-xs px-3 py-0.5">
                Transparent Pricing
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Simple, Affordable Pricing
              </h1>
              <p className="text-base text-muted-foreground">
                Choose the perfect plan for your needs. All plans include free SSL, daily backups, and 24/7 support.
              </p>
            </div>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="border-b bg-muted/30">
          <div className="container py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {(Object.keys(billingDiscounts) as BillingPeriod[]).map((period) => {
                  const { label, discount } = billingDiscounts[period]
                  return (
                    <button
                      key={period}
                      onClick={() => setBillingPeriod(period)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        billingPeriod === period
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-card hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      {label}
                      {discount > 0 && (
                        <span className={`ml-1.5 text-xs ${
                          billingPeriod === period ? "text-primary-foreground/80" : "text-green-600"
                        }`}>
                          -{discount}%
                        </span>
                      )}
                      {period === "annually" && (
                        <div className="absolute -top-1.5 -right-1.5">
                          <Gift className="h-3 w-3 text-green-500" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              {billingPeriod === "annually" && (
                <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Gift className="h-3 w-3 text-green-600" />
                  Annual billing includes a free .com domain
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hosting Services with Hierarchical Structure */}
        <section className="container py-12 md:py-16">
          <div className="max-w-6xl mx-auto space-y-4">
            
            {/* Shared Hosting */}
            <Collapsible 
              open={openCategories["shared-hosting"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "shared-hosting": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-green-500">Shared Hosting</h2>
                    <Badge className="bg-orange-500 text-xs">Popular</Badge>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["shared-hosting"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* cPanel Shared Hosting */}
                    <Collapsible 
                      open={openSubcategories["shared-cpanel"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "shared-cpanel": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">cPanel</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["shared-cpanel"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-3 space-y-2 bg-muted/20">
                            {/* Node.js */}
                            <Collapsible 
                              open={openTechStacks["cpanel-nodejs"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-nodejs": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Node.js</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-nodejs"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {nodejsPlans.map((plan) => (
                                      <PricingCard key={`cpanel-nodejs-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* PHP */}
                            <Collapsible 
                              open={openTechStacks["cpanel-php"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-php": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">PHP</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-php"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {phpPlans.map((plan) => (
                                      <PricingCard key={`cpanel-php-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* WordPress */}
                            <Collapsible 
                              open={openTechStacks["cpanel-wordpress"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-wordpress": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">WordPress</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-wordpress"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {wordpressPlans.map((plan) => (
                                      <PricingCard key={`cpanel-wordpress-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* WooCommerce */}
                            <Collapsible 
                              open={openTechStacks["cpanel-woocommerce"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-woocommerce": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">WooCommerce</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-woocommerce"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {woocommercePlans.map((plan) => (
                                      <PricingCard key={`cpanel-woocommerce-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* E-Commerce */}
                            <Collapsible 
                              open={openTechStacks["cpanel-ecommerce"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-ecommerce": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">E-Commerce</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-ecommerce"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {ecommercePlans.map((plan) => (
                                      <PricingCard key={`cpanel-ecommerce-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* Python */}
                            <Collapsible 
                              open={openTechStacks["cpanel-python"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-python": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Python</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-python"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {pythonPlans.map((plan) => (
                                      <PricingCard key={`cpanel-python-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* Ruby */}
                            <Collapsible 
                              open={openTechStacks["cpanel-ruby"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "cpanel-ruby": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Ruby</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["cpanel-ruby"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {rubyPlans.map((plan) => (
                                      <PricingCard key={`cpanel-ruby-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* DirectAdmin Shared Hosting */}
                    <Collapsible 
                      open={openSubcategories["shared-directadmin"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "shared-directadmin": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">DirectAdmin</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["shared-directadmin"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-3 space-y-2 bg-muted/20">
                            {/* Node.js */}
                            <Collapsible 
                              open={openTechStacks["directadmin-nodejs"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-nodejs": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Node.js</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-nodejs"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {nodejsPlans.map((plan) => (
                                      <PricingCard key={`directadmin-nodejs-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* PHP */}
                            <Collapsible 
                              open={openTechStacks["directadmin-php"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-php": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">PHP</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-php"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {phpPlans.map((plan) => (
                                      <PricingCard key={`directadmin-php-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* WordPress */}
                            <Collapsible 
                              open={openTechStacks["directadmin-wordpress"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-wordpress": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">WordPress</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-wordpress"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {wordpressPlans.map((plan) => (
                                      <PricingCard key={`directadmin-wordpress-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* WooCommerce */}
                            <Collapsible 
                              open={openTechStacks["directadmin-woocommerce"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-woocommerce": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">WooCommerce</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-woocommerce"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {woocommercePlans.map((plan) => (
                                      <PricingCard key={`directadmin-woocommerce-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* E-Commerce */}
                            <Collapsible 
                              open={openTechStacks["directadmin-ecommerce"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-ecommerce": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">E-Commerce</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-ecommerce"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {ecommercePlans.map((plan) => (
                                      <PricingCard key={`directadmin-ecommerce-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* Python */}
                            <Collapsible 
                              open={openTechStacks["directadmin-python"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-python": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Python</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-python"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {pythonPlans.map((plan) => (
                                      <PricingCard key={`directadmin-python-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* Ruby */}
                            <Collapsible 
                              open={openTechStacks["directadmin-ruby"]} 
                              onOpenChange={(open) => setOpenTechStacks({...openTechStacks, "directadmin-ruby": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Ruby</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openTechStacks["directadmin-ruby"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {rubyPlans.map((plan) => (
                                      <PricingCard key={`directadmin-ruby-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Reseller Hosting */}
            <Collapsible 
              open={openCategories["reseller-hosting"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "reseller-hosting": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Reseller Hosting</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["reseller-hosting"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* cPanel Reseller */}
                    <Collapsible 
                      open={openSubcategories["reseller-cpanel"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "reseller-cpanel": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">cPanel</span>
                            <Badge className="bg-blue-500 text-xs">Most Popular</Badge>
                          </div>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["reseller-cpanel"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-3 space-y-2 bg-muted/20">
                            {/* cPanel Reseller */}
                            <Collapsible 
                              open={openResellerTypes["cpanel-reseller"]} 
                              onOpenChange={(open) => setOpenResellerTypes({...openResellerTypes, "cpanel-reseller": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Reseller</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openResellerTypes["cpanel-reseller"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {cpanelResellerPlans.map((plan) => (
                                      <PricingCard key={`${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* cPanel Master Reseller */}
                            <Collapsible 
                              open={openResellerTypes["cpanel-master"]} 
                              onOpenChange={(open) => setOpenResellerTypes({...openResellerTypes, "cpanel-master": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Master Reseller</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openResellerTypes["cpanel-master"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {cpanelMasterResellerPlans.map((plan) => (
                                      <PricingCard key={`${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* cPanel Alpha Reseller */}
                            <Collapsible 
                              open={openResellerTypes["cpanel-alpha"]} 
                              onOpenChange={(open) => setOpenResellerTypes({...openResellerTypes, "cpanel-alpha": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Alpha Reseller</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openResellerTypes["cpanel-alpha"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {cpanelAlphaResellerPlans.map((plan) => (
                                      <PricingCard key={`${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* DirectAdmin Reseller */}
                    <Collapsible 
                      open={openSubcategories["reseller-directadmin"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "reseller-directadmin": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">DirectAdmin</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["reseller-directadmin"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-3 space-y-2 bg-muted/20">
                            {/* DA Reseller */}
                            <Collapsible 
                              open={openResellerTypes["da-reseller"]} 
                              onOpenChange={(open) => setOpenResellerTypes({...openResellerTypes, "da-reseller": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Reseller</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openResellerTypes["da-reseller"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {daResellerPlans.map((plan) => (
                                      <PricingCard key={`${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* DA Master Reseller */}
                            <Collapsible 
                              open={openResellerTypes["da-master"]} 
                              onOpenChange={(open) => setOpenResellerTypes({...openResellerTypes, "da-master": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Master Reseller</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openResellerTypes["da-master"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {daMasterResellerPlans.map((plan) => (
                                      <PricingCard key={`${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>

                            {/* DA Alpha Reseller */}
                            <Collapsible 
                              open={openResellerTypes["da-alpha"]} 
                              onOpenChange={(open) => setOpenResellerTypes({...openResellerTypes, "da-alpha": open})}
                            >
                              <Card className="overflow-hidden">
                                <CollapsibleTrigger className="w-full p-2 flex items-center justify-between hover:bg-accent transition-colors">
                                  <span className="text-sm font-medium">Alpha Reseller</span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${openResellerTypes["da-alpha"] ? "rotate-180" : ""}`} />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {daAlphaResellerPlans.map((plan) => (
                                      <PricingCard key={`${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                                    ))}
                                  </div>
                                </CollapsibleContent>
                              </Card>
                            </Collapsible>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Cloud VPS Reseller */}
                    <div className="p-4 grid sm:grid-cols-1 lg:grid-cols-1 gap-4">
                      {cloudVpsResellerPlans.map((plan) => (
                        <PricingCard key={`cloud-vps-reseller-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Cloud VPS Hosting */}
            <Collapsible 
              open={openCategories["cloud-vps"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "cloud-vps": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Cloud VPS Hosting</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["cloud-vps"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* Managed VPS */}
                    <Collapsible 
                      open={openSubcategories["managed-vps"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "managed-vps": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">Managed VPS</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["managed-vps"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {vpsPlans.map((plan) => (
                              <PricingCard key={`managed-vps-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Unmanaged VPS */}
                    <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {vpsPlans.map((plan) => (
                        <PricingCard key={`unmanaged-vps-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Dedicated VPS */}
            <Collapsible 
              open={openCategories["dedicated-vps"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "dedicated-vps": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Dedicated VPS</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["dedicated-vps"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                      {dedicatedPlans.map((plan) => (
                        <PricingCard key={`dedicated-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Bare Metal Servers */}
            <Collapsible 
              open={openCategories["bare-metal"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "bare-metal": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <h2 className="text-xl font-bold text-green-500">Bare Metal Servers</h2>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["bare-metal"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                      {bareMetalPlans.map((plan) => (
                        <PricingCard key={`baremetal-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* KmerHosting AI */}
            <Collapsible 
              open={openCategories["ai"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "ai": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-green-500">KmerHosting AI</h2>
                    <Badge className="bg-orange-500 text-xs">Popular</Badge>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["ai"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    {/* AI Website Builder */}
                    <Collapsible 
                      open={openSubcategories["ai-website-builder"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "ai-website-builder": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">AI Website Builder</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["ai-website-builder"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-1 gap-4">
                            {aiWebsiteBuilderPlans.map((plan) => (
                              <PricingCard key={`ai-builder-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Free Access Plan */}
                    <Collapsible 
                      open={openSubcategories["ai-free-access"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "ai-free-access": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">Free Access Plan</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["ai-free-access"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-1 gap-4">
                            {aiFreeAccessPlans.map((plan) => (
                              <PricingCard key={`ai-free-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Paid Access */}
                    <Collapsible 
                      open={openSubcategories["ai-paid-access"]} 
                      onOpenChange={(open) => setOpenSubcategories({...openSubcategories, "ai-paid-access": open})}
                    >
                      <Card className="overflow-hidden">
                        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent transition-colors">
                          <span className="font-medium">Paid Access</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openSubcategories["ai-paid-access"] ? "rotate-180" : ""}`} />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {aiPaidAccessPlans.map((plan) => (
                              <PricingCard key={`ai-paid-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Self-hosted n8n */}
            <Collapsible 
              open={openCategories["n8n"]} 
              onOpenChange={(open) => setOpenCategories({...openCategories, "n8n": open})}
            >
              <Card className="overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-green-500">Self-hosted n8n</h2>
                    <Badge className="bg-orange-500 text-xs">Popular</Badge>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openCategories["n8n"] ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-3 bg-muted/30">
                    <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                      {n8nPlans.map((plan) => (
                        <PricingCard key={`n8n-${plan.name}`} plan={plan} billingPeriod={billingPeriod} />
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t bg-muted/30">
          <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="text-sm text-muted-foreground">
                  Common questions about our pricing and billing
                </p>
              </div>
              <div className="space-y-3">
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">What payment methods do you accept?</h3>
                  <p className="text-xs text-muted-foreground">
                    We accept Mobile Money (MTN, Orange), credit/debit cards, PayPal, and bank transfers.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-xs text-muted-foreground">
                    Yes! You can upgrade or downgrade your plan at any time. Changes are prorated automatically.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">Is there a money-back guarantee?</h3>
                  <p className="text-xs text-muted-foreground">
                    All plans come with a 30-day money-back guarantee. If you're not satisfied, we'll refund you in full.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-2">When do I get the free domain?</h3>
                  <p className="text-xs text-muted-foreground">
                    Free .com domain is included only with annual billing plans. You can register or transfer a domain during signup.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="container py-12 md:py-16">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Still Have Questions?
              </h2>
              <p className="text-sm text-muted-foreground">
                Our expert team is ready to help you choose the perfect hosting solution
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="h-9">
                  <Link href="/support">
                    Contact Sales
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-9">
                  <Link href="/support/live-chat">Start Live Chat</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
