'use client';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const sponsors = [
    {
      id: 1,
      name: 'SANDISK',
      logo: '/Sandisk-Horizontal-Mark-TM-Red-RGB.svg',
    },
    {
      id: 2,
      name: 'XIAOMI',
      logo: '/xiaomi-logo.png',
    },
    {
      id: 3,
      name: 'JBL',
      logo: '/Jbl-logo.jpg',
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sponsors.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [sponsors.length]);

  return (
    <div className="w-full min-h-[calc(100vh-68px)] relative bg-black select-none overflow-x-hidden">

      <style jsx global>{`
        @keyframes sponsorSlide {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(.92);
          }

          12% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          88% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-80px) scale(.96);
          }
        }

        .animate-slide-up {
          animation: sponsorSlide 4.2s cubic-bezier(.19,1,.22,1);
        }
      `}</style>

      {/* ==================== BACKGROUND ==================== */}
      <div className="relative w-full bg-black">

        {/* Desktop */}
        <img
          src="/badminton-main.jpg"
          className="hidden md:block w-full h-auto"
          alt="Badminton Background"
        />

        {/* Mobile */}
        <img
          src="/badminton-main-mobile-v3.jpg"
          className="block md:hidden w-full h-auto"
          alt="Badminton Background Mobile"
        />

      </div>

      {/*
      =====================================================
      SPONSOR — ซ่อนไว้ชั่วคราว
      =====================================================

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">

        <h3 className="text-[#39ff14] font-black tracking-[0.35em] uppercase text-[10px] md:text-[11px] mb-4 drop-shadow-[0_0_12px_rgba(57,255,20,.8)]">
          SPONSORED BY
        </h3>

        <div className="relative w-[300px] h-[75px] overflow-hidden flex items-center justify-center">
          <img
            key={current}
            src={sponsors[current].logo}
            alt={sponsors[current].name}
            className="animate-slide-up max-h-[56px] md:max-h-[62px] max-w-[260px] object-contain drop-shadow-[0_0_18px_rgba(0,0,0,.85)]"
          />
        </div>

        <h2 className="mt-2 text-center text-base md:text-lg font-black tracking-[0.18em] text-white">
          {sponsors[current].name}
        </h2>

        <div className="flex justify-center gap-2 mt-2">
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full ${
                current === index
                  ? 'bg-[#39ff14] scale-150'
                  : 'bg-white/35'
              }`}
            />
          ))}
        </div>

      </div>
      */}

    </div>
  );
}