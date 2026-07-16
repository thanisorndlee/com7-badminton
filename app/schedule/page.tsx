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

  const search = searchTerm.trim().toLowerCase();

  return matches.filter((match) => {
    // ตารางด้านบนแสดงเฉพาะรอบแบ่งกลุ่ม 36 แมตช์
    if (String(match[1] || '').trim() !== 'รอบแบ่งกลุ่ม') {
      return false;
    }

    // ถ้าไม่ได้ค้นหา ให้แสดงทั้งหมด
    if (!search) {
      return true;
    }

    // ค้นหาได้จากทุกข้อมูลในตาราง
    return [
      match[0],  // MatchID
      match[1],  // Stage
      match[2],  // MatchDate
      match[3],  // MatchTime
      match[4],  // Court
      match[5],  // Group

      match[6],  // TeamA
      match[7],  // TeamAPlayer1
      match[8],  // TeamADept1
      match[9],  // TeamAPlayer2
      match[10], // TeamADept2

      match[11], // TeamB
      match[12], // TeamBPlayer1
      match[13], // TeamBDept1
      match[14], // TeamBPlayer2
      match[15], // TeamBDept2

      match[16], // ScoreA
      match[17], // ScoreB
    ].some((value) =>
      String(value || '').toLowerCase().includes(search)
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
const getGroupClass = (group: string) => {
  const normalizedGroup = String(group || '')
    .trim()
    .toUpperCase();

  const groupClasses: Record<string, string> = {
    A: 'bg-emerald-500/90 border-emerald-300/50 text-white shadow-[0_0_14px_rgba(16,185,129,.35)]',
    B: 'bg-blue-500/90 border-blue-300/50 text-white shadow-[0_0_14px_rgba(59,130,246,.35)]',
    C: 'bg-violet-500/90 border-violet-300/50 text-white shadow-[0_0_14px_rgba(139,92,246,.35)]',
    D: 'bg-orange-500/90 border-orange-300/50 text-white shadow-[0_0_14px_rgba(249,115,22,.35)]',
    E: 'bg-pink-500/90 border-pink-300/50 text-white shadow-[0_0_14px_rgba(236,72,153,.35)]',
    F: 'bg-cyan-500/90 border-cyan-300/50 text-white shadow-[0_0_14px_rgba(6,182,212,.35)]',
  };

  return (
    groupClasses[normalizedGroup] ||
    'bg-slate-600 border-slate-400/40 text-white'
  );
};

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans">
      <div className="absolute inset-0 z-0">
        <img src="/badminton-bg.jpg"
         className="w-full h-full object-fill opacity-85" alt="Background" />
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
<table className="w-full text-sm text-left border-collapse min-w-[1050px]">
  <thead>
  <tr className="bg-black/90 text-[11px] text-slate-300 font-black uppercase border-b border-white/10">
    <th className="px-3 py-5 text-center whitespace-nowrap">
      วันที่
    </th>

    <th className="px-3 py-5 text-center whitespace-nowrap">
      เวลา
    </th>

    <th className="px-3 py-5 text-center whitespace-nowrap">
      สนาม
    </th>

    <th className="px-3 py-5 text-center whitespace-nowrap">
      สาย
    </th>

    <th className="px-3 py-5 text-left min-w-[210px]">
      TEAM
    </th>

    <th className="px-1 py-5 text-center w-10">
      VS
    </th>

    <th className="px-3 py-5 text-left min-w-[210px]">
      TEAM
    </th>

    <th className="px-3 py-5 text-center whitespace-nowrap">
      ผลคะแนน
    </th>
  </tr>
</thead>
            <tbody className="divide-y divide-white/10 font-semibold">
  {tableMatches.length > 0 ? (
    tableMatches.map((m, i) => {
      const group = String(m[5] || '').trim();

      const scoreA =
        m[16] === '' || m[16] === null || m[16] === undefined
          ? '-'
          : m[16];

      const scoreB =
        m[17] === '' || m[17] === null || m[17] === undefined
          ? '-'
          : m[17];

      return (
        <tr
          key={`${m[0]}-${i}`}
          className="hover:bg-white/5 transition-colors"
        >
          {/* วันที่ */}
          <td className="px-3 py-5 text-center text-xs text-slate-300 whitespace-nowrap">
            {m[2] || '-'}
          </td>

          {/* เวลา */}
          <td className="px-3 py-5 text-center text-sm font-black text-white whitespace-nowrap">
            {m[3] || '-'}
          </td>

          {/* สนาม */}
          <td className="px-3 py-5 text-center text-xs text-slate-200 whitespace-nowrap">
            {m[4] || '-'}
          </td>

          {/* สาย */}
          <td className="px-3 py-5 text-center">
            <span
              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-base font-black ${getGroupClass(
                group
              )}`}
            >
              {group || '-'}
            </span>
          </td>

          {/* TEAM ฝั่งซ้าย */}
          <td className="px-4 py-5">
            <div className="flex items-start gap-2">
<div className="min-w-[40px] rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-center text-sm font-black text-white">
                {m[6] || '-'}
              </div>

              <div className="min-w-0 space-y-3">
                <div>
                  <p className="text-sm font-black text-white leading-tight">
                    {m[7] || '-'}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-emerald-400">
                    {m[8] ? `แผนก ${m[8]}` : 'ไม่ระบุแผนก'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-black text-white leading-tight">
                    {m[9] || '-'}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-emerald-400">
                    {m[10] ? `แผนก ${m[10]}` : 'ไม่ระบุแผนก'}
                  </p>
                </div>
              </div>
            </div>
          </td>

          {/* VS */}
<td className="px-1 py-5 text-center w-10">
              <span className="text-sm italic font-black text-slate-500">
              VS
            </span>
          </td>

          {/* TEAM ฝั่งขวา */}
          <td className="px-4 py-5">
            <div className="flex items-start gap-3">
              <div className="min-w-[44px] rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-center text-sm font-black text-white">
                {m[11] || '-'}
              </div>

              <div className="min-w-0 space-y-3">
                <div>
                  <p className="text-sm font-black text-white leading-tight">
                    {m[12] || '-'}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-emerald-400">
                    {m[13] ? `แผนก ${m[13]}` : 'ไม่ระบุแผนก'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-black text-white leading-tight">
                    {m[14] || '-'}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-emerald-400">
                    {m[15] ? `แผนก ${m[15]}` : 'ไม่ระบุแผนก'}
                  </p>
                </div>
              </div>
            </div>
          </td>

          {/* คะแนน */}
          <td className="px-3 py-5">
            <div className="mx-auto flex w-24 items-center justify-center gap-2 rounded-lg border border-white/10 bg-black px-2 py-2 font-mono font-black text-emerald-400">
              {scoreA} : {scoreB}
            </div>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td
        colSpan={8}
        className="p-10 text-center text-slate-500"
      >
        ไม่พบข้อมูล
      </td>
    </tr>
  )}
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
  d="M888 352 H940 V560 H1010"
  fill="none"
  stroke="#10b981"
  strokeWidth="3"
/>

<path
  d="M888 992 H940 V560 H1010"
  fill="none"
  stroke="#10b981"
  strokeWidth="3"
/>
</svg>
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
    รอบชิงชนะเลิศ 🏆
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
<div className="flex flex-col">
  <h3 className="mb-6 opacity-0">ถ้วย</h3>

  <div className="relative w-36 h-[1280px]">
    <div
      className="absolute left-0 z-10 flex flex-col items-center"
      style={{ top: "480px" }}
    >
      <div className="absolute w-40 h-40 rounded-full bg-yellow-400/20 blur-3xl -z-10"></div>
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
</div>
        </div>
      </div>
    </div>
</div>
);
}