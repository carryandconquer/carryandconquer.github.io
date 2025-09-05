-- Create standalone companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  website TEXT,
  logo_url TEXT,
  company_type TEXT DEFAULT 'startup'::text,
  founded_date DATE,
  employee_count INTEGER,
  industry_tags TEXT[],
  city TEXT,
  country TEXT,
  region TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  contact_email TEXT,
  meta_description TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create standalone people table
CREATE TABLE public.people (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT,
  bio TEXT,
  current_company_id UUID REFERENCES public.companies(id),
  profile_image_url TEXT,
  city TEXT,
  country TEXT,
  region TEXT,
  expertise_tags TEXT[],
  social_links JSONB DEFAULT '{}'::jsonb,
  contact_email TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  meta_description TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;

-- Create policies for companies
CREATE POLICY "Public can read published companies" 
ON public.companies 
FOR SELECT 
USING (published = true);

CREATE POLICY "Authenticated can manage companies" 
ON public.companies 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create policies for people
CREATE POLICY "Public can read published people" 
ON public.people 
FOR SELECT 
USING (published = true);

CREATE POLICY "Authenticated can manage people" 
ON public.people 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_companies_slug ON public.companies(slug);
CREATE INDEX idx_companies_type ON public.companies(company_type);
CREATE INDEX idx_companies_featured ON public.companies(featured) WHERE featured = true;
CREATE INDEX idx_people_slug ON public.people(slug);
CREATE INDEX idx_people_company ON public.people(current_company_id);
CREATE INDEX idx_people_featured ON public.people(featured) WHERE featured = true;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_people_updated_at
BEFORE UPDATE ON public.people
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();