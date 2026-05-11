# Convex Integration

This project uses Convex to store commercial leads, backoffice content records and uploaded media metadata.

## What Is Connected

- `convex/schema.ts` defines `leads`, `mediaAssets`, `products`, `categories`, `blogPosts` and `siteSettings`.
- `convex/leads.ts` exposes:
  - `leads.create` for new contact/orcamento requests.
  - `leads.recent` for the latest leads, useful for future internal tooling.
- `convex/backoffice.ts` exposes protected admin mutations/queries for the backoffice and a public read-only content query.
- `app/actions/lead-actions.ts` validates form input on the server and calls Convex.
- `components/site/contact-form.tsx` submits the form through the server action.
- `app/backoffice` contains the protected management area.

## Environment

Set these variables locally and in Vercel:

```bash
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
BACKOFFICE_API_KEY=strong-random-secret
BACKOFFICE_PASSWORD_HASH=scrypt:...
BACKOFFICE_SESSION_SECRET=strong-random-secret
```

Set `BACKOFFICE_API_KEY` in Convex as well:

```bash
npx convex env set BACKOFFICE_API_KEY
npx convex env set BACKOFFICE_API_KEY --prod
```

## First-Time Convex Setup

Run this after logging into Convex:

```bash
npx convex dev
```

The command configures `CONVEX_DEPLOYMENT`, sets `NEXT_PUBLIC_CONVEX_URL`, regenerates `convex/_generated`, and pushes the Convex functions to the development deployment.

For production, set `NEXT_PUBLIC_CONVEX_URL` in Vercel and deploy Convex functions:

```bash
npx convex deploy
```

## Security Notes

- The form is validated server-side before writing to Convex.
- Name, company, phone, email and message are length-limited before storage.
- A hidden honeypot field silently blocks simple spam bots.
- Backoffice actions require a signed HttpOnly session cookie.
- Protected Convex functions also require `BACKOFFICE_API_KEY`.
- Uploaded media is stored in Convex Storage; only selected public content returns image URLs to visitors.
- No checkout, payments, cart or customer login were introduced.
