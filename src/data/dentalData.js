export const CLINIC_INFO = {
  name: "AuraDent Studio",
  subtitle: "Luxury 3D Dental Clinic & Night Care",
  tagline: "Painless, Precision Dentistry Engineered for Flawless Smiles",
  phone: "+917275478585",
  phoneDisplay: "+91 72754 78585",
  whatsapp: "+917275478585",
  email: "dentalclinic@gmail.com",
  address: "Metro Pillar 148, Main Rohtak Road, Inderlok, Near Inderlok Metro Station (Red & Green Line Interchange), Delhi - 110035",
  shortAddress: "Inderlok Near Metro Station, Delhi",
  timing: "Monday to Saturday: 9:00 PM – 6:00 AM",
  timingSub: "Exclusive Night Clinic & 24/7 Dental Emergency Care",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.548074900654!2d77.16643207632662!3d28.673236775641775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d025178d8a7c5%3A0xa144dca0174e304f!2sInderlok%20Metro%20Station!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Inderlok+Metro+Station+Delhi",
  openingOffer: {
    badge: "🎉 GRAND OPENING CELEBRATION",
    discount: "FLAT 30% OFF",
    title: "Special Grand Opening at Inderlok Branch",
    perk: "Complimentary 3D Intra-Oral Digital Scan & Smile Consultation (Worth ₹1,500 FREE)",
    code: "NEWIND30"
  }
};

export const SERVICES = [
  {
    id: "implants",
    title: "Single-Day Dental Implants",
    category: "Restorative",
    shortDesc: "Permanent, bio-compatible German titanium implants that look and function like original teeth.",
    longDesc: "Restore your bite with 3D guided implant surgery. Using computer-guided precision, we deliver same-day temporary crowns with zero bone trauma and lifetime warranty.",
    time: "45 - 60 mins",
    price: "₹18,999*",
    icon: "ShieldCheck",
    popular: true,
    features: ["Lifetime Titanium Warranty", "Same-Day Tooth Loading", "100% Painless Anesthesia", "CBCT 3D Guided"]
  },
  {
    id: "aligners",
    title: "Invisible Clear Aligners",
    category: "Orthodontics",
    shortDesc: "Discreet, custom-molded transparent trays to straighten teeth without metallic wires or brackets.",
    longDesc: "AI-calculated biomechanics straighten your teeth seamlessly in as little as 6 to 9 months. Removable for eating and socializing with zero dietary restrictions.",
    time: "Every 2 Weeks",
    price: "₹34,999*",
    icon: "Sparkles",
    popular: true,
    features: ["Virtually Invisible", "Removable Trays", "AI 3D Smile Simulator", "Zero Food Restrictions"]
  },
  {
    id: "whitening",
    title: "Laser Teeth Whitening",
    category: "Cosmetics",
    shortDesc: "Gentle cold-light laser system lifting deep coffee, tea, and tobacco stains by 6-8 shades.",
    longDesc: "Medical-grade hydrogen peroxide activated by targeted blue laser wavelength safely oxidizes yellow stains without eroding protective enamel or causing prolonged sensitivity.",
    time: "45 mins",
    price: "₹4,999*",
    icon: "Sun",
    popular: true,
    features: ["Up to 8 Shades Whiter", "Zero Enamel Harm", "Includes Desensitizing Therapy", "Instant Red Carpet Results"]
  },
  {
    id: "rct",
    title: "Painless Single-Visit RCT",
    category: "Endodontics",
    shortDesc: "Advanced rotary microscopic root canal treatment designed to save infected teeth without pain.",
    longDesc: "Say goodbye to dental anxiety. Microscopic apex locators ensure complete bacterial debridement with rubber dam isolation, followed by laser disinfection and bio-ceramic seal.",
    time: "40 mins",
    price: "₹3,499*",
    icon: "Zap",
    popular: false,
    features: ["Single Sitting Procedure", "Rotary Micro-Endodontics", "Laser Disinfection", "High-Strength Zirconia Crown"]
  },
  {
    id: "veneers",
    title: "Hollywood Porcelain Veneers",
    category: "Cosmetics",
    shortDesc: "Ultra-thin, handcrafted ceramic laminates designed to correct gaps, chips, and discolorations.",
    longDesc: "Custom designed by elite master ceramists. E-Max and feldspathic porcelain shells bond microscopically to tooth surfaces for symmetrical, everlasting brilliance.",
    time: "2 Sessions",
    price: "₹8,500/tooth",
    icon: "Gem",
    popular: false,
    features: ["0.3mm Ultra-Thin Prep", "Natural Light Translucency", "Stain Resistant Surface", "Custom Digital Wax-up"]
  },
  {
    id: "emergency",
    title: "24/7 Night Dental Emergency",
    category: "Emergency",
    shortDesc: "Instant acute relief for severe toothaches, broken teeth, bleeding gums, and nocturnal trauma.",
    longDesc: "Dental emergencies don't wait for business hours. AuraDent's specialized night team (9 PM - 6 AM) provides immediate pain blocks, abscess drainage, and stabilization.",
    time: "Immediate Walk-In",
    price: "₹999*",
    icon: "Clock",
    popular: true,
    features: ["Open 9 PM to 6 AM", "Emergency Pain Blocks", "Tooth Re-implantation", "Post-trauma Stabilization"]
  },
  {
    id: "pediatric",
    title: "Gentle Pediatric / Kids Care",
    category: "Kids Care",
    shortDesc: "Fear-free, cheerful dental checkups, cavity fillings, pit-fissure sealants, and fluoride therapy.",
    longDesc: "Our gentle pediatric dentists turn clinic visits into fun adventures. Child-friendly jargon, painless numbing gels, and joyful interactive education safeguard young smiles.",
    time: "30 mins",
    price: "₹1,200*",
    icon: "HeartHandshake",
    popular: false,
    features: ["Child Psychologist Approved", "Painless Topical Gels", "Fluoride Cavity Shields", "Cartoon Entertainment"]
  },
  {
    id: "cleaning",
    title: "Ultrasonic Scaling & Air Polish",
    category: "Preventive",
    shortDesc: "Deep periodontal calculus removal and stain blasting with gentle micro-vibrations.",
    longDesc: "Eliminate stubborn tartar, bad breath, and bleeding gums. Micro-fine ultrasonic waves dissolve mineral deposits without scratching enamel, followed by prophylactic air-flow polish.",
    time: "30 mins",
    price: "₹1,499*",
    icon: "Activity",
    popular: false,
    features: ["Tartar & Plaque Eradication", "Air-Flow Polish Finishing", "Breath Freshening Therapy", "Free Gum Health Chart"]
  }
];

export const DOCTORS = [
  {
    id: "doc1",
    name: "Dr. Sameer Mehra",
    degrees: "MDS - Prosthodontics & Oral Implantology",
    experience: "15+ Years Experience",
    speciality: "Senior Implantologist & Smile Architect",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    badge: "Chief Surgeon",
    rating: 4.98,
    reviewsCount: 420
  },
  {
    id: "doc2",
    name: "Dr. Rhea Singhania",
    degrees: "MDS - Orthodontics & Dentofacial Orthopedics",
    experience: "12+ Years Experience",
    speciality: "Invisalign Certified Diamond Provider",
    image: "https://images.unsplash.com/photo-1594824813511-401d418e9508?auto=format&fit=crop&w=600&q=80",
    badge: "Aligner Specialist",
    rating: 4.95,
    reviewsCount: 310
  },
  {
    id: "doc3",
    name: "Dr. Anirudh Varma",
    degrees: "MDS - Conservative Dentistry & Endodontics",
    experience: "9+ Years Experience",
    speciality: "Microscopic Painless RCT Specialist",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
    badge: "Night Emergency Lead",
    rating: 4.97,
    reviewsCount: 280
  },
  {
    id: "doc4",
    name: "Dr. Pooja Chawla",
    degrees: "BDS, MDS - Pedodontics (Child Dentistry)",
    experience: "8+ Years Experience",
    speciality: "Gentle Pediatric Smile Care",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    badge: "Kids Specialist",
    rating: 4.99,
    reviewsCount: 195
  }
];

export const BEFORE_AFTER_CASES = [
  {
    title: "Full Hollywood Laser Whitening",
    category: "Laser Whitening",
    patient: "Aman K., Model & Anchor (Delhi)",
    beforeImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
    details: "Severe tea/coffee discoloration cleared in 1 single 45-min cold laser session. 8 shades brighter."
  },
  {
    title: "Discreet Clear Aligner Correction",
    category: "Invisible Aligners",
    patient: "Priya S., Software Engineer (Rohini)",
    beforeImg: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80",
    details: "Corrected front teeth spacing and midline shift in 7 months without metal brackets."
  },
  {
    title: "Zirconia Implants Front Restoration",
    category: "Dental Implants",
    patient: "Rajesh G., Businessman (Karol Bagh)",
    beforeImg: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    details: "Restored fractured front teeth with 3D guided computer-engineered titanium implants."
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Vikram Malhotra",
    location: "Inderlok, Delhi",
    rating: 5,
    date: "2 days ago",
    treatment: "Night Emergency Toothache & RCT",
    comment: "I had excruciating tooth pain at 11:30 PM on a Tuesday. Almost no clinic was open until I found AuraDent right near Inderlok Metro! Dr. Anirudh gave immediate anesthesia and did painless RCT. Incredible facility and life-saving night service!",
    verified: true
  },
  {
    id: 2,
    name: "Neha Aggarwal",
    location: "Shastri Nagar, Delhi",
    rating: 5,
    date: "1 week ago",
    treatment: "Invisible Clear Aligners",
    comment: "The 3D scanning technology blew my mind. They showed me exactly how my teeth will look after 6 months before starting! Dr. Rhea is so patient and professional. Best clinic in North Delhi.",
    verified: true
  },
  {
    id: 3,
    name: "Suraj Prakash",
    location: "Karol Bagh, Delhi",
    rating: 5,
    date: "2 weeks ago",
    treatment: "Dual Dental Implants",
    comment: "I was terrified of implant surgery. But Dr. Sameer made it feel like a breeze. Absolutely zero pain during the procedure, and the new teeth feel 100% natural. 10/10 clinic atmosphere!",
    verified: true
  },
  {
    id: 4,
    name: "Simran Kaur",
    location: "Punjabi Bagh, Delhi",
    rating: 5,
    date: "3 weeks ago",
    treatment: "Laser Teeth Whitening",
    comment: "Got teeth whitening done for my brother's wedding. The difference was stunning — instant 7 shades brighter without any tooth sensitivity! Super clean sky-blue themed luxury lounge.",
    verified: true
  }
];

export const FAQS = [
  {
    q: "Why does AuraDent operate from 9:00 PM to 6:00 AM?",
    a: "We understand that working professionals, corporate executives, and students in Delhi struggle to visit dental clinics during busy day hours. Furthermore, severe toothaches and dental emergencies notoriously flare up at night. Our clinic provides world-class treatment during flexible night hours alongside 24/7 urgent trauma care."
  },
  {
    q: "How close is the clinic to Inderlok Metro Station?",
    a: "We are located right opposite Metro Pillar 148, just a 2-minute walk from Inderlok Metro Station (which serves both the Red and Green lines). Dedicated patient valet parking is also available."
  },
  {
    q: "Are the procedures truly 100% painless?",
    a: "Yes! We employ computer-assisted anesthesia delivery (The Wand®), topical pre-numbing gels, and microscopic rotary instrumentation. You will barely feel even a pinprick."
  },
  {
    q: "Can I avail the Grand Opening 30% discount?",
    a: "Absolutely! All new patients booking through our website or calling +91 7275478585 automatically receive 30% off treatment procedures and a complimentary ₹1,500 3D digital oral scan during our opening month."
  },
  {
    q: "Do you accept health insurance and 0% EMI options?",
    a: "Yes, we offer instant cashless mediclaim assistance for surgical/trauma procedures and tie-ups with Bajaj Finserv & CarePay for 0% interest monthly EMIs on Aligners and Implants."
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: "AUR-9102",
    patientName: "Gaurav Chawla",
    phone: "+91 98112 45890",
    email: "gaurav.c@gmail.com",
    service: "Single-Day Dental Implants",
    doctor: "Dr. Sameer Mehra",
    date: "2026-11-23",
    time: "10:30 PM",
    address: "Inderlok, Delhi",
    symptoms: "Missing lower molar, needs permanent replacement",
    status: "Confirmed",
    createdAt: "2026-11-21 21:15"
  },
  {
    id: "AUR-9103",
    patientName: "Meenakshi Joshi",
    phone: "+91 99581 23412",
    email: "meenakshi.j@outlook.com",
    service: "Invisible Clear Aligners",
    doctor: "Dr. Rhea Singhania",
    date: "2026-11-23",
    time: "11:30 PM",
    address: "Rohini Sector 9, Delhi",
    symptoms: "Upper teeth crowding, wants invisible braces consultation",
    status: "Pending",
    createdAt: "2026-11-21 22:40"
  },
  {
    id: "AUR-9104",
    patientName: "Harshit Verma",
    phone: "+91 88004 12399",
    email: "harshitv@gmail.com",
    service: "24/7 Night Dental Emergency",
    doctor: "Dr. Anirudh Varma",
    date: "2026-11-22",
    time: "01:00 AM",
    address: "Pitampura, Delhi",
    symptoms: "Acute throbbing pain in upper left wisdom tooth",
    status: "Completed",
    createdAt: "2026-11-21 19:30"
  },
  {
    id: "AUR-9105",
    patientName: "Sunita Roy",
    phone: "+91 98734 56123",
    email: "sunitaproy@yahoo.com",
    service: "Laser Teeth Whitening",
    doctor: "Dr. Sameer Mehra",
    date: "2026-11-24",
    time: "09:30 PM",
    address: "Karol Bagh, Delhi",
    symptoms: "Teeth yellowing before family anniversary",
    status: "Confirmed",
    createdAt: "2026-11-21 23:10"
  }
];
