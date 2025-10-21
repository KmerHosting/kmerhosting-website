"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Globe,
  Server,
  Users,
  Award,
  Sparkles,
  Rocket,
  Heart,
  Crown
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Dynamically import Joyride to avoid SSR issues
const Joyride = dynamic(() => import('react-joyride'), { ssr: false })

export default function OnboardingPage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      target: '.hero-welcome',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold mb-2">🌟 Bienvenue chez KmerHosting !</h3>
          <p className="text-sm">Votre partenaire de confiance pour l'hébergement web professionnel au Cameroun. Prêt pour le voyage ?</p>
        </motion.div>
      ),
      placement: 'center' as const,
      disableBeacon: true,
    },
    {
      target: '.hosting-types',
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Server className="h-6 w-6 text-blue-500 mb-2" />
          <h4 className="font-semibold mb-1">Types d'Hébergement</h4>
          <p className="text-sm">Découvrez nos solutions : Partagé, WordPress, VPS, et bien plus ! Chaque plan est optimisé pour vos besoins.</p>
        </motion.div>
      ),
      placement: 'bottom' as const,
    },
    {
      target: '.features-grid',
      content: (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="h-6 w-6 text-green-500 mb-2" />
          <h4 className="font-semibold mb-1">Fonctionnalités Premium</h4>
          <p className="text-sm">SSL gratuit, domaine offert, support 24/7, et sauvegardes automatiques. Tout est inclus !</p>
        </motion.div>
      ),
      placement: 'top' as const,
    },
    {
      target: '.pricing-section',
      content: (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Crown className="h-6 w-6 text-purple-500 mb-2" />
          <h4 className="font-semibold mb-1">Tarifs Compétitifs</h4>
          <p className="text-sm">À partir de 13 900 FCFA/an. Plans flexibles pour particuliers et entreprises.</p>
        </motion.div>
      ),
      placement: 'bottom' as const,
    },
    {
      target: '.testimonials',
      content: (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="h-6 w-6 text-red-500 mb-2" />
          <h4 className="font-semibold mb-1">Témoignages Clients</h4>
          <p className="text-sm">Plus de 10 000 clients satisfaits nous font confiance. Rejoignez la communauté !</p>
        </motion.div>
      ),
      placement: 'top' as const,
    },
    {
      target: '.support-section',
      content: (
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Users className="h-6 w-6 text-indigo-500 mb-2" />
          <h4 className="font-semibold mb-1">Support Expert</h4>
          <p className="text-sm">Notre équipe est là pour vous aider 24/7. Chat en direct, email, et téléphone.</p>
        </motion.div>
      ),
      placement: 'left' as const,
    },
    {
      target: '.cta-final',
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Rocket className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold mb-2">🚀 Prêt à Décoller ?</h3>
          <p className="text-sm">Créez votre compte maintenant et bénéficiez d'une période d'essai gratuite !</p>
        </motion.div>
      ),
      placement: 'center' as const,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 101)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleJoyrideCallback = (data: any) => {
    setCurrentStep(data.index)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Votre Voyage d'Onboarding</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="mt-1" />
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="pt-24 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center hero-welcome"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Sparkles className="h-16 w-16 text-yellow-500" />
              </motion.div>
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-lg">
                🌍 Bienvenue dans l'Univers KmerHosting
              </Badge>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Votre Voyage Commence Ici
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-8">
                Découvrez tout ce que nous avons à offrir dans une expérience immersive et guidée.
                Préparez-vous pour une aventure extraordinaire !
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" className="cta-final text-lg px-8 py-4">
                  <Link href="/signup" className="flex items-center gap-2">
                    Commencer l'Aventure <Rocket className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Hosting Types */}
        <section className="py-20 hosting-types">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">Nos Solutions d'Hébergement</h2>
                <p className="text-xl text-muted-foreground">
                  Choisissez la solution parfaite pour votre projet
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Globe, title: "Hébergement Partagé", desc: "Parfait pour débuter", price: "13 900 FCFA/an" },
                  { icon: Server, title: "WordPress Hosting", desc: "Optimisé pour WP", price: "15 000 FCFA/an" },
                  { icon: Zap, title: "VPS Hosting", desc: "Puissance maximale", price: "25 000 FCFA/an" },
                  { icon: Crown, title: "Cloud Hosting", desc: "Évolutif et fiable", price: "35 000 FCFA/an" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                        </motion.div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                        <Badge variant="outline">{item.price}</Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30 features-grid">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">Fonctionnalités Exceptionnelles</h2>
                <p className="text-xl text-muted-foreground">
                  Tout ce dont vous avez besoin pour réussir en ligne
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Shield, title: "SSL Gratuit", desc: "Sécurisez votre site avec Let's Encrypt" },
                  { icon: Star, title: "Domaine Offert", desc: "Domaine .com gratuit la première année" },
                  { icon: CheckCircle, title: "Support 24/7", desc: "Assistance experte à tout moment" },
                  { icon: Zap, title: "Performance", desc: "Serveurs ultra-rapides et optimisés" },
                  { icon: Award, title: "Garantie", desc: "30 jours satisfait ou remboursé" },
                  { icon: Users, title: "Migration", desc: "Transfert gratuit de votre site" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <feature.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:text-green-500 transition-colors" />
                        </motion.div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 pricing-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">Tarifs Transparents</h2>
                <p className="text-xl text-muted-foreground">
                  Des prix justes pour une qualité exceptionnelle
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "Discover", price: "13 900", features: ["1 Site Web", "5 GB Stockage", "SSL Gratuit"] },
                  { name: "Plus", price: "15 000", features: ["3 Sites Web", "30 GB Stockage", "Support Prioritaire"] },
                  { name: "Pro", price: "25 000", features: ["Sites Illimités", "100 GB Stockage", "VPS Inclus"] },
                ].map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className={`relative ${index === 1 ? 'border-2 border-primary' : ''}`}
                  >
                    <Card className="h-full">
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-primary">{plan.price} <span className="text-sm font-normal">FCFA/an</span></div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    {index === 1 && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        Le Plus Populaire
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/30 testimonials">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">Ce Que Disent Nos Clients</h2>
                <p className="text-xl text-muted-foreground">
                  Des milliers de sites web nous font confiance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: "Marie K.", company: "Boutique Online", text: "Service exceptionnel ! Mon site est rapide et sécurisé." },
                  { name: "Jean P.", company: "Agence Web", text: "Support réactif et tarifs compétitifs. Parfait !" },
                ].map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 support-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight mb-4">Support d'Exception</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Notre équipe d'experts est là pour vous accompagner à chaque étape
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Users, title: "Chat en Direct", desc: "Réponse en moins de 5 minutes" },
                  { icon: Award, title: "Experts Certifiés", desc: "Support technique qualifié" },
                  { icon: Heart, title: "Accompagnement", desc: "Guide personnalisé pour votre succès" },
                ].map((support, index) => (
                  <motion.div
                    key={support.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card>
                      <CardContent className="p-6 text-center">
                        <support.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">{support.title}</h3>
                        <p className="text-sm text-muted-foreground">{support.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Rocket className="h-16 w-16" />
              </motion.div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                Prêt à Rejoindre l'Aventure KmerHosting ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Commencez votre voyage vers le succès en ligne dès aujourd'hui
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Link href="/signup" className="flex items-center gap-2">
                    Créer Mon Compte <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />

      {/* Enhanced Joyride Tour */}
      <Joyride
        steps={steps}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        run={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: 'hsl(var(--primary))',
            textColor: 'hsl(var(--foreground))',
            backgroundColor: 'hsl(var(--background))',
            overlayColor: 'rgba(0, 0, 0, 0.7)',
            spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            beaconSize: 36,
            zIndex: 100,
          },
          tooltip: {
            borderRadius: 12,
            fontSize: 16,
            padding: 20,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          },
          tooltipContainer: {
            textAlign: 'center',
          },
          buttonNext: {
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            borderRadius: 8,
            fontWeight: 'bold',
            padding: '10px 20px',
          },
          buttonBack: {
            color: 'hsl(var(--muted-foreground))',
            borderRadius: 8,
            padding: '10px 20px',
          },
          buttonSkip: {
            color: 'hsl(var(--muted-foreground))',
            borderRadius: 8,
            padding: '10px 20px',
          },
          buttonClose: {
            height: 14,
            width: 14,
            right: 15,
            top: 15,
          },
        }}
        locale={{
          back: 'Précédent',
          close: 'Fermer',
          last: 'Terminer',
          next: 'Suivant',
          open: 'Ouvrir',
          skip: 'Passer',
          nextLabelWithProgress: 'Suivant ({step} sur {steps})',
        }}
        floaterProps={{
          disableAnimation: false,
        }}
        spotlightClicks={true}
        disableOverlayClose={true}
        hideCloseButton={false}
        spotlightPadding={10}
      />
    </>
  )
}