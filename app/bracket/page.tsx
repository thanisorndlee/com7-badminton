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
    <div className="min-h-screen bg-[#070b14] p-6 pt-24 text-white">
      <h1 className="text-center text-3xl font-black text-[#39ff14] mb-8 uppercase tracking-widest">
        โปรแกรมการแข่งขัน
      </h1>

      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/5 text-[#39ff14]">
              <th className="p-3 border border-white/10 text-left">รอบ</th>
              <th className="p-3 border border-white/10 text-left">คู่ที่</th>
              <th className="p-3 border border-white/10 text-center">ทีม A</th>
              <th className="p-3 border border-white/10 text-center">ทีม B</th>
              <th className="p-3 border border-white/10 text-center">ผล</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors border-b border-white/5">
                <td className="p-3 border border-white/10">{row.Round}</td>
                <td className="p-3 border border-white/10">{row.MatchID}</td>
                <td className="p-3 border border-white/10 text-center">{row.TeamA}</td>
                <td className="p-3 border border-white/10 text-center">{row.TeamB}</td>
                <td className="p-3 border border-white/10 text-center font-bold text-[#39ff14]">
                  {row.ScoreA} - {row.ScoreB}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}