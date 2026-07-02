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
        @keyframes sweep1  {0%,100%{transform:rotate(-75deg)}50%{transform:rotate(-30deg)}}
        @keyframes sweep2  {0%,100%{transform:rotate(-60deg)}50%{transform:rotate(-20deg)}}
        @keyframes sweep3  {0%,100%{transform:rotate(-45deg)}50%{transform:rotate(-10deg)}}
        @keyframes sweep4  {0%,100%{transform:rotate(-30deg)}50%{transform:rotate(0deg)}}
        @keyframes sweep5  {0%,100%{transform:rotate(-15deg)}50%{transform:rotate(10deg)}}
        @keyframes sweep6  {0%,100%{transform:rotate(-5deg)}50%{transform:rotate(20deg)}}
        @keyframes sweep7  {0%,100%{transform:rotate(5deg)}50%{transform:rotate(-20deg)}}
        @keyframes sweep8  {0%,100%{transform:rotate(15deg)}50%{transform:rotate(-10deg)}}
        @keyframes sweep9  {0%,100%{transform:rotate(30deg)}50%{transform:rotate(0deg)}}
        @keyframes sweep10 {0%,100%{transform:rotate(45deg)}50%{transform:rotate(10deg)}}
        @keyframes sweep11 {0%,100%{transform:rotate(60deg)}50%{transform:rotate(20deg)}}
        @keyframes sweep12 {0%,100%{transform:rotate(75deg)}50%{transform:rotate(30deg)}}

        .spotlight{
            position:absolute; top:-35px; left:50%;
            margin-left:-250px; /* ปรับให้สัมพันธ์กับ width 500px */
            width:500px; height:700px;
            transform-origin:50% 0%;
            background:linear-gradient(to bottom, rgba(255,255,255,.6) 0%, rgba(57,255,20,.3) 10%, rgba(57,255,20,.1) 40%, transparent 100%);
            /* ปรับให้กว้างขึ้น */
            clip-path:polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            mix-blend-mode:screen; filter:blur(15px); opacity:.25; pointer-events:none;
        }

        .s1{animation:sweep1 5s ease-in-out infinite alternate;}
        .s2{animation:sweep2 5.2s ease-in-out infinite alternate;}
        .s3{animation:sweep3 4.8s ease-in-out infinite alternate;}
        .s4{animation:sweep4 5.5s ease-in-out infinite alternate;}
        .s5{animation:sweep5 4.9s ease-in-out infinite alternate;}
        .s6{animation:sweep6 5.1s ease-in-out infinite alternate;}
        .s7{animation:sweep7 4.7s ease-in-out infinite alternate;}
        .s8{animation:sweep8 5.3s ease-in-out infinite alternate;}
        .s9{animation:sweep9 4.6s ease-in-out infinite alternate;}
        .s10{animation:sweep10 5.0s ease-in-out infinite alternate;}
        .s11{animation:sweep11 4.8s ease-in-out infinite alternate;}
        .s12{animation:sweep12 5.2s ease-in-out infinite alternate;}
      `}</style>

      <div className="absolute inset-0 z-0 bg-black">
        <img src="/badminton-main.png" className="hidden md:block w-full h-full object-cover object-top" />
        <img src="/badminton-main-mobile-v3.PNG" className="block md:hidden w-full h-full object-cover object-[75%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      <div className="absolute bottom-10 z-20 w-full max-w-5xl px-4">
        <div className="w-full bg-black/60 border border-[#39ff14]/30 rounded-2xl backdrop-blur-md shadow-2xl p-6 relative overflow-hidden">
          
          {['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12'].map(c=>(
              <div key={c} className={`spotlight ${c}`}></div>
          ))}

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