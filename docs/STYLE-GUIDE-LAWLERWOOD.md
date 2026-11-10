# LawlerWood style guide

A style guide drawn from **https://www.lawlerwood.com**, the developer of City Summit, so the City Summit site can carry the developer's own look. It records what the LawlerWood site does today (studied 9 November 2026) and how to apply it to a modern, phone-friendly condo sales site.

Applied in **option 4** of the City Summit redesign: `home-4.html` with `direction-4.css`. Live: https://mttgbsn.github.io/city-summit/home-4.html

---

## 1. Character

LawlerWood presents itself as an established, trustworthy Knoxville developer: **calm, corporate, assured, unflashy**. The site leans on large photos of finished buildings, lots of white space, light-weight headings, and two blues. Nothing is loud; credibility comes from the work shown and from the company's history ("Since 1975", "nearly 50 years", "two-billion dollars").

| Do | Don't |
|---|---|
| Let photography of finished buildings carry the page | Use loud colour blocks, gradients or decoration |
| Use light (300) headings and plenty of white space | Use heavy, condensed or all-caps display type for large headings |
| Keep corners square and lines thin | Round corners or add drop shadows |
| Use the two blues sparingly, as signals | Introduce a third accent colour |

---

## 2. Colour

| Role | Name | Hex | Where LawlerWood uses it |
|---|---|---|---|
| Primary | **LawlerWood Navy** | `#00356B` | Page titles, buttons, active filters, links, footer background |
| Accent | **LawlerWood Sky** | `#009DDC` | Logo badge, the "LAWLER" half of the wordmark, angled photo labels |
| Heading text | Charcoal | `#2E353E` | Section headings ("Real Estate", "Who We Are") |
| Navigation | Slate | `#5E7279` (home) / `#444444` (inner pages) | Top menu, uppercase |
| Body text | Grey | `#777777` | All paragraphs |
| Title band | Mist | `#EAEFF3` | Full-width band behind each page title |
| Rules | Light grey | `#EAEAEA` | Thin dividers |
| Footer text | Off-white | `#F0F0F0` | Text on the navy footer |
| Background | White | `#FFFFFF` | Page |

**Accessibility adjustment.** LawlerWood's body grey `#777777` on white is about 4.5:1, right at the minimum for small text. For long reading, use **`#5F6670`** for body text, and keep `#777777` for small secondary text such as captions and locations. Sky `#009DDC` on white is under 3:1, so **never use Sky for text on white**. Use it only for fills, large shapes and marks; text on Sky is white and at least 18px.

---

## 3. Typography

LawlerWood uses one family throughout: **Open Sans** (Google Fonts), weights 300, 400, 600 and 700.

| Element | LawlerWood | Use on a condo site |
|---|---|---|
| Page title (H1) | 36px, weight 300, uppercase, Navy | Hero headline: 300 weight, sentence case at large sizes; uppercase only for short page titles |
| Section heading (H2) | 31px, weight 300, Charcoal, letter-spacing −1px | Same, scaled up to about 40–48px on desktop |
| Sub-line under a heading | 21px, weight 300, grey: "Development. Management. Brokerage." | Same pattern for short triads |
| Eyebrow | 14px, Navy, uppercase: "WELCOME TO LAWLERWOOD" with "LAWLER" in Sky | Small uppercase label above a paragraph, weight 600 |
| Footer heading | 23px, weight 200–300, white | Same |
| Navigation | 14px, weight 700, uppercase | Same, with letter-spacing 0.04em |
| Body | 14px / 24px, grey | **Raise to 16–17px / 1.65** for readability on phones |
| Captions | 12.6px, grey | 13–14px |

Pairing rule: big and light for headings, small and bold for labels. Never bold a large heading.

---

## 4. Logo and the hanging badge

- **LawlerWood mark:** a Sky-blue square holding white diagonal stripes that form an "LW", with the word LawlerWood in small caps beneath.
- **Hanging badge:** on desktop the badge hangs from the top of the page, overlapping the white header and the photo below it. This is the site's most recognisable device.
- **Wordmark on scroll:** when the header shrinks, a horizontal wordmark replaces the badge: "LAWLER" in Sky, "WOOD" in Navy, serif small caps.

**On the City Summit site:**
- The **City Summit logo stays the primary logo**. The badge *device* is borrowed, not LawlerWood's logo: the City Summit wordmark in white sits on a Sky-blue tab that hangs below the header. The peak of the "M", normally red, turns Navy inside the badge.
- LawlerWood's name appears as the developer credit, written "LAWLERWOOD" with "LAWLER" in Sky and "WOOD" in Navy, linked to lawlerwood.com.
- Don't place LawlerWood's own logo files on City Summit pages without LawlerWood's approval.

---

## 5. Layout patterns

| Pattern | What LawlerWood does | City Summit use |
|---|---|---|
| **Header** | White bar, uppercase menu on the right, badge hanging on the left | Same; "Schedule a tour" as a Navy button at the end of the menu |
| **Hero** | Full-width photo slider with an **angled Sky label** (parallelogram) on the lower right naming the category | One full-width photo, no slider; angled label reads "Now selling · Construction complete" |
| **Intro split** | Left: light heading plus grey triad. Right: Navy eyebrow, paragraph, arrow link "→ More About Our Company" | Left: headline and lede. Right: eyebrow, the two short paragraphs, arrow links to plans and tours |
| **Title band** | Full-width Mist band, page title right-aligned, uppercase, light Navy | Mist band carrying the key facts; Mist bands behind section openers |
| **Filter row** | Small square buttons; active one filled Navy, others Navy text | Not needed on the home page |
| **Project cards** | Photo on top, title in Charcoal, location in small grey beneath, no border | Plan cards: plan image, home type, size in small grey, price in Navy |
| **Footer** | Navy, three columns: white badge, "Company Brief", "Contact Info"; faint skyline photo behind | Navy footer, white text, existing footer content and disclaimer unchanged |

Spacing: generous. Content width about 1170px, sections separated by large white space or a Mist band, never by heavy rules.

---

## 6. Components

**Buttons**
- Primary: Navy fill, white text, square corners, 14–15px weight 600, padding about 0.85em × 1.5em. Hover: Sky fill.
- Secondary: white fill, Navy 1px border and text. Hover: Navy fill.

**Arrow links:** "→ Label" in Navy, no underline; underline on hover. LawlerWood's main secondary call to action.

**Angled label:** Sky parallelogram (cut at about 20° on the left edge), white uppercase text, 14–16px weight 600, letter-spacing 0.06em, sitting on the bottom edge of a photo.

**Rules and cards:** 1px `#EAEAEA` lines; cards have no border or shadow; images are square-cornered.

**Footer:** Navy background; headings white weight 300; body Off-white; links white; small print white at 70% opacity.

---

## 7. Voice

LawlerWood writes in a measured, institutional tone:
- **Credentials first:** "Since 1975, LawlerWood has consistently earned the trust of clients and investors…"
- **Triads with full stops:** "Development. Management. Brokerage."
- **Values words:** integrity, professionalism, exceptional quality, long-term relationships.
- **No exclamation marks, no hype**, third person ("LawlerWood is…") on corporate pages, "we" on the company story.

On City Summit, protected copy (prices, unit data, FAQ, disclaimer) is never rewritten. The voice guides only short labels and layout copy, such as eyebrows and link text.

---

## 8. What to modernise

The LawlerWood site is built on an older Bootstrap theme (copyright 2024). Keep its colours, type, badge, angled labels, title bands and Navy footer, but:
- **Drop the auto-advancing slider** in favour of one strong photo; sliders hide content and are slow on phones.
- **Raise body text** from 14px to 16–17px.
- **Darken body grey** as noted in section 2.
- **Make it responsive:** the badge sits inside the header on phones, and the angled label becomes a full-width strip under the photo.

---

## 9. Ready-to-use tokens

```css
:root{
  --lw-navy:#00356B;   /* primary */
  --lw-sky:#009DDC;    /* accent: fills and marks only, never text on white */
  --lw-charcoal:#2E353E;
  --lw-slate:#5E7279;
  --lw-body:#5F6670;   /* body text (accessible); LawlerWood uses #777 */
  --lw-caption:#777777;
  --lw-mist:#EAEFF3;
  --lw-rule:#EAEAEA;
  --lw-offwhite:#F0F0F0;
  --lw-font:"Open Sans",Arial,sans-serif;
}
```

Google Fonts: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap`
