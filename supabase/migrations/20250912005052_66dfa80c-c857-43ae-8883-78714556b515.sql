-- Remove duplicate deals by keeping only one instance of each deal_id
DELETE FROM deals a USING deals b 
WHERE a.id > b.id 
AND a.deal_id = b.deal_id;