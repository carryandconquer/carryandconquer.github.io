-- Enable realtime for the header carousel metrics table
alter table public.header_carousel_metrics replica identity full;
alter publication supabase_realtime add table public.header_carousel_metrics;

-- Insert the current hardcoded metrics data
insert into public.header_carousel_metrics (label, value, change_percentage, is_positive, order_index, metric_key) values
('PE DRY POWDER', '$3.7T', 8.3, true, 1, 'pe_dry_powder'),
('AVERAGE DEAL SIZE', '$124M', -2.1, false, 2, 'avg_deal_size'),
('FUND DEPLOYMENT', '67%', 12.4, true, 3, 'fund_deployment'),
('EXIT MULTIPLE', '2.8x', 5.7, true, 4, 'exit_multiple'),
('ACTIVE FUNDS', '8,947', 15.2, true, 5, 'active_funds'),
('PORTFOLIO COMPANIES', '11,200+', 9.8, true, 6, 'portfolio_companies'),
('MEDIAN IRR', '14.2%', -1.3, false, 7, 'median_irr'),
('FUNDRAISING YTD', '$901B', 22.1, true, 8, 'fundraising_ytd');