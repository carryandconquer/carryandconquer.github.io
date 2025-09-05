-- Link deals to investors with roles
INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 800000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = '500 Startups';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'participant', 600000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = 'Bessemer Venture Partners';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'participant', 400000
FROM deals d, deals_investors i
WHERE d.deal_id = 'zenscreen-deal-2024' AND i.name = 'BMW i Ventures';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 18700000
FROM deals d, deals_investors i
WHERE d.deal_id = 'vanleeuwen-deal-2024' AND i.name = 'Strand Equity';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 2000000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = '180 Degree Capital';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'participant', 1500000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = 'AbbVie Biotech Ventures';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'participant', 1000000
FROM deals d, deals_investors i
WHERE d.deal_id = 'coniferpoint-deal-2024' AND i.name = 'ARCH Venture Partners';

INSERT INTO deals_deal_investors (deal_id, investor_id, role, committed_amount_usd)
SELECT d.id, i.id, 'lead', 1200000
FROM deals d, deals_investors i
WHERE d.deal_id = 'omniview-deal-2024' AND i.name = 'Undisclosed Investors';