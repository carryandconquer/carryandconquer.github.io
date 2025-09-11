-- Remove the news items from header carousel metrics
DELETE FROM header_carousel_metrics 
WHERE item_type = 'news' AND title IN (
  'Boston Scientific Wire Safety Issues',
  'Medtronic Wins Patent Appeal', 
  'J&J Resumes Varipulse Rollout',
  'Peerbridge Launches Wearable ECG',
  'New AFib Detection Technology'
);

-- Add news items to market metrics instead
INSERT INTO snapshot_market_metrics (
  metric_name, metric_category, metric_family, current_value, 
  change_percentage, change_direction, region_id, country_id, sector_id, sub_sector_id
)
SELECT 
  news_data.metric_name,
  'news' as metric_category,
  'breaking_news' as metric_family,
  news_data.current_value,
  null as change_percentage,
  null as change_direction,
  r.id as region_id,
  c.id as country_id,
  s.id as sector_id,
  ss.id as sub_sector_id
FROM (VALUES
  ('Boston Scientific Wire Safety', 'Endotak Reliance device under review - AP News'),
  ('Medtronic Patent Victory', 'Heart valve litigation appeal won - Reuters'),
  ('J&J Device Rollout', 'Varipulse expansion resumes in US - Reuters'),
  ('Peerbridge ECG Launch', 'New wearable Cor® device announced - PR Newswire'),
  ('AFib Detection Breakthrough', '95% accuracy wearable technology - arXiv')
) AS news_data(metric_name, current_value)
CROSS JOIN snapshot_sectors s 
CROSS JOIN snapshot_geographic_regions r
CROSS JOIN snapshot_countries c
CROSS JOIN snapshot_sub_sectors ss
WHERE s.slug = 'healthcare' 
  AND r.slug = 'north-america' 
  AND c.slug = 'united-states'
  AND ss.slug = 'medical-devices';