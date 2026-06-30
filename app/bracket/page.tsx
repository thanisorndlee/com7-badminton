'use client';
import React from 'react';

export default function BracketPage() {
  const renderBracketNode = (matchName: string) => (
    <div className="flex items-center">
      <div className="bg-black/60 border border-[#39ff14]/30 rounded px-3 py-1 text-[10px] w-32 shadow-lg">
        <div className="text-[#39ff14] font-bold">{matchName}</div>
        <input className="w-full bg-transparent outline-none text-white" placeholder="พิมพ์ชื่อทีม..." />
      </div>
      <div className="w-8 h-[1px] bg-white/20"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070b14] p-8 text-white">
      <h1 className="text-center text-2xl font-black text-[#39ff14] uppercase mb-10 tracking-widest">ตารางการแข่งขัน</h1>
      
      <div className="flex gap-4 items-center overflow-x-auto pb-10">
        {/* คอลัมน์ 1: รอบ 24 คู่ */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[10px] text-center uppercase tracking-widest">รอบ 24 คู่</h2>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">{renderBracketNode(`คู่ ${i+1}`)}</div>
          ))}
        </div>

        {/* คอลัมน์ 2: รอบ 16 คู่ */}
        <div className="flex flex-col gap-8 justify-center">
          <h2 className="text-[10px] text-center uppercase tracking-widest">รอบ 16 คู่</h2>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">{renderBracketNode(`คู่ ${i+1}`)}</div>
          ))}
        </div>

        {/* คอลัมน์ 3: รอบ 8 คู่ */}
        <div className="flex flex-col gap-16 justify-center">
          <h2 className="text-[10px] text-center uppercase tracking-widest">รอบ 8 คู่</h2>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-8">{renderBracketNode(`คู่ ${i+1}`)}</div>
          ))}
        </div>

        {/* คอลัมน์ 4: รอบชิงชนะเลิศ */}
        <div className="flex flex-col justify-center">
          <h2 className="text-[10px] text-center uppercase tracking-widest">ชิงชนะเลิศ</h2>
          {renderBracketNode("ผู้ชนะเลิศ")}
        </div>
      </div>
    </div>
  );
}