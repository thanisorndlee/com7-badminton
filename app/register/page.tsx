'use client';

import React from 'react';

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 pt-16 select-none relative overflow-hidden">
      
      <style jsx global>{`
        @keyframes laserScanDown {
          0% { top: 0%; }
          100% { top: calc(100% - 60px); }
        }
        @keyframes laserScanUp {
          0% { top: calc(100% - 60px); }
          100% { top: 0%; }
        }
        .laser-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 1.5rem;
          pointer-events: none;
          z-index: 1;
        }
        .gradient-laser-beam-1 {
          position: absolute;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(57, 255, 20, 0.15),
            rgba(57, 255, 20, 0.4),
            rgba(57, 255, 20, 0.15),
            transparent
          );
          border-top: 2px solid rgba(57, 255, 20, 0.6);
          border-bottom: 2px solid rgba(57, 255, 20, 0.6);
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
          filter: blur(1px);
          animation: laserScanDown 2.5s ease-in-out infinite alternate;
        }
        .gradient-laser-beam-2 {
          position: absolute;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(57, 255, 20, 0.15),
            rgba(57, 255, 20, 0.4),
            rgba(57, 255, 20, 0.15),
            transparent
          );
          border-top: 2px solid rgba(57, 255, 20, 0.6);
          border-bottom: 2px solid rgba(57, 255, 20, 0.6);
          box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
          filter: blur(1px);
          animation: laserScanUp 2.5s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>
      
      <div className="max-w-md w-full bg-zinc-900/65 backdrop-blur-md border border-zinc-800/60 p-8 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center relative z-10 mt-8 overflow-hidden">
        
        <div className="laser-container">
          <div className="gradient-laser-beam-1" />
          <div className="gradient-laser-beam-2" />
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-[10px] bg-[#39ff14]/10 text-[#39ff14] px-3 py-1 rounded-full font-bold tracking-widest uppercase border border-[#39ff14]/20">
              Registration
            </span>
            <h1 className="text-xl font-black mt-3 text-white tracking-wide">
              สมัครเข้าร่วมการแข่งขัน
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              COM7 Badminton Tournament 2026
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl inline-block shadow-[0_0_35px_rgba(57,255,20,0.15)] mb-6 transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src="/แบบฟอร์มลงทะเบียนแข่งขันแบดมินตัน-—-COM7-Badminton-.png" 
              alt="Registration QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          <p className="text-xs text-slate-400 mb-6 px-4 leading-relaxed">
            สแกนคิวอาร์โค้ดด้านบนด้วยสมาร์ทโฟน หรือกดปุ่มด้านล่างเพื่อเปิดลิงก์กรอกฟอร์มลงทะเบียน
          </p>

          <a 
            href="https://formcenter.com7.in/forms/26zcfLps7W5C2qMFCFfDRbUM"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#39ff14] text-black font-bold text-sm py-3.5 px-6 rounded-xl hover:bg-[#32e610] transition-all duration-300 shadow-[0_5px_25px_rgba(57,255,20,0.3)] text-center"
          >
            เปิดลิงก์สมัครลงทะเบียน
          </a>
        </div>

      </div>
    </div>
  );
}