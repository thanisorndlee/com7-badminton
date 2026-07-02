'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getMenuClass = (path: string) => {
    const baseClass = "transition-all duration-300 ease-in-out py-1 whitespace-nowrap cursor-pointer";
    const activeClass = " text-[#39ff14] font-semibold border-b-2 border-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]";
    const inactiveClass = " text-slate-300 hover:text-white border-b-2 border-transparent";

    const isActive = path === '/' ? pathname === '/' : pathname === path;
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <html lang="th">
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
          
          {/* ปรับความสูงเป็น h-28 เพื่อให้กรอบใหญ่ขึ้น */}
          <nav className="w-full sticky top-0 z-50 shadow-2xl border-b border-[#39ff14]/30 flex justify-center items-center flex-shrink-0 relative overflow-hidden bg-black/40 backdrop-blur-md h-28">
            
            <img 
              src="/badminton-hero.jpg" 
              alt="Navbar Background" 
              className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none opacity-20"
            />
            
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

            <div className="relative w-full py-4 px-6 md:px-10 flex flex-row justify-between items-center z-20 gap-8">
              
              <div className="flex items-center gap-8 relative z-20">
                <div className="flex flex-col font-black tracking-wider leading-none select-none uppercase flex-shrink-0">
                  <span className="text-xs text-slate-400 font-bold tracking-[0.25em]">COM7</span>
                  <span className="text-2xl md:text-3xl text-[#39ff14] font-black my-1 drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
                    BADMINTON
                  </span>
                  <span className="text-[10px] text-white/90 font-semibold tracking-[0.35em]">TOURNAMENT 2026</span>
                </div>
                
                {/* ขยายขนาดสปอนเซอร์เป็น h-14 เพื่อให้ใหญ่และสะดุดตาขึ้นในกรอบที่สูงขึ้น */}
                <div className="hidden md:flex items-center gap-6 h-full py-2">
                  <img src="/Sandisk-Horizontal-Mark-TM-Red-RGB.svg" className="h-full max-h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                  <img src="/Sponsor.png" className="h-full max-h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                  <img src="/Sponsor.png" className="h-full max-h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                </div>
              </div>

              <div className="flex flex-row items-center justify-start gap-5 md:gap-7 text-sm font-normal tracking-wide relative z-20 overflow-x-auto pb-1">
                <Link href="/" className={getMenuClass('/')}>หน้าหลัก</Link>
                <Link href="/bracket" className={getMenuClass('/bracket')}>ผังการแข่ง</Link>
                <Link href="/schedule" className={getMenuClass('/schedule')}>ตารางการแข่งขัน</Link>
                <Link href="/results" className={getMenuClass('/results')}>ผลการแข่งขัน</Link>
                <Link href="/live" className={getMenuClass('/live')}>ไลฟ์สตรีม</Link>                
                <Link href="/rules" className={getMenuClass('/rules')}>กฎกติกา</Link>
                <Link href="/gallery" className={getMenuClass('/gallery')}>บรรยากาศ</Link>               

                <Link 
                  href="/register" 
                  className={`transition-all duration-300 px-6 py-2.5 rounded-full font-semibold flex-shrink-0 border ${
                    pathname === '/register' 
                      ? 'bg-[#39ff14] text-black border-[#39ff14]' 
                      : 'bg-white/10 text-slate-200 border-white/20 hover:bg-zinc-700'
                  }`}
                >
                  สมัครเข้าร่วมการแข่งขัน
                </Link>
              </div>
            </div>
          </nav>

          <main className="w-full flex-grow relative flex flex-col">
            <div className="w-full h-full relative">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}