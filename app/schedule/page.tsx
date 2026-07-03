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

  const BracketBox = ({ title }: { title: string }) => {
    return (
      <div className="w-40 h-16 rounded-2xl border border-[#39ff14]/30 bg-gradient-to-br from-black/90 to-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(57,255,20,.15)] hover:scale-105 transition-all flex flex-col items-center justify-center relative z-10">
        <span className="font-black text-[14px] text-white tracking-wide">{title}</span>
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
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-md font-black tracking-widest uppercase border border-emerald-500/20 inline-block mb-1.5 shadow-sm">Tournament Schedule</span>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">ตารางการแข่งขัน</h1>
          </div>
          <div className="relative w-full lg:w-80">
            <input type="text" placeholder="ค้นหา แมตช์, ชื่อทีม, นักกีฬา..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/80 border border-white/20 px-4 py-2.5 pl-11 rounded-xl text-xs text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-500 font-medium" />
          </div>
        </div>

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
                  <td className="text-right text-lg font-black">{m[3] || '-'}</td>
                  <td className="text-center text-xs italic text-slate-500">VS</td>
                  <td className="text-left text-lg font-black">{m[4] || '-'}</td>
                  <td className="px-4"><div className="flex justify-center items-center gap-2 bg-black rounded-lg py-1 px-2 border border-white/10 w-24 mx-auto font-mono text-emerald-400 font-black">{m[5] || 0} : {m[6] || 0}</div></td>
                </tr>
              )) : <tr><td colSpan={6} className="p-10 text-center text-slate-500">ไม่พบข้อมูล</td></tr>}
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-black text-[#39ff14] text-center mb-12">แผนผังการแข่งขัน</h2>

        <div className="overflow-x-auto pb-8 relative">
          <div className="flex justify-center gap-16 min-w-[1200px]">
            {['รอบ 16 คู่', 'รอบ 8 คู่', 'รอบ 4 คู่', 'รอบ 2 คู่'].map((round, idx) => (
              <div key={round} className="w-44 flex flex-col items-center">
                <h3 className="text-center text-lg font-black text-[#39ff14] mb-8">{round}</h3>
                <div className={`h-[900px] flex flex-col ${idx === 0 ? 'justify-between' : idx === 1 ? 'justify-evenly' : idx === 2 ? 'justify-around' : 'items-center justify-center'}`}>
                  {idx === 0 && ['25','26','27','28','29','30','31','32'].map((id, i) => <div key={id} className="relative"><BracketBox title={`คู่ที่ ${i+1}`} />{i%2===0 && <><div className="bracket-line-h" style={{top:'50%', left:'160px', width:'32px'}} /><div className="bracket-line-v" style={{top:'50%', left:'192px', height:'80px'}} /></>}</div>)}
                  {idx === 1 && ['33','34','35','36'].map((id, i) => <div key={id} className="relative"><BracketBox title={`คู่ที่ ${i+1}`} />{i%2===0 && <><div className="bracket-line-h" style={{top:'50%', left:'160px', width:'32px'}} /><div className="bracket-line-v" style={{top:'50%', left:'192px', height:'160px'}} /></>}</div>)}
                  {idx === 2 && ['37','38'].map((id, i) => <div key={id} className="relative"><BracketBox title={`คู่ที่ ${i+1}`} />{i===0 && <><div className="bracket-line-h" style={{top:'50%', left:'160px', width:'32px'}} /><div className="bracket-line-v" style={{top:'50%', left:'192px', height:'320px'}} /></>}</div>)}
                  {idx === 3 && <BracketBox title="ชิงชนะเลิศ" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}