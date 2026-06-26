'use client';

import React, { useState } from 'react';

export default function StreamPage() {
  const [currentMatches] = useState([
    { id: 1, court: 'Court 1', time: '15:30 - 16:15', teamA: 'Thanaphat / Supakorn', teamB: 'Nattapong / Apisit', status: 'Live' },
    { id: 2, court: 'Court 2', time: '15:30 - 16:15', teamA: 'Peerapol / Chayut', teamB: 'Worameth / Siwach', status: 'Live' },
    { id: 3, court: 'Court 1', time: '16:15 - 17:00', teamA: 'Anan / Tossapol', teamB: 'Kittisak / Thanakor', status: 'Upcoming' },
  ]);

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-8 pt-24 md:pt-28 select-none relative overflow-x-hidden flex flex-col items-center">
      
      <div className="absolute inset-0 z-0">
        <img
          src="/wall-ตารางการแข่งขัน.png"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 mb-12">
        
        {/* กล่องที่ 1: LIVE STREAM MAIN */}
        <div className="lg:col-span-2 bg-slate-950/75 border border-white/20 p-5 md:p-6 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col justify-start items-start backdrop-blur-md">
          <div className="w-full mb-4 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs md:text-sm font-black tracking-wider uppercase text-red-500">
                LIVE STREAM MAIN
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-red-600 text-white font-black animate-pulse">LIVE</span>
          </div>

          <div className="w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/1IshlbrOzhU?autoplay=1&rel=0"
              title="YouTube live stream player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* 🎯 ปรับระยะและข้อความภาษาไทยใต้ไลฟ์สด */}
          <div className="mt-3.5 w-full text-left">
            <h2 className="text-base md:text-lg font-black text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.3)]">
              COM7 BADMINTON TOURNAMENT 2026 | Main Court
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">สามารถรับชมถ่ายทอดสดได้ขณะนี้</p>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* กล่องที่ 2: MATCH REPLAY / HIGHLIGHT */}
          <div className="bg-slate-950/75 border border-white/20 p-5 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-xs md:text-sm font-black tracking-wider text-slate-300 uppercase">
                MATCH REPLAY / HIGHLIGHT
              </span>
            </div>

            <div className="w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/UyneakgPiL8?rel=0"
                title="YouTube replay player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* 🎯 ปรับข้อความภาษาไทยใต้กล่องวิดีโอย้อนหลัง */}
            <div className="mt-3">
              <h4 className="text-xs md:text-sm font-bold text-white line-clamp-1">Group Stage Highlights | Men's Doubles</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">สามารถชมการแข่งขันย้อนหลัง</p>
            </div>
          </div>

          {/* กล่องที่ 3: CURRENT MATCHES (ปรับลดความห่างช่องไฟเพื่อให้ความสูงบีบพอดีขึ้น) */}
          <div className="bg-slate-950/75 border border-white/20 p-5 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md flex-grow flex flex-col justify-start">
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="text-xs md:text-sm font-black tracking-wider text-slate-300 uppercase">
                CURRENT MATCHES
              </span>
            </div>

            <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[220px] pr-1 scrollbar-thin">
              {currentMatches.map((match) => (
                <div key={match.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5 flex flex-col gap-1.5">
                  <div className="flex flex-row justify-between items-center text-[10px]">
                    <span className="text-[#39ff14] font-bold bg-[#39ff14]/10 px-1.5 py-0.5 rounded border border-[#39ff14]/20">{match.court}</span>
                    <span className="text-slate-400 font-mono">{match.time}</span>
                  </div>

                  <div className="flex flex-col gap-0.5 text-xs font-bold px-1">
                    <div className="flex justify-between text-slate-200">
                      <span>{match.teamA}</span>
                      <span className="text-[9px] text-slate-500 font-normal">Team A</span>
                    </div>
                    <div className="text-center text-[9px] text-[#39ff14]/40 font-black my-0.5">VS</div>
                    <div className="flex justify-between text-slate-200">
                      <span>{match.teamB}</span>
                      <span className="text-[9px] text-slate-500 font-normal">Team B</span>
                    </div>
                  </div>

                  <div className="w-full border-t border-white/5 my-0.5" />

                  <div className="flex justify-end">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                      match.status === 'Live'
                        ? 'text-amber-400 bg-amber-400/10 animate-pulse border border-amber-400/20'
                        : 'text-slate-400 bg-zinc-800'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}