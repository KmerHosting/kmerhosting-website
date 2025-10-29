"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, ChevronDown, Check, User, Ticket } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ProductInfoDialog } from "@/components/product-info-dialog"
import { productInfoData } from "@/lib/product-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  
  // Product dialog state
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("")

  const handleProductClick = (productPath: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (productInfoData[productPath]) {
      setSelectedProduct(productPath)
      setProductDialogOpen(true)
    }
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ]

  // State for nested mobile collapsibles
  const [hostingOpen, setHostingOpen] = useState(false)
  const [sharedOpen, setSharedOpen] = useState(false)
  const [resellerOpen, setResellerOpen] = useState(false)
  const [vpsOpen, setVpsOpen] = useState(false)
  const [dedicatedVpsOpen, setDedicatedVpsOpen] = useState(false)
  const [dedicatedOpen, setDedicatedOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [freeAiOpen, setFreeAiOpen] = useState(false)
  const [paidAiOpen, setPaidAiOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [extrasOpen, setExtrasOpen] = useState(false)
  
  // State for desktop nested dropdowns
  const [desktopExpandedCategory, setDesktopExpandedCategory] = useState<string | null>(null)
  const [desktopExpandedSubcategory, setDesktopExpandedSubcategory] = useState<string | null>(null)
  const [desktopExpandedAiSub, setDesktopExpandedAiSub] = useState<string | null>(null)

  const productCategories = [
    {
      label: "Hosting Services",
      popular: true,
      items: [
        { 
          label: "Shared Hosting",
          nested: [
            { 
              label: "cPanel",
              items: [
                { href: "/products/shared/cpanel/wordpress", label: "WordPress Hosting" },
                { href: "/products/shared/cpanel/nodejs", label: "Node.js Hosting" },
                { href: "/products/shared/cpanel/php", label: "PHP Hosting" },
                { href: "/products/shared/cpanel/python", label: "Python Hosting" },
                { href: "/products/shared/cpanel/ruby", label: "Ruby Hosting" },
                { href: "/products/shared/cpanel/ecommerce", label: "E-commerce Hosting" },
                { href: "/products/shared/cpanel/woocommerce", label: "WooCommerce Hosting" },
              ]
            },
            { 
              label: "DirectAdmin",
              items: [
                { href: "/products/shared/directadmin/wordpress", label: "WordPress Hosting" },
                { href: "/products/shared/directadmin/nodejs", label: "Node.js Hosting" },
                { href: "/products/shared/directadmin/php", label: "PHP Hosting" },
                { href: "/products/shared/directadmin/python", label: "Python Hosting" },
                { href: "/products/shared/directadmin/ecommerce", label: "E-commerce Hosting" },
                { href: "/products/shared/directadmin/woocommerce", label: "WooCommerce Hosting" },
              ]
            },
          ]
        },
        { 
          label: "Reseller Hosting",
          nested: [
            { 
              label: "cPanel",
              popular: true,
              items: [
                { href: "/products/reseller/cpanel/alpha", label: "Alpha Reseller" },
                { href: "/products/reseller/cpanel/master", label: "Master Reseller" },
                { href: "/products/reseller/cpanel/reseller", label: "Reseller" },
              ]
            },
            { 
              label: "DirectAdmin",
              items: [
                { href: "/products/reseller/directadmin/alpha", label: "Alpha Reseller" },
                { href: "/products/reseller/directadmin/master", label: "Master Reseller" },
                { href: "/products/reseller/directadmin/reseller", label: "Reseller" },
              ]
            },
            { 
              label: "Cloud VPS Reseller",
              items: [
                { href: "/products/reseller/cloud-vps", label: "Cloud VPS Reseller" },
              ]
            },
          ]
        },
      ]
    },
    {
      label: "Cloud VPS Hosting",
      items: [
        { href: "/products/vps/managed", label: "Managed VPS" },
        { href: "/products/vps/unmanaged", label: "Unmanaged VPS" },
      ]
    },
    {
      label: "Dedicated VPS",
      items: [
        { href: "/products/dedicated-vps/managed", label: "Managed Dedicated VPS" },
        { href: "/products/dedicated-vps/unmanaged", label: "Unmanaged Dedicated VPS" },
      ]
    },
    {
      label: "Bare Metal Servers",
      items: [
        { href: "/products/dedicated-servers/managed", label: "Managed Servers" },
        { href: "/products/dedicated-servers/unmanaged", label: "Unmanaged Servers" },
      ]
    },
    {
      label: "KmerHosting AI",
      popular: true,
      items: [
        { href: "/products/ai/website-builder", label: "AI Website Builder" },
        { 
          label: "Free Access Plan",
          nested: [
            { 
              label: "Available Models",
              items: [
                { href: "/products/ai/free/llama", label: "Llama Series" },
                { href: "/products/ai/free/deepseek", label: "Deepseek Series" },
                { href: "/products/ai/free/gpt", label: "GPT Series" },
                { href: "/products/ai/free/qwen", label: "Qwen" },
                { href: "/products/ai/free/mistral", label: "Mistral" },
                { href: "/products/ai/free/gemma", label: "Gemma" },
                { href: "/products/ai/free/phi", label: "Phi" },
                { href: "/products/ai/free/codellama", label: "Code Llama" },
              ]
            },
          ]
        },
        { 
          label: "Paid Access",
          nested: [
            { 
              label: "Premium Models",
              items: [
                { href: "/products/ai/paid/llama", label: "Llama Series" },
                { href: "/products/ai/paid/deepseek", label: "Deepseek Series" },
                { href: "/products/ai/paid/gpt", label: "GPT Series" },
                { href: "/products/ai/paid/qwen", label: "Qwen" },
                { href: "/products/ai/paid/mistral", label: "Mistral" },
                { href: "/products/ai/paid/gemma", label: "Gemma" },
                { href: "/products/ai/paid/phi", label: "Phi" },
                { href: "/products/ai/paid/codellama", label: "Code Llama" },
                { href: "/products/ai/paid/claude", label: "Claude" },
                { href: "/products/ai/paid/command", label: "Command R+" },
              ]
            },
          ]
        },
      ]
    },
    {
      label: "Self-hosted n8n",
      popular: true,
      href: "/products/n8n"
    },
    {
      label: "Other Services",
      items: [
        { 
          label: "Tools",
          nested: [
            { 
              label: "Available Tools",
              items: [
                { href: "/domain-search", label: "Domain Search" },
                { href: "/tools/whois-lookup", label: "WHOIS Lookup" },
              ]
            },
          ]
        },
        { 
          label: "Extra Services",
          nested: [
            { 
              label: "Additional Offerings",
              items: [
                { href: "/products/ai/website-builder", label: "AI Website Builder" },
                { href: "/products/ssl-certificates", label: "SSL Certificates" },
                { href: "/products/email-hosting", label: "Email Hosting" },
                { href: "/products/database-hosting", label: "Database Hosting" },
                { href: "/products/free-static-hosting", label: "Free Static Site Hosting" },
              ]
            },
          ]
        },
      ]
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <Image 
                src="/kmerhosting-logo.svg" 
                alt="KmerHosting Logo" 
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-5 py-3 text-sm font-medium transition-colors hover:border-b-2 hover:border-green-500",
                  pathname === item.href ? "text-foreground border-b-2 border-green-500" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Products Dropdown - Moved after Pricing */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "px-5 py-3 text-sm font-medium transition-colors hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0",
                    pathname.startsWith('/products') ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  Products
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 max-h-[600px] overflow-y-auto">
                {productCategories.map((category, index) => (
                  <div key={index}>
                    {category.href ? (
                      // Single link category (like Self-hosted n8n)
                      <>
                        <DropdownMenuItem>
                          <div 
                            onClick={(e) => handleProductClick(category.href, e)}
                            className="cursor-pointer text-[#07C983] dark:text-[#07C983] font-bold flex items-center gap-2 w-full"
                          >
                            {category.label}
                            {category.popular && (
                              <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                Popular
                              </span>
                            )}
                          </div>
                        </DropdownMenuItem>
                        {index < productCategories.length - 1 && <DropdownMenuSeparator />}
                      </>
                    ) : category.items ? (
                      // Category with items - make it collapsible
                      <Collapsible
                        open={desktopExpandedCategory === category.label}
                        onOpenChange={(open) => {
                          setDesktopExpandedCategory(open ? category.label : null)
                          if (!open) {
                            setDesktopExpandedSubcategory(null)
                            setDesktopExpandedAiSub(null)
                          }
                        }}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-bold text-[#07C983] dark:text-[#07C983] hover:bg-accent rounded-sm">
                          <span className="flex items-center gap-2">
                            {category.label}
                            {category.popular && (
                              <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                Popular
                              </span>
                            )}
                          </span>
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            desktopExpandedCategory === category.label && "rotate-180"
                          )} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-2">
                          {category.items.map((item: any) => (
                            item.nested ? (
                              // Nested subcategories (like Shared Hosting with cPanel/DirectAdmin or AI models)
                              <Collapsible
                                key={item.label}
                                open={desktopExpandedSubcategory === item.label}
                                onOpenChange={(open) => {
                                  setDesktopExpandedSubcategory(open ? item.label : null)
                                  if (!open) setDesktopExpandedAiSub(null)
                                }}
                              >
                                <CollapsibleTrigger className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-semibold text-foreground hover:bg-accent rounded-sm">
                                  {item.label}
                                  <ChevronDown className={cn(
                                    "h-4 w-4 transition-transform",
                                    desktopExpandedSubcategory === item.label && "rotate-180"
                                  )} />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-2">
                                  {item.nested.map((subcat: any) => (
                                    subcat.items ? (
                                      <div key={subcat.label} className="mb-2">
                                        <div className="text-xs font-medium text-primary py-1 px-2 flex items-center gap-2">
                                          {subcat.label}
                                          {subcat.popular && (
                                            <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                                              Most Popular
                                            </span>
                                          )}
                                        </div>
                                        {subcat.items.map((subitem: any) => (
                                          <DropdownMenuItem key={subitem.href}>
                                            <div 
                                              onClick={(e) => handleProductClick(subitem.href, e)}
                                              className="cursor-pointer pl-4 text-xs w-full"
                                            >
                                              {subitem.label}
                                            </div>
                                          </DropdownMenuItem>
                                        ))}
                                      </div>
                                    ) : null
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            ) : item.href ? (
                              // Simple item with link
                              <DropdownMenuItem key={item.href}>
                                <div 
                                  onClick={(e) => handleProductClick(item.href, e)}
                                  className="cursor-pointer w-full"
                                >
                                  {item.label}
                                </div>
                              </DropdownMenuItem>
                            ) : null
                          ))}
                        </CollapsibleContent>
                        {index < productCategories.length - 1 && <DropdownMenuSeparator />}
                      </Collapsible>
                    ) : null}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-5 py-3 text-sm font-medium transition-colors hover:border-b-2 hover:border-green-500",
                  pathname === item.href ? "text-foreground border-b-2 border-green-500" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between">
                  Dark
                  {theme === "dark" && <Check className="h-4 w-4 text-[#07C983] ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between">
                  Light
                  {theme === "light" && <Check className="h-4 w-4 text-[#07C983] ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between">
                  System
                  {theme === "system" && <Check className="h-4 w-4 text-[#07C983] ml-2" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent px-4 py-3 gap-2">
                  <User className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Client Area
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/support" className="cursor-pointer flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    Submit a Ticket
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for Mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between">
                  Dark
                  {theme === "dark" && <Check className="h-4 w-4 text-[#07C983] ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between">
                  Light
                  {theme === "light" && <Check className="h-4 w-4 text-[#07C983] ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between">
                  System
                  {theme === "system" && <Check className="h-4 w-4 text-[#07C983] ml-2" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.slice(0, 2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium py-2 px-4 rounded-md transition-colors hover:bg-accent",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {/* Products Collapsible with Nested Categories */}
                  <Collapsible open={productsOpen} onOpenChange={setProductsOpen}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between text-lg font-medium py-2 px-4 rounded-md transition-colors hover:bg-accent",
                          pathname.startsWith('/products') ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        Products
                        <ChevronDown className={cn("h-4 w-4 transition-transform", productsOpen && "rotate-180")} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2 ml-4">
                      {/* Hosting Services */}
                      <Collapsible open={hostingOpen} onOpenChange={setHostingOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4"
                          >
                            <span className="flex items-center gap-2">
                              Hosting Services
                              <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                Popular
                              </span>
                            </span>
                            <ChevronDown className={cn("h-3 w-3 transition-transform", hostingOpen && "rotate-180")} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 ml-4">
                          {/* Shared Hosting with nested cPanel/DirectAdmin */}
                          <Collapsible open={sharedOpen} onOpenChange={setSharedOpen}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-xs font-medium py-1.5 px-3"
                              >
                                Shared Hosting
                                <ChevronDown className={cn("h-3 w-3 transition-transform", sharedOpen && "rotate-180")} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 ml-4 mt-1">
                              {productCategories[0].items && productCategories[0].items[0] && 'nested' in productCategories[0].items[0] && productCategories[0].items[0].nested?.map((panel: any) => (
                                <div key={panel.label}>
                                  <div className="text-xs font-semibold text-primary py-1 px-3">
                                    {panel.label}
                                  </div>
                                  {panel.items.map((item: any) => (
                                    <button
                                      key={item.href}
                                      onClick={(e) => {
                                        handleProductClick(item.href, e)
                                        setIsOpen(false)
                                      }}
                                      className={cn(
                                        "block text-xs py-1.5 px-4 rounded-md transition-colors hover:bg-accent w-full text-left",
                                        "text-muted-foreground hover:text-foreground",
                                      )}
                                    >
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>

                          {/* Reseller Hosting with nested cPanel/DirectAdmin */}
                          <Collapsible open={resellerOpen} onOpenChange={setResellerOpen}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-xs font-medium py-1.5 px-3"
                              >
                                Reseller Hosting
                                <ChevronDown className={cn("h-3 w-3 transition-transform", resellerOpen && "rotate-180")} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-2 ml-4 mt-1">
                              {productCategories[0].items && productCategories[0].items[1] && 'nested' in productCategories[0].items[1] && productCategories[0].items[1].nested?.map((panel: any) => (
                                <div key={panel.label}>
                                  <div className="text-xs font-semibold text-primary py-1 px-3 flex items-center gap-2">
                                    {panel.label}
                                    {panel.popular && (
                                      <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                                        Most Popular
                                      </span>
                                    )}
                                  </div>
                                  {panel.items.map((item: any) => (
                                    <button
                                      key={item.href}
                                      onClick={(e) => {
                                        handleProductClick(item.href, e)
                                        setIsOpen(false)
                                      }}
                                      className={cn(
                                        "block text-xs py-1.5 px-4 rounded-md transition-colors hover:bg-accent w-full text-left",
                                        "text-muted-foreground hover:text-foreground",
                                      )}
                                    >
                                      {item.label}
                                    </button>
                                  ))}
                                </div>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Cloud VPS Hosting */}
                      <Collapsible open={vpsOpen} onOpenChange={setVpsOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4"
                          >
                            Cloud VPS Hosting
                            <ChevronDown className={cn("h-3 w-3 transition-transform", vpsOpen && "rotate-180")} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 ml-4">
                          {productCategories[1].items && productCategories[1].items.map((item: any) => (
                            <button
                              key={item.href}
                              onClick={(e) => {
                                handleProductClick(item.href, e)
                                setIsOpen(false)
                              }}
                              className={cn(
                                "block text-sm py-2 px-4 rounded-md transition-colors hover:bg-accent w-full text-left",
                                "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {item.label}
                            </button>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Dedicated VPS */}
                      <Collapsible open={dedicatedVpsOpen} onOpenChange={setDedicatedVpsOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4"
                          >
                            Dedicated VPS
                            <ChevronDown className={cn("h-3 w-3 transition-transform", dedicatedVpsOpen && "rotate-180")} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 ml-4">
                          {productCategories[2].items && productCategories[2].items.map((item: any) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block text-sm py-2 px-4 rounded-md transition-colors hover:bg-accent",
                                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Bare Metal Servers */}
                      <Collapsible open={dedicatedOpen} onOpenChange={setDedicatedOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4"
                          >
                            Bare Metal Servers
                            <ChevronDown className={cn("h-3 w-3 transition-transform", dedicatedOpen && "rotate-180")} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 ml-4">
                          {productCategories[3].items && productCategories[3].items.map((item: any) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block text-sm py-2 px-4 rounded-md transition-colors hover:bg-accent",
                                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>

                      {/* KmerHosting AI - Popular */}
                      <Collapsible open={aiOpen} onOpenChange={setAiOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4"
                          >
                            <span className="flex items-center gap-2">
                              KmerHosting AI
                              <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                                Popular
                              </span>
                            </span>
                            <ChevronDown className={cn("h-3 w-3 transition-transform", aiOpen && "rotate-180")} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 ml-4 mt-1">
                          {/* AI Website Builder */}
                          <Link
                            href="/products/ai/website-builder"
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block text-sm py-2 px-4 rounded-md transition-colors hover:bg-accent",
                              pathname === "/products/ai/website-builder" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            AI Website Builder
                          </Link>

                          {/* Free Access Plan */}
                          <Collapsible open={freeAiOpen} onOpenChange={setFreeAiOpen}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-xs font-medium py-1.5 px-3"
                              >
                                Free Access Plan
                                <ChevronDown className={cn("h-3 w-3 transition-transform", freeAiOpen && "rotate-180")} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 ml-4">
                              {productCategories[4].items && productCategories[4].items[1] && 'nested' in productCategories[4].items[1] && productCategories[4].items[1].nested?.[0].items.map((model: any) => (
                                <Link
                                  key={model.href}
                                  href={model.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block text-xs py-1.5 px-4 rounded-md transition-colors hover:bg-accent",
                                    pathname === model.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  {model.label}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>

                          {/* Paid Access */}
                          <Collapsible open={paidAiOpen} onOpenChange={setPaidAiOpen}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-xs font-medium py-1.5 px-3"
                              >
                                Paid Access
                                <ChevronDown className={cn("h-3 w-3 transition-transform", paidAiOpen && "rotate-180")} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 ml-4">
                              {productCategories[4].items && productCategories[4].items[2] && 'nested' in productCategories[4].items[2] && productCategories[4].items[2].nested?.[0].items.map((model: any) => (
                                <Link
                                  key={model.href}
                                  href={model.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block text-xs py-1.5 px-4 rounded-md transition-colors hover:bg-accent",
                                    pathname === model.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  {model.label}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Self-hosted n8n - Popular */}
                      <Link
                        href={productCategories[5].href || '/products/n8n'}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4 rounded-md transition-colors hover:bg-accent",
                          pathname === (productCategories[5].href || '/products/n8n') ? "bg-accent" : "",
                        )}
                      >
                        {productCategories[5].label}
                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">
                          Popular
                        </span>
                      </Link>

                      {/* Other Services */}
                      <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-sm font-semibold text-[#07C983] dark:text-[#07C983] py-2 px-4"
                          >
                            Other Services
                            <ChevronDown className={cn("h-3 w-3 transition-transform", servicesOpen && "rotate-180")} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2 ml-4 mt-1">
                          {/* Tools */}
                          <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-xs font-medium py-1.5 px-3"
                              >
                                Tools
                                <ChevronDown className={cn("h-3 w-3 transition-transform", toolsOpen && "rotate-180")} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 ml-4">
                              {productCategories[6].items && productCategories[6].items[0] && 'nested' in productCategories[6].items[0] && productCategories[6].items[0].nested?.[0].items.map((tool: any) => (
                                <Link
                                  key={tool.href}
                                  href={tool.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block text-xs py-1.5 px-4 rounded-md transition-colors hover:bg-accent",
                                    pathname === tool.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  {tool.label}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>

                          {/* Extra Services */}
                          <Collapsible open={extrasOpen} onOpenChange={setExtrasOpen}>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-xs font-medium py-1.5 px-3"
                              >
                                Extra Services
                                <ChevronDown className={cn("h-3 w-3 transition-transform", extrasOpen && "rotate-180")} />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-1 ml-4">
                              {productCategories[6].items && productCategories[6].items[1] && 'nested' in productCategories[6].items[1] && productCategories[6].items[1].nested?.[0].items.map((extra: any) => (
                                <Link
                                  key={extra.href}
                                  href={extra.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block text-xs py-1.5 px-4 rounded-md transition-colors hover:bg-accent",
                                    pathname === extra.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  {extra.label}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </CollapsibleContent>
                      </Collapsible>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {navItems.slice(2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium py-2 px-4 rounded-md transition-colors hover:bg-accent",
                        pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  <div className="border-t pt-4 space-y-4">
                    {/* User Menu */}
                    <div className="px-4">
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Account</h4>
                      <div className="space-y-2">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full bg-transparent px-6 py-2 justify-start gap-2">
                            <User className="h-4 w-4" />
                            Client Area
                          </Button>
                        </Link>
                        <Link href="/support" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full bg-transparent px-6 py-2 justify-start gap-2">
                            <Ticket className="h-4 w-4" />
                            Submit a Ticket
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Product Info Dialog */}
      {selectedProduct && productInfoData[selectedProduct] && (
        <ProductInfoDialog
          open={productDialogOpen}
          onOpenChange={setProductDialogOpen}
          productName={productInfoData[selectedProduct].name}
          description={productInfoData[selectedProduct].description}
          features={productInfoData[selectedProduct].features}
          isPopular={productInfoData[selectedProduct].isPopular}
        />
      )}
    </header>
  )
}
