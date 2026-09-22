# Sirkku Muotka — portfolio site

Next.js frontend with an embedded [Sanity](https://sanity.io) Studio for content editing.

## Stack

- **Frontend:** Next.js (App Router), Tailwind CSS
- **CMS:** Sanity, embedded at `/studio` (no separate app to host)
- **Hosting:** Vercel (frontend) + Sanity's own cloud (content + images/CDN)
- **Contact form:** Resend

## One-time project setup

1. **Create a Sanity project** (needs a free sanity.io account):
   ```bash
   npx sanity login
   npx sanity init --project-name "Sirkku Muotka" --dataset production --output-path /dev/null
   ```
   This prints a **Project ID** — you don't need the extra files it may offer to scaffold.

2. **Set environment variables.** Copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<from step 1>
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Install dependencies and run:**
   ```bash
   npm install
   npm run dev
   ```
   - Site: http://localhost:3000
   - Studio (admin panel): http://localhost:3000/studio

4. **Add starter content in the Studio:**
   - Fill in `Site Settings`, `Homepage`, and `Contact Page` (each is a singleton — one document each).
   - Add a few `Artwork` entries, picking one of the three fixed categories, to preview the Works page tabs.

5. **Contact form email delivery:** create a free [Resend](https://resend.com) account, get an API key, and set `RESEND_API_KEY` in `.env.local` (and in Vercel's env vars for production). Set the recipient address on the `Contact Page` document in the Studio (`Form recipient email`).

## Content model

- **Artwork** — title, category (fixed choice: Installation Views / Wood Ventures / Collage & Aquarelle — locked in the schema, not free text, so it can't drift from the tabs on the Works page), year, material, dimensions, description, image, display order.
- **Homepage** — bio text, hero image, exhibition video URL (paste a YouTube/Vimeo link), media caption.
- **Contact Page** — public email, form recipient email, social links.
- **Site Settings** — site title (browser tab), sidebar name (the Caveat-font brand text).

## URL structure

- `/` — homepage (bio + exhibition video/image)
- `/works` — Selected Works, with client-side tabs for the three categories (no separate URL per category, matching the approved design)
- `/contacts` — contact form
- `/studio` — Sanity Studio (admin login)

## Deployment

Deploy the repo to Vercel and set the environment variables from `.env.local.example` (including `RESEND_API_KEY`) in the Vercel project settings. Vercel builds and hosts the Next.js app; Sanity's cloud hosts the content and images — no separate CMS server to manage.

## Granting the client editor access

In [sanity.io/manage](https://sanity.io/manage) → your project → Members, invite the client's email with the **Editor** role. That role can create/edit/delete documents but can't change the schema or project settings.
