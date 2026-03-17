# Cousins Distillery – Design Tokens

Reference for colors, typography, and UI tokens. Use this when building or updating the site.

---

## Color palette

| Token | Hex | Usage |
|-------|-----|--------|
| **Background (beige)** | `#FEFEF6` | Page / section backgrounds |
| **Gold / accent** | `#D1BB8A` | CTAs, subtitles, two-tone heading accents |
| **Dark** | `#0F0A08` | Dark sections, text |
| **Header / accent** | `#9f860e` | Header hover, some accents |

---

## Typography

**Rule:** Headings use Noto Serif bold (no italic). Subtitles above headings use Poppins. Paragraphs use Poppins. Two-tone color on headings is allowed (e.g. `<span className="text-[#D1BB8A]">`).

### H1 (main heading)

- **Font:** Noto Serif  
- **Weight:** 700 (Bold)  
- **Style:** normal (no italic)  
- **Line-height:** 1.2  
- **Two-tone:** Allowed (e.g. second word or phrase in gold)

```css
font-family: var(--font-noto-serif), 'Noto Serif', serif;
font-weight: 700;
font-style: normal;
line-height: 1.2;
```

**Sizes in app:** Hero `clamp(3.5rem, 8vw, 7rem)`; contact/legal pages `clamp(2.5rem, 7vw, 5rem)` to `clamp(4rem, 10vw, 8rem)`.

---

### H2 (section heading)

- **Font:** Noto Serif  
- **Weight:** 600 (SemiBold)  
- **Style:** normal (no italic)  
- **Letter-spacing:** 1px  
- **Line-height:** 1.5  
- **Two-tone:** Allowed

```css
font-family: var(--font-noto-serif), 'Noto Serif', serif;
font-weight: 600;
font-style: normal;
letter-spacing: 1px;
line-height: 1.5;
```

**Sizes in app:** Section titles `clamp(1.75rem, 4.5vw, 3rem)` to `clamp(2.2rem, 5.5vw, 4rem)`; legal pages `26px` / `lg:text-[30px]`.

---

### H3

- **Font:** Noto Serif  
- **Weight:** 700 (Bold)  
- **Style:** normal (no italic)

**Sizes in app:** e.g. `text-[24px] lg:text-[32px]`.

---

### Subtitle / overline (above headings)

- **Font:** Poppins  
- **Weight:** 700 (Bold)  
- **Style:** normal  
- **Size:** 11px (consistent)  
- **Transform:** uppercase  
- **Letter-spacing:** 0.35em–0.4em  
- **Color:** often `#D1BB8A` or `#9f860e`

```css
font-family: var(--font-poppins), 'Poppins', sans-serif;
font-weight: 700;
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.35em;
```

Use Tailwind: `font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#D1BB8A]`.

---

### Body / paragraph

- **Font:** Poppins  
- **Weight:** 400 (normal) or 300 (light where needed)  
- **Style:** normal  
- **Size:** 15px base, 18px at `lg`  
- **Line-height:** 1.8

```css
font-family: var(--font-poppins), 'Poppins', sans-serif;
font-size: 15px;
line-height: 1.8;
```

**At lg breakpoint:** `font-size: 18px`. Use Tailwind: `font-body text-[15px] lg:text-[18px] font-normal leading-[1.8]`.

---

## Spacing

### Section padding (consistent site-wide)

- **Content sections:** `py-20 lg:py-24` (vertical), `px-6 lg:px-12` (horizontal).
- **Page hero banners** (contact, privacy, terms): `pt-24 pb-20 lg:pt-32 lg:pb-24`, `px-6 lg:px-12`.
- **Footer:** CTA block and footer strip both use `py-20 lg:py-24`, `px-6 lg:px-12`.

Use the same scale everywhere so the layout feels unified.

### In-section rhythm

- **Section vertical rhythm:** `mb-6` or `mb-8` between blocks; `space-y-6` / `space-y-16` for content sections.
- **Subtitle to heading:** e.g. `mb-4` or `mb-6`.
- **Heading to paragraph:** e.g. `mb-6` or `mb-8`.

---

## Quick reference (Tailwind / globals.css)

- **Heading font:** `font-heading` (Noto Serif), always `font-bold`, no `italic`.
- **Body / subtitle font:** `font-body` (Poppins).
- **Subtitle style:** `font-body text-[11px] font-bold uppercase tracking-[0.4em]`.
- **Body style:** `font-body text-[15px] lg:text-[18px] font-normal leading-[1.8]`.
- **Utility classes in globals.css:** `.heading-1`, `.heading-2`, `.heading-3`, `.subtitle`, `.body-text`.

---

## Buttons & links

- Primary CTAs (e.g. “Explore the Collection”, “Shop Now”) go to `/contact` or in-page sections (e.g. `/#our-spirits`, `#process`).
- No placeholder `href="#"`; use real section anchors or `/contact`. Product `finalCtaHref` is set to `"/contact"`.
