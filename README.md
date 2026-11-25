# EXHAIL // NATURE.exe

A static artist site starter with the supplied EXHAIL SVG logo, four supplied release artworks, a SoundCloud playlist embed, and an optional RSS relay for automatic release tiles.

## Preview locally

Open `index.html` in a browser. The four supplied release cards render immediately. The SoundCloud player needs an internet connection.

## Connect automatic SoundCloud updates

The browser cannot reliably read SoundCloud's RSS feed directly because of cross-origin restrictions. Deploy the small Worker in `worker/worker.js` as a separate Cloudflare Worker; it relays the public RSS feed and caches it for 10 minutes.

1. Sign in to Cloudflare and open **Workers & Pages**.
2. Create a Worker (for example `exhail-rss`).
3. Replace its starter code with `worker/worker.js` and deploy.
4. Copy its URL, ending in `/rss` (for example `https://exhail-rss.<your-subdomain>.workers.dev/rss`).
5. In `config.js`, set `rssProxy` to that full URL.
6. Deploy this folder as a Cloudflare Pages project. The site will use RSS artwork where present and show the local archive if the feed is temporarily unavailable.

The feed parser currently displays feed items only when an artwork URL can be extracted from SoundCloud's RSS item metadata. If SoundCloud changes its RSS structure or omits artwork for a track, that track will be skipped rather than shown with incorrect art. Confirm the live feed output after deployment.

## Deploy the site to Cloudflare Pages

1. Create a GitHub repository and upload the contents of this folder (not the outer ZIP folder).
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository. Use no framework preset, no build command, and `.` as the build output directory.
4. Deploy. Cloudflare assigns a free `*.pages.dev` address.

You can also use Cloudflare Pages direct upload if you prefer not to connect GitHub; GitHub is recommended as the source backup.

## Customize

- Main layout: `index.html`
- Styling: `styles.css`
- Release card behavior: `app.js`
- RSS relay URL: `config.js`
- Supplied artworks and master logo: `assets/`

The four local artwork files are preserved as supplied. Release links currently point to the EXHAIL playlist because individual track URLs were not supplied in the brief. Replace those links in `app.js` if you want direct track links before RSS is connected.
