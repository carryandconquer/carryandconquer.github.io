-- Clean up duplicate data - keep only the new diverse content
DELETE FROM header_carousel_metrics 
WHERE item_type = 'metric' AND (
  label IN ('PE DRY POWDER', 'AVERAGE DEAL SIZE', 'FUND DEPLOYMENT', 'EXIT MULTIPLE', 'ACTIVE FUNDS', 'PORTFOLIO COMPANIES', 'MEDIAN IRR', 'FUNDRAISING YTD')
  OR created_at < (SELECT MIN(created_at) FROM header_carousel_metrics WHERE item_type != 'metric')
);

-- Update order_index to be sequential for remaining items
UPDATE header_carousel_metrics SET order_index = 1 WHERE label = 'PE DRY POWDER';
UPDATE header_carousel_metrics SET order_index = 2 WHERE label = 'AVG DEAL SIZE';  
UPDATE header_carousel_metrics SET order_index = 3 WHERE label = 'CAP RATES';
UPDATE header_carousel_metrics SET order_index = 4 WHERE label = 'BREAKING';
UPDATE header_carousel_metrics SET order_index = 5 WHERE label = 'URGENT';
UPDATE header_carousel_metrics SET order_index = 6 WHERE label = 'DEAL ALERT';
UPDATE header_carousel_metrics SET order_index = 7 WHERE label = 'TRANSACTION';
UPDATE header_carousel_metrics SET order_index = 8 WHERE label = 'FUNDING';
UPDATE header_carousel_metrics SET order_index = 9 WHERE label = 'FUNDRAISING';
UPDATE header_carousel_metrics SET order_index = 10 WHERE label = 'EXIT';
UPDATE header_carousel_metrics SET order_index = 11 WHERE label = 'IPO FILING';
UPDATE header_carousel_metrics SET order_index = 12 WHERE label = 'TREND';
UPDATE header_carousel_metrics SET order_index = 13 WHERE label = 'INSIGHT';