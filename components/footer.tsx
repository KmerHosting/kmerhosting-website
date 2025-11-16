"use client"

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#128C7E" }}>
              KmerHosting
            </h3>
            <p className="text-slate-600 dark:text-slate-400">The best web hosting solutions for Cameroon businesses and individuals.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Hosting</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <a href="https://kmerhosting.com/customers/store/cpanel-shared-hosting" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Shared Hosting
                </a>
              </li>
              <li>
                <a href="https://kmerhosting.com/customers/store/cpanel-reseller-hosting" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Reseller Hosting
                </a>
              </li>
              <li>
                <a href="https://kmerhosting.com/customers/contact.php" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  VPS Hosting
                </a>
              </li>
              <li>
                <a href="https://kmerhosting.com/customers/contact.php" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Dedicated Server
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <a href="/about" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="https://kmerhosting.com/customers/contact.php" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Contact
                </a>
              </li>
              <li>
                <a href="https://kmerhosting.com/customers/knowledgebase.php" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Knowledgebase
                </a>
              </li>
              <li>
                <a href="https://kmerhosting.com/customers/submitticket.php" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Support
                </a>
              </li>
              <li>
                <a href="/extra-services" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                  Extra Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Contact</h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>info@kmerhosting.com</li>
              <li>6 94 19 34 93</li>
              <li>Yaounde, Cameroon</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">© 2025 KmerHosting. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition cursor-pointer" style={{ color: "inherit" }}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
