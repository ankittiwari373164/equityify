export const COURSES = [
  {
    id: 1,
    title: 'Free Demo Class',
    subtitle: '1 Live Session',
    category: 'Beginner',
    price: 0,
    original_price: 0,
    level: 'Beginner',
    badge: 'Free',
    thumbnail: '🎓',
    is_free: true,
    is_live: true,
    requires_approval: false,
    duration: '1 Day',
    live_days: '',
    live_time: '',
    live_end_time: '',
    description: 'Join our free live demo class and experience real-world stock market education. See how Equityify teaches before you commit to any program.',
    students_count: 1240,
    tags: ['Demo', 'Free', 'Stock Market'],
    curriculum: [
      {
        section: 'Demo Session',
        lessons: [
          { title: 'Introduction to Stock Market', duration: '20 min', content: 'How stock markets work — NSE, BSE, and global markets.' },
          { title: 'How Markets Work', duration: '25 min', content: 'Buy/sell orders, price formation, market participants.' },
          { title: 'Q&A with Upanshu Asra', duration: '30 min', content: 'Open Q&A — ask anything about markets and trading.' },
          { title: 'Program Overview', duration: '15 min', content: 'Which Equityify program is right for you?' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Technical Analysis + Crypto',
    subtitle: 'Complete Program',
    category: 'Intermediate',
    price: 3000,
    original_price: 5000,
    level: 'Intermediate',
    badge: 'Popular',
    thumbnail: '📊',
    is_free: false,
    is_live: true,
    requires_approval: true,
    duration: '8 Weeks',
    live_days: 'Monday, Wednesday, Friday',
    live_time: '19:00',
    live_end_time: '20:30',
    description: 'Master Technical Analysis from candlestick patterns to advanced chart reading, combined with a dedicated Cryptocurrency module covering Bitcoin, Ethereum and altcoin strategies.',
    students_count: 856,
    tags: ['Technical Analysis', 'Crypto', 'Candlesticks', 'RSI', 'MACD'],
    curriculum: [
      {
        section: 'Technical Analysis Foundations',
        lessons: [
          { title: 'Introduction to Technical Analysis', duration: '45 min', content: 'Philosophy behind TA vs fundamental analysis.' },
          { title: 'Candlestick Patterns', duration: '60 min', content: 'Doji, Hammer, Engulfing, Morning Star patterns.' },
          { title: 'Support & Resistance', duration: '50 min', content: 'Identifying key levels and trading bounces.' },
          { title: 'RSI & MACD', duration: '55 min', content: 'Momentum indicators and crossover strategies.' },
          { title: 'Bollinger Bands', duration: '40 min', content: 'Volatility, Bollinger Squeeze strategies.' },
        ],
      },
      {
        section: 'Cryptocurrency Markets',
        lessons: [
          { title: 'Introduction to Crypto', duration: '60 min', content: 'Blockchain basics, wallets, exchanges.' },
          { title: 'Bitcoin & Ethereum Analysis', duration: '55 min', content: 'Use cases, on-chain metrics, market cycles.' },
          { title: 'Crypto Trading Strategies', duration: '55 min', content: 'Applying TA to crypto 24/7 markets.' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Fundamental Analysis',
    subtitle: 'Value Investing Program',
    category: 'Beginner',
    price: 1000,
    original_price: 2000,
    level: 'Beginner',
    badge: '',
    thumbnail: '💎',
    is_free: false,
    is_live: false,
    requires_approval: true,
    duration: '6 Weeks',
    live_days: '',
    live_time: '',
    live_end_time: '',
    description: 'Learn how to analyze companies like a professional analyst. Understand financial statements, valuation methods, and identify strong stocks for long-term wealth.',
    students_count: 623,
    tags: ['Fundamental Analysis', 'Value Investing', 'Financial Statements'],
    curriculum: [
      {
        section: 'Financial Statements',
        lessons: [
          { title: 'Balance Sheet Analysis', duration: '60 min', content: 'Assets, liabilities, equity — identifying red flags.' },
          { title: 'P&L Statement', duration: '55 min', content: 'Revenue quality, gross margin, earnings growth.' },
          { title: 'Cash Flow Statement', duration: '50 min', content: 'Real cash vs accounting profit. Free cash flow.' },
          { title: 'Key Financial Ratios', duration: '55 min', content: 'ROE, ROCE, Debt/Equity, Current Ratio.' },
        ],
      },
      {
        section: 'Valuation Methods',
        lessons: [
          { title: 'P/E Ratio Valuation', duration: '45 min', content: 'Using P/E properly and its limitations.' },
          { title: 'DCF Analysis', duration: '70 min', content: 'Discounted Cash Flow with real Indian company examples.' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'NISM + Financial Market Career Plan',
    subtitle: 'Career Development Program',
    category: 'Advanced',
    price: 5000,
    original_price: 8000,
    level: 'Advanced',
    badge: 'Career',
    thumbnail: '🚀',
    is_free: false,
    is_live: true,
    requires_approval: true,
    duration: '16 Weeks',
    live_days: 'Tuesday, Thursday, Saturday',
    live_time: '19:00',
    live_end_time: '20:30',
    description: 'Complete career development program — NISM certification prep + Financial Market Career Plan. Become a certified market professional.',
    students_count: 412,
    tags: ['NISM', 'Career', 'Research Analyst', 'Certification'],
    curriculum: [
      {
        section: 'NISM Certification Prep',
        lessons: [
          { title: 'NISM Exam Overview', duration: '30 min', content: 'NISM Series VIII syllabus, exam pattern, registration.' },
          { title: 'Securities Market Fundamentals', duration: '60 min', content: 'Primary/secondary markets, derivatives.' },
          { title: 'SEBI Regulatory Framework', duration: '55 min', content: 'SEBI regulations relevant to research analysts.' },
        ],
      },
      {
        section: 'Career Roadmap',
        lessons: [
          { title: 'Career Paths in Finance', duration: '45 min', content: 'Research analyst, portfolio manager, investment banker.' },
          { title: 'Resume & Interview Prep', duration: '60 min', content: 'Finance resume and stock pitch practice.' },
          { title: '1-on-1 Mentorship', duration: '60 min', content: 'Personal career guidance from Upanshu Asra.' },
        ],
      },
    ],
  },
]

export const BLOGS = [
  {
    id: 1,
    title: 'How to Read Candlestick Charts Like a Pro',
    slug: 'how-to-read-candlestick-charts',
    excerpt: 'Candlestick patterns are the foundation of technical analysis. Learn the most important patterns every trader must know.',
    content: `Candlestick charts were invented in Japan in the 18th century and are now the most popular chart type among professional traders worldwide.

## What is a Candlestick?

Each candlestick represents price movement over a specific time period — showing the open, high, low, and close prices. The "body" shows the range between open and close, while the "wicks" show the high and low.

## Top 10 Patterns You Must Know

**1. Doji** — Open and close are nearly the same, forming a cross. Signals indecision in the market.

**2. Hammer** — Small body with a long lower wick. Bullish reversal signal at the bottom of a downtrend.

**3. Shooting Star** — Small body with a long upper wick. Bearish reversal signal at the top of an uptrend.

**4. Engulfing Pattern** — A large candle that completely engulfs the previous candle. Bullish or bearish depending on direction.

**5. Morning Star** — Three-candle pattern signaling a bullish reversal after a downtrend.

**6. Evening Star** — Three-candle bearish reversal pattern.

**7. Harami** — Small candle inside a large candle, signals potential reversal.

**8. Marubozu** — Candle with no wicks, strong momentum in the direction of the body.

**9. Spinning Top** — Small body with equal wicks, shows market indecision.

**10. Three White Soldiers** — Three consecutive bullish candles, strong uptrend confirmation.

## How to Use These Patterns

Never trade on a single pattern alone. Always combine candlestick patterns with:
- Support and resistance levels
- Volume confirmation
- Overall trend direction
- Other technical indicators like RSI or MACD

Practice identifying these patterns on historical charts before trading with real money. The more you study, the more intuitive it becomes.`,
    author: 'Upanshu Asra',
    category: 'Technical Analysis',
    tags: ['Candlesticks', 'Technical Analysis', 'Beginner'],
    thumbnail: '📊',
    views: 2847,
    post_date: '2024-12-15',
  },
  {
    id: 2,
    title: 'Top 5 Mistakes New Traders Make',
    slug: 'top-5-mistakes-new-traders',
    excerpt: 'Every new trader makes mistakes. Here are the 5 most common ones and how to sidestep them from day one.',
    content: `Trading is one of the most rewarding skills you can learn, but it comes with a steep learning curve. After teaching thousands of students, here are the 5 mistakes I see most often.

## Mistake 1: Trading Without a Stop Loss

This is the #1 mistake. New traders often think "I'll wait for it to recover" — but losses compound fast. Always set a stop loss before entering any trade. Risk no more than 1-2% of your capital per trade.

## Mistake 2: Overtrading

More trades ≠ more profits. Overtrading leads to poor decisions, high transaction costs, and emotional burnout. Wait for high-quality setups. The best traders take fewer, better trades.

## Mistake 3: Ignoring Position Sizing

Even if your analysis is right, wrong position sizing can destroy your account. Use proper position sizing formulas. Never put more than 5-10% of capital in a single trade.

## Mistake 4: Chasing Tips

Following WhatsApp groups, Telegram channels, or "guaranteed return" advisors is a fast way to lose money. By the time a tip reaches you, the move is often over. Learn to analyze yourself.

## Mistake 5: No Trading Journal

Successful traders keep detailed records of every trade — entry, exit, reason, result, and lessons learned. Without a journal, you repeat the same mistakes. Start a journal from your very first trade.

## The Solution

Education, discipline, and patience. There are no shortcuts in trading. If you want to succeed, invest in learning the right way first.`,
    author: 'Upanshu Asra',
    category: 'Education',
    tags: ['Beginner', 'Risk Management', 'Psychology'],
    thumbnail: '⚠️',
    views: 1923,
    post_date: '2024-12-20',
  },
  {
    id: 3,
    title: 'Understanding NISM Certification — A Complete Guide',
    slug: 'nism-certification-complete-guide',
    excerpt: 'NISM certification can open doors in the financial services industry. This guide covers everything you need to know.',
    content: `SEBI-mandated NISM certifications are essential for anyone working in financial markets professionally. This guide covers which exam to take, how to register, study resources, and what career doors it opens.

## What is NISM?

NISM stands for National Institute of Securities Markets. It was established by SEBI (Securities and Exchange Board of India) to provide high-quality financial education and certifications.

## Which NISM Exam Should You Take?

The most popular certifications include:

- **NISM Series VIII** — Equity Derivatives (required for F&O trading advisors)
- **NISM Series V-A** — Mutual Fund Distributors
- **NISM Series X-A** — Investment Adviser (Level 1)
- **NISM Series XV** — Research Analyst

For most stock market professionals, **NISM Series VIII** is the most valuable.

## How to Register

1. Visit nism.ac.in
2. Create an account
3. Choose your exam and center
4. Pay the exam fee (₹1,500 - ₹3,000)
5. Study for 4-8 weeks
6. Pass the exam (50% minimum, 60% for some)

## Career Opportunities

With NISM certification, you can work as:
- Research Analyst (SEBI registered)
- Investment Adviser
- Mutual Fund Distributor
- Sub-broker / Authorized Person
- Portfolio Manager

## Study Resources

- NISM official workbooks (free download on nism.ac.in)
- Equityify NISM + Career Program (our comprehensive coaching)
- Mock tests on NISM website

Start your preparation today — the certification is valid for 3 years and opens many professional doors.`,
    author: 'Upanshu Asra',
    category: 'Career',
    tags: ['NISM', 'Career', 'Certification'],
    thumbnail: '📜',
    views: 1456,
    post_date: '2025-01-05',
  },
  {
    id: 4,
    title: 'Technical vs Fundamental Analysis — Which is Better?',
    slug: 'technical-vs-fundamental-analysis',
    excerpt: 'The age-old debate in investing. Here\'s an honest comparison to help you choose the right approach.',
    content: `One of the most common questions from new investors is: should I learn Technical Analysis or Fundamental Analysis? Here's an honest breakdown.

## Technical Analysis

TA focuses on price charts, patterns, and indicators. It assumes all information is already priced in, and future movements can be predicted from past patterns.

**Best for:** Traders (short-term), day traders, swing traders
**Time horizon:** Minutes to weeks
**Tools:** Charts, RSI, MACD, Bollinger Bands, candlestick patterns

## Fundamental Analysis

FA focuses on the intrinsic value of a company — its financials, management, competitive position, and growth prospects.

**Best for:** Investors (long-term), value investors
**Time horizon:** Months to years
**Tools:** Balance sheets, P&L, DCF analysis, ratios

## Which is Better?

Neither — they serve different purposes.

The best investors use **both**. Use Fundamental Analysis to identify great companies, and Technical Analysis to time your entry and exit.

Warren Buffett uses FA to pick stocks. Professional fund managers use TA to optimize their entries.

## Our Recommendation

Learn both. Start with Technical Analysis (faster to learn, immediate results) then add Fundamental Analysis for a complete toolkit.

That's why our programs cover both in depth.`,
    author: 'Upanshu Asra',
    category: 'Education',
    tags: ['Technical Analysis', 'Fundamental Analysis', 'Investing'],
    thumbnail: '⚖️',
    views: 1102,
    post_date: '2025-01-18',
  },
]

export const SERVICES = [
  {
    icon: '📊',
    title: 'Live Online Classes',
    description: 'Interactive live sessions with real-time market analysis, Q&A, and screen sharing. Join from anywhere in India.',
    color: '#DC2626',
  },
  {
    icon: '🎯',
    title: 'Personalized Mentorship',
    description: '1-on-1 guidance sessions with Upanshu Asra. Get your trading plan reviewed and personal strategy advice.',
    color: '#2563EB',
  },
  {
    icon: '📈',
    title: 'Research Reports',
    description: 'Weekly stock analysis reports with entry/exit levels, stop loss, and target prices for enrolled students.',
    color: '#16A34A',
  },
  {
    icon: '📚',
    title: 'Study Material',
    description: 'Comprehensive PDF notes, workbooks, and reference material covering all topics taught in class.',
    color: '#9333EA',
  },
  {
    icon: '🏆',
    title: 'NISM Exam Coaching',
    description: 'Dedicated preparation for NISM certifications with mock tests, doubt sessions, and exam strategy.',
    color: '#D97706',
  },
  {
    icon: '💬',
    title: 'Community Access',
    description: 'Private WhatsApp group for students with daily market updates, trade ideas, and peer learning.',
    color: '#0891B2',
  },
]
