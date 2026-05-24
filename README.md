# Lyrics Workbench

Static lyrics and chord reference site built with Astro. Songs live in the repo as Markdown files, so your editing flow is simply: add or update a song file, commit, push, and rebuild.

## Requirements

- Node 24 or newer
- npm 11 or newer

If you use `nvm`, run `nvm use` from the repo root.

## Commands

Run these from the project root:

| Command | Purpose |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local Astro dev server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the built site locally |

## Song Authoring

Add songs under `src/content/songs/`. A nested artist folder keeps URLs clean, for example:

```text
src/content/songs/
	craig-harbor/
		first-light.md
	elm-street-parade/
		northbound.md
```

Use this structure for each song:

```md
---
title: Your Song Title
artist: Artist Name
duration: 3:24
bpm: 92
capo: 2
chords:
	- G
	- D
	- Em
	- C
notes: Any reminders about arrangement, rhythm, or capo placement.
key: G
tuning: Standard
tags:
	- acoustic
	- set-one
---
First lyric line
Second lyric line

Chorus lyric line
Another chorus line
```

Notes:

- Put lyrics in the Markdown body, one lyric line per line.
- Leave a blank line between sections to create visual spacing in song and play views.
- `capo` can be a number or a string like `None`.
- `duration` is required in `m:ss` format and is used as the baseline scroll timing.
- `bpm` is required and should be a positive whole number.
- `notes`, `key`, and `tags` are optional.

## Routes

The build generates these pages from your content files:

- `/` for the searchable song library
- `/artist/<artist-slug>/` for artist group pages
- `/song/<artist-folder>/<song-file>/` for the full song sheet
- `/play/<artist-folder>/<song-file>/` for the focused performance view

## Playback View

The play page is designed for tablet or phone use:

- Large lyric text
- Continuous auto-scroll based on total song duration
- Adjustable speed multiplier around the song-duration baseline
- Tap any lyric line to jump that line closer to center

## Publishing

This project builds to plain static files in `dist/`, so it can be deployed to GitHub Pages, Netlify, Cloudflare Pages, or any static host.

For a repo-driven workflow:

1. Add or edit song Markdown files.
2. Run `npm run build` locally.
3. Commit and push.
4. Let your static host rebuild and publish.

### GitHub Pages

GitHub Pages is the easiest one-click option from VS Code because a normal push can trigger deployment automatically.

This repo now includes [deploy-pages.yml](.github/workflows/deploy-pages.yml), which will build and publish the site whenever you push to `main`.

Setup once in GitHub:

1. Push this repo to GitHub.
2. Open the repository settings.
3. Go to Pages.
4. Set the source to GitHub Actions.
5. Push to `main` from VS Code whenever you want to publish.

From that point on, your one-click workflow in VS Code is effectively your normal Git push or sync action.

Notes:

- If this is a project repo like `lyrics`, the site will publish under `/lyrics/` automatically on GitHub Pages.
- If you later use a custom domain or a different base path, set `DEPLOY_BASE` in the deployment environment.

### HostGator

HostGator can host this because it is just static files, but it is usually less convenient than GitHub Pages for push-to-publish.

Manual HostGator workflow:

1. Run `npm run build`.
2. Upload the contents of `dist/` to your HostGator web root, usually `public_html/`.
3. If the site lives in a subfolder, set `DEPLOY_BASE` before building so links resolve correctly.

Example for a subfolder deploy:

```sh
DEPLOY_BASE=/lyrics npm run build
```

If you want HostGator to be one-click too, the usual path is to keep GitHub Actions and add an FTP deploy step that uploads `dist/` to HostGator after every push. That works, but it requires storing FTP credentials in GitHub secrets.
