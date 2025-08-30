import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl h-[320px] sm:h-[380px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg shadow-orange-200/60 border border-orange-200/60">
        <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-50/80 via-amber-50/10 to-transparent rounded-3xl" />
      <div className="mx-auto max-w-3xl px-6 -mt-10 relative">
        <div className="bg-white rounded-2xl shadow-md shadow-amber-200/50 border border-amber-200 p-4 sm:p-5 flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-lg">🧩</span>
          <p className="text-sm sm:text-base text-amber-800">
            Flip the colorful tiles and match two of the same shapes. Simple, bright, and fun for little hands!
          </p>
        </div>
      </div>
    </section>
  );
}
