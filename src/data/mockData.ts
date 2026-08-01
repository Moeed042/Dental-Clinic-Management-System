import { ServiceItem, TransformationItem, Doctor, Testimonial, FAQItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'general-checkup',
    title: 'General Checkups & Cleaning',
    icon: 'Stethoscope',
    shortDesc: 'Comprehensive oral examination, digital X-rays, ultrasonic scaling, and personalized preventive care.',
    fullDesc: 'Regular checkups are the foundation of long-term dental health. Our thorough exam includes digital diagnostic scans, oral cancer screening, gentle ultrasonic tartar removal, enamel polishing, and custom hygiene guidance.',
    duration: '45 - 60 min',
    priceRange: '$95 - $180 (Covered by most insurance)',
    features: [
      'Low-radiation 3D digital X-rays',
      'Painless ultrasonic plaque & tartar removal',
      'Comprehensive periodontal pocket check',
      'Oral cancer screening included'
    ],
    popular: true
  },
  {
    id: 'teeth-whitening',
    title: 'Laser Teeth Whitening',
    icon: 'Sparkles',
    shortDesc: 'In-office professional whitening that brightens your smile by up to 8 shades in just 60 minutes.',
    fullDesc: 'Transform dull or stained teeth safely under specialist supervision. Using cold-light laser activation with medical-grade peroxide gel, we lift deep enamel stains from coffee, tea, and red wine without sensitivity.',
    duration: '60 min',
    priceRange: '$299 - $450',
    features: [
      'Lifts stains by 6 to 8 shades',
      'Desensitizing fluoride coating applied',
      'Includes custom take-home touch-up kit',
      'Long-lasting results up to 24 months'
    ],
    popular: true
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    icon: 'ShieldAlert',
    shortDesc: 'Gentle, pain-free endodontic care to save damaged teeth and eliminate severe nerve discomfort.',
    fullDesc: 'Modern root canal treatment is completely comfortable with micro-endodontic technology. We clean the infected pulp tissue inside the root canal, seal it with biocompatible material, and restore strength with a ceramic crown.',
    duration: '60 - 90 min',
    priceRange: '$650 - $1,100',
    features: [
      'Pain-free computerized local anesthesia',
      'Precision rotary microscopic cleaning',
      'Preserves your natural tooth structure',
      'Same-day emergency pain relief available'
    ]
  },
  {
    id: 'aligners-braces',
    title: 'Braces & Clear Aligners',
    icon: 'Smile',
    shortDesc: 'Invisible Invisalign® aligners and ceramic braces to straighten teeth discreetly and comfortably.',
    fullDesc: 'Achieve a symmetrical smile without metal brackets. Using 3D intraoral scanners, we map your tooth movement step-by-step and craft custom clear aligners that gradually align your teeth in 6 to 14 months.',
    duration: '15 - 30 min check-ins',
    priceRange: '$2,800 - $4,900 (Flexible monthly plans)',
    features: [
      '100% removable clear trays',
      '3D digital smile simulation preview',
      'No dietary restrictions',
      'Fewer office visits required'
    ],
    popular: true
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants & Crowns',
    icon: 'Crown',
    shortDesc: 'Permanent, natural-looking titanium implants that restore missing teeth with lifetime durability.',
    fullDesc: 'The gold standard for missing teeth replacement. A biocompatible titanium root fuses with your jawbone, topped with a custom-crafted zirconia crown that matches your natural teeth seamlessly in color and function.',
    duration: '2 - 3 visits over 3-6 months',
    priceRange: '$1,500 - $3,200 per implant',
    features: [
      'Mimics natural root function & jaw strength',
      '98.5% success rate over lifetime',
      'Prevents bone loss & facial sagging',
      'Custom color-matched ceramic crown'
    ]
  },
  {
    id: 'emergency-care',
    title: '24/7 Emergency Care',
    icon: 'Zap',
    shortDesc: 'Immediate, same-day relief for acute toothaches, chipped teeth, lost fillings, or trauma.',
    fullDesc: 'Dental emergencies need rapid intervention. We keep priority daily slots open for emergency walk-ins and phone calls. Get instant pain control, trauma care, and temporary/permanent repair immediately.',
    duration: '30 - 60 min',
    priceRange: 'Emergency exam from $75',
    features: [
      'Same-day priority appointment guarantee',
      'Direct line to emergency dental surgeon',
      'Instant pain management protocol',
      'On-site digital X-rays & emergency lab'
    ]
  }
];

export const TRANSFORMATIONS_DATA: TransformationItem[] = [
  {
    id: 't-whitening',
    title: 'Laser Smile Whitening',
    category: 'whitening',
    sessions: '1 Session (60 Mins)',
    timeframe: 'Immediate',
    patientAge: '32 years',
    description: 'Removed 8 shades of deep tobacco and coffee staining, leaving a natural, radiant porcelain shine.',
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    details: [
      'Stain removal grade: 8 shades brighter',
      'Zero sensitivity enamel treatment',
      'Custom home touch-up trays included'
    ]
  },
  {
    id: 't-aligners',
    title: 'Clear Invisalign Aligners',
    category: 'aligners',
    sessions: '14 Aligners',
    timeframe: '9 Months',
    patientAge: '28 years',
    description: 'Corrected severe anterior crowding and midline offset for a harmonious, symmetrical smile arc.',
    beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800',
    details: [
      '3D digital iTero scanning without gooey molds',
      'Corrected overbite & overcrowding',
      'Invisible, comfortable daily wear'
    ]
  },
  {
    id: 't-veneers',
    title: 'Porcelain Smile Makeover',
    category: 'veneers',
    sessions: '2 Visits',
    timeframe: '2 Weeks',
    patientAge: '36 years',
    description: 'Custom ultra-thin E.max porcelain veneers placed over chipped, unevenly sized front incisors.',
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    details: [
      'Handcrafted ceramic layered porcelain',
      'Minimal tooth preparation',
      'Stain-proof ceramic surface guarantee'
    ]
  },
  {
    id: 't-implants',
    title: 'Full Molar Implant Restoration',
    category: 'implants',
    sessions: '3 Visits',
    timeframe: '4 Months',
    patientAge: '45 years',
    description: 'Replaced a missing upper molar with a titanium implant screw and color-matched zirconia crown.',
    beforeImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    details: [
      '3D guided surgical placement',
      'Restored full bite force capability',
      'Blends imperceptibly with adjacent teeth'
    ]
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins, DDS',
    role: 'Lead Cosmetic & Restorative Dentist',
    specialty: 'Smile Design, Veneers, Whitening',
    experience: '14+ Years Experience',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    bio: 'Graduate of Columbia University School of Dental Medicine. Dr. Jenkins specializes in painless smile design and minimally invasive cosmetic transformations.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Marcus Vance, DMD',
    role: 'Specialist Implant Surgeon & Periodontist',
    specialty: 'Dental Implants, Bone Grafting, Oral Surgery',
    experience: '18+ Years Experience',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    bio: 'Board-certified implant specialist trained at Harvard Dental School. Dr. Vance has successfully performed over 4,500 implant placements with a 99% success rate.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Elena Rostova, DDS',
    role: 'Orthodontist & Pediatric Specialist',
    specialty: 'Invisalign®, Braces, Early Orthodontics',
    experience: '10+ Years Experience',
    image: 'https://images.unsplash.com/photo-1594824813566-78a946320093?auto=format&fit=crop&q=80&w=600',
    bio: 'Passionate about gentle orthodontics for kids and adults alike. Dr. Rostova holds Diamond Invisalign Provider status.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Emily Watson',
    rating: 5,
    treatment: 'Porcelain Veneers',
    date: '2 weeks ago',
    comment: 'I used to hide my smile in photos for years. Dr. Jenkins and the team completely transformed my confidence with 6 front veneers. The procedure was totally pain-free and looks so natural!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Michael Chang',
    rating: 5,
    treatment: 'Laser Teeth Whitening',
    date: '1 month ago',
    comment: 'Booked an appointment before my wedding. In just one 60-minute session my teeth were dramatically whiter! The staff was incredibly warm and attentive.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'test-3',
    name: 'David Reynolds',
    rating: 5,
    treatment: 'Dental Implant',
    date: '2 months ago',
    comment: 'Dr. Vance fixed a missing tooth I lost in a sports accident. The 3D scan and surgical placement were quick and smooth. I can chew normally again with zero discomfort!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'test-4',
    name: 'Sophia Martinez',
    rating: 5,
    treatment: 'Invisalign Aligners',
    date: '3 weeks ago',
    comment: 'The 3D smile preview was spot-on. Completed my aligner treatment in 8 months. Flexible monthly payments made it so affordable.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Are dental treatments at Dental Clinic painful?',
    answer: 'Not at all! We prioritize gentle, anxiety-free dentistry. We utilize computer-assisted micro-anesthesia, needle-free laser treatments, and optional light sedation. Most patients report feeling minimal to no discomfort during procedures.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'How often should I get a dental checkup and cleaning?',
    answer: 'The American Dental Association recommends a professional checkup and scaling every 6 months. Regular cleanings prevent hidden plaque buildup, gum disease, and early tooth decay.',
    category: 'general'
  },
  {
    id: 'faq-3',
    question: 'Do you accept my dental insurance plan?',
    answer: 'We accept most major dental insurance providers including Delta Dental, Cigna, Aetna, MetLife, Guardian, and Humana. Our front office handles direct claims submission for you.',
    category: 'insurance'
  },
  {
    id: 'faq-4',
    question: 'What should I do if I experience a dental emergency?',
    answer: 'Call our direct emergency line at (555) 234-5678 immediately. We reserve dedicated same-day emergency slots every day for severe toothaches, broken teeth, or knocked-out teeth.',
    category: 'treatments'
  },
  {
    id: 'faq-5',
    question: 'How long does laser teeth whitening last?',
    answer: 'With proper oral hygiene and avoiding heavy staining foods/drinks, professional laser whitening results typically last 12 to 24 months. We also provide a custom touch-up tray for easy home maintenance.',
    category: 'treatments'
  },
  {
    id: 'faq-6',
    question: 'Do you offer flexible payment or financing plans?',
    answer: 'Yes! We offer 0% APR financing options through CareCredit and monthly payment arrangements for major procedures like aligners, implants, and veneers.',
    category: 'insurance'
  }
];

export const CLINIC_INFO = {
  name: 'Dental Clinic',
  tagline: 'Your Smile, Our Priority',
  address: '123 Healthcare Blvd, Suite 400, Medical District, NY 10001',
  phone: '(555) 234-5678',
  emergencyPhone: '(555) 999-DENT',
  email: 'care@dentalclinic.com',
  hours: [
    { days: 'Monday - Friday', time: '8:00 AM - 7:00 PM' },
    { days: 'Saturday', time: '9:00 AM - 3:00 PM' },
    { days: 'Sunday', time: 'Emergency On-Call Only' }
  ],
  stats: [
    { label: 'Years of Excellence', value: '15+' },
    { label: 'Smiles Transformed', value: '12,500+' },
    { label: 'Patient Rating', value: '4.9/5★' },
    { label: 'Insurances Accepted', value: '30+' }
  ]
};
