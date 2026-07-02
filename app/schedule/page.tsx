'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [sheetResults, setSheetResults] = useState<any[]>([]);
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
        setSheetResults(data.results ? data.results.slice(1) : []);
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

  const getBracketTeamsText = (matchId: string, defaultTitle: string) => {
    const foundRow = sheetResults.find((r) => String(r[0] || '') === String(matchId));
    if (!foundRow) return defaultTitle;
    const teamA = foundRow[2] || 'TBD';
    const teamB = foundRow[3] || 'TBD';
    return `${teamA} vs ${teamB}`;
  };

  const MatchBox = ({ id, defaultTitle }: { id: string; defaultTitle: string }) => (
    <div className="relative w-44 h-12 border border-[#39ff14] rounded-xl bg-black/90 flex flex-col items-center justify-center px-3 text-[10px] font-bold text-white shadow-[0_0_15px_rgba(57,255,20,0.15)] transition-all hover:scale-105 duration-200">
      <span className="text-[8px] text-emerald-400 opacity-60 font-mono mb-0.5">MATCH #{id}</span>
      <div className="text-center truncate w-full text-slate-200">
        {isFetched ? getBracketTeamsText(id, defaultTitle) : 'กำลังโหลด...'}
      </div>
      <div className="absolute -right-6 top-1/2 w-6 h-px bg-[#39ff14] opacity-70"></div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative overflow-x-hidden flex flex-col items-center font-sans tracking-tight">
      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Tournament Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-1.5 shadow-sm">
              Tournament Schedule
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">
              ตารางการแข่งขัน
            </h1>
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
            <h3 className="text-3xl md:text-4xl font-black text-emerald-400 mt-1 font-mono tracking-tight">{isFetched ? matches.length : '...'}</h3>
          </div>
          <div className="bg-black/60 border border-white/10 p-5 rounded-xl shadow-inner">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">จำนวนทีมผู้สมัคร</p>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-1 font-mono tracking-tight">
              {isFetched ? `${statsAndFilters.uniqueTeamsCount} ทีม` : '...'}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 bg-black/50 p-3 rounded-xl border border-white/10 shadow-inner">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider text-[11px]">คัดกรอง:</span>
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="bg-slate-900 border border-white/20 text-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer font-bold min-w-[140px]">
            {statsAndFilters.uniqueStages.map((stage) => <option key={stage} value={stage}>{stage === 'ทั้งหมด' ? 'รอบทั้งหมด' : stage}</option>)}
          </select>
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} className="bg-slate-900 border border-white/20 text-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer font-bold min-w-[140px]">
            {statsAndFilters.uniqueGroups.map((group) => <option key={group} value={group}>{group === 'ทั้งหมด' ? 'กลุ่มทั้งหมด' : `กลุ่ม / สาย ${group}`}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 mb-16">
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
              {filteredMatches.map((match, index) => (
                <tr key={match[0] || index} className="hover:bg-white/5 transition-all duration-150 group h-[64px]">
                  <td className="p-4 text-center font-mono text-xs text-slate-400 font-bold">{`#${match[0] || '-'}`}</td>
                  <td className="p-4 text-sm font-bold">{match[1]}</td>
                  <td className="p-4 text-right text-lg font-black text-white">{match[4] || 'TBD'}</td>
                  <td className="p-2 text-center font-black text-slate-500 text-xs italic">VS</td>
                  <td className="p-4 text-left text-lg font-black text-white">{match[5] || 'TBD'}</td>
                  <td className="p-4">
                    <div className="w-full max-w-[110px] mx-auto bg-black/90 border border-white/15 px-3 py-1.5 rounded-xl shadow-md font-mono grid grid-cols-3 items-center text-center">
                      <span className="text-xs font-black text-emerald-400">{match[6] || 0}</span>
                      <span className="text-slate-500">:</span>
                      <span className="text-xs font-black text-emerald-400">{match[7] || 0}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 w-full flex flex-col items-center">
          <h2 className="text-center text-2xl font-black text-[#39ff14] mb-12 uppercase tracking-wide">ผังการแข่งขันรอบน็อกเอาต์</h2>
          <div className="flex gap-8 md:gap-14 justify-center items-center overflow-x-auto w-full pb-6 px-2">
            <div className="flex flex-col gap-4 min-w-[160px]">
              <h3 className="text-xs font-extrabold text-center opacity-60">รอบ 24 คู่</h3>
              {['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => <MatchBox key={id} id={id} defaultTitle={`คู่ที่ ${id}`} />)}
            </div>
            <div className="flex flex-col gap-[88px] justify-center min-w-[160px]">
              <h3 className="text-xs font-extrabold text-center opacity-60">รอบ 16 คู่</h3>
              {['9', '10', '11', '12'].map((id) => <MatchBox key={id} id={id} defaultTitle={`คู่ที่ ${id}`} />)}
            </div>
            <div className="flex flex-col gap-[236px] justify-center min-w-[160px]">
              <h3 className="text-xs font-extrabold text-center opacity-60">รอบ 8 คู่</h3>
              {['13', '14'].map((id) => <MatchBox key={id} id={id} defaultTitle={`คู่ที่ ${id}`} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}