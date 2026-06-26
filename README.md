# ThesisArcPro — Complete Project Documentation

**Live URL:** https://thesisarcpro.github.io/ThesisArcPro/  
**GitHub Repository:** https://github.com/ThesisArcPro/ThesisArcPro.git  
**Local Path:** `C:\Users\pc\Documents\thesisarcpro`

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Build & Deployment](#build--deployment)
6. [Key Features](#key-features)
7. [Database Schema (Supabase)](#database-schema-supabase)
8. [API & Edge Functions](#api--edge-functions)
9. [Components & Pages](#components--pages)
10. [Authentication Flow](#authentication-flow)
11. [Styling & Design System](#styling--design-system)
12. [Common Tasks](#common-tasks)

---

## Project Overview

**ThesisArcPro** is an academic writing services platform targeting students in the USA, UK, and Australia. The platform connects students with qualified writers for essays, dissertations, research papers, and other academic work.

### Key Goals
- Provide expert academic writing support across all education levels
- Manage client orders and writer assignments
- Real-time admin dashboard for order & writer management
- Secure payment processing via PayPal
- Real-time chat/messaging between clients, writers, and admin

### Users
- **Students/Clients** — place orders, track progress, chat with support
- **Writers** — view assignments, submit completed work, track earnings
- **Admin** — manage orders, writers, payments, and support conversations

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Astro 4.x | Static site generation with SSR, minimal JavaScript |
| **UI/CSS** | CSS3 (Vanilla) | Custom styling, no CSS framework |
| **Hosting** | GitHub Pages | Free static hosting, auto-deploy on push |
| **Backend/Database** | Supabase (PostgreSQL) | Real-time database, authentication, storage |
| **Authentication** | Supabase Auth | OAuth, email/password sign-up & login |
| **Real-time** | Supabase Realtime | Live chat, notifications, order updates |
| **File Storage** | Supabase Storage | Writer samples, client files, completed work |
| **Payment** | PayPal (manual verification) | Transaction ID validation via Supabase |
| **Email** | Google Apps Script | Order notifications, client updates |
| **Chat Widget** | Custom (Supabase-backed) | In-app messaging for support |
| **CI/CD** | GitHub Actions | Automated build & deploy on `main` push |

---

## Project Structure

```
thesisarcpro/
├── src/
│   ├── pages/                 # Astro pages (routes)
│   │   ├── index.astro        # Home page
│   │   ├── about.astro        # About page
│   │   ├── contact.astro      # Order form & contact
│   │   ├── login.astro        # User login
│   │   ├── signup.astro       # User registration
│   │   ├── dashboard.astro    # Client dashboard
│   │   ├── admin.astro        # Admin panel (orders)
│   │   ├── admin-writers.astro # Writer management
│   │   ├── writer-login.astro # Writer login
│   │   ├── writer-dashboard.astro # Writer workspace
│   │   ├── services.astro     # Services listing
│   │   ├── how-it-works.astro # Process explanation
│   │   ├── payment-policy.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── academic-integrity.astro
│   │   └── thank-you.astro    # Order confirmation
│   │
│   ├── components/            # Reusable Astro components
│   │   ├── Hero.astro         # Landing hero with carousel
│   │   ├── Benefits.astro     # Value proposition section
│   │   ├── HowItWorks.astro   # Process visualization
│   │   ├── Pricing.astro      # Pricing calculator
│   │   ├── WritersShowcase.astro # Writer profiles carousel
│   │   ├── StudentReviews.astro  # Testimonials
│   │   ├── FAQ.astro          # FAQ section
│   │   ├── Integrity.astro    # Academic integrity info
│   │   ├── ServiceLinks.astro # Service categories
│   │   ├── Header.astro       # Navigation header
│   │   ├── Footer.astro       # Footer links & info
│   │   ├── ChatWidget.astro   # In-app messaging widget
│   │   └── SocialProof.astro  # Trust badges
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro   # Main HTML template (DOCTYPE, head, meta)
│   │
│   ├── styles/
│   │   └── global.css         # Global CSS variables, typography, layout
│   │
│   ├── lib/
│   │   └── supabase.js        # Supabase client initialization
│   │
│   └── assets/
│       ├── images/            # Hero SVGs, logos, etc.
│       └── favicon/           # Brand icons
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions: build & deploy to GitHub Pages
│
├── astro.config.mjs           # Astro config (GitHub Pages, build options)
├── package.json               # Dependencies & npm scripts
├── tsconfig.json              # TypeScript config
└── dist/                      # Build output (generated by `npm run build`)
```

---

## Setup & Installation

### Prerequisites
- **Node.js** 18+ (recommended 20+)
- **npm** or **yarn**
- **Git**
- Supabase account (free tier available)
- GitHub account & repository access

### 1. Clone the Repository

```bash
git clone https://github.com/ThesisArcPro/ThesisArcPro.git
cd thesisarcpro
```

### 2. Install Dependencies

```bash
npm install
```

**Key dependencies** (inferred from project):
- `astro` — Static site generator
- `@supabase/supabase-js` — Supabase client library
- Standard web APIs (Fetch, Web Storage, etc.)

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://rehvwvujuamehoanfomj.supabase.co
PUBLIC_SUPABASE_ANON_KEY=sb_publishable_CKxnbue4T6cVn9BOIg8BkQ_kBNBiM_h

# Base URL (for GitHub Pages)
PUBLIC_BASE_URL=/ThesisArcPro

# Email Service (Google Apps Script)
PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxVL-dECKrdcEyyJObsP9KCQnRJ_TnmTT7qB6rvx-89cSmDbGIUKzviUAX83wPkYtZWzg/exec
```

### 4. Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing: `rehvwvujuamehoanfomj`
3. Go to **Settings → API** to copy:
   - `Project URL`
   - `Anon Public Key`
4. Create required tables (see [Database Schema](#database-schema-supabase))

### 5. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000` (or the port Astro displays).

---

## Build & Deployment

### Local Build

```bash
npm run build
```

This generates a `dist/` folder with static HTML, CSS, and JavaScript ready for deployment.

**Build output:** ~50-100 MB (includes all pages, components, and assets)

### Deploy to GitHub Pages

The project uses **GitHub Actions** for automatic deployment.

#### Setup (One-time)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **GitHub Actions runs automatically:**
   - Workflow file: `.github/workflows/deploy.yml`
   - Triggers on: push to `main` branch
   - Steps:
     - Checkout code
     - Install Node 22
     - `npm install`
     - `npm run build`
     - Upload `dist/` to GitHub Pages
     - Deploy to `https://thesisarcpro.github.io/ThesisArcPro/`

#### Manual Deployment

If you need to rebuild locally and push:

```bash
# Build
npm run build

# Commit the dist folder if needed
git add dist/
git commit -m "Update GitHub Pages build"
git push origin main
```

**Note:** GitHub Actions will re-run and redeploy automatically.

---

## Key Features

### 1. Order Management System
- **Dynamic pricing calculator** — pages, deadline, add-ons (graphics, sources, abstract)
- **PayPal transaction verification** — clients enter transaction ID to submit orders
- **Sequential ticket numbers** — automatic order numbering via Supabase function
- **Order status tracking** — new → in-progress → in-review → completed
- **File uploads** — clients upload instructions, writers submit completed work

### 2. Writer Management
- **Writer profiles** — display on homepage carousel with photo, rating, specialties
- **Writer dashboard** — view assigned orders, submit work, track earnings
- **Account creation** — admin can create writer accounts with email/password
- **Skills & specializations** — searchable by subject, education level, expertise

### 3. Admin Dashboard
- **Order management panel** — view all orders, filter by status, search by client/topic
- **Real-time order updates** — update status, assign writers, upload files
- **Writer management** — add/edit writers, manage accounts, view profiles
- **Admin inbox** — real-time chat with clients, writers, and support conversations
- **Analytics** — total orders, revenue collected, pending tasks

### 4. Client Dashboard
- **My Orders** — track submitted orders, view status, download completed work
- **Order History** — past orders, ratings, invoices
- **Payment Tracking** — deposit vs. full payment status
- **Support Chat** — message support team in real-time

### 5. Real-time Chat & Notifications
- **Client ↔ Support** — in-app messaging widget
- **Order Updates** — automatic notifications on status changes
- **Writer Assignment** — writers notified when order is assigned to them
- **File Delivery** — clients notified when work is uploaded

### 6. Authentication & Authorization
- **Supabase Auth** — email/password signup, OAuth (Google, GitHub optional)
- **Role-based access** — client, writer, admin roles
- **Protected routes** — dashboard, order pages, admin panel require login
- **Session persistence** — login state saved in browser

### 7. SEO & Marketing
- **Open Graph metadata** — rich previews on social media
- **Schema markup** — structured data for search engines
- **Sitemap & robots.txt** — automatic SEO setup
- **Canonical tags** — prevent duplicate content issues
- **Mobile-responsive design** — all pages adapt to mobile/tablet/desktop

---

## Database Schema (Supabase)

### Core Tables

#### 1. `users` (Supabase Auth)
Managed by Supabase Auth — stores email, password hash, auth tokens.

```
id (UUID)           — User ID
email (text)        — Email address
created_at          — Sign-up timestamp
```

#### 2. `profiles`
Extended user info (not created by default — you must create this).

```
id (UUID)           — User ID (foreign key to users)
full_name (text)    — Display name
email (text)        — Email (duplicate for querying)
role (text)         — 'client', 'writer', 'admin'
is_admin (boolean)  — Admin flag
created_at          — Profile creation time
```

#### 3. `writers`
Writer profiles and qualifications.

```
id (int)            — Primary key
auth_user_id (UUID) — Link to users table
full_name (text)    — Writer name
email (text)        — Email (optional)
photo_url (text)    — Supabase Storage URL
specialties (text)  — Comma-separated subjects
bio (text)          — Short bio
credentials (text)  — Degrees, certifications
education_level (text) — Master's, PhD, etc.
years_experience (int)  — Years in field
rating (decimal)    — Average rating (5.0 max)
completed_orders (int)  — Total orders completed
highlights (text)   — Key achievements
sample_url (text)   — Link to sample work
sample_name (text)  — Sample document title
is_active (boolean) — Visible on site
created_at          — Registration timestamp
```

#### 4. `orders`
Client orders.

```
id (UUID)           — Primary key
order_number (int)  — Sequential ticket ID
client_email (text) — Client email
client_id (UUID)    — Link to users (optional)
writer_id (int)     — Assigned writer
topic (text)        — Essay/paper title
assignment_type (text) — Essay, dissertation, etc.
subject (text)      — Subject area
service (text)      — Type of service
language (text)     — English, Spanish, etc.
education_level (text) — High school, Bachelor's, etc.
pages (int)         — Number of pages
deadline (timestamp) — Due date/time
instructions (text) — Client requirements
total_amount (decimal) — Full price
amount_paid (decimal) — Deposit or full payment
payment_status (text) — 'Paid in Full', '50% Deposit Paid'
order_status (text) — 'new', 'in_progress', 'completed', etc.
file_url (text)     — Completed work URL
revision_note (text) — Revision requests
transaction_id (text) — PayPal transaction ID
status_updated_at   — Last status change
created_at          — Order placement time
updated_at          — Last modification
```

#### 5. `conversations`
Support chat threads.

```
id (UUID)           — Primary key
type (text)         — 'support' or 'order'
title (text)        — Conversation title
order_id (UUID)     — Link to order (if type='order')
created_at          — Started timestamp
updated_at          — Last message timestamp
```

#### 6. `conversation_participants`
Who's in each conversation.

```
id (UUID)           — Primary key
conversation_id (UUID) — Link to conversation
user_id (UUID)      — Participant user ID
role (text)         — 'client', 'writer', 'admin', 'support'
display_name (text) — Name to show in chat
created_at          — Joined timestamp
```

#### 7. `messages`
Chat messages.

```
id (UUID)           — Primary key
conversation_id (UUID) — Which conversation
sender_id (UUID)    — Who sent it
sender_name (text)  — Display name
sender_role (text)  — 'client', 'writer', 'support'
content (text)      — Message text
created_at          — Sent timestamp
```

### Storage Buckets

#### 1. `completed-files` (private)
Uploaded work files, organized by order.

```
Path: {order_number}/{filename}
Access: Client (downloader), Writer (uploader), Admin (both)
```

#### 2. `writer-photos` (public)
Writer profile pictures.

```
Path: {timestamp}_{filename}
Access: Public (readable), Admin (writable)
```

#### 3. `writer-samples` (public)
Sample work documents.

```
Path: {timestamp}_{filename}
Access: Public (readable), Admin (writable)
```

### Row Level Security (RLS) Policies

**Key policies** (manage who can see/edit what):

- **profiles**: Clients see their own, admins see all
- **writers**: Everyone reads, only admins write
- **orders**: Clients see own orders, assigned writers see assigned orders, admins see all
- **conversations**: Participants see their conversations
- **messages**: Only participants can read/write

---

## API & Edge Functions

### Supabase Edge Functions (Deno)

#### 1. `create-writer-account`
Creates a writer user account.

```bash
POST /functions/v1/create-writer-account
{
  "email": "writer@example.com",
  "password": "secure123",
  "writer_id": 5,
  "token": "thesisarcpro_action_2026"
}

Response:
{
  "user_id": "uuid...",
  "email": "writer@example.com"
}
```

#### 2. `submit-order` (via Google Apps Script)
Sends order confirmation email.

```bash
POST https://script.google.com/macros/s/.../exec
{
  "clientEmail": "student@example.com",
  "topic": "Climate Change Essay",
  "totalPrice": "$150.00",
  "ticketId": "001",
  "instructions": "..."
}
```

### RPC Functions

#### `next_ticket()`
Generates sequential order ticket number.

```sql
SELECT next_ticket();  -- Returns: 1, 2, 3, ...
```

---

## Components & Pages

### Pages

| Page | Path | Purpose | Auth Required |
|------|------|---------|---|
| Home | `/` | Landing page, hero, features | No |
| About | `/about/` | Company story, mission, values | No |
| Services | `/services/` | Service offerings | No |
| How It Works | `/how-it-works/` | Process explanation | No |
| Contact/Order | `/contact/` | Order form, pricing calculator | Yes |
| Login | `/login/` | Email/password login | No |
| Signup | `/signup/` | Registration form | No |
| Client Dashboard | `/dashboard/` | View orders, track status | Yes |
| Writer Login | `/writer-login/` | Writer login | No |
| Writer Dashboard | `/writer-dashboard/` | View assignments, upload work | Yes (writers) |
| Admin Panel | `/admin/` | Manage orders, writers, chat | Yes (admin only) |
| Admin Writers | `/admin-writers/` | Add/edit writer profiles | Yes (admin only) |
| Payment Policy | `/payment-policy/` | Payment terms | No |
| Privacy Policy | `/privacy/` | Privacy terms | No |
| Terms of Service | `/terms/` | Legal terms | No |
| Academic Integrity | `/academic-integrity/` | Plagiarism policy | No |
| Thank You | `/thank-you/` | Order confirmation page | Yes |

### Key Components

#### Hero.astro
- Landing page hero section
- Headline, subheading, CTA button
- Trust bar with stats (2,000+ students, 98% satisfaction, 3hr deadlines)
- **New feature:** Writer carousel (Swiper.js) showing top writers with ratings

#### WritersShowcase.astro
- Displays writers with photos, ratings, specialties
- Horizontal carousel (swipeable on mobile)
- Links to hire specific writers

#### Pricing.astro
- Dynamic price calculator
- Inputs: pages, deadline, service type
- Outputs: base price, urgency surcharge, add-ons, total
- **Urgency tiers:** <6h (+50%), 6-12h (+30%), 12-24h (+20%), 1-2 days (+10%)

#### Header.astro
- Navigation bar with logo, menu
- Auth-gated links (login/contact)
- Mobile hamburger menu (CSS-based)

#### ChatWidget.astro
- Real-time support chat
- Supabase Realtime subscription
- Floating button, expandable panel
- Shows recent conversations & allows new support requests

#### AdminPanel (admin.astro)
- Order grid/list with status badges
- Filter by status, search by client/topic
- Modal to update order (status, file upload, writer assignment)
- Real-time chat inbox with support conversations
- Dark mode toggle

#### AdminWriters (admin-writers.astro)
- Grid of writer cards with photo, bio, specialties
- Modal to add/edit writer
- Photo & sample upload to Supabase Storage
- Account creation for writers (via edge function)

---

## Authentication Flow

### Client Sign-Up & Login
1. User goes to `/signup/`
2. Enter email, password, full name
3. Supabase Auth creates account in `users` table
4. Profile created in `profiles` table with role='client'
5. User redirected to dashboard
6. Session stored in browser (Supabase Auth token)

### Writer Login
1. Writer receives email with credentials from admin
2. Goes to `/writer-login/` (same as `/login/` with role check)
3. Supabase Auth verifies credentials
4. Writer ID linked via `writers.auth_user_id`
5. Redirected to `/writer-dashboard/`

### Admin Access
1. Login as user with email `thesisarcpro069@gmail.com`
2. System checks `profiles.is_admin = true`
3. Access to `/admin/` and `/admin-writers/`
4. Non-admins redirected to `/dashboard/`

### Auth-Gated Links
- Links with `auth-gate` class check for active session
- If logged in: route to `/contact/` or `/dashboard/`
- If not logged in: route to `/login/`

---

## Styling & Design System

### Global CSS Variables (in `global.css`)

```css
--navy: #1B2A4A           /* Primary brand color */
--navy-light: #243558     /* Lighter navy */
--gold: #C5A059           /* Accent color */
--gold-light: #D4B47A     /* Lighter gold */
--white: #FFFFFF          /* Text/background */
--off-white: #F8F6F1      /* Subtle background */
--text-dark: #1A1A2E      /* Dark text */
--text-mid: #4A5568       /* Medium text */
--text-light: #718096     /* Light text */

--font-heading: 'Playfair Display', Georgia, serif
--font-body: 'Source Sans 3', sans-serif
--max-width: 1200px
--section-padding: 5rem 2rem
```

### Responsive Breakpoints

```css
Mobile:    < 480px
Tablet:    480px - 768px
Desktop:   > 768px
Large:     > 1024px
```

### Typography

- **H1:** Clamp(2rem, 5vw, 3.5rem) — scales with viewport
- **H2:** Clamp(1.5rem, 3vw, 2.5rem)
- **Body:** 16px base, 1.7 line-height
- **Font-weight:** 400 (body), 600 (bold), 700-800 (headings)

---

## Common Tasks

### Add a New Page
1. Create file in `src/pages/{page-name}.astro`
2. Import `BaseLayout` for template:
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   ---
   <BaseLayout title="Page Title" description="Meta description">
     <!-- Page content -->
   </BaseLayout>
   ```
3. Push to GitHub → automatic deploy

### Update Writer Carousel
1. Edit `src/components/Hero.astro` (writer carousel section)
2. Carousel fetches writers from Supabase on page load
3. Shows writers sorted by `completed_orders DESC`
4. Only displays writers with `is_active = true`
5. Push changes → rebuild & deploy

### Modify Admin Dashboard
1. Edit `src/pages/admin.astro`
2. Inline JavaScript handles:
   - Fetching orders via REST API
   - Updating order status
   - File uploads to Supabase Storage
   - Real-time chat via Supabase channels
3. Test locally: `npm run dev` → `http://localhost:3000/admin/`
4. Push to deploy

### Add New Order Add-On
1. Edit `src/pages/contact.astro` (Pricing calculator section)
2. Add to `addons` object in JavaScript:
   ```javascript
   const addons = {
     graphics: 0,      // Qty
     sources: 0,       // Qty
     abstract: 0,      // Qty
     // Add here:
     references: 0,    // New add-on
   };
   
   const addonPrices = {
     graphics: 5,
     sources: 4,
     abstract: 7,
     references: 3,    // Price per unit
   };
   ```
3. Rebuild & deploy

### Change Branding Colors
1. Edit `src/styles/global.css`
2. Update CSS variables:
   ```css
   --navy: #NEW_COLOR;
   --gold: #NEW_ACCENT;
   ```
3. Changes apply site-wide
4. Push to deploy

### Deploy Manually (Force)
```bash
# Rebuild locally
npm run build

# Force push
git add .
git commit -m "Force rebuild"
git push -f origin main

# GitHub Actions will redeploy
```

### Debug Production Issues
1. Check GitHub Actions logs: https://github.com/ThesisArcPro/ThesisArcPro/actions
2. View live site at: https://thesisarcpro.github.io/ThesisArcPro/
3. Check browser console (F12) for JS errors
4. Verify Supabase connection in browser Network tab
5. Check Supabase dashboard for database/auth errors

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist/
npm install
npm run build
```

### Blank Pages in Production
- Check `PUBLIC_BASE_URL` in `.env.local` (should be `/ThesisArcPro`)
- Verify Supabase credentials
- Check browser console for JavaScript errors

### Writer Carousel Not Showing
- Ensure writers exist in Supabase with `is_active = true`
- Check that `photo_url` is a valid image URL
- Verify Supabase query permissions (RLS policies)

### Chat Widget Not Working
- Check Supabase connection in browser DevTools
- Verify user is logged in
- Check for browser console errors
- Ensure Supabase Realtime is enabled

### Payment Verification Fails
- PayPal transaction ID must be 8-20 alphanumeric characters
- Verify transaction hasn't been used before (check Supabase `orders` table)
- Check Google Apps Script logs for email delivery issues

---

## Performance & Optimization

### Current Stats
- **Page load:** ~2-3 seconds (GitHub Pages + Supabase)
- **Bundle size:** ~50-100 MB (all static files)
- **SEO Score:** Excellent (Lighthouse 90+)
- **Mobile friendly:** Yes (responsive design)

### Optimizations Applied
- Astro static generation (no server overhead)
- CSS variables (reusable styling)
- Lazy image loading
- Minified production build
- Sitemap & robots.txt for SEO

---

## Support & Contacts

**Admin Email:** thesisarcpro069@gmail.com  
**Live Chat:** Available on all pages  
**GitHub Issues:** https://github.com/ThesisArcPro/ThesisArcPro/issues  

---

## License & Terms

This project is proprietary. All code, design, and content are owned by ThesisArcPro. Unauthorized reproduction or commercial use is prohibited.

---

**Last Updated:** June 26, 2026  
**Maintained By:** Japheth (Lead Developer)  
**Next Review:** Quarterly
