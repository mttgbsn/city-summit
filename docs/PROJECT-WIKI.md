# City Summit website redesign: project wiki

This file records what was built, every decision along the way and the reason for it, so the work can be retraced. It lives in `citysummit-site/docs/` and is published with the public repository (see D21).

**Keep this file current.** Every change to the site adds a line to the [Change log](#9-change-log), and any new decision goes in the [Decision log](#8-decision-log).

---

## Contents
1. [At a glance](#1-at-a-glance)
2. [Rules that must not be broken](#2-rules-that-must-not-be-broken)
3. [Where everything lives](#3-where-everything-lives)
4. [The three design directions](#4-the-three-design-directions)
5. [How the work unfolded](#5-how-the-work-unfolded)
6. [Images](#6-images)
7. [Publishing to GitHub Pages](#7-publishing-to-github-pages)
8. [Decision log](#8-decision-log)
9. [Change log](#9-change-log)
10. [Open items](#10-open-items)
11. [How to rebuild and republish](#11-how-to-rebuild-and-republish)

---

## 1. At a glance

| | |
|---|---|
| **Goal** | Sell the 89 condos at City Summit, 515 Cafego Place, Knoxville, TN 37902 |
| **Original site** | https://www.citysummitknoxville.com (Webflow) |
| **Redesign** | Every page (home, Residences, Neighborhood, About, Gallery, Contact) in five styles: Original plus four design directions. 31 pages including the chooser. |
| **Live preview** | https://mttgbsn.github.io/city-summit/ (opens on a chooser page) |
| **Repository** | https://github.com/mttgbsn/city-summit (public, branch `main`) |
| **Local preview** | http://localhost:8123 (server config in `.claude/launch.json`) |
| **Status** | Four directions live for review, each covering every page. A style bar at the top right of every page switches to the same page in another style. No direction chosen yet. |
| **Brand reference** | `docs/STYLE-GUIDE-LAWLERWOOD.md`, drawn from https://www.lawlerwood.com (used by option 4) |

---

## 2. Rules that must not be broken

These came from the original brief and apply to every change:

- **Prices, unit data, FAQ text and the legal disclaimer stay exactly as they are.** The build script copies them word for word from the existing pages rather than retyping them, and checks were run after each change.
- **The contact form must keep sending to rgibson@lawlerwood.com.** It goes through formsubmit.co: `https://formsubmit.co/rgibson@lawlerwood.com` (form `action`) and `https://formsubmit.co/ajax/rgibson@lawlerwood.com` (`FORM_ENDPOINT` in `site.js`). The build script refuses to run if that address is missing from the form.
- **Designs must come from the building's real architecture**, not generic real-estate styling. Option 4 is the exception the user asked for: it follows the developer's brand (LawlerWood).

Note: the form's error message tells people to email **bpetre@lawlerwood.com**, and the Contact page lists that address too. That was already in the original pages and was left alone.

---

## 3. Where everything lives

```
City_Summit/
├── citysummit-logo/         original logo files (SVG/PNG), untouched
├── logo-overview.png
├── tools/                   scripts used to build the site (not published)
│   ├── build-directions.js  generates home-1/2/3/4.html
│   ├── manifest.json        pixel sizes of the responsive images
│   ├── image-sources.tsv    original Webflow URL → local file name
│   ├── localize.js          one-time rewrite of Webflow image URLs to local files
│   └── use-web-images.js    points pages at the web-sized copies in images/web
├── .claude/launch.json      local preview server (python http.server on port 8123)
└── citysummit-site/         the website = the git repository that is published
    ├── index.html           chooser page: live previews of the four options (no style bar)
    ├── home-1.html          option 1, Red Frame
    ├── home-2.html          option 2, Brick & Timber
    ├── home-3.html          option 3, Elevation
    ├── home-4.html          option 4, LawlerWood
    ├── current.html         home page in the Original style (before the directions)
    ├── residences.html      Original style: floor-by-floor plans and prices (data lives in site.js)
    ├── residences-1.html … residences-4.html   same page in styles 1–4 (generated)
    │   (likewise neighborhood-N, about-N, gallery-N, contact-N)
    ├── neighborhood.html    places nearby (data lives in site.js)
    ├── about.html           story, team and the full FAQ
    ├── gallery.html
    ├── contact.html         contact form (to rgibson@lawlerwood.com)
    ├── site.js              unit data, neighborhood data, form sending, lightbox
    ├── styles.css           styles for current.html and the inner pages
    ├── directions.css       structure shared by home-1/2/3/4
    ├── direction-1.css      Red Frame look
    ├── direction-2.css      Brick & Timber look
    ├── direction-3.css      Elevation look
    ├── direction-4.css      LawlerWood look
    ├── inner.css            fits styles 1–4 onto the inner-page layouts from styles.css
    ├── stylebar.css         the style bar at the top of every page
    ├── favicon.svg
    ├── docs/
    │   ├── PROJECT-WIKI.md            this file (public)
    │   └── STYLE-GUIDE-LAWLERWOOD.md  style guide from lawlerwood.com (public)
    └── images/              all photos and plans from the original site
        └── web/             resized copies the pages actually load
```

**Important:** `home-1.html` to `home-4.html` and every `*-1.html` to `*-4.html` inner page are generated. The build also patches the Original-style pages (`current.html`, `residences.html` etc.) to add the style bar and point their logo at `current.html`; their content is otherwise hand-made and is the source for the other styles. Edit `tools/build-directions.js` (or the CSS files) and rebuild; hand edits to the HTML will be lost on the next build. See [section 11](#11-how-to-rebuild-and-republish).

Where the protected content comes from when the home pages are built:

| Content | Copied from |
|---|---|
| Logo, footer, legal disclaimer, sticky phone bar, lightbox | `current.html` |
| The four FAQ answers on the home pages | `about.html` |
| "What every home includes" list | `residences.html` |
| Tour request form | `contact.html` |

---

## 4. The three design directions

Each option uses the same photos, prices, plans and wording; only the look differs. Options 1–3 come from the building; option 4 comes from the developer's brand (see below the table). The building was studied from the downloaded photos: five storeys, a buff brick base, white facade panels alternating with dark horizontal lap siding, a red steel frame over the entry, and the words CITY SUMMIT stacked vertically in red on the corner.

| | Option 1: Red Frame | Option 2: Brick & Timber | Option 3: Elevation |
|---|---|---|---|
| **Drawn from** | Red entry frame, white panels, vertical sign lettering | Brick base, dark lap siding, wood floors and cabinets inside | Five stacked floors, the checkerboard of panels, window glass, the floor plans |
| **Feel** | Light, bold, graphic | Warm, calm, editorial | Dark, technical, precise |
| **Type** | Barlow Condensed + Barlow | Fraunces (serif) + Instrument Sans | Space Grotesk + IBM Plex Mono |
| **Colour** | Off-white, charcoal, brick red `#B5352C` | Cream, brick tan, siding brown, wood | Near-black, warm white, glass green `#7FC4BD` |
| **Signature move** | Building photo inside a red "portal" frame; vertical CITY SUMMIT beside the headline | Facts on a brick-pattern band; interiors on a lap-siding band | Prices by floor stacked like the building (5th floor at top) in the hero |
| **Hero photo** | `front-a2` | `front-a1` | `front-a1` (dimmed background) |

**Option 4: LawlerWood** (`home-4.html`, `direction-4.css`, rules in `docs/STYLE-GUIDE-LAWLERWOOD.md`)

| | Option 4: LawlerWood |
|---|---|
| **Drawn from** | The developer's website, lawlerwood.com |
| **Feel** | Corporate, calm, assured |
| **Type** | Open Sans only (light 300 headings, bold uppercase labels) |
| **Colour** | LawlerWood Navy `#00356B`, LawlerWood Sky `#009DDC`, Mist band `#EAEFF3`, white |
| **Signature moves** | City Summit logo on a Sky tab that hangs below the header (LawlerWood's badge device); angled Sky label on the photo ("Now selling · Construction complete"); intro split with a navy eyebrow and → arrow links; facts on a Mist band; Navy footer; developer credit set as LAWLER (Sky) WOOD (Navy) |
| **Hero photo** | `front-a1`, full width, with the intro below it |
| **Differs from 1–3** | Hero is photo on top and text below (LawlerWood's own layout); a two-photo "view" row replaces the separate statement section |

Page order on options 1–3 (top to bottom): header → hero → four key facts → "Find your place above it all" → Residences (three real plans with prices) → "Inside the homes" (photo strip + what every home includes) → "A block from everything" (aerial location photo) → developer/builder/architect → "Questions buyers ask" (4 FAQs) → "Come see it in person" tour form → footer and disclaimer.

Option 4 order: header → photo with angled label → intro (headline left; "Find your place above it all" and arrow links right) → facts band → two balcony views → Residences → Inside the homes → A block from everything → team → questions → tour form → Navy footer.

**Style bar.** A dark bar at the very top of every page (except the chooser), right-aligned, lists Original, 1 Red Frame, 2 Brick & Timber, 3 Elevation, 4 LawlerWood and "All styles". Each link opens **the same page** in that style (e.g. from `about-2.html` to `about-4.html`); the current style is highlighted. It stays visible while scrolling, with the site header sticking just below it. On phones it scrolls sideways and starts centred on the current style. It replaced the earlier right-edge switcher.

**Inner pages per style.** Residences, Neighborhood, About, Gallery and Contact keep their content and layout from the Original pages; each style recolours and retypes them through `inner.css`, with a style-specific page heading (Red Frame: condensed capitals with a red bar; Brick & Timber: centred serif; Elevation: dark with a mono label; LawlerWood: right-aligned title on a Mist band) and matching buttons, filters, floor picker and closing band. All links inside a style stay in that style.

---

## 5. How the work unfolded

### Step 1 — Download images and go local
- Fetched all 12 pages of the live site (home, residences, the five floor pages, neighborhood, about, gallery, contact, privacy policy) plus its stylesheet, and collected every image they reference.
- Downloaded **122 files (about 89 MB)** into `citysummit-site/images`, with clean lower-case names (Webflow's ID prefixes and `%20` escapes removed). The original web addresses are kept in `tools/image-sources.tsv`.
- Looked at every image on contact sheets: interiors, balconies, exteriors, aerials, five whole-floor layouts, 12 individual unit plans (each full and square), finish-scheme boards, neighborhood photos, logos.
- Rewrote all six pages and `site.js` to use the local copies. The Market Square photo, saved by Webflow as a screenshot file name, was renamed `market-square.avif`.
- The social share image tag points at `https://www.citysummitknoxville.com/images/front-a1-enhanced.webp`, because that tag needs a full web address. It only works once the redesign is live on that domain.

### Step 2 — Three home page directions
- Built `home-1.html`, `home-2.html` and `home-3.html` from a script so the logo, footer and disclaimer are copied exactly from the existing home page.
- Checked at desktop and phone widths, with no sideways scrolling.

### Step 3 — Persona review (developer, web expert, buyer)
The brief: review the site as a developer selling the condos, as an expert web developer, and as a buyer, then apply what makes sense to all three.

| Persona | Asked for | Done? |
|---|---|---|
| Developer | Say the building is finished (buyers can move now) | Yes: "Now selling · Construction complete" |
| Developer | Tour request form on the home page itself | Yes: closing band is the real contact form |
| Developer | Prices near the top | Already there |
| Developer | Visitor tracking to measure leads | No: needs a Google Analytics ID (`GA_MEASUREMENT_ID` in `site.js`) |
| Web expert | Photos far too heavy for phones | Yes: web-sized copies |
| Web expert | Previews shouldn't compete with the real site in search | Yes: `noindex` + canonical on the three options |
| Web expert | Structured data, explicit image sizes | Image sizes done later (step 6); structured data not done |
| Buyer | Monthly cost and parking answers on the home page | Yes: 4 FAQs copied from About |
| Buyer | See the plan of the specific unit | Yes: "View plan" on every row of Residences |
| Buyer | Address and an easy way to ask | Yes: in the tour band |

### Step 4 — First publish to GitHub
- First attempt to create a public repository was blocked by the session's permission settings; the user then confirmed and it went ahead.
- Created public repo `mttgbsn/city-summit`, pushed, turned on GitHub Pages from `main` at the root.
- Public was required because GitHub Pages on a free plan only serves public repositories.
- Commits use the no-reply author `mttgbsn@users.noreply.github.com` so the personal Gmail address isn't exposed.

### Step 5 — More on the first screen
Request: see more without scrolling. On all three options the first screen now holds the headline, building photo, both buttons and the four key facts including the starting price. Measured at 1366×660 and 1440×800. Done by a slimmer header, smaller headline, a hero sized to the window, a tighter facts row, and moving the compare switcher from the bottom-right corner (where it covered the price) to a slim tab on the right edge.

### Step 6 — Research, sharper images, chooser page
**Research findings** (mostly agency advice and buyer surveys, not controlled tests):
- National Association of Realtors buyer surveys rank photos as the most useful website feature, then detailed property information, then floor plans.
- Show plans and prices openly; buyers complain when developers hide them behind sign-up forms.
- Offer several places to enquire, not one contact button.
- Prove the location: what is nearby and walkable.
- Work well on phones.

Sources: [Vintage Agency](https://vintage.agency/blog/the-spirit-of-the-hood-how-to-build-the-best-condo-development-website/), [Panda IDX](https://docs.pandaidx.com/website-builder/pages/new-developments), [Boston Apartments](https://bostonapartments.com/real-estate-marketing/multifamily-website-lead-generation-guide.htm), [UrbanToronto forum](https://urbantoronto.ca/forum/threads/noticing-now-many-condo-developments-hide-price-lists-floor-plans-behind-registration-walls.24190/), [F8 Real Estate Media](https://www.f8re.com/post/the-surprising-importance-of-floor-plans-in-the-home-search-process), [Space Coast MLS](https://members.spacecoastmls.com/blogs/kymberly-franklin/2024/05/03/what-buyers-really-want-to-see-on-your-real-estate), [Real Estate Business](https://www.realestatebusiness.com.au/industry/6765-is-your-website-any-good-survey-reveals-all).

**Applied to all three options:**
- Residences section shows one real floor plan per home type with size range and starting price; plans enlarge on tap. Featured plans are the ones that carry each type's starting price on the Residences page: **A1** (studio, $259,200, 1st floor), **B1.1** (one bedroom, $345,000), **C1.2** (two bedroom, $492,600, 3rd floor).
- "Ask about this plan" on each, pre-filling the contact form.
- Five-photo strip of real interiors (kitchen, living room, bath, bedroom, balcony), each enlarging to full size.
- "What every home includes" list, copied from Residences.
- Neighborhood section uses the aerial photo marked with City Summit, Market Square and Gay Street.
- Images served in two sizes so phones download small files and large screens get sharp ones.

**Chooser page:** `index.html` became a page with live, scaled-down previews of the three options and a button for each. The previous home page moved to `current.html`, linked from the chooser's footer. The logo on each option leads back to that option; the logo on inner pages leads to the chooser.

### Step 7 — Heading rename
"Built quieter, finished better" was disliked and became **"Inside the homes"** on all three options, the Residences page and `current.html`. The supporting sentence about double walls and insulation was kept, because it is protected copy.

### Step 8 — Deploy trouble
GitHub's deploy for the rename commit failed twice. Both times the "Deploy to GitHub Pages" step sat with a blank status for 10 minutes, then timed out. The build step passed both times; GitHub's status page showed Pages as operational. The token was not involved. Fix: an empty commit (`1b7fb90`) gave GitHub a clean deploy, which finished in about a minute. Likely cause: the deploy for that particular commit got stuck on GitHub's side (not confirmed).

### Step 9 — LawlerWood style guide and option 4
Request: make a style guide from https://www.lawlerwood.com, save it as Markdown, and apply it as a fourth version.
- lawlerwood.com refuses command-line downloads, so it was studied in a browser: home, Projects and Our Company pages. Measured: Open Sans throughout; Navy `#00356B` for titles, buttons and footer; Sky `#009DDC` for the logo badge and accents; Charcoal `#2E353E` headings; grey `#777` body at 14px; Mist `#EAEFF3` title bands; uppercase bold menu; the logo badge hanging from the header; angled Sky labels on slider photos; three-column Navy footer.
- Wrote `STYLE-GUIDE-LAWLERWOOD.md` (character, colour, type, logo and badge, layout patterns, components, voice, what to modernise, CSS tokens).
- The guide makes three deliberate changes to LawlerWood's site: body text darkened to `#5F6670` and raised to 16–17px for readability; Sky never used for text on white (too low contrast); the photo slider dropped for one strong photo.
- Built option 4 from the guide; added it to the chooser (now a 2×2 / 4-across grid, "Four directions…") and the switcher.
- Checked: headline, photo, label and all four facts are on the first screen at 1366×660 and 1440×800; no sideways scrolling on phones; disclaimer identical to the other options; form still goes to rgibson@lawlerwood.com.

### Step 10 — Every page in every style, and a style bar
Request: every page in each style should reflect that style, and a switcher at the top right of any page should open the other styles of the same page.
- Before this, only the home pages came in four styles; Residences, Neighborhood, About, Gallery and Contact were shared and kept the original look.
- The build now generates `residences-1.html` … `contact-4.html` (20 pages) from the Original pages. Only the head (fonts and stylesheets), the body class and internal links change; the `<main>` content is copied whole.
- `inner.css` maps each style's colours and fonts onto the inner-page layouts in `styles.css`, plus per-style page headings, floor picker, filters, contact band and closing-band buttons.
- The style bar (`stylebar.css`) went onto all 30 site pages, Original included. The right-edge switcher was removed.
- `site.js` now keeps "Ask about this plan" links on the Residences table in the current style (e.g. `contact-2.html?plan=B1&floor=1`).
- Checks: no broken links; no link outside the style bar leaves its style; the `<main>` content and disclaimer of every styled inner page match the Original exactly; all 9 pages with the form send to rgibson@lawlerwood.com; the plan pre-fill works in the styled Contact pages; rebuilding twice gives identical files; desktop and phone screenshots checked for samples of every style and page type.

---

## 6. Images

### Pixelation check and fixes
- The original hero, `front-a1-enhanced.webp`, is only **1,537 px wide**, so it was stretched on large screens. Replaced with `front-a1` (2,606 px original, same view, slightly tighter framing). `front-a2` (2,535 px) replaced `front-a2-enhanced` likewise.
- Residences banner was an aerial photo labelled as a kitchen; now a real kitchen photo (`003-1-kitchen-a1`) that matches its description.
- Neighborhood banner was a 1,200 px riverwalk photo; now the marked aerial (`marked-map-a5`, 2,994 px).
- About banner now uses `corner-a4` (3,000 px) instead of the 2,000 px square crop.
- Test at a 1920 px wide screen: every image on the three options has at least 1.5× the pixels it is shown at, except the dimmed hero background in option 3 (1.26×; no larger original exists).

### How images are prepared (`images/web`)
- Converted with **ffmpeg** to WebP at quality 76–78.
- General copies: up to 2,000 px wide (floor layouts 2,600 px).
- Home page images get two sizes: `name-s.webp` (1,200 px) and `name-l.webp` (up to 2,400 px). The browser picks one from `srcset`/`sizes`; the lightbox opens the large one (`data-full`).
- Pixel sizes are recorded in `tools/manifest.json`, which the build script uses for `width`/`height`.
- `market-square.avif` is kept as the original because re-encoding made it larger.
- The 12 individual unit plans (`a1-md105.webp` etc., 5,100 px) are loaded full size only when someone opens "View plan".
- Originals in `images/` are never changed.

---

## 7. Publishing to GitHub Pages

- Source: branch `main`, folder `/` (root of `citysummit-site`).
- Pushing to `main` starts GitHub's "pages build and deployment" automatically. Normally it is live in 1–2 minutes.
- If a deploy fails with "Timeout reached, aborting!" at the deploy step: push an empty commit (`git commit --allow-empty -m "Redeploy"` then push). That worked in step 8.
- Preview pages carry `<meta name="robots" content="noindex">` and a canonical link to the real site. **Inner pages do not**, so they could be indexed.
- **The tour forms on the public preview are live** and really email rgibson@lawlerwood.com. No test submission has been sent.

---

## 8. Decision log

| # | Decision | Why |
|---|---|---|
| D1 | Keep original image files untouched; resized copies go in `images/web` | Originals stay available for print or later re-export |
| D2 | Generate the three home pages from a script | Guarantees logo, disclaimer, FAQ, spec list and form are copied exactly, not retyped |
| D3 | Base each direction on one real feature of the building | Brief asked for the building's real architecture; gives three clearly different looks |
| D4 | Commit author is the GitHub no-reply address | Avoid exposing the personal Gmail in a public repo |
| D5 | Public repository | Required for GitHub Pages on a free plan |
| D6 | `noindex` + canonical on preview home pages | Previews shouldn't compete with citysummitknoxville.com in search |
| D7 | Tour form on the home page, not just a link | Developer and research both favour enquiry points on the page |
| D8 | Keep plans and prices open, no sign-up wall | Research: buyers dislike gated plans and prices |
| D9 | Feature the plan that carries each type's starting price | The price shown and the plan shown always match |
| D10 | Hero sized to the window so the facts row is on the first screen | User wanted more visible without scrolling; price is the key fact |
| D11 | `index.html` = chooser; old home → `current.html` | User wanted GitHub Pages to let people choose between options |
| D12 | Swap low-resolution heroes for full-resolution originals | User asked that images not be pixelated |
| D13 | "Built quieter, finished better" → "Inside the homes" | User disliked the phrase; neutral heading that says what the section is |
| D14 | Wiki kept outside the published folder | Internal notes and history shouldn't be on the public site (reversed by D21) |
| D15 | Didn't add analytics | Needs the client's Google Analytics ID |
| D16 | Option 4 follows the developer's brand, not the building | User asked for a version built from lawlerwood.com's style |
| D17 | Keep the City Summit logo; borrow only LawlerWood's badge *device* | The site sells City Summit; LawlerWood's own logo shouldn't be used without their approval |
| D18 | Darker body grey, larger body text, no Sky text on white | LawlerWood's `#777` at 14px is hard to read; Sky on white fails contrast |
| D19 | One photo instead of LawlerWood's slider | Sliders hide content and slow phones; the brief wanted more visible on the first screen |
| D20 | Style guide kept outside the published folder | It is a working reference, not part of the public site (reversed by D21) |
| D21 | Wiki and style guide moved into `citysummit-site/docs/` and published | User asked to add both to the public GitHub repo; one copy only, so they can't drift apart |
| D22 | Generate a full set of pages per style (`page-N.html`) rather than switching CSS with JavaScript | Works without JavaScript, every style page has its own address to share, and the home pages differ in layout, not just colour |
| D23 | Inner pages reuse the Original layouts and content; only styling changes | Protected content (unit data, FAQ, disclaimer, form) can't drift between styles |
| D24 | Style bar on every page, top right, sticky; links to the same page in each style | User wanted switching to be easy from any page; replaces the right-edge switcher |
| D25 | "Original" included as a style in the bar | Lets reviewers compare against the pre-redesign look on any page |

---

## 9. Change log

Newest first. Times are local (Eastern), 9 November 2026.

| When | Commit | Change |
|---|---|---|
| 19:55 | `dfd365b` | Every page generated in styles 1–4; style bar at the top right of every page; right-edge switcher removed |
| 19:40 | `5c3d064` | Wiki and style guide moved into `docs/` and published to GitHub |
| 19:30 | `a4b5f82` | Option 4 (LawlerWood) added; chooser and switcher offer four options |
| — | — | `STYLE-GUIDE-LAWLERWOOD.md` written from lawlerwood.com |
| 19:16 | `1b7fb90` | Empty commit to redeploy after two GitHub deploy timeouts |
| 18:43 | `1cb2195` | Heading "Built quieter, finished better" → "Inside the homes" |
| 18:38 | `a2ce756` | Chooser page; real plans, photo strip and spec list on all three options; sharper responsive images; `current.html` |
| 18:30 | `6e15bef` | Headline, photo, buttons and key facts fit on the first screen; switcher moved to right edge |
| 18:24 | `23724ab` | FAQ teaser, tour form, construction-complete status, `noindex`; "View plan" on Residences; first web-sized images |
| 18:14 | `ecfab85` | First commit: six pages on local images plus three home page directions |
| — | — | Wiki created (this file) and build scripts saved to `tools/` |

---

## 10. Open items

- [ ] **Choose a direction**, then restyle the inner pages (Residences, Neighborhood, About, Gallery, Contact) to match it. They still use the earlier styling.
- [ ] **Revoke the GitHub token** used in this project at github.com/settings/tokens; it has very broad access and was shared in chat.
- [ ] Add a Google Analytics ID to `GA_MEASUREMENT_ID` in `site.js` to measure visits and leads.
- [ ] Before launch, decide whether to keep the style bar. To remove it: drop `addBar` from the build script, delete `stylebar.css`, and rebuild.
- [ ] Decide whether the preview's live forms are acceptable, or point them elsewhere while in review.
- [ ] Add `noindex` to the inner pages of the preview, or make the repo private once a paid plan allows Pages on private repos.
- [ ] Structured data for search engines (not done).
- [ ] Send one test message through the form to confirm delivery.
- [ ] Social share image only works once the site is on citysummitknoxville.com.
- [ ] If option 4 is chosen, confirm with LawlerWood that using their colours and badge device on City Summit is approved.

---

## 11. How to rebuild and republish

**Preview locally**
```bash
python -m http.server 8123 --bind 127.0.0.1 --directory "C:/Users/mttgb/Desktop/City_Summit/citysummit-site"
```
Then open http://localhost:8123.

**Rebuild all styled pages** (homes, inner pages in every style, style bar on the originals) after editing `tools/build-directions.js` or any Original-style page:
```bash
node "C:/Users/mttgb/Desktop/City_Summit/tools/build-directions.js" "C:/Users/mttgb/Desktop/City_Summit/citysummit-site"
```
It reads `current.html`, `about.html`, `residences.html` and `contact.html`, and stops with an error if the FAQ, spec list, footer or form address can't be found.

**Make a new two-size image** for a home page (example for `deck-sunsphere`):
```bash
ffmpeg -i images/deck-sunsphere.webp -vf "scale='min(1200,iw)':-2" -c:v libwebp -quality 76 -frames:v 1 images/web/deck-sunsphere-s.webp
```
```bash
ffmpeg -i images/deck-sunsphere.webp -vf "scale='min(2400,iw)':-2" -c:v libwebp -quality 76 -frames:v 1 images/web/deck-sunsphere-l.webp
```
Then add its pixel sizes to `tools/manifest.json`.

**Publish**
```bash
git -C "C:/Users/mttgb/Desktop/City_Summit/citysummit-site" add -A
```
```bash
git -C "C:/Users/mttgb/Desktop/City_Summit/citysummit-site" commit -m "Describe the change"
```
```bash
git -C "C:/Users/mttgb/Desktop/City_Summit/citysummit-site" push origin main
```
Live in 1–2 minutes at https://mttgbsn.github.io/city-summit/. Then add a row to the [Change log](#9-change-log).
