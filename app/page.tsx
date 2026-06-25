'use client';

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string }[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsors.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sponsors.length]);

  return (
    <div className="w-full h-[calc(100vh-68px)] relative flex flex-col items-center justify-center overflow-hidden bg-black select-none">
      
      <style jsx global>{`
        @keyframes borderRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .single-sponsor-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 850px;
          height: 110px;
        }
        @media (min-width: 768px) {
          .single-sponsor-wrapper { height: 160px; }
        }
        
        .single-sponsor-wrapper::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            transparent, 
            rgba(57, 255, 20, 0.1), 
            rgba(57, 255, 20, 0.4), 
            rgba(57, 255, 20, 0.1), 
            transparent 60%
          );
          animation: borderRotate 6s linear infinite;
          z-index: 1;
        }

        .single-sponsor-content {
          position: relative;
          z-index: 2;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          margin: 1px;
          box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.02);
        }

        @keyframes beamSwing {
          0% { transform: translateX(-50%) rotate(calc(var(--angle) - 6deg)); }
          50% { transform: translateX(-50%) rotate(calc(var(--angle) + 6deg)); }
          100% { transform: translateX(-50%) rotate(calc(var(--angle) - 6deg)); }
        }

        @keyframes goldSparkle {
          0%, 100% { transform: scale(0.5); opacity: 0.15; }
          50% { transform: scale(1.3); opacity: 0.85; filter: drop-shadow(0 0 5px #ffea00); }
        }

        .concert-light {
          position: absolute;
          top: -20px;
          left: 50%;
          width: 90px;
          height: 500px;
          transform-origin: top center;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.75),
            rgba(57, 255, 20, 0.25),
            rgba(57, 255, 20, 0.02),
            transparent
          );
          clip-path: polygon(48% 0%, 52% 0%, 100% 100%, 0% 100%);
          filter: blur(8px);
          opacity: 0.35;
          pointer-events: none;
          z-index: 1;
          animation: beamSwing var(--duration) ease-in-out infinite;
        }

        .light-0  { --angle: -70deg; --duration: 1.5s; }
        .light-1  { --angle: -60deg; --duration: 1.8s; }
        .light-2  { --angle: -50deg; --duration: 1.3s; }
        .light-3  { --angle: -40deg; --duration: 1.7s; }
        .light-4  { --angle: -30deg; --duration: 1.4s; }
        .light-5  { --angle: -20deg; --duration: 1.9s; }
        .light-6  { --angle: -10deg; --duration: 1.6s; }
        .light-7  { --angle: 10deg;  --duration: 1.5s; animation-direction: reverse; }
        .light-8  { --angle: 20deg;  --duration: 1.8s; animation-direction: reverse; }
        .light-9  { --angle: 30deg;  --duration: 1.3s; animation-direction: reverse; }
        .light-10 { --angle: 40deg;  --duration: 1.7s; animation-direction: reverse; }
        .light-11 { --angle: 50deg;  --duration: 1.4s; animation-direction: reverse; }
        .light-12 { --angle: 60deg;  --duration: 1.9s; animation-direction: reverse; }
        .light-13 { --angle: 70deg;  --duration: 1.6s; animation-direction: reverse; }
        .light-14 { --angle: 0deg;   --duration: 2s; }

        .gold-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px #39ff14, 0 0 10px #39ff14;
          pointer-events: none;
          z-index: 2;
          animation: goldSparkle 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* 1. LAYER รูปภาพพื้นหลังหลัก */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        
        {/* 💻 รูปสำหรับหน้าจอคอมพิวเตอร์ */}
        <img
          src="/badminton-main.png"
          alt="COM7 Badminton Tournament 2026 PC Official"
          className="hidden md:block w-full h-full object-cover object-top"
        />

        {/* 📱 รูปสำหรับหน้าจอมือถือ เวอร์ชัน v3 (แก้ปัญหา Cache บังคับอัปเดตทันที) */}
        <img
          src="/badminton-main-mobile-v3.PNG"
          alt="COM7 Badminton Tournament 2026 Mobile v3"
          className="block md:hidden w-full h-full object-cover object-[75%_center]"
        />
        
        {/* ม่านไล่เฉดสีดำ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
      </div>

      {/* 2. LAYER กรอบสปอนเซอร์เดี่ยวลอยสวยงาม (ขยับหลบปุ่มล่างแถบ URL) */}
      <div className="absolute bottom-20 md:bottom-8 inset-x-0 z-20 px-4 md:px-6 flex justify-center w-full">
        <div className="single-sponsor-wrapper rounded-2xl md:rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.95)] transition-all duration-300 hover:scale-[1.01]">
          
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`concert-light light-${i}`} />
          ))}

          {particles.map((p, i) => (
            <div
              key={`p-${i}`}
              className="gold-particle"
              style={{ left: p.left, top: p.top, animationDelay: p.delay }}
            />
          ))}

          <div className="single-sponsor-content rounded-2xl md:rounded-3xl p-3 md:p-5 flex flex-col items-center justify-between h-full">
            
            <div className="text-center w-full mt-0.5">
              <h3 className="text-[10px] md:text-sm text-[#39ff14] font-black tracking-[0.35em] uppercase drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
                SPONSORED BY 
              </h3>
            </div>

            <div className="w-5/6 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-1 md:my-1.5 relative z-20" />

            <div className="relative w-full h-11 md:h-18 overflow-hidden flex items-center justify-center z-20">
              {sponsors.map((sponsor, index) => (
                <div
                  key={sponsor.id}
                  className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    transform: currentSlide === index ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(10px)',
                    pointerEvents: currentSlide === index ? 'auto' : 'none',
                  }}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-6 md:h-10 object-contain brightness-110 max-w-[200px] md:max-w-[320px]"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.4';
                    }}
                  />
                  <span className="text-[9px] md:text-[10px] text-slate-300 font-medium mt-0.5 md:mt-1 tracking-wider">
                    {sponsor.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}