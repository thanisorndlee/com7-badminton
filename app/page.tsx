'use client';

import React from 'react';

export default function HomePage() {
  const sponsors = [
    { id: 1, name: 'COM7TECH', logo: '/logo-placeholder.png', label: 'ONE' },
    { id: 2, name: 'SIAM SPORTS ARENA', logo: '/badminton-shuttle.png', label: 'TWO' },
    { id: 3, name: 'GLOBAL BRANDS', logo: '/global-brands-logo.png', label: 'THREE' },
  ];

  return (
    <div className="w-full h-[calc(100vh-68px)] relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      
      <style jsx global>{`
        @keyframes spotlightLeft {
          0% { transform: translateX(-50%) rotate(-28deg); }
          50% { transform: translateX(-50%) rotate(8deg); }
          100% { transform: translateX(-50%) rotate(-28deg); }
        }

        @keyframes spotlightRight {
          0% { transform: translateX(-50%) rotate(28deg); }
          50% { transform: translateX(-50%) rotate(-8deg); }
          100% { transform: translateX(-50%) rotate(28deg); }
        }

        .spotlight {
          position: absolute;
          top: -30px;
          left: 50%;
          width: 230px;
          height: 520px;
          transform-origin: top center;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,.55) 0%,
            rgba(180,255,120,.28) 15%,
            rgba(120,255,80,.18) 40%,
            rgba(80,255,40,.08) 70%,
            rgba(80,255,40,0) 100%
          );
          clip-path: polygon(49% 0%, 51% 0%, 100% 100%, 0% 100%);
          filter: blur(8px);
          opacity: .85;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .spotlight.left { animation: spotlightLeft 5s ease-in-out infinite; }
        .spotlight.right { animation: spotlightRight 5s ease-in-out infinite; }
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
          
          {/* ลำแสงสปอร์ตไลท์ 4 ดวง */}
          <div className="spotlight left"></div>
          <div className="spotlight right"></div>
          <div className="spotlight left" style={{ left: '35%' }}></div>
          <div className="spotlight right" style={{ left: '65%' }}></div>
          <div className="spotlight left" style={{ left: '45%', animationDuration: '6s', opacity: .45 }}></div>
          <div className="spotlight right" style={{ left: '55%', animationDuration: '6s', opacity: .45 }}></div>

          <h3 className="text-center text-[#39ff14] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 relative z-30">
            SPONSORED BY
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10 relative z-30">
            {sponsors.map((sponsor, index) => (
              <div key={sponsor.id} className={`flex items-center justify-center gap-3 p-4 ${index !== 2 ? 'border-r border-white/10' : ''}`}>
                <img src={sponsor.logo} className="h-8 w-auto object-contain" />
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