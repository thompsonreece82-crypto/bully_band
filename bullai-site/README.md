# BULLAÍ — interactive band website

A five-page, artwork-first site built from your original collages. It uses plain HTML/CSS/JavaScript, so **no hosting subscription, framework, database, build command or developer account is required beyond GitHub Pages**.

## Included pages

- `index.html` — original index collage, with working invisible clickable regions over **BIO**, **SOCIALS**, **EVENTS**, **MORE**. Touch to navigate; hover for neon highlights.
- `about.html` — green semi-transparent bio panel reading exactly **“Irish born, bred and feed collective”**.
- `socials.html` — clickable **INSTA**, **SPOTIFY**, **TikTok**, **LIVE** panels. They currently show a “coming soon” message and won't lead to any unrelated URL.
- `events.html` — scrollable purple events board, data-driven future dates, optional ticket links and an optional external events page button.
- `merch.html` — **COMING SOON** in an interactive translucent panel.
- `edit-events.html` — local/backstage events-file editor (not linked from the public navigation).

All non-home pages have **↶ INDEX** linking directly home. Original art remains the complete background. Light hand-drawn figures are isolated and float independently, drift towards the cursor nearby and cast momentary colour shadows. Motion is reduced when the operating-system “reduce motion” preference is enabled. All links and buttons are keyboard-accessible.

## Publish via GitHub Pages

1. Create a new public GitHub repository, for example `bullai-site`.
2. Upload **all the files and the `assets` folder** from this extracted folder. Keep the folder structure unchanged. The file `index.html` must be at the repository root.
3. Go to **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Your site will usually be published at `https://YOUR-USERNAME.github.io/bullai-site/`. A custom domain can be added later.

Open `index.html` locally for a quick preview. Fonts may vary when offline because they are loaded from Google Fonts; the site has local/system font fallbacks. Internet access is only needed for hosted fonts or any external links that you add later.

## Add social network links

Edit `assets/site-config.js` (in GitHub, open the file and click the pencil icon). Paste your official URLs inside the quotation marks, e.g.:

```js
window.BULLAI_CONFIG = {
  socials: {
    instagram: 'https://www.instagram.com/yourname/',
    spotify: 'https://open.spotify.com/artist/yourartistid',
    tiktok: 'https://www.tiktok.com/@yourname',
    live: 'https://www.songkick.com/artists/yourartistid'
  },
  eventsHubUrl: 'https://www.bandsintown.com/a/yourartistid'
};
```

The example URLs are **illustrations only**. Nothing is pre-linked. Save/commit the file and the relevant artwork lettering becomes an active external link. If you leave a URL empty, tapping the word shows “link coming soon”.

## Add events without editing code

1. Open `edit-events.html` (ideally from the deployed site so it loads your current published events).
2. Fill in the date, city, venue, optional door time and ticket link; click **+ ADD SHOW**. You can also edit or remove existing entries.
3. Click **↓ DOWNLOAD UPDATED EVENTS FILE**. This downloads an updated `events-data.js` file.
4. In your GitHub repository, navigate to `assets/events-data.js`, edit the file or upload a replacement containing the downloaded content, and **commit**. Changes appear on the live events page once GitHub Pages redeploys.

**Important:** Because GitHub Pages is static hosting, this editor does **not** write changes to the live site directly. Downloading/replacing the file is the publishing step; there is no insecure public-write/admin endpoint. You can alternatively edit `assets/events-data.js` directly, keeping the `window.BULLAI_EVENTS = [...]` format:

```js
window.BULLAI_EVENTS = [
  {
    date: '2027-02-20',
    city: 'Liverpool',
    venue: 'Example Venue',
    time: 'Doors 19:30',
    ticketUrl: 'https://example.com/tickets'
  }
];
```

Those dates and URLs are **examples, not announced Bullaí shows**. Only future events appear on the public page; old events remain in the editing file for management. Dates are displayed in UK format. An empty ticket URL hides the ticket button for that show.

### Optional external gig-list website

If you maintain dates elsewhere, set `eventsHubUrl` in `assets/site-config.js` to your Bandsintown, Songkick or ticketing page. The pink/purple **ALL DATES / TICKETS ↗** button on your Events page automatically opens it. Leave it blank while that page is not ready.

## Adjusting click zones

The link regions are placed as percentages over each original image. If you replace artwork or move lettering, edit the `.hotspot--bio`, `.hotspot--socials`, `.hotspot--events`, `.hotspot--more`, `.hotspot--instagram`, etc. rules in `assets/style.css`. Fine-tune their `left`, `top`, `width`, `height`, and `--rotate` values. The index artworks are 1067 × 1536, and the merch page is 1640 × 2360, both with essentially the same aspect ratio.

## Notes

- You own and supplied the original collage pages; those pages are stored in `assets/` unchanged.
- The floating sticker overlay images in `assets/cutouts/` are derivatives of the supplied collage pages, not unrelated stock art.
- No analytics, trackers, cookies, forms that collect personal data or external write access is included.
- The site uses light mouse effects and CSS animation without heavy web-video files.
