I can’t restyle the inside of Spotify’s embedded iframe to fully match the 8-bit site theme because Spotify controls that UI. The cleanest result is to remove the embed and use a themed pixel button that links directly to Mr. Millennium’s Spotify artist page.

Plan:
1. Remove the Spotify iframe from the Work page and Contact page.
2. Add a pixel-styled Spotify button using the existing red/purple site theme.
3. Keep the Instagram button linked to `faceofmillennium`.
4. Run a production build to confirm everything still compiles.

Technical details:
- Spotify URL: `https://open.spotify.com/artist/6KB8jy3ACCfQn1BOR90Stq`
- Files to update: `src/routes/work.tsx`, `src/routes/contact.tsx`
- No backend, database, or authentication changes needed.