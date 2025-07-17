import React, { useState, useMemo } from 'react';
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Calendar, Clock, User, Search, TrendingUp, Target, Briefcase, Users, Newspaper, FileText } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  content: string;
  badgeColor: string;
  image: string;
  heroImage?: string;
}

const articles: Article[] = [
  {
    id: '1',
    category: 'Market Trends',
    title: 'AI Technology Surge: The New Investment Frontier',
    excerpt: 'Artificial intelligence companies showing unprecedented growth with 340% average increase in valuations.',
    author: 'Sarah Mitchell',
    publishedAt: 'Jan 15, 2024',
    readTime: '5 min read',
    badgeColor: 'bg-green-500/20 text-green-300',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    content: `
      <p>The artificial intelligence sector has experienced a remarkable transformation over the past quarter, with companies in this space witnessing unprecedented growth rates that are reshaping the entire technology landscape.</p>
      
      <h3>Key Market Drivers</h3>
      <p>Several factors are contributing to this explosive growth. First, the widespread adoption of generative AI across industries has created massive demand for AI-powered solutions. Companies are racing to integrate AI capabilities into their existing products and services, driving up valuations for pure-play AI companies.</p>
      
      <p>Second, venture capital and private equity firms have allocated record amounts of capital to AI investments. In Q4 2023 alone, AI startups raised over $15 billion globally, representing a 340% increase from the previous year.</p>
      
      <h3>Investment Implications</h3>
      <p>For investors, this trend presents both opportunities and risks. While the growth potential is substantial, valuations have reached levels that some analysts consider unsustainable. We recommend a balanced approach focusing on companies with proven revenue models and clear paths to profitability.</p>
      
      <p>The semiconductor companies supporting AI infrastructure have also seen significant gains, with chip manufacturers reporting 200% year-over-year growth in AI-related revenue.</p>
      
      <h3>Looking Forward</h3>
      <p>As we move into 2024, expect continued consolidation in the AI space as larger tech companies acquire promising startups. The companies that survive this initial boom will likely become the defining technology leaders of the next decade.</p>
    `
  },
  {
    id: '2',
    category: 'Market Trends',
    title: 'Traditional Retail Faces Digital Disruption Headwinds',
    excerpt: 'Brick-and-mortar retail continues facing headwinds as e-commerce adoption accelerates.',
    author: 'Michael Torres',
    publishedAt: 'Jan 14, 2024',
    readTime: '4 min read',
    badgeColor: 'bg-red-500/20 text-red-300',
    image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a',
    heroImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    content: `
      <p>The traditional retail sector continues to grapple with structural challenges as consumer behavior shifts permanently toward digital channels. This quarter's 12.8% decline in brick-and-mortar retail valuations reflects deeper underlying trends that investors cannot ignore.</p>
      
      <h3>The Digital Acceleration</h3>
      <p>E-commerce penetration has reached 23% of total retail sales, up from just 16% two years ago. This shift isn't just about convenience—it's about a fundamental change in how consumers discover, evaluate, and purchase products.</p>
      
      <p>Traditional retailers are struggling with high real estate costs, inventory management challenges, and the need for massive technology investments to compete with digital-native brands.</p>
      
      <h3>Winners and Losers</h3>
      <p>Not all traditional retailers are suffering equally. Those that have successfully integrated omnichannel strategies are seeing resilience in their stock performance. Companies like Target and Walmart have invested heavily in their digital infrastructure while leveraging their physical footprint for last-mile delivery advantages.</p>
      
      <p>However, specialty retailers and department stores continue to face existential challenges. Mall-based retailers are particularly vulnerable as foot traffic remains below pre-pandemic levels.</p>
      
      <h3>Investment Strategy</h3>
      <p>We recommend a cautious approach to traditional retail investments. Focus on companies with strong digital presence, efficient supply chains, and clear competitive moats. Consider shorting or avoiding retailers with high lease obligations and limited digital capabilities.</p>
    `
  },
  {
    id: '3',
    category: 'Market Trends',
    title: 'ESG Investment Growth Accelerates Globally',
    excerpt: 'Environmental, social, and governance focused investments gaining mainstream adoption across institutional portfolios.',
    author: 'Emma Johnson',
    publishedAt: 'Jan 13, 2024',
    readTime: '6 min read',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    heroImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
    content: `
      <p>Environmental, social, and governance (ESG) investing has moved from niche strategy to mainstream requirement, with institutional investors allocating record amounts to sustainable investment strategies.</p>
      
      <h3>Institutional Adoption</h3>
      <p>Major pension funds and sovereign wealth funds now mandate ESG criteria for all investment decisions. This shift has created a massive influx of capital into companies demonstrating strong environmental and social practices.</p>
      
      <p>The total assets under management in ESG-focused funds reached $2.3 trillion globally, representing an 18.5% increase from the previous quarter.</p>
      
      <h3>Performance Metrics</h3>
      <p>Contrary to earlier concerns about returns, ESG-focused portfolios have demonstrated competitive performance. Many ESG funds outperformed traditional benchmarks by 2-4% annually over the past three years.</p>
      
      <p>Companies with strong ESG ratings also show lower volatility and better risk-adjusted returns, making them attractive to institutional investors focused on long-term stability.</p>
      
      <h3>Future Outlook</h3>
      <p>Regulatory changes across major markets continue to favor ESG investments. The European Union's sustainable finance disclosure regulation and similar initiatives in other jurisdictions are driving additional capital toward ESG-compliant investments.</p>
      
      <p>We expect this trend to accelerate as younger generations inherit wealth and prioritize sustainable investing approaches.</p>
    `
  },
  {
    id: '4',
    category: 'Key Deals',
    title: 'TechCorp Acquires CloudVision in $2.4B Strategic Move',
    excerpt: 'Major acquisition in cloud infrastructure space signals consolidation trend in enterprise software.',
    author: 'Jennifer Chen',
    publishedAt: 'Jan 15, 2024',
    readTime: '6 min read',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    heroImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    content: `
      <p>TechCorp's $2.4 billion acquisition of CloudVision represents more than just a large transaction—it signals a fundamental shift in how enterprise software companies are positioning for the next phase of cloud computing evolution.</p>
      
      <h3>Strategic Rationale</h3>
      <p>CloudVision's proprietary edge computing platform complements TechCorp's existing cloud infrastructure perfectly. The acquisition gives TechCorp instant access to CloudVision's 500+ enterprise clients and their cutting-edge distributed computing technology.</p>
      
      <p>The deal is expected to generate $200 million in annual synergies within 18 months, primarily through cross-selling opportunities and operational efficiencies.</p>
      
      <h3>Market Impact</h3>
      <p>This acquisition has immediate implications for the broader cloud infrastructure market. Competitors like AWS, Microsoft Azure, and Google Cloud are now under pressure to enhance their edge computing capabilities to maintain market share.</p>
      
      <p>The premium paid—42% above CloudVision's trading price—reflects the strategic value of edge computing capabilities in an increasingly distributed computing landscape.</p>
      
      <h3>Industry Consolidation</h3>
      <p>We expect this deal to trigger additional M&A activity in the cloud infrastructure space. Smaller players with specialized technologies are likely acquisition targets as major cloud providers seek to build comprehensive platforms.</p>
      
      <p>For investors, this trend creates opportunities in companies with unique cloud technologies but also increases competitive pressures on traditional infrastructure providers.</p>
      
      <h3>Financial Analysis</h3>
      <p>The acquisition is expected to be accretive to TechCorp's earnings within 12 months, with the combined entity projecting 25% revenue growth for the next two years. The deal was financed through a combination of cash and stock, maintaining TechCorp's strong balance sheet position.</p>
    `
  },
  {
    id: '5',
    category: 'Key Deals',
    title: 'GreenTech Closes $850M Series C for Renewable Revolution',
    excerpt: 'Renewable energy startup closes massive funding round led by climate-focused venture capital.',
    author: 'David Kim',
    publishedAt: 'Jan 12, 2024',
    readTime: '5 min read',
    badgeColor: 'bg-green-500/20 text-green-300',
    image: 'https://images.unsplash.com/photo-1458668383970-8ddd3927deed',
    heroImage: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    content: `
      <p>GreenTech's record-breaking $850 million Series C funding round marks a watershed moment for renewable energy investment, signaling institutional confidence in next-generation clean technology solutions.</p>
      
      <h3>Funding Details</h3>
      <p>The round was led by Climate Capital Partners with participation from major pension funds, sovereign wealth funds, and strategic corporate investors. This brings GreenTech's total funding to $1.2 billion and values the company at $4.5 billion.</p>
      
      <p>The funding will accelerate GreenTech's innovative solar panel manufacturing technology, which promises 40% higher efficiency rates compared to traditional panels.</p>
      
      <h3>Technology Innovation</h3>
      <p>GreenTech's breakthrough lies in their perovskite-silicon tandem solar cells, which achieve 31% efficiency compared to the industry standard of 22%. This technology breakthrough has the potential to dramatically reduce the cost per watt of solar energy.</p>
      
      <p>The company has already secured manufacturing partnerships in three countries and expects to begin commercial production by Q3 2024.</p>
      
      <h3>Market Opportunity</h3>
      <p>The global solar panel market is projected to reach $223 billion by 2026, driven by government incentives and corporate sustainability commitments. GreenTech's superior efficiency technology positions them to capture significant market share in this growing sector.</p>
      
      <p>Early customer commitments already total $2.1 billion in future orders, providing strong revenue visibility for the next three years.</p>
      
      <h3>Investment Implications</h3>
      <p>This funding round demonstrates the maturation of climate technology as an asset class. Large institutional investors are now viewing renewable energy investments as both financially attractive and strategically necessary.</p>
      
      <p>We expect continued high valuations for companies with breakthrough clean technology, particularly those addressing solar efficiency, energy storage, and grid modernization challenges.</p>
    `
  },
  {
    id: '6',
    category: 'News',
    title: 'Federal Reserve Signals Potential Policy Shifts Ahead',
    excerpt: 'Federal Reserve hints at potential policy shifts affecting market liquidity and investment strategies.',
    author: 'Robert Johnson',
    publishedAt: 'Jan 16, 2024',
    readTime: '4 min read',
    badgeColor: 'bg-red-500/20 text-red-300',
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b',
    heroImage: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
    content: `
      <p>Federal Reserve Chairman Jerome Powell's latest statements have sent ripples through financial markets, suggesting potential changes to monetary policy that could significantly impact investment strategies across asset classes.</p>
      
      <h3>Key Policy Signals</h3>
      <p>In testimony before Congress, Powell indicated that the Fed is closely monitoring inflation trends and employment data, with particular attention to emerging price pressures in the technology and housing sectors.</p>
      
      <p>The Fed's dual mandate of price stability and full employment is being tested as AI-driven productivity gains create complex economic dynamics that traditional monetary policy tools may struggle to address.</p>
      
      <h3>Market Implications</h3>
      <p>Bond markets have already begun pricing in potential rate changes, with the 10-year Treasury yield moving 15 basis points following Powell's comments. Equity markets showed mixed reactions, with growth stocks declining while value and dividend-paying stocks gained ground.</p>
      
      <p>Currency markets also reacted strongly, with the dollar strengthening against major trading partners as investors repositioned for potential policy changes.</p>
      
      <h3>Sectoral Impact</h3>
      <p>Technology companies, particularly those with high debt loads, face headwinds if rates increase. Conversely, financial services companies could benefit from improved net interest margins.</p>
      
      <p>Real estate investment trusts (REITs) and utilities—traditional interest rate-sensitive sectors—are already showing volatility as investors reassess valuations in light of potential policy changes.</p>
      
      <h3>Investment Strategy</h3>
      <p>Given this uncertainty, we recommend maintaining a balanced portfolio with reduced duration risk and increased allocation to sectors that typically perform well during monetary policy transitions. Focus on companies with strong balance sheets and pricing power.</p>
    `
  },
  {
    id: '7',
    category: 'News',
    title: 'Q4 Earnings Preview: Key Metrics to Watch',
    excerpt: 'Key metrics to watch as major corporations report quarterly results in the coming weeks.',
    author: 'Lisa Anderson',
    publishedAt: 'Jan 16, 2024',
    readTime: '5 min read',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    content: `
      <p>As Q4 2023 earnings season approaches, investors are focusing on specific metrics that will provide insights into corporate health and forward-looking guidance for 2024.</p>
      
      <h3>Critical Metrics to Monitor</h3>
      <p>Revenue growth acceleration or deceleration will be particularly important given the mixed economic signals throughout Q4. Companies that maintained pricing power despite inflationary pressures will likely see premium valuations.</p>
      
      <p>Margin expansion or compression will reveal which companies successfully navigated supply chain challenges and labor cost increases. Technology companies face particular scrutiny regarding their AI investment ROI.</p>
      
      <h3>Sector-Specific Focus Areas</h3>
      <p>For technology companies, investors will scrutinize cloud growth rates, AI integration progress, and subscription renewal rates. Hardware companies face questions about inventory levels and component cost management.</p>
      
      <p>Financial services companies will be evaluated on loan growth, credit quality, and net interest margin trends. Regional banks face particular attention regarding commercial real estate exposure.</p>
      
      <h3>Forward Guidance</h3>
      <p>Given economic uncertainty, management guidance for 2024 will carry extra weight. Companies providing specific, achievable targets while acknowledging risks will likely outperform those offering vague or overly optimistic projections.</p>
      
      <p>Capital allocation strategies—particularly regarding AI investments, acquisitions, and shareholder returns—will significantly influence investor sentiment.</p>
      
      <h3>Expected Surprises</h3>
      <p>We anticipate positive surprises from companies that have conservative guidance but benefited from Q4 cost reduction initiatives. Conversely, companies with high expectations may disappoint if they cannot demonstrate clear AI monetization strategies.</p>
      
      <p>International exposure will be another key differentiator, with companies having strong Asian operations potentially showing better-than-expected results.</p>
    `
  },
  {
    id: '8',
    category: 'News',
    title: 'Cryptocurrency Regulation Framework Finalized',
    excerpt: 'New regulatory framework provides clarity for institutional cryptocurrency adoption and investment strategies.',
    author: 'Alex Rivera',
    publishedAt: 'Jan 15, 2024',
    readTime: '4 min read',
    badgeColor: 'bg-purple-500/20 text-purple-300',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    content: `
      <p>After months of consultation and deliberation, regulators have finalized a comprehensive framework for cryptocurrency investments, providing the clarity institutional investors have been seeking.</p>
      
      <h3>Key Regulatory Components</h3>
      <p>The new framework establishes clear guidelines for custody requirements, risk management protocols, and disclosure standards for institutions investing in digital assets.</p>
      
      <p>Most significantly, the regulation provides a pathway for pension funds and insurance companies to allocate up to 5% of their portfolios to approved cryptocurrency investments.</p>
      
      <h3>Market Response</h3>
      <p>Bitcoin and Ethereum prices surged 12% and 15% respectively following the announcement, with institutional trading volumes reaching record highs. Several major investment banks have already announced plans to launch cryptocurrency trading desks.</p>
      
      <p>The regulatory clarity has also sparked interest in cryptocurrency infrastructure companies, with several firms experiencing significant valuation increases.</p>
      
      <h3>Investment Implications</h3>
      <p>This regulatory framework removes a major barrier to institutional cryptocurrency adoption. We expect significant capital flows into the space over the next 12-18 months as institutions develop their digital asset strategies.</p>
      
      <p>Focus areas include custody solutions, trading infrastructure, and compliance technology—all sectors likely to benefit from increased institutional participation in cryptocurrency markets.</p>
    `
  },
  {
    id: '9',
    category: 'Profiles',
    title: 'Sarah Chen: Pioneering Quantum Computing in Finance',
    excerpt: 'Leading the charge in quantum computing applications for financial modeling and risk assessment.',
    author: 'Thomas Wilson',
    publishedAt: 'Jan 13, 2024',
    readTime: '6 min read',
    badgeColor: 'bg-purple-500/20 text-purple-300',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    heroImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    content: `
      <p>Sarah Chen, CEO of InnovateTech, is at the forefront of applying quantum computing to financial services, developing solutions that could revolutionize risk management and portfolio optimization.</p>
      
      <h3>Background and Vision</h3>
      <p>With a PhD in Quantum Physics from MIT and previous experience at Goldman Sachs' quantitative trading division, Chen uniquely understands both the technical possibilities and practical limitations of quantum computing in finance.</p>
      
      <p>Under her leadership, InnovateTech has developed quantum algorithms that can process complex portfolio optimization problems 1000x faster than classical computers.</p>
      
      <h3>Breakthrough Applications</h3>
      <p>InnovateTech's quantum risk modeling platform is currently being piloted by three major investment banks. The technology can simulate thousands of market scenarios simultaneously, providing unprecedented insights into portfolio risk under extreme market conditions.</p>
      
      <p>The company's quantum machine learning algorithms have achieved 94% accuracy in predicting market volatility—a significant improvement over traditional models.</p>
      
      <h3>Industry Impact</h3>
      <p>Chen's work is reshaping how financial institutions approach computational challenges. Her quantum algorithms for derivatives pricing have reduced calculation times from hours to minutes while improving accuracy.</p>
      
      <p>Major hedge funds are now investing heavily in quantum computing capabilities, largely inspired by InnovateTech's demonstrated results.</p>
      
      <h3>Future Vision</h3>
      <p>Chen believes quantum computing will become standard in financial services within five years. She's currently working on quantum cryptography solutions to secure financial transactions in a post-quantum world.</p>
      
      <p>Her latest project involves developing quantum algorithms for high-frequency trading that could process market data and execute trades at previously impossible speeds.</p>
      
      <h3>Investment Implications</h3>
      <p>InnovateTech's success under Chen's leadership highlights the investment potential in quantum computing applications. The company is reportedly considering an IPO in 2025, which could provide public market investors access to this transformative technology.</p>
    `
  },
  {
    id: '10',
    category: 'Profiles',
    title: 'Nexus Dynamics: Disrupting Private Equity with AI',
    excerpt: '$12B fund focusing on disruptive technology investments across emerging markets using AI-driven analysis.',
    author: 'Maria Santos',
    publishedAt: 'Jan 11, 2024',
    readTime: '5 min read',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    heroImage: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    content: `
      <p>Nexus Dynamics has emerged as a leading force in private equity, leveraging artificial intelligence and machine learning to identify and evaluate investment opportunities across emerging markets.</p>
      
      <h3>AI-Driven Investment Approach</h3>
      <p>The firm's proprietary AI platform analyzes thousands of data points across potential investments, from financial metrics to social media sentiment and satellite imagery of industrial facilities.</p>
      
      <p>This technology-first approach has enabled Nexus to identify high-growth opportunities 18 months earlier than traditional due diligence methods, resulting in superior returns for their limited partners.</p>
      
      <h3>Emerging Market Focus</h3>
      <p>Nexus Dynamics specializes in emerging markets across Southeast Asia, Latin America, and Africa. Their AI models are particularly effective in these regions where traditional financial data may be limited or unreliable.</p>
      
      <p>The firm has completed 47 investments across 12 countries, with an average IRR of 34% and multiple successful exits including three unicorn companies.</p>
      
      <h3>Technology Infrastructure</h3>
      <p>The firm employs a team of 25 data scientists and engineers who continuously refine their investment algorithms. Their platform processes over 10 million data points daily from various sources including financial databases, news feeds, and alternative data providers.</p>
      
      <p>Machine learning models are retrained quarterly using new market data and exit outcomes, continuously improving prediction accuracy.</p>
      
      <h3>Portfolio Companies</h3>
      <p>Nexus's portfolio includes breakthrough companies in fintech, healthtech, and clean energy. Recent investments include a Southeast Asian super-app that has grown to 50 million users and a Brazilian renewable energy company that has reduced solar installation costs by 40%.</p>
      
      <h3>Future Strategy</h3>
      <p>The firm is currently raising their third fund, targeting $18 billion to expand their AI-driven approach globally. They plan to hire additional technology talent and open offices in three new emerging markets by 2025.</p>
    `
  },
  {
    id: '11',
    category: 'Investment Strategy',
    title: 'Sectoral Rotation Strategy: Navigating Economic Cycles',
    excerpt: 'Tactical approach to capitalizing on economic cycle transitions through strategic sector allocation.',
    author: 'Mark Stevens',
    publishedAt: 'Jan 11, 2024',
    readTime: '7 min read',
    badgeColor: 'bg-green-500/20 text-green-300',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    heroImage: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
    content: `
      <p>Sectoral rotation strategies have gained renewed relevance as economic cycles become more pronounced and sector performance diverges significantly based on macroeconomic conditions.</p>
      
      <h3>Strategy Foundation</h3>
      <p>The core principle involves systematically shifting portfolio allocation among different economic sectors based on where we are in the economic cycle. Each sector performs differently during expansion, peak, contraction, and recovery phases.</p>
      
      <p>Our current economic indicators suggest we're transitioning from late-cycle expansion to early contraction, making this an opportune time to implement sectoral rotation.</p>
      
      <h3>Current Positioning</h3>
      <p>Given current economic conditions, we're overweighting defensive sectors like utilities, consumer staples, and healthcare while reducing exposure to cyclical sectors like industrials and materials.</p>
      
      <p>Technology requires nuanced approach—while cyclical overall, AI and cloud infrastructure companies may outperform due to secular growth trends.</p>
      
      <h3>Key Indicators</h3>
      <p>We monitor several leading indicators for rotation timing: yield curve shape, credit spreads, employment trends, and consumer confidence. Our proprietary model combines these factors to generate sector allocation signals.</p>
      
      <p>Recent data suggests defensive positioning is appropriate, with particular emphasis on sectors benefiting from infrastructure spending and energy transition.</p>
      
      <h3>Risk Management</h3>
      <p>Sectoral rotation requires careful risk management to avoid whipsaws during uncertain periods. We use momentum indicators and maintain minimum allocation thresholds to prevent excessive concentration.</p>
      
      <p>Diversification within sectors is crucial—even defensive sectors contain companies with varying risk profiles and growth trajectories.</p>
      
      <h3>Expected Returns</h3>
      <p>Historical analysis suggests well-executed sectoral rotation can add 3-5% annual alpha compared to static allocation strategies. Current positioning targets 12-18% annual returns with moderate risk levels.</p>
      
      <p>Success depends on accurate cycle timing and disciplined rebalancing—emotional decision-making is the strategy's biggest risk factor.</p>
    `
  },
  {
    id: '12',
    category: 'Investment Strategy', 
    title: 'ESG-Focused Value Play: Finding Hidden Gems',
    excerpt: 'Identifying undervalued companies with strong ESG credentials positioned for long-term outperformance.',
    author: 'Rachel Martinez',
    publishedAt: 'Jan 10, 2024',
    readTime: '6 min read',
    badgeColor: 'bg-blue-500/20 text-blue-300',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    heroImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    content: `
      <p>The intersection of value investing and ESG principles is creating unique opportunities for patient investors willing to look beyond short-term market inefficiencies.</p>
      
      <h3>Strategy Overview</h3>
      <p>Our ESG-focused value strategy targets companies trading below intrinsic value while demonstrating strong environmental, social, and governance practices. These companies often outperform over longer time horizons as ESG factors become increasingly important to stakeholders.</p>
      
      <p>The strategy leverages market myopia around ESG investments, where short-term focused investors may undervalue companies making necessary sustainability investments.</p>
      
      <h3>Screening Process</h3>
      <p>We begin with traditional value screens—low P/E ratios, strong balance sheets, and consistent cash flow generation. We then overlay ESG criteria including carbon footprint reduction plans, diversity metrics, and governance structures.</p>
      
      <p>Our proprietary ESG scoring model incorporates both current practices and improvement trajectories, identifying companies making genuine progress rather than just those with perfect current scores.</p>
      
      <h3>Current Holdings Examples</h3>
      <p>Recent additions include a European utility company trading at 8x earnings while investing heavily in renewable energy infrastructure, and a consumer goods company with strong emerging market exposure that has improved its supply chain sustainability metrics by 40%.</p>
      
      <p>These companies typically face short-term headwinds from ESG investments but are positioning for long-term competitive advantages.</p>
      
      <h3>Performance Expectations</h3>
      <p>Historical backtesting suggests this strategy can deliver 8-14% annual returns with lower volatility than pure value approaches. The ESG overlay provides downside protection during market stress periods.</p>
      
      <p>We expect outperformance to accelerate as regulatory changes and consumer preferences increasingly favor ESG-compliant companies.</p>
    `
  }
];

type FilterCategory = 'All Articles' | 'Market Trends' | 'Key Deals' | 'Investment Strategy' | 'Profiles' | 'News';

const filterOptions: { label: FilterCategory; icon: any; count?: number }[] = [
  { label: 'All Articles', icon: FileText },
  { label: 'Market Trends', icon: TrendingUp },
  { label: 'Key Deals', icon: Target },
  { label: 'Investment Strategy', icon: Briefcase },
  { label: 'Profiles', icon: Users },
  { label: 'News', icon: Newspaper },
];

export default function Analysis() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    
    // Filter by category
    if (activeFilter !== 'All Articles') {
      filtered = filtered.filter(article => article.category === activeFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [activeFilter, searchQuery]);

  const getCategoryCount = (category: FilterCategory) => {
    if (category === 'All Articles') return articles.length;
    return articles.filter(article => article.category === category).length;
  };

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Market Analysis
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Comprehensive insights, trends, and strategic intelligence for informed investment decisions
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-900/50 border-gray-700 text-white placeholder:text-white/60 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter.label;
              const count = getCategoryCount(filter.label);
              const Icon = filter.icon;
              
              return (
                <Button
                  key={filter.label}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-green-500 text-black hover:bg-green-400' 
                      : 'text-white/70 hover:text-white hover:bg-gray-800/50 border border-gray-700'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{filter.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-gray-700 text-white/60'}`}>
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-green-500/30 transition-all duration-300 cursor-pointer hover:-translate-y-1 group overflow-hidden"
                  onClick={() => openArticle(article)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge variant="secondary" className={`absolute top-4 left-4 ${article.badgeColor}`}>
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-white/60 text-lg mb-4">No articles found</div>
              <p className="text-white/40">
                {searchQuery 
                  ? `No articles match "${searchQuery}" in the ${activeFilter} category.`
                  : `No articles available in the ${activeFilter} category.`
                }
              </p>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All Articles');
                }}
                className="mt-4 text-green-400 hover:text-green-300"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={closeArticle}>
        <DialogContent className="max-w-5xl max-h-[90vh] bg-black border-gray-800 text-white overflow-y-auto">
          {selectedArticle && (
            <>
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 -m-6 mb-6 overflow-hidden">
                <img 
                  src={selectedArticle.heroImage || selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="secondary" className={`mb-4 ${selectedArticle.badgeColor}`}>
                    {selectedArticle.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {selectedArticle.title}
                  </h1>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeArticle}
                  className="absolute top-4 right-4 text-white hover:text-green-300 bg-black/20 hover:bg-black/40"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              
              <div className="px-6 pb-6">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedArticle.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
                <div 
                  className="prose prose-invert prose-lg max-w-none text-white/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}