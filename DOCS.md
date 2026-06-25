# ThesisArcPro — Technical Documentation

> Generated from direct review of actual source files (not chat memory).
> Last updated: June 2026
> Status: **Partial** — sections marked 🔲 TODO still need source files reviewed.

---

## 1. Stack & Infrastructure

| Layer | Technology |
|---|---|
| Framework | Astro 6.4.2 |
| Hosting | GitHub Pages, via GitHub Actions (`.github/workflows/deploy.yml`) |
| Database/Auth | Supabase (project ref: `rehvwvujuamehoanfomj`) |
| Backend functions | Supabase Edge Functions (Deno) |
| Order spreadsheet | Google Sheets via Apps Script Web App |
| Payments | PayPal (manual transaction ID entry, no PayPal API integration) |
| Live chat | Tidio (global, loaded in `BaseLayout.astro`) + custom WhatsApp/email popup |
| Node version | ≥22.12.0 |

### Astro config (`astro.config.mjs`)
```js
site: 'https://thesisarcpro.github.io'
base: '/ThesisArcPro'
trailingSlash: 'always'
```
**This is why every internal link must use the pattern:**
```astro
const base = '/ThesisArcPro';
href={`${base}/page-name/`}
```
Sitemap excludes: `/admin/`, `/dashboard/`, `/login/`, `/signup/`, `/thankyou/`.
⚠️ **Not excluded but probably should be:** `/writer-login/`, `/writer-dashboard/` — currently indexable by search engines.

### Deployment (`deploy.yml`)
- Triggers on push to `main` or manual dispatch
- Node 22, `npm install` → `npm run build` → uploads `./dist` → deploys to GitHub Pages

### Supabase client (`src/lib/supabase.js`)
```js
const supabaseUrl = 'https://rehvwvujuamehoanfomj.supabase.co'
const supabaseKey = 'sb_publishable_...' // anon/publishable key — safe to expose client-side
export const supabase = createClient(supabaseUrl, supabaseKey)
```
Single shared client, imported via `import { supabase } from '../lib/supabase.js'` everywhere.

---

## 2. Database Schema (inferred from code — not confirmed against live schema)

### `orders`
| Column | Notes |
|---|---|
| `id` | primary key |
| `order_number` | e.g. `T-1024` |
| `client_email` | |
| `topic`, `assignment_type`, `subject`, `service`, `language` | |
| `pages` | integer |
| `deadline` | timestamp |
| `instructions` | text |
| `education_level` | |
| `total_amount`, `amount_paid` | numeric |
| `payment_status` | e.g. `"50% Deposit Paid"`, `"Paid in Full"` |
| `order_status` | `new`, `in_progress`, `in_review`, `completed`, `revision`, `cancelled` |
| `transaction_id` | PayPal txn ID, checked for uniqueness |
| `file_url` | Google Drive link to completed work (legacy admin flow) |
| `writer_id` | FK → `writers.id` |
| `revision_note` | client's revision request text |
| `status_updated_at`, `created_at` | timestamps |

### `profiles`
| Column | Notes |
|---|---|
| `id` | matches `auth.users.id` |
| `email`, `full_name`, `phone` | |
| `client_id` | used for reviews |
| `is_admin` | boolean, gates `/admin/` |

### `writers`
| Column | Notes |
|---|---|
| `id` | |
| `auth_user_id` | FK → Supabase auth user |
| `full_name` | |

### `order_files`
| Column | Notes |
|---|---|
| `id` | |
| `order_id`, `order_number` | |
| `file_type` | e.g. "Final Copy", "Revision", "AI Report" |
| `file_name`, `file_path` | Supabase Storage path, bucket `completed-files` |
| `uploaded_by` | e.g. `"writer"` |
| `created_at` | |

### `reviews`
| Column | Notes |
|---|---|
| `order_number`, `client_email`, `client_id` | |
| `rating` | 1–5 |
| `review_text` | optional |

🔲 **TODO:** confirm actual schema via Supabase SQL Editor — this is inferred from query/insert code only, not verified directly.

---

## 3. Authentication & Access Control

- **Signup** (`signup.astro`): `supabase.auth.signUp()` + manual insert into `profiles`.
- **Login** (`login.astro`): `supabase.auth.signInWithPassword()` → always redirects to `/dashboard/`, regardless of role.
- **Admin check**: happens *inside* `/admin/` page, not at login. Admin logs in via the same `/login/`, lands on `/dashboard/` first, must navigate to `/admin/` manually, where `profiles.is_admin` is checked client-side and non-admins are bounced to `/dashboard/`.
- **Writers**: separate login at `/writer-login/` (🔲 current version not yet reviewed — see TODO). Writer dashboard checks `writers.auth_user_id` against the session.

⚠️ **UX inconsistency**: there's no role-based redirect at the point of login — admin-ness is only checked after landing on the client dashboard and manually visiting `/admin/`.

---

## 4. Order Flow (current, as implemented in `contact.astro`)

1. Client must be logged in (`checkAuth()` redirects to `/login/` otherwise). Email auto-fills, read-only.
2. Client fills order form — topic, type, subject, service, language, education level, deadline (with quick-select buttons: 3h/6h/9h/12h/1d/2d/5d), pages, citation style, sources, add-ons, instructions, optional file upload.
3. **Price calculation** (live, client-side):
   - Base rate by education level: High School $12/pg, College $13/pg, Masters $14/pg, PhD $15/pg
   - Urgency surcharge: <6h +50%, 6–12h +30%, 12–24h +20%, 24–48h +10%
   - Add-ons: Graphics & Tables $5 ea, Printable Sources $4 ea, Abstract $7 ea, Plagiarism/AI Report (free)
4. Click **"Create Order"** → validates required fields → opens payment modal showing total and amount due now (50% deposit if total ≥ $30, full amount otherwise).
5. Client pays via static PayPal link (`paypal.com/ncp/payment/X4GBU659AGXGQ`), then manually enters the PayPal **Transaction ID** back into the form.
6. **Transaction ID validation** (currently client-side, see Known Issues #1):
   - Regex format check: `/^[A-Z0-9]{8,20}$/i`
   - Queries `orders?transaction_id=eq.<id>` via REST with the **anon key** to check for reuse
7. On confirm: ticket number generated as `T-` + count of existing orders (not a true sequential ID — see Known Issues #2). Submits to:
   - Google Apps Script Web App (writes to Google Sheet) — fire-and-forget, `mode: 'no-cors'`
   - Supabase `orders` table directly via REST POST (anon key, requires active session)
8. Redirects to `/dashboard/` — **does not** pass through `/thankyou/` (see Known Issues #3).

---

## 5. Pages Reference

### Public marketing pages
| Page | Notes |
|---|---|
| `index.astro` (homepage) | 🔲 TODO — not yet reviewed (file gathered was actually `blog/index.astro`) |
| `services.astro` | 6 service rows, all CTAs auth-gated |
| `about.astro` | Mission, stats, values, "why us" — auth-gated CTA |
| `how-it-works.astro` | 3-step process, guarantees grid — uses full semantic theme tokens |
| `academic-integrity.astro` | Policy content + sidebar CTA |
| `privacy.astro`, `terms.astro`, `payment-policy.astro` | Static policy pages, consistent styling, all reference PayPal/50% deposit terms correctly |
| `contact.astro` | Order form — see Section 4 |
| `thankyou.astro` | ⚠️ Currently unreachable from the live order flow — see Known Issues #3 |

### Blog
| Page | Notes |
|---|---|
| `blog/index.astro` | Lists 5 posts as cards |
| 5 blog post pages | SEO-focused long-form content. **Do not include `<Header />` or `<Footer />`** — only wrapped in `BaseLayout`. No site navigation visible to a visitor landing on a post. |

### Auth
| Page | Notes |
|---|---|
| `login.astro` | Email/password via Supabase Auth |
| `signup.astro` | Creates auth user + `profiles` row |
| `writer-login.astro` | 🔲 TODO — current version not reviewed |

### Dashboards / Admin
| Page | Notes |
|---|---|
| `dashboard.astro` | Client order list. **This looks like an older/simpler version** — no review popup, no revision workflow, no theme toggle, queries `orders` directly by `client_email` rather than via Edge Function. The richer dashboard discussed earlier in this project (reviews, revisions, dark/light/system theme) has not yet been located as an actual file in this codebase — 🔲 **needs clarification: does it exist under a different filename, or is dashboard.astro mid-upgrade?** |
| `writer-dashboard.astro` | 🔲 TODO — current saved version not reviewed (only versions discussed earlier in chat) |
| `admin.astro` | Simple admin panel — all orders, tab filter by status, modal to update `order_status` + paste a Google Drive `file_url`. Gated by `profiles.is_admin`. |
| `admin-writers.astro` | 🔲 TODO — not yet reviewed |
| `writers.astro` | 🔲 TODO — not yet reviewed |
| `order-updated.astro` | 🔲 TODO — not yet reviewed |

### Components
| Component | Notes |
|---|---|
| `Header.astro` | Session-aware (Login/Logout toggle), mobile burger menu. Minor cleanup: duplicate `<script>` blocks both declaring `burger`/`nav`. |
| `Footer.astro` | Links to all policy pages, services, contact |
| `Hero.astro`, `Services.astro`, `HowItWorks.astro`, `Integrity.astro` | All follow the **auth-gate pattern** (see below) |
| `Testimonials.astro` | Static content, no auth-gate, no Supabase calls |
| `Welcome.astro` | ⚠️ Dead file — leftover Astro starter template, not imported anywhere. Safe to delete along with `assets/astro.svg` and `assets/background.svg`. |
| `WritersShowcase.astro`, `Pricing.astro`, `FAQ.astro`, `SocialProof.astro`, `StudentReviews.astro`, `ServiceLinks.astro`, `ChatWidget.astro` | 🔲 TODO — not yet reviewed |

### The "auth-gate" pattern
Repeated independently in `Hero.astro`, `HowItWorks.astro`, `Integrity.astro`, `Services.astro`, `about.astro`, `academic-integrity.astro`, `how-it-works.astro`, `services.astro` — each with its **own uniquely-named class** (`.auth-gate`, `.auth-gate-hiw`, `.auth-gate-integrity`, `.auth-gate-services`, `.auth-gate-page`) and its **own inline `<script>`** block doing the same thing:
```js
const { data: { session } } = await supabase.auth.getSession();
btns.forEach(btn => btn.setAttribute('href', session ? `${base}/contact/` : `${base}/login/`));
```
Not centralized. Works fine, but any future change to this logic must be repeated in 8 separate places.

---

## 6. Theming — Two Separate Systems ⚠️

This is an important architectural point: **the site has two unrelated dark-mode systems that don't talk to each other.**

1. **Public marketing pages** (`global.css`): dark mode is driven by `@media (prefers-color-scheme: dark)` — i.e. the **visitor's OS/browser setting**. There is no manual toggle. A visitor with a dark-mode OS will see the public site in dark mode whether they want to or not, with no way to override it.
2. **Dashboards** (client/writer): dark mode is driven by a manual icon + popup (Dark/Light/System), stored in `localStorage` under the key `dashboard-theme`, applied via a `body.dark-mode` class. Completely independent of the OS-level system above.

Brand tokens (`global.css`):
- Navy `#1B2A4A`, Gold `#C5A059`
- Headings: Playfair Display — Body: Source Sans 3
- Semantic tokens used in newer pages: `--bg-body`, `--bg-section-alt`, `--bg-card`, `--card-border`, `--heading-color`, `--body-color`, `--muted-color`

🔧 **Astro scoping gotcha** (confirmed bug, already fixed once during this project): any CSS targeting HTML that is injected at runtime via `innerHTML` (e.g. `.order-row`, `.om-*` modal classes) **must** use `<style is:global>`, not a plain `<style>` tag — Astro's default scoping hash never applies to dynamically-injected markup, so plain `<style>` rules silently do nothing.

---

## 7. Supabase Edge Functions

### `submit-order`
- CORS locked to `https://thesisarcpro.github.io`
- Generates a random ticket number (`T-` + random 4 digits) and returns it
- **⚠️ Does not write to the database.** Just logs and returns a number.
- **Not currently called by `contact.astro`** — the live order flow writes directly to `orders` via REST instead.

### `verify-payment`
- CORS open (`*`)
- Validates transaction ID format server-side
- Checks for duplicate `transaction_id` in `orders` using the **service role key** (proper server-side check)
- **Not currently called by `contact.astro`** — the live flow does this same check client-side using the anon key instead.

Both functions are deployed (`config.toml`, `verify_jwt = false`) but appear to be **earlier-iteration code that the frontend has since bypassed**. See Known Issues #1.

---

## 8. Known Issues / Inconsistencies

1. **🔴 Security gap — payment verification done client-side instead of server-side.**
   `contact.astro` checks transaction ID reuse via a direct REST query using the anon key, from the browser. A proper server-side `verify-payment` Edge Function already exists (using the service role key) but isn't being called. Recommend switching `contact.astro` to call `verify-payment` instead of querying `orders` directly.

2. **🟡 Ticket numbers are not guaranteed unique or sequential.**
   `contact.astro` generates `T-${1000 + countData.length}` based on the *current count* of all orders at submission time. Two near-simultaneous orders could generate the same ticket number (race condition). The unused `submit-order` function generates a random number instead, which has its own collision risk. Neither approach guarantees uniqueness.

3. **🟡 `thankyou.astro` is currently unreachable.**
   It's built to read a `?ticket=` query param and Tidio chat trigger, but the live order submission in `contact.astro` redirects straight to `/dashboard/`, never to `/thankyou/`. Either restore the redirect or remove the unused page.

4. **🟡 Blog posts have no site navigation.**
   All 5 blog posts + blog index only wrap content in `BaseLayout`, without `<Header />` or `<Footer />`. A reader has no way to navigate to the rest of the site except the browser back button.

5. **🟡 No role-based redirect at login.**
   Admins and clients both land on `/dashboard/` after login; admin status is only checked if/when the admin manually navigates to `/admin/`.

6. **🟢 Duplicate script blocks in `Header.astro`.**
   Two separate `<script>` tags both declare `burger`/`nav` — redundant but not currently broken.

7. **🟡 `dashboard.astro` appears to be an older/simpler version** of the client dashboard than what's been discussed and built in recent work sessions (no reviews, no revision flow, no theme toggle). Needs clarification — see Section 5.

8. **🟡 Sitemap doesn't exclude `/writer-login/` or `/writer-dashboard/`**, unlike other private routes.

9. **🟢 Dead code**: `Welcome.astro`, `assets/astro.svg`, `assets/background.svg` are unused Astro starter leftovers, safe to delete.

10. **🟢 Two independent dark-mode systems** (OS-driven on public pages vs. manual toggle on dashboards) — not a bug, but worth being aware of so future styling work doesn't assume they're connected.

---

## 9. 🔲 TODO — Not Yet Documented

- [ ] Real homepage `src/pages/index.astro`
- [ ] Components: `WritersShowcase.astro`, `Pricing.astro`, `FAQ.astro`, `SocialProof.astro`, `StudentReviews.astro`, `ServiceLinks.astro`, `ChatWidget.astro`
- [ ] `src/pages/writer-login.astro` (current saved version)
- [ ] `src/pages/writer-dashboard.astro` (current saved version)
- [ ] `src/pages/writers.astro`
- [ ] `src/pages/admin-writers.astro`
- [ ] `src/pages/order-updated.astro`
- [ ] Confirm whether a richer client dashboard (reviews/revisions/theme toggle) exists under a different filename, or needs to be built/finished
- [ ] Actual Supabase database schema, confirmed via SQL Editor (current schema section is inferred from code only)
- [ ] Google Apps Script source (lives in Google Sheets → Extensions → Apps Script, not in this repo)
- [ ] `package-lock.json` — not reviewed (not needed for documentation purposes, dependency lockfile only)
- [ ] `README.md` — currently has an **unresolved Git merge conflict** (`<<<<<<< HEAD` visible in repo). Should be fixed.

---

## 10. How to Keep This Updated

When a file changes meaningfully, update the relevant section above rather than letting this drift out of date. If a new inconsistency is found (like the auth-gate duplication or the unused Edge Functions), add it to Section 8 rather than silently fixing it without a record — these notes are what make the next debugging session faster.
