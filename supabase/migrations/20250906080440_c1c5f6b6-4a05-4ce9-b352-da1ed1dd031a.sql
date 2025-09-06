-- Add placeholder content for featured people to showcase complete cards
UPDATE public.people SET 
  bio = 'Visionary CEO leading Amazon''s transformation into the world''s most customer-centric company. Expert in cloud computing, digital transformation, and large-scale operations.',
  city = 'Seattle',
  country = 'United States',
  region = 'North America',
  expertise_tags = ARRAY['Cloud Computing', 'E-commerce', 'Digital Transformation', 'Leadership'],
  profile_image_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/ajassy',
  meta_description = 'Andy Jassy, CEO of Amazon, leading global digital transformation and cloud computing innovation.'
WHERE slug = 'andy-jassy';

UPDATE public.people SET 
  bio = 'Media entrepreneur and wellness advocate building a healthier, more sustainable way to live and work. Pioneer in digital media and corporate wellness.',
  city = 'New York',
  country = 'United States', 
  region = 'North America',
  expertise_tags = ARRAY['Media', 'Wellness', 'Entrepreneurship', 'Digital Publishing'],
  profile_image_url = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/ariannahuff',
  meta_description = 'Arianna Huffington, founder of Thrive Global, revolutionizing workplace wellness and sustainable living.'
WHERE slug = 'arianna-huffington';

UPDATE public.people SET 
  bio = 'AI pioneer and Meta executive driving the future of artificial intelligence in social platforms. Leading business AI initiatives at global scale.',
  city = 'San Francisco',
  country = 'United States',
  region = 'North America', 
  expertise_tags = ARRAY['Artificial Intelligence', 'Product Strategy', 'Social Media', 'Business AI'],
  profile_image_url = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/clarashih',
  meta_description = 'Clara Shih, SVP at Meta, pioneering AI integration in social platforms and business applications.'
WHERE slug = 'clara-shih';

UPDATE public.people SET 
  bio = 'Fintech innovator revolutionizing digital banking in Latin America. Co-founded Nu Bank, one of the world''s largest digital banks.',
  city = 'São Paulo',
  country = 'Brazil',
  region = 'South America',
  expertise_tags = ARRAY['Fintech', 'Digital Banking', 'Latin America', 'Financial Innovation'],
  profile_image_url = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/cjunqueira',
  meta_description = 'Cristina Junqueira, Co-Founder of Nu Bank, transforming financial services across Latin America.'
WHERE slug = 'cristina-junqueira';

UPDATE public.people SET 
  bio = 'Transportation visionary leading Uber''s global expansion and innovation. Expert in marketplace dynamics, mobility, and strategic transformation.',
  city = 'San Francisco', 
  country = 'United States',
  region = 'North America',
  expertise_tags = ARRAY['Transportation', 'Marketplaces', 'Global Operations', 'Strategic Leadership'],
  profile_image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/dkhos',
  meta_description = 'Dara Khosrowshahi, CEO of Uber, transforming global transportation and mobility solutions.'
WHERE slug = 'dara-khosrowshahi';

UPDATE public.people SET 
  bio = 'Marketing automation pioneer and HubSpot co-founder. Thought leader in inbound marketing, sales enablement, and customer experience.',
  city = 'Boston',
  country = 'United States', 
  region = 'North America',
  expertise_tags = ARRAY['Marketing Automation', 'SaaS', 'Inbound Marketing', 'Customer Experience'],
  profile_image_url = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/dharmesh',
  meta_description = 'Dharmesh Shah, Co-founder and CTO of HubSpot, pioneering inbound marketing and sales automation.'
WHERE slug = 'dharmesh-shah';

UPDATE public.people SET 
  bio = 'Fashion-tech entrepreneur revolutionizing rental economy. Building sustainable fashion through innovative technology and logistics.',
  city = 'New York',
  country = 'United States',
  region = 'North America',
  expertise_tags = ARRAY['Fashion Tech', 'Sustainability', 'Rental Economy', 'E-commerce'],
  profile_image_url = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/jenn_hyman',
  meta_description = 'Jennifer Hyman, CEO of Rent the Runway, pioneering sustainable fashion through technology.'
WHERE slug = 'jennifer-hyman';

UPDATE public.people SET 
  bio = 'AI computing pioneer and NVIDIA founder driving the future of artificial intelligence, gaming, and accelerated computing worldwide.',
  city = 'Santa Clara',
  country = 'United States',
  region = 'North America',
  expertise_tags = ARRAY['AI Computing', 'Graphics Processing', 'Deep Learning', 'Hardware Innovation'],
  profile_image_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/jensenhuang',
  meta_description = 'Jensen Huang, CEO of NVIDIA, leading the AI revolution through advanced computing technology.'
WHERE slug = 'jensen-huang';

UPDATE public.people SET 
  bio = 'Design platform visionary democratizing creativity worldwide. Co-founded Canva to make design accessible to everyone, everywhere.',
  city = 'Sydney',
  country = 'Australia',
  region = 'Oceania',
  expertise_tags = ARRAY['Design Technology', 'SaaS', 'User Experience', 'Creative Tools'],
  profile_image_url = 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/melanieperkins',
  meta_description = 'Melanie Perkins, CEO of Canva, democratizing design and empowering global creativity.'
WHERE slug = 'melanie-perkins';

UPDATE public.people SET 
  bio = 'Open-source AI advocate and Hugging Face co-founder. Building the future of machine learning through collaborative, accessible AI tools.',
  city = 'Paris',
  country = 'France', 
  region = 'Europe',
  expertise_tags = ARRAY['Machine Learning', 'Open Source', 'Natural Language Processing', 'AI Research'],
  profile_image_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  twitter_url = 'https://twitter.com/julien_c',
  meta_description = 'Julien Chaumond, Co-founder of Hugging Face, advancing open-source AI and machine learning.'
WHERE slug = 'julien-chaumond';