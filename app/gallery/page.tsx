'use client';
import React from 'react';

export default function GalleryPage() {
  const photos = [
    '/gallery-1.jpg',
    '/gallery-2.jpg',
    '/gallery-3.jpg',
    '/gallery-4.jpg',
    '/gallery-5.jpg',
    '/gallery-6.jpg',
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* หัวข้อหน้า */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#39ff14] tracking-widest uppercase mb-4">
            บรรยากาศในงาน
          </h1>
          <div className="w-20 h-1 bg-[#39ff14] mx-auto rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-[#39ff14]/50 transition-all duration-500 cursor-pointer"
            >
              <img 
                src={photo} 
                alt={`Atmosphere ${index + 1}`} 
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}