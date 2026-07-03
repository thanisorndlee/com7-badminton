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

  const statsAndFilters = useMemo(() => {
    if (!matches.length) return { uniqueTeamsCount: 0, uniqueStages: ['ทั้งหมด'], uniqueGroups: ['ทั้งหมด'] };
    const allTeams = matches.flatMap(m => [m[4], m[5]]).filter(Boolean);
    const uniqueTeamsCount = new Set(allTeams).size;
    const uniqueStages = ['ทั้งหมด', ...Array.from(new Set(matches.map((m) => m[1]).filter(Boolean)))];
    const uniqueGroups = ['ทั้งหมด', ...Array.from(new Set(matches.map((m) => m[2]).filter(Boolean)))];
    return { uniqueTeamsCount, uniqueStages, uniqueGroups };
  }, [matches]);

  const tableMatches = useMemo(() => {
    if (!isFetched) return [];
    return matches.filter((match) => {
      const isGroupStage = String(match[1]) === "รอบแบ่งกลุ่ม";
      const search = searchTerm.toLowerCase();
      const found = String(match[0] || '').toLowerCase().includes(search) || String(match[1] || '').toLowerCase().includes(search) || String(match[4] || '').toLowerCase().includes(search) || String(match[5] || '').toLowerCase().includes(search);
      return isGroupStage && found;
    });
  }, [isFetched, matches, searchTerm]);

  // ฟังก์ชันดึงข้อมูลที่ถูกต้องตาม ID และ Stage
  const getMatchData = (id: string, stage: string) => {
    return matches.find((r) => String(r[0]) === id && String(r[1]) === stage);
  };

  const BracketBox = ({ matchId, stage, title }: { matchId: string; stage: string; title: string }) => {
    const match = getMatchData(matchId, stage);
    return (
      <div className="w-40 h-16 rounded-2xl border border-[#39ff14]/30 bg-gradient-to-br from-black/90 to-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(57,255,20,.15)] hover:scale-105 transition-all flex flex-col justify-center px-4 relative z-10">
        <span className="text-[9px] text-[#39ff14]/70 font-mono">MATCH #{matchId}</span>
        <span className="font-bold text-[11px] truncate">{match?.[4] || title}</span>
        <span className="text-center text-[9px] text-slate-400">VS</span>
        <span className="font-bold text-[11px] truncate">{match?.[5] || "TBD"}</span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans tracking-tight">
      <style jsx global>{`
        .bracket-line-h { position:absolute; height:2px; background:#39ff14; opacity:.45; }
        .bracket-line-v { position:absolute; width:2px; background:#39ff14; opacity:.45; }
      `}</style>
      
      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-8 border-b border-white/10 pb-6">ตารางการแข่งขัน</h1>

        {/* ตารางเฉพาะรอบแบ่งกลุ่ม */}
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
                  <td className="text-center font-mono text-slate-400">#{m[0]}</td>
                  <td className="px-4 text-xs">{m[1]}</td>
                  <td className="text-right text-lg font-black">{m[4] || '-'}</td>
                  <td className="text-center text-xs italic text-slate-500">VS</td>
                  <td className="text-left text-lg font-black">{m[5] || '-'}</td>
                  <td className="px-4"><div className="flex justify-center items-center gap-2 bg-black rounded-lg py-1 px-2 border border-white/10 w-24 mx-auto font-mono text-emerald-400 font-black">{m[6] || 0} : {m[7] || 0}</div></td>
                </tr>
              )) : <tr><td colSpan={6} className="p-10 text-center text-slate-500">ไม่พบข้อมูล</td></tr>}
            </tbody>
          </table>
        </div>

        {/* ผังการแข่งขัน น็อกเอาต์ */}
        <div className="overflow-x-auto pb-8 relative">
          <div className="flex justify-center gap-16 min-w-[1200px]">
            {[
              { label: 'รอบ 16 คู่', stage: 'รอบ 16 คู่', count: 16 },
              { label: 'รอบ 8 คู่', stage: 'รอบ 8 คู่', count: 8 },
              { label: 'รอบ 4 คู่', stage: 'รอบ 4 คู่', count: 4 },
              { label: 'ชิงชนะเลิศ', stage: 'ชิงชนะเลิศ', count: 1 }
            ].map((round, idx) => (
              <div key={round.stage} className="w-44 flex flex-col items-center">
                <h3 className="text-center text-lg font-black text-[#39ff14] mb-8">{round.label}</h3>
                <div className={`h-[900px] flex flex-col ${idx === 0 ? 'justify-between' : idx === 1 ? 'justify-evenly' : idx === 2 ? 'justify-around' : 'items-center justify-center'}`}>
                  {Array.from({ length: round.count }).map((_, i) => (
                    <div key={i} className="relative">
                      <BracketBox matchId={String(i + 1)} stage={round.stage} title={`คู่ ${i + 1}`} />
                      {idx < 3 && i % 2 === 0 && <div className="bracket-line-h" style={{ top: '50%', left: '160px', width: '32px' }} />}
                      {idx < 3 && i % 2 === 0 && <div className="bracket-line-v" style={{ top: '50%', left: '192px', height: idx === 0 ? '80px' : idx === 1 ? '160px' : '320px' }} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}