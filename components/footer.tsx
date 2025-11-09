"use client"

export default function Footer() {
  return (
    <footer className="py-16 px-4" style={{ backgroundColor: "rgba(18, 140, 126, 0.1)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: "#128C7E" }}>
              KmerHosting
            </h3>
            <p className="text-slate-600">Reliable web hosting solutions for Cameroon businesses and individuals.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Hosting</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  Shared Hosting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  Reseller Hosting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  cPanel Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  DirectAdmin Plans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Company</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <a href="/about" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  Support
                </a>
              </li>
              <li>
                <a href="/extra-services" className="hover:text-primary transition" style={{ color: "inherit" }}>
                  Extra Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-slate-900">Contact</h4>
            <ul className="space-y-2 text-slate-600">
              <li>Email: info@kmerhosting.cm</li>
              <li>Phone: +237 XXX XXX XXX</li>
              <li>Location: Cameroon</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">© 2025 KmerHosting. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-slate-600">
              <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition" style={{ color: "inherit" }}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
