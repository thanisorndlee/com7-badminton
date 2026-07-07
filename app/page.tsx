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
    }, 3500);

    return () => clearInterval(timer);
  }, [sponsors.length]);

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

        @keyframes fadeLogo {
          from {
            opacity: 0;
            transform: scale(.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade {
          animation: fadeLogo .6s ease;
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/badminton-main.png"
          className="hidden md:block w-full h-full object-cover object-top"
        />
        <img
          src="/badminton-main-mobile-v3.PNG"
          className="block md:hidden w-full h-full object-cover object-[75%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      {/* Sponsor Box */}
      <div className="absolute bottom-10 z-20 w-full max-w-5xl px-4">
        <div className="w-full bg-black/60 border border-[#39ff14]/30 rounded-2xl backdrop-blur-md shadow-2xl p-6 relative overflow-hidden">
          
          {/* Light Effects */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="stage-beam left-[8%]" style={{ '--start': '-38deg', '--end': '-18deg' } as React.CSSProperties} />
            <div className="stage-beam left-[18%]" style={{ '--start': '-28deg', '--end': '-8deg' } as React.CSSProperties} />
            <div className="stage-beam left-[32%]" style={{ '--start': '-18deg', '--end': '8deg' } as React.CSSProperties} />
            <div className="stage-beam left-1/2 -translate-x-1/2" style={{ '--start': '-6deg', '--end': '6deg' } as React.CSSProperties} />
            <div className="stage-beam right-[32%]" style={{ '--start': '18deg', '--end': '-8deg' } as React.CSSProperties} />
            <div className="stage-beam right-[18%]" style={{ '--start': '28deg', '--end': '8deg' } as React.CSSProperties} />
            <div className="stage-beam right-[8%]" style={{ '--start': '38deg', '--end': '18deg' } as React.CSSProperties} />

            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[80%] h-24 bg-purple-500/25 blur-[45px]" />
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[65%] h-16 bg-[#39ff14]/20 blur-[35px]" />
          </div>

          <h3 className="text-center text-[#39ff14] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 relative z-30">
            SPONSORED BY
          </h3>

          <div className="relative z-30 border-t border-white/10 pt-8">
            <button
              onClick={() =>
                setCurrent((current - 1 + sponsors.length) % sponsors.length)
              }
              className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-[#39ff14]/40 bg-black/40 hover:bg-[#39ff14]/20 transition"
            >
              ❮
            </button>

            <button
              onClick={() => setCurrent((current + 1) % sponsors.length)}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-[#39ff14]/40 bg-black/40 hover:bg-[#39ff14]/20 transition"
            >
              ❯
            </button>

            <div className="h-[180px] flex justify-center items-center">
              <img
                key={current}
                src={sponsors[current].logo}
                alt={sponsors[current].name}
                className="max-h-[110px] max-w-[420px] object-contain animate-fade"
              />
            </div>

            <h2 className="text-center text-2xl font-black tracking-wider mt-2 text-white">
              {sponsors[current].name}
            </h2>

            <div className="flex justify-center gap-3 mt-5">
              {sponsors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
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