import { Fundi, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "Droplets",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/449c7223-a874-4394-9bd4-f0b311cb6398/category-plumbing-ecc52e4b-1779207988069.webp",
    services: [
      { name: "Pipe repair & replacement" },
      { name: "Leak detection" },
      { name: "Toilet & Sink installation" },
      { name: "Water heater repair" },
      { name: "Drain & Sewer cleaning" },
      { name: "Shower head replacement" }
    ]
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "Zap",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/449c7223-a874-4394-9bd4-f0b311cb6398/hero-fundi-1-e93f9293-1779207987990.webp",
    services: [
      { name: "House wiring" },
      { name: "Socket & Switch installation" },
      { name: "Fuse box & Circuit breaker repair" },
      { name: "Lighting installation" },
      { name: "Generator maintenance" },
      { name: "Solar panel installation" }
    ]
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: "Hammer",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/449c7223-a874-4394-9bd4-f0b311cb6398/category-carpentry-e485d9ac-1779207988704.webp",
    services: [
      { name: "Furniture repair & assembly" },
      { name: "Door & Window installation" },
      { name: "Kitchen cabinet making" },
      { name: "Wardrobe construction" },
      { name: "Wood polishing & varnishing" },
      { name: "Roof truss installation" }
    ]
  },
  {
    id: "masonry",
    name: "Masonry",
    icon: "BrickWall",
    image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?w=800&auto=format&fit=crop",
    services: [
      { name: "Wall construction (Brick/Block)" },
      { name: "House plastering" },
      { name: "Foundation work" },
      { name: "Concrete mixing & pouring" },
      { name: "Chimney repair" },
      { name: "Compound wall fencing" }
    ]
  },
  {
    id: "painting",
    name: "Painting",
    icon: "Paintbrush",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/449c7223-a874-4394-9bd4-f0b311cb6398/category-painting-472fe6ec-1779207988330.webp",
    services: [
      { name: "Interior house painting" },
      { name: "Exterior wall painting" },
      { name: "Ceiling & Cornice painting" },
      { name: "Decorative wall texturing" },
      { name: "Gate & Metal painting" },
      { name: "Wood staining" }
    ]
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?w=800&auto=format&fit=crop",
    services: [
      { name: "Regular house cleaning" },
      { name: "Deep cleaning" },
      { name: "Office & Commercial cleaning" },
      { name: "Post-construction cleaning" },
      { name: "Carpet & Sofa cleaning" },
      { name: "Window cleaning" }
    ]
  },
  {
    id: "appliances",
    name: "Appliances",
    icon: "Monitor",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop",
    services: [
      { name: "Refrigerator repair" },
      { name: "Washing machine repair" },
      { name: "TV & Home theater repair" },
      { name: "Microwave & Cooker repair" },
      { name: "AC installation & service" },
      { name: "Dishwasher repair" }
    ]
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "Bug",
    image: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800&auto=format&fit=crop",
    services: [
      { name: "Bedbug treatment" },
      { name: "Cockroach extermination" },
      { name: "Termite control" },
      { name: "Rat & Rodent baiting" },
      { name: "Mosquito fumigation" },
      { name: "Snake repellent services" }
    ]
  },
  {
    id: "gardening",
    name: "Gardening",
    icon: "Leaf",
    image: "https://images.unsplash.com/photo-1558905758-2f0ca373c09b?w=800&auto=format&fit=crop",
    services: [
      { name: "Lawn mowing & edging" },
      { name: "Tree pruning & trimming" },
      { name: "Flower bed design" },
      { name: "Sprinkler system installation" },
      { name: "Organic manure application" },
      { name: "Hedge trimming" }
    ]
  },
  {
    id: "tiling",
    name: "Tiling",
    icon: "Grid",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&auto=format&fit=crop",
    services: [
      { name: "Floor tiling (Ceramic/Porcelain)" },
      { name: "Wall tiling (Bathroom/Kitchen)" },
      { name: "Grout cleaning & repair" },
      { name: "Marble & Granite installation" },
      { name: "Outdoor paving tiles" },
      { name: "Backsplash installation" }
    ]
  },
  {
    id: "security",
    name: "Security Systems",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1557597774-9d2739f85a94?w=800&auto=format&fit=crop",
    services: [
      { name: "CCTV camera installation" },
      { name: "Electric fence repair" },
      { name: "Alarm system setup" },
      { name: "Biometric access control" },
      { name: "Intercom installation" },
      { name: "Gate automation" }
    ]
  },
  {
    id: "moving",
    name: "Moving Services",
    icon: "Truck",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop",
    services: [
      { name: "House moving (Local/Long distance)" },
      { name: "Office relocation" },
      { name: "Packing & Unpacking services" },
      { name: "Furniture dismantling" },
      { name: "Loader services" },
      { name: "Piano & Delicate item moving" }
    ]
  },
  {
    id: "roofing-ceiling",
    name: "Roofing & Ceiling",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&auto=format&fit=crop",
    description: "Transform your property with our expert Roofing & Ceiling services, designed to enhance both aesthetics and functionality. Our skilled team ensures durable, high-quality installations and repairs, providing peace of mind and long-lasting protection against the elements. Elevate your space with stylish designs that not only improve energy efficiency but also increase your property's value.",
    services: [
      {
        name: "Roof Repair",
        description: "Protect your home with our expert Roof Repair service, designed to restore the integrity of your roofing system and prevent leaks.",
        action: "Request Service"
      },
      {
        name: "Ceiling Installation",
        description: "Transform your space with our expert Ceiling Installation service, designed to enhance the aesthetics and value of your property.",
        action: "Request Service"
      },
      {
        name: "Waterproofing",
        description: "Protect your property from water damage with our expert waterproofing services. Our advanced solutions ensure long-lasting protection.",
        action: "Request Service"
      }
    ]
  }
];

export const INITIAL_FUNDIS: Fundi[] = [
  {
    id: 'f1',
    name: 'John Kamau',
    email: 'john@example.com',
    phone: '0712345678',
    role: 'fundi',
    location: 'Westlands, Nairobi',
    isRegistered: true,
    subscription: 'standard',
    category: 'plumbing',
    skills: ['Pipe repair', 'Toilet installation', 'Water heaters'],
    rating: 4.8,
    jobCount: 156,
    isVerified: true,
    hourlyRate: 800,
    availability: true,
    trustedBadge: true,
    walletBalance: 4500
  },
  {
    id: 'f2',
    name: 'Sarah Wambui',
    email: 'sarah@example.com',
    phone: '0722334455',
    role: 'fundi',
    location: 'Kilimani, Nairobi',
    isRegistered: true,
    subscription: 'premium',
    category: 'electrical',
    skills: ['Wiring', 'Circuit breakers', 'Lighting'],
    rating: 4.9,
    jobCount: 203,
    isVerified: true,
    hourlyRate: 1000,
    availability: true,
    trustedBadge: true,
    walletBalance: 12000
  },
  {
    id: 'f3',
    name: 'David Otieno',
    email: 'david@example.com',
    phone: '0733445566',
    role: 'fundi',
    location: 'South B, Nairobi',
    isRegistered: true,
    subscription: 'basic',
    category: 'carpentry',
    skills: ['Furniture repair', 'Door fitting'],
    rating: 4.5,
    jobCount: 89,
    isVerified: true,
    hourlyRate: 700,
    availability: true,
    trustedBadge: false,
    walletBalance: 2100
  },
  {
    id: 'f4',
    name: 'Alice Muthoni',
    email: 'alice@example.com',
    phone: '0744556677',
    role: 'fundi',
    location: 'Nairobi West, Nairobi',
    isRegistered: true,
    subscription: 'premium',
    category: 'cleaning',
    skills: ['Deep cleaning', 'Carpet cleaning'],
    rating: 4.7,
    jobCount: 120,
    isVerified: true,
    hourlyRate: 600,
    availability: true,
    trustedBadge: true,
    walletBalance: 3200
  },
  {
    id: 'f5',
    name: 'Peter Mwangi',
    email: 'peter@example.com',
    phone: '0755667788',
    role: 'fundi',
    location: 'Kasarani, Nairobi',
    isRegistered: true,
    subscription: 'standard',
    category: 'masonry',
    skills: ['Brickwork', 'Plastering'],
    rating: 4.6,
    jobCount: 75,
    isVerified: true,
    hourlyRate: 900,
    availability: true,
    trustedBadge: false,
    walletBalance: 1500
  },
  {
    id: 'f6',
    name: 'Grace Wanjiru',
    email: 'grace@example.com',
    phone: '0766778899',
    role: 'fundi',
    location: 'Syokimau, Nairobi',
    isRegistered: true,
    subscription: 'standard',
    category: 'pest-control',
    skills: ['Bedbug treatment', 'Fumigation'],
    rating: 4.8,
    jobCount: 45,
    isVerified: true,
    hourlyRate: 1200,
    availability: true,
    trustedBadge: true,
    walletBalance: 8500
  },
  {
    id: 'f7',
    name: 'Samuel Kiprop',
    email: 'samuel@example.com',
    phone: '0777889900',
    role: 'fundi',
    location: 'Langata, Nairobi',
    isRegistered: true,
    subscription: 'basic',
    category: 'gardening',
    skills: ['Lawn mowing', 'Landscaping'],
    rating: 4.4,
    jobCount: 32,
    isVerified: true,
    hourlyRate: 500,
    availability: true,
    trustedBadge: false,
    walletBalance: 2200
  },
  {
    id: 'f8',
    name: 'Mercy Achieng',
    email: 'mercy@example.com',
    phone: '0788990011',
    role: 'fundi',
    location: 'Karen, Nairobi',
    isRegistered: true,
    subscription: 'premium',
    category: 'security',
    skills: ['CCTV installation', 'Alarm systems'],
    rating: 4.9,
    jobCount: 67,
    isVerified: true,
    hourlyRate: 1500,
    availability: true,
    trustedBadge: true,
    walletBalance: 15000
  },
  {
    id: 'f9',
    name: 'Kevin Omondi',
    email: 'kevin@example.com',
    phone: '0799001122',
    role: 'fundi',
    location: 'Runda, Nairobi',
    isRegistered: true,
    subscription: 'premium',
    category: 'roofing-ceiling',
    skills: ['Roof repair', 'Ceiling installation', 'Waterproofing'],
    rating: 4.8,
    jobCount: 42,
    isVerified: true,
    hourlyRate: 1200,
    availability: true,
    trustedBadge: true,
    walletBalance: 9000
  }
];