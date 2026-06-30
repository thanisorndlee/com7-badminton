'use client';
import React from 'react';

export default function BracketPage() {
  // Component กล่องทีมแข่ง
  const MatchBox = ({ title }: { title: string }) => (
    <div className="relative w-40 h-10 border border-[#39ff14] rounded-md bg-black flex items-center px-3 text-[10px] text-white">
      {title}
      {/* เส้นเชื่อมกิ่งด้านขวา */}
      <div className="absolute -right-6 top-1/2 w-6 h-px bg-[#39ff14]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070b14] p-10 pt-24 text-white">
      <h1 className="text-center text-3xl font-black text-[#39ff14] mb-12">ตารางการแข่งขัน</h1>
      
      {/* ผังสายการแข่ง */}
      <div className="flex justify-center gap-10">
        
        {/* รอบ 24 คู่ */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs text-center opacity-60">รอบ 24 คู่</h2>
          {Array.from({ length: 8 }).map((_, i) => <MatchBox key={i} title={`คู่ที่ ${i + 1}`} />)}
        </div>

        {/* รอบ 16 คู่ */}
        <div className="flex flex-col gap-[72px] justify-center">
          <h2 className="text-xs text-center opacity-60">รอบ 16 คู่</h2>
          {Array.from({ length: 4 }).map((_, i) => <MatchBox key={i} title={`คู่ที่ ${i + 1}`} />)}
        </div>

        {/* รอบ 8 คู่ */}
        <div className="flex flex-col gap-[168px] justify-center">
          <h2 className="text-xs text-center opacity-60">รอบ 8 คู่</h2>
          {Array.from({ length: 2 }).map((_, i) => <MatchBox key={i} title={`คู่ที่ ${i + 1}`} />)}
        </div>
        
      </div>
    </div>
  );
}