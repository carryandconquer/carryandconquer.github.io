import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

export default function Analysis() {
  return (
    <div className="min-h-screen font-primary bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Floating Geometric Elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-accent-green/20 rounded-2xl rotate-12 animate-float"></div>
        <div className="absolute top-40 right-40 w-16 h-16 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-20 w-20 h-20 bg-accent-gold/20 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Deep Market
              <span className="block bg-gradient-text bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Comprehensive insights into private equity market trends, sector performance, 
              and strategic opportunities that shape investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Dashboard */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-background rounded-3xl p-8 shadow-card border border-border/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-foreground">Market Performance</h3>
                <div className="flex space-x-2">
                  <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Q4 2024</div>
                  <div className="px-4 py-2 bg-muted rounded-full text-muted-foreground text-sm">YTD</div>
                </div>
              </div>
              
              {/* Mock Chart Area */}
              <div className="h-80 bg-gradient-to-br from-primary/5 to-accent-green/5 rounded-2xl flex items-end justify-around p-6 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
                
                {/* Chart Bars */}
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-32 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-48 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-24 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-40 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-56 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-36 rounded-t-xl"></div>
                <div className="w-12 bg-gradient-to-t from-primary to-accent-green h-44 rounded-t-xl"></div>
              </div>
            </div>

            {/* Metrics Sidebar */}
            <div className="space-y-6">
              <div className="bg-background rounded-3xl p-6 shadow-card border border-border/50">
                <h4 className="font-semibold text-foreground mb-4">Key Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total AUM</span>
                    <span className="font-bold text-foreground">$2.5T</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg Deal Size</span>
                    <span className="font-bold text-accent-green">$847M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Growth Rate</span>
                    <span className="font-bold text-primary">+23.4%</span>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-3xl p-6 shadow-card border border-border/50">
                <h4 className="font-semibold text-foreground mb-4">Top Sectors</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Technology</span>
                    </div>
                    <span className="font-semibold">34%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-accent-green rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Healthcare</span>
                    </div>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-accent-gold rounded-full mr-3"></div>
                      <span className="text-muted-foreground">Financial Services</span>
                    </div>
                    <span className="font-semibold">22%</span>
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