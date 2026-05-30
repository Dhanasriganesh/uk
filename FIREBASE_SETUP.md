# Firebase CMS Setup — ATS UK

- **Firestore** (Spark / free) — page text and **URL strings** only  
- **Firebase Storage** — requires **Blaze (pay-as-you-go)** on many projects; your console shows “Upgrade project” to use Storage  
- **Do not store videos as base64 in Firestore** — see below  

## Why not base64 in Firestore?

| Issue | Detail |
|--------|--------|
| **Size limit** | Each Firestore document is max **~1 MB** total |
| **Base64 overhead** | File grows ~33% when encoded |
| **Your videos** | A phone/screen recording MP4 is often **5–150 MB** |
| **Performance** | The whole site would download the entire video from Firestore on every visit |

So base64 works only for **very small** assets (tiny icons). It is **not** a solution for hero or product videos.

## What works without paying for Storage

### Option A — YouTube or Vimeo (easiest for hero video)

1. Upload the video to YouTube (unlisted is fine).  
2. Admin → **Home Hero** → paste the watch URL in `videoUrl`.  
3. **Save** — the site already embeds YouTube/Vimeo players.

### Option B — Ship the file with the website

1. Put `your-video.mp4` in `public/videos/` in the project.  
2. Commit, push, redeploy Vercel.  
3. Admin → set `videoUrl` to `/videos/your-video.mp4` → **Save**.  

Works on the live site; no Storage bucket needed.

### Option C — Enable Firebase Storage (Blaze)

1. Firebase Console → **Upgrade to Blaze** (pay-as-you-go; includes free usage, you only pay if you exceed quotas).  
2. Enable **Storage** → publish `storage.rules`.  
3. Vercel env: `FIREBASE_SERVICE_ACCOUNT_JSON` + `VITE_FIREBASE_STORAGE_BUCKET`.  
4. Then admin **Upload** on the live site works (server uploads to Storage, Firestore stores the HTTPS URL).

## Local development

`npm run dev` — **Upload** saves files to `public/media/` or `public/videos/` and stores paths like `/videos/file.mp4` in Firestore.

## Environment variables (`.env`)

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

`VITE_FIREBASE_STORAGE_BUCKET` is only needed if you use Storage (Blaze).

## Firestore rules

Publish `firestore.rules` for `cms_pages`, `cms_settings`, and `media`.

## Collections

- `cms_pages` — page JSON  
- `cms_settings` — global settings  
- `media` — `{ name, url, type, ... }` — **url must be a short link**, not file bytes  
