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

  // 1. เพิ่มฟังก์ชัน getBracketMatches
  const getBracketMatches = (stage: string) => {
    return matches.filter((m) => String(m[1]) === stage);
  };

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

  // 2. เปลี่ยน BracketBox เป็นแบบใหม่
  const BracketBox = ({ match }: { match: any }) => {
    return (
      <div className="relative w-44 h-20 rounded-2xl border border-[#39ff14]/60 bg-[#05070d]/95 flex flex-col justify-center px-4">
        <span className="text-[#39ff14] text-[10px] font-bold">คู่ที่ {match[0]}</span>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-sm truncate w-[42%]">{match[3] || "TBD"}</span>
          <span className="text-slate-400 text-xs">VS</span>
          <span className="font-bold text-sm truncate text-right w-[42%]">{match[4] || "TBD"}</span>
        </div>
        
        {/* เพิ่มเส้นเชื่อมตามที่ขอ */}
        <div className="absolute right-[-38px] top-1/2 w-10 h-[92px] border-r-2 border-b-2 border-[#39ff14]/70"></div>
        <div className="absolute right-[-38px] bottom-1/2 w-10 h-[92px] border-r-2 border-t-2 border-[#39ff14]/70"></div>
      </div>
    );
  };

  // 3. สร้างข้อมูลแต่ละรอบก่อน return
  const round16 = getBracketMatches("รอบ 16 คู่");
  const round8 = getBracketMatches("รอบ 8 คู่");
  const round4 = getBracketMatches("รอบ 4 คู่");
  const finalRound = getBracketMatches("ชิงชนะเลิศ");

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans tracking-tight">
      <div className="absolute inset-0 z-0">
        <img src="/wall-ตารางการแข่งขัน.png" className="w-full h-full object-fill opacity-85" alt="Background" />
      </div>

      <div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        <h1 className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-6">ตารางการแข่งขัน</h1>

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

        {/* 4. แสดงผลโดย map ข้อมูลแต่ละรอบ */}
        <div className="overflow-x-auto pb-8">
            <div className="flex gap-20 justify-center">
                <div className="flex flex-col gap-4">{round16.map((m)=>(<BracketBox key={m[0]} match={m} />))}</div>
                <div className="flex flex-col gap-4">{round8.map((m)=>(<BracketBox key={m[0]} match={m} />))}</div>
                <div className="flex flex-col gap-4">{round4.map((m)=>(<BracketBox key={m[0]} match={m} />))}</div>
                <div className="flex flex-col gap-4">{finalRound.map((m)=>(<BracketBox key={m[0]} match={m} />))}</div>
            </div>
        </div>
      </div>
    </div>
  );
}