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
  featured?: boolean;
}

export interface CartItem {
  game: Game;
  quantity: number;
}
