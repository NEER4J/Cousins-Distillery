# Cousins Distillery – Design Tokens

Reference for colors, typography, and UI tokens. Use this when building or updating the site.

---

## Color palette

| Token | Hex | Usage |
|-------|-----|--------|
| **Background (beige)** | `#FEFEF6` | Page / section backgrounds |
| **Header button** | `#E2DAAF` | Header CTA / button background |
| **Hero main button** | `#9f860e` | Hero CTA / primary button, accent (e.g. subtitle) |

---

## Typography

### H1 (main heading)

- **Font:** Cormorant Garamond  
- **Weight:** 700 (Bold)  
- **Style:** Bold  

```css
font-family: 'Cormorant Garamond', serif;
font-weight: 700;
font-style: normal;
```

---

### H2 (section heading)

- **Font:** Poppins  
- **Weight:** 600 (SemiBold)  
- **Style:** SemiBold  

```css
font-family: 'Poppins', sans-serif;
font-weight: 600;
font-style: normal;
```

---

### Heading subtitle (above main heading)

- **Font:** Cormorant Garamond  
- **Weight:** 600 (SemiBold)  
- **Style:** Italic  
- **Size:** 30px  
- **Line height:** 100%  
- **Letter spacing:** 10%  
- **Align:** center  
- **Vertical align:** middle  
- **Transform:** capitalize  
- **Color:** `#9f860e`  

```css
font-family: 'Cormorant Garamond', serif;
font-weight: 600;
font-style: italic;
font-size: 30px;
line-height: 100%;
letter-spacing: 0.1em;
text-align: center;
vertical-align: middle;
text-transform: capitalize;
color: #9f860e;
```

---

### Body / paragraph (normal text)

- **Font:** Poppins  
- **Weight:** 300 (Light)  
- **Style:** Light  
- **Size:** 15px  
- **Line height:** 125%  
- **Letter spacing:** 10%  
- **Vertical align:** middle  
- **Transform:** capitalize  

```css
font-family: 'Poppins', sans-serif;
font-weight: 300;
font-style: normal;
font-size: 15px;
line-height: 125%;
letter-spacing: 0.1em;
vertical-align: middle;
text-transform: capitalize;
```

---

## Quick reference (Tailwind / CSS vars)

If you add these to `globals.css` or Tailwind theme:

```css
:root {
  --color-bg: #FEFEF6;
  --color-header-btn: #E2DAAF;
  --color-hero-btn: #9f860e;
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Poppins', sans-serif;
}
```

- **Background:** `#FEFEF6` or `var(--color-bg)`  
- **Header button:** `#E2DAAF` or `var(--color-header-btn)`  
- **Hero / accent:** `#9f860e` or `var(--color-hero-btn)`  
- **H1:** Cormorant Garamond 700  
- **H2:** Poppins 600  
- **Subtitle:** Cormorant Garamond 600 italic, 30px, `#9f860e`  
- **Body:** Poppins 300, 15px, line-height 125%, letter-spacing 10%
