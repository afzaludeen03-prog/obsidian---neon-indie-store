import React, { useState, useRef } from "react";
import { motion } from "motion/react";

interface GameCardProps {
  title: string;
  category: string;
  image: string;
  price: string;
  gridClass?: string;
}

export default function GameCard({ title, category, image, price, gridClass = "" }: GameCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = ((centerY - y) / centerY) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl bg-[#121214] border border-white/5 cursor-pointer h-full transition-all duration-500 ${gridClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
      
      <img 
        src={image} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
      />

      <div className="relative z-20 h-full p-6 flex flex-col justify-end">
        <div className="flex justify-between items-start mb-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">{category}</h3>
          <div className="text-neon-cyan text-xs font-mono">AVAILABLE</div>
        </div>
        
        <h3 className="text-xl font-display font-black text-white group-hover:text-neon-cyan transition-colors duration-300 mb-1 uppercase italic tracking-tighter">{title}</h3>
        <p className="text-sm font-bold text-zinc-500">{price}</p>
      </div>

      <div className="absolute bottom-4 right-4 text-xs font-bold text-white opacity-0 group-hover:opacity-100 group-hover:text-neon-cyan transition-all duration-300">DETAILS &rarr;</div>
    </motion.div>
  );
}
