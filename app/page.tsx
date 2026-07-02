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
        @keyframes fanSweep {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        
        .spotlight-beam {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 400px;
          height: 400px;
          margin-left: -200px;
          background: conic-gradient(from 180deg at 50% 100%, transparent 45%, rgba(255, 234, 0, 0.4) 49%, rgba(255, 234, 0, 0.6) 50%, rgba(255, 234, 0, 0.4) 51%, transparent 55%);
          transform-origin: 50% 100%;
          animation: fanSweep 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
          filter: blur(8px);
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
          
          {/* ลำแสง 4 อันที่พุ่งจากจุดเดียวกันแต่กวาดต่างจังหวะ */}
          <div className="spotlight-beam" style={{ animationDelay: '0s' }}></div>
          <div className="spotlight-beam" style={{ animationDelay: '1.2s' }}></div>
          <div className="spotlight-beam" style={{ animationDelay: '2.4s' }}></div>
          <div className="spotlight-beam" style={{ animationDelay: '3.6s' }}></div>

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