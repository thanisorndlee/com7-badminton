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
      const isGroupStage = String(match[1]) === "รอบแบ่งกลุ่ม";
      const search = searchTerm.toLowerCase();
      const found = String(match[0] || '').toLowerCase().includes(search) || 
                    String(match[1] || '').toLowerCase().includes(search) || 
                    String(match[3] || '').toLowerCase().includes(search) || 
                    String(match[4] || '').toLowerCase().includes(search);
      const stagePass = stageFilter === 'ทั้งหมด' || String(match[1]) === stageFilter;
      const groupPass = groupFilter === 'ทั้งหมด' || String(match[2]) === groupFilter;
      return isGroupStage && found && stagePass && groupPass;
    });
  }, [isFetched, matches, searchTerm, stageFilter, groupFilter]);

  const BracketBox = ({ title }: { title: string }) => (
    <div className="w-40 h-16 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-black/90 to-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.15)] hover:scale-105 transition-all flex flex-col items-center justify-center relative z-10">
      <span className="font-black text-[14px] text-white tracking-wide">{title}</span>
    </div>
  );

  // 1. Component เส้นเชื่อม
  const BracketLine = ({ height = 96 }: { height?: number }) => (
    <>
      <div className="absolute left-full top-1/2 w-6 h-[2px] bg-emerald-400" />
      <div
        className="absolute left-[calc(100%+24px)] top-1/2 w-[2px] bg-emerald-400"
        style={{ height }}
      />
      <div
        className="absolute left-[calc(100%+24px)] w-6 h-[2px] bg-emerald-400"
        style={{ top: `calc(50% + ${height / 2}px)` }}
      />
    </>
  );

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans">
      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-2xl">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-1.5 shadow-sm">Tournament Schedule</span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">ตารางการแข่งขัน</h1>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 mb-12">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
             {/* ... ตารางเหมือนเดิม ... */}
          </table>
        </div>

        <h2 className="text-3xl font-black text-emerald-400 text-center mb-12">แผนผังการแข่งขัน</h2>
        
        <div className="flex justify-center gap-10 overflow-x-auto pb-10">
            {/* รอบ 16 */}
            <div className="flex flex-col">
                <h3 className="mb-6 text-center font-black text-emerald-400">รอบ 16 คู่</h3>
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="relative h-20">
                            <BracketBox title={`คู่ที่ ${i + 1}`} />
                            {i % 2 === 0 && <BracketLine height={78} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* รอบ 8 */}
            <div className="flex flex-col mt-[42px]">
                <h3 className="mb-6 text-center font-black text-emerald-400">รอบ 8 คู่</h3>
                <div className="flex flex-col gap-[76px]">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="relative h-20">
                            <BracketBox title={`คู่ที่ ${i + 1}`} />
                            {i % 2 === 0 && <BracketLine height={170} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* รอบ 4 */}
            <div className="flex flex-col mt-[150px]">
                <h3 className="mb-6 text-center font-black text-emerald-400">รอบ 4 คู่</h3>
                <div className="flex flex-col gap-[240px]">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="relative h-20">
                            <BracketBox title={`คู่ที่ ${i + 1}`} />
                            {i % 2 === 0 && <BracketLine height={330} />}
                        </div>
                    ))}
                </div>
            </div>

            {/* รอบชิง */}
            <div className="flex flex-col mt-[360px] relative">
                <h3 className="mb-6 text-center font-black text-emerald-400">รอบ 2 คู่</h3>
                <div className="relative">
                    <div className="absolute -left-12 top-1/2 w-12 h-[2px] bg-emerald-400" />
                    <BracketBox title="ชิงชนะเลิศ" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}