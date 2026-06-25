'use client';

export default function StreamPage() {
  const youtubeVideoId = 'SEANzrzUKLU';
const hasLiveLink = youtubeVideoId.trim() !== '';

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative overflow-x-hidden flex flex-col items-center">
      
      {/* 🏞️ รูปพื้นหลังหลัก คมชัด 100% */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wall-ตารางการแข่งขัน.png"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

      {/* 📦 กล่อง Dashboard โครงกระจกเข้ม (bg-slate-950/75) */}
      <div className="max-w-5xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        
        {/* Header แถบควบคุมด้านบน */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${hasLiveLink ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`} />
            <span className={`text-xs md:text-sm font-black tracking-wider uppercase ${hasLiveLink ? 'text-red-500' : 'text-slate-400'}`}>
              LIVE STREAM
            </span>
          </div>
        </div>

        {/* 📺 ระบบฝังวิดีโอแบบไดนามิก (แก้ Property และเครื่องหมายให้ถูกต้องตาม TypeScript) */}
        {hasLiveLink ? (
          <div className="w-full aspect-video bg-black rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
            <iframe
              className="w-full h-full border-0"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
              title="YouTube live stream player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          /* 🔒 หน้าจอสแตนบายสไตล์กระจกซีทรูใสแจ๋ว */
          <div className="w-full aspect-video bg-white/[0.02] rounded-2xl border border-dashed border-white/10 relative flex flex-col items-center justify-center p-6 text-center shadow-inner">
            <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center border border-white/5 mb-4 shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-black text-white tracking-wide drop-shadow-md">
              สแตนบายรอสัญญาณสตรีมมิ่ง
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm drop-shadow-sm">
              เมื่อระบบเริ่มถ่ายทอดสด หน้าจอการแข่งขันจะปรากฏขึ้นบริเวณนี้โดยอัตโนมัติ
            </p>
          </div>
        )}

      </div>
    </div>
  );
}