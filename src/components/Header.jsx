import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-orange-200/60">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-md shadow-orange-200" />
          <h1 className="text-2xl font-extrabold tracking-tight text-orange-700">
            Match the Shapes!
          </h1>
        </div>
        <span className="text-xs sm:text-sm text-orange-700/80 font-semibold bg-orange-100/70 px-3 py-1 rounded-full">
          Toddler-friendly
        </span>
      </div>
    </header>
  );
}
