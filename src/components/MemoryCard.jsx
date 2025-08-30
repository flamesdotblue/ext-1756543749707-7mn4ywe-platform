import React from 'react';

function ShapeSVG({ type, color }) {
  const common = { fill: color, stroke: 'white', strokeWidth: 8 };
  const size = 220; // big to render crisp
  switch (type) {
    case 'circle':
      return (
        <svg viewBox="0 0 220 220" className="w-16 h-16 sm:w-20 sm:h-20">
          <circle cx="110" cy="110" r="80" {...common} />
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 220 220" className="w-16 h-16 sm:w-20 sm:h-20">
          <rect x="50" y="50" width="120" height="120" rx="18" {...common} />
        </svg>
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 220 220" className="w-16 h-16 sm:w-20 sm:h-20">
          <polygon points="110,40 180,170 40,170" {...common} />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 220 220" className="w-16 h-16 sm:w-20 sm:h-20">
          <polygon points="110,30 135,90 200,95 150,135 165,195 110,160 55,195 70,135 20,95 85,90" {...common} />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 220 220" className="w-16 h-16 sm:w-20 sm:h-20">
          <path d="M110 185s-70-40-70-90c0-22 18-40 40-40 15 0 28 8 30 20 2-12 15-20 30-20 22 0 40 18 40 40 0 50-70 90-70 90z" {...common} />
        </svg>
      );
    case 'diamond':
      return (
        <svg viewBox="0 0 220 220" className="w-16 h-16 sm:w-20 sm:h-20">
          <polygon points="110,20 200,110 110,200 20,110" {...common} />
        </svg>
      );
    default:
      return null;
  }
}

export default function MemoryCard({ card, onClick }) {
  const faceUp = card.flipped || card.matched;

  return (
    <button
      aria-label={faceUp ? `${card.type}` : 'Hidden card'}
      onClick={onClick}
      disabled={card.matched}
      className={`relative aspect-square w-full rounded-2xl transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
        card.matched ? 'scale-95' : 'active:scale-95'
      }`}
    >
      <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500" style={{ transform: faceUp ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg border border-orange-300 [backface-visibility:hidden] flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1 opacity-80">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-white/70" />
            ))}
          </div>
        </div>
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl bg-white flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] border-2"
             style={{ borderColor: card.bg }}>
          <ShapeSVG type={card.type} color={card.bg} />
        </div>
      </div>
    </button>
  );
}
