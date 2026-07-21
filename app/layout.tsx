'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getMenuClass = (path: string) => {
    const baseClass = "transition-all duration-500 ease-in-out py-1 whitespace-nowrap cursor-pointer";
    const activeClass = " text-[#39ff14] font-semibold border-b-2 border-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]";
    const inactiveClass = " text-slate-300 hover:text-white border-b-2 border-transparent";

    const isActive = path === '/' ? pathname === '/' : pathname === path;
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <html lang="th" className="w-full max-w-full overflow-x-hidden bg-[#070b14]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body
  className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-[#070b14] text-white antialiased"
        style={{ fontFamily: "'Kanit', sans-serif" }}
      >
        <div className="relative z-10 flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
<nav className="sticky top-0 z-50 w-full border-b border-[#39ff14]/30 bg-black shadow-2xl">
<img
  src="/badminton-hero.jpg"
  alt="Navbar Background"
  className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-[30%_center] md:object-center"
/>

  <div className="pointer-events-none absolute inset-0 z-10 bg-black/65" />

<div className="relative z-20 flex w-full flex-col gap-3 px-4 py-3.5 select-none lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
      {/* LOGO + SPONSOR */}
<div className="relative z-20 flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-6">
  {/* โลโก้ COM7 BADMINTON */}
  <div className="flex flex-shrink-0 select-none flex-col font-black uppercase leading-none tracking-wider">
    <span className="text-xs font-bold tracking-[0.25em] text-slate-400">
      COM7
    </span>

    <span className="my-0.5 text-2xl font-black text-[#39ff14] drop-shadow-[0_0_12px_rgba(57,255,20,0.4)] md:text-3xl">
      BADMINTON
    </span>

    <span className="text-[11px] font-semibold tracking-[0.42em] text-white/90">
      TOURNAMENT 2026
    </span>
  </div>

  {/* โลโก้สปอนเซอร์ */}
  <div className="flex w-full items-center gap-3 lg:w-auto lg:gap-4">
    <div className="flex h-8 w-12 items-center justify-center sm:h-9 sm:w-14 lg:h-10 lg:w-16">
      <img
        src="/xiaomi-logo.png"
        alt="XIAOMI"
        className="max-h-full max-w-full object-contain"
      />
    </div>

    <div className="flex h-8 w-12 items-center justify-center sm:h-9 sm:w-14 lg:h-10 lg:w-16">
      <img
        src="/Jbl-logo.jpg"
        alt="JBL"
        className="max-h-full max-w-full object-contain"
      />
    </div>

    <div className="flex h-8 w-20 items-center justify-center sm:h-9 sm:w-24 lg:h-10 lg:w-24">
      <img
        src="/Sandisk-Horizontal-Mark-TM-Red-RGB.svg"
        alt="SanDisk"
        className="max-h-full max-w-full object-contain"
      />
    </div>
  </div>
</div>

    {/* MENU */}
<div className="no-scrollbar relative z-20 flex w-full touch-pan-x items-center gap-6 overflow-x-auto whitespace-nowrap text-sm font-normal tracking-wide lg:w-auto lg:overflow-visible">
        <Link href="/" className={getMenuClass('/')}>
        หน้าหลัก
      </Link>

      <Link href="/schedule" className={getMenuClass('/schedule')}>
        ตารางการแข่งขัน
      </Link>

      <Link href="/results" className={getMenuClass('/results')}>
        ผลการแข่งขัน
      </Link>

      <Link href="/live" className={getMenuClass('/live')}>
        ไลฟ์สตรีม
      </Link>

      <Link href="/rules" className={getMenuClass('/rules')}>
        กฎกติกาการแข่งขัน
      </Link>

      <Link href="/gallery" className={getMenuClass('/gallery')}>
        ภาพบรรยากาศการแข่งขัน
      </Link>

      <Link
  href="/replay"
  className={`flex-shrink-0 whitespace-nowrap rounded-full border px-5 py-2 font-semibold transition-all duration-500 ease-in-out ${
    pathname === '/replay'
      ? 'border-[#39ff14] bg-[#39ff14] text-black shadow-lg shadow-[#39ff14]/40'
      : 'border-white/20 bg-white/10 text-slate-200 shadow-md backdrop-blur-sm hover:border-zinc-500 hover:bg-zinc-700 hover:text-white'
  }`}
>
  ดูย้อนหลัง
</Link>
    </div>
  </div>
</nav>

          <main className="relative flex w-full max-w-full flex-grow flex-col overflow-x-hidden">
            <div className="relative h-full w-full max-w-full overflow-x-hidden">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}