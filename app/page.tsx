'use client';
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string }[]>([]);

  useEffect(() => {
    const generatedParticles = [...Array(10)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  const sponsors = [
    { id: 1, name: 'POWER SHUTTLE', logo: '/power-shuttle-logo.png' },
    { id: 2, name: 'SIAM SPORTS ARENA', logo: '/siam-sports-logo.png' },
    { id: 3, name: 'TECHNIQUE', logo: '/technique-logo.png' },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-68px)] relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      <style jsx global>{`
        @keyframes beamSwing { 0% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } 100% { transform: rotate(-5deg); } }
        @keyframes goldSparkle { 0%, 100% { transform: scale(0.5); opacity: 0.15; } 50% { transform: scale(1.3); opacity: 0.85; filter: drop-shadow(0 0 5px #ffea00); } }
        
        .sponsor-box-effects {
          position: relative; overflow: hidden;
        }
        .small-concert-light {
          position: absolute; top: -50px; left: 50%; width: 50px; height: 150px;
          background: linear-gradient(to bottom, rgba(57, 255, 20, 0.2), transparent);
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
          filter: blur(10px); animation: beamSwing 2s ease-in-out infinite; z-index: 1;
        }
      `}</style>

      {/* พื้นหลัง */}
      <div className="absolute inset-0 z-0 bg-black">
        <img src="/badminton-main.png" className="hidden md:block w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* ส่วนสปอนเซอร์ 3 ช่องพร้อมเอฟเฟกต์ */}
      <div className="z-20 w-full max-w-5xl px-4 mt-auto mb-10">
        <h3 className="text-center text-[#39ff14] font-black tracking-[0.3em] uppercase mb-8 text-sm">SPONSORED BY</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="sponsor-box-effects bg-black/60 border border-[#39ff14]/20 p-6 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md shadow-xl hover:border-[#39ff14]/60 transition-all duration-300">
              {/* เอฟเฟกต์แสงไฟในกล่อง */}
              <div className="small-concert-light" />
              {/* Particle ในกล่อง */}
              {particles.map((p, i) => (
                <div key={i} className="absolute w-[3px] h-[3px] bg-[#39ff14] rounded-full" style={{ left: p.left, top: p.top, animation: 'goldSparkle 2s infinite', animationDelay: p.delay }} />
              ))}
              
              <img src={sponsor.logo} className="h-20 object-contain mb-4 relative z-10" />
              <p className="text-[10px] text-slate-300 font-bold tracking-widest uppercase relative z-10">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}