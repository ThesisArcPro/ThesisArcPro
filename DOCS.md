# ThesisArcPro — Technical Documentation

> Generated from direct review of actual source files (not chat memory).
> Last updated: July 2026
> Status: **Partial** — sections marked 🔲 TODO still need source files reviewed.

---

## 1. Stack & Infrastructure

| Layer | Technology |
|---|---|
| Framework | Astro 6.4.2 |
| Hosting | GitHub Pages, via GitHub Actions (`.github/workflows/deploy.yml`) |
| Database/Auth | Supabase (project ref: `rehvwvujuamehoanfomj`) |
| Backend functions | Supabase Edge Functions (Deno) |
| Real-time bidding | Node.js + Socket.io (local dev: port 3001, production: Render — pending) |
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
| `id` | bigint primary key |
| `order_number` | e.g. `T-1024` |
| `client_email` | |
| `topic`, `assignment_type`, `subject`, `service`, `language` | |
| `pages` | integer |
| `deadline` | timestamp |
| `instructions` | text |
| `education_level` | |
| `total_amount`, `amount_paid` | numeric |
| `payment_status` | e.g. `"50% Deposit Paid"`, `"Paid in Full"` |
| `order_status` | `new`, `in_progress`, `in_review`, `completed`, `revision`, `cancelled`, `open_for_bids` |
| `transaction_id` | PayPal txn ID, checked for uniqueness |
| `file_url` | Google Drive link to completed work (legacy admin flow) |
| `writer_id` | bigint FK → `writers.id` |
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
| `id` | bigint |
| `auth_user_id` | FK → Supabase auth user |
| `full_name` | |

### `bids`
| Column | Type | Notes |
|---|---|---|
| `id` | bigint | primary key |
| `order_id` | bigint | FK → orders.id |
| `writer_id` | bigint | FK → writers.id |
| `bid_price` | numeric | |
| `estimated_delivery` | timestamptz | nullable |
| `note` | text | proposal message |
| `status` | text | `pending`, `accepted`, `rejected` |
| `created_at` | timestamptz | |
| `seen` | boolean | |

### `order_files`
| Column | Notes |
|---|---|
| `id` | |
| `order_id`, `order_number` | |
| `file_type` | e.g. "Final Copy", "Revision", "AI Report" |
| `file_name`, `file_path` | Supabase Storage path, bucket `completed-files` |
| `uploaded_by` | e.g. `"writer"` or `"client"` |
| `created_at` | |

### `reviews`
| Column | Notes |
|---|---|
| `order_number`, `client_email`, `client_id` | |
| `rating` | 1–5 |
| `review_text` | optional |

### `conversations`
| Column | Notes |
|---|---|
| `id` | uuid |
| `type` | `order`, `support` |
| `order_id` | bigint nullable |
| `title` | text |
| `updated_at` | timestamptz |

### `conversation_participants`
| Column | Notes |
|---|---|
| `conversation_id` | uuid |
| `user_id` | uuid |
| `role` | `writer`, `client`, `support` |
| `display_name` | text |

### `messages`
| Column | Notes |
|---|---|
| `id` | uuid |
| `conversation_id` | uuid |
| `sender_id` | uuid |
| `sender_name` | text |
| `sender_role` | text |
| `content` | text |
| `created_at` | timestamptz |

🔲 **TODO:** confirm actual schema via Supabase SQL Editor — this is inferred from query/insert code only, not verified directly.

---

## 3. Authentication & Access Control

- **Signup** (`signup.astro`): `supabase.auth.signUp()` + manual insert into `profiles`.
- **Login** (`login.astro`): `supabase.auth.signInWithPassword()` → always redirects to `/dashboard/`, regardless of role.
- **Admin check**: happens *inside* `/admin/` page, not at login. Admin logs in via the same `/login/`, lands on `/dashboard/` first, must navigate to `/admin/` manually, where `profiles.is_admin` is checked client-side and non-admins are bounced to `/dashboard/`.
- **Writers**: separate login at `/writer-login/`. Writer dashboard checks `writers.auth_user_id` against the session.

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
5. Client pays via static PayPal link, then manually enters the PayPal **Transaction ID** back into the form.
6. **Transaction ID validation** (currently client-side):
   - Regex format check: `/^[A-Z0-9]{8,20}$/i`
   - Queries `orders?transaction_id=eq.<id>` via REST with the anon key to check for reuse
7. On confirm: ticket number generated, submits to Google Apps Script and Supabase `orders` table.
8. Order saved with `order_status: 'open_for_bids'` — immediately visible to all writers for bidding.
9. Socket.io broadcasts `order:new` event to all online writers instantly.

---

## 5. Real-Time Bidding System (RTB)

### Architecture
```
[Astro Frontend] <---> [Node.js + Socket.io :3001] <---> [Supabase PostgreSQL]
```

### Bidding Server (`bidding-server/src/index.js`)
- **Stack:** Node.js v24, Express, Socket.io 4, pg, dotenv
- **Port:** 3001 (local), Render (production — pending deployment)
- **Run:** `cd bidding-server && npm run dev`

### Socket.io Events
| Event | Direction | Description |
|---|---|---|
| `writer:online` | writer → server | Writer joins their room |
| `client:online` | client → server | Client joins their room |
| `bid:join` | any → server | Join order bidding room |
| `bid:submit` | writer → server | Submit bid → saved to DB → broadcast to client |
| `bid:new` | server → client | New bid appeared on their order |
| `bid:accept` | client → server | Accept a bid |
| `bid:accepted` | server → writer | Their bid was accepted |
| `bid:closed` | server → room | Bidding closed for this order |
| `order:new` | client → server | New order posted → broadcast to all writers |
| `order:available` | server → writers | New order available to bid on |

### Health check
```
GET http://localhost:3001/health
→ { status: 'ok', onlineWriters: N, onlineClients: N }
```

### Environment (`.env` in `bidding-server/`)
```env
PORT=3001
CLIENT_URL=https://thesisarcpro.com
JWT_SECRET=...
DB_HOST=aws-0-us-east-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.rehvwvujuamehoanfomj
DB_PASSWORD=...
```

### Client-side connection (both dashboards)
```js
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001', { transports: ['websocket'] });
```
⚠️ **Must update URL to Render live URL after deployment.**

---

## 6. Supabase RLS Policies

### `bids` table policies
```sql
-- Writers can read, insert, update bids
CREATE POLICY "writers_read_own_bids" ON bids FOR SELECT USING (true);
CREATE POLICY "writers_insert_bids" ON bids FOR INSERT WITH CHECK (true);
CREATE POLICY "writers_update_own_bids" ON bids FOR UPDATE USING (true);

-- Clients can read and update bids on their own orders
CREATE POLICY "clients_read_bids_on_own_orders" ON bids FOR SELECT USING (
  order_id IN (SELECT id FROM orders WHERE client_email = (auth.jwt() ->> 'email'))
);
CREATE POLICY "clients_update_bids_on_own_orders" ON bids FOR UPDATE USING (
  order_id IN (SELECT id FROM orders WHERE client_email = (auth.jwt() ->> 'email'))
);
```

### `open_orders_for_writer` RPC
```sql
-- Shows all open_for_bids orders to a writer, excluding ones they already bid on
CREATE OR REPLACE FUNCTION open_orders_for_writer(p_writer_id bigint)
RETURNS TABLE (id bigint, order_number text, topic text, ...)
AS $$
  SELECT o.* FROM orders o
  WHERE o.order_status = 'open_for_bids'
  AND o.writer_id IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM bids b
    WHERE b.order_id = o.id AND b.writer_id = p_writer_id
  )
  ORDER BY o.created_at DESC;
$$;
```

### `place_bid` RPC
```sql
-- Inserts a bid, prevents duplicate bids (ON CONFLICT updates instead)
-- Validates order must be 'open_for_bids'
CREATE OR REPLACE FUNCTION place_bid(
  p_order_id bigint, p_writer_id bigint, p_bid_price numeric,
  p_estimated_delivery timestamptz, p_note text
) RETURNS bids ...
```

---

## 7. Dashboard Changes (July 2026)

### Client Dashboard (`dashboard.astro`)

**Integrated Chat Panel:**
- Clicking Chats now opens a built-in two-panel chat UI (conversation list + thread)
- Support chat widget remains separate and untouched
- My Orders restores the orders view
- Dark mode fully supported

**Live Bids Tab:**
- Every order modal now has a 🔥 Live Bids tab
- Shows all writer proposals with price, message, timestamp
- Accept button: updates bid → rejects others → updates order via `update-order-status` Edge Function → notifies writer via Socket.io

**Open for Bids Tab:**
- Separate tab added to show orders with `order_status = 'open_for_bids'`
- Distinct from In Progress tab

**TypeScript fixes:**
- All `querySelector` results properly cast to `HTMLElement`
- `get-orders` response typed as `{ orders: any[]; error?: string }`

### Writer Dashboard (`writer-dashboard.astro`)

**Available Orders redesign:**
- Matches EssayPro style: status badge, pages, type, ID, deadline, price
- Click opens full order detail modal

**Order detail modal:**
- Two-panel layout: order details (left) + real-time chat (right)
- Client info bar: client ID + last seen
- **General tab:** upload completed work (file type selector + file upload + uploaded files list + Mark as In Review button)
- **Instructions tab:** order details grid + description
- **Files tab:** client-attached files with download links
- Chat auto-loads when modal opens

**Proposal system:**
- `showBidModal()`: Instructions tab + Make Proposal tab
- Proposal form: price (min = order budget) + message only
- `showProposalDetail()`: clicking My Proposals items shows bid detail
- My Proposals shows pending/accepted/rejected tabs with counts

**Dark mode:** fully supported throughout all new UI

---

## 8. Pages Reference

### Public marketing pages
| Page | Notes |
|---|---|
| `index.astro` (homepage) | 🔲 TODO |
| `services.astro` | 6 service rows, all CTAs auth-gated |
| `about.astro` | Mission, stats, values — auth-gated CTA |
| `how-it-works.astro` | 3-step process, guarantees grid |
| `academic-integrity.astro` | Policy content + sidebar CTA |
| `privacy.astro`, `terms.astro`, `payment-policy.astro` | Static policy pages |
| `contact.astro` | Order form — see Section 4 |
| `thankyou.astro` | ⚠️ Currently unreachable — see Known Issues #3 |

### Auth
| Page | Notes |
|---|---|
| `login.astro` | Email/password via Supabase Auth |
| `signup.astro` | Creates auth user + `profiles` row |
| `writer-login.astro` | 🔲 TODO |

### Dashboards / Admin
| Page | Notes |
|---|---|
| `dashboard.astro` | Client dashboard — integrated chat, live bids, open for bids tab |
| `writer-dashboard.astro` | Writer dashboard — bidding, proposals, order modal with chat |
| `admin.astro` | Admin panel — all orders, status update, file URL paste |
| `admin-writers.astro` | 🔲 TODO |
| `writers.astro` | 🔲 TODO |
| `order-updated.astro` | 🔲 TODO |

---

## 9. Supabase Edge Functions

### `get-orders`
- Returns all orders for the authenticated user (or all orders if admin)
- Uses service role key internally
- Called by client dashboard on load

### `update-order-status`
- Called by admin panel and client dashboard (bid accept flow)
- Requires secret token: `thesisarcpro_action_2026`
- Updates by `order_number` (not id)
- Sends email notification on `completed` status via Apps Script
- Parameters: `?orderId=&status=&token=&fileUrl=` (query params, GET request)

### `submit-order` / `verify-payment`
- Earlier-iteration code, **currently bypassed** by the live frontend
- See Known Issues #1

---

## 10. Known Issues / Inconsistencies

1. **🔴 Security gap — payment verification done client-side instead of server-side.**
   `contact.astro` checks transaction ID reuse via a direct REST query using the anon key, from the browser. A proper server-side `verify-payment` Edge Function already exists but isn't being called.

2. **🟡 Ticket numbers are not guaranteed unique or sequential.**
   Generated as `T-${1000 + countData.length}` — race condition risk with simultaneous orders.

3. **🟡 `thankyou.astro` is currently unreachable.**
   Order submission redirects straight to `/dashboard/`, never to `/thankyou/`.

4. **🟡 Blog posts have no site navigation.**
   Only wrapped in `BaseLayout`, without `<Header />` or `<Footer />`.

5. **🟡 No role-based redirect at login.**
   Admins and clients both land on `/dashboard/` after login.

6. **🟢 Duplicate script blocks in `Header.astro`.**
   Two `<script>` tags both declare `burger`/`nav` — redundant but not broken.

7. **🟡 Sitemap doesn't exclude `/writer-login/` or `/writer-dashboard/`.**

8. **🟢 Dead code**: `Welcome.astro`, `assets/astro.svg`, `assets/background.svg` — unused Astro starter leftovers, safe to delete.

9. **🟢 Two independent dark-mode systems** — OS-driven on public pages vs. manual toggle on dashboards. Not a bug, but worth noting.

10. **🟡 Bidding server URL hardcoded to `localhost:3001`** in both dashboards — must be updated to Render live URL after deployment.

11. **🟡 Bidding server not yet deployed to Render.** Currently only runs locally. Writers and clients on the live site cannot use real-time bidding until this is deployed.

---

## 11. Pending / Next Steps

- [ ] Deploy bidding server to Render free tier
- [ ] Set up UptimeRobot to ping server every 5 mins (keep alive, free)
- [ ] Update Socket.io URL from `localhost:3001` to Render live URL in both dashboards and `contact.astro`
- [ ] Writer dashboard order modal — finalize two-panel layout proportions
- [ ] Anti-leakage chat filter (block phone numbers, emails, WhatsApp in messages)
- [ ] Escrow/payment flow (Phase 3)
- [ ] Fix `README.md` — has unresolved Git merge conflict (`<<<<<<< HEAD` visible in repo)
- [ ] Exclude `/writer-login/` and `/writer-dashboard/` from sitemap
- [ ] Consider centralizing the auth-gate pattern (currently duplicated in 8 places)
- [ ] Switch payment verification to use `verify-payment` Edge Function instead of client-side anon key check

---

## 12. How to Keep This Updated

When a file changes meaningfully, update the relevant section above rather than letting this drift out of date. If a new inconsistency is found, add it to Section 10 rather than silently fixing it without a record — these notes are what make the next debugging session faster.

**Git workflow:**
```bash
git add .
git commit -m "Description of change"
git pull origin main --rebase
git push
```

**Local dev:**
```bash
# Terminal 1 — Astro frontend
npm run dev

# Terminal 2 — Bidding server
cd bidding-server && npm run dev
```
