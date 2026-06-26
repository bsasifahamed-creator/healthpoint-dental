export const CLINIC = {
  name: "Health Point Dental Clinic",
  tagline: "Quality Dental Care in Dubai",
  phone: "+971 58 588 6915",
  whatsapp: "971585886915",
  whatsappUrl: "https://wa.me/971585886915",
  email: "info@healthpointdental.ae",
  address:
    "Office 603, Bedaia Building, Al Barsha St, Al Barsha 1, Dubai, UAE",
  addressShort: "Al Barsha 1, Dubai",
  mapsUrl:
    "https://maps.google.com/?q=Health+Point+Dental+Clinic+Al+Barsha+Dubai",
  mapsEmbed: "https://www.google.com/maps/embed?pb=...",
  hours: "Daily: 1:00 PM – 9:00 PM",
  hoursShort: "1PM – 9PM Daily",
  instagram: "https://www.instagram.com/healthpoint_dental",
  facebook: "https://www.facebook.com/healthpointdubai",
  googleReviewsUrl: "https://g.page/r/healthpointdental/review",
  rating: 4.8,
  reviewCount: 247,
  googlePlaceId: "YOUR_PLACE_ID",
  googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
};

export const SERVICES = [
  {
    id: 1,
    name: "Scaling & Polishing",
    slug: "scaling-polishing",
    price: 79,
    priceFrom: false,
    duration: 45,
    icon: "",
    iconSrc: "/icons/Scaling and polishing.svg",
    category: "Preventive",
    description:
      "Professional cleaning to remove plaque, tartar and stains. Keeps gums healthy and breath fresh.",
    longDesc:
      "Our scaling and polishing treatment is designed to remove plaque, tartar, and surface stains that regular brushing cannot reach. Using ultrasonic instruments and gentle polishing techniques, we help keep your gums healthy and your smile bright. This treatment is recommended every 6 months for most patients.",
    benefits: [
      "Removes plaque and tartar build-up above and below the gum line",
      "Helps prevent gum disease and tooth decay",
      "Leaves teeth feeling smoother and looking brighter",
    ],
    process: [
      "Initial oral examination by the dentist",
      "Ultrasonic scaling to remove plaque and tartar",
      "Polishing to smooth tooth surfaces and remove stains",
      "Fluoride application and home-care instructions",
    ],
  },
  {
    id: 2,
    name: "Braces Installation",
    slug: "braces",
    price: 399,
    priceFrom: true,
    duration: 90,
    icon: "",
    iconSrc: "/icons/Braces Installation.svg",
    category: "Orthodontics",
    description:
      "Correct misaligned teeth and improve your bite with professional orthodontic braces.",
    longDesc:
      "Our orthodontic braces treatment is tailored to correct crowding, gaps, and bite alignment problems. We create a personalized plan to gradually move your teeth into their ideal positions using metal or ceramic braces, depending on your preference and needs.",
    benefits: [
      "Improves smile aesthetics and confidence",
      "Corrects bite issues that can affect chewing and jaw health",
      "Helps prevent uneven wear and future dental problems",
    ],
    process: [
      "Comprehensive orthodontic assessment and treatment planning",
      "Placement of brackets and archwires",
      "Regular adjustment visits to guide tooth movement",
      "Retention phase with retainers after active treatment",
    ],
  },
  {
    id: 3,
    name: "Tooth Extraction",
    slug: "tooth-extraction",
    price: 99,
    priceFrom: true,
    duration: 30,
    icon: "",
    iconSrc: "/icons/Tooth Extraction.svg",
    category: "Surgical",
    description: "Safe and gentle tooth removal using modern techniques.",
    longDesc:
      "When a tooth is too damaged to save, we perform careful, controlled extractions with a focus on comfort and rapid healing. We use modern anesthesia and minimally invasive techniques to ensure a smooth experience.",
    benefits: [
      "Relieves pain and infection from severely damaged teeth",
      "Helps protect surrounding teeth and gums",
      "Prepares the area for future restorations such as implants or bridges",
    ],
    process: [
      "Clinical and X-ray examination of the tooth",
      "Local anesthesia for a painless procedure",
      "Careful loosening and removal of the tooth",
      "Placement of gauze and detailed aftercare instructions",
    ],
  },
  {
    id: 4,
    name: "Root Canal Treatment",
    slug: "root-canal",
    price: 399,
    priceFrom: true,
    duration: 60,
    icon: "",
    iconSrc: "/icons/Root Canal Treatment.svg",
    category: "Restorative",
    description:
      "Save infected or damaged teeth with near-painless root canal therapy.",
    longDesc:
      "Root canal treatment removes infected tissue from inside the tooth while preserving the outer structure. With modern anesthesia and techniques, the procedure is typically comfortable and helps you avoid extraction.",
    benefits: [
      "Eliminates pain and infection from deep tooth decay",
      "Saves your natural tooth whenever possible",
      "Restores chewing function and smile aesthetics",
    ],
    process: [
      "Diagnosis with X-rays and clinical tests",
      "Local anesthesia and isolation of the tooth",
      "Cleaning and shaping of the root canals",
      "Filling and sealing the canals, followed by restoration",
    ],
  },
  {
    id: 5,
    name: "Hollywood Smile",
    slug: "hollywood-smile",
    price: 999,
    priceFrom: false,
    duration: 120,
    icon: "",
    iconSrc: "/icons/Hollywood Smile.svg",
    category: "Cosmetic",
    description:
      "Transform your smile with composite veneers — natural-looking and beautifully crafted.",
    longDesc:
      "Our Hollywood Smile treatment uses high-quality composite veneers to redesign your smile in terms of color, shape, and alignment. It is a minimally invasive option that can often be completed in a single visit.",
    benefits: [
      "Instantly improves the color and shape of your teeth",
      "Minimally invasive with little to no tooth reduction",
      "Custom-designed to suit your face and preferences",
    ],
    process: [
      "Smile assessment and digital smile design discussion",
      "Tooth preparation if needed",
      "Layering and sculpting of composite material on each tooth",
      "Polishing and final adjustments for a natural look",
    ],
  },
  {
    id: 6,
    name: "Dental Crown",
    slug: "crown",
    price: 299,
    priceFrom: false,
    duration: 60,
    icon: "",
    iconSrc: "/icons/Dental Crown.svg",
    category: "Restorative",
    description:
      "Restore damaged teeth with precision-fitted crowns that look and feel natural.",
    longDesc:
      "Dental crowns protect and restore teeth that are cracked, heavily filled, or root-treated. We design crowns that match your natural teeth in color and shape for a seamless appearance.",
    benefits: [
      "Strengthens and protects weakened teeth",
      "Improves the appearance of discolored or misshapen teeth",
      "Enhances chewing comfort and function",
    ],
    process: [
      "Tooth preparation and impression or scan",
      "Placement of a temporary crown if required",
      "Fabrication of the final crown by the lab",
      "Fitting, adjustments, and permanent cementation",
    ],
  },
  {
    id: 7,
    name: "Denture",
    slug: "denture",
    price: 249,
    priceFrom: true,
    duration: 60,
    icon: "",
    iconSrc: "/icons/Denture.svg",
    category: "Prosthetic",
    description:
      "Custom removable dentures that restore your smile and chewing function.",
    longDesc:
      "Our custom-made dentures are designed for comfort, stability, and a natural look. We consider your facial features, bite, and expectations to create a prosthesis that feels like part of you.",
    benefits: [
      "Restores ability to chew and speak more comfortably",
      "Improves facial support and smile aesthetics",
      "Custom-made to fit your gums and mouth anatomy",
    ],
    process: [
      "Initial consultation and impression taking",
      "Bite registration and try-in stage",
      "Fabrication of the final denture",
      "Fitting, adjustments, and care instructions",
    ],
  },
  {
    id: 8,
    name: "Composite Filling",
    slug: "composite-filling",
    price: 139,
    priceFrom: true,
    duration: 30,
    icon: "",
    iconSrc: "/icons/Composite Filling.svg",
    category: "Restorative",
    description:
      "Tooth-colored fillings that blend seamlessly with your natural teeth.",
    longDesc:
      "Composite fillings repair decayed or chipped teeth using tooth-colored materials. They bond directly to tooth structure for conservative, aesthetic restorations.",
    benefits: [
      "Matches the natural shade of your teeth",
      "Preserves more healthy tooth structure",
      "Provides strong, durable restorations",
    ],
    process: [
      "Removal of decay and cleaning of the cavity",
      "Layering of composite material into the prepared area",
      "Shaping and curing with a special light",
      "Finishing and polishing for a smooth surface",
    ],
  },
  {
    id: 9,
    name: "Teeth Whitening",
    slug: "teeth-whitening",
    price: 299,
    priceFrom: false,
    duration: 60,
    icon: "",
    iconSrc: "/icons/Teeth Whitening.svg",
    category: "Cosmetic",
    description:
      "Professional whitening for a brighter smile. Results in one session.",
    longDesc:
      "Our in-clinic teeth whitening uses professional-grade gels and controlled application to safely lighten the color of your teeth by several shades in a single visit.",
    benefits: [
      "Fast, noticeable whitening results",
      "Safer and more effective than over-the-counter kits",
      "Performed and monitored by a dental professional",
    ],
    process: [
      "Shade assessment and protection of gums and lips",
      "Application of whitening gel in cycles",
      "Activation and monitoring during the procedure",
      "Final shade check and sensitivity advice",
    ],
  },
] as const;

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Iqra",
    role: "Lead General Dentist",
    initials: "IQ",
    color: "#00A6A6",
    specialties: ["General Dentistry", "Cosmetic", "Implants"],
    bio: "Highly reviewed and patient-favorite dentist known for clear communication and gentle care.",
    experience: "8+ years",
    languages: ["English", "Urdu", "Arabic"],
  },
  {
    id: 2,
    name: "Dr. Mafaza",
    role: "General Dentist",
    initials: "MF",
    color: "#7ED321",
    specialties: ["Restorative", "Extractions", "Fillings"],
    bio: "Patient and thorough with excellent pain management and calm chairside manner.",
    experience: "6+ years",
    languages: ["English", "Arabic"],
  },
  {
    id: 3,
    name: "Dr. Mohamad",
    role: "General Dentist",
    initials: "MH",
    color: "#6c5ce7",
    specialties: ["Preventive", "Root Canal", "Aftercare"],
    bio: "Dedicated to patient education. Transparent about costs and treatment timelines.",
    experience: "7+ years",
    languages: ["English", "Arabic"],
  },
] as const;

export const FAQS = [
  {
    question: "How much does a dental cleaning cost?",
    answer:
      "Scaling and polishing at Health Point starts from just AED 79 — one of the most affordable rates in Dubai with no compromise on quality.",
  },
  {
    question: "Do you accept walk-ins?",
    answer:
      "Yes! Walk-in patients are always welcome. We're open daily from 1:00 PM to 9:00 PM. For urgent cases, call +971 58 588 6915.",
  },
  {
    question: "Is root canal treatment painful?",
    answer:
      "Modern root canal treatment is virtually painless. We use advanced local anesthesia so most patients feel little to no discomfort during the procedure.",
  },
  {
    question: "How long does teeth whitening take?",
    answer:
      "Our professional whitening treatment typically takes 45–60 minutes in one session. You'll see visible results immediately.",
  },
  {
    question: "Do you treat children?",
    answer:
      "Yes, we treat patients of all ages. Our doctors are experienced with pediatric dentistry and create a calm, friendly environment for children.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash and all major credit/debit cards. Insurance patients: please contact us before your visit to confirm coverage.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can fill our online booking form, WhatsApp us at +971 58 588 6915, call us directly, or walk in. We'll confirm online bookings within 30 minutes during clinic hours.",
  },
  {
    question: "Where are you located?",
    answer:
      "We're at Office 603, Bedaia Building, Al Barsha Street, Al Barsha 1, Dubai. Parking is available in the building.",
  },
  {
    question: "How often should I visit the dentist?",
    answer:
      "We recommend a check-up and cleaning every 6 months. Regular visits catch problems early and save money long-term.",
  },
  {
    question: "Do you offer Hollywood Smile / veneers?",
    answer:
      "Yes! Our Hollywood Smile package using composite veneers starts from AED 999 and can often be completed in a single visit.",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Shirley E.",
    rating: 5,
    text:
      "Second time at Health Point. The team explained every step clearly and made sure I was comfortable throughout. Prices were transparent and fair.",
  },
  {
    id: 2,
    name: "Dubai Patient",
    rating: 5,
    text:
      "Dr. Iqra is amazing. She explained my treatment options clearly and gave me a realistic plan. I felt in very safe hands.",
  },
  {
    id: 3,
    name: "Verified Review",
    rating: 5,
    text:
      "Had extraction, bridge and whitening done. Everything was handled professionally and gently. I will definitely be coming back.",
  },
  {
    id: 4,
    name: "Al Barsha Patient",
    rating: 5,
    text:
      "Scheduling was easy, the receptionist was very friendly, and the clinic atmosphere is calm and clean. Highly recommend.",
  },
  {
    id: 5,
    name: "Happy Patient",
    rating: 5,
    text:
      "The team prioritized my treatment based on urgency and budget. I felt heard and well taken care of.",
  },
  {
    id: 6,
    name: "Google Review",
    rating: 5,
    text:
      "First visit here and I really liked it. The doctor took time to explain everything. Modern clinic and excellent service.",
  },
] as const;

