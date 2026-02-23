-- ═══════════════════════════════════════════════════════════════
-- EQUITYIFY — Supabase Database Setup
-- Run this in Supabase → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS users (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  phone       VARCHAR(20)  NOT NULL,
  password    VARCHAR(255) NOT NULL,
  verified    BOOLEAN      DEFAULT FALSE,
  otp         VARCHAR(10),
  otp_expiry  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id                BIGSERIAL PRIMARY KEY,
  title             VARCHAR(200) NOT NULL,
  subtitle          VARCHAR(200) DEFAULT '',
  instructor        VARCHAR(100) DEFAULT 'Upanshu Asra',
  category          VARCHAR(50)  DEFAULT 'General',
  price             INT          DEFAULT 0,
  original_price    INT          DEFAULT 0,
  level             VARCHAR(50)  DEFAULT 'Beginner',
  badge             VARCHAR(50)  DEFAULT '',
  thumbnail         VARCHAR(10)  DEFAULT '📈',
  is_free           BOOLEAN      DEFAULT FALSE,
  is_live           BOOLEAN      DEFAULT FALSE,
  live_days         VARCHAR(200) DEFAULT '',
  live_time         VARCHAR(20)  DEFAULT '',
  live_end_time     VARCHAR(20)  DEFAULT '',
  meet_link         VARCHAR(500) DEFAULT '',
  requires_approval BOOLEAN      DEFAULT TRUE,
  tags              VARCHAR(300) DEFAULT '',
  description       TEXT,
  duration          VARCHAR(50)  DEFAULT '',
  curriculum        JSONB        DEFAULT '[]',
  active            BOOLEAN      DEFAULT TRUE,
  students_count    INT          DEFAULT 0,
  created_at        TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id       BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status          VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending','Approved','Rejected')),
  payment_method  VARCHAR(50)  DEFAULT 'cash',
  amount          INT          DEFAULT 0,
  meet_link       VARCHAR(500) DEFAULT '',
  progress        INT          DEFAULT 0,
  note            TEXT         DEFAULT '',
  created_at      TIMESTAMPTZ  DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE TABLE IF NOT EXISTS blogs (
  id          BIGSERIAL PRIMARY KEY,
  title       VARCHAR(300) NOT NULL,
  slug        VARCHAR(300) NOT NULL UNIQUE,
  excerpt     TEXT,
  content     TEXT,
  author      VARCHAR(100) DEFAULT 'Upanshu Asra',
  category    VARCHAR(100) DEFAULT 'General',
  tags        VARCHAR(300) DEFAULT '',
  thumbnail   VARCHAR(10)  DEFAULT '📝',
  published   BOOLEAN      DEFAULT TRUE,
  views       INT          DEFAULT 0,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id          BIGSERIAL PRIMARY KEY,
  name        VARCHAR(100),
  email       VARCHAR(150),
  phone       VARCHAR(30),
  topic       VARCHAR(100),
  message     TEXT,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- DISABLE ROW LEVEL SECURITY (so our service role key works)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- SEED DATA — Initial Courses
-- ═══════════════════════════════════════════════════════════════
INSERT INTO courses (title, subtitle, category, price, original_price, level, badge, thumbnail, is_free, is_live, requires_approval, tags, description, duration, live_days, live_time, live_end_time, students_count) VALUES

('Free Demo Class', '1 Live Session', 'Beginner', 0, 0, 'Beginner', 'Free', '🎓', TRUE, TRUE, FALSE,
 'Demo,Free,Stock Market',
 'Join our free live demo class and experience real-world stock market education.',
 '1 Day', '', '', '', 1240),

('Technical Analysis + Crypto', 'Complete Program', 'Intermediate', 3000, 5000, 'Intermediate', 'Popular', '📊', FALSE, TRUE, TRUE,
 'Technical Analysis,Crypto,Candlesticks,RSI,MACD',
 'Master Technical Analysis from candlestick patterns to advanced chart reading, combined with a Cryptocurrency module.',
 '8 Weeks', 'Monday, Wednesday, Friday', '19:00', '20:30', 856),

('Fundamental Analysis', 'Value Investing Program', 'Beginner', 1000, 2000, 'Beginner', '', '💎', FALSE, FALSE, TRUE,
 'Fundamental Analysis,Value Investing,Financial Statements',
 'Learn how to analyze companies like a professional analyst.',
 '6 Weeks', '', '', '', 623),

('NISM + Financial Market Career Plan', 'Career Development Program', 'Advanced', 5000, 8000, 'Advanced', 'Career', '🚀', FALSE, TRUE, TRUE,
 'NISM,Career,Research Analyst,Certification',
 'Complete career development program — NISM certification prep + Financial Market Career Plan.',
 '16 Weeks', 'Tuesday, Thursday, Saturday', '19:00', '20:30', 412)

ON CONFLICT DO NOTHING;

-- Seed blogs
INSERT INTO blogs (title, slug, excerpt, content, category, tags, thumbnail) VALUES
('How to Read Candlestick Charts Like a Pro', 'how-to-read-candlestick-charts',
 'Candlestick patterns are the foundation of technical analysis.',
 'Candlestick charts were invented in Japan in the 18th century and are now the most popular chart type worldwide.',
 'Technical Analysis', 'Candlesticks,Technical Analysis', '📊'),

('Top 5 Mistakes New Traders Make', 'top-5-mistakes-new-traders',
 'Every new trader makes mistakes. Here are the 5 most common ones.',
 'Trading is rewarding but comes with a steep learning curve. Mistake 1: No stop loss. Mistake 2: Overtrading.',
 'Education', 'Beginner,Risk Management', '⚠️'),

('Understanding NISM Certification', 'nism-certification-guide',
 'NISM certification can open doors in financial services.',
 'SEBI-mandated NISM certifications are essential for anyone working in financial markets professionally.',
 'Career', 'NISM,Career,Certification', '📜')

ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- Done! Your Supabase database is ready.
-- ═══════════════════════════════════════════════════════════════
