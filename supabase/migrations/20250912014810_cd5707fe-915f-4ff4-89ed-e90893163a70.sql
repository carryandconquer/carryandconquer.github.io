-- Create missing companies and link them to Consumer Discretionary > Automobiles & Components

-- Helper: get ids
DO $$
DECLARE
  v_industry uuid;
  v_sub uuid;
  v_company uuid;
BEGIN
  SELECT id INTO v_industry FROM deals_industries WHERE slug = 'consumer-discretionary';
  IF v_industry IS NULL THEN
    INSERT INTO deals_industries(name, slug) VALUES ('Consumer Discretionary','consumer-discretionary');
    SELECT id INTO v_industry FROM deals_industries WHERE slug = 'consumer-discretionary';
  END IF;

  SELECT id INTO v_sub FROM deals_sub_industries WHERE slug = 'automobiles-components';
  IF v_sub IS NULL THEN
    INSERT INTO deals_sub_industries(name, slug, industry_id)
    VALUES ('Automobiles & Components','automobiles-components', v_industry);
    SELECT id INTO v_sub FROM deals_sub_industries WHERE slug = 'automobiles-components';
  END IF;

  -- Upsert a company + link + attach to deal helper function
  PERFORM 1;

  -- RealTruck Inc
  INSERT INTO deals_companies(name, description, website, headquarters_city, state_province, country, region)
  SELECT 'RealTruck Inc', 'Premier manufacturer and digital destination of accessories for truck Jeep Bronco and off-road vehicles', 'https://realtruck.com/', 'Ann Arbor', 'Michigan', 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'RealTruck Inc');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'RealTruck Inc' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'realtruck' AND company_id IS NULL;

  -- Race Winning Brands
  INSERT INTO deals_companies(name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Race Winning Brands', 'Leading manufacturer of high-performance and racing parts for automotive and powersports aftermarkets', 'https://www.racewinningbrands.com/', 'Mentor', 'Ohio', 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'Race Winning Brands');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'Race Winning Brands' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'race-winning-brands' AND company_id IS NULL;

  -- Repairify Inc
  INSERT INTO deals_companies(name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Repairify Inc', 'Provider of automotive diagnostic repair solutions and remote diagnostic technology', 'https://repairify.com/', 'Plano', 'Texas', 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'Repairify Inc');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'Repairify Inc' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'repairify' AND company_id IS NULL;

  -- Ace Fence of Dallas
  INSERT INTO deals_companies(name, description, website, headquarters_city, state_province, country, region)
  SELECT 'Ace Fence of Dallas', 'Automotive-related infrastructure and fencing company serving commercial and industrial clients', NULL, 'Dallas', 'Texas', 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'Ace Fence of Dallas');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'Ace Fence of Dallas' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'ace-fence-dallas' AND company_id IS NULL;

  -- Brian's Cabinets
  INSERT INTO deals_companies(name, description, website, country, region)
  SELECT 'Brian''s Cabinets', 'Custom manufacturing company with automotive applications and specialized fabrication capabilities', NULL, 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'Brian''s Cabinets');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'Brian''s Cabinets' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'brians-cabinets' AND company_id IS NULL;

  -- Chance Rides
  INSERT INTO deals_companies(name, description, website, country, region)
  SELECT 'Chance Rides', 'Manufacturing company with transportation sector ties and entertainment equipment production', NULL, 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'Chance Rides');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'Chance Rides' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'chance-rides' AND company_id IS NULL;

  -- Rylee + Cru
  INSERT INTO deals_companies(name, description, website, country, region)
  SELECT 'Rylee + Cru', 'Consumer products company with potential automotive consumer goods overlap and lifestyle brand focus', NULL, 'United States', 'North America'
  WHERE NOT EXISTS (SELECT 1 FROM deals_companies WHERE name = 'Rylee + Cru');
  SELECT id INTO v_company FROM deals_companies WHERE name = 'Rylee + Cru' ORDER BY created_at ASC LIMIT 1;
  INSERT INTO deals_company_industries(company_id, industry_id, sub_industry_id, is_primary)
  SELECT v_company, v_industry, v_sub, true
  WHERE NOT EXISTS (
    SELECT 1 FROM deals_company_industries WHERE company_id = v_company AND industry_id = v_industry AND sub_industry_id = v_sub
  );
  UPDATE deals SET company_id = v_company WHERE deal_id = 'rylee-cru' AND company_id IS NULL;

END $$;