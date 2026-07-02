'use client';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string }[]>([]);

  const sponsors = [
    { id: 1, name: 'POWER SHUTTLE', logo: '/power-shuttle-logo.png', label: 'ONE' },
    { id: 2, name: 'SIAM SPORTS ARENA', logo: '/siam-sports-logo.png', label: 'TWO' },
    { id: 3, name: 'TECHNIQUE', logo: '/technique-logo.png', label: 'THREE' },
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
      
      <style jsx global>{`
        @keyframes goldSparkle { 0%, 100% { transform: scale(0.5); opacity: 0.15; } 50% { transform: scale(1.3); opacity: 0.85; filter: drop-shadow(0 0 5px #ffea00); } }
        @keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        .gold-particle {
          position: absolute; width: 4px; height: 4px; background-color: #ffffff; border-radius: 50%;
          box-shadow: 0 0 6px #39ff14, 0 0 10px #39ff14; pointer-events: none; z-index: 5;
          animation: goldSparkle 2.5s ease-in-out infinite;
        }
        
        .animate-shine { animation: shine 3s infinite linear; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img src="/badminton-main.png" className="hidden md:block w-full h-full object-cover object-top" />
        <img src="/badminton-main-mobile-v3.PNG" className="block md:hidden w-full h-full object-cover object-[75%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} className="gold-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay }} />
      ))}

      {/* สปอนเซอร์กรอบใหญ่ครอบรวม */}
      <div className="absolute bottom-10 z-20 w-full max-w-5xl px-4">
        <div className="w-full bg-black/60 border border-[#39ff14]/20 rounded-3xl backdrop-blur-md shadow-2xl p-6 relative overflow-hidden">
          
          <h3 className="text-center text-[#39ff14] font-black tracking-[0.35em] uppercase text-xs mb-6 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
            SPONSORED BY
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sponsors.map((sponsor) => (
              /* ใส่ relative และ overflow-hidden เพื่อให้ไฟสปอร์ตไลท์วิ่งเฉพาะในกรอบ */
              <div key={sponsor.id} className="relative bg-black/40 border border-white/10 p-4 rounded-xl flex items-center justify-start gap-4 hover:border-[#39ff14]/50 transition-all duration-300 overflow-hidden">
                
                {/* ไฟสปอร์ตไลท์ส่องผ่าน */}
                <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <img src={sponsor.logo} className="h-10 w-10 object-contain brightness-110 relative z-10" />
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] text-slate-400 uppercase tracking-widest">
                    SPONSOR {sponsor.label}:
                  </span>
                  <span className="text-xs font-bold text-white tracking-wide">{sponsor.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}