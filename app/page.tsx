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
    <div className="w-full h-[calc(100vh-68px)] relative overflow-hidden bg-black select-none">
      <style jsx global>{`
        @keyframes sponsorSlide {

  0%{
    opacity:0;
    transform:translateY(80px) scale(.92);
  }

  12%{
    opacity:1;
    transform:translateY(0) scale(1);
  }

  88%{
    opacity:1;
    transform:translateY(0) scale(1);
  }

  100%{
    opacity:0;
    transform:translateY(-80px) scale(.96);
  }

}

.animate-slide-up{
    animation:sponsorSlide 4.2s cubic-bezier(.19,1,.22,1);
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
        <h3 className="text-[#39ff14] font-black tracking-[0.35em] uppercase text-xs md:text-sm mb-4 drop-shadow-[0_0_12px_rgba(57,255,20,.8)]">          
          SPONSORED BY
        </h3>

        <div className="relative w-[360px] h-[100px] overflow-hidden flex items-center justify-center">
            <img
            key={current}
            src={sponsors[current].logo}
            alt={sponsors[current].name}
            className="animate-slide-up max-h-[78px] max-w-[320px] object-contain drop-shadow-[0_0_18px_rgba(0,0,0,.85)]"
          />
        </div>

        <h2 className="mt-2 text-center text-lg md:text-xl font-black tracking-[0.18em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,.4)]">
            {sponsors[current].name}
        </h2>

        <div className="flex justify-center gap-2 mt-2">
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all ${
              current === index
                ? 'bg-[#39ff14] scale-150 shadow-[0_0_10px_#39ff14]'
                : 'bg-white/35'
            }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}