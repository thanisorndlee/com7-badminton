'use client';
import React, { useEffect, useState } from 'react';

export default function BracketPage() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    // ใส่ลิงก์ CSV ของแท็บ Matches ที่ Publish แล้วที่นี่
    const sheetUrl = 'YOUR_MATCHES_TAB_CSV_URL';

    fetch(sheetUrl)
      .then(res => res.text())
      .then(csvText => {
        const rows = csvText.split('\n');
        const headers = rows[0].split(',');
        const parsed = rows.slice(1).map(row => {
          const values = row.split(',');
          let obj: any = {};
          headers.forEach((h, i) => obj[h.trim()] = values[i]?.trim());
          return obj;
        });
        setMatches(parsed);
      });
  }, []);

  // Component สำหรับสร้างกล่องทีม
  const MatchBox = ({ teamA, teamB }: { teamA: string, teamB: string }) => (
    <div className="bg-black border border-[#39ff14] rounded-lg p-2 w-40 text-[10px] relative">
      <div className="text-[#39ff14] font-bold">คู่แข่ง</div>
      <div className="text-white">{teamA} vs {teamB}</div>
      {/* เส้นเชื่อมกิ่ง */}
      <div className="absolute right-0 top-1/2 w-4 h-px bg-[#39ff14] translate-x-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070b14] p-10 pt-24 text-white">
      <h1 className="text-center text-3xl font-black text-[#39ff14] mb-12">ผังการแข่งขัน</h1>
      
      <div className="flex gap-8 justify-center overflow-x-auto">
        {/* รอบ 24 คู่ */}
        <div className="flex flex-col gap-6 justify-center">
          {matches.filter(m => m.Round === '24 คู่').map((m, i) => (
            <MatchBox key={i} teamA={m.TeamA} teamB={m.TeamB} />
          ))}
        </div>

        {/* เชื่อมไปยังรอบถัดไป */}
        <div className="flex flex-col gap-12 justify-center">
          <div className="h-full w-px bg-[#39ff14] ml-2"></div>
        </div>

        {/* รอบ 16 คู่ */}
        <div className="flex flex-col gap-16 justify-center">
          {matches.filter(m => m.Round === '16 คู่').map((m, i) => (
            <MatchBox key={i} teamA={m.TeamA} teamB={m.TeamB} />
          ))}
        </div>
      </div>
    </div>
  );
}