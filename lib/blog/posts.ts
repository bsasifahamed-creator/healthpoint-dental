export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  callout?: { title: string; body: string };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  authorRole: string;
  hero: { gradient: string; emoji: string };
  intro: string;
  sections: BlogSection[];
  cta: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'scaling-and-polishing-frequency',
    title: 'How Often Should You Do Scaling and Polishing?',
    excerpt:
      'Most healthy patients benefit from every six months. If you have gum sensitivity, smoke, or wear braces, we may shorten that cycle.',
    category: 'Preventive Care',
    readTime: '4 min read',
    date: '2026-04-12',
    author: 'Dr. Iqra',
    authorRole: 'Lead Dentist',
    hero: { gradient: 'from-teal/35 via-teal/15 to-transparent', emoji: '🦷' },
    intro:
      'Scaling and polishing is the single most cost-effective dental visit most adults can book. Plaque hardens into tartar within 24–72 hours of forming — once it does, no toothbrush in the world will remove it. Only a hand or ultrasonic scaler will.',
    sections: [
      {
        heading: 'The short answer',
        paragraphs: [
          'For a healthy adult with no gum disease, every 6 months is the international standard. The American Dental Association, the British Society of Periodontology, and the DHA all agree on this baseline.',
          'But "healthy" is doing a lot of work in that sentence. If any of the following apply, your dentist may shorten the cycle to every 3 or 4 months.',
        ],
        list: [
          'You smoke or vape — nicotine and tar accelerate tartar buildup.',
          'You have receding gums, bleeding on brushing, or a history of periodontitis.',
          'You wear braces, retainers, or aligners.',
          'You take medication that reduces saliva flow (some antidepressants, blood-pressure pills, antihistamines).',
          'You have diabetes — gum tissue heals more slowly when blood sugar is elevated.',
        ],
      },
      {
        heading: 'What actually happens during the visit',
        paragraphs: [
          'Step one is ultrasonic scaling. A small metal tip vibrating at ~25,000 Hz fractures tartar off the enamel and below the gum line, while a fine water spray cools the tip and washes debris away. You feel a buzz and a cool jet, no pain.',
          'Step two is hand scaling — fine curettes to reach tight contact points the ultrasonic cannot. Most patients do not need anesthesia, but if your gums are inflamed we can use a topical numbing gel.',
          'Step three is polishing — a rubber cup loaded with mildly abrasive paste removes surface stains from coffee, tea, and pigmented foods. Your teeth look noticeably brighter when you leave, although polishing alone does not change the underlying enamel shade.',
        ],
      },
      {
        callout: {
          title: 'AED 79 — what you actually pay at Health Point',
          body: 'Our scaling-and-polishing price has not changed in three years. It is a single transparent fee with no upsell. If we find a cavity or recommend additional work, it is quoted separately and only with your consent.',
        },
      },
      {
        heading: 'Signs you are overdue',
        list: [
          'Your gums bleed when you brush or floss — even occasionally.',
          'You can feel a rough, ridge-like deposit on the inside of your lower front teeth with your tongue.',
          'Persistent bad breath that returns within an hour of brushing.',
          'A "long in the tooth" appearance — gum recession exposing more of the root.',
        ],
        paragraphs: [
          'None of these are emergencies, but they all point to tartar buildup that home care cannot fix. The earlier we intervene, the less likely you are to need deep cleaning, scaling under anesthesia, or eventually periodontal surgery.',
        ],
      },
    ],
    cta: 'Book a scaling and polishing visit',
  },
  {
    slug: 'whitening-clinic-vs-home-kits',
    title: 'Teeth Whitening: Clinic Treatment vs Home Kits',
    excerpt:
      'In-clinic whitening is faster, safer, and more even — but home kits have their place. Here is when each one makes sense, and what results to expect.',
    category: 'Cosmetic',
    readTime: '5 min read',
    date: '2026-04-02',
    author: 'Dr. Mafaza',
    authorRole: 'Specialist',
    hero: { gradient: 'from-green/35 via-green/15 to-transparent', emoji: '✨' },
    intro:
      'Whitening is the most-Googled dental topic in the UAE, and also the most misunderstood. Both clinic treatments and home kits use carbamide or hydrogen peroxide — the difference is concentration, exposure time, and supervision.',
    sections: [
      {
        heading: 'How whitening actually works',
        paragraphs: [
          'Peroxide molecules diffuse through enamel and dentin and break the long chromogenic chains in stained tooth structure into shorter, lighter ones. The chemistry is the same in a clinic gel and a pharmacy strip. What differs is the active concentration (typically 5–10% for home kits, 25–40% for clinic) and the contact time.',
          'No whitening method bleaches the inside of the tooth permanently. Stain re-accumulates over months and years, faster if you drink coffee, red wine, or smoke. Most people maintain a clinic-level shade for 12–24 months with sensible habits and touch-ups.',
        ],
      },
      {
        heading: 'In-clinic whitening at Health Point',
        paragraphs: [
          'We use a 35% hydrogen peroxide gel, applied to isolated teeth (your gums and lips are protected with a flowable barrier) and activated for 15-minute cycles, usually three of them. A single visit takes 60–75 minutes. You typically jump 4–8 VITA shades in one sitting.',
          'The advantages are speed, even coverage, and immediate professional assessment if you feel sensitivity. The disadvantages are cost and a higher chance of short-term sensitivity in the 24 hours after the visit.',
        ],
      },
      {
        heading: 'Custom take-home trays',
        paragraphs: [
          'For patients with sensitive teeth, restorations on the front teeth, or who simply prefer a gradual change, we make custom trays from precise impressions and supply pharmacy-grade gel. You wear the trays nightly for 2–3 weeks. Results are usually equal to in-clinic, just spread out.',
          'These are NOT the same as the one-size-fits-all trays in over-the-counter kits. The custom fit means the gel stays on the teeth, not the gums, which dramatically reduces irritation.',
        ],
      },
      {
        heading: 'Over-the-counter kits — when they make sense',
        paragraphs: [
          "Strips and one-size trays from pharmacies do work — slightly. They are limited to a few percent peroxide for safety, so expect a 1–3 shade change after a full course, mostly on the front six teeth. They will not whiten old fillings, crowns, or veneers.",
          'They are a reasonable option if you have already had professional whitening and just want a gentle top-up, or if budget is the deciding factor and you have no restorations on your smile line.',
        ],
        list: [
          'Avoid charcoal toothpastes — they are abrasive, remove surface stain temporarily, and roughen enamel over time.',
          'Skip kits that promise results in 1–2 days. They are either too aggressive or marketing exaggeration.',
          'Never use household bleach or hydrogen peroxide concentrations sold for cleaning. They are not pH-buffered for oral use.',
        ],
      },
      {
        callout: {
          title: 'Sensitivity is normal, not damage',
          body: 'About 60% of patients feel mild zinging sensitivity for 24–48 hours after clinic whitening. Use a desensitising toothpaste (Sensodyne Repair, Pronamel) for one week before and one week after the visit. The sensitivity always resolves — your enamel is not weakened.',
        },
      },
    ],
    cta: 'Ask about whitening options',
  },
  {
    slug: 'root-canal-what-to-expect',
    title: 'What Actually Happens During a Root Canal',
    excerpt:
      'Root canals are far less painful than their reputation. A step-by-step walkthrough so you know exactly what to expect when you sit in the chair.',
    category: 'Treatment Guide',
    readTime: '6 min read',
    date: '2026-03-22',
    author: 'Dr. Iqra',
    authorRole: 'Lead Dentist',
    hero: { gradient: 'from-teal/35 via-teal/15 to-transparent', emoji: '🩺' },
    intro:
      "Most patients tell us afterwards that a root canal felt like a long filling — uncomfortable to think about, completely manageable to sit through. The painful part is usually what brought you in. The treatment itself is what stops that pain.",
    sections: [
      {
        heading: 'Why you need one',
        paragraphs: [
          'The pulp at the centre of a tooth contains nerves and blood vessels. When deep decay, a fracture, or repeated dental work lets bacteria reach the pulp, it becomes inflamed and eventually dies. Left alone, infection drains out through the root tip into the bone, producing an abscess.',
          'A root canal removes the infected tissue, cleans and shapes the inside of the canals, and seals them so bacteria cannot return. The alternative is extraction, which leaves a gap that must be filled later with an implant or bridge — almost always at higher total cost.',
        ],
      },
      {
        heading: 'The visit, minute by minute',
        list: [
          'Anesthesia: We use a buffered articaine injection. You feel a slight sting for 4–5 seconds, then nothing. Numbness sets in within 2–3 minutes.',
          'Isolation: A thin rubber sheet (the dental dam) goes over the tooth so saliva and bacteria stay out of the canal during cleaning. This dramatically improves success rates.',
          'Access: A small opening is made through the chewing surface to reach the pulp chamber. You feel pressure but no pain.',
          'Cleaning and shaping: Fine nickel-titanium files, rotated by a torque-controlled motor, clean and shape the canals. We irrigate continuously with sodium hypochlorite to dissolve organic debris.',
          'Filling: A biocompatible rubber called gutta-percha is sealed into the canals with a thin layer of bioceramic cement.',
          'Temporary or final restoration: A small composite filling closes the access. A permanent crown (usually 1–2 weeks later) protects the tooth long-term.',
        ],
        paragraphs: [
          'Most molars take 60–90 minutes for a complete root canal in a single visit. Front teeth with a single canal are often 45 minutes.',
        ],
      },
      {
        heading: 'After the appointment',
        paragraphs: [
          'Mild tenderness when biting is normal for 3–5 days while the surrounding bone settles. Most patients manage with ibuprofen 400 mg as needed. Severe swelling, sustained pain, or fever in the days following the visit is unusual — call us immediately if it happens.',
          'Avoid hard or sticky foods on the treated side until the permanent crown is fitted. A root-canalled tooth without a crown is far more likely to fracture, and a fractured root-canalled tooth is usually unrestorable.',
        ],
      },
      {
        callout: {
          title: 'Success rates are higher than most patients realise',
          body: 'Modern root canals done with rotary instrumentation and a rubber dam have published success rates of 90–95% at five years, comparable to implants and significantly cheaper. Saving your natural tooth is almost always the right first option.',
        },
      },
    ],
    cta: 'Book a consultation if you are in pain',
  },
  {
    slug: 'braces-vs-aligners',
    title: 'Braces or Aligners: Which Is Right for You?',
    excerpt:
      'Both can deliver beautiful results. The right option depends on case complexity, age, lifestyle, and how disciplined you are with compliance.',
    category: 'Orthodontics',
    readTime: '7 min read',
    date: '2026-03-08',
    author: 'Dr. Mafaza',
    authorRole: 'Specialist',
    hero: { gradient: 'from-green/35 via-green/15 to-transparent', emoji: '🦷' },
    intro:
      "There is no universal winner between braces and clear aligners. Both physically move teeth using gentle, sustained pressure on the periodontal ligament. The choice between them is about whether the case is mechanically suitable for aligners and whether you will wear them as instructed.",
    sections: [
      {
        heading: 'Cases where aligners shine',
        list: [
          'Mild to moderate crowding (less than 6 mm of total deficiency).',
          'Spacing and small gaps that need closing.',
          'Mild crossbites and overbites that are predominantly dental, not skeletal.',
          'Adult patients who need to look professional during treatment (sales, hospitality, presenters).',
          'Patients with metal allergies or active gum disease where wires would harbour plaque.',
        ],
      },
      {
        heading: 'Cases where fixed braces are still the better tool',
        list: [
          'Severe crowding requiring extractions and major space closure.',
          'Significant rotations of canines or premolars beyond about 35 degrees.',
          'Skeletal discrepancies in adolescents where growth modification is part of the plan.',
          'Patients who realistically cannot wear aligners 20–22 hours a day. Compliance is the single biggest predictor of aligner success — far more than case complexity.',
        ],
      },
      {
        heading: 'Treatment time and visit frequency',
        paragraphs: [
          'A typical aligner case runs 9–18 months with appointments every 6–10 weeks for new tray batches and progress checks. A typical fixed-braces case runs 18–28 months with appointments every 4–6 weeks for adjustments.',
          'Aligner appointments are shorter (15–20 minutes) and require fewer emergency visits — no popped brackets or poking wires. Braces appointments are longer (30–45 minutes) and occasionally interrupted by brackets that come loose with sticky food.',
        ],
      },
      {
        heading: 'Cost in the UAE',
        paragraphs: [
          'In Dubai, aligners typically run AED 12,000–22,000 for a full case from a recognised brand, depending on number of trays and complexity. Conventional metal braces run AED 7,500–12,000. Ceramic (tooth-coloured) braces sit between the two.',
          'Insurance coverage for orthodontics in the UAE is patchy — many plans exclude it entirely or cap reimbursement at AED 5,000. Confirm with your insurer before signing a treatment plan.',
        ],
      },
      {
        callout: {
          title: 'Retention is forever',
          body: 'Both options need lifetime retention afterwards — usually a fixed wire bonded behind the front teeth plus a clear retainer worn at night. Teeth want to drift back. We follow up at 6 and 12 months after treatment ends to make sure retention is holding.',
        },
      },
    ],
    cta: 'Book an orthodontic assessment',
  },
  {
    slug: 'kids-first-dental-visit',
    title: "Your Child's First Dental Visit — A Parent's Guide",
    excerpt:
      'By their first birthday, or within six months of the first tooth appearing. Here is how to make that first visit go smoothly and set up a lifetime of good habits.',
    category: 'Pediatric',
    readTime: '4 min read',
    date: '2026-02-20',
    author: 'Dr. Iqra',
    authorRole: 'Lead Dentist',
    hero: { gradient: 'from-teal/35 via-teal/15 to-transparent', emoji: '👶' },
    intro:
      'The American Academy of Pediatric Dentistry and the British Society of Paediatric Dentistry both recommend a first dental visit by age one, or within six months of the first tooth erupting — whichever comes first. The earlier the first visit, the calmer every future one becomes.',
    sections: [
      {
        heading: 'What the visit looks like',
        paragraphs: [
          'For a one or two year old, the visit is largely a meet-and-greet. We count teeth, check for early decay, look at gum health, and apply fluoride varnish if appropriate. The whole appointment takes 10–15 minutes and is usually done with the child sitting on the parent\'s lap, knee-to-knee with the dentist.',
          'For a three to five year old, we transition to the chair and demonstrate brushing, flossing, and the "tickle counter" — the saliva ejector. We use child-safe language: "sleepy juice" for anesthesia, "rain" for the water spray, "tooth fairy paint" for fluoride varnish.',
        ],
      },
      {
        heading: 'How to prepare your child',
        list: [
          'Talk about the visit casually in the day or two before. Avoid words like "hurt", "shot", "drill", or "pain" — they will not have those associations yet unless an adult plants them.',
          'Read a picture book about going to the dentist. Peppa Pig has an episode. Daniel Tiger has one too.',
          'Bring a comfort toy. Many of our pediatric chairs have a small mounted iPad with cartoons.',
          'Schedule for a time when your child is well-rested. Late morning is ideal; late afternoon rarely is.',
          'Eat a light meal beforehand. Avoid sugar in the two hours before — sugar plus excitement equals a wired toddler.',
        ],
      },
      {
        heading: 'Common parent worries — answered',
        paragraphs: [
          '"Will they need X-rays?" Not at the first visit, usually. We only X-ray when there is a clinical reason and we use the lowest dose digital sensors. Pediatric protective lead aprons and thyroid collars are standard.',
          '"What if my child cries?" Some children do. We do not force compliance. If a visit is going badly we stop, reschedule, and try again in two weeks. Forcing through a bad first visit builds dental fear that lasts decades.',
          '"Is fluoride safe?" Yes, at the doses we use. A 5% sodium fluoride varnish applied twice a year reduces decay by about 37% in primary teeth (Cochrane review, 2013). Toxicity from in-clinic application is essentially impossible.',
        ],
      },
      {
        callout: {
          title: 'Cavities in baby teeth still matter',
          body: 'Baby teeth fall out eventually — but untreated decay in them causes pain, infection, abscesses, missed school days, and crooked permanent teeth that erupt into too little space. Treating early caries is far cheaper, faster, and gentler than treating advanced disease.',
        },
      },
    ],
    cta: 'Book a first-visit appointment for your child',
  },
  {
    slug: 'gum-bleeding-when-to-worry',
    title: 'Bleeding Gums: When Should You Worry?',
    excerpt:
      'Bleeding when you brush is your gums calling for help. It is almost always reversible — if you act in the first few weeks.',
    category: 'Preventive Care',
    readTime: '4 min read',
    date: '2026-02-04',
    author: 'Dr. Mohamad',
    authorRole: 'Specialist',
    hero: { gradient: 'from-green/35 via-green/15 to-transparent', emoji: '🩸' },
    intro:
      'Healthy gums do not bleed when you brush. They do not bleed when you floss. If yours do, even mildly, even occasionally, your body is telling you bacteria have inflamed the soft tissue at the neck of your teeth. The good news: in the early stage, it is fully reversible.',
    sections: [
      {
        heading: 'Stage 1 — Gingivitis (reversible)',
        paragraphs: [
          'Plaque sitting at the gum line for 24–48 hours triggers an immune response. Capillaries dilate, tissue swells slightly, and the gums bleed on contact. This is gingivitis. There is no bone loss yet, no permanent damage.',
          'The fix is mechanical: thorough brushing twice daily, daily flossing or interdental brushes, and a scaling visit to remove any tartar already formed. Most cases of gingivitis resolve within 10–14 days of good home care.',
        ],
      },
      {
        heading: 'Stage 2 — Periodontitis (not reversible, but stoppable)',
        paragraphs: [
          'Untreated gingivitis can progress to periodontitis. The body, unable to clear the bacteria, starts destroying its own bone around the tooth to "wall off" the infection. You lose attachment and eventually bone height.',
          'Once that happens, the bone does not grow back on its own. We can stop the disease and stabilise the tooth, but we cannot turn back the clock. Treatment is deep scaling under local anesthesia, sometimes with localized antibiotics, and an aggressive 3-month maintenance cycle.',
        ],
      },
      {
        heading: 'When bleeding gums are a medical signal',
        list: [
          'Sudden onset of bleeding gums in pregnancy is common ("pregnancy gingivitis"). Hormonal — usually resolves after delivery. Still needs a cleaning.',
          'Bleeding gums in a smoker can mask serious disease. Nicotine constricts blood vessels, so periodontitis can be advanced before bleeding even appears.',
          'Spontaneous bleeding (not triggered by brushing) is a red flag. It can indicate blood disorders, vitamin deficiencies, leukaemia, or severe periodontitis. See a dentist or doctor quickly.',
          'Bleeding plus loose teeth in an adult under 50 — book an appointment within the week.',
        ],
      },
      {
        callout: {
          title: 'Two-week test',
          body: 'For two weeks, brush twice a day for two full minutes with a soft brush and clean between every tooth daily. If your gums still bleed at the end of those two weeks, book a scaling visit. Almost always, there is tartar below the gum line that home care cannot reach.',
        },
      },
    ],
    cta: 'Book a gum health check',
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, n = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return blogPosts.slice(0, n);
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const rest = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, n);
}
