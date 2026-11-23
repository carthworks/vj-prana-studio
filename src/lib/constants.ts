export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://vj-prana-studio.vercel.app";

export const BUSINESS = {
  name: "VJ PRANA",
  fullName: "VJ PRANA – Health & Wellness Studio",
  subtitle: "Health & Wellness Studio",
  tagline: "Breathe Better. Move Better. Live Better.",
  motto: "Do Not Drive Life, Start Living Life.",
  addressLines: [
    "Sastha Nagar, Near Iyyapan Koil,",
    "Bangalore Bypass Road,",
    "Salem, Tamil Nadu, India – 636005",
  ],
  addressSingleLine:
    "Sastha Nagar, Near Iyyapan Koil, Bangalore Bypass Road, Salem, Tamil Nadu, India – 636005",
  streetAddress: "Sastha Nagar, Near Iyyapan Koil, Bangalore Bypass Road",
  city: "Salem",
  state: "Tamil Nadu",
  postalCode: "636005",
  country: "IN",
  phones: [
    { display: "097917 85007", href: "tel:+919791785007", primary: true },
    { display: "97902 38264", href: "tel:+919790238264", primary: false },
  ],
  whatsappNumber: "919791785007",
  whatsappDefaultMessage:
    "Hello VJ PRANA, I would like to know more about your yoga and wellness programs. Please share the details.",
  whatsappCommunityUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL?.trim() ||
    "https://wa.me/919791785007?text=" +
      encodeURIComponent(
        "Namaste VJ PRANA! I would like to join the VJ PRANA WhatsApp Wellness Community group. Please share the invite link."
      ),
  email: "hello@vjpranastudio.com",
  mapsQuery:
    "VJ PRANA Health and Wellness Studio Sastha Nagar Near Iyyapan Koil Bangalore Bypass Road Salem Tamil Nadu 636005",
  mapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sastha+Nagar+Near+Iyyapan+Koil+Bangalore+Bypass+Road+Salem+Tamil+Nadu+636005",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Sastha+Nagar,+Near+Iyyapan+Koil,+Bangalore+Bypass+Road,+Salem,+Tamil+Nadu+636005&t=&z=15&ie=UTF8&iwloc=&output=embed",
  socials: [
    {
      name: "Instagram",
      handle: "@vjprana",
      url: "https://www.instagram.com/vjprana/",
    },
    {
      name: "Facebook",
      handle: "VJ PRANA (Arun Kumar)",
      url: "https://www.facebook.com/arun.kumar.772423",
    },
  ],
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Yoga Programs", href: "/yoga-programs" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Fitness", href: "/fitness" },
  { label: "Special Programs", href: "/special-programs" },
  { label: "Contact", href: "/contact" },
];

export const PROGRAM_SUBMENU_LINKS: NavItem[] = [
  {
    label: "Yoga Programs",
    href: "/yoga-programs",
    description: "Traditional, therapeutic, pranayama, kids & senior yoga",
  },
  {
    label: "Nutrition & Diet",
    href: "/nutrition",
    description: "Personalised diet plans with Geetha Arunkumar",
  },
  {
    label: "Fitness & Reflexology",
    href: "/fitness",
    description: "Strength, power yoga, weight management & foot reflexology",
  },
  {
    label: "Special Programs",
    href: "/special-programs",
    description: "Women-only yoga, pre/post-marriage & yoga counselling",
  },
];

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  caption: string;
  objectPosition?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "morning-yoga",
    src: "/images/hero-wellness.jpg",
    alt: "Peaceful morning yoga and meditation practice in a sunlit holistic wellness studio",
    eyebrow: "Holistic Studio Philosophy",
    title: "Breathe Better. Move Better. Live Better.",
    caption: "Yoga, Pranayama, Fitness, Personalised Diet & Counselling",
    objectPosition: "object-center",
  },
  {
    id: "studio-guidance",
    src: "/images/prana01.jpg",
    alt: "VJ PRANA instructor guiding a student through Bow Pose alignment inside the Salem studio",
    eyebrow: "Personalised Attention",
    title: "Guided Posture & Therapeutic Yoga",
    caption: "Attentive hands-on alignment in Salem & live online coaching",
    objectPosition: "object-center",
  },
  {
    id: "personalised-nutrition",
    src: "/images/nutrition-editorial.jpg",
    alt: "Wholesome natural foods, millets, fruits, and herbal infusion representing balanced nutrition",
    eyebrow: "Nutrition & Diet Consultation",
    title: "Eat Better. Feel Better. Live Better.",
    caption: "Customised meal planning led by Geetha Arunkumar (Ph.D., PGDFS)",
    objectPosition: "object-center",
  },
  {
    id: "kids-aerial-yoga",
    src: "/images/hanging02.jpg",
    alt: "Children practicing supervised aerial silk yoga in yellow and green hammocks at VJ PRANA studio",
    eyebrow: "Every Age. Every Body.",
    title: "Joyful Kids & Youth Wellness",
    caption: "Building balance, coordination, focus & confidence from young",
    objectPosition: "object-center",
  },
];

export interface YouTubeVideoItem {
  id: string;
  /** Add a real 11-character YouTube video ID (e.g. "dQw4w9WgXcQ") when published */
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  poster: string;
  posterAlt: string;
}

export const YOUTUBE_CHANNEL_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL?.trim() || "";

export const YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: "featured-pranayama",
    youtubeId: process.env.NEXT_PUBLIC_YOUTUBE_FEATURED_ID?.trim() || "",
    title: "Mindful Breathing & Morning Pranayama Practice",
    category: "Pranayama & Calm",
    duration: "Guided Session",
    description:
      "A calm introduction to conscious breathing and daily grounding practices taught at VJ PRANA Health & Wellness Studio.",
    poster: "/images/meditation-breath.jpg",
    posterAlt: "Calm morning pranayama and mindful breathing session preview",
  },
  {
    id: "studio-asana-alignment",
    youtubeId: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_2_ID?.trim() || "",
    title: "Therapeutic Yoga & Safe Posture Alignment",
    category: "Studio Practice",
    duration: "Practice Guide",
    description:
      "See how our instructors adapt foundational yoga postures for beginners, working professionals, and seniors.",
    poster: "/images/prana01.jpg",
    posterAlt: "Instructor guiding safe Bow Pose alignment at VJ PRANA studio",
  },
  {
    id: "nutrition-wellness-talk",
    youtubeId: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_3_ID?.trim() || "",
    title: "Building Practical, Sustainable Everyday Eating Habits",
    category: "Nutrition Insights",
    duration: "Wellness Talk",
    description:
      "Simple, realistic principles for balanced home meals and mindful food habits shared by our nutrition team.",
    poster: "/images/nutrition-editorial.jpg",
    posterAlt: "Wholesome natural meal bowls representing practical nutrition insights",
  },
];

export interface AudienceCardItem {
  id: string;
  title: string;
  subtitle: string;
  points: string[];
  accent: string;
  href: string;
  image: string;
  poseIcon: string;
}

export const AUDIENCE_GROUPS: AudienceCardItem[] = [
  {
    id: "children-young-adults",
    title: "Children & Young Adults",
    subtitle: "Playful foundations for lifelong wellbeing",
    points: [
      "Healthy daily habits & posture",
      "Flexibility, aerial silk balance & coordination",
      "Focus, calm & mindfulness",
      "Age-appropriate kids yoga & wellness classes",
    ],
    accent: "Kids & Youth",
    href: "/yoga-programs#kids-yoga",
    image: "/images/hanging02.jpg",
    poseIcon: "/images/yoga-poses/icon-benefit-item-1.svg",
  },
  {
    id: "adults-professionals",
    title: "Adults & Working Professionals",
    subtitle: "Restore energy amidst busy schedules",
    points: [
      "Stress management & mindful breathing",
      "Strength, mobility & flexibility",
      "Sustainable healthy lifestyle habits",
      "Balanced fitness and guided relaxation",
    ],
    accent: "Everyday Balance",
    href: "/yoga-programs",
    image: "/images/prana01.jpg",
    poseIcon: "/images/yoga-poses/icon-benefit-item-2.svg",
  },
  {
    id: "seniors-older-adults",
    title: "Seniors & Older Adults",
    subtitle: "Safe, supportive and gentle movement",
    points: [
      "Gentle and adaptive yoga routines",
      "Joint mobility, stability and balance",
      "Calming pranayama breathing practices",
      "Paced, age-appropriate movement guidance",
    ],
    accent: "Gentle Care",
    href: "/yoga-programs#seniors-yoga",
    image: "/images/meditation-breath.jpg",
    poseIcon: "/images/yoga-poses/icon-benefit-item-3.svg",
  },
  {
    id: "wellness-enthusiasts",
    title: "Wellness Enthusiasts",
    subtitle: "Deepen strength, stamina and practice",
    points: [
      "Structured strength development",
      "Dynamic power yoga & bodyweight cardio",
      "Progressive flexibility training",
      "Tailor-made personal wellness goals",
    ],
    accent: "Active Practice",
    href: "/fitness",
    image: "/images/runners.jpg",
    poseIcon: "/images/yoga-poses/icon-benefit-item-4.svg",
  },
];

export interface WellnessProgram {
  id: string;
  title: string;
  shortDescription: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  href: string;
  category: string;
  featured?: boolean;
  poseIcon?: string;
}

export const WELLNESS_PROGRAMS: WellnessProgram[] = [
  {
    id: "yoga-therapeutic",
    title: "Yoga & Therapeutic Yoga",
    shortDescription:
      "Traditional yogic practices and supportive therapeutic yoga sessions thoughtfully adapted to your body, comfort and individual wellness goals.",
    highlights: [
      "Traditional yoga practices",
      "Therapeutic yoga sessions",
      "Beginner-friendly yoga",
      "Personalised yoga routines",
    ],
    image: "/images/prana01.jpg",
    imageAlt:
      "VJ PRANA yoga instructor providing attentive one-on-one posture guidance during a Bow Pose yoga session in the Salem studio",
    imageFit: "cover",
    href: "/yoga-programs",
    category: "Core Practice",
    featured: true,
    poseIcon: "/images/yoga-poses/icon-service-item-1.svg",
  },
  {
    id: "pranayama-meditation",
    title: "Pranayama & Meditation",
    shortDescription:
      "Cultivate inner stillness, breath awareness and emotional clarity through structured pranayama, guided meditation and relaxation practices.",
    highlights: [
      "Breathing exercises (Pranayama)",
      "Guided meditation",
      "Deep relaxation practices",
      "Mindfulness & calm focus",
    ],
    image: "/images/meditation-breath.jpg",
    imageAlt:
      "Serene pranayama and guided meditation practice in warm natural light",
    imageFit: "cover",
    href: "/yoga-programs#pranayama",
    category: "Breath & Mind",
    poseIcon: "/images/yoga-poses/icon-service-item-2.svg",
  },
  {
    id: "strength-fitness",
    title: "Strength & Fitness",
    shortDescription:
      "Build functional strength, stamina and body tone with tailor-made sessions combining bodyweight cardio, power yoga and flexibility training.",
    highlights: [
      "Strength training & bodyweight cardio",
      "Body toning & core stability",
      "Flexibility development",
      "Power yoga sessions",
    ],
    image: "/images/pose01.jpg",
    imageAlt:
      "VJ PRANA studio showcase featuring strength training, flexibility benefits, and power yoga practice",
    imageFit: "contain",
    href: "/fitness",
    category: "Movement",
    poseIcon: "/images/yoga-poses/icon-service-item-3.svg",
  },
  {
    id: "weight-management",
    title: "Weight Management",
    shortDescription:
      "Balanced, sustainable lifestyle programs combining mindful movement, toning routines and practical nutrition guidance for healthy weight loss or gain.",
    highlights: [
      "Healthy weight loss programs",
      "Structured healthy weight gain",
      "Body toning & active conditioning",
      "Long-term lifestyle guidance",
    ],
    image: "/images/nutrition-editorial.jpg",
    imageAlt:
      "Wholesome balanced meals and natural foods supporting sustainable weight management",
    imageFit: "cover",
    href: "/fitness#weight-management",
    category: "Holistic Balance",
    poseIcon: "/images/yoga-poses/icon-service-item-4.svg",
  },
  {
    id: "women-only-yoga",
    title: "Women-Only Yoga",
    shortDescription:
      "Dedicated women's batches led by a female yoga instructor, blending preparatory sessions, strengthening, flexibility, pranayama and relaxation.",
    highlights: [
      "Dedicated women's batches",
      "Experienced female yoga instructor",
      "Flexibility, strengthening & relaxation",
      "Online (Zoom) and in-person sessions",
    ],
    image: "/images/prana02.jpg",
    imageAlt:
      "VJ PRANA dedicated women-only online and offline yoga classes with a female teacher",
    imageFit: "contain",
    href: "/special-programs#womens-yoga",
    category: "Women's Wellness",
    featured: true,
    poseIcon: "/images/yoga-poses/icon-benefit-item-2.svg",
  },
  {
    id: "foot-reflexology",
    title: "Foot Reflexology",
    shortDescription:
      "Soothing, relaxation-focused foot reflexology sessions tailored through individual consultation to help ease tension and restore calm.",
    highlights: [
      "Foot reflexology sessions",
      "Relaxation-focused wellness care",
      "Individual consultation",
      "Restorative studio atmosphere",
    ],
    image: "/images/footcure.jpg",
    imageAlt:
      "VJ PRANA Health and Wellness Studio foot reflexology relaxation session",
    imageFit: "contain",
    href: "/fitness#foot-reflexology",
    category: "Restorative Care",
    poseIcon: "/images/yoga-poses/icon-benefit-item-3.svg",
  },
];

export const NUTRITION_SERVICES = [
  {
    title: "Personalised Diet Plans",
    description:
      "Customised meal guidance designed around your daily routine, food preferences, and individual wellness goals.",
  },
  {
    title: "Weight Management Nutrition",
    description:
      "Practical, balanced eating strategies that support steady, sustainable weight management without extreme restrictions.",
  },
  {
    title: "Healthy Weight Gain Guidance",
    description:
      "Nourishing, nutrient-dense nutrition plans to help build healthy mass and energy naturally.",
  },
  {
    title: "One-on-One Nutrition Consultation",
    description:
      "Dedicated online or in-person consultations to understand your body, lifestyle patterns, and nutritional needs.",
  },
  {
    title: "Lifestyle-Based Meal Planning",
    description:
      "Realistic home-cooked meal structures that fit smoothly into family and working-professional schedules.",
  },
  {
    title: "Food Habit Improvement & Awareness",
    description:
      "Mindful eating guidance and nutrition awareness programs to build lasting, confident food choices.",
  },
] as const;

export const TEAM_PROFILES = {
  geetha: {
    name: "Geetha Arunkumar",
    credentials: [
      "Ph.D.",
      "PGDFS (New Zealand)",
      "Dietician / Nutrition Consultant",
      "AYUSH Certified Yoga Teacher & Evaluator",
    ],
    role: "Dietician, Nutrition Consultant & Yoga Evaluator",
    bio: "Geetha Arunkumar brings academic rigour and compassionate, practical guidance to personalised nutrition and yoga education. Through individualised diet consultations, nutrition awareness programs, and women's yoga mentorship, she helps individuals cultivate sustainable, joyful everyday habits.",
    highlights: [
      "Delivered an expert lecture in the Five-Day Faculty Development Programme on 'Invest in Your Health' at VIT Vellore (May 2024).",
      "Leads customised diet planning, nutrition awareness programs, and women's wellness sessions online and in Salem.",
    ],
    image: "/images/geetha-arunkumar.jpg",
    imageAlt:
      "Geetha Arunkumar – Ph.D., PGDFS (New Zealand), Dietician, Nutrition Consultant & AYUSH Certified Yoga Teacher at VJ PRANA Salem",
    certificateImage: "/images/vit-certification.jpg",
    certificateCaption:
      "Certificate of Appreciation from VIT Vellore (TLCE & School of CSE) for expert lecture on 'Invest in Your Health' (May 2024).",
  },
  arun: {
    name: "Mr. Arun Kumar",
    credentials: [
      "Director, VJ PRANA Health & Wellness Studio",
      "Behavioural Yoga Therapist",
      "Health & Wellness Coach",
    ],
    role: "Director, Behavioural Yoga Therapist & Wellness Coach",
    bio: "Combining functional strength conditioning, traditional yogic discipline, and behavioural yoga therapy, Mr. Arun Kumar guides children, adults, athletes, and seniors towards resilient bodies and calmer, more adaptive minds.",
    highlights: [
      "Leads strengthening, power yoga, therapeutic yoga routines, and individualised yoga psychology counselling.",
      "Conducts community wellness sessions and institutional talks, including International Yoga Day workshops in Salem and educational seminars.",
    ],
    image: "/images/arun-director.jpg",
    imageAlt:
      "Mr. Arun Kumar, Director and Health & Wellness Coach at VJ PRANA Health & Wellness Studio in Salem",
  },
} as const;

export const SPECIAL_PROGRAMS_LIST = [
  {
    id: "womens-yoga",
    badge: "Women's Wellness",
    title: "Women's Yoga Programs",
    description:
      "A comfortable, encouraging space designed exclusively for women—supporting flexibility, core strength, pranayama, relaxation, and life-stage wellness.",
    points: [
      "Dedicated female yoga instructor",
      "Online (Zoom) and offline studio batches",
      "Preparatory sessions, strengthening & flexibility practices",
      "Pranayama, guided relaxation, and pre- & post-pregnancy yoga options",
    ],
    image: "/images/prana01.jpg",
    imageAlt:
      "Female instructor guiding a woman through a supportive yoga posture at VJ PRANA studio",
    imageFit: "cover" as const,
  },
  {
    id: "pre-marriage-counselling",
    badge: "Relationship Readiness",
    title: "Pre-Marriage Counselling",
    description:
      "Thoughtful, confidential conversations that help individuals and couples step into married life with clarity, empathy, and realistic expectations.",
    points: [
      "Exploring emotional readiness for marriage",
      "Building healthy communication and mutual understanding",
      "Practical insights for navigating family and lifestyle transitions",
      "Private, respectful and supportive guidance",
    ],
    image: "/images/counselling-calm.jpg",
    imageAlt:
      "Calm and private consultation room for pre-marriage and post-marriage counselling",
    imageFit: "cover" as const,
  },
  {
    id: "post-marriage-counselling",
    badge: "Relationship Care",
    title: "Post-Marriage Counselling",
    description:
      "A non-judgmental, supportive space for couples looking to strengthen communication, ease misunderstandings, and nurture a joyful partnership.",
    points: [
      "Constructive relationship communication",
      "Rebuilding mutual understanding and emotional connection",
      "Healthy conflict resolution and perspective building",
      "Ongoing guidance for harmonious relationship development",
    ],
    image: "/images/premarrage-consultation.jpg",
    imageAlt:
      "VJ PRANA Pre-Marriage and Post-Marriage Counselling service overview",
    imageFit: "contain" as const,
  },
  {
    id: "yoga-psychology",
    badge: "Mind & Perspective",
    title: "Individualised Yoga Psychology & Counselling",
    description:
      "Integrating mindful yogic perspectives with practical counselling to help you handle everyday stress, frustration, and life transitions with composure.",
    points: [
      "Attitude and habit alignment through individualised yoga counselling",
      "Yogic and reflective methods for navigating everyday frustration & conflicts",
      "Developing calm adaptability and clearer decision-making",
      "Available as private online or in-studio sessions",
    ],
    image: "/images/meditation-breath.jpg",
    imageAlt:
      "Mindful breathing and reflective stillness supporting yoga psychology counselling",
    imageFit: "cover" as const,
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: "HeartHandshake",
    title: "Personalised Wellness Approach",
    description:
      "Every body and routine is unique. Sessions are thoughtfully adapted to your comfort level, mobility, and personal wellness goals.",
  },
  {
    icon: "Globe",
    title: "Online & Offline Availability",
    description:
      "Practice in person at our welcoming Salem studio or join live, interactive online sessions from the comfort of home.",
  },
  {
    icon: "Users",
    title: "Programs for Different Age Groups",
    description:
      "From playful kids aerial & wellness yoga to adult fitness and gentle senior sessions, every generation has a place here.",
  },
  {
    icon: "Flame",
    title: "Yoga and Fitness Together",
    description:
      "Experience the synergy of traditional yoga, pranayama, bodyweight conditioning, power yoga, and flexibility training under one roof.",
  },
  {
    icon: "Salad",
    title: "Qualified Nutrition Consultation",
    description:
      "Pair your movement practice with practical, customised meal guidance from Dietician & Nutrition Consultant Geetha Arunkumar.",
  },
  {
    icon: "Sparkles",
    title: "Supportive Learning Environment",
    description:
      "A calm, attentive, non-intimidating studio atmosphere built around genuine care, steady progress, and mindful living.",
  },
] as const;

export interface GalleryAsset {
  id: string;
  src: string;
  title: string;
  caption: string;
  alt: string;
  category: "Studio Life" | "Programs" | "Nutrition & Care" | "Community";
  fit: "cover" | "contain";
  aspect: "landscape" | "portrait" | "square";
  required?: boolean;
}

export const GALLERY_ITEMS: GalleryAsset[] = [
  {
    id: "vj-prana-official-poster",
    src: "/images/vj-prana-poster.jpg",
    title: "VJ PRANA – Breathe Better. Move Better. Live Better.",
    caption:
      "Holistic wellness for every age, every body, and every journey — Yoga, Pranayama, Fitness, Personalised Diet, Women's Yoga, Foot Reflexology & Counselling.",
    alt: "VJ PRANA Health and Wellness Studio Salem official overview poster featuring yoga, pranayama, fitness, personalised nutrition, women's yoga, foot reflexology, and online and offline classes",
    category: "Programs",
    fit: "contain",
    aspect: "portrait",
  },
  {
    id: "studio-guided-yoga",
    src: "/images/prana01.jpg",
    title: "Personalised Studio Guidance",
    caption:
      "Attentive hands-on alignment support during a studio yoga session at VJ PRANA, Salem.",
    alt: "Female instructor guiding a student in Bow Pose (Dhanurasana) on a mat inside VJ PRANA Studio",
    category: "Studio Life",
    fit: "cover",
    aspect: "landscape",
  },
  {
    id: "pose01",
    src: "/images/pose01.jpg",
    title: "Yoga, Strength & Power Yoga",
    caption:
      "Strength training, flexibility development, and power yoga routines for balanced daily vitality.",
    alt: "VJ PRANA Yoga and Fitness showcase featuring strength training, flexibility, and power yoga postures",
    category: "Programs",
    fit: "contain",
    aspect: "square",
    required: true,
  },
  {
    id: "prana02",
    src: "/images/prana02.jpg",
    title: "Women's Yoga Batches",
    caption:
      "Dedicated online and offline women's yoga batches guided by our female yoga teacher.",
    alt: "VJ PRANA Women-Only Online and Offline Yoga Classes with female teacher",
    category: "Programs",
    fit: "contain",
    aspect: "portrait",
    required: true,
  },
  {
    id: "nutricion",
    src: "/images/nutricion.jpg",
    title: "Nutrition & Diet Consultation",
    caption:
      "Personalised diet plans and nutrition consultations by Geetha Arunkumar (Ph.D., PGDFS New Zealand).",
    alt: "VJ PRANA Nutrition and Diet Consultation service with Geetha Arunkumar",
    category: "Nutrition & Care",
    fit: "contain",
    aspect: "landscape",
    required: true,
  },
  {
    id: "footcure",
    src: "/images/footcure.jpg",
    title: "Foot Reflexology",
    caption:
      "Relaxation-focused foot reflexology alongside yoga, fitness, pranayama, and diet services.",
    alt: "VJ PRANA Foot Reflexology wellness and relaxation service",
    category: "Nutrition & Care",
    fit: "contain",
    aspect: "landscape",
    required: true,
  },
  {
    id: "premarrage",
    src: "/images/premarrage-consultation.jpg",
    title: "Pre & Post-Marriage Counselling",
    caption:
      "Supportive, confidential counselling sessions for relationship readiness and harmonious married life.",
    alt: "VJ PRANA Pre-Marriage and Post-Marriage Counselling services",
    category: "Nutrition & Care",
    fit: "contain",
    aspect: "portrait",
    required: true,
  },
  {
    id: "aerial-kids-group",
    src: "/images/hanging02.jpg",
    title: "Kids & Youth Aerial Yoga",
    caption:
      "Building balance, confidence, and playful strength through supervised aerial silk yoga for children.",
    alt: "Children practicing supervised aerial yoga in yellow and green silks at VJ PRANA studio",
    category: "Studio Life",
    fit: "cover",
    aspect: "landscape",
  },
  {
    id: "aerial-kids-solo",
    src: "/images/hanging.jpg",
    title: "Joyful Movement for Children",
    caption:
      "Age-appropriate flexibility and coordination practices designed to make wellness fun for kids.",
    alt: "Young child smiling while practicing flexibility inside a bright yellow aerial yoga hammock",
    category: "Studio Life",
    fit: "cover",
    aspect: "portrait",
  },
  {
    id: "vit-cert",
    src: "/images/vit-certification.jpg",
    title: "Academic & Wellness Outreach",
    caption:
      "VIT Vellore Certificate of Appreciation awarded to Geetha Rajendran for her expert lecture on 'Invest in Your Health'.",
    alt: "VIT Vellore Certificate of Appreciation for Five Days FDP expert lecture on Invest in Your Health",
    category: "Community",
    fit: "contain",
    aspect: "landscape",
  },
  {
    id: "yoga-day-event",
    src: "/images/events01.jpeg",
    title: "International Yoga Day, Salem",
    caption:
      "Community International Yoga Day session in Salem in association with Techno Sport.",
    alt: "VJ PRANA International Yoga Day community event in Salem in association with Techno Sport",
    category: "Community",
    fit: "contain",
    aspect: "square",
  },
  {
    id: "community-runners",
    src: "/images/runners.jpg",
    title: "Community Fitness & Running",
    caption:
      "Mr. Arun Kumar alongside regional marathon and running enthusiasts promoting active community living.",
    alt: "Mr. Arun Kumar standing with community marathon runners celebrating active fitness",
    category: "Community",
    fit: "cover",
    aspect: "landscape",
  },
];

export const CLASS_SCHEDULE = {
  morningSlots: "4:45 AM – 11:00 AM",
  eveningSlots: "5:00 PM – 8:00 PM",
  duration: "1 hr 15 min daily",
  days: "Monday – Friday (No weekend classes)",
  monthlyFee: "₹3,000 / month",
  formatNote: "Personalised weekday programs tailored to your pace and goals.",
} as const;

export const FAQ_ITEMS = [
  {
    question: "Do you offer online and offline yoga classes?",
    answer:
      "Yes. VJ PRANA offers both live personalised online classes (Morning: 4:45 AM – 11:00 AM, Evening: 5:00 PM – 8:00 PM) and in-person studio sessions in Sastha Nagar, Salem.",
  },
  {
    question: "What are the online class timings, duration, and monthly fee?",
    answer:
      "Online personalised programs run Monday to Friday (no weekend classes), with flexible slots between 4:45 AM – 11:00 AM in the morning and 5:00 PM – 8:00 PM in the evening. Each daily session lasts 1 hour 15 minutes, and the fee is ₹3,000 per month.",
  },
  {
    question: "Are classes suitable for beginners?",
    answer:
      "Absolutely. Every program is personalised to your current mobility, flexibility, endurance, and experience level. We keep practices simple and sustainable so you can build a happy lifestyle on a regular basis.",
  },
  {
    question: "Do you provide yoga programs for children?",
    answer:
      "Yes. We conduct age-appropriate kids health and wellness classes focused on healthy habits, posture, flexibility, coordination, mindfulness, and engaging movement practices.",
  },
  {
    question: "Are there special programs for senior citizens?",
    answer:
      "Yes. We offer gentle, adaptive yoga and pranayama breathing practices tailored for seniors and older adults to support comfortable mobility, balance, and everyday relaxation.",
  },
  {
    question: "Do you offer women-only yoga batches?",
    answer:
      "Yes. We run dedicated women-only yoga batches led by a female yoga instructor, available both online and offline, covering preparatory sessions, strengthening, flexibility, pranayama, relaxation, as well as pre- and post-pregnancy yoga options.",
  },
  {
    question: "Can I get a personalised diet plan?",
    answer:
      "Yes. Geetha Arunkumar (Ph.D., PGDFS New Zealand), our Dietician & Nutrition Consultant, offers one-on-one online and offline nutrition consultations to craft practical, personalised diet plans aligned with your lifestyle and goals.",
  },
  {
    question: "How do I book a consultation & where is VJ PRANA located?",
    answer:
      "You can book a free initial consultation using the form on our Contact page, on WhatsApp (+91 97917 85007), or by calling 097917 85007 / 97902 38264. Our studio is located at Sastha Nagar, Near Iyyapan Koil, Bangalore Bypass Road, Salem, Tamil Nadu – 636005.",
  },
] as const;

export const PROGRAM_OPTIONS = [
  "Yoga & Therapeutic Yoga",
  "Pranayama & Meditation",
  "Strength & Fitness / Power Yoga",
  "Weight Management",
  "Women-Only Yoga",
  "Kids Health & Wellness Yoga",
  "Seniors Gentle Yoga",
  "Nutrition & Diet Consultation",
  "Foot Reflexology",
  "Pre-Marriage Counselling",
  "Post-Marriage Counselling",
  "Yoga Psychology & Individual Counselling",
  "General Wellness Consultation",
] as const;
