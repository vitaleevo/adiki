# Backoffice

The management area is available at `/backoffice/login`.

## Current Scope

- Dashboard with recent leads and media.
- Lead status management.
- Convex Storage image upload for JPG, PNG and WEBP up to 5MB.
- Product, category and blog post management.
- Basic contact/social settings stored in Convex.

## Credentials

Backoffice credentials are configured with environment variables:

```bash
BACKOFFICE_API_KEY=
BACKOFFICE_PASSWORD_HASH=
BACKOFFICE_SESSION_SECRET=
```

The generated local password is stored in `.backoffice-password.txt`, which is ignored by Git and Vercel.

## Image Storage

New website images should be uploaded through `Backoffice > Imagens`. The upload flow uses Convex Storage upload URLs, then saves metadata in `mediaAssets`.

When creating products, categories or blog posts, select an uploaded image from the Convex library instead of adding new public files to the repository.

## Production Checklist

- Set `NEXT_PUBLIC_CONVEX_URL` in Vercel to the production Convex URL.
- Set all `BACKOFFICE_*` variables in Vercel production.
- Set `BACKOFFICE_API_KEY` in Convex production.
- Rotate the password hash if the password is shared outside the trusted team.
