'use client';
import React from 'react';

export default function GalleryPage() {
  const photos = [
    '/gallery-1.jpg', '/gallery-2.jpg', '/gallery-3.jpg', 
    '/gallery-4.jpeg', '/gallery-5.jpeg', '/gallery-6.jpg'
  ];

  return (
    <div className="min-h-screen relative bg-black text-white">
      <div className="fixed inset-0 z-0">
        <img 
          src="/badminton-hero.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* เนื้อหาหน้า Gallery */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 md:p-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#39ff14] tracking-widest uppercase mb-4">
            บรรยากาศในงาน
          </h1>
          <div className="w-20 h-1 bg-[#39ff14] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#39ff14]/50 transition-all duration-500"
            >
              <img 
                src={photo} 
                alt={`Atmosphere ${index + 1}`} 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.currentTarget.src = '/badminton-hero.jpg'; }} // ถ้าโหลดรูปไม่ขึ้นให้โชว์รูปนี้แทน
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}