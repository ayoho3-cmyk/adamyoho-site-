import { Article, FAQItem } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    slug: 'first-steps',
    title: 'First Steps',
    subtitle: 'From Bob Ross and great chefs on television to twenty-four years behind the line.',
    category: 'Essays',
    date: 'SEPTEMBER 2026',
    readTime: '5 MIN READ',
    heroImage: '/first-steps-hero.jpg',
    caption: 'GOLDEN CROQUETTES WITH REMOULADE & MICROGREENS · THE CRAFT BEHIND THE LINE',
    excerpt: 'I would get home from school and make some garbage food, retreat to my basement and watch Bob Ross, dozing off until Great Chefs, Great Cities came on. It was at this point that unheard ingredients like truffles and caul fat piqued a curiosity that would consume the next 24 years.',
    body: [
      'I remember cooking when I was young. In high school, my dad traveled for work, my sister was away at college, and my mom was a nurse. I would get home from school and make some garbage food, retreat to my basement and watch Bob Ross. I recall the day, belly full, dozing off to the dulcet tones of Bob Ross talking to the happy little trees. I woke up just in time for the iconic Ross signature. It was at this point that I discovered Great Chefs, Great Cities. Here I discovered unheard ingredients like truffles and caul fat, definitely not things common on the table growing up in West Virginia. My interests were piqued. I searched out other cooking shows. Martin Yan wielding a massive cleaver with elegance and grace, Graham Kerr being witty with his slightly creepy British charm, and Julia making cooking look enjoyable and possible for everyone.',
      'I was intrigued by how food mattered to these people, how ingredients and techniques were important. It was then I decided, as a good son, I would have dinner for my mom when she got home from work. I can’t recall what I ever made, and I am sure none of it was very good. But I convinced myself at least my mom would not have to cook a meal after a long day in an OB/GYN office.',
      'I remember, once, trying to make a souffle. All I knew was eggs and sugar. Needless to say, the dry, overly sweet baked omelet was definitely not like the souffles I saw on TV. I contemplated going to culinary school right after high school. Due to peer pressure and the conviction that I would be a lawyer I decided to go to college instead. Needless to say frat parties, binge drinking and debauchery stood in my way of law school. It wasn’t until graduating college and trying my craft in the very distinguished world of rental cars, that I decided to follow my passions into the world of culinary arts.',
      'Little did I know at the time, but this journey would consume the next 24 plus years of my life. I would never work at 4 star restaurants or in big time markets. I worked in small towns and decent sized cities. I worked in successful restaurants and huge failures, pizza shops and fancy steakhouses. I chased money and titles and ate huge slices of humble pie. The lessons learned through long hours, hard work and dedication go far beyond the walls of a professional kitchen. I would compile the list of Rules of the kitchen over the course of my career. I would add some, delete some, and amend some. These rules may look to be kitchen specific, but I feel that these lessons can be carried throughout life, whether you work in a kitchen or just utilize them in your day to day life. So here we go!'
    ],
    chefNotes: 'These rules may look to be kitchen specific, but I feel that these lessons can be carried throughout life, whether you work in a kitchen or just utilize them in your day to day life.',
    featured: true
  },
  {
    slug: 'duck-schnitzel-brandied-cherries-rotkohl-spatzle',
    title: 'Duck Schnitzel with Brandied Cherries, Rotkohl & Spätzle',
    subtitle: 'A study in crisp poultry execution, sweet-tart fruit maceration, and classic winter garnishes.',
    category: 'Recipes',
    date: '16. JANUARY 2023',
    readTime: '6 MIN READ',
    heroImage: '/duck-schnitzel.jpg',
    caption: 'PLATED SPECIAL: DUCK SCHNITZEL, BRANDIED CHERRIES, BRAISED ROTKOHL & FRESH SPÄTZLE',
    excerpt: 'Pounded duck breast executed through classical breading technique, paired with slow-braised sweet and sour cabbage, brandied cherries, and hand-pressed spätzle.',
    body: [
      'Duck schnitzel bridges Central European alpine tradition with precision poultry craft. Removing the fatty duck skin allows the breast meat to be pounded evenly to half an inch, ensuring rapid, even frying while remaining tender and moist inside a golden panko shell.',
      'The rendered duck skin is never discarded—it is diced small and crisped down over gentle heat to provide a salty, rich crunch across the plate that echoes the richness of the duck.',
      'To cut the natural richness of the breaded cutlet, we balance the plate with warm braised Rotkohl simmered low with red wine vinegar and sugar, accompanied by the deep warmth of brandied cherries and freshly dropped nutmeg-scented spätzle.'
    ],
    recipeSections: [
      {
        title: '1. Duck Schnitzel',
        ingredients: [
          { item: 'Duck Breast', spec: '1 ea' },
          { item: 'Egg', spec: '1 ea' },
          { item: 'Panko', spec: '2 oz' },
          { item: 'Flour', spec: '1 oz' }
        ],
        method: [
          'Remove skin and pound duck breast until approximately 1/2 inch thick.',
          'Execute standard breading procedure (flour, egg, panko).',
          'Dice skin and render until crispy for garnish or accompaniment.'
        ]
      },
      {
        title: '2. Brandied Cherries',
        ingredients: [
          { item: 'Cherries', spec: '1 oz' },
          { item: 'Sugar', spec: '1 oz' },
          { item: 'Brandy', spec: '2 oz' }
        ],
        method: [
          'Combine ingredients, macerate, and simmer according to standard preparation standards.'
        ]
      },
      {
        title: '3. Rotkohl (Red Cabbage)',
        ingredients: [
          { item: 'Red Cabbage', spec: '4 oz' },
          { item: 'Sugar', spec: '¼ Cup' },
          { item: 'Red Wine Vinegar', spec: '¼ cup' },
          { item: 'Salt & Pepper', spec: 'To taste' }
        ],
        method: [
          'Quarter and core red cabbage.',
          'Thinly slice on a mandolin.',
          'Heat vinegar and sugar in a rondeau and stir to dissolve sugar.',
          'Add cabbage and cook on low heat for 45 minutes.'
        ]
      },
      {
        title: '4. Spätzle',
        ingredients: [
          { item: 'All Purpose Flour', spec: '4 oz' },
          { item: 'Eggs', spec: '1 ea' },
          { item: 'Water', spec: '⅓ cup' },
          { item: 'Nutmeg', spec: 'dash' },
          { item: 'Salt', spec: 'pinch' }
        ],
        method: [
          'Combine all ingredients together in a large bowl and mix thoroughly.',
          'Fill a deep hotel pan halfway with water; use a perforated hotel pan to press and form the spätzle directly into the boiling water.',
          'Cook in small batches and cool immediately in an ice bath.'
        ]
      }
    ],
    chefNotes: 'Always ensure your breading station is clean and dry. Render the diced skin slowly on low heat so the cracklings become completely crisp rather than chewy.',
    featured: true
  },
  {
    slug: 'cruelty-of-the-clock-tasting-menus',
    title: 'The Cruelty of the Clock: Why Tasting Menus Lose Their Way After Course Seven',
    subtitle: 'On culinary sensory fatigue, kitchen pacing, and the discipline of ending while guests still desire more.',
    category: 'Essays',
    date: '03. JANUARY 2026',
    readTime: '5 MIN READ',
    heroImage: '/kitchen-pass-hero.jpg',
    caption: 'THE PASS AT COURSE SIX: SENSORY PALATE TRANSITION',
    excerpt: 'The modern sixteen-course marathon is often a monument to the chef’s ego rather than the diner’s pleasure. Real craftsmanship is knowing what to omit.',
    body: [
      'In the mid-2000s, fine dining fell victim to an arms race of quantity masquerading as luxury. Menus stretched to twenty-four bites, each accompanied by an oral lecture from a front-of-house captain while the butter melted and the foam collapsed.',
      'By course fourteen, human palate fatigue is a biological reality. The receptor cells on the tongue are dulled by salt, lipid, and acidity. What the guest experiences in the third hour is not wonder—it is endurance.',
      'The first intervention is almost always subtraction: strip the sequence down to eight pristine, mathematically paced movements. Send the guest into the evening feeling illuminated, buoyant, and longing for one more bite.'
    ],
    chefNotes: 'Pacing between courses must never exceed twelve minutes, nor should it rush below seven. The tempo of the dining room is as musical as a score.',
    featured: false
  },
  {
    slug: 'art-of-the-kitchen-stage',
    title: 'The Art of the Kitchen Stage: Mentoring the Next Generation of Line Cooks',
    subtitle: 'Why speed is a byproduct of clean stations, quiet hands, and mental mise-en-place.',
    category: 'Technique',
    date: '19. FEBRUARY 2026',
    readTime: '7 MIN READ',
    heroImage: '/culinary-knives-roll.jpg',
    caption: 'MORNING STATION PREP: FISH SIGHTING & KNIFE GEOMETRY',
    excerpt: 'A cook running around frantically is not cooking fast; they are hemorrhaging seconds fixing yesterday’s disorganization. Quiet hands make lightning services.',
    body: [
      'When a young cook enters my kitchen for mentorship, I do not ask them to cook an omelette or butcher a duck. I ask them to wash a flat of chanterelles, wipe their cutting board, and set their station.',
      'In sixty seconds, everything is revealed. Where did they place their side towel? Is their knife bolster clean? Are their tasting spoons organized by direction? How do they carry themselves across the duckboards?',
      'Mentorship is not the transfer of recipes; recipes are cheap and everywhere. Mentorship is the transmission of kitchen discipline—the internal composure that allows a chef to stand before eighty covers with twenty pans firing and feel total stillness in the chest.'
    ],
    chefNotes: 'Mise-en-place is not physical ingredients in containers. It is a psychological state of finished intention before the first ticket prints.',
    featured: true
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Consulting',
    question: 'What types of hospitality establishments do you consult for?',
    answer: 'Chef Adam Yoho consults for independent fine-dining establishments, boutique hotel restaurant concepts, multi-unit luxury hospitality groups, and culinary teams preparing to take the next steps forward. Engagements range from pre-opening line architecture and menu R&D to mid-service station audits and cost-engineering optimizations.'
  },
  {
    id: 'faq-2',
    category: 'Consulting',
    question: 'How are consulting engagements structured and scoped?',
    answer: 'Engagements typically follow a four-stage framework: (1) Discovery & Line Diagnostic Audit, (2) Menu & Station R&D, (3) Brigade Handover & Recipe Bible Standardization, and (4) Live Pass Oversight during launch or repositioning. Engagements can be project-based (4 to 12 weeks) or structured as quarterly executive advisory retainers.'
  },
  {
    id: 'faq-3',
    category: 'Events',
    question: 'What is the guest capacity and geographical range for private dining experiences?',
    answer: 'To preserve uncompromising culinary precision, private dining experiences are typically designed for 8 to 24 seated guests for multi-course tasting menus, or up to 60 guests for curated banquets. Chef Yoho serves the Texas Hill Country, Austin, Pittsburgh, and Columbus, and can discuss travel beyond those areas.'
  },
  {
    id: 'faq-4',
    category: 'Events',
    question: 'Can dietary preferences and allergies be accommodated?',
    answer: 'Yes. With advance notice during intake, customized tasting sequences are tailored for guests with specific dietary requirements, seafood allergies, or plant-forward preferences while maintaining the high level of execution and flavor profile of the menu.'
  },
  {
    id: 'faq-5',
    category: 'Mentorship',
    question: 'Who is eligible for Chef Yoho’s 1-on-1 Culinary Mentorship Program?',
    answer: 'The mentorship program is designed for working sous chefs, chef de parties with 3+ years on high-volume or fine-dining lines, and rising culinary entrepreneurs preparing to open their first independent concept. Selection is competitive and conducted on a rolling quarterly basis.'
  },
  {
    id: 'faq-6',
    category: 'Sourcing & Dietary',
    question: 'What is your sourcing philosophy and purveyor standard?',
    answer: 'Every ingredient is sourced through direct relationships with local farms, day-boat sustainable fisheries, and curated ranches that focus on sustainable practices.'
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'How far in advance should we initiate an inquiry?',
    answer: 'For consulting pre-openings and seasonal private dining bookings, we recommend reaching out 60 to 120 days in advance. Mentorship applications are reviewed at the start of each calendar quarter.'
  }
];

export const TIMELINE_EVENTS = [
  {
    year: '2002–2006',
    title: 'Culinary Genesis at The Food Studio',
    location: 'Atlanta, Georgia',
    description: 'Career began at The Food Studio in Atlanta, Georgia. Mastered classical foundations, wood-fired line execution, butchery, and brigade communication in a high-standard kitchen.'
  },
  {
    year: '2007–2015',
    title: 'High-Volume Leadership & Diverse Concepts',
    location: 'Columbus, Pittsburgh & Atlanta',
    description: 'Led kitchen brigades across diverse hospitality formats—from craft pizza shops and authentic taquerias to neighborhood bistros and high-end steakhouses. Honed deep operational instincts, station ergonomics, and high-volume consistency.'
  },
  {
    year: '2016–2021',
    title: 'Restaurant Openings & Ownership of Uptown 51',
    location: 'Columbus, OH & Regional Markets',
    description: 'Spearheaded 8 restaurant openings from blank floor plan to opening night, including founding and operating Uptown 51. Engineered line layouts, cost controls, recipe standardization, and team culture.'
  },
  {
    year: '2022–Present',
    title: 'Culinary Consulting & Private Advisory',
    location: 'Texas Hill Country, Austin, Pittsburgh, Columbus',
    description: 'Providing strategic culinary consulting, bespoke private dining, concept development, and 1-on-1 mentorship for emerging chefs and ambitious hospitality operators.'
  }
];

export const KITCHEN_PRINCIPLES = [
  {
    number: '01',
    title: 'Respect the Food',
    description: 'Something had to die to be here.'
  },
  {
    number: '02',
    title: 'Respect the Guest',
    description: '$$$$ makes the restaurant go round.'
  },
  {
    number: '03',
    title: 'Respect the Staff',
    description: 'We are family. Someone will eventually piss you off, but we are all here for a common goal.'
  },
  {
    number: '04',
    title: 'The Standard',
    description: 'The way you do anything is the way you do everything..'
  },
  {
    number: '05',
    title: 'Cleanliness is Next to Godliness',
    description: 'You might not see god, but you sure can see cleanliness.'
  },
  {
    number: '06',
    title: 'Mise en Place',
    description: 'Don’t fuck with the mise en place. Everything in its place, keep it in its place.'
  },
  {
    number: '07',
    title: 'Station Order',
    description: 'Put it back where it belongs.'
  },
  {
    number: '08',
    title: 'Salt and Pepper',
    description: 'Salt and pepper do not get premixed.'
  },
  {
    number: '09',
    title: 'Sweat the Details',
    description: 'The difference between good and great is always small details.'
  },
  {
    number: '10',
    title: 'Quality & Speed',
    description: 'Never sacrifice quality for speed. Never sacrifice speed for quality. Know the difference and be prepared for both.'
  },
  {
    number: '11',
    title: 'You Start It, You Own It',
    description: 'You start it, you own. Don’t walk away and assume it will finish itself.'
  },
  {
    number: '12',
    title: 'Taste Your Cooking',
    description: 'Always taste your cooking. If it ain’t right, don’t serve it.'
  },
  {
    number: '13',
    title: 'Storage Discipline',
    description: 'Don’t open a new one if one is already open!!!!'
  },
  {
    number: '14',
    title: 'Sharp Knives, Sharp Minds',
    description: 'Sharp knives, sharp minds.'
  },
  {
    number: '15',
    title: 'Strive for Wu Wei',
    description: 'Strive for Wu Wei.'
  },
  {
    number: '16',
    title: 'Have Fun!',
    description: 'Have fun!'
  }
];
