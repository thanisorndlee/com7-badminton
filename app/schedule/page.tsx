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
        if (data.matches) {
          setMatches(data.matches.slice(1));
        }
        setIsFetched(true);
      })
      .catch(() => {
        setIsFetched(true);
      });
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
      const found =
        String(match[0] || '').toLowerCase().includes(search) || 
        String(match[1] || '').toLowerCase().includes(search) || 
        String(match[4] || '').toLowerCase().includes(search) || 
        String(match[5] || '').toLowerCase().includes(search);
      const stagePass = stageFilter === 'ทั้งหมด' || String(match[1]) === stageFilter;
      const groupPass = groupFilter === 'ทั้งหมด' || String(match[2]) === groupFilter;
      return isGroupStage && found && stagePass && groupPass;
    });
  }, [isFetched, matches, searchTerm, stageFilter, groupFilter]);

  const BracketBox = ({ matchId, title }: { matchId: string; title: string }) => {
    const match = matches.find((r) => String(r[0]) === matchId);
    return (
      <div className="w-52 h-20 rounded-2xl border border-[#39ff14]/30 bg-gradient-to-br from-black/90 to-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(57,255,20,.15)] hover:scale-105 transition-all flex flex-col justify-center px-4 relative z-10">
        <span className="text-[10px] text-[#39ff14]/70 font-mono">MATCH #{matchId}</span>
        <span className="font-bold text-sm truncate">{match?.[4] || title}</span>
        <span className="text-center text-xs text-slate-400">VS</span>
        <span className="font-bold text-sm truncate">{match?.[5] || "TBD"}</span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans tracking-tight">
      <style jsx global>{`
        .bracket-line-h { position:absolute; height:2px; background:#39ff14; opacity:.45; }
        .bracket-line-v { position:absolute; width:2px; background:#39ff14; opacity:.45; }
      `}</style>
      
      <div className="absolute inset-0 z-0"><img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="BG" /></div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-8 rounded-[24px] relative z-10 mb-12 shadow-2xl">
        {/* ... ส่วนตารางข้อมูลของคุณคงเดิม ... */}
        
        <div className="border-t border-white/10 pt-16">
          <h2 className="text-center text-2xl font-black text-[#39ff14] mb-16 uppercase tracking-wide">ผังการแข่งขันรอบน็อกเอาต์</h2>
          <div className="overflow-x-auto pb-10">
            <div className="flex gap-20 min-w-[1300px] justify-center relative">
              
              <div className="flex flex-col gap-6 relative">
                <h3 className="text-center font-bold text-[#39ff14]">รอบ 16 ทีม</h3>
                {['25','26','27','28','29','30','31','32'].map((id, i) => (
                  <div key={id} className="relative flex items-center">
                    <BracketBox matchId={id} title={`คู่ที่ ${i + 1}`} />
                    {i % 2 === 0 && <div className="bracket-line-h" style={{ top: '64px', right: '-40px', width: '40px' }} />}
                    {i % 2 === 0 && <div className="bracket-line-v" style={{ top: '64px', right: '-40px', height: '112px' }} />}
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-center gap-[176px] relative">
                <h3 className="text-center font-bold text-[#39ff14]">รอบ 8 ทีม</h3>
                {['33','34','35','36'].map((id, i) => (
                  <div key={id} className="relative flex items-center">
                    <BracketBox key={id} matchId={id} title="" />
                    {i % 2 === 0 && <div className="bracket-line-h" style={{ top: '64px', right: '-40px', width: '40px' }} />}
                    {i % 2 === 0 && <div className="bracket-line-v" style={{ top: '64px', right: '-40px', height: '240px' }} />}
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-center gap-[432px] relative">
                <h3 className="text-center font-bold text-[#39ff14]">รอบรองฯ</h3>
                {['37','38'].map((id, i) => (
                   <div key={id} className="relative flex items-center">
                     <BracketBox key={id} matchId={id} title="" />
                     {i === 0 && <div className="bracket-line-h" style={{ top: '64px', right: '-40px', width: '40px' }} />}
                     {i === 0 && <div className="bracket-line-v" style={{ top: '64px', right: '-40px', height: '496px' }} />}
                   </div>
                ))}
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-center font-bold text-yellow-400">FINAL</h3>
                <BracketBox matchId="39" title="Championship" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}