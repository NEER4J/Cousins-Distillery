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
  metaKeywords: string[];
  headline: string;
  subheading: string;
  primaryCta: ProductCta;
  secondaryCta: ProductCta;
  image: string;
  sourceImage: string;
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
    metaTitle: "Premium Artisanal Vodka | 13-Stage Distilled | Cousins Distillery",
    metaDescription:
      "Cousins Distillery Vodka: The essence of purity. Small-batch craft vodka refined through thirteen stages for an exceptionally smooth, silky finish.",
    metaKeywords: ["craft vodka", "small-batch vodka", "13-stage distillation", "premium spirit", "smooth vodka", "artisanal spirits"],
    headline: "Cousins Distillery Vodka – The Essence of Purity",
    subheading:
      "Smooth, refined, and crafted through our meticulous 13-stage distillation process.",
    primaryCta: { label: "Shop Vodka", href: CONTACT_HREF },
    secondaryCta: { label: "Try Our Signature Cocktail", href: CONTACT_HREF },
    image: "/vodka.png",
    sourceImage: "/cornone.jpg",
    sections: [
      {
        title: "The spirit of purity",
        body: "Cousins Distillery Vodka is the foundation of our house. It was the first expression of our vision: to create a spirit that feels as elegant as it tastes. Crafted from carefully selected grains and refined through all 13 stages of distillation, our vodka achieves exceptional clarity and a silky texture that elevates every sip—whether enjoyed neat, on ice, or in a meticulously crafted cocktail.",
      },
      {
        title: "Crafted for refinement",
        body: "Distilled from premium corn, our vodka is designed to be clean, balanced, and versatile, with a subtle character that shines through in classic and contemporary cocktails. At Cousins Distillery, we believe a great vodka should never overpower the moment. The 13-stage process ensures impurities are carefully removed, leaving a smooth, refined spirit with a clean finish and a refined mouthfeel.",
      },
      {
        title: "Signature moments",
        body: "Our vodka is made for those who appreciate the finer details:",
        bullets: [
          "A chilled neat pour, served in a cut-crystal glass",
          "A perfectly balanced martini or vodka-soda",
          "A signature house cocktail created with premium mixers and fresh ingredients",
        ],
        cta: { label: "Discover Our Cocktail Pairings", href: CONTACT_HREF },
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
    metaTitle: "Blue Agave Spirit | Modern Agave Expression | Cousins Distillery",
    metaDescription:
      "Discover the rich, distinctive character of Cousins Distillery Blue Agave Spirit. A modern expression of agave, crafted with precision and heritage.",
    metaKeywords: ["blue agave spirit", "agave spirit", "craft agave", "jalisco agave", "artisanal agave", "cousins distillery agave"],
    headline: "Blue Agave Spirit by Cousins Distillery – Refined, Rich, Distinctive",
    subheading:
      "A modern expression of agave, crafted with precision through our 13-stage distillation process.",
    primaryCta: { label: "Shop Blue Agave Spirit", href: CONTACT_HREF },
    secondaryCta: { label: "See Tasting Notes", href: CONTACT_HREF },
    image: "/blue-agave.png",
    sourceImage: "/blue-agave.jpg",
    sections: [
      {
        title: "A new expression of agave",
        body: "Blue agave tequila is a distilled spirit made exclusively from the Agave tequilana Weber Azul plant, predominantly grown in Jalisco, Mexico. Where our cousins Blue agave is harvested. By law, it must contain at least 51% blue agave sugars (100% for premium versions), providing a distinctively earthy, sweet flavor profile developed over 6–8 years of plant maturation.",
      },
      {
        title: "Key Facts & Production",
        body: "Crafted from fresh agave and its natural juices, the heart of the plant—known as the piña—is harvested, roasted, crushed to release juice (aguamiel), fermented, and distilled. Our production honors the traditional geography and true essence of the agave.",
        bullets: [
          "100% Blue Agave: Highest quality, must be bottled within the region of origin.",
          "Cousins Distillery Varieties: Crafted from 100% blue agave and typically rested for a minimum of 3 months to allow the spirit to settle.",
          "Taste Profile: Bright herbal notes, subtle sweetness, and a crisp finish.",
        ],
        bodyAfter:
          "Target Market: Tequila enthusiasts, mixologists, and consumers who appreciate a fresh, authentic agave-forward spirit. Ideal for cocktail bars, restaurants, and social gatherings.",
      },
      {
        title: "Bottling and presentation",
        body: "Packaged in a minimalist, premium bottle, Blue Agave Spirit is designed to sit comfortably on luxury bars and private collections. Rooted in family. Refined in spirit.",
      },
    ],
    forPartnersTitle: "For partners and venues",
    forPartnersBody:
      "Cousins Distillery Blue Agave Spirit is crafted for trend-forward bars, cocktail lounges, and lifestyle venues that want a distinctive agave-based spirit with a clean, modern profile. We provide cocktail suggestions, pairing ideas, and product support.",
    forPartnersCta: { label: "Enquire About Partnership", href: CONTACT_HREF },
    finalCtaHeadline:
      "Discover the refined character of Cousins Distillery Blue Agave Spirit",
    finalCtaLabel: "Shop Blue Agave Spirit",
    finalCtaHref: "#",
  },
  {
    slug: "tequila",
    name: "Tequila",
    metaTitle: "Artisanal Tequila | Reposado & Extra Añejo | Cousins Distillery",
    metaDescription:
      "Refined Cousins Distillery Tequila. Experience our Reposado and Extra Añejo expressions, crafted for the discerning palate with respect for tradition.",
    metaKeywords: ["premium tequila", "reposado tequila", "extra anejo tequila", "artisanal tequila", "small-batch tequila", "100% blue agave"],
    headline: "Cousins Distillery Tequila – Crafted for the Discerning Palate",
    subheading:
      "A refined tequila range, crafted with respect for tradition and the agave.",
    primaryCta: { label: "Shop Tequila", href: CONTACT_HREF },
    secondaryCta: { label: "Explore Our Expressions", href: CONTACT_HREF },
    image: "/taquila.png",
    sourceImage: "/agave.jpg",
    sections: [
      {
        title: "Our Reposado Expression",
        body: "Aged a minimum of 3-6 months. Rested in oak barrels to develop a smooth balance between fresh agave character and subtle oak notes, with hints of vanilla and spice.",
        bodyAfter: "Target Market: Young professionals, social drinkers, and tequila enthusiasts who enjoy premium spirits for cocktails or casual sipping. Reposado appeals strongly to cocktail bars, restaurants, and hospitality venues seeking a versatile, high-quality tequila."
      },
      {
        title: "Extra Añejo (Aged 9–12 months)",
        body: "Made from 100% blue agave and expertly aged, extended maturation enhances the tequila’s depth, creating richer notes of caramel, oak, and spice while maintaining the smooth, sweet character of the blue agave.",
        bodyAfter: "Target Market: Premium spirit collectors, connoisseurs, and luxury consumers who appreciate sipping tequilas similar to fine whiskey or cognac. Ideal for high-end restaurants, specialty liquor retailers, and premium gift markets seeking an elevated tequila experience."
      },
      {
        title: "Serving suggestions",
        body: "Cousins Distillery Tequila is made for moments of appreciation:",
        bullets: [
          "Neat, in a tulip glass, to experience the full character",
          "On the rocks, with a twist of citrus",
          "In elevated cocktails like a refined margarita or tequila-based sour",
        ],
        cta: { label: "Discover Our Tequila Cocktails", href: CONTACT_HREF },
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
    metaTitle: "Premium Rye Whiskey | Depth, Warmth & Legacy | Cousins Distillery",
    metaDescription:
      "Cousins Distillery Whiskey: A legacy of depth and warmth. Meticulously crafted from high-quality rye and polished through thirteen stages of distillation.",
    metaKeywords: ["rye whiskey", "premium whiskey", "craft whiskey", "small-batch whiskey", "aged whiskey", "legacy spirits"],
    headline: "Cousins Distillery Whiskey – Depth, Warmth, Legacy",
    subheading:
      "A refined whiskey range, crafted with patience, tradition, and our 13-stage distillation process.",
    primaryCta: { label: "Shop Whiskey", href: CONTACT_HREF },
    secondaryCta: { label: "Explore Our Range", href: CONTACT_HREF },
    image: "/wishky.png",
    sourceImage: "/rye.jpg",
    sections: [
      {
        title: "The heart of the barrel",
        body: "Cousins Distillery Whiskey is built on the harmony between grain and oak. We begin with selected grains, carefully fermented and distilled, then aged in premium barrels to develop rich, layered flavours. Each batch is further refined through our 13-stage distillation process, which polishes the spirit for a smooth, luxurious finish without losing depth or warmth.",
      },
      {
        title: "Taste and character",
        body: "Meticulously crafted from high-quality rye, our whiskey offers a remarkable spectrum of experience:",
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
