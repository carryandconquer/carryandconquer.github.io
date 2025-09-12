-- Insert missing automotive deals
INSERT INTO deals (
  deal_id, deal_name, deal_value_formatted, announcement_date, city, state_province, country, region, description, published, deal_status, transaction_type
) 
SELECT * FROM (VALUES 
  ('realtruck','RealTruck','Undisclosed', '2020-12-08'::date, 'Ann Arbor','Michigan','United States','North America', 'Premier manufacturer and digital destination of accessories for truck Jeep Bronco and off-road vehicles', true, 'Completed', 'Investment'),
  ('race-winning-brands','Race Winning Brands','Undisclosed', '2021-11-23'::date, 'Mentor','Ohio','United States','North America', 'Leading manufacturer of high-performance and racing parts for automotive and powersports aftermarkets', true, 'Completed', 'Investment'),
  ('repairify','Repairify','Undisclosed', '2015-07-28'::date, 'Plano','Texas','United States','North America', 'Provider of automotive diagnostic repair solutions and remote diagnostic technology', true, 'Completed', 'Investment'),
  ('ace-fence-dallas','Ace Fence of Dallas','Undisclosed', '2020-11-01'::date, 'Dallas','Texas','United States','North America', 'Automotive-related infrastructure and fencing company serving commercial and industrial clients', true, 'Completed', 'Investment'),
  ('brians-cabinets','Brian''s Cabinets','Undisclosed', '2024-01-01'::date, NULL,NULL,'United States','North America', 'Custom manufacturing company with automotive applications and specialized fabrication capabilities', true, 'Completed', 'Investment'),
  ('chance-rides','Chance Rides','Undisclosed', '2021-06-01'::date, NULL,NULL,'United States','North America', 'Manufacturing company with transportation sector ties and entertainment equipment production', true, 'Completed', 'Investment'),
  ('rylee-cru','Rylee + Cru','Undisclosed', '2024-02-01'::date, NULL,NULL,'United States','North America', 'Consumer products company with potential automotive consumer goods overlap and lifestyle brand focus', true, 'Completed', 'Acquisition')
) AS t(deal_id, deal_name, deal_value_formatted, announcement_date, city, state_province, country, region, description, published, deal_status, transaction_type)
WHERE NOT EXISTS (
  SELECT 1 FROM deals WHERE deals.deal_id = t.deal_id
);