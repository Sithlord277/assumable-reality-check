// Central, hand-editable configuration: feature flags + integration settings.
// Values come from NEXT_PUBLIC_* env vars (see .env.example) with safe fallbacks.

export const appConfig = {
  // Booth teaser. When true, the app shows a short ~3-screen teaser instead of the full flow.
  demoMode: false,

  // Soft, adult gamification (progress + unlock moments). Set false to turn it all off.
  gamification: true,

  // Booking links. Set a general link, or a different link per result type.
  // A blank per-result link falls back to the general link at render time.
  calendly: {
    general: process.env.NEXT_PUBLIC_CALENDLY_GENERAL ?? "",
    portalWalkthrough: process.env.NEXT_PUBLIC_CALENDLY_PORTAL_WALKTHROUGH ?? "",
    numbersReview: process.env.NEXT_PUBLIC_CALENDLY_NUMBERS_REVIEW ?? "",
    strategyCall: process.env.NEXT_PUBLIC_CALENDLY_STRATEGY_CALL ?? "",
  },

  // EmailJS (client-side "email me my results"). These are public keys, safe in the browser.
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
    templateUser: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_USER ?? "",
    templateMartin: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_MARTIN ?? "",
  },
};
