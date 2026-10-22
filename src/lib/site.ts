// Every business fact on the site lives here. Source: the scraped Canva site in
// "raw messy data/". Copy is normalized from all caps and typos are corrected,
// but no facts are added.

export const site = {
  name: "AJG Therapeutics LLC",
  shortName: "AJG Therapeutics",
  url: "https://ajgtherapeuticsllc.com",
  tagline: "Men. Fathers. Healing. Change.",
  description:
    "Trauma-informed group facilitation, workshops, and trainings for youth, fathers, and violence prevention. Bronx-based, serving schools, CBOs, and justice-involved populations across NYC.",
  email: "info@ajgtherapeuticsllc.com",
  instagram: "https://www.instagram.com/ajgtherapeutics/",
  founderLinkedIn: "https://www.linkedin.com/in/alam-gonzalez/",
  capabilityStatement:
    "https://docs.google.com/document/d/12Ypgih-JXKILEQc2cF0aMgyPus4YC8LdPFTiWXVxkcI/edit?usp=share_link",
  area: "Bronx-based. NYC-wide service.",
  credentials: ["NYC DOE Vendor", "MWBE certification pending", "Bronx-based", "NYC-wide service"],
} as const

export const procurement = {
  vendorId: "VS00106058",
  mwbe: "Pending",
  insurance: "Insured and contract-ready. Certificate of Insurance (COI) available.",
  formats: ["Workshops and group cycles", "Assemblies for students", "Staff trainings"],
  cycles: [6, 8, 12],
  deliverables: ["Sign-in sheets", "Pre/post surveys", "Summary reports", "Participation certificates"],
  availableFor: "DOE, DOC, and ACS-affiliated initiatives and contracts",
} as const

export const nav = [
  { href: "/programs", label: "Programs" },
  { href: "/schools-agencies", label: "Schools & Agencies" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Our Work" },
  { href: "/contact", label: "Contact" },
] as const

export type Pillar = {
  id: string
  number: string
  title: string
  summary: string
  listLabel: string
  items: { name: string; detail?: string }[]
  idealFor: string
  availableFor?: string
  length: string
}

export const pillars: Pillar[] = [
  {
    id: "schools",
    number: "1",
    title: "School-Based Programs (DOE)",
    summary:
      "Evidence-informed workshops and school partnerships designed to improve student behavior, safety, and engagement.",
    listLabel: "Service offerings",
    items: [
      { name: "Violence prevention workshops", detail: "Situational awareness, decision-making, peer conflict" },
      { name: "Social-Emotional Learning (SEL) skill-building sessions" },
      { name: "Conflict resolution and de-escalation strategies for students" },
      { name: "Restorative circles", detail: "Repair harm, rebuild classroom culture" },
      { name: "Fatherhood engagement workshops", detail: "School-based family partnership programming" },
    ],
    idealFor: "NYC DOE schools, youth programs, school-based CBO partners",
    availableFor: "DOE, DOC, and ACS-affiliated initiatives and contracts",
    length: "60, 90, or 120 minutes",
  },
  {
    id: "groups",
    number: "2",
    title: "Therapeutic Group Facilitation",
    summary:
      "Structured, trauma-informed group interventions that strengthen emotional regulation, reduce risk behaviors, and promote long-term stability.",
    listLabel: "Group topics",
    items: [
      { name: "Anger management and emotional regulation", detail: "Skills-based, CBT-style groups" },
      { name: "Trauma-informed men’s healing circles", detail: "Identity, accountability, coping" },
      { name: "Relapse prevention and harm reduction support", detail: "Risk reduction planning" },
      {
        name: "Reentry stabilization groups",
        detail: "Routine, employment readiness, relapse prevention, community reintegration",
      },
    ],
    idealFor: "Fathers, justice-impacted youth, justice-involved adults, community members",
    length: "60 or 90 minutes",
  },
  {
    id: "training",
    number: "3",
    title: "Training and Professional Development",
    summary:
      "Capacity-building trainings that strengthen staff safety, communication, and trauma-responsive engagement, especially in high-risk youth settings.",
    listLabel: "Training modules",
    items: [
      { name: "Staff de-escalation and crisis response protocols" },
      { name: "Motivational Interviewing (MI) fundamentals for frontline staff" },
      { name: "Trauma-informed engagement", detail: "Building trust without enabling" },
      { name: "Crisis communication and conflict navigation" },
      {
        name: "Best practices for working with justice-involved youth",
        detail: "Boundaries, compliance, behavior management",
      },
    ],
    idealFor: "Program staff, supervisors, school teams, administrators",
    length: "60 minutes",
  },
]

export const serviceLines = [
  { title: "Therapeutic group facilitation", note: "Healing circles" },
  { title: "Harm reduction and reentry stabilization" },
  { title: "Fatherhood and family support services" },
] as const

export const settings = [
  "Schools and community programs",
  "ATI (alternative-to-incarceration)",
  "Reentry programs",
  "Youth summits",
] as const

export const audiences = [
  { title: "NYC schools (DOE) and youth programs", href: "/programs#schools" },
  { title: "Community-based organizations (CBOs)", href: "/programs" },
  { title: "Justice-impacted youth and adults", href: "/programs#groups" },
] as const

export const stats = [
  { value: "250+", label: "Participants served" },
  { value: "25+", label: "Groups and workshops facilitated" },
  { value: "10+", label: "Community and school partners" },
  { value: "Bronx + NYC", label: "Service area coverage" },
] as const

export const testimonials = [
  {
    quote:
      "This was the first space where I felt respected and understood. I learned I’m not alone, and I walked away with real tools, not just talk.",
    name: "Robert Jimenez",
  },
  {
    quote:
      "I became a better father because of these sessions. I learned how to communicate, how to co-parent, and how to show up consistently for my child.",
    name: "Joel Taveras",
  },
] as const

export const founder = {
  name: "Alam Gonzalez",
  credentials: "MSW, CASAC-T",
  role: "Founder",
  bio: [
    "Bronx-based ATI social worker",
    "Violence prevention specialist",
    "Reentry and fatherhood advocate",
    "Certified life coach",
    "Verified peer reviewer, Web of Science (Urban Social Work Journal)",
    "Community Impact Leader Award recipient",
    "Experienced group facilitator in community settings, inside Rikers, and in agency programs",
    "Has served 250+ justice-impacted youth, adults, and fathers in the community",
  ],
} as const

export const mission = [
  "AJG Therapeutics LLC exists to support men of color and justice-impacted families by creating safe spaces where men can come to vent, connect, and build community without judgment. We provide emotional support, brotherhood, resource sharing, and a hub for Bronx-based events, services, and opportunities.",
  "Our mission is to transform pain into power through healing circles, skills-based workshops, advocacy training, and community action, so that men can strengthen their mental health, take leadership in their families, and help build safer, more resilient Bronx communities. We partner with schools, community-based organizations, and public agencies to deliver structured, outcomes-driven programming that strengthens SEL skills, reduces conflict, and supports student and family engagement.",
] as const

export const vision = {
  lead: "A Bronx where men have community, voice, and brotherhood.",
  body: [
    "We envision a borough where men are emotionally supported, actively involved, skilled in conflict resolution, and equipped to lead their homes and neighborhoods. A Bronx where anger becomes accountability, hurt becomes healing, and men build futures instead of falling to cycles.",
    "We also envision stronger school communities, where fathers, mentors, and community partners actively contribute to youth success, student well-being, and violence prevention efforts.",
  ],
} as const

export const approach =
  "AJG Therapeutics LLC operates through culturally grounded, trauma-informed practices delivered by trained facilitators with lived experience. We provide school- and community-based programming aligned with Social-Emotional Learning (SEL), restorative practices, and youth development frameworks to support positive school culture and community safety."

export type WorkItem = {
  date?: string
  title: string
  detail: string
  image?: { src: string; alt: string; w: number; h: number }
  link?: { href: string; label: string }
}

export const pastWork: WorkItem[] = [
  {
    date: "November 2025",
    title: "25th Anniversary Leadership Awards",
    detail:
      "Recipient of the Community Impact Award from the Latino Social Work Coalition & Scholarship Fund.",
    image: {
      src: "/media/award-night.jpg",
      alt: "Alam Gonzalez holding his award plaque beside a guest in front of a Latino Social Work Coalition backdrop",
      w: 1050,
      h: 1400,
    },
  },
  {
    date: "May 2025",
    title: "Youth Leadership Summit",
    detail:
      "Facilitated a workshop on Youth Power, Peace, and Peer Activism, focused on addressing violence and peer pressure in teen relationships.",
    image: {
      src: "/media/summit-flyer.jpg",
      alt: "Youth Leadership Summit workshop program listing Youth Power, Peace and Peer Activism, led by Alam Gonzalez",
      w: 1050,
      h: 1400,
    },
  },
  {
    date: "July 2024",
    title: "Telemundo: El Show de Jackie",
    detail: "Featured guest on El Show de Jackie, Telemundo 47.",
    image: {
      src: "/media/telemundo-segment.jpg",
      alt: "Alam Gonzalez seated on the El Show de Jackie set at Telemundo 47",
      w: 775,
      h: 1200,
    },
    link: { href: "https://www.instagram.com/reels/C8ecFiKu9Pj/", label: "Watch the segment" },
  },
  {
    date: "June 2024",
    title: "Commencement speaker",
    detail: "Spoke at the graduation of HSE High School for Excellence and Innovation.",
    image: {
      src: "/media/graduation.jpg",
      alt: "Graduates in yellow and green gowns holding diplomas, with faculty and speakers standing behind them",
      w: 1109,
      h: 780,
    },
  },
  {
    date: "February 2024",
    title: "Career Day",
    detail: "Spoke with youth about his work as an ATI social worker and in the community.",
    image: {
      src: "/media/career-day.jpg",
      alt: "Alam Gonzalez speaking to students in a classroom",
      w: 1600,
      h: 928,
    },
  },
  {
    date: "March 2023",
    title: "Let’s Talk Peace Summit",
    detail: "Led a peace outreach campaign on gun violence issues in the Dyckman community.",
    image: {
      src: "/media/lets-talk-peace.jpg",
      alt: "Alam Gonzalez addressing an audience in front of a screen reading Bienvenido and Thank You for Coming",
      w: 1050,
      h: 1400,
    },
  },
  {
    title: "Group facilitation",
    detail: "Substance abuse group on addressing emotional relapse.",
    image: {
      src: "/media/group-circle.jpg",
      alt: "Participants seated in a wide circle of chairs during a group session",
      w: 738,
      h: 960,
    },
  },
  {
    title: "Girls leadership and family empowerment",
    detail: "Collaboration with the Project Beauty girls program at Dyckman Houses.",
    image: {
      src: "/media/project-beauty.jpg",
      alt: "Girls from the Project Beauty program posing together with program signs",
      w: 451,
      h: 467,
    },
  },
  {
    title: "NBCUniversal",
    detail: "Stakeholder fundraising event.",
    image: {
      src: "/media/nbcuniversal.jpg",
      alt: "Alam Gonzalez speaking at an NBCUniversal podium",
      w: 723,
      h: 536,
    },
  },
  {
    title: "Bronx Leadership Academy",
    detail: "Male empowerment talk.",
    image: {
      src: "/media/youth-talk.jpg",
      alt: "A large group of young men gathered in a gym for a talk",
      w: 799,
      h: 774,
    },
  },
]

export const projectBeauty = {
  name: "Project Beauty Experience",
  program: "Girls Leadership Program NYC",
  founder: "Nayma Silver-Matos",
  heading: "Empowering girls to lead, grow, and thrive.",
  body: "Project Beauty is a leadership and wellness organization dedicated to empowering the next generation of girls. Through programs that build self-confidence, emotional intelligence, and professional skills, we prepare young women to lead with purpose, both personally and professionally.",
  instagram: "https://www.instagram.com/projectbeautyny/?hl=en",
} as const

export const logos = [
  { src: "/media/logos/telemundo.png", alt: "Telemundo", w: 640, h: 442 },
  { src: "/media/logos/univision.png", alt: "Univision", w: 640, h: 529 },
  { src: "/media/logos/lswc.png", alt: "Latino Social Work Coalition & Scholarship Fund", w: 401, h: 287 },
  { src: "/media/logos/nasw.png", alt: "National Association of Social Workers", w: 640, h: 257 },
  { src: "/media/logos/bronx-chamber.png", alt: "Bronx Chamber of Commerce", w: 640, h: 429 },
  { src: "/media/logos/acacia-network.png", alt: "Acacia Network", w: 640, h: 352 },
  { src: "/media/logos/nyc-doc.png", alt: "New York City Department of Correction", w: 640, h: 260 },
  { src: "/media/logos/acdp.png", alt: "Asociación Comunal de Dominicanos Progresistas", w: 200, h: 200 },
  { src: "/media/logos/bronx-collective.png", alt: "The Bronx Collective", w: 640, h: 360 },
] as const

export const upcoming = {
  title: "Men’s Leadership Group",
  when: "Announced to begin February 2026",
  details: "Location and time to be confirmed. Contact us for the current schedule.",
} as const

export const seeking = [
  "Funding and sponsorship",
  "Space for monthly circles",
  "Collaboration with schools and CBOs",
  "Referrals for men needing support",
  "Speakers, clinicians, and mentors",
] as const

// The scroll film. Chapter copy is drawn from the vision and mission statements.
export const film = {
  chapters: [
    { from: "Pain", to: "Power", line: "Healing circles, skills-based workshops, advocacy training, and community action." },
    { from: "Anger", to: "Accountability", line: "Groups where men learn to regulate, repair harm, and own what comes next." },
    { from: "Hurt", to: "Healing", line: "Safe spaces to vent, connect, and build community without judgment." },
    { from: "Cycles", to: "Futures", line: "Fathers who communicate, co-parent, and show up consistently." },
    { from: "Alone", to: "Brotherhood", line: "A Bronx where men have community, voice, and brotherhood." },
  ],
} as const
