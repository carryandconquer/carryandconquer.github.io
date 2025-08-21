-- Add new columns to header_carousel_metrics table for flexible content types
ALTER TABLE public.header_carousel_metrics 
ADD COLUMN item_type TEXT NOT NULL DEFAULT 'metric',
ADD COLUMN title TEXT,
ADD COLUMN description TEXT,
ADD COLUMN icon_name TEXT DEFAULT 'TrendingUp',
ADD COLUMN link_url TEXT,
ADD COLUMN color_scheme TEXT DEFAULT 'default',
ADD COLUMN expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN priority INTEGER DEFAULT 1;

-- Create enum constraint for item_type
ALTER TABLE public.header_carousel_metrics 
ADD CONSTRAINT check_item_type 
CHECK (item_type IN ('metric', 'news', 'deal', 'fundraising', 'exit', 'breaking', 'intelligence'));

-- Create enum constraint for color_scheme
ALTER TABLE public.header_carousel_metrics 
ADD CONSTRAINT check_color_scheme 
CHECK (color_scheme IN ('default', 'success', 'warning', 'danger', 'info', 'purple'));

-- Insert placeholder data to demonstrate different content types
INSERT INTO public.header_carousel_metrics (label, value, is_positive, change_percentage, order_index, published, item_type, title, description, icon_name, color_scheme, priority) VALUES
-- Existing metric style
('PE DRY POWDER', '$3.7T', true, 8.3, 1, true, 'metric', null, null, 'TrendingUp', 'success', 2),
('AVG DEAL SIZE', '$124M', false, -2.1, 2, true, 'metric', null, null, 'DollarSign', 'default', 2),
('CAP RATES', '6.2%', true, 15, 3, true, 'metric', 'Industrial cap rates compress', null, 'BarChart3', 'success', 1),

-- Breaking news
('BREAKING', 'Fed cuts rates 0.25%', true, 0, 4, true, 'breaking', 'Federal Reserve cuts rates by 0.25%', 'Monetary policy shift impacts market outlook', 'Zap', 'info', 3),
('URGENT', '$50B allocation', true, 0, 5, true, 'breaking', 'Major pension fund allocates $50B to alternatives', 'CalPERS increases private market exposure', 'Target', 'warning', 3),

-- Deal alerts
('DEAL ALERT', '$2.8B acquisition', true, 0, 6, true, 'deal', 'Blackstone acquires 1M sqft portfolio for $2.8B', 'Prime industrial assets across 8 markets', 'Building2', 'purple', 2),
('TRANSACTION', '$500M fund close', true, 0, 7, true, 'deal', 'KKR closes $500M industrial development fund', 'Focus on last-mile logistics facilities', 'Handshake', 'success', 2),

-- Fundraising
('FUNDING', '$150M Series C', true, 0, 8, true, 'fundraising', 'PropTech startup raises $150M Series C', 'VTS secures growth capital from Blackstone', 'Rocket', 'info', 2),
('FUNDRAISING', '$25B target', true, 0, 9, true, 'fundraising', 'Apollo targets $25B for latest opportunity fund', 'Largest fundraise in firm history', 'TrendingUp', 'purple', 1),

-- Exit news  
('EXIT', '$4.2B sale (3.1x)', true, 0, 10, true, 'exit', 'Vista Equity sells SaaS company for $4.2B', 'Solera achieves 3.1x return after 4-year hold', 'Trophy', 'success', 2),
('IPO FILING', '$2B public offering', true, 0, 11, true, 'exit', 'Real estate platform files for $2B IPO', 'CoStar Group subsidiary going public', 'TrendingUp', 'info', 1),

-- Market intelligence
('TREND', 'NYC vacancy 18.5%', false, -5.2, 12, true, 'intelligence', 'NYC office vacancy hits 18.5%', '5-year high amid remote work trends', 'Building', 'warning', 1),
('INSIGHT', 'Data center surge', true, 23.4, 13, true, 'intelligence', 'Data center demand surges 23.4% YoY', 'AI infrastructure driving growth', 'Server', 'success', 2);