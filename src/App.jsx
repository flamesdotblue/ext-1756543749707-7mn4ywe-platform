import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameBoard from './components/GameBoard';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-100 text-gray-900">
      <Header />
      <Hero />
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <GameBoard />
      </main>
    </div>
  );
}
