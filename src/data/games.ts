import { Game } from "../types";

export const GAMES_DATA: Game[] = [
  {
    id: "neon-syndicate",
    title: "Neon Syndicate",
    category: "Cyberpunk",
    tags: ["Cyberpunk", "Action", "Ray-Tracing"],
    price: 24.99,
    originalPrice: 34.99,
    discount: "-28%",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    description: "Hyper-visceral cyberpunk combat simulator redefining the indie landscape with real-time Ray-Tracing.",
    featured: true
  },
  {
    id: "vortex-keeper",
    title: "Vortex Keeper",
    category: "Action Roguelike",
    tags: ["Action", "Roguelike", "Pixel Art"],
    price: 14.99,
    originalPrice: 19.99,
    discount: "-25%",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    description: "Battle through endless dimensional rifts in this fast-paced action roguelike adventure.",
    featured: true
  },
  {
    id: "echo-reality",
    title: "Echo Reality",
    category: "Narrative Puzzler",
    tags: ["Puzzle", "Sci-Fi", "Atmospheric"],
    price: 19.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=2070&auto=format&fit=crop",
    description: "Manipulate memory echoes and alter reality in a mind-bending futuristic puzzle story.",
    featured: true
  },
  {
    id: "shards-of-ember",
    title: "Shards of Ember",
    category: "Soulslike",
    tags: ["Soulslike", "Dark Fantasy", "RPG"],
    price: 29.99,
    originalPrice: 39.99,
    discount: "-25%",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1612170153139-65ba3179945e?q=80&w=2070&auto=format&fit=crop",
    description: "Unforgiving melee combat set in a dying world forged from crystalline fire and shadow.",
    featured: true
  },
  {
    id: "synth-runner",
    title: "Synth Runner 2099",
    category: "Rhythm",
    tags: ["Rhythm", "Synthwave", "High-Speed"],
    price: 12.99,
    originalPrice: 15.99,
    discount: "-18%",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
    description: "High-octane rhythm platforming powered by responsive synthwave beats and neon visuals.",
    featured: true
  },
  {
    id: "ghost-protocol",
    title: "Ghost Protocol",
    category: "Stealth",
    tags: ["Stealth", "Cyberpunk", "Tactical"],
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop",
    description: "Infiltrate high-security megacorp towers using tactical gadgets and active camouflage.",
    featured: true
  }
];
