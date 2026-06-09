// ------------------------------------------------------------------------
// Care & Pack Details
//
// Wash care, what's-in-the-box, and textile type for each product
// (taken from the product sheet).
// ------------------------------------------------------------------------

// Care, package contents and textile notes — sourced from the SROJA product sheet.
export interface CareDetail {
  care: string[];
  components: string;
  textile: string;
}

export const CARE: Record<string, CareDetail> = {
  "gul-meher-cushion-cover": {
    care: ["Gentle hand wash separately in cold water", "Use mild detergent only", "Do not wring aggressively", "Dry flat in shade", "Warm iron on reverse side"],
    components: "1 Cushion Cover",
    textile: "Hand Block Print",
  },
  "baagh-check-cushion": {
    care: ["Gentle hand wash separately in cold water", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron if required"],
    components: "1 Cushion Cover",
    textile: "Handwoven Checks",
  },
  "kendra-bhujodi-cushion": {
    care: ["Dry clean recommended", "Spot clean gently when needed", "Avoid prolonged exposure to direct sunlight", "Do not machine wash", "Store in a dry place"],
    components: "1 Cushion Cover",
    textile: "Bhujodi",
  },
  "gulnaar-baagh-cushion-cover": {
    care: ["Gentle hand wash separately in cold water", "Use mild detergent only", "Do not wring aggressively", "Dry flat in shade", "Warm iron on reverse side"],
    components: "1 Cushion Cover",
    textile: "Hand Block Print",
  },
  "chaap-bhujodi-cushion": {
    care: ["Dry clean recommended", "Spot clean gently when needed", "Avoid prolonged exposure to direct sunlight", "Do not machine wash", "Store in a dry place"],
    components: "1 Cushion Cover",
    textile: "Bhujodi",
  },
  "lehar-bhujodi-cushion": {
    care: ["Dry clean recommended", "Spot clean gently when needed", "Avoid prolonged exposure to direct sunlight", "Do not machine wash", "Store in a dry place"],
    components: "1 Cushion Cover",
    textile: "Bhujodi",
  },
  "rekha-bhujodi-cushion": {
    care: ["Dry clean recommended", "Spot clean gently when needed", "Avoid prolonged exposure to direct sunlight", "Do not machine wash", "Store in a dry place"],
    components: "1 Cushion Cover",
    textile: "Bhujodi",
  },
  "rangrez-baithak-cushion": {
    care: ["Gentle hand wash separately in cold water", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron if required"],
    components: "1 Cushion Cover",
    textile: "Handwoven Checks",
  },
  "reva-bhujodi-cushion": {
    care: ["Dry clean recommended", "Spot clean gently when needed", "Avoid prolonged exposure to direct sunlight", "Do not machine wash", "Store in a dry place"],
    components: "1 Cushion Cover",
    textile: "Bhujodi",
  },
  "neel-gul-bagh-cushion-cover": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately for the first few washes", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron on reverse if needed"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "genda-baagh-quilt": {
    care: ["Dry clean recommended for first wash", "Thereafter, gentle hand wash separately in cold water", "Use mild liquid detergent only", "Do not soak or scrub", "Dry in shade away from direct sunlight", "Natural fading over time is characteristic of handcrafted textiles"],
    components: "1 Quilt",
    textile: "Hand Block Print",
  },
  "neel-jaali-palm-quilt": {
    care: ["Dry clean recommended for first wash", "Thereafter, gentle hand wash separately in cold water", "Use mild liquid detergent only", "Do not soak or scrub", "Dry in shade away from direct sunlight", "Natural fading over time is characteristic of handcrafted textiles"],
    components: "1 Quilt",
    textile: "Hand Block Print",
  },
  "zareen-gul-quilt": {
    care: ["Dry clean recommended for first wash", "Thereafter, gentle hand wash separately in cold water", "Use mild liquid detergent only", "Do not soak or scrub", "Dry in shade away from direct sunlight", "Natural fading over time is characteristic of handcrafted textiles"],
    components: "1 Quilt",
    textile: "Hand Block Print",
  },
  "neel-rekha-quilt": {
    care: ["Dry clean recommended for first wash", "Thereafter, gentle hand wash separately in cold water", "Use mild liquid detergent only", "Do not bleach or scrub", "Dry flat in shade", "Fluff gently after drying to retain softness"],
    components: "1 Quilt",
    textile: "Handwoven",
  },
  "gulnaar-heritage-quilt": {
    care: ["Dry clean recommended for first wash", "Thereafter, gentle hand wash separately in cold water", "Use mild liquid detergent only", "Do not soak or scrub", "Dry in shade away from direct sunlight", "Natural fading over time is characteristic of handcrafted textiles"],
    components: "1 Quilt",
    textile: "Hand Block Print",
  },
  "charcoal-line-dohar": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately using mild detergent", "Do not bleach", "Tumble dry on low or dry in shade", "Warm iron if required"],
    components: "1 Dohar",
    textile: "Handwoven",
  },
  "baagh-check-dohar": {
    care: ["Gentle hand wash separately in cold water", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron if required"],
    components: "1 Cushion Cover",
    textile: "Handwoven Checks",
  },
  "neel-gul-bagh-bedsheet-set": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately for the first few washes", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron on reverse if needed"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "gulbaag-buti-quilted-bedsheet-set": {
    care: ["Dry clean recommended for first wash", "Thereafter, gentle hand wash separately in cold water", "Use mild liquid detergent only", "Do not soak or scrub", "Dry in shade away from direct sunlight", "Natural fading over time is characteristic of handcrafted textiles"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "neel-baagh-palm-bedsheet-set": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately for the first few washes", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron on reverse if needed"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "gulab-vana-jaal-bedsheet-set": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately for the first few washes", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron on reverse if needed"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "rang-sutra-stripe-curtains": {
    care: ["Gentle hand wash separately in cold water", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron if required"],
    components: "1 Curtain",
    textile: "Handwoven Stripes",
  },
  "gulbagh-curtain-i": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately for the first few washes", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron on reverse if needed"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "gulbagh-curtain-ii": {
    care: ["Gentle machine wash or hand wash in cold water", "Wash separately for the first few washes", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron on reverse if needed"],
    components: "1 Bedsheet + 2 Standard Pillowcases",
    textile: "Hand Block Print",
  },
  "mehr-gul-curtain-i": {
    care: ["Gentle hand wash separately in cold water", "Mild detergent only", "Do not bleach or soak", "Dry in shade away from direct sunlight", "Warm iron on reverse side if needed"],
    components: "1 Curtain",
    textile: "Hand Block Print",
  },
  "mehr-gul-curtain-ii": {
    care: ["Gentle hand wash separately in cold water", "Mild detergent only", "Do not bleach or soak", "Dry in shade away from direct sunlight", "Warm iron on reverse side if needed"],
    components: "1 Curtain",
    textile: "Hand Block Print",
  },
  "handwoven-madras-checks-i": {
    care: ["Gentle machine wash or hand wash in cold water", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron if required"],
    components: "1 Curtain Panel",
    textile: "Handwoven Cotton Checks",
  },
  "handwoven-madras-checks-ii": {
    care: ["Gentle machine wash or hand wash in cold water", "Use mild detergent", "Do not bleach", "Dry in shade", "Warm iron if required"],
    components: "1 Curtain Panel",
    textile: "Handwoven Cotton Checks",
  },
};

export const getCare = (slug: string): CareDetail | undefined => CARE[slug];