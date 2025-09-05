-- Insert a placeholder person
INSERT INTO people (
  full_name,
  slug,
  title,
  bio,
  city,
  country,
  region,
  expertise_tags,
  contact_email,
  linkedin_url,
  twitter_url,
  meta_description,
  featured,
  published,
  profile_image_url
) VALUES (
  'Sarah Johnson',
  'sarah-johnson',
  'VP of Product Strategy',
  'Experienced product leader with over 10 years in building scalable technology solutions. Passionate about user experience design and data-driven product development. Previously led product teams at several high-growth startups.',
  'San Francisco',
  'United States',
  'North America',
  ARRAY['Product Management', 'UX Design', 'Data Analytics', 'SaaS', 'Startups'],
  'sarah.johnson@example.com',
  'https://linkedin.com/in/sarahjohnson',
  'https://twitter.com/sarahj_product',
  'VP of Product Strategy with expertise in building scalable technology solutions and leading high-growth startup product teams.',
  true,
  true,
  'https://images.unsplash.com/photo-1494790108755-2616b612b188?w=400&h=400&fit=crop&crop=face'
);