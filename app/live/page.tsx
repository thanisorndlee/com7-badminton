'use client';

import React, { useMemo, useState } from 'react';

export default function StreamPage() {
  const [streams] = useState([
    {
      id: 1,
      title: 'จอที่ 1',
      live: true,
      embedUrl: 'https://www.youtube.com/embed/_8VzNiylL5I?si=aks0Knuo1F44uFv6',
      stage: 'รอบแบ่งกลุ่ม',
      group: 'กลุ่ม A',
      teamA: 'A1',
      teamB: 'A2',
      court: 'สนาม 1',
      status: 'LIVE',
    },
    {
      id: 2,
      title: 'จอที่ 2',
      live: true,
      embedUrl: 'https://www.youtube.com/embed/9MZADTdeTu8?autoplay=0&rel=0',
      stage: 'รอบแบ่งกลุ่ม',
      group: 'กลุ่ม B',
      teamA: 'B1',
      teamB: 'B2',
      court: 'สนาม 2',
      status: 'LIVE',
    },
    {
      id: 3,
      title: 'จอที่ 3',
      live: true,
      embedUrl: 'https://www.youtube.com/embed/n4lcJjsMEb0?autoplay=0&rel=0',
      stage: 'รอบแบ่งกลุ่ม',
      group: 'กลุ่ม C',
      teamA: 'C1',
      teamB: 'C2',
      court: 'สนาม 3',
      status: 'LIVE',
    },
  ]);

  const activeStreams = useMemo(() => {
return streams.filter((stream) => stream.live);
  }, [streams]);

  const gridClass =
    activeStreams.length === 1
      ? 'grid-cols-1 max-w-5xl'
      : activeStreams.length === 2
      ? 'grid-cols-1 lg:grid-cols-2 max-w-7xl'
      : 'grid-cols-1 lg:grid-cols-3 max-w-7xl';

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-8 pt-24 md:pt-28 select-none relative overflow-x-hidden flex flex-col items-center">

      <div className="absolute inset-0 z-0">
        <img
          src="/wall-ตารางการแข่งขัน.png"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

        <div className="relative z-10 w-full max-w-7xl mb-8
                bg-slate-950/70
                backdrop-blur-md
                border border-white/15
                rounded-[28px]
                px-8 py-7
                shadow-[0_20px_60px_rgba(0,0,0,.55)]">        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-3">
          Live Streams
        </span>

        <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-md">
          ถ่ายทอดสดการแข่งขัน
        </h1>

        <p className="text-sm text-slate-300 mt-2">
        เชิญรับชมการถ่ายทอดสดการแข่งขันแบดมินตัน COM7 Tournament
        จากทุกสนามแบบเรียลไทม์ พร้อมติดตามการแข่งขันของแต่ละคู่ได้ตลอดการแข่งขัน        
  </p>
      </div>

      <div className={`relative z-10 w-full grid ${gridClass} gap-6 transition-all duration-500`}>

        {activeStreams.map((stream) => (
          <div
            key={stream.id}
            className="bg-slate-950/80 border border-white/20 rounded-[24px] p-4 md:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-black">
                {stream.title}
              </span>

              <span className="flex items-center gap-2 text-xs font-black text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                {stream.status}
              </span>
            </div>

            <div className="w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full border-0"
                src={stream.embedUrl}
                title={stream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mt-4 bg-black/40 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">TEAM A</p>
                  <h2 className="text-2xl font-black text-white">{stream.teamA}</h2>
                </div>

                <div className="text-emerald-400 text-xl font-black">VS</div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">TEAM B</p>
                  <h2 className="text-2xl font-black text-white">{stream.teamB}</h2>
                </div>
              </div>

              <div className="mt-3 flex justify-center gap-2 text-[11px] font-bold text-slate-300">
                <span className="text-emerald-400">{stream.stage}</span>
                <span>•</span>
                <span>{stream.group}</span>
                <span>•</span>
                <span>{stream.court}</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}