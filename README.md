# Sirkku Muotka — portfolio site

Next.js frontend with an embedded [Sanity](https://sanity.io) Studio.

## Setup

1. `npx sanity login` then `npx sanity init --project-name "Sirkku Muotka" --dataset production --output-path /dev/null` to get a Project ID.
2. Copy `.env.local.example` to `.env.local`, set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET=production`. Add `RESEND_API_KEY` for contact form emails.
3. `npm install && npm run dev` — site at `/`, Studio at `/studio`.

## Structure

- `/` homepage, `/works` selected works (tabbed by category), `/contacts` contact form, `/studio` Sanity Studio
- Content types: Artwork, Homepage, Contact Page, Site Settings (all editable in the Studio)

## Deploy

Push to Vercel and set the same env vars there. Sanity hosts the content/CMS; no separate server needed. To give the client editor access, invite their email with the **Editor** role in [sanity.io/manage](https://sanity.io/manage).
