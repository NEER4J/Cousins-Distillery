export type ProductSlug = "vodka" | "blue-agave-spirit" | "tequila";

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
    name: "COUSIN VODKA",
    metaTitle: "Premium Artisanal Vodka | 13-Stage Distilled | Cousins Distillery",
    metaDescription: "Cousins Distillery Vodka: The essence of purity. Small-batch craft vodka refined through thirteen stages.",
    metaKeywords: ["craft vodka", "small-batch vodka", "13-stage distillation", "premium spirit", "smooth vodka", "artisanal spirits"],
    headline: "COUSIN VODKA",
    subheading: "Born from the fertile plains of our Spanish estate, Cousin Vodka begins with rare heritage varieties of corn — a grain rarely associated with premium spirits, but one we have coaxed into producing something remarkable. Thirteen precise distillation passes strip away all that is unnecessary and reveal the clean, silken spirit within.\n\nExpect an almost weightless texture, a gentle sweetness from the corn's natural sugars, and a finish that lingers far longer than any vodka should. This is vodka with genuine character — made to be savoured, not just mixed.",
    primaryCta: { label: "Shop Vodka", href: CONTACT_HREF },
    secondaryCta: { label: "See Experinces", href: CONTACT_HREF },
    image: "/vodka.png",
    sourceImage: "/cornone.jpg",
    eyebrow: "🌽  Heirloom Corn  ·  España",
    subtitle: "Heirloom Corn Expression",
    stats: [
      { label: "Base", value: "Heirloom Corn" },
      { label: "ABV", value: "40% vol." },
      { label: "Stages", value: "13" },
      { label: "Origin", value: "España" }
    ],
    storySections: [
      {
        label: "The Ingredient",
        title: "Why *corn?*",
        body: [
          "Corn vodka is one of the world's best-kept secrets. Unlike wheat or potato, quality heirloom corn brings a natural sweetness and body that creates a distinctly satisfying spirit with genuine personality. We grow heritage varieties on our Spanish estate — cultivars selected not for yield, but for flavour. The cobs are sun-dried, stone-milled, and mashed on-site within hours of processing, preserving every nuance of the grain's natural character.",
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
      title: "On the *glass*",
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
    name: "COUSIN TEQUILA",
    metaTitle: "Artisanal Tequila | Reposado & Primo Extra Añejo | Cousins Distillery",
    metaDescription: "Refined Cousins Distillery Tequila. Reposado aged 6 months in oak; Primo Extra Añejo aged 4 years minimum. We age to perfection in oak barrels.",
    metaKeywords: ["premium tequila", "reposado tequila", "extra anejo tequila", "primo tequila", "artisanal tequila", "small-batch tequila", "100% blue agave", "oak aged tequila"],
    headline: "COUSIN TEQUILA",
    subheading: "Our Blue Agave is sourced from the volcanic, mineral-rich soils of Jalisco, Mexico — the only region in the world legally recognised for tequila production. Made exclusively from 100% Agave tequilana Weber Azul, the plants mature for 6–8 years before harvest, accumulating complex sugars that no industrial shortcut can replicate.\n\nWe age each expression to perfection in oak barrels. Available in three distinct expressions — Blanco, Reposado, and Extra Añejo — each one a different chapter of the same extraordinary story. From the bright purity of the Blanco to the rich, contemplative depth of our Primo Extra Añejo.",
    primaryCta: { label: "Shop Tequila", href: CONTACT_HREF },
    secondaryCta: { label: "Explore Our Expressions", href: CONTACT_HREF },
    image: "/taquila.png",
    sourceImage: "/agave.jpg",
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
          "By Mexican law, tequila must contain at least 51% blue agave — the remaining 49% can be other sugars. We use none of those other sugars. Every Cousin Tequila expression is made from 100% Agave tequilana Weber Azul, the highest standard in tequila production. It costs more. It takes longer. It is the only way we know how to work.",
          "The Cousin family's deep roots in Spanish farming culture means we understand instinctively what it means to respect an agricultural product. We bring that same reverence to every piña we harvest in Jalisco."
        ]
      }
    ],
    varieties: [
      {
        number: "Expression No. 1",
        subtitle: "Rested · Minimum 3 Months",
        name: "Blanco",
        type: "Blue Agave Tequila",
        body: [
          "Crafted from 100% Blue Agave and rested for a minimum of 3 months to allow the spirit to settle and develop a clean, vibrant profile. This expression highlights the natural character of the Agave tequilana Weber Azul with bright herbal notes, subtle sweetness, and a crisp, refreshing finish that speaks directly of the plant and its volcanic home.",
          "The Blanco is Cousin Tequila at its most transparent and honest — unmasked by oak, unapologetic in its agave-forward identity. The purest window into the raw ingredient."
        ],
        idealForHeader: "Ideal For",
        idealForBody: "Tequila enthusiasts, mixologists, and consumers who appreciate a fresh, authentic agave-forward spirit. Ideal for cocktail bars, premium restaurants, and social gatherings where a high-quality tequila elevates margaritas, palomas, and premium mixed drinks."
      },
      {
        number: "Expression No. 2",
        subtitle: "Oak Aged · 6 Months",
        name: "Reposado",
        type: "Rested Blue Agave Tequila",
        body: [
          "Aged for 6 months in carefully selected oak barrels, our Reposado is brought to perfection through patient maturation. The wood imparts a smooth, elegant balance between the vibrant freshness of blue agave and the gentle influence of oak — hints of vanilla, caramel, and warm baking spice emerge naturally, enriching without overwhelming.",
          "The Reposado is the versatile heart of the Cousin Tequila range — equally at home in an elevated cocktail or sipped slowly on its own over a single large ice cube."
        ],
        idealForHeader: "Ideal For",
        idealForBody: "Young professionals, social drinkers, and tequila enthusiasts who enjoy premium spirits for cocktails or casual sipping. Reposado appeals strongly to cocktail bars, restaurants, and hospitality venues seeking a versatile, high-quality tequila with broad appeal."
      },
      {
        number: "Expression No. 3",
        subtitle: "Primo · 4 Years Minimum in Oak",
        name: "Primo Extra Añejo",
        type: "Ultra-Aged Blue Agave Tequila",
        body: [
          "Our Primo Extra Añejo is aged a minimum of 4 years in premium oak barrels — we age to perfection. This extended maturation transforms the spirit into something of rare depth and distinction. Rich notes of dark caramel, toasted oak, dried fruit, and complex spice emerge, while the core blue agave character is never lost, only deepened. A tequila that demands to be sipped slowly, in the manner of fine cognac or aged single malt.",
          "Primo is our highest-end expression — very high end, a higher price point, crafted for the real connoisseur who understands that the finest things in life cannot be rushed."
        ],
        idealForHeader: "Ideal For",
        idealForBody: "Real connoisseurs and collectors who seek the highest-end sipping tequila. Primo appeals to luxury consumers, fine-dining establishments, and specialty retailers who value exceptional quality and are willing to invest in a truly premium, oak-aged experience."
      }
    ],
    tastingNotes: {
      label: "Tasting Notes · Blanco",
      title: "On the *glass*",
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
    name: "COUSIN AGAVE",
    metaTitle: "Blue Agave Spirit | Modern Agave Expression | Cousins Distillery",
    metaDescription: "Discover the rich, distinctive character of Cousins Distillery Blue Agave Spirit. A modern expression of agave.",
    metaKeywords: ["blue agave spirit", "agave spirit", "craft agave", "jalisco agave", "artisanal agave", "cousins distillery agave"],
    headline: "COUSIN AGAVE",
    subheading: "Cousin Agave is our most untamed expression — a pure agave spirit that operates outside the categories and conventions of tequila, yet is made with every ounce of the same devotion. Agave plants cultivated on our Spanish estate over multiple years, harvested at peak maturity, and processed with a combination of traditional technique and our signature 13-stage distillation.\n\nThe result is something singular — wild, expressive, and unforgettable. Neither mezcal, nor tequila, nor anything that currently has a proper name. It is simply, completely, Cousin Agave.",
    primaryCta: { label: "Shop Blue Agave Spirit", href: CONTACT_HREF },
    secondaryCta: { label: "See Tasting Notes", href: CONTACT_HREF },
    image: "/blue-agave.png",
    sourceImage: "/blue-agave.jpg",
    eyebrow: "🌿  Pure Agave  ·  España",
    subtitle: "Pure Agave Blanco Spirit",
    stats: [
      { label: "Base", value: "Pure Agave" },
      { label: "ABV", value: "42% vol." },
      { label: "Ferment", value: "Open Air" },
      { label: "Origin", value: "España" }
    ],
    storySections: [
      {
        label: "The Plant",
        title: "Agave grown *on Spanish soil*",
        body: [
          "Agave is not native to Spain — but under the right conditions, it thrives. Our agave plants grow on the dry, well-drained, sun-exposed slopes of our estate, where the Mediterranean climate provides the intense heat and low rainfall that agave demands. We cultivate several agave species for this expression, selecting for flavour complexity rather than any single botanical profile.",
          "The result is an agave spirit with a distinct Spanish character — reflecting both the volcanic, mineral quality of agave as a plant and the warm, dry terroir of our estate. It is at once familiar and entirely novel."
        ]
      },
      {
        label: "Open-Air Fermentation",
        title: "Wild yeast. *Honest character.*",
        body: [
          "After the piñas are slow-roasted and crushed, the agave juice ferments in open-air stone vats — exposed to the wild yeasts that float through the air of our estate. This is perhaps the most ancient, least controlled step in our entire process, and it produces some of the most remarkable aromatic complexity we achieve.",
          "Fermentation can take up to 7 days depending on the season and ambient conditions. No commercial yeast. No temperature control. Just agave, air, and time — doing what they have always done together."
        ]
      }
    ],
    tastingNotes: {
      label: "Tasting Notes",
      title: "On the *glass*",
      notes: [
        {
          type: "Nose",
          title: "Wild & Botanical",
          tags: ["Roasted agave", "Wild herbs", "Stone fruit", "Sun-baked earth", "Light smoke"],
          body: "A nose of genuine wildness — roasted agave, wild herbs, and subtle smokiness from the stone-roasting process. There is a sun-baked earthiness underneath it all that speaks unmistakably of Spanish landscape in summer heat. Complex, evolving, and deeply compelling."
        },
        {
          type: "Palate",
          title: "Intense & Expressive",
          tags: ["Charred agave", "Citrus pith", "Sea minerals", "Green pepper"],
          body: "An expressive palate with the intensity that open-air fermentation produces — charred agave sweetness, citrus pith, a pleasingly assertive vegetal quality, and an almost sea-mineral finish entirely unique to our Spanish terroir. This is a spirit for the curious and the brave."
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
  }
];

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
