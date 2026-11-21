# Vincent Carandang Portfolio

A responsive, static portfolio built with semantic HTML, CSS, and vanilla JavaScript. It has no package dependencies, build step, contact form, or API backend.

## Files

- `index.html` contains the portfolio sections and navigation.
- `styles.css` contains the light and dark themes, responsive layouts, and motion/accessibility preferences.
- `script.js` handles the theme preference and mobile navigation.
- `Images/` contains the existing portrait and project images.
- `public/resume.pdf` is the resume PDF used by the preview, view, and download links.

## Run locally

Open `index.html` in a browser, or serve this folder with a static file server. For example:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy on Vercel

Import this repository as a static site. Use the repository root as the Root Directory, leave the Build Command empty, and serve the root directory as the output. No environment variables are required.
