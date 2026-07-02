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
        @keyframes sweep1 { 0%,100% { transform: rotate(-42deg); } 50% { transform: rotate(-12deg); } }
        @keyframes sweep2 { 0%,100% { transform: rotate(-25deg); } 50% { transform: rotate(10deg); } }
        @keyframes sweep3 { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(25deg); } }
        @keyframes sweep4 { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(-18deg); } }
        @keyframes sweep5 { 0%,100% { transform: rotate(22deg); } 50% { transform: rotate(-5deg); } }
        @keyframes sweep6 { 0%,100% { transform: rotate(38deg); } 50% { transform: rotate(12deg); } }
        @keyframes sweep7 { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-30deg); } }

        .spotlight {
            position: absolute; top: -20px; left: 50%;
            width: 140px; height: 650px; margin-left: -70px;
            transform-origin: 50% 0%;
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,.75) 0%,
                rgba(190,255,120,.45) 12%,
                rgba(120,255,60,.18) 45%,
                rgba(120,255,60,.05) 75%,
                transparent 100%
            );
            clip-path: polygon(49% 0%, 51% 0%, 100% 100%, 0% 100%);
            mix-blend-mode: screen; filter: blur(6px); opacity: .45; pointer-events:none;
        }

        .s1{animation:sweep1 7s ease-in-out infinite;}
        .s2{animation:sweep2 6.2s ease-in-out infinite;}
        .s3{animation:sweep3 8s ease-in-out infinite;}
        .s4{animation:sweep4 6.8s ease-in-out infinite;}
        .s5{animation:sweep5 7.5s ease-in-out infinite;}
        .s6{animation:sweep6 6s ease-in-out infinite;}
        .s7{animation:sweep7 9s ease-in-out infinite;}
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
          
          {/* หัวไฟด้านบน */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20 flex gap-5">
              {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_white]"></div>
              ))}
          </div>

          {/* ลำแสงสปอร์ตไลท์ */}
          <div className="spotlight s1"></div>
          <div className="spotlight s2"></div>
          <div className="spotlight s3"></div>
          <div className="spotlight s4"></div>
          <div className="spotlight s5"></div>
          <div className="spotlight s6"></div>
          <div className="spotlight s7"></div>

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