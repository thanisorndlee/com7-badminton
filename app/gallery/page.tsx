'use client';
import React from 'react';

export default function GalleryPage() {
  const photos = [
    '/gallery-1.jpg', '/gallery-2.jpg', '/gallery-3.jpg', 
    '/gallery-4.jpeg', '/gallery-5.jpeg', '/gallery-6.jpg'
  ];

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-24 select-none relative overflow-x-hidden flex flex-col items-center">
      
      {/* 🏞️ Background Image  */}
      <div className="absolute inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
        {/* เพิ่ม Overlay เพื่อให้ตัวหนังสือในหน้า Gallery อ่านง่ายขึ้น */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* เนื้อหาหน้า Gallery (อยู่บนพื้นหลัง) */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#39ff14] tracking-widest uppercase mb-4">
            ภาพบรรยากาศกิจกรรม
          </h1>
          <div className="w-20 h-1 bg-[#39ff14] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#39ff14]/50 transition-all duration-500 bg-black/40"
            >
              <img 
                src={photo} 
                alt={`Atmosphere ${index + 1}`} 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Unavailable'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}