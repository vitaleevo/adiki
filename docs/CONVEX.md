# Convex Integration

This project uses Convex to store commercial leads submitted through the contact form.

## What Is Connected

- `convex/schema.ts` defines the `leads` table.
- `convex/leads.ts` exposes:
  - `leads.create` for new contact/orcamento requests.
  - `leads.recent` for the latest leads, useful for future internal tooling.
- `app/actions/lead-actions.ts` validates form input on the server and calls Convex.
- `components/site/contact-form.tsx` submits the form through the server action.

## Environment

Set this variable locally and in Vercel:

```bash
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
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
- No admin dashboard, login, checkout, payments or cart were introduced.
