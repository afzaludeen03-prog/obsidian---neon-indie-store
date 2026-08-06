import { Game } from "../types";

export const GAMES_DATA: Game[] = [
  {
    id: "neon-syndicate",
    title: "Neon Syndicate",
    category: "Cyberpunk",
    tags: ["Cyberpunk", "Action", "Ray-Tracing"],
    price: 299,
    originalPrice: 499,
    discount: "-40%",
    rating: 4.9,
    developer: "VoidWorks Studio",
    releaseDate: "Feb 14, 2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    description: "Hyper-visceral cyberpunk combat simulator redefining the indie landscape with real-time Ray-Tracing, neural implants, and deep narrative choices.",
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 11 (64-bit)",
        cpu: "Intel Core i5-10400F / AMD Ryzen 5 3600",
        ram: "16 GB RAM",
        gpu: "NVIDIA GeForce RTX 2060 / AMD Radeon RX 5600 XT",
        storage: "45 GB SSD"
      },
      recommended: {
        os: "Windows 11 (64-bit)",
        cpu: "Intel Core i7-12700K / AMD Ryzen 7 5800X3D",
        ram: "32 GB RAM",
        gpu: "NVIDIA GeForce RTX 4070 / AMD Radeon RX 7800 XT",
        storage: "45 GB NVMe SSD"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r1", user: "Kaelen_V", rating: 5, comment: "The lighting and combat responsiveness are unmatched in any indie title this year.", date: "Aug 1, 2026" },
      { id: "r2", user: "CyberGhost99", rating: 4.8, comment: "Masterpiece soundtrack and gripping world design.", date: "Jul 28, 2026" }
    ]
  },
  {
    id: "vortex-keeper",
    title: "Vortex Keeper",
    category: "Action Roguelike",
    tags: ["Action", "Roguelike", "Pixel Art"],
    price: 149,
    originalPrice: 299,
    discount: "-50%",
    rating: 4.8,
    developer: "Aetherial Games",
    releaseDate: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    description: "Battle through endless dimensional rifts in this fast-paced action roguelike adventure with procedural spell creation.",
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 10 / 11",
        cpu: "Intel Core i3-8100",
        ram: "8 GB RAM",
        gpu: "NVIDIA GTX 1050 Ti",
        storage: "12 GB SSD"
      },
      recommended: {
        os: "Windows 11",
        cpu: "Intel Core i5-11400",
        ram: "16 GB RAM",
        gpu: "NVIDIA RTX 3060",
        storage: "12 GB SSD"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r3", user: "PixelKnight", rating: 5, comment: "One more run turned into a 6-hour binge. Essential roguelike!", date: "Jul 15, 2026" }
    ]
  },
  {
    id: "echo-reality",
    title: "Echo Reality",
    category: "Narrative Puzzler",
    tags: ["Puzzle", "Sci-Fi", "Atmospheric"],
    price: 199,
    rating: 4.7,
    developer: "Chroma Mind",
    releaseDate: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2070&auto=format&fit=crop",
    description: "Manipulate memory echoes and alter reality in a mind-bending futuristic puzzle story set on a derelict space station.",
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 10 (64-bit)",
        cpu: "Quad Core 2.5 GHz",
        ram: "8 GB RAM",
        gpu: "GTX 970 / RX 580",
        storage: "20 GB SSD"
      },
      recommended: {
        os: "Windows 11 (64-bit)",
        cpu: "Intel i5-12400",
        ram: "16 GB RAM",
        gpu: "RTX 3060 Ti",
        storage: "20 GB NVMe SSD"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r4", user: "MindBender", rating: 4.7, comment: "Incredible environmental storytelling and mind-bending puzzle design.", date: "Jun 2, 2026" }
    ]
  },
  {
    id: "shards-of-ember",
    title: "Shards of Ember",
    category: "Soulslike",
    tags: ["Soulslike", "Dark Fantasy", "RPG"],
    price: 399,
    originalPrice: 599,
    discount: "-33%",
    rating: 4.9,
    developer: "Ashbound Interactive",
    releaseDate: "Mar 30, 2026",
    image: "https://images.unsplash.com/photo-1612170153139-65ba3179945e?q=80&w=2070&auto=format&fit=crop",
    description: "Unforgiving melee combat set in a dying world forged from crystalline fire and shadow. Parry, dodge, and conquer giant bosses.",
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i5-8400",
        ram: "12 GB RAM",
        gpu: "GTX 1060 (6GB)",
        storage: "50 GB SSD"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i7-10700K",
        ram: "16 GB RAM",
        gpu: "RTX 3070",
        storage: "50 GB SSD"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1612170153139-65ba3179945e?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r5", user: "AshenOne", rating: 5, comment: "Brutal yet rewarding combat. The boss designs are legendary.", date: "Apr 12, 2026" }
    ]
  },
  {
    id: "synth-runner",
    title: "Synth Runner 2099",
    category: "Rhythm",
    tags: ["Rhythm", "Synthwave", "High-Speed"],
    price: 99,
    originalPrice: 199,
    discount: "-50%",
    rating: 4.6,
    developer: "Neon Pulse Interactive",
    releaseDate: "Apr 05, 2026",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
    description: "High-octane rhythm platforming powered by responsive synthwave beats, laser highways, and custom level generation.",
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        cpu: "Core Dual 2.0 GHz",
        ram: "4 GB RAM",
        gpu: "GTX 750",
        storage: "8 GB SSD"
      },
      recommended: {
        os: "Windows 11",
        cpu: "i5 10th Gen",
        ram: "8 GB RAM",
        gpu: "GTX 1660",
        storage: "8 GB SSD"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r6", user: "BeatDrop", rating: 4.6, comment: "Fast, fluid, and the synthwave OST is pure adrenaline.", date: "May 18, 2026" }
    ]
  },
  {
    id: "ghost-protocol",
    title: "Ghost Protocol",
    category: "Stealth",
    tags: ["Stealth", "Cyberpunk", "Tactical"],
    price: 249,
    rating: 4.8,
    developer: "Shadowcraft Ops",
    releaseDate: "Jun 18, 2026",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop",
    description: "Infiltrate high-security megacorp towers using tactical drones, active camouflage, and non-lethal stealth execution.",
    featured: true,
    systemRequirements: {
      minimum: {
        os: "Windows 10 (64-bit)",
        cpu: "Intel i5-9400F",
        ram: "16 GB RAM",
        gpu: "GTX 1660 Super",
        storage: "35 GB SSD"
      },
      recommended: {
        os: "Windows 11 (64-bit)",
        cpu: "i7-11700K",
        ram: "16 GB RAM",
        gpu: "RTX 3070 Ti",
        storage: "35 GB NVMe"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r7", user: "ZeroTrace", rating: 4.9, comment: "The freedom of approach in every level reminds me of classic stealth masterpieces.", date: "Jul 10, 2026" }
    ]
  },
  {
    id: "astral-odyssey",
    title: "Astral Odyssey",
    category: "RPG",
    tags: ["RPG", "Space Exploration", "Open World"],
    price: 499,
    originalPrice: 799,
    discount: "-37%",
    rating: 4.9,
    developer: "Starlight Realm",
    releaseDate: "Jul 01, 2026",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop",
    description: "Pilot customizable starships across uncharted alien solar systems. Trade, explore, and shape galactic civilizations.",
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 10/11",
        cpu: "Ryzen 5 2600",
        ram: "16 GB RAM",
        gpu: "RX 5600 XT",
        storage: "60 GB SSD"
      },
      recommended: {
        os: "Windows 11",
        cpu: "Ryzen 7 7800X3D",
        ram: "32 GB RAM",
        gpu: "RTX 4080",
        storage: "60 GB NVMe"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r8", user: "StarPilot", rating: 5, comment: "Endless universe, beautiful graphics, and deep starship customization.", date: "Jul 25, 2026" }
    ]
  },
  {
    id: "chronos-break",
    title: "Chronos Break",
    category: "Action",
    tags: ["Time Travel", "Action", "Hack & Slash"],
    price: 179,
    rating: 4.7,
    developer: "Temporal Dynamics",
    releaseDate: "May 22, 2026",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop",
    description: "Rewind time mid-combo to set up catastrophic temporal echoes against mechanized armies in a collapsing timeline.",
    featured: false,
    systemRequirements: {
      minimum: {
        os: "Windows 10",
        cpu: "Core i5-8400",
        ram: "8 GB RAM",
        gpu: "GTX 1060",
        storage: "25 GB SSD"
      },
      recommended: {
        os: "Windows 11",
        cpu: "Core i7-10700",
        ram: "16 GB RAM",
        gpu: "RTX 3060",
        storage: "25 GB SSD"
      }
    },
    screenshots: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop"
    ],
    reviews: [
      { id: "r9", user: "TimeLord", rating: 4.8, comment: "The time-rewind combo mechanic is brilliant!", date: "Jun 14, 2026" }
    ]
  }
];
