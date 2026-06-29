'use client';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string }[]>([]);

  const sponsors = [
    { id: 1, name: 'POWER SHUTTLE', logo: '/power-shuttle-logo.png' },
    { id: 2, name: 'SIAM SPORTS ARENA', logo: '/siam-sports-logo.png' },
    { id: 3, name: 'TECHNIQUE', logo: '/technique-logo.png' },
  ];

  useEffect(() => {
    const generatedParticles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-68px)] relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      
      {/* ส่วน Navbar ด้านบน: รวมสปอนเซอร์ไว้ในกรอบเดียวกันตามรูปเป๊ะ */}
      <div className="absolute top-0 w-full z-50 p-6 flex items-center justify-start gap-8">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">COM7</span>
          <span className="text-3xl font-black text-[#39ff14] tracking-wider drop-shadow-[0_0_6px_rgba(57,255,20,0.3)]">BADMINTON</span>
          <span className="text-[12px] font-bold text-slate-300 tracking-[0.5em] uppercase">TOURNAMENT 2026</span>
        </div>
        
        {/* กรอบสปอนเซอร์ที่ย้ายเข้าไปรวมอยู่ในเมนูแล้ว */}
        <div className="flex items-center gap-6 bg-black/30 border border-white/10 px-8 py-2 rounded-full backdrop-blur-md">
          {sponsors.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <img src={s.logo} alt={s.name} className="h-6 w-auto object-contain brightness-150" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden md:block">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* คงสไตล์เดิมไว้ทั้งหมด */
        @keyframes borderRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .single-sponsor-wrapper { position: relative; overflow: hidden; width: 100%; max-width: 950px; height: auto; }
        .single-sponsor-wrapper::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(transparent, rgba(57, 255, 20, 0.1), rgba(57, 255, 20, 0.4), rgba(57, 255, 20, 0.1), transparent 60%); animation: borderRotate 6s linear infinite; z-index: 1; }
        .single-sponsor-content { position: relative; z-index: 2; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(16px); width: calc(100% - 2px); margin: 1px; box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.02); }
        @keyframes beamSwing { 0% { transform: translateX(-50%) rotate(calc(var(--angle) - 6deg)); } 50% { transform: translateX(-50%) rotate(calc(var(--angle) + 6deg)); } 100% { transform: translateX(-50%) rotate(calc(var(--angle) - 6deg)); } }
        @keyframes goldSparkle { 0%, 100% { transform: scale(0.5); opacity: 0.15; } 50% { transform: scale(1.3); opacity: 0.85; filter: drop-shadow(0 0 5px #ffea00); } }
        .concert-light { position: absolute; top: -20px; left: 50%; width: 90px; height: 500px; transform-origin: top center; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), rgba(57, 255, 20, 0.25), rgba(57, 255, 20, 0.02), transparent); clip-path: polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%); filter: blur(8px); opacity: 0.35; pointer-events: none; z-index: 1; animation: beamSwing var(--duration) ease-in-out infinite; }
        .light-0 { --angle: -70deg; --duration: 1.5s; } .light-1 { --angle: -60deg; --duration: 1.8s; } .light-2 { --angle: -50deg; --duration: 1.3s; } .light-3 { --angle: -40deg; --duration: 1.7s; } .light-4 { --angle: -30deg; --duration: 1.4s; } .light-5 { --angle: -20deg; --duration: 1.9s; } .light-6 { --angle: -10deg; --duration: 1.6s; } .light-7 { --angle: 10deg; --duration: 1.5s; animation-direction: reverse; } .light-8 { --angle: 20deg; --duration: 1.8s; animation-direction: reverse; } .light-9 { --angle: 30deg; --duration: 1.3s; animation-direction: reverse; } .light-10 { --angle: 40deg; --duration: 1.7s; animation-direction: reverse; } .light-11 { --angle: 50deg; --duration: 1.4s; animation-direction: reverse; } .light-12 { --angle: 60deg; --duration: 1.9s; animation-direction: reverse; } .light-13 { --angle: 70deg; --duration: 1.6s; animation-direction: reverse; } .light-14 { --angle: 0deg; --duration: 2s; }
        .gold-particle { position: absolute; width: 4px; height: 4px; background-color: #ffffff; border-radius: 50%; box-shadow: 0 0 6px #39ff14, 0 0 10px #39ff14; pointer-events: none; z-index: 2; animation: goldSparkle 2.5s ease-in-out infinite; }
      `}</style>

      {/* 1. LAYER รูปภาพพื้นหลังหลัก */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        <img src="/badminton-main.png" alt="PC" className="hidden md:block w-full h-full object-cover object-top" />
        <img src="/badminton-main-mobile-v3.PNG" alt="Mobile" className="block md:hidden w-full h-full object-cover object-[75%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* 2. LAYER กรอบสปอนเซอร์หลักด้านล่าง */}
      <div className="absolute bottom-16 md:bottom-8 inset-x-0 z-20 px-4 md:px-6 flex justify-center w-full">
        <div className="single-sponsor-wrapper rounded-2xl md:rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.95)] transition-all duration-300 hover:scale-[1.01]">
          {[...Array(15)].map((_, i) => <div key={i} className={`concert-light light-${i}`} />)}
          {particles.map((p, i) => <div key={`p-${i}`} className="gold-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />)}
          <div className="single-sponsor-content rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-between h-full">
            <div className="text-center w-full">
              <h3 className="text-[10px] md:text-xs text-[#39ff14] font-black tracking-[0.35em] uppercase drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">SPONSORED BY </h3>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-2 md:my-3 relative z-20" />
            <div className="relative w-full grid grid-cols-3 gap-3 md:gap-6 items-center justify-center z-20 py-1">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-xl p-2 md:p-3 h-16 md:h-24 transition-all duration-300 hover:border-[#39ff14]/30">
                  <img src={sponsor.logo} alt={sponsor.name} className="h-5 md:h-9 object-contain brightness-110 w-full max-w-[120px] md:max-w-[200px]" onError={(e) => { e.currentTarget.style.opacity = '0.4'; }} />
                  <span className="text-[8px] md:text-[10px] text-slate-400 font-bold mt-1.5 md:mt-2 tracking-wider text-center uppercase line-clamp-1">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}