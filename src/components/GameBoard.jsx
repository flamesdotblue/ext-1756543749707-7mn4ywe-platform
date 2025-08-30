import React, { useEffect, useMemo, useState } from 'react';
import MemoryCard from './MemoryCard';

const SHAPES = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
const COLORS = ['#fb923c', '#f97316', '#f59e0b', '#22c55e', '#06b6d4', '#a855f7'];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck(pairs = 4) {
  const selected = SHAPES.slice(0, pairs);
  const deck = selected.flatMap((type, idx) => {
    const bg = COLORS[idx % COLORS.length];
    return [
      { id: `${type}-a`, type, bg, matched: false, flipped: false },
      { id: `${type}-b`, type, bg, matched: false, flipped: false },
    ];
  });
  return shuffle(deck);
}

export default function GameBoard() {
  const [pairs, setPairs] = useState(4); // toddler-friendly default
  const [cards, setCards] = useState(() => buildDeck(4));
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [lock, setLock] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const [won, setWon] = useState(false);

  useEffect(() => {
    // Show all cards briefly for toddlers, then hide
    const revealTimer = setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, flipped: false })));
      setShowAll(false);
    }, 2000);

    // Initially flip all up
    setCards((prev) => prev.map((c) => ({ ...c, flipped: true })));

    return () => clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (cards.length && cards.every((c) => c.matched)) {
      setWon(true);
    } else {
      setWon(false);
    }
  }, [cards]);

  function reset(newPairs = pairs) {
    const deck = buildDeck(newPairs);
    setPairs(newPairs);
    setCards(deck);
    setFirst(null);
    setSecond(null);
    setLock(true);
    setMoves(0);
    setWon(false);
    // toddler reveal again
    setCards(deck.map((c) => ({ ...c, flipped: true })));
    setShowAll(true);
    setTimeout(() => {
      setCards((prev) => prev.map((c) => ({ ...c, flipped: false })));
      setShowAll(false);
      setLock(false);
    }, 2000);
  }

  function handleFlip(card) {
    if (lock) return;
    if (card.flipped || card.matched) return;

    setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c)));

    if (!first) {
      setFirst(card);
      return;
    }

    const secondCard = { ...card, flipped: true };
    setSecond(secondCard);
    setLock(true);
    setMoves((m) => m + 1);

    const isMatch = first.type === secondCard.type;

    setTimeout(() => {
      if (isMatch) {
        setCards((prev) =>
          prev.map((c) =>
            c.type === first.type ? { ...c, matched: true, flipped: true } : c
          )
        );
      } else {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first.id || c.id === secondCard.id ? { ...c, flipped: false } : c
          )
        );
      }
      setFirst(null);
      setSecond(null);
      setLock(false);
    }, 800);
  }

  const gridCols = useMemo(() => {
    if (pairs <= 4) return 'grid-cols-4 sm:grid-cols-4';
    if (pairs === 6) return 'grid-cols-4 sm:grid-cols-6';
    return 'grid-cols-4 sm:grid-cols-4';
  }, [pairs]);

  return (
    <section className="mt-12">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 text-orange-700 text-sm">🎯</span>
          <div className="text-orange-800 font-semibold">Moves: {moves}</div>
          <div className="ml-3 text-emerald-700 font-semibold">Matches: {cards.filter((c) => c.matched).length / 2} / {pairs}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => reset(pairs)} className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold shadow hover:brightness-95 active:brightness-90">
            Reset
          </button>
          <div className="hidden sm:flex items-center gap-1 bg-white border border-orange-200 rounded-xl p-1">
            <button onClick={() => reset(4)} className={`px-3 py-1 rounded-lg text-sm font-semibold ${pairs === 4 ? 'bg-orange-100 text-orange-700' : 'text-orange-700/80'}`}>Easy</button>
            <button onClick={() => reset(6)} className={`px-3 py-1 rounded-lg text-sm font-semibold ${pairs === 6 ? 'bg-orange-100 text-orange-700' : 'text-orange-700/80'}`}>More</button>
          </div>
        </div>
      </div>

      <div className={`grid ${gridCols} gap-3 sm:gap-4`}>
        {cards.map((card) => (
          <div key={card.id} className="w-full">
            <MemoryCard card={card} onClick={() => handleFlip(card)} />
          </div>
        ))}
      </div>

      {showAll && (
        <div className="mt-4 text-center text-sm text-orange-700 font-semibold">Peek time! Cards will hide soon.</div>
      )}

      {won && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 text-center font-extrabold text-lg">
          Yay! All matched! 🎉
          <div className="mt-3">
            <button onClick={() => reset(pairs)} className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-bold shadow hover:brightness-95 active:brightness-90">
              Play again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
