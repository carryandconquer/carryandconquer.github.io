-- Fix Health Care deals that have null sector_id and sub_sector_id
UPDATE deals 
SET 
  sector_id = '7a343772-7eb7-4922-ba47-202eb8298ce0',
  sub_sector_id = '30547fd7-539c-47d7-b704-e4cb8f26035e',
  sub_sector = 'Health Care Equipment & Services'
WHERE sector = 'Health Care' AND sub_sector = 'Healthcare Equipment & Services';