export type ProductSlug = "vodka" | "blue-agave-spirit" | "tequila" | "whiskey";

export interface ProductSection {
  title: string;
  body?: string;
  bullets?: string[];
  bodyAfter?: string;
  cta?: { label: string; href: string };
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
  headline: string;
  subheading: string;
  primaryCta: ProductCta;
  secondaryCta: ProductCta;
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
    name: "Vodka",
    metaTitle: "Vodka – The Essence of Purity",
    metaDescription:
      "Cousins Distillery Vodka. Smooth, refined, crafted through our meticulous 13-stage distillation process. The foundation of our house.",
    headline: "Cousins Distillery Vodka – The Essence of Purity",
    subheading:
      "Smooth, refined, and crafted through our meticulous 13-stage distillation process.",
    primaryCta: { label: "Shop Vodka", href: "#" },
    secondaryCta: { label: "Try Our Signature Cocktail", href: "#" },
    sections: [
      {
        title: "The spirit of purity",
        body: "Cousins Distillery Vodka is the foundation of our house. It was the first expression of our vision: to create a spirit that feels as elegant as it tastes. Crafted from carefully selected grains and refined through all 13 stages of distillation, our vodka achieves exceptional clarity and a silky texture that elevates every sip—whether enjoyed neat, on ice, or in a meticulously crafted cocktail.",
      },
      {
        title: "Crafted for refinement",
        body: "At Cousins Distillery, we believe a great vodka should never overpower the moment. Our vodka is designed to be clean, balanced, and versatile, with a subtle character that shines through in both classic and contemporary cocktails. The 13-stage process ensures impurities are carefully removed, leaving a smooth, refined spirit with a clean finish and a refined mouthfeel.",
      },
      {
        title: "Signature moments",
        body: "Our vodka is made for those who appreciate the finer details:",
        bullets: [
          "A chilled neat pour, served in a cut-crystal glass",
          "A perfectly balanced martini or vodka-soda",
          "A signature house cocktail created with premium mixers and fresh ingredients",
        ],
        cta: { label: "Discover Our Cocktail Pairings", href: "#" },
      },
    ],
    forPartnersTitle: "For bars and venues",
    forPartnersBody:
      "Cousins Distillery Vodka is ideal for luxury bars, fine-dining venues, and boutique hospitality partners who value consistency, quality, and elegance. We offer tailored bar programs, cocktail recommendations, and product support to help you present our vodka in the best possible light.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline: "Experience the purity of Cousins Distillery Vodka",
    finalCtaLabel: "Shop Vodka",
    finalCtaHref: "#",
  },
  {
    slug: "blue-agave-spirit",
    name: "Blue Agave Spirit",
    metaTitle: "Blue Agave Spirit – Refined, Rich, Distinctive",
    metaDescription:
      "Blue Agave Spirit by Cousins Distillery. A modern expression of agave, crafted with precision through our 13-stage distillation process.",
    headline: "Blue Agave Spirit by Cousins Distillery – Refined, Rich, Distinctive",
    subheading:
      "A modern expression of agave, crafted with precision through our 13-stage distillation process.",
    primaryCta: { label: "Shop Blue Agave Spirit", href: "#" },
    secondaryCta: { label: "See Tasting Notes", href: "#" },
    sections: [
      {
        title: "A new expression of agave",
        body: "Blue Agave Spirit is Cousins Distillery's refined take on the agave spirit category. We start with premium blue agave, capturing its natural sweetness and depth, then refine it through our 13-stage distillation process to create a smooth, rounded spirit with subtle complexity. The result is a modern, versatile expression that feels both bold and balanced.",
      },
      {
        title: "Taste profile",
        body: "Our Blue Agave Spirit reveals layers of character:",
        bullets: [
          "Warm, lightly spiced sweetness from the agave",
          "A smooth, rounded mouthfeel",
          "A clean, refined finish with a hint of citrus and herbal notes",
        ],
        bodyAfter:
          "It is ideal for sipping neat, on ice, or in agave-forward cocktails that celebrate the natural spirit.",
      },
      {
        title: "Bottling and presentation",
        body: "Packaged in a minimalist, premium bottle, Blue Agave Spirit is designed to sit comfortably on luxury bars and private collections. Its clean label and understated elegance reflect the same philosophy that shapes the spirit within: refined craftsmanship, quiet confidence, and attention to detail.",
      },
    ],
    forPartnersTitle: "For partners and venues",
    forPartnersBody:
      "Cousins Distillery Blue Agave Spirit is crafted for trend-forward bars, cocktail lounges, and lifestyle venues that want a distinctive agave-based spirit with a clean, modern profile. We provide cocktail suggestions, pairing ideas, and product support to help you showcase this spirit with confidence.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline:
      "Discover the refined character of Cousins Distillery Blue Agave Spirit",
    finalCtaLabel: "Shop Blue Agave Spirit",
    finalCtaHref: "#",
  },
  {
    slug: "tequila",
    name: "Tequila",
    metaTitle: "Tequila – Crafted for the Discerning Palate",
    metaDescription:
      "Cousins Distillery Tequila. A refined tequila range, crafted with respect for tradition and the agave. Blanco, Reposado, and Añejo.",
    headline: "Cousins Distillery Tequila – Crafted for the Discerning Palate",
    subheading:
      "A refined tequila range, crafted with respect for tradition and the agave.",
    primaryCta: { label: "Shop Tequila", href: "#" },
    secondaryCta: { label: "Explore Our Expressions", href: "#" },
    sections: [
      {
        title: "The spirit of agave",
        body: "Cousins Distillery Tequila celebrates the agave with balance, elegance, and precision. Using carefully nurtured blue agave and a patient distillation process, we create tequila that feels both authentic and refined. Each expression is then polished through our 13-stage distillation process, allowing subtle aromas and smooth textures to shine without harsh edges.",
      },
      {
        title: "Our tequila range",
        body: "Our tequila range is designed for those who appreciate nuance:",
        bullets: [
          "Blanco (Silver) – Bright, vibrant, and citrus-forward, with a clean, lively finish",
          "Reposado – Aged in oak to reveal notes of vanilla, spice, and warmth, while remaining smooth",
          "Añejo (premium expression) – Deeply layered, with rich oak, caramel, and spice, finished with a refined, silky mouthfeel",
        ],
        bodyAfter:
          "Each style is crafted to be enjoyed neat, on the rocks, or in thoughtfully composed cocktails.",
      },
      {
        title: "Serving suggestions",
        body: "Cousins Distillery Tequila is made for moments of appreciation:",
        bullets: [
          "Neat, in a tulip glass, to experience the full character",
          "On the rocks, with a twist of citrus",
          "In elevated cocktails like a refined margarita or tequila-based sour",
        ],
        cta: { label: "Discover Our Tequila Cocktails", href: "#" },
      },
    ],
    forPartnersTitle: "For premium venues",
    forPartnersBody:
      "Cousins Distillery Tequila is crafted for luxury bars, cocktail dens, and high-end hospitality partners who value quality, story, and consistency. We support partners with tasting notes, pairing ideas, and tailored cocktail concepts.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline:
      "Experience the refined character of Cousins Distillery Tequila",
    finalCtaLabel: "Shop Tequila",
    finalCtaHref: "#",
  },
  {
    slug: "whiskey",
    name: "Whiskey",
    metaTitle: "Whiskey – Depth, Warmth, Legacy",
    metaDescription:
      "Cousins Distillery Whiskey. A refined whiskey range, crafted with patience, tradition, and our 13-stage distillation process.",
    headline: "Cousins Distillery Whiskey – Depth, Warmth, Legacy",
    subheading:
      "A refined whiskey range, crafted with patience, tradition, and our 13-stage distillation process.",
    primaryCta: { label: "Shop Whiskey", href: "#" },
    secondaryCta: { label: "Explore Our Range", href: "#" },
    sections: [
      {
        title: "The heart of the barrel",
        body: "Cousins Distillery Whiskey is built on the harmony between grain and oak. We begin with selected grains, carefully fermented and distilled, then aged in premium barrels to develop rich, layered flavours. Each batch is further refined through our 13-stage distillation process, which polishes the spirit for a smooth, luxurious finish without losing depth or warmth.",
      },
      {
        title: "Taste and character",
        body: "Our whiskey range offers a spectrum of experience:",
        bullets: [
          "Striking balance of vanilla, caramel, and spice",
          "Silky texture and a long, warming finish",
          "Slight smokiness or oak character, depending on the expression",
        ],
        bodyAfter:
          "It is designed for sipping slowly, not rushing through, and pairs beautifully with quiet evenings, conversation, or dessert.",
      },
      {
        title: "For the connoisseur",
        body: "Cousins Distillery Whiskey speaks to those who appreciate tradition, patience, and craftsmanship. From single-malt-inspired styles to blended, smooth expressions, each variant is crafted to be enjoyed in a way that suits the drinker—neat, with a drop of water, or on the rocks in a cut-glass tumbler.",
      },
    ],
    forPartnersTitle: "For luxury hospitality",
    forPartnersBody:
      "Cousins Distillery Whiskey is ideal for private lounges, fine-dining bars, and members-only clubs that curate exceptional spirits. We collaborate with partners to provide curation notes, pairing ideas, and cocktail concepts that elevate the whiskey-serving experience.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline:
      "Discover the depth and warmth of Cousins Distillery Whiskey",
    finalCtaLabel: "Shop Whiskey",
    finalCtaHref: "#",
  },
];

export function getProduct(slug: string): Product | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
