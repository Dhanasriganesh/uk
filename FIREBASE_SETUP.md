# Firebase CMS Setup — ATS UK

Uses **Firestore** for page content and a **`media` collection** for short media URLs only.

- **No Firebase Storage**
- **No base64** in the database
- Files live on your site (`public/media/`, `public/videos/`) or on a CDN; Firestore stores the URL string

## 1. Environment variables

Copy `.env.example` to `.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Restart the dev server after saving: `npm run dev`

## 2. Firebase Console

1. **Authentication** → enable **Email/Password** → add admin user
2. **Firestore Database** → create database
3. You do **not** need Firebase Storage

## 3. Firestore security rules (required)

Firebase Console → **Firestore** → **Rules** → paste from `firestore.rules` → **Publish**

| Collection | Read | Write |
|------------|------|-------|
| `cms_pages` | Public | Admin (signed in) |
| `cms_settings` | Public | Admin |
| `media` | Public | Admin (short URLs only) |
| `cms_media` | Public | Admin (legacy — migrate then ignore) |

## 4. Admin panel

| URL | Purpose |
|-----|---------|
| `/admin/login` | Sign in |
| `/admin` | Dashboard — **Seed defaults** (pages + media URLs) |
| `/admin/pages/{pageId}` | Edit content |
| `/admin/media` | Add / seed media URLs |

### CLI seed (pages + `media` collection)

1. Create an **Email/Password** admin in Firebase Auth.
2. Add to `uk/.env`:
   ```
   SEED_ADMIN_EMAIL=you@example.com
   SEED_ADMIN_PASSWORD=your-password
   ```
3. Publish `firestore.rules` (includes `media` collection).
4. Run from `uk/`:

   ```bash
   npm run seed:local
   ```

This writes default page content to `cms_pages`, settings to `cms_settings/global`, and short media URLs to the **`media`** collection. Files must live under `public/media/` and `public/videos/` on the site.

## 5. Media workflow

1. **Admin → Media Library → Upload file** (images & videos)
   - **Local dev (`npm run dev`):** files save to `public/media/` or `public/videos/` → `/media/photo.jpg`
   - **Production (Vercel):** uploads go through **`/api/admin/upload`** (server-side Firebase Storage) so browser CORS does not block large videos
2. Or paste an existing URL, or click **Seed local media**
3. Copy the URL into page fields (`imageUrl`, `videoUrl`, etc.)

Publish **`storage.rules`** in Firebase Console (same as `uk/storage.rules`) so signed-in admins can upload.

### Production uploads on Vercel (required)

In Vercel → **Project → Settings → Environment Variables**, add:

| Variable | Value |
|----------|--------|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full JSON from Firebase Console → Project settings → Service accounts → Generate new private key (paste as one line) |
| `FIREBASE_STORAGE_BUCKET` | Same as `VITE_FIREBASE_STORAGE_BUCKET` (e.g. `your-project.firebasestorage.app`) |
| `VITE_FIREBASE_API_KEY` | Same as in `.env` (used to verify admin login on upload) |

Redeploy after saving env vars.

### Storage CORS (if browser uploads still fail)

If uploads fall back to the browser SDK, configure the bucket once (Google Cloud SDK):

```bash
gcloud storage buckets update gs://YOUR_BUCKET_NAME --cors-file=storage.cors.json
```

Replace `YOUR_BUCKET_NAME` with your `VITE_FIREBASE_STORAGE_BUCKET` value. Add your exact Vercel preview URL to `storage.cors.json` if needed.

### Fix a broken hero video URL

If the home page video URL in Firestore looks like `.../o?name=cms%2F...` (upload API shape, not a file link), open **Admin → Home Hero**, upload again or paste a valid URL (`/videos/…` or a full `…?alt=media&token=…` link), then **Save**.

## 6. Firestore collections

- `cms_pages` — page JSON content
- `cms_settings` — global settings
- `media` — `{ name, url, type, source, uploadedBy, createdAt }` (url is always a short string)
