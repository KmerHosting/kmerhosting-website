Plan: Implémenter KmerHosting SaaS avec Prisma, Next-Auth, Domaines & Notifications
TL;DR : Basculer en SSR, ajouter Prisma + Next-Auth + MySQL pour authentification, créer API métier (packs, panier, checkout, services), intégrer DNA API pour domaines (coût fixe), Mailtrap pour emails, et dashboards client/admin avec notifications d'expiration (60j, 30j, 15j, 5j). Renouvellement manuel via bouton.

Steps
Configurer l'infrastructure de base — Modifier next.config.mjs pour SSR, créer .env.example et .env.local, installer Prisma, Next-Auth, MySQL, Nodemailer, DNA API client

Initialiser Prisma + schéma DB — Créer prisma/schema.prisma avec modèles User (email, password, credits), Service (pack, domain, controlPanel, status, expiresAt), Transaction, CartItem, CreditRequest, DomainPurchase, enums ServiceStatus et ControlPanel

Configurer authentification Next-Auth — Créer app/api/auth/[...nextauth].ts avec provider email/password, email verification (Mailtrap), callbacks session/JWT, protéger routes sensibles

Créer API routes métier — /api/packs (calcul prix par durée), /api/cart (CRUD items), /api/checkout (valider crédits, créer Service, debit), /api/services (GET liste, PATCH renouvellement), /api/credits (solde, requêtes), /api/domains (recherche/disponibilité via DNA API)

Implémenter pages auth + checkout — /auth/register, /auth/login, /auth/verify-email, /cart (liste items + modales domaine obligatoire), /checkout (confirmation prix + débit)

Créer dashboard client — /dashboard/services (liste avec status + expiration, notifications 60/30/15/5j, bouton renouveler/accéder panel), /dashboard/billing (transactions + solde), /dashboard/settings

Créer admin dashboard — /admin/users (liste, activer/bloquer, historique), /admin/credits (ajouter crédits form), /admin/stats (CA, rapports ventes), /admin/notifications (logs emails)

Configurer Mailtrap + templates email — Créer connexion Mailtrap, templates : vérification email, confirmation achat, notifications expiration (60/30/15/5j avant), rappel renouvellement, confirmation renouvellement

Implémenter système de notification — Cron job ou task queue pour détecter services expirant et envoyer emails aux dates (60j, 30j, 15j, 5j), stocker logs notifications en DB

Intégrer DNA API pour domaines — Wrapper client DNA, endpoint /api/domains/check (disponibilité), /api/domains/register (achat), récupérer pricing API (ou coût fixe si pas dispo), gérer renouvellements domaines

Mettre à jour composants existants — Navbar (Dashboard/Logout si logged), CTA (« Acheter » → /cart), PricingSection (boutons fonctionnels → /cart), pages hosting (optionnel : ajouter « Buy Now »)