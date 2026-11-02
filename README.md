# Shared Subs - Local Manager

Static, local-first web app to manage shared family-plan subscriptions.

No server. No account. No cost. Data stays in your browser.

## What it does

- Subscriptions with total cost, currency, and charge day (default day 1).
- Exact contacts per subscription with international phone format.
- Exact message template per subscription with variables:
  `{name}` `{amount}` `{service}` `{month}`
- Monthly view with per-person amount, WhatsApp `wa.me` link per contact, and paid/pending ticks.
- Export and import JSON backups.

## Privacy model for a public repo

- The repository contains code and fake example contacts only.
- Real contacts live only in `localStorage` under `sharedSubs.v1` on each device.
- Never commit real numbers. Example numbers use the `3460000000x` range.
- Use Export for personal backups and keep those files out of git.

## Run locally

Use any static server from the project root:

```bash
npx serve .
# or
python -m http.server 4173
```

Open `http://localhost:4173` or `http://localhost:3000` depending on the tool.

You can also open `index.html` directly, but a local server is closer to GitHub Pages behavior.

## Deploy to GitHub Pages

1. Push this folder to a public GitHub repository.
2. Open repository Settings, Pages, Source: Deploy from branch, Branch: `main`, Folder: `/ (root)`.
3. Open the published URL on your phone and select Add to Home Screen.
4. Add your real subscriptions and contacts on the phone. They stay on that device.

The `.nojekyll` file keeps Pages serving files as-is.

## Design notes

- Mobile-first, single column at 360px, no horizontal scroll.
- Touch targets at least 44px, body text at least 16px.
- Two font families maximum with `display=swap`.
- Contrast target 4.5:1 for text, reduced motion respected.
- Icons are inline SVG, no emoji icons.

## Verification

Structural checks:

```bash
node -e "for (const f of ['index.html','styles.css','app.js']) { require('fs').accessSync(f); console.log('ok', f); }"
```

Optional visual check with Playwright:

```bash
npx playwright install chromium --with-deps
npx playwright screenshot --viewport-size="375,800" --full-page http://localhost:4173 verify-375.png
npx playwright screenshot --viewport-size="768,1024" --full-page http://localhost:4173 verify-768.png
npx playwright screenshot --viewport-size="1024,768" --full-page http://localhost:4173 verify-1024.png
npx playwright screenshot --viewport-size="1440,900" http://localhost:4173 verify-1440.png
```

Read the PNG files back and confirm no overflow, no empty sections, and no overlapping text. If 375px fails, fix before shipping.
