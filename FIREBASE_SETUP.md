# Firebase CMS Setup — ATS UK

Uses **Firestore only** for content and images. Images are stored as **base64 data URLs** in the `cms_media` collection. Firebase Storage is **not used**.

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
3. You do **not** need Firebase Storage for this CMS

## 3. Firestore security rules (required)

Firebase Console → **Firestore** → **Rules** → paste from `firestore.rules` → **Publish**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    match /cms_pages/{pageId} {
      allow read: if true;
      allow write: if isSignedIn();
    }

    match /cms_settings/{docId} {
      allow read: if true;
      allow write: if isSignedIn() && docId == 'global';
    }

    match /cms_media/{mediaId} {
      allow read: if true;
      allow write: if isSignedIn();
    }
  }
}
```

| Collection | Read | Write |
|------------|------|-------|
| `cms_pages` | Public | Admin (signed in) |
| `cms_settings` | Public | Admin |
| `cms_media` | Public | Admin (base64 images) |

## 4. Admin panel

| URL | Purpose |
|-----|---------|
| `/admin/login` | Sign in |
| `/admin` | Dashboard |
| `/admin/pages/{pageId}` | Edit content |
| `/admin/media` | Upload images (Firestore base64) |

After login, use **Seed defaults to Firestore** once to load initial content.

## 5. Images vs videos

| Type | How to manage |
|------|----------------|
| **Images** | Upload in admin (max ~750 KB) → saved as base64 in `cms_media` → copy URL into `imageUrl` fields |
| **Videos** | Paste a URL in text fields (`videoUrl`, etc.) — e.g. `/videos/file.mp4`, YouTube, or CDN. Not uploaded to Firestore |

## 6. Firestore collections

| Collection | Document | Content |
|------------|----------|---------|
| `cms_pages` | `home`, `about`, `capping`, … | `{ content: {...}, updatedAt, updatedBy }` |
| `cms_settings` | `global` | Footer, contact, logo URL |
| `cms_media` | auto ID | `{ name, url, dataUrl, type, size, … }` |

## 7. Troubleshooting

### `permission-denied`

Publish Firestore rules (section 3) and sign in at `/admin/login`.

### Image upload fails / too large

- Max size ~750 KB per image (Firestore 1 MiB document limit)
- Use JPG/PNG/WebP, not HEIC
- Compress large images before upload

### Admin cannot save

Sign in at `/admin/login`. Rules must allow `write: if request.auth != null`.
