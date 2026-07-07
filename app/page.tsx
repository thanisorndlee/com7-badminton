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
  }, 2500);

  return () => clearInterval(timer);
}, []);

  return (
    <div className="w-full h-[calc(100vh-68px)] relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      
     <style jsx global>{`
  @keyframes stageBeam {
    0%, 100% {
      transform: rotate(var(--start));
      opacity: .35;
    }
    50% {
      transform: rotate(var(--end));
      opacity: .65;
    }
  }

  .stage-beam {
    position: absolute;
    bottom: -80px;
    width: 90px;
    height: 360px;
    transform-origin: bottom center;
    pointer-events: none;
    filter: blur(8px);
    mix-blend-mode: screen;
    background: linear-gradient(
      to top,
      rgba(255,255,255,.8) 0%,
      rgba(168,85,247,.55) 18%,
      rgba(57,255,20,.22) 45%,
      transparent 100%
    );
    clip-path: polygon(45% 100%, 55% 100%, 100% 0%, 0% 0%);
    animation: stageBeam 4.5s ease-in-out infinite alternate;
  }
   @keyframes sponsorSlide {

  0%{
    opacity:0;
    transform:
      translateY(90px)
      scale(.88);
  }

  15%{
    opacity:1;
    transform:
      translateY(0)
      scale(1);
  }

  80%{
    opacity:1;
    transform:
      translateY(0)
      scale(1);
  }

  100%{
    opacity:0;
    transform:
      translateY(-90px)
      scale(.92);
  }

}

.animate-slide-up{
    animation:sponsorSlide .9s cubic-bezier(.22,1,.36,1);
}
`}</style>

      {/* Background */}
<div className="absolute inset-0 z-0 bg-black">
  <img src="/badminton-main.png" className="hidden md:block w-full h-full object-cover object-top" />
  <img src="/badminton-main-mobile-v3.PNG" className="block md:hidden w-full h-full object-cover object-[75%_center]" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
</div>

{/* กรอบสปอนเซอร์ */}
{/* สปอนเซอร์แบบไม่มีกรอบ */}
<div className="absolute bottom-10 z-20 left-1/2 -translate-x-1/2">
  <div className="relative"> 

<h3 className="text-center text-[#39ff14] font-bold tracking-[0.3em] uppercase text-[9px] mb-3 relative z-30">
        SPONSORED BY
    </h3>
<div className="relative z-30 border-t border-white/10 pt-4">
<div className="h-[65px] overflow-hidden relative flex justify-center items-center">
  <img
    key={current}
    src={sponsors[current].logo}
    alt={sponsors[current].name}
    className="
      animate-slide-up
      max-h-[45px]
      md:max-h-[58px]
      max-w-[230px]
      object-contain
    "
  />
</div>

<h2 className="mt-1 text-center text-sm font-bold tracking-[0.15em] text-white">
    {sponsors[current].name}
  </h2>

<div className="flex justify-center gap-2 mt-1">
      {sponsors.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrent(index)}
        className={`w-2 h-2 rounded-full transition-all ${
          current === index
            ? 'bg-[#39ff14] scale-125'
            : 'bg-white/30'
        }`}
      />
    ))}
  </div>

</div>
  </div>
</div>
</div>
  );
}
