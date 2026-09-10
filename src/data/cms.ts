import { Article, Testimonial, FAQItem, EventGalleryItem, ConsultingCaseStudy } from '../types';

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
    slug: 'charred-leeks-marrow-preserved-lemon',
    title: 'Charred Leeks, Roasted Bone Marrow & 100-Day Salt-Preserved Lemon',
    subtitle: 'A foundational study in fat, allium sweetness, and mineral salinity.',
    category: 'Recipes',
    date: '28. NOVEMBER 2025',
    readTime: '8 MIN READ',
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
    caption: 'PLATED COURSE THREE: ASH-ROASTED ALLIUMS AND REDUCTION',
    excerpt: 'The outer layers of the leek are sacrificed completely to the coals, turning to fragrant carbon while steaming the sweet tender heart in its own natural juices.',
    body: [
      'This dish has remained in some permutation on my autumn tasting menu across fifteen seasons. It represents everything I believe about culinary restraint: take an overlooked peasant allium, subject it to severe heat, and balance its caramelized sweetness with the richest beef tallow and the sharpest fermented citrus.',
      'The technique requires courage. You place whole, unpeeled winter leeks directly into glowing embers. To the untrained eye, you are ruining the product. But as the exterior blackens into a brittle insulating shell, the interior core braises in its own trapped vapor.',
      'Split open at table, dressed with whipped bone marrow emulsified with aged sherry vinegar and shaved cured lemon rind, it needs neither truffles nor gold leaf to command the room.'
    ],
    ingredients: [
      { item: 'Winter King Leeks', spec: '4 large stalks, trimmed of green tips', provenance: 'Star Route Farms, Bolinas CA' },
      { item: 'Canoe-Cut Beef Marrow Bones', spec: '2 pieces (400g), soaked in salt brine 24h', provenance: 'Niman Ranch Heritage Angus' },
      { item: '100-Day Salt-Preserved Lemon', spec: '1 rind, rinsed & fine brunoise', provenance: 'Atelier Yoho Winter Larder' },
      { item: 'Palomino Fino Sherry Vinegar', spec: '15ml, 30-year solera', provenance: 'Jerez de la Frontera, Spain' },
      { item: 'Flaky Fleur de Sel', spec: 'To finish', provenance: 'Guérande, Brittany' }
    ],
    methodSteps: [
      { step: 1, instruction: 'Bury whole unpeeled leeks in active hardwood embers for 18–22 minutes until charred black all around.' },
      { step: 2, instruction: 'Roast bone marrow at 220°C for 14 minutes. Render and strain marrow fat while warm, whisking with sherry vinegar.' },
      { step: 3, instruction: 'Carefully slit leek husks lengthwise; peel back blackened exterior and brush tender heart with warm marrow emulsion.' },
      { step: 4, instruction: 'Garnish immediately with minced preserved lemon rind and fleur de sel crystals. Serve steaming hot.' }
    ],
    chefNotes: 'Ensure the leeks are dry before touching the coals; surface water will create muddy soot rather than a crisp carbonized crust.',
    featured: true
  },
  {
    slug: 'cruelty-of-the-clock-tasting-menus',
    title: 'The Cruelty of the Clock: Why Tasting Menus Lose Their Way After Course Seven',
    subtitle: 'On culinary sensory fatigue, kitchen pacing, and the discipline of ending while guests still desire more.',
    category: 'Essays',
    date: '03. JANUARY 2026',
    readTime: '5 MIN READ',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80',
    caption: 'THE PASS AT COURSE SIX: SENSORY PALATE TRANSITION',
    excerpt: 'The modern sixteen-course marathon is often a monument to the chef’s ego rather than the diner’s pleasure. Real craftsmanship is knowing what to omit.',
    body: [
      'In the mid-2000s, fine dining fell victim to an arms race of quantity masquerading as luxury. Menus stretched to twenty-four bites, each accompanied by an oral lecture from a front-of-house captain while the butter melted and the foam collapsed.',
      'By course fourteen, human palate fatigue is a biological reality. The receptor cells on the tongue are dulled by salt, lipid, and acidity. What the guest experiences in the third hour is not wonder—it is endurance.',
      'In my consulting work across fine-dining dining rooms, the first intervention is almost always subtraction: strip the sequence down to eight pristine, mathematically paced movements. Send the guest into the evening feeling illuminated, buoyant, and longing for one more bite.'
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
    heroImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80',
    caption: 'MORNING STATION PREP: FISH SIGHTING & KNIFE GEOMETRY',
    excerpt: 'A cook running around frantically is not cooking fast; they are hemorrhaging seconds fixing yesterday’s disorganization. Quiet hands make lightning services.',
    body: [
      'When a young cook enters my kitchen for mentorship, I do not ask them to cook an omelette or butcher a duck. I ask them to wash a flat of chanterelles, wipe their cutting board, and set their station.',
      'In sixty seconds, everything is revealed. Where did they place their side towel? Is their knife bolster clean? Are their tasting spoons organized by direction? How do they carry themselves across the duckboards?',
      'Mentorship is not the transfer of recipes; recipes are cheap and everywhere. Mentorship is the transmission of kitchen discipline—the internal composure that allows a chef to stand before eighty covers with twenty pans firing and feel total stillness in the chest.'
    ],
    chefNotes: 'Mise-en-place is not physical ingredients in containers. It is a psychological state of finished intention before the first ticket prints.',
    featured: true
  },
  {
    slug: 'nyt-profile-silence-is-an-ingredient',
    title: 'The New York Times: "In Adam Yoho’s Hands, Silence is an Ingredient"',
    subtitle: 'A retrospective on twenty-five years shaping culinary standards away from the cameras.',
    category: 'Press',
    date: '11. AUGUST 2025',
    readTime: '4 MIN READ',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
    caption: 'PRESS ARCHIVE: HEALDSBURG ATELIER OPENING RETROSPECTIVE',
    excerpt: 'While celebrity chefs built media empires and frozen meal lines, Chef Adam Yoho remained where he has always been: six inches from the hot line with a tasting spoon in hand.',
    body: [
      '“There are chefs who perform for audiences, and there are cooks who cook for the person sitting in chair number four,” writes culinary critic Marcus Vance. “Adam Yoho belongs unequivocally to the latter tradition.”',
      'Across twenty-five years spanning classical French apprentice work in Lyon, California farm-to-table lineage, and his quiet consulting practice advising the world’s most respected dining rooms, Yoho has cultivated an almost monastic reputation for precision.',
      '“He does not shout, he does not film TikTok reels in chef jackets,” noted the Food & Wine retrospective. “He simply builds the cleanest, most uncompromising kitchens in the country.”'
    ],
    chefNotes: 'Published in The New York Times Arts & Dining Section, August 2025.',
    featured: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Julian Mercer',
    title: 'Managing Partner',
    establishmentOrContext: 'Mercer & Crane Hospitality Group (2 Michelin Stars)',
    serviceType: 'consulting',
    quote: 'Adam re-engineered our hot line operations and pass architecture before our grand opening. Within four weeks, our ticket times dropped 35%, food cost variance normalized to 0.4%, and our kitchen team operated with a calm I have never seen in twenty years of hospitality.',
    year: '2025',
    featured: true
  },
  {
    id: 't-2',
    author: 'Claire St. Claire',
    title: 'Estate Director',
    establishmentOrContext: 'St. Claire Vineyard & Reserve Cellars, Napa Valley',
    serviceType: 'events',
    quote: 'Chef Yoho designed and executed our 50th Anniversary Harvest Dinner over live vineyard oak coals for thirty international collectors. It was not merely dinner; it was the most transcendent culinary expression of our terroir we have ever hosted.',
    year: '2025',
    featured: true
  },
  {
    id: 't-3',
    author: 'Chef Marcus Nguyen',
    title: 'Executive Chef & Owner',
    establishmentOrContext: 'Anise & Embers (San Francisco)',
    serviceType: 'mentorship',
    quote: 'Under Adam’s mentorship as his sous chef and during my stage transition, I learned the mental discipline that allows me to lead my own 40-seat kitchen today without shouting, without panic, and with absolute culinary rigor.',
    year: '2024',
    featured: true
  },
  {
    id: 't-4',
    author: 'David Thorne',
    title: 'Culinary Vice President',
    establishmentOrContext: 'The Auberge Collection, Western Region',
    serviceType: 'consulting',
    quote: 'When we needed to reposition the flagship dining room at our Sonoma resort, Adam was the only phone call we made. His tasting menu R&D and brigade station training set a benchmark that our culinary directors still reference daily.',
    year: '2025',
    featured: false
  },
  {
    id: 't-5',
    author: 'Dr. Eleanor & Robert Vance',
    title: 'Private Patrons',
    establishmentOrContext: 'Private 12-Course Hearth Table, Carmel-by-the-Sea',
    serviceType: 'events',
    quote: 'Watching Adam work at the pass in our home was like observing a master luthier tune an instrument. Every course was quiet, deliberate, and extraordinarily delicious. Our guests are still discussing the charred marrow broth six months later.',
    year: '2026',
    featured: false
  },
  {
    id: 't-6',
    author: 'Sora Kim',
    title: 'Head Pastry Chef',
    establishmentOrContext: 'L’Atelier Nordique (Seattle)',
    serviceType: 'mentorship',
    quote: 'Adam’s insight into palate sequencing and bitter-savory balance transformed how I construct dessert courses. He teaches cooks how to listen to food rather than imposing technique for the sake of ego.',
    year: '2025',
    featured: false
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Consulting',
    question: 'What types of hospitality establishments do you consult for?',
    answer: 'Chef Adam Yoho consults for independent fine-dining establishments, boutique hotel restaurant concepts, multi-unit luxury hospitality groups, and culinary teams preparing for Michelin or Forbes travel guide audits. Engagements range from pre-opening line architecture and menu R&D to mid-service station audits and cost-engineering optimizations.'
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
    answer: 'To preserve uncompromising culinary precision, private dining and hearth experiences are typically designed for 8 to 24 seated guests for multi-course tasting menus, or up to 60 guests for curated vineyard banquets. Chef Yoho travels domestically and internationally with his core brigade.'
  },
  {
    id: 'faq-4',
    category: 'Events',
    question: 'Can dietary preferences and allergies be accommodated?',
    answer: 'Yes. With advance notice during intake, customized tasting sequences are tailored for guests with specific dietary requirements, seafood allergies, or plant-forward preferences while maintaining the thermodynamic and flavor profile of the menu.'
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
    answer: 'Every ingredient is sourced through direct relationships with organic biodynamic farms, day-boat sustainable fisheries, and heritage livestock purveyors who harvest in harmony with micro-seasons. We never cook with out-of-season cold-storage commodities.'
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'How far in advance should we initiate an inquiry?',
    answer: 'For consulting pre-openings and seasonal private dining bookings, we recommend reaching out 60 to 120 days in advance. Mentorship applications are reviewed at the start of each calendar quarter.'
  }
];

export const INITIAL_EVENT_GALLERY: EventGalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Autumn Vineyard Hearth Dinner',
    location: 'St. Helena, Napa Valley',
    format: '8-Course Live Wood Ember Tasting',
    guestCount: '16 Guests',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    caption: 'SERVICE COMMENCING AT TWILIGHT OVER SEASONED OAK EMBERS',
    tag: 'Vineyard Banquets'
  },
  {
    id: 'g-2',
    title: 'Private Estate Salon & Cellar Pairing',
    location: 'Carmel-by-the-Sea, California',
    format: '10-Course Bespoke Tasting Menu',
    guestCount: '10 Guests',
    image: '/bespoke-events-dinner.jpg',
    caption: 'PLATING THE AGED DUCK BREAST AND ROASTED CHANTERELLES',
    tag: 'Private Dining'
  },
  {
    id: 'g-3',
    title: 'The Forager & Fisherman Summer Solstice',
    location: 'Mendocino Coastline, California',
    format: 'Open-Air Coastal Fire Table',
    guestCount: '24 Guests',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    caption: 'WHOLE DAY-BOAT ROCKFISH HUNG OVER DRIFTWOOD COALS',
    tag: 'Vineyard Banquets'
  },
  {
    id: 'g-4',
    title: 'Atelier Yoho Masterclass & Chef’s Table',
    location: 'Healdsburg Studio Kitchen',
    format: 'Intimate Master Culinary Salon',
    guestCount: '8 Guests',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
    caption: 'STATION DEMONSTRATION: SAUCE REDUCTION & EMULSIFICATION',
    tag: 'Atelier'
  },
  {
    id: 'g-5',
    title: 'Winter Solstice Black Truffle Banquet',
    location: 'Aspen, Colorado',
    format: '7-Course Alpine Winter Menu',
    guestCount: '20 Guests',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    caption: 'PERIGORD TRUFFLE SHAVINGS OVER SLOW-POACHED FARM EGGS',
    tag: 'Tasting Salons'
  },
  {
    id: 'g-6',
    title: 'The Harvest Table under Old Vines',
    location: 'Sonoma Valley, California',
    format: 'Communal Wine Country Feast',
    guestCount: '32 Guests',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'NIGHT SERVICE UNDER LANTERNS IN OLD-GROWTH ZINFANDEL BLOCK',
    tag: 'Vineyard Banquets'
  }
];

export const CONSULTING_CASE_STUDIES: ConsultingCaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Kitchen Line Re-Engineering & 2-Star Michelin Transition',
    client: 'The Mercer Dining Room',
    location: 'San Francisco, CA',
    duration: '16 Weeks',
    challenge: 'A high-profile 70-cover establishment was experiencing severe ticket bottlenecking at the hot sauté pass, leading to inconsistent protein temperatures and escalating brigade turnover.',
    solution: 'Chef Yoho conducted a full ergonomic station diagnostic, re-mapped cook traffic lines, redesigned the meat and fish prep schedules into dedicated morning mise-en-place blocks, and standardized an 8-course precision pacing protocol.',
    outcome: 'Average table ticket variance reduced from ±14 minutes to under 2 minutes. Food waste dropped 22%, and the restaurant secured its second Michelin star in the subsequent guide release.',
    metrics: [
      { label: 'Ticket Variance', value: '-85%' },
      { label: 'Food Waste Cost', value: '-22%' },
      { label: 'Brigade Retention', value: '100%' }
    ],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'cs-2',
    title: 'Boutique Vineyard Hotel Culinary Direction & Launch',
    client: 'Estate 1886 Hotel & Kitchen',
    location: 'Healdsburg, CA',
    duration: '24 Weeks',
    challenge: 'A newly renovated 45-room wine country estate required a unified culinary identity spanning breakfast, pool terrace dining, and an ambitious 40-seat hearth tasting room without inflating kitchen labor costs.',
    solution: 'Engineered a cross-utilized whole-animal butchery program, built direct micro-purveyor contracts with eight Sonoma family farms, trained incoming brigade leadership, and created the opening signature hearth menu.',
    outcome: 'Achieved full profitability within month three of operation, named "Top 10 New Hotel Restaurants in North America" by Conde Nast Traveler.',
    metrics: [
      { label: 'Opening Profitability', value: 'Month 3' },
      { label: 'Local Sourcing Ratio', value: '94%' },
      { label: 'Average Cover Spend', value: '+38%' }
    ],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
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
