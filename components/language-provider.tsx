"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.pricing": "Pricing",
    "nav.products": "Products",
    "nav.wordpress": "WordPress",
    "nav.vps": "VPS",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.support": "Support",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.language": "Language",
    "nav.domainSearch": "Domain Search",
    "nav.freeHosting": "Free Plan",
    "nav.blog": "Blog",
    "nav.forum": "Forum",

    // Common
    "common.getStarted": "Get Started",
    "common.learnMore": "Learn More",
    "common.contactSales": "Contact Sales",
    "common.comparePlans": "Compare Plans",
    "common.freeDomain": "Free .com Domain",
    "common.freeSSL": "Free SSL Certificate",
    "common.freeEmail": "10+ Pro Email Addresses",
    "common.unlimitedBandwidth": "Unlimited Bandwidth",
    "common.unlimitedWebsites": "Unlimited Websites",
    "common.dailyBackups": "Daily Backups",
    "common.ssdStorage": "SSD NVMe Storage",

    // Hero
    "hero.title": "Professional Web Hosting Solutions",
    "hero.subtitle": "Reliable cloud hosting with free SSL, domain, and email. Built for developers and businesses.",

    // Features
    "features.security.title": "Advanced Security",
    "features.security.desc": "DDoS protection, malware scanning, and automatic security updates keep your site safe.",
    "features.performance.title": "Blazing Fast Speed",
    "features.performance.desc": "SSD NVMe storage and optimized servers deliver lightning-fast load times.",
    "features.uptime.title": "99.9% Uptime",
    "features.uptime.desc": "Reliable infrastructure ensures your website is always accessible to your visitors.",
    "features.ssl.title": "Free SSL Certificates",
    "features.ssl.desc": "Secure your site with free SSL certificates and automatic HTTPS encryption.",
    "features.storage.title": "Scalable Storage",
    "features.storage.desc": "Start small and grow with flexible storage options that scale with your needs.",
    "features.support.title": "24/7 Support",
    "features.support.desc": "Expert technical support available around the clock to help you succeed.",

    // Footer
    "footer.newsletter": "Subscribe to our newsletter",
    "footer.newsletterPlaceholder": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.allRightsReserved": "All rights reserved.",
    "footer.backToTop": "Back to Top",
    "footer.status": "Service Status",
    "footer.manageCookies": "Manage Cookies",

    // Auth
    "auth.login.title": "Welcome back!",
    "auth.login.subtitle": "Please sign in to continue.",
    "auth.login.email": "Email",
    "auth.login.password": "Password",
    "auth.login.submit": "Sign In",
    "auth.login.forgotPassword": "Forgot your password?",
    "auth.login.noAccount": "Don't have an account?",
    "auth.login.signUpLink": "Sign up here",
    
    "auth.signup.title": "Create Your Account",
    "auth.signup.subtitle": "Join KmerHosting and start your web hosting journey.",
    "auth.signup.name": "Full Name",
    "auth.signup.email": "Email",
    "auth.signup.password": "Password",
    "auth.signup.confirmPassword": "Confirm Password",
    "auth.signup.submit": "Create Account",
    "auth.signup.hasAccount": "Already have an account?",
    "auth.signup.loginLink": "Sign in here",
    "auth.signup.terms": "By creating an account, you agree to our",
    "auth.signup.termsLink": "Terms of Service",
    "auth.signup.and": "and",
    "auth.signup.privacyLink": "Privacy Policy",

    // Domain Search
    "domain.search.title": "Find Your Perfect Domain",
    "domain.search.subtitle": "Search for available domain names and secure your online presence.",
    "domain.search.placeholder": "Enter your domain name",
    "domain.search.button": "Search",
    "domain.search.available": "Available",
    "domain.search.unavailable": "Unavailable",
    "domain.search.price": "Price",
    "domain.search.addToCart": "Add to Cart",
    "domain.search.suggestions": "Suggested Alternatives",
    "domain.search.popularExtensions": "Popular Extensions",

    // Free Hosting
    "free.title": "Free Static Website Hosting",
    "free.subtitle": "Deploy your static websites for free with drag & drop. Perfect for portfolios, landing pages, and small projects.",
    "free.upload.title": "Upload Your Website",
    "free.upload.subtitle": "Drag and drop your website files or click to browse",
    "free.upload.requirements": "Requirements: Static files only, max 10MB, no backend",
    "free.upload.supported": "Supported: HTML, CSS, JS, Images, Fonts",
    "free.subdomain.title": "Choose Your Subdomain",
    "free.subdomain.placeholder": "Enter your desired subdomain",
    "free.subdomain.example": "Example: mysite.kmerhosting.site",
    "free.deploy.button": "Deploy for Free",
    "free.features.title": "What You Get",
    "free.features.ssl": "Free SSL Certificate",
    "free.features.cdn": "Global CDN",
    "free.features.bandwidth": "Unlimited Bandwidth",
    "free.features.storage": "10MB Storage",
    "free.features.subdomain": "Free .kmerhosting.site Subdomain",
    "free.features.support": "Community Support",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.pricing": "Tarifs",
    "nav.products": "Produits",
    "nav.wordpress": "WordPress",
    "nav.vps": "VPS",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.support": "Support",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.language": "Langue",
    "nav.domainSearch": "Recherche de domaine",
    "nav.freeHosting": "Plan gratuit",
    "nav.blog": "Blog",
    "nav.forum": "Forum",

    // Common
    "common.getStarted": "Commencer",
    "common.learnMore": "En savoir plus",
    "common.contactSales": "Contacter les ventes",
    "common.comparePlans": "Comparer les plans",
    "common.freeDomain": "Domaine .com gratuit",
    "common.freeSSL": "Certificat SSL gratuit",
    "common.freeEmail": "10+ adresses email pro",
    "common.unlimitedBandwidth": "Bande passante illimitée",
    "common.unlimitedWebsites": "Sites web illimités",
    "common.dailyBackups": "Sauvegardes quotidiennes",
    "common.ssdStorage": "Stockage SSD NVMe",

    // Hero
    "hero.title": "Solutions d'hébergement web professionnelles",
    "hero.subtitle":
      "Hébergement cloud fiable avec SSL, domaine et email gratuits. Conçu pour les développeurs et les entreprises.",

    // Features
    "features.security.title": "Sécurité avancée",
    "features.security.desc":
      "Protection DDoS, analyse anti-malware et mises à jour de sécurité automatiques protègent votre site.",
    "features.performance.title": "Vitesse fulgurante",
    "features.performance.desc":
      "Stockage SSD NVMe et serveurs optimisés offrent des temps de chargement ultra-rapides.",
    "features.uptime.title": "99,9% de disponibilité",
    "features.uptime.desc":
      "Une infrastructure fiable garantit que votre site web est toujours accessible à vos visiteurs.",
    "features.ssl.title": "Certificats SSL gratuits",
    "features.ssl.desc": "Sécurisez votre site avec des certificats SSL gratuits et un cryptage HTTPS automatique.",
    "features.storage.title": "Stockage évolutif",
    "features.storage.desc":
      "Commencez petit et grandissez avec des options de stockage flexibles qui évoluent avec vos besoins.",
    "features.support.title": "Support 24/7",
    "features.support.desc": "Support technique expert disponible 24h/24 pour vous aider à réussir.",

    // Footer
    "footer.newsletter": "Abonnez-vous à notre newsletter",
    "footer.newsletterPlaceholder": "Entrez votre email",
    "footer.subscribe": "S'abonner",
    "footer.allRightsReserved": "Tous droits réservés.",
    "footer.backToTop": "Retour en haut",
    "footer.status": "État des services",
    "footer.manageCookies": "Gérer les cookies",

    // Auth
    "auth.login.title": "Bon retour !",
    "auth.login.subtitle": "Veuillez vous connecter pour continuer.",
    "auth.login.email": "E-mail",
    "auth.login.password": "Mot de passe",
    "auth.login.submit": "Se connecter",
    "auth.login.forgotPassword": "Mot de passe oublié ?",
    "auth.login.noAccount": "Vous n'avez pas de compte ?",
    "auth.login.signUpLink": "Inscrivez-vous ici",
    
    "auth.signup.title": "Créez votre compte",
    "auth.signup.subtitle": "Rejoignez KmerHosting et commencez votre parcours d'hébergement web.",
    "auth.signup.name": "Nom complet",
    "auth.signup.email": "E-mail",
    "auth.signup.password": "Mot de passe",
    "auth.signup.confirmPassword": "Confirmer le mot de passe",
    "auth.signup.submit": "Créer un compte",
    "auth.signup.hasAccount": "Vous avez déjà un compte ?",
    "auth.signup.loginLink": "Connectez-vous ici",
    "auth.signup.terms": "En créant un compte, vous acceptez nos",
    "auth.signup.termsLink": "Conditions d'utilisation",
    "auth.signup.and": "et",
    "auth.signup.privacyLink": "Politique de confidentialité",

    // Domain Search
    "domain.search.title": "Trouvez votre domaine parfait",
    "domain.search.subtitle": "Recherchez des noms de domaine disponibles et sécurisez votre présence en ligne.",
    "domain.search.placeholder": "Entrez votre nom de domaine",
    "domain.search.button": "Rechercher",
    "domain.search.available": "Disponible",
    "domain.search.unavailable": "Indisponible",
    "domain.search.price": "Prix",
    "domain.search.addToCart": "Ajouter au panier",
    "domain.search.suggestions": "Alternatives suggérées",
    "domain.search.popularExtensions": "Extensions populaires",

    // Free Hosting
    "free.title": "Hébergement gratuit de sites statiques",
    "free.subtitle": "Déployez vos sites statiques gratuitement avec glisser-déposer. Parfait pour les portfolios, pages d'atterrissage et petits projets.",
    "free.upload.title": "Téléchargez votre site web",
    "free.upload.subtitle": "Glissez et déposez vos fichiers de site web ou cliquez pour parcourir",
    "free.upload.requirements": "Exigences : Fichiers statiques uniquement, max 10MB, pas de backend",
    "free.upload.supported": "Supporté : HTML, CSS, JS, Images, Polices",
    "free.subdomain.title": "Choisissez votre sous-domaine",
    "free.subdomain.placeholder": "Entrez le sous-domaine souhaité",
    "free.subdomain.example": "Exemple : monsite.kmerhosting.site",
    "free.deploy.button": "Déployer gratuitement",
    "free.features.title": "Ce que vous obtenez",
    "free.features.ssl": "Certificat SSL gratuit",
    "free.features.cdn": "CDN global",
    "free.features.bandwidth": "Bande passante illimitée",
    "free.features.storage": "Stockage 10MB",
    "free.features.subdomain": "Sous-domaine .kmerhosting.site gratuit",
    "free.features.support": "Support communautaire",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = localStorage.getItem("kmerhosting-language") as Language
    if (stored && (stored === "en" || stored === "fr")) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("kmerhosting-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
