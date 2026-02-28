export type DemoTemple = {
  id: string;
  name: string;
  location: string;
  description?: string | null;
};

export type DemoPuja = {
  id: string;
  name: string;
  deity: string;
  price: number;
  duration?: string | null;
  benefits?: string | null;
  description?: string | null;
  preparation_instructions?: string | null;
  category?: string | null;
  is_featured?: boolean;
  temples?: DemoTemple | null;
};

export const demoTemples: DemoTemple[] = [
  {
    id: "somnath-gujarat",
    name: "Somnath Mahadev Temple",
    location: "Veraval, Gujarat",
    description: "One of the twelve sacred Jyotirlingas dedicated to Lord Shiva on the Arabian Sea coast.",
  },
  {
    id: "vindhyavasini-up",
    name: "Vindhyavasini Devi Temple",
    location: "Mirzapur, Uttar Pradesh",
    description: "Revered Shaktipeeth of Maa Vindhyavasini, visited by devotees throughout the year.",
  },
  {
    id: "tirupati-ap",
    name: "Sri Venkateswara Temple",
    location: "Tirumala, Andhra Pradesh",
    description: "Famous hill temple dedicated to Lord Venkateswara, known as the abode of Balaji.",
  },
  {
    id: "puri-jagannath",
    name: "Shri Jagannath Temple",
    location: "Puri, Odisha",
    description: "Historic coastal temple of Lord Jagannath, Balabhadra and Subhadra, known for the Rath Yatra.",
  },
  {
    id: "mahakaleshwar-mp",
    name: "Mahakaleshwar Jyotirlinga",
    location: "Ujjain, Madhya Pradesh",
    description: "Ancient riverside temple and one of the most prominent Jyotirlingas of Lord Shiva.",
  },
  {
    id: "kashi-vishwanath-up",
    name: "Shri Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    description: "Iconic Shiva temple situated on the banks of the Ganga in Kashi.",
  },
];

export const demoPujas: DemoPuja[] = [
  {
    id: "ganesh-sukh-shanti",
    name: "Shri Ganesh Sukh Shanti Puja",
    deity: "Shri Ganesh",
    price: 1100,
    duration: "60–90 minutes",
    category: "Prosperity",
    is_featured: true,
    benefits: "Helps remove obstacles and invites auspicious beginnings for your family and work.",
    temples: {
      id: "ganesh-mandir-pune",
      name: "Shri Ganesh Mandir",
      location: "Pune, Maharashtra",
    },
  },
  {
    id: "mahalakshmi-dhan-labh",
    name: "Mahalakshmi Dhan Labh Puja",
    deity: "Maa Mahalakshmi",
    price: 2100,
    duration: "90–120 minutes",
    category: "Wealth",
    is_featured: true,
    benefits: "Prayers for abundance, stability, and financial well-being.",
    temples: {
      id: "mahalakshmi-mandir-mumbai",
      name: "Mahalakshmi Mandir",
      location: "Mumbai, Maharashtra",
    },
  },
  {
    id: "mahamrityunjay-arogya",
    name: "Mahamrityunjay Arogya Anushthan",
    deity: "Lord Shiva",
    price: 2500,
    duration: "2–3 hours",
    category: "Health",
    is_featured: true,
    benefits: "Chanting and sankalp for wellness, protection, and inner strength.",
    temples: {
      id: "mahakaleshwar-mp",
      name: "Mahakaleshwar Jyotirlinga",
      location: "Ujjain, Madhya Pradesh",
    },
  },
  {
    id: "narayan-shanti-path",
    name: "Shri Satyanarayan Shanti Path",
    deity: "Lord Vishnu",
    price: 900,
    duration: "60 minutes",
    category: "Family",
    is_featured: false,
    benefits: "A peaceful path for harmony, gratitude, and blessings at home.",
    temples: {
      id: "narayan-temple-delhi",
      name: "Shri Narayan Mandir",
      location: "New Delhi, Delhi",
    },
  },
];

