# Yuvaraj Prudhvi — portfolio

Recruiter-facing portfolio site. Landing page plus a full case study for each of
the four hands-on reports (SIEM deployment, IAM lab, threat intelligence, APT
analysis).

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion.

Set as a printed case file: warm paper, ink, hairline rules, one vermillion accent.
Newsreader for display, IBM Plex Sans for text, IBM Plex Mono for metadata.

## Run it

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```

`npm run lint` for eslint.

## Where things live

| Path | What |
|---|---|
| `content/profile.ts` | Name, contact links, stats, tracks, skills, timeline, certifications |
| `content/projects.ts` | All four case studies as typed content blocks, plus the two side projects |
| `components/sections/` | Landing page sections |
| `components/case-study/blocks.tsx` | Renderers for each content block type (tables, ATT&CK matrix, attack-wave timeline, screenshots) |
| `components/ui/` | Design primitives — glass cards, chips, ambient background, scroll reveals |
| `app/work/[slug]/page.tsx` | Case study template, statically generated from `content/projects.ts` |
| `public/reports/` | Source PDFs offered as downloads |
| `public/shots/` | Redacted lab screenshots |
| `scripts/` | The PDF text/image extractor and the screenshot redaction script |

To edit copy, change `content/*.ts` — nothing else needs touching.

## Screenshots and redaction

`public/shots/` images were pulled out of the report PDFs and redacted before use.
Covered: the Okta tenant hostname, the org slug, browser tab titles exposing it,
the disposable test-account addresses, and Sumo Logic search-session URLs.

The CV at `public/reports/yuvaraj-prudhvi-cv.pdf` is generated, not hand-edited:

```bash
python3 scripts/build_cv.py public/reports/yuvaraj-prudhvi-cv.pdf
```

Edit the content in `scripts/build_cv.py` and re-run. It warns if the page overflows.

To regenerate the screenshots after changing the source PDFs:

```bash
python3 scripts/extract_pdf_assets.py /tmp/pdf-assets ~/Desktop/*.pdf ~/Downloads/*.pdf
```

```bash
python3 scripts/redact_screenshots.py /tmp/pdf-assets/images
```

The redaction boxes are hard-coded per image in `scripts/redact_screenshots.py`
and need rechecking if a source screenshot is replaced. `ffmpeg` is required.

> **Note on the PDFs in `public/reports/`** — these are the originals and their
> embedded screenshots are *not* redacted. The Okta report shows the tenant
> hostname and test-account addresses; the Sumo Logic report shows the lab VM
> hostname and Windows SIDs. Decide whether to keep them downloadable before
> deploying publicly.

## Deploy to Vercel

Nothing is published yet. When ready:

```bash
npx vercel --prod
```

First run links the project and asks a few questions; defaults are correct for a
Next.js app (no build config needed). Alternatively push to GitHub and import the
repo at vercel.com/new.

Before deploying, decide the PDF question above, and set the canonical URL in
`app/layout.tsx` metadata once the domain is known.
