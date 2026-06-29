'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ฟังก์ชันควบคุมเอฟเฟกต์สโลว์นุ่มนวลให้กับเมนูลิงก์
  const getMenuClass = (path: string) => {
    const baseClass = "transition-all duration-500 ease-in-out py-1 whitespace-nowrap cursor-pointer";
    const activeClass = " text-[#39ff14] font-semibold border-b-2 border-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]";
    const inactiveClass = " text-slate-300 hover:text-white border-b-2 border-transparent";

    const isActive = path === '/' ? pathname === '/' : pathname === path;
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <html lang="th" >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="min-h-screen text-white antialiased bg-black relative flex flex-col"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
        <div className="w-full flex flex-col h-full min-h-screen relative z-10">
          
          {/* กรอบด้านนอกสุดของ Navbar */}
          <nav className="w-full sticky top-0 z-50 shadow-2xl border-b border-[#39ff14]/30 flex justify-center items-center flex-shrink-0 relative overflow-hidden bg-black">
            
            {/* 📸 รูปภาพพื้นหลังของ Navbar */}
            <img 
              src="/badminton-hero.jpg" 
              alt="Navbar Background" 
              className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
            />
            
            {/* 🌐 ม่านดำลดความสว่างภาพพื้นหลัง */}
            <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none"></div>

            {/* คุมโครงสร้าง Navbar ไม่ให้โลโก้โดนบีบจนหลุด */}
            <div className="relative w-full py-3.5 px-4 md:px-8 flex flex-row justify-between items-center select-none flex-shrink-0 z-20 gap-4">
              
              {/* 🎯 ฝั่งซ้าย: กลุ่มข้อความโลโก้ */}
              <div className="flex flex-col font-black tracking-wider leading-none select-none uppercase relative z-20 flex-shrink-0">
                <span className="text-xs text-slate-400 font-bold tracking-[0.25em]">COM7</span>
                <span className="text-2xl md:text-3xl text-[#39ff14] font-black my-0.5 drop-shadow-[0_0_12px_rgba(57,255,20,0.4)]">
                  BADMINTON
                </span>
                <span className="text-[11px] text-white/90 font-semibold tracking-[0.42em]">TOURNAMENT 2026</span>
              </div>

              {/* 📢 เพิ่มส่วนโลโก้สปอนเซอร์ */}
              <div className="hidden xl:flex items-center gap-3 bg-black/30 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <img src="Sponsor.png" className="h-5 object-contain" />
                <img src="/technique-logo.png" className="h-5 object-contain" />
              </div>

              {/* ฝั่งขวา: รายการลิงก์เมนูและปุ่มสมัคร (เวอร์ชันปลดล็อกให้ใช้นิ้วปัดสไลด์บนมือถือได้ชัวร์ๆ ด้วย Tailwind แท้) */}
              <div className="flex flex-row items-center justify-start gap-4 md:gap-6 text-xs md:text-sm font-normal tracking-wide relative z-20 overflow-x-auto scroll-smooth pb-2 pt-1 max-w-[calc(100vw-180px)] md:max-w-none">
                <Link href="/" className={getMenuClass('/')}>หน้าหลัก</Link>
                <Link href="/schedule" className={getMenuClass('/schedule')}>ตารางการแข่งขัน</Link>
                <Link href="/results" className={getMenuClass('/results')}>ผลการแข่งขัน</Link>
                <Link href="/live" className={getMenuClass('/live')}>ไลฟ์สตรีม</Link>
                <Link href="/rules" className={getMenuClass('/rules')}>กฎกติกาการแข่งขัน</Link>
                
                {/* 🔘 ปุ่มสมัคร */}
                <Link 
                  href="/register" 
                  className={`transition-all duration-500 ease-in-out px-5 py-2 rounded-full font-semibold flex-shrink-0 whitespace-nowrap border ${
                    pathname === '/register' 
                      ? 'bg-[#39ff14] text-black border-[#39ff14] shadow-lg shadow-[#39ff14]/40' 
                      : 'bg-white/10 text-slate-200 border-white/20 backdrop-blur-sm hover:bg-zinc-700 hover:text-white hover:border-zinc-500 shadow-md'
                  }`}
                >
                  สมัครเข้าร่วมการแข่งขัน
                </Link>
              </div>

            </div>
          </nav>

          {/* ส่วนเนื้อหาเพจหลัก */}
          <main className="w-full flex-grow relative flex flex-col">
            <div className="w-full h-full relative ">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}