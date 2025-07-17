import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function Analysis() {
  return (
    <div className="min-h-screen font-primary bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-black">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
            <path d="M0,500 C400,300 800,700 1200,400 L1200,800 L0,800 Z" fill="url(#analysisWave)" />
            <defs>
              <linearGradient id="analysisWave" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(142 76% 36%)" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(180 84% 40%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(210 98% 55%)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-green-500/20 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute top-40 right-40 w-16 h-16 bg-teal-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-20 w-20 h-20 bg-cyan-500/20 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Deep Market
              <span className="block text-green-400">
                Analysis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
              Comprehensive insights into private equity market trends, sector performance, 
              and strategic opportunities that shape investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Dashboard */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-lift border border-gray-800">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Market Performance</h3>
                <div className="flex space-x-2">
                  <div className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">Q4 2024</div>
                  <div className="px-4 py-2 bg-gray-800 rounded-full text-white/70 text-sm">YTD</div>
                </div>
              </div>
              
              {/* Mock Chart Area */}
              <div className="h-80 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-2xl flex items-end justify-around p-6 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
                
                {/* Chart Bars */}
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-32 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-48 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-24 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-40 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-56 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-36 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-green-500 to-teal-500 h-44 rounded-t-xl"></div>
              </div>
            </div>

            {/* Metrics Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 shadow-lift border border-gray-800">
                <h4 className="font-semibold text-white mb-4">Key Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Total AUM</span>
                    <span className="font-bold text-white">$2.5T</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Avg Deal Size</span>
                    <span className="font-bold text-green-400">$847M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Growth Rate</span>
                    <span className="font-bold text-teal-400">+23.4%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 shadow-lift border border-gray-800">
                <h4 className="font-semibold text-white mb-4">Top Sectors</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-white/70">Technology</span>
                    </div>
                    <span className="font-semibold text-white">34%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                      <span className="text-white/70">Healthcare</span>
                    </div>
                    <span className="font-semibold text-white">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                      <span className="text-white/70">Financial Services</span>
                    </div>
                    <span className="font-semibold text-white">22%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}