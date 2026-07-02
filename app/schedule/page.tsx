'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ทั้งหมด');
  const [groupFilter, setGroupFilter] = useState('ทั้งหมด');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetch(
      'https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec'
    )
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches.slice(1));
        setIsFetched(true);
      })
      .catch(() => {
        setIsFetched(true);
      });
  }, []);

  // ⚡ SPEED OPTIMIZATION: ใช้ useMemo จำค่าสถิติจำนวนทีม ไม่ให้รันลูปซ้ำทุกครั้งที่พิมพ์ค้นหา หน้าเว็บจะเร็วขึ้นมาก
  const statsAndFilters = useMemo(() => {
    if (!matches.length) return { uniqueTeamsCount: 0, uniqueStages: ['ทั้งหมด'], uniqueGroups: ['ทั้งหมด'] };
    
    const allTeams = matches.flatMap(m => [m[4], m[5]]).filter(Boolean);
    const uniqueTeamsCount = new Set(allTeams).size;
    
    const uniqueStages = ['ทั้งหมด', ...Array.from(new Set(matches.map((m) => m[1]).filter(Boolean)))];
    const uniqueGroups = ['ทั้งหมด', ...Array.from(new Set(matches.map((m) => m[2]).filter(Boolean)))];
    
    return { uniqueTeamsCount, uniqueStages, uniqueGroups };
  }, [matches]);

  // ⚡ SPEED OPTIMIZATION: ครอบจูนระบบตัวกรองค้นหาด้วย useMemo ลดภาระ CPU เว็บหายหน่วงทันที
  const filteredMatches = useMemo(() => {
    if (!isFetched) return Array(6).fill([null, null, null, null, null, null, null, null, null]);
    
    return matches.filter((match) => {
      const search = searchTerm.toLowerCase();
      const found =
        String(match[0] || '').toLowerCase().includes(search) || 
        String(match[1] || '').toLowerCase().includes(search) || 
        String(match[4] || '').toLowerCase().includes(search) || 
        String(match[5] || '').toLowerCase().includes(search);

      const stagePass = stageFilter === 'ทั้งหมด' || match[1] === stageFilter;
      const groupPass = groupFilter === 'ทั้งหมด' || match[2] === groupFilter;

      return found && stagePass && groupPass;
    });
  }, [isFetched, matches, searchTerm, stageFilter, groupFilter]);

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative overflow-x-hidden flex flex-col items-center font-sans tracking-tight">
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap" rel="stylesheet" />

      <style jsx global>{`
        body, html {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
      `}</style>

      {/* 🏞️ รูปพื้นหลังหลัก */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wall-ตารางการแข่งขัน.png"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

      {/* 📦 กล่อง Dashboard */}
      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-1.5 shadow-sm">
              Tournament Schedule
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">
              ตารางการแข่งขัน
            </h1>
          </div>

          {/* 🔍 ช่องค้นหา */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="ค้นหา แมตช์, ชื่อทีม, นักกีฬา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/80 border border-white/20 px-4 py-2.5 pl-11 rounded-xl text-xs text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-500 font-medium"
            />
            <div className="absolute left-4 top-3.5 text-slate-500 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 📊 การ์ดสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-black/60 border border-white/10 p-5 rounded-xl shadow-inner">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">จำนวนนัดที่แข่งขัน</p>
            <h3 className="text-3xl md:text-4xl font-black text-emerald-400 mt-1 font-mono tracking-tight">{isFetched ? matches.length : '...'}</h3>
          </div>
          <div className="bg-black/60 border border-white/10 p-5 rounded-xl shadow-inner">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">จำนวนทีมผู้สมัคร</p>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-1 font-mono tracking-tight">
              {isFetched ? `${statsAndFilters.uniqueTeamsCount} ทีม` : '...'}
            </h3>
          </div>
        </div>

        {/* 🎛️ กล่องตัวกรอง */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-black/50 p-3 rounded-xl border border-white/10 shadow-inner">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider text-[11px]">คัดกรอง:</span>
          
          <div className="flex flex-col gap-1">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-slate-900 border border-white/20 text-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer font-bold min-w-[140px]"
            >
              {statsAndFilters.uniqueStages.map((stage) => (
                <option key={stage} value={stage}>{stage === 'ทั้งหมด' ? 'รอบทั้งหมด' : stage}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="bg-slate-900 border border-white/20 text-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer font-bold min-w-[140px]"
            >
              {statsAndFilters.uniqueGroups.map((group) => (
                <option key={group} value={group}>{group === 'ทั้งหมด' ? 'กลุ่มทั้งหมด' : `กลุ่ม / สาย ${group}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 📊 ตารางแสดงผล */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-black/90 text-[12px] text-slate-300 font-black uppercase tracking-widest border-b border-white/10">
                <th className="p-5 text-center w-24">แมตช์</th>
                <th className="p-5 w-48">รอบการแข่ง</th>
                <th className="p-5 text-right w-1/3 text-slate-200">TEAM A</th>
                <th className="p-5 text-center w-16">VS</th>
                <th className="p-5 text-left w-1/3 text-slate-200">TEAM B</th>
                <th className="p-5 text-center w-40">ผลคะแนน</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10 font-semibold">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => {
                  const isRowLoading = !isFetched;

                  const scoreA = match[6];
                  const scoreB = match[7];

                  return (
                    <tr 
                      key={match[0] || index} 
                      className="hover:bg-white/5 transition-all duration-150 group h-[64px]"
                    >
                      {/* Match ID */}
                      <td className="p-4 text-center font-mono text-xs text-slate-400 font-bold">
                        {isRowLoading ? <div className="w-6 h-4 bg-white/20 rounded mx-auto animate-pulse" /> : `#${match[0]}`}
                      </td>

                      {/* รอบการแข่ง */}
                      <td className="p-4 text-sm font-bold">
                        {isRowLoading ? (
                          <div className="w-24 h-5 bg-white/20 rounded animate-pulse" />
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-slate-200">
                              {match[1]}
                            </span>
                            {match[2] && (
                              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-black border border-emerald-500/20">
                                {match[2]}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Team A */}
                      <td className="p-4 text-right text-lg md:text-xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-wide drop-shadow-md">
                        {isRowLoading ? (
                          <div className="w-24 h-4 bg-white/20 rounded ml-auto animate-pulse" />
                        ) : (
                          match[4] || <span className="text-slate-600 font-normal text-xs italic">TBD</span>
                        )}
                      </td>

                      {/* VS */}
                      <td className="p-2 text-center font-black text-slate-500 text-xs italic">
                        VS
                      </td>

                      {/* Team B */}
                      <td className="p-4 text-left text-lg md:text-xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-wide drop-shadow-md">
                        {isRowLoading ? (
                          <div className="w-24 h-4 bg-white/20 rounded animate-pulse" />
                        ) : (
                          match[5] || <span className="text-slate-600 font-normal text-xs italic">TBD</span>
                        )}
                      </td>

                      {/* 🛠️ FIX โครงสร้างช่องผลคะแนน: ใช้ระบบ Grid บังคับแยกฝั่งซ้าย-ขวาอย่างสมดุล ป้องกันคะแนนดีดหล่นลงมาซ้อนแนวตั้งเวลาหดหน้าจอ 100% */}
                      <td className="p-4">
                        {isRowLoading ? (
                          <div className="w-20 h-6 bg-white/20 rounded mx-auto animate-pulse" />
                        ) : (
                          <div className="w-full max-w-[110px] mx-auto bg-black/90 border border-white/15 px-3 py-1.5 rounded-xl shadow-md font-mono grid grid-cols-3 items-center">
                            <span className="text-xs md:text-sm font-black text-emerald-400 text-right">
                              {scoreA !== undefined && scoreA !== '' ? scoreA : 0}
                            </span>
                            <span className="text-slate-500 font-bold text-center">:</span>
                            <span className="text-xs md:text-sm font-black text-emerald-400 text-left">
                              {scoreB !== undefined && scoreB !== '' ? scoreB : 0}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-xs text-zinc-500 font-medium tracking-wide">
                    ❌ ไม่พบข้อมูลแมตช์การแข่งขันตามเงื่อนไขที่เลือก
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}