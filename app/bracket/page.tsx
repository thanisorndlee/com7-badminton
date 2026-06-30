'use client';
import React, { useEffect, useState } from 'react';

export default function BracketPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // ใส่ลิงก์ CSV ของแท็บ BracketView ที่ Publish แล้ว
    const sheetUrl = 'YOUR_BRACKETVIEW_CSV_URL';

    fetch(sheetUrl)
      .then(res => res.text())
      .then(csvText => {
        const rows = csvText.split('\n').slice(1);
        const parsed = rows.map(row => {
          const [Round, MatchPos, TeamA, TeamB] = row.split(',');
          return { Round, MatchPos, TeamA, TeamB };
        });
        setData(parsed);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] p-10 pt-24 text-white">
      <h1 className="text-center text-3xl font-black text-[#39ff14] mb-12">ผังการแข่งขัน</h1>
      
      {/* โครงสร้างผังที่มีเส้นเชื่อมกิ่ง */}
      <div className="flex gap-12 justify-center">
        {/* รอบ 24 คู่ */}
        <div className="flex flex-col gap-6 justify-center">
          {data.filter(m => m.Round === '24').map((m, i) => (
            <div key={i} className="relative bg-black border border-[#39ff14] p-3 rounded w-40 text-center text-xs">
              {m.TeamA} vs {m.TeamB}
              {/* เส้นเชื่อมกิ่ง */}
              <div className="absolute top-1/2 -right-8 w-8 h-px bg-[#39ff14]"></div>
            </div>
          ))}
        </div>

        {/* รอบ 16 คู่ */}
        <div className="flex flex-col gap-24 justify-center">
          {data.filter(m => m.Round === '16').map((m, i) => (
            <div key={i} className="bg-black border border-[#39ff14] p-3 rounded w-40 text-center text-xs">
              {m.TeamA} vs {m.TeamB}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}