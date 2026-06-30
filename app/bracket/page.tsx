'use client';
import React, { useEffect, useState } from 'react';

export default function BracketPage() {
  const [data, setData] = useState<any[]>([]);

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
        setData(parsed);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] p-10 pt-24 text-white">
      <h1 className="text-center text-4xl font-black text-[#39ff14] mb-12 uppercase">ผังการแข่งขัน</h1>
      
      <div className="flex justify-center gap-10 overflow-x-auto pb-10">
        {/* รอบ 24 คู่ (กรองข้อมูลจาก Round "24 คู่") */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs text-center opacity-60 uppercase">รอบ 24 คู่</h2>
          {data.filter(m => m.Round === '24 คู่').map((m, i) => (
            <div key={i} className="bg-black/40 border border-white/10 p-3 rounded text-[11px] w-40 hover:border-[#39ff14]/50 transition-colors">
              <div className="flex justify-between">
                <span>{m.TeamA} vs {m.TeamB}</span>
                <span className="text-[#39ff14] font-bold">{m.Winner}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ตรงนี้สามารถเพิ่มรอบ 16 คู่, 8 คู่ ไปเรื่อยๆ ตาม Format นี้ได้เลยครับ */}
      </div>
    </div>
  );
}