-- ============================================================
-- DMHCA Website Database Schema
-- Run this entire file in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste & run
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: courses
-- ============================================================
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '',
  program_type TEXT NOT NULL DEFAULT 'fellowship' CHECK (program_type IN ('fellowship', 'pg-diploma', 'certificate')),
  duration TEXT NOT NULL DEFAULT '',
  lessons INTEGER NOT NULL DEFAULT 0,
  level TEXT NOT NULL DEFAULT 'Expert',
  rating NUMERIC(3,1) NOT NULL DEFAULT 5.0,
  reviews INTEGER NOT NULL DEFAULT 0,
  enrolled INTEGER NOT NULL DEFAULT 0,
  price TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: course_details
-- ============================================================
CREATE TABLE IF NOT EXISTS course_details (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  instructor TEXT NOT NULL DEFAULT 'DMHCA',
  overview TEXT NOT NULL DEFAULT '',
  key_highlights JSONB NOT NULL DEFAULT '[]',
  curriculum JSONB NOT NULL DEFAULT '[]',
  fee_breakdown JSONB NOT NULL DEFAULT '{}',
  training_facilities JSONB NOT NULL DEFAULT '[]',
  hands_on_experience JSONB NOT NULL DEFAULT '{}',
  eligibility JSONB NOT NULL DEFAULT '[]',
  outcomes JSONB NOT NULL DEFAULT '[]',
  career_opportunities JSONB NOT NULL DEFAULT '[]',
  assessment JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(course_id)
);

-- ============================================================
-- TABLE: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  program TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  quote TEXT NOT NULL,
  highlight TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: events
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'conference' CHECK (category IN ('conference', 'workshop', 'symposium', 'webinar', 'seminar')),
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT 'Free',
  seats INTEGER NOT NULL DEFAULT 100,
  registered_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  speakers JSONB NOT NULL DEFAULT '[]',
  topics JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: blogs
-- ============================================================
CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT 'DMHCA',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  likes INTEGER NOT NULL DEFAULT 0,
  tags JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: partners
-- ============================================================
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  partner_type TEXT NOT NULL DEFAULT 'university' CHECK (partner_type IN ('university', 'accreditation')),
  description TEXT NOT NULL DEFAULT '',
  verified BOOLEAN NOT NULL DEFAULT true,
  badges JSONB NOT NULL DEFAULT '[]',
  logo_url TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: site_settings  (key/value JSON store for all site config)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: media
-- ============================================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  bucket TEXT NOT NULL DEFAULT 'images',
  file_type TEXT NOT NULL DEFAULT '',
  size_bytes BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLE: applications
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type TEXT NOT NULL DEFAULT 'contact' CHECK (form_type IN ('contact', 'apply')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  course_interest TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  inquiry_type TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'enrolled', 'closed')),
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_courses_type ON courses(program_type);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Public can READ active content
CREATE POLICY "Anyone can view active courses" ON courses FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view course details" ON course_details FOR SELECT USING (true);
CREATE POLICY "Anyone can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active events" ON events FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active blogs" ON blogs FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active partners" ON partners FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view site settings" ON site_settings FOR SELECT USING (true);

-- Only authenticated users can write applications (contact/apply forms from public)
CREATE POLICY "Anyone can submit applications" ON applications FOR INSERT WITH CHECK (true);

-- Only authenticated (admin) users can do all operations
CREATE POLICY "Admin full access courses" ON courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access course_details" ON course_details FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access blogs" ON blogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access media" ON media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access applications" ON applications FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS (run after creating tables)
-- Note: You can also create these in Dashboard → Storage
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true) ON CONFLICT DO NOTHING;

-- Storage policies — public read
CREATE POLICY "Anyone can view images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Anyone can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Admin can upload images" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id IN ('images', 'videos'));
CREATE POLICY "Admin can delete media" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED: Initial site_settings
-- ============================================================
INSERT INTO site_settings (key, value) VALUES
('hero', '{
  "videoUrl": "https://videos.pexels.com/video-files/7615384/7615384-uhd_2560_1440_25fps.mp4",
  "title": "DMHCA",
  "subtitle": "DELHI MEDICAL HEALTH CARE ACADEMY"
}'),
('contact_info', '{
  "phone": "+91 7042011441",
  "email": "info@dmhca.in",
  "address": "Delhi Medical Health Care Academy, New Delhi, India",
  "businessHours": {
    "weekdays": "Mon - Fri: 9:00 AM - 6:00 PM",
    "saturday": "Sat: 9:00 AM - 2:00 PM",
    "sunday": "Sun: Closed"
  }
}'),
('social_links', '{
  "facebook": "https://www.facebook.com/dmhca.in",
  "youtube": "https://www.youtube.com/@dmhca",
  "instagram": "https://www.instagram.com/dmhca_official/",
  "linkedin": "https://www.linkedin.com/company/dmhca/"
}'),
('about_page', '{
  "heroTitle": "About DMHCA",
  "heroSubtitle": "Digital Medical and Healthcare Academy - India'\''s premier destination for advanced medical education, post-graduate courses, and specialized healthcare training programs.",
  "missionTitle": "Our Mission",
  "missionText": "To revolutionize medical education in India by providing world-class, accessible, and innovative learning experiences that prepare healthcare professionals for the challenges of modern medicine.",
  "visionTitle": "Our Vision",
  "visionText": "To become the leading medical education institution in Asia, recognized globally for excellence in healthcare training, research, and professional development.",
  "stats": [
    {"number": "5000+", "label": "Students Trained"},
    {"number": "50+", "label": "Expert Faculty"},
    {"number": "20+", "label": "Specializations"},
    {"number": "95%", "label": "Success Rate"}
  ],
  "values": [
    {"title": "Excellence", "description": "We maintain the highest standards in medical education and training."},
    {"title": "Innovation", "description": "Cutting-edge teaching methods and latest medical technologies."},
    {"title": "Integrity", "description": "Ethical practices and transparent educational processes."},
    {"title": "Trust", "description": "Building reliable relationships with students and healthcare partners."}
  ]
}'),
('footer', '{
  "tagline": "Empowering healthcare professionals with world-class medical education and training programs.",
  "copyright": "© 2024 DMHCA. All rights reserved."
}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================================
-- Done! Next steps:
-- 1. Go to your Supabase project → Authentication → Users → Add user
--    Create your admin account with email + password
-- 2. Fill in your .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
-- 3. Run the seed script: npm run seed (after setting SERVICE_ROLE_KEY in .env.local)
-- ============================================================
