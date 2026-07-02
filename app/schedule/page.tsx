'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
  const [data, setData] = useState<any[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec')
      .then((res) => res.json())
      .then((res) => {
        setData(res.matches ? res.matches.slice(1) : []);
        setIsFetched(true);
      });
  }, []);

  const tableMatches = useMemo(() => data.filter(r => r[1] === "รอบแบ่งกลุ่ม"), [data]);
  const bracketMatches = useMemo(() => data.filter(r => r[1] !== "รอบแบ่งกลุ่ม"), [data]);

  const MatchBox = ({ matchId }: { matchId: string }) => {
    const match = bracketMatches.find(r => String(r[0]) === matchId);
    return (
      <div className="w-40 p-3 bg-black border border-emerald-500/30 rounded-lg text-center shadow-lg">
        <div className="text-[9px] text-emerald-400 mb-1">MATCH #{matchId}</div>
        <div className="text-xs font-bold truncate">{match ? `${match[4]} vs ${match[5]}` : "TBD"}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] p-10 pt-28 text-white">
      <div className="max-w-6xl mx-auto bg-slate-950/80 p-8 rounded-2xl border border-white/10 mb-12">
        <h2 className="text-2xl font-black mb-6">ตารางการแข่งขัน (รอบแบ่งกลุ่ม)</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase border-b border-white/10">
              <th className="p-4">แมตช์</th>
              <th className="p-4">TEAM A</th>
              <th className="p-4">TEAM B</th>
              <th className="p-4">ผลคะแนน</th>
            </tr>
          </thead>
          <tbody>
            {tableMatches.map((m, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="p-4 text-xs font-mono">#{m[0]}</td>
                <td className="p-4 font-bold">{m[4]}</td>
                <td className="p-4 font-bold">{m[5]}</td>
                <td className="p-4 font-mono text-emerald-400">{m[6]} : {m[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-6xl mx-auto bg-slate-950/80 p-8 rounded-2xl border border-white/10">
        <h2 className="text-center text-2xl font-black mb-10 text-emerald-400">ผังการแข่งขันรอบน็อกเอาต์</h2>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col gap-4">
            <MatchBox matchId="25" />
            <MatchBox matchId="26" />
          </div>
          <div className="flex flex-col gap-20 justify-center">
            <MatchBox matchId="33" />
          </div>
        </div>
      </div>
    </div>
  );
}