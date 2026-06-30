'use client';
import React, { useEffect, useState } from 'react';

export default function BracketPage() {
  const [bracketData, setBracketData] = useState<any[]>([]);

  useEffect(() => {
    // เปลี่ยน URL นี้เป็นลิงก์ CSV จากแท็บ BracketView ที่ Publish แล้ว
    const sheetUrl = 'YOUR_BRACKETVIEW_CSV_URL_HERE';

    fetch(sheetUrl)
      .then((res) => res.text())
      .then((csvText) => {
        // ใช้ regex เพื่อแยกบรรทัดอย่างแม่นยำ
        const rows = csvText.trim().split(/\r?\n/);
        const dataRows = rows.slice(1); // ข้ามแถวหัวตาราง

        const parsed = dataRows.map((row) => {
          const [Round, MatchPos, TeamA, TeamB] = row.split(',').map(s => s.trim());
          return { Round, MatchPos, TeamA, TeamB };
        });

        console.log("ข้อมูลที่โหลดมา:", parsed); // ตรวจสอบใน Console (F12)
        setBracketData(parsed);
      })
      .catch((err) => console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] p-10 pt-24 text-white">
      <h1 className="text-center text-3xl font-black text-[#39ff14] mb-12 uppercase tracking-widest">
        ผังการแข่งขัน
      </h1>
      
      <div className="flex gap-12 justify-center overflow-x-auto">
        {/* คอลัมน์ รอบ 24 */}
        <div className="flex flex-col gap-6 justify-center">
          <h2 className="text-[10px] text-center opacity-50">รอบ 24 ทีม</h2>
          {bracketData.filter((m) => m.Round === '24').map((m, i) => (
            <div key={i} className="relative bg-black border border-[#39ff14]/50 p-3 rounded w-40 text-center text-[10px]">
              <div>{m.TeamA} vs {m.TeamB}</div>
              {/* เส้นเชื่อมกิ่ง */}
              <div className="absolute top-1/2 -right-12 w-12 h-px bg-[#39ff14]/50"></div>
            </div>
          ))}
        </div>

        {/* คอลัมน์ รอบ 16 */}
        <div className="flex flex-col gap-24 justify-center">
          <h2 className="text-[10px] text-center opacity-50">รอบ 16 ทีม</h2>
          {bracketData.filter((m) => m.Round === '16').map((m, i) => (
            <div key={i} className="bg-black border border-[#39ff14]/50 p-3 rounded w-40 text-center text-[10px]">
              {m.TeamA} vs {m.TeamB}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}