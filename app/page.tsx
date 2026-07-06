'use client';

import React from 'react';

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
    logo: '/xiaomi.png',
  },
  {
    id: 3,
    name: 'GLOBAL BRANDS',
    logo: '/ชื่อไฟล์สปอนเซอร์ตัวที่3.svg',
    label: 'THREE',
  },
];

  return (
    <div className="w-full h-[calc(100vh-68px)] relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      
      <style jsx global>{`
  @keyframes stageLeft {
    0%, 100% { transform: rotate(-24deg); }
    50% { transform: rotate(-8deg); }
  }

  @keyframes stageCenter {
    0%, 100% { transform: translateX(-50%) rotate(0deg); }
    50% { transform: translateX(-50%) rotate(4deg); }
  }

  @keyframes stageRight {
    0%, 100% { transform: rotate(24deg); }
    50% { transform: rotate(8deg); }
  }

  .stage-light {
    position: absolute;
    top: -120px;
    width: 430px;
    height: 620px;
    transform-origin: top center;
    pointer-events: none;
    opacity: .34;
    filter: blur(16px);
    mix-blend-mode: screen;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,.95) 0%,
      rgba(180,255,160,.42) 14%,
      rgba(57,255,20,.20) 42%,
      rgba(57,255,20,.06) 68%,
      transparent 100%
    );
    clip-path: polygon(47% 0%, 53% 0%, 100% 100%, 0% 100%);
  }

  .stage-light-left {
    left: 18%;
    animation: stageLeft 5.5s ease-in-out infinite alternate;
  }

  .stage-light-center {
    left: 50%;
    animation: stageCenter 6s ease-in-out infinite alternate;
  }

  .stage-light-right {
    right: 18%;
    animation: stageRight 5.8s ease-in-out infinite alternate;
  }
`}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img src="/badminton-main.png" className="hidden md:block w-full h-full object-cover object-top" />
        <img src="/badminton-main-mobile-v3.PNG" className="block md:hidden w-full h-full object-cover object-[75%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      {/* กรอบสปอนเซอร์ */}
      <div className="absolute bottom-10 z-20 w-full max-w-5xl px-4">
        <div className="w-full bg-black/60 border border-[#39ff14]/30 rounded-2xl backdrop-blur-md shadow-2xl p-6 relative overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-24 bg-white rounded-full blur-[70px] opacity-45 z-10" />
<div className="absolute top-0 left-[24%] w-40 h-20 bg-green-300 rounded-full blur-[60px] opacity-25 z-10" />
<div className="absolute top-0 right-[24%] w-40 h-20 bg-green-300 rounded-full blur-[60px] opacity-25 z-10" />

<div className="stage-light stage-light-left z-10" />
<div className="stage-light stage-light-center z-10" />
<div className="stage-light stage-light-right z-10" />

          <h3 className="text-center text-[#39ff14] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 relative z-30">
            SPONSORED BY
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10 relative z-30">
            {sponsors.map((sponsor, index) => (
              <div key={sponsor.id} className={`flex items-center justify-center gap-3 p-4 ${index !== 2 ? 'border-r border-white/10' : ''}`}>
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-5 w-28 object-contain"
              />                
              <div className="flex flex-col text-left">
                  <span className="text-[7px] text-slate-500 uppercase tracking-wider">SPONSOR {sponsor.label}:</span>
                  <span className="text-[10px] font-bold text-white uppercase">{sponsor.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}