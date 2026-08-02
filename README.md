# SMSAAD 2.0 — Knowledge & Documentation Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![Resend](https://img.shields.io/badge/Resend-Email%20API-black)](https://resend.com/)

**SMSAAD 2.0** is an enterprise-grade, documentation-first knowledge platform dedicated to **AI Filmmaking, Visual Effects (VFX), Creative Technology, and AI Video Generation**.

Designed with aesthetics and technical standards inspired by **Apple Developer, Stripe Documentation, Vercel, Anthropic, Linear, MDN, GitHub Docs, and Notion**.

---

## Key Features

1. **Documentation Engine**: High-density first-principles specifications with sticky Table of Contents, code blocks with copy-to-clipboard, callouts, and technical tags.
2. **Long-Form Master Guides**: Blueprint tutorials for hybrid AI/VFX pipelines, camera direction, lighting physics, and virtual production.
3. **AI Tools & Model Library**: In-depth breakdowns of state-of-the-art AI video tools (Runway Gen-3, Luma Dream Machine, Sora, Midjourney, ComfyUI) with strengths, weaknesses, pricing, and step-by-step workflows.
4. **Global Command Palette (`Cmd + K`)**: Instant search across Docs, Guides, Tools, Resources, and Glossary terms with category filtering and keyboard shortcuts.
5. **Production Toolkit & Glossary**: Cheat sheets (ComfyUI hotkeys), prompt templates (Anamorphic, 70mm IMAX), and technical terms dictionary.
6. **Newsletter & Contact Systems**: Integrated with database storage and transactional emails via **Resend**.
7. **Auth & User Dashboard**: Supabase Auth integration, user saved bookmarks, reading history, and newsletter preferences.
8. **Admin Dashboard / CMS**: Dedicated admin portal to create, edit, draft, and publish specifications with a built-in Markdown editor.
9. **SEO Engine**: Dynamic Next.js Metadata API, `sitemap.xml`, `robots.txt`, and JSON-LD schemas (`TechArticle`, `SoftwareApplication`, `Organization`).

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide Icons
- **Backend & Database**: Supabase, PostgreSQL, Row Level Security (RLS) policies, SQL migrations
- **Email Service**: Resend API
- **Validation**: Zod schema validation
- **Hosting**: Cloudflare Pages / Vercel Edge ready (`wrangler.json`)

---

## Project Structure

```
.
├── app/                        # Next.js 15 App Router
│   ├── (auth)/                 # Login & Register views
│   ├── (dashboard)/            # User & Admin CMS Dashboards
│   ├── api/                    # API Routes (Search, Newsletter, Contact)
│   ├── docs/                   # Documentation Engine & Detail Pages
│   ├── guides/                 # Long-Form Production Guides
│   ├── tools/                  # AI Tools Library
│   ├── resources/              # Glossary & Cheat Sheets Toolkit
│   ├── newsletter/             # Weekly Dispatch Subscription
│   ├── about/                  # Mission & Vision
│   ├── contact/                # Contact & Support Form
│   ├── globals.css             # Dark theme tokens (#09090B, #111827, #7C3AED, #22D3EE)
│   ├── layout.tsx              # Root Layout & Typography
│   ├── page.tsx                # High-Impact Hero Landing Page
│   ├── sitemap.ts              # Dynamic XML Sitemap Endpoint
│   └── robots.ts               # Dynamic Robots.txt Endpoint
├── components/                 # Reusable UI & Feature Components
│   ├── ui/                     # Button, Card, Badge, Input, Callout, CodeBlock
│   ├── layout/                 # Navbar, Footer, Breadcrumb, ReadingProgressBar
│   ├── home/                   # Hero, CategoriesGrid, FeaturedDocs, ToolLibrarySection
│   └── search/                 # CommandPalette (Cmd+K Global Search)
├── lib/                        # Core Utilities & Clients
│   ├── supabase/               # Supabase SSR Browser & Server Clients
│   ├── resend/                 # Email dispatch & templates
│   ├── seo/                    # Metadata & JSON-LD Builders
│   ├── data/                   # Content datasets & specs
│   └── zod/                    # Zod validation schemas
├── types/                      # TypeScript domain definitions
├── supabase/                   # Database Infrastructure
│   ├── migrations/             # 00001_initial_schema.sql (Tables & RLS policies)
│   └── seed.sql                # Production seed data
├── wrangler.json               # Cloudflare Pages deployment config
└── package.json
```

---

## Getting Started & Local Development

### 1. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_resend_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SMSAAD
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Setup (Supabase)

Run the SQL migration script located at `supabase/migrations/00001_initial_schema.sql` in your Supabase SQL Editor to initialize:
- Tables (`profiles`, `docs`, `guides`, `tools`, `resources`, `bookmarks`, `reading_history`, `newsletter_subscribers`, `contact_messages`, `seo`, `site_settings`, `audit_logs`).
- Row Level Security (RLS) policies.
- Profile trigger on `auth.users`.

---

## Deployment (Cloudflare Pages)

Build and deploy directly with Wrangler:

```bash
npx wrangler pages deploy .next
```

---

## Verification & Quality Assurance

- **Static Type Checking**: Zero TypeScript errors (`npm run build`)
- **Accessibility**: ARIA labels, semantic HTML tags, keyboard navigation (`Cmd+K`, `Esc`)
- **Performance**: Instant client-side search indexing and server component streaming.

---
