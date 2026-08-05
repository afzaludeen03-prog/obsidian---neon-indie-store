export interface SystemRequirements {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  storage: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Game {
  id: string;
  title: string;
  category: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  image: string;
  description: string;
  developer: string;
  releaseDate: string;
  featured?: boolean;
  systemRequirements: {
    minimum: SystemRequirements;
    recommended: SystemRequirements;
  };
  screenshots: string[];
  reviews: Review[];
}

export interface CartItem {
  game: Game;
  quantity: number;
}
