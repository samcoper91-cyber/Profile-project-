/* =============================================================================
   CONTENT — edit everything about your portfolio here.
   -----------------------------------------------------------------------------
   • Text already filled in uses the details you provided.
   • Anything wrapped in [SQUARE BRACKETS] is a placeholder for you to replace.
   • Swap the image paths once you drop your real photos into /public.
   ============================================================================= */

export const site = {
  name: "Anurag Chand",
  role: "Digital Marketer",
  location: "Bangalore, India",
  available: true, // toggles the "Available for work" badge in the hero
  email: "algchand@gmail.com",
  phone: "+91 93150 57203",
  phoneHref: "tel:+919315057203",
  resumeUrl: "#", // [ADD A LINK TO YOUR RESUME / CV (PDF) HERE]
  socials: {
    linkedin: "https://linkedin.com/in/anurag-chand-040995402",
    // [ADD MORE SOCIALS IF YOU LIKE — e.g. instagram / x / behance]
  },
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  // First line is the eyebrow, name is the big headline.
  eyebrow: "Digital Marketer · Bangalore",
  // Tagline — adapted from your own words; tweak it to sound exactly like you.
  tagline:
    "I help brands connect with the people behind the screen — turning online curiosity into campaigns that actually grow.",
  // Optional: a portrait image. Drop a file in /public and update the path.
  portrait: "/portrait.png",
};

// Small stat row under the hero. Replace the bracketed numbers as you grow.
export const stats = [
  { value: "1+", label: "Years of hands-on experience" },
  { value: "[X]+", label: "Projects & campaigns delivered" },
  { value: "[X]+", label: "Happy clients & collaborators" },
];

// Scrolling marquee strip — your toolkit. Add / remove freely.
export const marquee = [
  "SEO",
  "SEO Audits",
  "On-Page SEO",
  "Off-Page SEO",
  "Backlinks",
  "Google Ads",
  "Meta Ads",
  "Social Media Marketing",
  "Content Writing",
  "Copywriting",
  "Web Content Writing",
  "Web Design",
];

// "What I do" — three service pillars (from "what you bring to the table").
export const services = [
  {
    id: "search",
    index: "01",
    title: "Search Marketing",
    subtitle: "SEO & Google Ads",
    description:
      "On-page, off-page and technical SEO — audits, backlinks and high-intent Google Ads campaigns that put you in front of the right search.",
    skills: ["On-Page SEO", "Off-Page SEO", "SEO Audits", "Google Ads"],
  },
  {
    id: "social",
    index: "02",
    title: "Paid Social",
    subtitle: "Meta Ads",
    description:
      "Targeted Meta (Facebook & Instagram) ad campaigns and social media marketing built to reach, engage and convert your audience.",
    skills: ["Meta Ads", "Social Media Marketing", "Audience Targeting"],
  },
  {
    id: "content",
    index: "03",
    title: "Content",
    subtitle: "Copywriting & Creation",
    description:
      "Clear web content, copywriting and on-brand messaging that speaks to real people — not just algorithms.",
    skills: ["Copywriting", "Web Content Writing", "Content Strategy"],
  },
];

/* Selected work. The first card uses your real project; the rest are templates.
   For each project add: a one-line summary, a headline result, tags and a link. */
export const projects = [
  {
    id: "mvc-digital",
    index: "01",
    year: "20XX", // [YEAR]
    title: "SEO for MVC Digital",
    category: ["SEO", "On-Page", "Off-Page"],
    description:
      "[Add a 1–2 sentence summary of the SEO work you delivered for MVC Digital — the scope, your approach, and the outcome.]",
    result: "[KEY RESULT — e.g. +X% organic traffic in N months]",
    href: "#", // [LINK TO CASE STUDY / LIVE SITE]
    image: "/work-1.jpg", // [REPLACE WITH PROJECT IMAGE]
  },
  {
    id: "project-2",
    index: "02",
    year: "20XX",
    title: "[PROJECT TITLE]",
    category: ["Google Ads", "PPC"],
    description:
      "[Short description of the campaign — the client, the goal, and what you did.]",
    result: "[KEY RESULT — e.g. X% lower cost per lead]",
    href: "#",
    image: "/work-2.jpg",
  },
  {
    id: "project-3",
    index: "03",
    year: "20XX",
    title: "[PROJECT TITLE]",
    category: ["Meta Ads", "Social"],
    description:
      "[Short description of the campaign — the client, the goal, and what you did.]",
    result: "[KEY RESULT — e.g. Nx return on ad spend]",
    href: "#",
    image: "/work-3.jpg",
  },
];

// About — your real bio, split into paragraphs for nicer rhythm.
export const about = {
  portrait: "/about.png",
  paragraphs: [
    "I have always been fascinated by how brands connect with people online. That curiosity led me into digital marketing, and now I'm ready to help businesses grow their online presence.",
    "Right now, I'm building my foundation through my MBA at Amity University Online and gaining hands-on, practical training at the Web Marketing Academy (WMA) in Bangalore. I focus on creating marketing campaigns that actually work — whether that means optimizing a website for SEO, writing clear content, or setting up targeted Google and Meta ad campaigns.",
    "I don't just look at the metrics — I try to understand the people behind the screen. I'm eager to bring this fresh perspective, energy, and a strong willingness to learn to a forward-thinking marketing team.",
  ],
  highlights: [
    "Search Marketing — SEO & Google Ads",
    "Paid Social — Meta Ads",
    "Content — Copywriting & Content Creation",
  ],
};

/* Experience & education timeline. The first two are your real details;
   add roles/internships as you gain them. */
export const experience = [
  {
    period: "Present",
    role: "Digital Marketing Training",
    company: "Web Marketing Academy (WMA), Bangalore",
    description:
      "Hands-on, practical training in SEO, Google Ads and Meta Ads — building and optimising real campaigns end to end.",
  },
  {
    period: "Present",
    role: "MBA (Pursuing)",
    company: "Amity University Online",
    description:
      "Building a strong foundation in marketing strategy, brand management and business fundamentals.",
  },
  {
    period: "[YEAR — YEAR]",
    role: "[ROLE / INTERNSHIP TITLE]",
    company: "[COMPANY NAME]",
    description:
      "[Describe what you did and the impact you had. Add as many entries as you need.]",
  },
];

// Testimonials / recommendations — replace with real quotes when you have them.
export const testimonials = [
  {
    quote:
      "[A short recommendation from a mentor, client or colleague goes here — one or two sentences about working with you.]",
    name: "[NAME]",
    title: "[ROLE @ COMPANY]",
  },
  {
    quote:
      "[A second testimonial. Specific results or qualities make these far more convincing than generic praise.]",
    name: "[NAME]",
    title: "[ROLE @ COMPANY]",
  },
];

export const contact = {
  heading: "Let's build something that grows.",
  subheading:
    "Open to internships, freelance projects and full-time roles in digital marketing. Tell me about your brand — I'd love to help.",
};
