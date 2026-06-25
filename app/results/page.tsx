'use client';

import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [results, setMatches] = useState<any[]>([]);
  // 🛠️ เพิ่ม State สำหรับเก็บข้อมูลที่มาจากแท็บ Results ใน Google Sheets
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
        // 🛠️ สอยก้อนข้อมูลจากแท็บ results ใน Google Sheets มารอไว้
        setSheetResults(data.results ? data.results.slice(1) : []);
        setIsFetched(true);
      })
      .catch(() => {
        setIsFetched(true);
      });
  }, []);

  const uniqueStages = ['ทั้งหมด', ...Array.from(new Set(results.map((m) => m[1]).filter(Boolean)))];
  const uniqueGroups = ['ทั้งหมด', ...Array.from(new Set(results.map((m) => m[2]).filter(Boolean)))];

  const filteredResults = isFetched
    ? results.filter((row) => {
        const search = searchTerm.toLowerCase();

        const found =
          String(row[0] || '').toLowerCase().includes(search) || 
          String(row[1] || '').toLowerCase().includes(search) || 
          String(row[4] || '').toLowerCase().includes(search) || 
          String(row[5] || '').toLowerCase().includes(search);

        const stagePass = stageFilter === 'ทั้งหมด' || row[1] === stageFilter;
        const groupPass = groupFilter === 'ทั้งหมด' || row[2] === groupFilter;

        return found && stagePass && groupPass;
      })
    : Array(6).fill([null, null, null, null, null, null, null, null, null]);

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative overflow-x-hidden flex flex-col items-center">
      
      {/* 🏞️ รูปพื้นหลังหลัก */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wall-สรุปผลการแข่ง.png"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

      {/* 📦 กล่อง Dashboard */}
      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-bold tracking-wider uppercase border border-emerald-500/20 inline-block mb-1.5">
              Tournament Results
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              สรุปผลการแข่งขัน
            </h1>
          </div>

          {/* 🔍 ช่องค้นหา */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="ค้นหา แมตช์, ชื่อทีม, นักกีฬา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/80 border border-white/20 px-4 py-2.5 pl-11 rounded-xl text-xs text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* 🎛️ กล่องตัวกรอง */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-black/50 p-3 rounded-xl border border-white/10 shadow-inner">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider text-[11px]">คัดกรองผล:</span>
          
          <div className="flex flex-col gap-1">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-slate-900 border border-white/20 text-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer font-semibold min-w-[140px]"
            >
              {uniqueStages.map((stage) => (
                <option key={stage} value={stage}>{stage === 'ทั้งหมด' ? 'รอบทั้งหมด' : stage}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="bg-slate-900 border border-white/20 text-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-emerald-500 cursor-pointer font-semibold min-w-[140px]"
            >
              {uniqueGroups.map((group) => (
                <option key={group} value={group}>{group === 'ทั้งหมด' ? 'กลุ่มทั้งหมด' : `กลุ่ม / สาย ${group}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 📊 ตารางสรุปผลการแข่งขัน */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-black/80 text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-white/10">
                <th className="p-4 text-center w-20">แมตช์</th>
                <th className="p-4 w-44">รอบการแข่ง</th>
                <th className="p-4 text-right w-1/3 text-slate-300">TEAM A</th>
                <th className="p-4 text-center w-16">VS</th>
                <th className="p-4 text-left w-1/3 text-slate-300">TEAM B</th>
                <th className="p-4 text-center w-36">ผลคะแนน</th>
                <th className="p-4 text-center w-36 text-amber-400">ผู้ชนะ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10 font-medium">
              {filteredResults.length > 0 ? (
                filteredResults.map((row, index) => {
                  const isRowLoading = !isFetched;

                  const scoreA = row[6] !== undefined && row[6] !== '' ? Number(row[6]) : 0;
                  const scoreB = row[7] !== undefined && row[7] !== '' ? Number(row[7]) : 0;

                  // 🛠️ ผูกข้อมูลข้ามแท็บ: ค้นหาแถวในแท็บ Results ที่มี MatchID ตรงกับแถวปัจจุบันในแท็บ matches
                  const currentMatchId = String(row[0] || '');
                  const resultRowForMatch = sheetResults.find(r => String(r[0] || '') === currentMatchId);
                  
                  // คอลัมน์ B ในแท็บ Results คือช่อง Winner (ก็คือดัชนีที่ 1)
                  const winnerName = resultRowForMatch ? resultRowForMatch[1] : '';

                  const hasPlayed = (row[6] !== undefined && row[6] !== '') || 
                                    (row[7] !== undefined && row[7] !== '') || 
                                    (winnerName !== undefined && winnerName !== '');

                  const isAWinner = hasPlayed && scoreA > scoreB;
                  const isBWinner = hasPlayed && scoreB > scoreA;

                  return (
                    <tr 
                      key={row[0] || index} 
                      className="hover:bg-white/5 transition-all duration-150 group h-[60px]"
                    >
                      {/* Match ID */}
                      <td className="p-4 text-center font-mono text-xs text-slate-400 font-bold">
                        {isRowLoading ? <div className="w-6 h-4 bg-white/20 rounded mx-auto animate-pulse" /> : `#${row[0]}`}
                      </td>

                      {/* รอบการแข่ง */}
                      <td className="p-4">
                        {isRowLoading ? (
                          <div className="w-24 h-5 bg-white/20 rounded animate-pulse" />
                        ) : (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-slate-200 text-xs font-bold tracking-wide">
                              {row[1]}
                            </span>
                            {row[2] && (
                              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-extrabold border border-emerald-500/20">
                                {row[2]}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* TEAM A */}
                      <td className={`p-4 text-right text-base md:text-lg font-black tracking-wide drop-shadow-sm transition-colors ${
                        isAWinner ? 'text-emerald-400' : isBWinner ? 'text-slate-400/70 font-medium' : 'text-white'
                      }`}>
                        {isRowLoading ? (
                          <div className="w-24 h-4 bg-white/20 rounded ml-auto animate-pulse" />
                        ) : (
                          row[4] || <span className="text-slate-600 font-normal text-xs italic">TBD</span>
                        )}
                      </td>

                      <td className="p-2 text-center font-black text-slate-500 text-xs italic">
                        VS
                      </td>

                      {/* TEAM B */}
                      <td className={`p-4 text-left text-base md:text-lg font-black tracking-wide drop-shadow-sm transition-colors ${
                        isBWinner ? 'text-emerald-400' : isAWinner ? 'text-slate-400/70 font-medium' : 'text-white'
                      }`}>
                        {isRowLoading ? (
                          <div className="w-24 h-4 bg-white/20 rounded animate-pulse" />
                        ) : (
                          row[5] || <span className="text-slate-600 font-normal text-xs italic">TBD</span>
                        )}
                      </td>

                      {/* ผลคะแนนแนวนอน */}
                      <td className="p-4 text-center w-36">
                        {isRowLoading ? (
                          <div className="w-20 h-5 bg-white/20 rounded mx-auto animate-pulse" />
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 bg-black/90 border border-white/20 px-3 py-1.5 rounded-xl text-xs font-bold font-mono tracking-wide text-emerald-400 shadow-md max-w-[95px] mx-auto whitespace-nowrap">
                            <span>{row[6] !== undefined && row[6] !== '' ? row[6] : 0}</span>
                            <span>:</span>
                            <span>{row[7] !== undefined && row[7] !== '' ? row[7] : 0}</span>
                          </div>
                        )}
                      </td>

                      {/* ผู้ชนะ */}
                      <td className="p-4 text-center">
                        {isRowLoading ? (
                          <div className="w-20 h-5 bg-white/20 rounded mx-auto animate-pulse" />
                        ) : hasPlayed && winnerName ? (
                          <span className="inline-block bg-amber-500/10 text-amber-400 px-3 py-1 rounded-xl text-xs font-black border border-amber-500/20 tracking-wide whitespace-nowrap">
                            🏆 {winnerName}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-600 font-normal italic">รอผลการแข่ง</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-xs text-zinc-500 font-medium tracking-wide">
                    ❌ ไม่พบข้อมูลผลการแข่งขันตามเงื่อนไขที่เลือก
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