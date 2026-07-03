'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      const isGroupStage = String(match[1]) === "รอบแบ่งกลุ่ม";
      const search = searchTerm.toLowerCase();
      const found = String(match[0] || '').toLowerCase().includes(search) || 
                    String(match[1] || '').toLowerCase().includes(search) || 
                    String(match[3] || '').toLowerCase().includes(search) || 
                    String(match[4] || '').toLowerCase().includes(search);
      return isGroupStage && found;
    });
  }, [isFetched, matches, searchTerm]);

  // กล่อง Bracket แบบใหม่: แสดงแค่ชื่อคู่ที่ และชื่อทีม
  const BracketBox = ({ matchId, title }: { matchId: string; title: string }) => {
    const match = matches.find((r) => String(r[0]) === matchId);
    return (
      <div className="w-40 h-16 rounded-xl border border-[#39ff14]/30 bg-black/90 flex flex-col items-center justify-center px-3 shadow-[0_0_10px_rgba(57,255,20,0.1)] relative z-10">
        <span className="font-black text-[11px] text-white">{title}</span>
        <span className="text-[9px] text-slate-400">VS</span>
        <span className="font-bold text-[10px] text-emerald-400 truncate w-full text-center">
          {match?.[3] || "TBD"} / {match?.[4] || "TBD"}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans">
      <style jsx global>{`
        .bracket-line { position: absolute; border: 1px solid #39ff14; opacity: 0.4; }
      `}</style>

      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-8 border-b border-white/10 pb-6">ตารางการแข่งขัน</h1>

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
              {tableMatches.map((m, i) => (
                <tr key={i} className="hover:bg-white/5 h-[64px]">
                  <td className="text-center font-mono text-slate-400">{m[0]}</td>
                  <td className="px-4 text-xs">{m[1]}</td>
                  <td className="text-right text-lg font-black">{m[3] || '-'}</td>
                  <td className="text-center text-xs italic text-slate-500">VS</td>
                  <td className="text-left text-lg font-black">{m[4] || '-'}</td>
                  <td className="px-4"><div className="flex justify-center items-center gap-2 bg-black rounded-lg py-1 px-2 border border-white/10 w-24 mx-auto font-mono text-emerald-400 font-black">{m[5] || 0} : {m[6] || 0}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ผังการแข่งขันแบบโยงเส้นเข้าหากัน */}
        <div className="overflow-x-auto pb-8 pt-10">
          <div className="flex justify-center gap-16 min-w-[1200px] relative">
            {/* รอบ 16 */}
            <div className="flex flex-col gap-[72px] relative">
              <h3 className="text-center font-black text-[#39ff14] mb-4">รอบ 16 คู่</h3>
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} className="relative flex items-center">
                  <BracketBox matchId={String(i+1)} title={`คู่ที่ ${i+1}`} />
                  {i % 2 === 0 && <div className="bracket-line" style={{right:'-32px', width:'32px', top:'32px'}} />}
                  {i % 2 === 0 && <div className="bracket-line" style={{right:'-32px', width:'1px', height:'104px', top:'32px'}} />}
                </div>
              ))}
            </div>

            {/* รอบ 8 */}
            <div className="flex flex-col justify-center gap-[232px]">
              <h3 className="text-center font-black text-[#39ff14]">รอบ 8 คู่</h3>
              {Array.from({length: 8}).map((_, i) => (
                <div key={i} className="relative flex items-center">
                  <BracketBox matchId={String(i+1)} title={`คู่ที่ ${i+1}`} />
                  {i % 2 === 0 && <div className="bracket-line" style={{right:'-32px', width:'32px', top:'32px'}} />}
                  {i % 2 === 0 && <div className="bracket-line" style={{right:'-32px', width:'1px', height:'264px', top:'32px'}} />}
                </div>
              ))}
            </div>

            {/* รอบ 4 และ รอบชิง... (ทำโครงสร้างเดียวกัน) */}
          </div>
        </div>
      </div>
    </div>
  );
}