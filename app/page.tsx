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
    }, 2200);

    return () => clearInterval(timer);
  }, [sponsors.length]);

  return (
    <div className="w-full h-[calc(100vh-68px)] relative overflow-hidden bg-black select-none">
      <style jsx global>{`
        @keyframes sponsorTvSlide {
          0% {
            opacity: 0;
            transform: translateY(55px) scale(0.92);
          }

          18% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          78% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          100% {
            opacity: 0;
            transform: translateY(-55px) scale(0.94);
          }
        }

        .sponsor-tv-slide {
          animation: sponsorTvSlide 2.2s cubic-bezier(.22,1,.36,1);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/badminton-main.png"
          className="hidden md:block w-full h-full object-cover object-top"
          alt="Badminton Background"
        />
        <img
          src="/badminton-main-mobile-v3.PNG"
          className="block md:hidden w-full h-full object-cover object-[75%_center]"
          alt="Badminton Background Mobile"
        />

        {/* ลดดำด้านล่าง ไม่ให้เหมือนมีกล่องใหญ่ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
      </div>

      {/* Sponsor Floating Slider */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <h3 className="text-[#39ff14] font-black tracking-[0.35em] uppercase text-[8px] mb-2 drop-shadow-[0_0_8px_rgba(57,255,20,.6)]">
          SPONSORED BY
        </h3>

        <div className="relative w-[260px] h-[62px] overflow-hidden flex items-center justify-center">
          <img
            key={current}
            src={sponsors[current].logo}
            alt={sponsors[current].name}
            className="sponsor-tv-slide max-h-[46px] max-w-[220px] object-contain drop-shadow-[0_0_18px_rgba(0,0,0,.85)]"
          />
        </div>

        <h2 className="mt-1 text-center text-xs font-black tracking-[0.2em] text-white drop-shadow-[0_0_8px_rgba(0,0,0,.8)]">
          {sponsors[current].name}
        </h2>

        <div className="flex justify-center gap-2 mt-2">
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                current === index
                  ? 'bg-[#39ff14] scale-125 shadow-[0_0_8px_rgba(57,255,20,.9)]'
                  : 'bg-white/35'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}