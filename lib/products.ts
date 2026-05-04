export type ProductSlug = "vodka" | "blue-agave-spirit" | "tequila" | "whiskey";

export interface ProductSection {
  title: string;
  body?: string;
  bullets?: string[];
  bodyAfter?: string;
  cta?: { label: string; href: string };
}

export interface StatInfo {
  label: string;
  value: string;
}

export interface StorySection {
  label: string;
  title: string;
  body: string[];
}

export interface TastingNoteItem {
  type: string;
  title: string;
  tags: string[];
  body: string;
}

export interface TastingNotes {
  label: string;
  title: string;
  notes: TastingNoteItem[];
}

export interface VarietyItem {
  number: string;
  subtitle: string;
  name: string;
  type: string;
  body: string[];
  idealForHeader?: string;
  idealForBody?: string;
}

export interface ProductCta {
  label: string;
  href: string;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  headline: string;
  subheading: string;
  primaryCta: ProductCta;
  secondaryCta: ProductCta;
  image: string;
  sourceImage: string;
  
  // New structured properties from HTML
  eyebrow: string;
  subtitle: string;
  stats: StatInfo[];
  storySections: StorySection[];
  tastingNotes?: TastingNotes;
  varieties?: VarietyItem[];
  
  // Legacy sections (kept optional for fallback/backwards compatibility if needed, though replaced mostly)
  sections: ProductSection[];
  
  forPartnersTitle: string;
  forPartnersBody: string;
  forPartnersCta: ProductCta;
  finalCtaHeadline: string;
  finalCtaLabel: string;
  finalCtaHref: string;
}

const CONTACT_HREF = "/contact";

export const PRODUCTS: Product[] = [
  {
    slug: "vodka",
    name: "COUSINS VODKA",
    metaTitle: "Premium Artisanal Vodka | 13-Stage Distilled | Cousins Distillery",
    metaDescription: "Cousins Distillery Vodka: The essence of purity. Small-batch craft vodka refined through thirteen stages.",
    metaKeywords: ["craft vodka", "small-batch vodka", "13-stage distillation", "premium spirit", "smooth vodka", "artisanal spirits"],
    headline: "COUSINS VODKA",
    subheading: "Born from the fertile plains of our Canadian farmer partners, our vodka is crafted from rare heritage varieties of corn — a grain we have coaxed into producing a truly remarkable spirit. Through thirteen precise distillation passes, we reveal a clean, silken spirit with an almost weightless texture and a gentle sweetness from the corn's natural sugars. The result is vodka with genuine character and a finish that lingers far longer than traditional spirits. Cousins Vodka is made to be savored, not just mixed.",
    primaryCta: { label: "Shop Vodka", href: CONTACT_HREF },
    secondaryCta: { label: "See Experiences", href: CONTACT_HREF },
    image: "/vodka.png",
    sourceImage: "/cornone.jpg",
    eyebrow: "🌽  Heirloom Corn  ·  Canada",
    subtitle: "Heirloom Corn Expression",
    stats: [
      { label: "Base", value: "Heirloom Corn" },
      { label: "ABV", value: "40% vol." },
      { label: "Stages", value: "13" },
      { label: "Origin", value: "Canada" }
    ],
    storySections: [
      {
        label: "The Ingredient",
        title: "Why *corn?*",
        body: [
          "Corn vodka is one of the world's best-kept secrets. Unlike wheat or potato, quality heirloom corn brings a natural sweetness and body that creates a distinctly satisfying spirit with genuine personality. We grow heritage varieties on our Canadian farmer partners' plains — cultivars selected not for yield, but for flavor. The cobs are sun-dried, stone-milled, and mashed on-site within hours of processing, preserving every nuance of the grain's natural character.",
          "The result is a vodka that stands apart in a cocktail as easily as it shines served neat over ice. Clean, but not empty. Pure, but not clinical."
        ]
      },
      {
        label: "The Process",
        title: "Thirteen passes *to perfection*",
        body: [
          "Our master distillers run each batch of corn mash through thirteen distinct stages in our copper pot stills. Early stages build the base spirit; middle stages refine and concentrate; the final stages polish with surgical precision. Activated charcoal filtration at Stage 10 removes even trace impurities, leaving a vodka of astonishing clarity.",
          "No additives. No flavour enhancers. Nothing added, nothing hidden. What you taste is purely the corn, purely our craft, and purely our land."
        ]
      }
    ],
    tastingNotes: {
      label: "Tasting Notes",
      title: "In the *glass*",
      notes: [
        {
          type: "Nose",
          title: "Delicate & Clean",
          tags: ["Fresh grain", "Sweet cream", "Mild vanilla", "White pepper"],
          body: "A light, inviting nose with the gentle sweetness of fresh-milled corn. Subtle vanilla undertones from the copper stills and a clean, crystalline quality that immediately signals exceptional purity. Restrained, precise, and quietly exciting."
        },
        {
          type: "Palate",
          title: "Silken & Warm",
          tags: ["Sweet corn", "Lemon zest", "Soft butter", "Mineral stone"],
          body: "An unexpectedly rounded texture — almost creamy. The corn character shines with natural sweetness balanced by subtle citrus brightness. Never harsh, always welcoming. The kind of vodka that converts people who claim they don't like vodka."
        },
        {
          type: "Finish",
          title: "Long & Memorable",
          tags: ["Warm spice", "Clean grain", "Lingering sweet"],
          body: "A long, satisfying finish with gentle warmth that builds slowly and fades gracefully. The mark of a truly premium spirit — the memory of it stays long after the glass is empty. Exceptional served neat at room temperature or chilled over large ice."
        }
      ]
    },
    sections: [],
    forPartnersTitle: "For bars and venues",
    forPartnersBody: "Cousins Distillery Vodka is ideal for luxury bars, fine-dining venues, and boutique hospitality partners who value consistency, quality, and elegance. We offer tailored bar programs, cocktail recommendations, and product support to help you present our vodka in the best possible light.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline: "Experience the purity of Cousins Distillery Vodka",
    finalCtaLabel: "Shop Vodka",
    finalCtaHref: "/contact",
  },
  {
    slug: "tequila",
    name: "COUSINS TEQUILA",
    metaTitle: "Artisanal Tequila | Blue Agave Reserve | Cousins Distillery",
    metaDescription: "Refined Cousins Distillery Tequila crafted from 100% Blue Agave in Jalisco, Mexico, with three distinctive expressions.",
    metaKeywords: ["premium tequila", "reposado tequila", "extra anejo tequila", "artisanal tequila", "small-batch tequila", "100% blue agave", "jalisco tequila"],
    headline: "COUSINS TEQUILA",
    subheading: "Our Blue Agave is sourced from the volcanic, mineral-rich soils of Jalisco, Mexico — the only region in the world legally recognized for tequila production. Made exclusively from 100% Agave tequilana Weber Azul, the plants mature for six to eight years before harvest to develop complex sugars that industrial shortcuts cannot replicate. We offer three distinct expressions — Blanco, Reposado, and Extra Añejo — each representing a different chapter of this extraordinary process.",
    primaryCta: { label: "Shop Tequila", href: CONTACT_HREF },
    secondaryCta: { label: "Explore Our Expressions", href: CONTACT_HREF },
    image: "/taquila-v2.png",
    sourceImage: "/cornone.jpg",
    eyebrow: "🌵  100% Blue Agave  ·  Jalisco, México",
    subtitle: "Blue Agave Reserve · Three Expressions",
    stats: [
      { label: "Base", value: "100% Blue Agave" },
      { label: "Region", value: "Jalisco, MX" },
      { label: "Expressions", value: "3 Varieties" },
      { label: "Stages", value: "13" }
    ],
    storySections: [
      {
        label: "The Ingredient",
        title: "Eight years in *Jalisco's soil*",
        body: [
          "Blue Agave — Agave tequilana Weber Azul — is one of the world's most demanding crops. It demands volcanic soil, relentless sun, and above all, time. Our plants grow in the highlands of Jalisco, where the mineral-rich red clay soil imparts a distinctive earthy minerality found nowhere else on Earth. A mature plant accumulates 6–8 years of complex sugars in its piña (heart) before we harvest.",
          "The piñas are slow-roasted in traditional stone ovens for 72 hours, then crushed, fermented with native yeasts, and distilled through our 13-stage process. Tradition and precision, in equal and uncompromising measure."
        ]
      },
      {
        label: "Our Standard",
        title: "100% agave. *Zero compromise.*",
        body: [
          "By Mexican law, tequila must contain at least 51% blue agave — the remaining 49% can be other sugars. We use none of those other sugars. Every Cousins Tequila expression is made from 100% Agave tequilana Weber Azul, the highest standard in tequila production. It costs more. It takes longer. It is the only way we know how to work.",
          "The Cousins family's deep roots in farming culture means we understand instinctively what it means to respect an agricultural product. We bring that same reverence to every piña we harvest in Jalisco."
        ]
      }
    ],
    varieties: [
      {
        number: "Expression No. 1",
        subtitle: "Known for bright purity · Rested for 7 months",
        name: "Blanco",
        type: "Blue Agave Tequila",
        body: [
          "Crafted from 100% Blue Agave to develop a clean and vibrant profile, this expression highlights the natural character of Agave tequilana Weber Azul with bright herbal notes, subtle sweetness, and a crisp, refreshing finish.",
          "The Blanco is Cousins Tequila at its most transparent and honest — unmasked by oak, unapologetic in its agave-forward identity. The purest window into the raw ingredient."
        ],
        idealForHeader: "Ideal For",
        idealForBody: "Tequila enthusiasts, mixologists, and consumers who appreciate a fresh, authentic agave-forward spirit. Ideal for cocktail bars, premium restaurants, and social gatherings where a high-quality tequila elevates margaritas, palomas, and premium mixed drinks."
      },
      {
        number: "Expression No. 2",
        subtitle: "Balanced and refined · Aged 3 to 6 months",
        name: "Reposado",
        type: "Rested Blue Agave Tequila",
        body: [
          "Our Reposado is oak-aged in carefully selected barrels for 3 to 6 months. The wood imparts a smooth, elegant balance between the vibrant freshness of blue agave and the gentle influence of oak, with notes of vanilla, caramel, and warm baking spices that enrich without overwhelming.",
          "The Reposado is the versatile heart of the Cousins Tequila range — equally at home in an elevated cocktail or sipped slowly on its own over a single large ice cube."
        ],
        idealForHeader: "Ideal For",
        idealForBody: "Young professionals, social drinkers, and tequila enthusiasts who enjoy premium spirits for cocktails or casual sipping. Reposado appeals strongly to cocktail bars, restaurants, and hospitality venues seeking a versatile, high-quality tequila with broad appeal."
      },
      {
        number: "Expression No. 3",
        subtitle: "Contemplative depth · Aged 3+ years",
        name: "Extra Añejo",
        type: "Ultra-Aged Blue Agave Tequila",
        body: [
          "Our Extra Añejo undergoes extended aging in premium oak barrels for 3+ years, transforming the spirit into one of rare depth and distinction. Rich notes of dark caramel, toasted oak, dried fruit, and complex spice emerge while deepening the core blue agave character.",
          "Crafted for slow sipping, this contemplative expression is for those who appreciate that the finest things in life cannot be rushed."
        ],
        idealForHeader: "Ideal For",
        idealForBody: "Connoisseurs and collectors who seek a premium sipping tequila with rare depth and oak-aged complexity."
      }
    ],
    tastingNotes: {
      label: "Tasting Notes · Blanco",
      title: "In the *glass*",
      notes: [
        {
          type: "Nose",
          title: "Earthy & Floral",
          tags: ["Agave blossom", "Citrus zest", "Roasted earth", "Green herbs"],
          body: "The nose opens with the unmistakable perfume of agave blossom — wild, alive, slightly vegetal. Fresh citrus lifts the bouquet, while hints of roasted earth signal the 72-hour stone-oven roasting at the heart of our process. Complex and immediately captivating."
        },
        {
          type: "Palate",
          title: "Vivid & Alive",
          tags: ["Roasted agave", "Black pepper", "Tropical fruit", "Volcanic mineral"],
          body: "A palate of genuine complexity. Waves of roasted agave sweetness give way to tropical fruit, then a pleasantly assertive peppery bite. The mineral character of Jalisco's volcanic red clay soil comes through clearly and memorably in the mid-palate."
        },
        {
          type: "Finish",
          title: "Long & Botanical",
          tags: ["Dried herbs", "White smoke", "Warm spice"],
          body: "A long, warming finish that dries beautifully. Dried herbal notes linger with a faint smokiness from the stone ovens. The kind of finish that rewards patient sipping — one of those rare tequilas you want to understand, not simply consume."
        }
      ]
    },
    sections: [],
    forPartnersTitle: "For premium venues",
    forPartnersBody: "Cousins Distillery Tequila is crafted for luxury bars, cocktail dens, and high-end hospitality partners who value quality, story, and consistency. We support partners with tasting notes, pairing ideas, and tailored cocktail concepts.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline: "Experience the refined character of Cousins Distillery Tequila",
    finalCtaLabel: "Shop Tequila",
    finalCtaHref: "/contact",
  },
  {
    slug: "blue-agave-spirit",
    name: "COUSINS AGAVE",
    metaTitle: "Blue Agave Spirit | Modern Agave Expression | Cousins Distillery",
    metaDescription: "Discover the rich, distinctive character of Cousins Distillery Blue Agave Spirit. A modern expression of agave.",
    metaKeywords: ["blue agave spirit", "agave spirit", "craft agave", "jalisco agave", "artisanal agave", "cousins distillery agave"],
    headline: "COUSINS AGAVE",
    subheading: "Cousins Agave is our most untamed expression. While it operates outside the traditional categories of tequila, this 100% pure agave spirit is crafted with the same level of devotion. Cultivated in the fields of Jalisco, Mexico, for five to eight years and harvested at peak maturity, our agave is processed using traditional techniques and our signature distillation process.\n\nThe result is a singular spirit — wild, expressive, and unforgettable. It is neither mezcal nor tequila, but something entirely unique: Cousins Agave.",
    primaryCta: { label: "Shop Blue Agave Spirit", href: CONTACT_HREF },
    secondaryCta: { label: "See Tasting Notes", href: CONTACT_HREF },
    image: "/agave-v2.png",
    sourceImage: "/blue-agave.jpg",
    eyebrow: "🌿  Pure Agave  ·  Jalisco, Mexico",
    subtitle: "Pure Agave Blanco Spirit",
    stats: [
      { label: "Base", value: "Pure Agave" },
      { label: "ABV", value: "40% vol." },
      { label: "Ferment", value: "Open Air" },
      { label: "Origin", value: "Jalisco, Mexico" }
    ],
    storySections: [
      {
        label: "The Plant",
        title: "Agave grown *on Mexican soil*",
        body: [
          "Native to Mexico, agave thrives in high temperatures without the need for additional water. Our plants grow on dry, well-drained, sun-exposed slopes in Jalisco, where intense heat and low rainfall create ideal conditions.",
          "We cultivate several agave species for this expression, prioritizing flavor complexity over any single botanical profile. The result is a spirit with a distinct Mexican character that reflects both volcanic minerality and warm, dry terroir."
        ]
      },
      {
        label: "Open-Air Fermentation",
        title: "Wild yeast. *Honest character.*",
        body: [
          "Our piñas are slow-roasted and crushed before the juice ferments in open-air stone vats, exposed to wild yeasts on the estate.",
          "As the most traditional and least controlled step in our process, this natural fermentation allows remarkable aromatic complexity. Depending on season and ambient conditions, this stage can take up to seven days. No commercial yeast. No temperature control."
        ]
      }
    ],
    tastingNotes: {
      label: "Tasting Notes",
      title: "In the *glass*",
      notes: [
        {
          type: "Nose",
          title: "Wild & Botanical",
          tags: ["Roasted agave", "Wild herbs", "Stone fruit", "Sun-baked earth", "Light smoke"],
          body: "A nose of genuine wildness — roasted agave, wild herbs, and subtle smokiness from the stone-roasting process. There is a sun-baked earthiness underneath it all that speaks unmistakably of the Mexican landscape in summer heat. Complex, evolving, and deeply compelling."
        },
        {
          type: "Palate",
          title: "Intense & Expressive",
          tags: ["Charred agave", "Citrus pith", "Sea minerals", "Green pepper"],
          body: "An expressive palate with the intensity that open-air fermentation produces — charred agave sweetness, citrus pith, a pleasingly assertive vegetal quality, and an almost sea-mineral finish entirely unique to our Mexican climate. This is a spirit for the curious and the brave."
        },
        {
          type: "Finish",
          title: "Dry & Lasting",
          tags: ["Dried botanical", "Light smoke", "Mineral salt"],
          body: "A long, dry, beautifully botanical finish. Light smoke, dried herbs, and a faint mineral saltiness that lingers and evolves over several minutes. The kind of finish that changes your understanding of what agave is capable of — and makes you immediately reach for another measure."
        }
      ]
    },
    sections: [],
    forPartnersTitle: "For partners and venues",
    forPartnersBody: "Cousins Distillery Blue Agave Spirit is crafted for trend-forward bars, cocktail lounges, and lifestyle venues that want a distinctive agave-based spirit with a clean, modern profile. We provide cocktail suggestions, pairing ideas, and product support.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline: "Discover the refined character of Cousins Distillery Blue Agave Spirit",
    finalCtaLabel: "Shop Blue Agave Spirit",
    finalCtaHref: "/contact",
  },
  {
    slug: "whiskey",
    name: "COUSINS WHISKEY",
    metaTitle: "Rye Whiskey | Single Farm Rye Expression | Cousins Distillery",
    metaDescription: "Discover Cousins Whiskey: a bold single farm rye expression, naturally fermented and rested in hand-selected oak barrels.",
    metaKeywords: ["rye whiskey", "single farm rye", "craft whiskey", "small-batch whiskey", "cousins distillery whiskey"],
    headline: "COUSINS WHISKEY",
    subheading: "Rye whiskey is the boldest spirit we make, rewarding patience and attention. Our rye is grown in the cool, elevated fields of our Canadian Partnered estates in the Prairies, where significant diurnal temperature shifts force the grain to develop a density of flavor rarely found in commercial crops. Harvested at peak ripeness, our whiskey is naturally fermented and rested in hand-selected oak barrels. The result is a spirit that is decidedly its own: Canadian in origin, classical in craft, and absolutely unapologetic in character.",
    primaryCta: { label: "Shop Whiskey", href: CONTACT_HREF },
    secondaryCta: { label: "See Tasting Notes", href: CONTACT_HREF },
    image: "/whiskey.png",
    sourceImage: "/cornone.jpg",
    eyebrow: "🥃  Single Farm Rye  ·  Canada",
    subtitle: "Rye Whiskey · Single Farm Rye Expression",
    stats: [
      { label: "Base", value: "Single Farm Rye" },
      { label: "ABV", value: "40% vol." },
      { label: "Barrel", value: "Oak" }
    ],
    storySections: [
      {
        label: "The Grain",
        title: "Rye grown *at altitude*",
        body: [
          "Grown in cool, elevated fields where diurnal temperature swings can exceed 20°C, our rye develops exceptional aromatic density and deep spice complexity. By combining these conditions with lower-yield heritage varieties, we create a flavor profile that far exceeds commercial grain standards.",
          "To preserve this quality, the grain is stone-milled and mashed on-site within 24 hours of harvest. We use natural fermentation with wild yeasts to ensure every batch expresses the unique terroir of our estate."
        ]
      },
      {
        label: "Oak Resting",
        title: "Patience in *every barrel*",
        body: [
          "Cousins Whiskey is aged in hand-selected new oak barrels to preserve its uncompromised taste. Our process relies on seasonal climate shifts to drive the steady, cyclical barrel absorption that deepens the spirit's natural evolution.",
          "We bottle only when the whiskey is ready, rather than following a fixed schedule or quarterly target. This commitment to patience is what sets Cousins Whiskey apart."
        ]
      }
    ],
    tastingNotes: {
      label: "Tasting Notes",
      title: "In the *glass*",
      notes: [
        {
          type: "Nose",
          title: "Bold & Spiced",
          tags: ["Dark caramel", "Toasted rye", "Cinnamon bark", "Dried cherry"],
          body: "A commanding nose of dark caramel and toasted rye bread, followed by cinnamon bark and clove. With time in the glass, hints of dried cherry and orange peel emerge."
        },
        {
          type: "Palate",
          title: "Rich & Layered",
          tags: ["Toffee", "Black pepper", "Oak tannin", "Dried fruit"],
          body: "The palate is rich and layered with bold rye spice at the forefront. Notes of black pepper and cinnamon are balanced by toffee sweetness and the gentle grip of oak tannins."
        },
        {
          type: "Finish",
          title: "Long & Warming",
          tags: ["Oak smoke", "Dark spice", "Vanilla cream"],
          body: "A long, warming finish with satisfying oak dryness and lingering dark spice. A whisper of vanilla cream emerges at the close, leaving a smooth, contemplative impression."
        }
      ]
    },
    sections: [],
    forPartnersTitle: "For premium bars and lounges",
    forPartnersBody: "Cousins Whiskey is crafted for high-end bars, private clubs, and hospitality partners seeking a bold, premium rye expression with exceptional structure and smoothness.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline: "Discover the bold character of Cousins Whiskey",
    finalCtaLabel: "Shop Whiskey",
    finalCtaHref: "/contact",
  }
];

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
