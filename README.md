# AJG Therapeutics LLC

Website for AJG Therapeutics LLC, a Bronx-based provider of trauma-informed group facilitation, workshops, and trainings for youth, fathers, and violence prevention across NYC. Founder: Alam Gonzalez, MSW, CASAC-T.

Next.js 16 (App Router), TypeScript, Tailwind CSS 3. All media is self-hosted in `public/media`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Art direction: "Into the light"

Warm ink and bone, with the original brand's signal yellow as the light and action color. Clay is used for small accents on light surfaces. Type pairs a condensed, heavy Archivo (institutional and procurement-ready) with Instrument Serif italic (the human voice used in transformations and testimonials). The mark is a circle of light, standing for the healing circle and the spotlight.

## Pages

| Route | Job |
| --- | --- |
| `/` | Scroll film hero, who we serve, the three pillars, founder, testimonials, recent work, procurement band |
| `/programs` | Full deliverables for the three pillars, service lines, settings |
| `/schools-agencies` | Vendor ID, NYC MBE certification, COI, cycle lengths, formats, deliverables, capability statement |
| `/about` | Mission, vision, founder credentials, the 2012 CHCF letter, award, upcoming group |
| `/work` | Dated timeline, field work, Project Beauty, letters, affiliations |
| `/contact` | Quote form (opens a pre-filled email to info@ajgtherapeuticsllc.com) and ways to support |

Every business fact lives in `src/lib/site.ts`.

## The scroll film

`src/lib/components/scroll-film.tsx` drives a live WebGL2 particle field (`src/lib/components/light-field.ts`) from native scroll position. There is no video and no generated footage; every frame is drawn in real time. Scroll is never hijacked.

- 13,000 particles (7,000 on small screens), each with a home in six hand-built formations: shattered shards (pain), a rising column (power), still ripples (accountability), a whole sphere (healing), a coil unwinding into a rising line (futures), and men seated in a joined circle around a centre light, the brand mark (brotherhood).
- Scroll picks the pair of formations and how far between them each particle is. Particles leave on staggered beats and swirl mid-flight, and colour warms from cold grey to the brand yellow. A slow sway and pointer parallax keep it alive between scrolls.
- Chapter copy scrolls natively over a sticky stage, placed so each chapter's text crosses the viewport centre as its formation lands. A strike-through and word swap are driven by a CSS variable.
- The render loop runs only while the section is on screen and the tab is visible. Device pixel ratio is capped at 1.75.
- Fallbacks: with no JavaScript, `prefers-reduced-motion`, or no WebGL2, each chapter renders as its own panel with completed copy over a static glow that warms through the story.

## Media pipeline

```bash
bash scripts/fetch-media.sh /tmp/ajg-media                    # downloads every media file the Canva export references
python3 -I scripts/prepare-media.py /tmp/ajg-media public/media
```

## Content notes and open items

- Source: the scraped Canva export in `raw messy data/`. The page text lives in the bootstrap JSON, and the media was fetched from `ajgtherapeuticsllc.com/_assets/media/`. All-caps copy was converted to sentence case and typos were corrected ("safetY", "BECUASE", "TESTIMONALS", "LEADSHERSHIP", "INNVOATION").
- The original site had no logo, only default Canva icons. The circle mark and wordmark are new and should be confirmed with the client.
- The Men's Leadership Group was announced for February 2026 with location and time TBD. The site says exactly that and asks visitors to contact for the schedule. Update it when details are known.
- A "2017" heading in the source had no recoverable context and was omitted.
- The phone number and NYC MBE certification come from the client intake form (2026-10-09); the scrape had said MWBE pending. No street address is given, so none is shown.
- "Request a quote" has no backend. The form validates, then opens the visitor's email app. Connect a form service if the client wants submissions stored.
- The capability statement links to the Google Doc from the source. The client should confirm its sharing permissions.
