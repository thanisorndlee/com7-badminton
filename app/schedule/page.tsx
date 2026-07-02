'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ทั้งหมด');
  const [groupFilter, setGroupFilter] = useState('ทั้งหมด');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    // ดึงข้อมูลจาก Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec')
      .then((res) => res.json())
      .then((data) => {
        // ใช้ข้อมูลจาก 'matches' และข้ามแถวแรก (Header)
        if (data.matches) {
          setMatches(data.matches.slice(1));
        }
        setIsFetched(true);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setIsFetched(true);
      });
  }, []);

  const statsAndFilters = useMemo(() => {
    if (!matches.length) return { uniqueTeamsCount: 0, uniqueStages: ['ทั้งหมด'], uniqueGroups: ['ทั้งหมด'] };
    
    // คอลัมน์ index 4 คือ TeamA, index 5 คือ TeamB
    const allTeams = matches.flatMap(m => [m[4], m[5]]).filter(Boolean);
    const uniqueTeamsCount = new Set(allTeams).size;
    
    // คอลัมน์ index 1 คือ Stage, index 2 คือ Group
    const uniqueStages = ['ทั้งหมด', ...Array.from(new Set(matches.map((m) => m[1]).filter(Boolean)))];
    const uniqueGroups = ['ทั้งหมด', ...Array.from(new Set(matches.map((m) => m[2]).filter(Boolean)))];
    
    return { uniqueTeamsCount, uniqueStages, uniqueGroups };
  }, [matches]);

  const filteredMatches = useMemo(() => {
    if (!isFetched) return [];
    
    return matches.filter((match) => {
      const search = searchTerm.toLowerCase();
      // match[0]=ID, match[1]=Stage, match[4]=TeamA, match[5]=TeamB
      const found =
        String(match[0] || '').toLowerCase().includes(search) || 
        String(match[1] || '').toLowerCase().includes(search) || 
        String(match[4] || '').toLowerCase().includes(search) || 
        String(match[5] || '').toLowerCase().includes(search);

      const stagePass = stageFilter === 'ทั้งหมด' || String(match[1]) === stageFilter;
      const groupPass = groupFilter === 'ทั้งหมด' || String(match[2]) === groupFilter;

      return found && stagePass && groupPass;
    });
  }, [isFetched, matches, searchTerm, stageFilter, groupFilter]);

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans tracking-tight">
      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Tournament Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-1.5 shadow-sm">
              Tournament Schedule
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">ตารางการแข่งขัน</h1>
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="ค้นหา แมตช์, ชื่อทีม, นักกีฬา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/80 border border-white/20 px-4 py-2.5 pl-11 rounded-xl text-xs text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/60 border border-white/10 p-5 rounded-xl shadow-inner">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">จำนวนนัดที่แข่งขัน</p>
            <h3 className="text-3xl font-black text-emerald-400 mt-1 font-mono">{filteredMatches.length}</h3>
          </div>
          <div className="bg-black/60 border border-white/10 p-5 rounded-xl shadow-inner">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">จำนวนทีมผู้สมัคร</p>
            <h3 className="text-3xl font-black text-white mt-1 font-mono">{statsAndFilters.uniqueTeamsCount} ทีม</h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 bg-black/50 p-3 rounded-xl border border-white/10 shadow-inner">
          <span className="text-[11px] text-slate-400 font-bold uppercase">คัดกรอง:</span>
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="bg-slate-900 border border-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold">
            {statsAndFilters.uniqueStages.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} className="bg-slate-900 border border-white/20 text-white rounded-lg px-3 py-1.5 text-xs font-bold">
            {statsAndFilters.uniqueGroups.map((g) => <option key={g} value={g}>{g === 'ทั้งหมด' ? 'กลุ่มทั้งหมด' : `กลุ่ม ${g}`}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
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
              {filteredMatches.length > 0 ? (
                filteredMatches.map((m, i) => (
                  <tr key={i} className="hover:bg-white/5 h-[64px]">
                    <td className="text-center font-mono text-slate-400">#{m[0]}</td>
                    <td className="px-4 text-xs">{m[1]} {m[2] && <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded ml-1 font-bold">{m[2]}</span>}</td>
                    <td className="text-right text-lg font-black">{m[4] || '-'}</td>
                    <td className="text-center text-xs italic text-slate-500">VS</td>
                    <td className="text-left text-lg font-black">{m[5] || '-'}</td>
                    <td className="px-4">
                      <div className="flex justify-center items-center gap-2 bg-black rounded-lg py-1 px-2 border border-white/10 w-24 mx-auto font-mono text-emerald-400 font-black">
                        {m[6] || 0} : {m[7] || 0}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-10 text-center text-slate-500">ไม่พบข้อมูล</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}