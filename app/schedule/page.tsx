'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ทั้งหมด');
  const [groupFilter, setGroupFilter] = useState('ทั้งหมด');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec')
      .then((res) => res.json())
      .then((data) => {
        if (data.matches) setMatches(data.matches.slice(1));
        setIsFetched(true);
      })
      .catch(() => setIsFetched(true));
  }, []);

  const tableMatches = useMemo(() => {
  if (!isFetched) return [];

  return matches.filter((match) => {
    if (String(match[1]) !== "รอบแบ่งกลุ่ม") return false;
    const search = searchTerm.toLowerCase();

    return (
      String(match[0] || '').toLowerCase().includes(search) || // แมตช์
      String(match[1] || '').toLowerCase().includes(search) || // รอบ
      String(match[2] || '').toLowerCase().includes(search) || // กลุ่ม
      String(match[3] || '').toLowerCase().includes(search) || // TEAM A
      String(match[4] || '').toLowerCase().includes(search) || // TEAM B
      String(match[5] || '').toLowerCase().includes(search) || // คะแนน A
      String(match[6] || '').toLowerCase().includes(search)    // คะแนน B
    );
  });
}, [isFetched, matches, searchTerm]);

  // =============================
// ข้อมูลแต่ละรอบของสายการแข่งขัน
// =============================

const round16 = useMemo(() => {
  return matches.filter((m) => String(m[1]) === "รอบ 16 คู่");
}, [matches]);

const round8 = useMemo(() => {
  return matches.filter((m) => String(m[1]) === "รอบ 8 คู่");
}, [matches]);

const round4 = useMemo(() => {
  return matches.filter((m) => String(m[1]) === "รอบ 4 คู่");
}, [matches]);

const finalRound = useMemo(() => {
  return matches.filter((m) => String(m[1]) === "ชิงชนะเลิศ");
}, [matches]);

console.log(round16);
console.log(round8);
console.log(round4);
console.log(finalRound);

  const BracketBox = ({ match }: { match: any }) => {
  return (
    <div className="w-36 h-12 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-black/90 to-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.15)] hover:scale-105 transition-all flex items-center justify-center">
      <span className="text-white font-bold text-sm">
        {match[0]}
      </span>

    </div>
  );
};

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans">
      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-2xl">
<div className="mb-8 flex flex-col lg:flex-row items-start lg:items-end gap-6 border-b border-white/10 pb-6 w-full">
  {/* ฝั่งซ้าย */}
<div className="flex-1">
      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-1.5 shadow-sm">
      Tournament Schedule
    </span>

    <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">ตารางการแข่งขัน</h1>
    </div>
{/* ฝั่งขวา */}
<div className="relative w-full lg:w-[420px] ml-auto">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>

    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="ค้นหาแมตช์, รอบ, ทีม หรือคะแนน"
      className="w-full pl-12 pr-4 py-3 rounded-xl
                 bg-slate-900/80
                 border border-emerald-500/30
                 text-white
                 placeholder:text-slate-400
                 outline-none
                 focus:border-emerald-400
                 focus:ring-2
                 focus:ring-emerald-500/30"
    />
  </div>
</div>
        {/* ตารางแสดงผล */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 mb-12">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-black/90 text-[12px] text-slate-300 font-black uppercase border-b border-white/10">
                <th className="p-5 text-center">แมตช์</th>
                <th className="p-5">รอบ</th>
                <th className="p-5 text-right">TEAM A</th>
                <th className="p-5 text-center">VS</th>
                <th className="p-5 text-left">TEAM B</th>
                <th className="p-5 text-center">ผลคะแนน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-semibold">
              {tableMatches.length > 0 ? tableMatches.map((m, i) => (
                <tr key={i} className="hover:bg-white/5 h-[64px]">
                  <td className="text-center font-mono text-slate-400">{m[0]}</td>
                  <td className="px-4 text-xs">{m[1]}</td>
                  <td className="text-right text-base font-black">{m[3] || '-'}</td>
                  <td className="text-center text-xs italic text-slate-500">VS</td>
                  <td className="text-left text-base font-black">{m[4] || '-'}</td>
                  <td className="px-4"><div className="flex justify-center items-center gap-2 bg-black rounded-lg py-1 px-2 border border-white/10 w-24 mx-auto font-mono text-emerald-400 font-black">{m[5] || 0} : {m[6] || 0}</div></td>
                </tr>
              )) : <tr><td colSpan={6} className="p-10 text-center text-slate-500">ไม่พบข้อมูล</td></tr>}
            </tbody>
          </table>
        </div>

        {/* แผนผังการแข่งขัน */}
        <h2 className="text-3xl font-black text-emerald-400 text-center mb-12">แผนผังการแข่งขัน</h2>
        
<div className="overflow-x-auto pb-10">
<div className="relative w-max mx-auto flex gap-24 px-6"> 
    <svg
  xmlns="http://www.w3.org/2000/svg"
  className="absolute left-0 top-0 w-full h-[1360px] pointer-events-none z-0"
>
  {Array.from({ length: 8 }).map((_, i) => {
    const x1 = 168;
    const x2 = 264;
    const midX = 216;

    const yA = 72 + i * 160;
    const yB = 152 + i * 160;
    const yTarget = 112 + i * 160;

    return (
      <path
        key={`16-8-${i}`}
        d={`M${x1} ${yA} H${midX} V${yB} H${x1} M${midX} ${yTarget} H${x2}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />
    );
  })}

  {Array.from({ length: 4 }).map((_, i) => {
    const x1 = 408;
    const x2 = 504;
    const midX = 456;

    const yA = 112 + i * 320;
    const yB = 272 + i * 320;
    const yTarget = 192 + i * 320;

    return (
      <path
        key={`8-4-${i}`}
        d={`M${x1} ${yA} H${midX} V${yB} H${x1} M${midX} ${yTarget} H${x2}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />
    );
  })}

  {Array.from({ length: 2 }).map((_, i) => {
    const x1 = 648;
    const x2 = 744;
    const midX = 696;

    const yA = 192 + i * 640;
    const yB = 512 + i * 640;
    const yTarget = 352 + i * 640;

    return (
      <path
        key={`4-2-${i}`}
        d={`M${x1} ${yA} H${midX} V${yB} H${x1} M${midX} ${yTarget} H${x2}`}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />
    );
  })}
  {/* รอบ2 -> ถ้วย */}
<path
  d="M888 352 H970 V672 H1110"
  fill="none"
  stroke="#10b981"
  strokeWidth="3"
/>

<path
  d="M888 992 H970 V672 H1110"
  fill="none"
  stroke="#10b981"
  strokeWidth="3"
/>
</svg>

{/* ถ้วยรางวัล */}
<div className="relative w-36 h-[1280px]">
  <div
    className="absolute left-0 z-10 flex flex-col items-center"
    style={{ top: "610px" }}
  >
    <img
      src="/trophy.png"
      alt="Champion"
      className="w-28 drop-shadow-[0_0_25px_rgba(255,215,0,.8)]"
    />

    <p className="mt-3 text-center text-yellow-400 font-black text-xl">
      CHAMPION
    </p>
  </div>
</div>
   {/* รอบ 16 */}
<div className="flex flex-col">
  <h3 className="mb-6 text-center font-black text-emerald-400">
    รอบ 16 คู่
  </h3>

  <div className="relative w-36 h-[1280px]">
    {round16.map((match, i) => (
      <div
        key={i}
        className="absolute left-0 z-10"
        style={{
          top: `${i * 80}px`,
        }}
      >
        <BracketBox match={match} />
      </div>
    ))}
  </div>
</div>
{/* รอบ 8 */}
<div className="flex flex-col">
  <h3 className="mb-6 text-center font-black text-emerald-400">
    รอบ 8 คู่
  </h3>

  <div className="relative w-36 h-[1280px]">
    {round8.map((match, i) => (
      <div
        key={i}
        className="absolute left-0 z-10"
        style={{
          top: `${40 + i * 160}px`,
        }}
      >
        <BracketBox match={match} />
      </div>
    ))}
  </div>
</div>
            {/* รอบ 4 */}
<div className="flex flex-col">
  <h3 className="mb-6 text-center font-black text-emerald-400">
    รอบ 4 คู่
  </h3>

  <div className="relative w-36 h-[1280px]">
    {round4.map((match, i) => (
      <div
        key={i}
        className="absolute left-0 z-10"
        style={{
          top: `${120 + i * 320}px`,
        }}
      >
        <BracketBox match={match} />
      </div>
    ))}
  </div>
</div>
<div className="flex flex-col">
  <h3 className="mb-6 text-center font-black text-emerald-400">
    รอบ 2 คู่
  </h3>

  <div className="relative w-36 h-[1280px]">
    {finalRound.map((match, i) => (
      <div
        key={i}
        className="absolute left-0 z-10"
        style={{
          top: `${280 + i * 640}px`,
        }}
      >
        <BracketBox match={match} />
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
</div>
);
}