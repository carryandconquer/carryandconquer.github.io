import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Carry & Conquer
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              The premier private equity intelligence platform providing deep insights 
              on transactions, market trends, and firm strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Enterprise</a></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © 2024 Carry & Conquer. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
            <a href="/admin" className="text-white/70 hover:text-white transition-colors text-sm">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}