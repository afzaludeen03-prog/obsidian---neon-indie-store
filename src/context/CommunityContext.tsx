import React, { createContext, useContext, useState } from "react";
import { CommunityPost, Review } from "../types";
import { GAMES_DATA } from "../data/games";
import { useCartContext } from "./CartContext";

const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p1",
    author: "VoidWorks Studio",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
    date: "2 hours ago",
    title: "Neon Syndicate v1.04 Patch Notes: Ray-Tracing DLSS 3.5 & Ultra Spatial Audio",
    content: "We just deployed patch 1.04 featuring DLSS 3.5 frame generation support, improved neural combat AI, and 12 new cyberware weapons. Thank you for making Neon Syndicate #1 on Obsidian Store!",
    gameTitle: "Neon Syndicate",
    likes: 342,
    comments: 48,
    isDeveloper: true,
    tags: ["Patch Notes", "Update", "DLSS 3.5"]
  },
  {
    id: "p2",
    author: "Aetherial Games",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
    date: "1 day ago",
    title: "Vortex Keeper: Free DLC 'Astral Rifts' Coming Next Month!",
    content: "Prepare your spell decks! Next month we're releasing 3 new elemental realms, 4 boss gods, and 50 new spell combinations completely free for all Vortex Keeper owners.",
    gameTitle: "Vortex Keeper",
    likes: 512,
    comments: 89,
    isDeveloper: true,
    tags: ["DLC", "Announcement"]
  },
  {
    id: "p3",
    author: "CyberGhost99",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    date: "3 days ago",
    title: "Why Shards of Ember is the best soulslike indie game of 2026",
    content: "The combat weight and parry timing feel incredible. If you haven't picked up Shards of Ember during the current 25% discount, you're missing out on pure gaming excellence.",
    gameTitle: "Shards of Ember",
    likes: 198,
    comments: 24,
    isDeveloper: false,
    tags: ["Discussion", "Review"]
  }
];

interface CommunityContextType {
  posts: CommunityPost[];
  addPost: (post: Omit<CommunityPost, "id" | "date" | "likes" | "comments">) => void;
  likePost: (postId: string) => void;
  addGameReview: (gameId: string, review: Omit<Review, "id" | "date">) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const { showToast } = useCartContext();

  const addPost = (newPostData: Omit<CommunityPost, "id" | "date" | "likes" | "comments">) => {
    const newPost: CommunityPost = {
      ...newPostData,
      id: `p-${Date.now()}`,
      date: "Just now",
      likes: 0,
      comments: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast("Post published to the Syndicate Community!");
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const addGameReview = (gameId: string, reviewData: Omit<Review, "id" | "date">) => {
    const game = GAMES_DATA.find((g) => g.id === gameId);
    if (!game) return;

    const newReview: Review = {
      ...reviewData,
      id: `r-${Date.now()}`,
      date: "Just now",
    };

    game.reviews.unshift(newReview);

    // Create a community post for the review automatically
    addPost({
      author: reviewData.user,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      title: `Review for ${game.title}: ${reviewData.rating}/5 Stars`,
      content: reviewData.comment,
      gameTitle: game.title,
      tags: ["Review"],
    });
  };

  return (
    <CommunityContext.Provider value={{ posts, addPost, likePost, addGameReview }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunityContext = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunityContext must be used within a CommunityProvider");
  }
  return context;
};
