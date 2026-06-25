'use client';

import React from 'react';

export default function RulesPage() {
  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-24 select-none relative overflow-x-hidden flex flex-col items-center">
      
      {/* 🏞️ Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          className="w-full h-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

      {/* 📦 Main Container Layout */}
      <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
        
        {/* 🔹 Left Column: Official Poster & Stats Card (Sized perfectly at 4 cols) */}
        <div className="lg:col-span-4 w-full flex flex-col gap-5">
          
          {/* Poster Box */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-slate-950/60">
            <img 
              src="/กฎกติกา.png" 
              alt="Tournament Poster" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] bg-emerald-500 text-black px-2.5 py-0.5 rounded font-black tracking-wider uppercase">
                OFFICIAL GUIDE
              </span>
              <h1 className="text-lg font-bold text-white tracking-tight mt-2">
                กติกาและข้อบังคับสากล
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                โปรดตรวจสอบรายละเอียดเพื่อสิทธิ์ประโยชน์ของทีม
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="bg-slate-950/75 border border-white/20 p-4 rounded-xl grid grid-cols-3 gap-2 text-center shadow-md">
            <div className="flex flex-col justify-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">รอบกลุ่ม</p>
              <p className="text-base font-black text-emerald-400 mt-0.5">15 แต้ม</p>
            </div>
            <div className="flex flex-col justify-center border-x border-white/10">
              <p className="text-[10px] text-slate-400 font-bold uppercase">รอบ 16 ทีม</p>
              <p className="text-base font-black text-white mt-0.5">15 แต้ม (2/3)</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">รอบ 8 ทีมขึ้นไป</p>
              <p className="text-base font-black text-amber-400 mt-0.5">21 แต้ม (2/3)</p>
            </div>
          </div>

        </div>

        {/* 📝 Right Column: Rules Document (Sized perfectly at 8 cols) */}
        <div className="lg:col-span-8 w-full flex flex-col gap-5">
          
          {/* Section 1: Scoring Table */}
          <div className="bg-slate-950/75 border border-white/20 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
              <span className="text-emerald-400 text-base">📊</span>
              <h2 className="text-base font-bold text-white tracking-tight">ระบบการคิดคะแนนรอบแรก</h2>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-white/10 bg-black/40 mb-4">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-black/80 text-slate-400 border-b border-white/10 font-bold">
                    <th className="p-3">ผลการแข่งขัน</th>
                    <th className="p-3 border-x border-white/10 text-center w-28">คะแนนสะสม</th>
                    <th className="p-3">หมายเหตุคะแนนเซ็ต</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-medium text-white">ชนะการแข่งขัน</td>
                    <td className="p-3 border-x border-white/10 font-bold text-emerald-400 text-center">3 คะแนน</td>
                    <td className="p-3 text-slate-500">-</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-medium text-white">เสมอการแข่งขัน</td>
                    <td className="p-3 border-x border-white/10 font-bold text-amber-400 text-center">1 คะแนน</td>
                    <td className="p-3 text-slate-500">-</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-medium text-white">แพ้การแข่งขัน</td>
                    <td className="p-3 border-x border-white/10 font-bold text-red-500 text-center">0 คะแนน</td>
                    <td className="p-3 text-slate-500">-</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-medium text-white">ชนะบาย (คู่แข่งไม่มา)</td>
                    <td className="p-3 border-x border-white/10 font-bold text-emerald-400 text-center">3 คะแนน</td>
                    <td className="p-3 text-emerald-400 font-medium">บันทึกแต้มเซ็ตเป็น 15 - 0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
              📌 <span className="text-white font-semibold">กรณีที่คะแนนรวมสะสมเท่ากันเมื่อจบตาราง:</span> อันดับจะตัดสินจาก <span className="text-emerald-400 font-medium">ผลต่างคะแนนได้เสีย</span> &rarr; ผลรวมคะแนนได้มากที่สุด &rarr; ผลรวมคะแนนเส้อยน้อยที่สุดตามลำดับ
            </p>
          </div>

          {/* Section 2: Group Stage */}
          <div className="bg-slate-950/75 border border-white/20 p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono font-bold">01</span>
                <h2 className="text-base font-bold text-white tracking-tight">รอบแบ่งกลุ่ม (24 คู่)</h2>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 font-medium px-2 py-0.5 rounded border border-white/5">พบกันหมดในสาย</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span>ทำการแข่งขันแบบพบกันหมดในสาย รวมทัังหมดทีมละ <span className="text-white font-semibold">3 แมตช์</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span>แข่งขันทั้งหมด <span className="text-emerald-400 font-semibold">2 เซ็ตเท่านั้น</span> (ไม่มีดิวส์ ใครถึง 15 แต้มก่อนชนะในเซ็ตนั้นทันที)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span>มีเวลาให้พักระหว่างเซ็ต <span className="text-white font-medium">1 นาที</span> เมื่อคะแนนฝ่ายใดฝ่ายหนึ่งดำเนินถึง <span className="text-amber-400 font-semibold">แต้มที่ 7</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span>ทีมงานจัดเตรียมลูกแบดมินตันให้ <span className="text-white font-medium">แมตช์ละ 2 ลูก</span> แข่งขันเสร็จแล้วลูกเหลือต้องคืนส่วนกลาง</span>
              </li>
            </ul>

            <div className="mt-4 border-t border-white/5 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 text-xs">
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                  <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded text-[10px] mr-1.5">อันดับ 1-2</span>
                  <span className="text-slate-400">ของแต่ละกลุ่มจะได้รับสิทธิ์เข้ารอบถัดไปโดยอัตโนมัติ</span>
                </div>
                <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                  <span className="text-black font-bold bg-emerald-400 px-1.5 py-0.5 rounded text-[10px] mr-1.5">อันดับ 3 ดีที่สุด</span>
                  <span className="text-slate-400">คัดเลือกเอาทีมอันดับ 3 จำนวน <span className="text-emerald-400 font-semibold">4 อันดับแรก</span> เข้ารอบสมทบ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Knockout 16 */}
          <div className="bg-slate-950/75 border border-white/20 p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono font-bold">02</span>
                <h2 className="text-base font-bold text-white tracking-tight">รอบ Knock Out 16 ทีมสุดท้าย</h2>
              </div>
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/10 font-medium px-2 py-0.5 rounded">แพ้คัดออก</span>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-300 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span>ปรับเปลี่ยนมาใช้ระบบการนับแต้มแบบ <span className="text-white font-semibold">Rally Point 15 แต้ม (ตัดสินผู้ชนะ 2 ใน 3 เซ็ต)</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span><span className="text-white font-semibold">กฎการดิวส์ (Deuce):</span> หากแต้มเสมอกันที่ 14-14 แข่งต่อจนกว่าแต้มห่าง 2 แต้ม โดยจะ<span className="text-amber-400 font-bold">สิ้นสุดจำกัดสูงสุดที่ 21 แต้ม</span></span>
              </li>
            </ul>
          </div>

          {/* Section 4: Quarter & Semifinals */}
          <div className="bg-slate-950/75 border border-white/20 p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-400 font-mono font-bold">03</span>
                <h2 className="text-base font-bold text-white tracking-tight">รอบ 8 ทีม / รอบรองชนะเลิศ (4 ทีม)</h2>
              </div>
              <span className="text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/10 font-medium px-2 py-0.5 rounded">แมตช์ทางการ</span>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-300 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span>ยกระดับการแข่งขันเพิ่มเป็น <span className="text-emerald-400 font-semibold">Rally Point 21 แต้มสากล (ตัดสินผู้ชนะ 2 ใน 3 เซ็ต)</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span><span className="text-white font-semibold">กฎการดิวส์รอบใหญ่:</span> หากแต้มเสมอ 20-20 แข่งต่อจนกว่าแต้มห่าง 2 แต้ม คะแนนจะ<span className="text-red-400 font-bold">สิ้นสุดจำกัดสูงสุดที่ 30 แต้ม</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">▪</span>
                <span><span className="text-white font-semibold">การจำแนกสาย:</span> ผู้ชนะเข้าชิงชนะเลิศอันดับที่ 1 ส่วนผู้แพ้โยกไปแข่งขันชิงอันดับที่ 3</span>
              </li>
            </ul>
          </div>

          {/* Section 5: Regulations */}
          <div className="bg-slate-950/75 border border-white/20 p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
              <span className="text-red-400 text-base">⚠️</span>
              <h2 className="text-base font-bold text-white tracking-tight">ข้อบังคับทั่วไปและระเบียบวินัยนักกีฬา</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <p className="font-semibold text-white mb-1">🏸 กติกาการเสิร์ฟ</p>
                <p className="text-slate-400 leading-relaxed">ยึดตามมาตรฐานสากล <span className="text-red-400 font-medium">"ห้ามเสิร์ฟลูกยิง หรือห้ามส่งลูก Backhand สูงพุ่งไปด้านหลัง"</span> หากฝ่าฝืนพิจารณาเป็นคะแนนเสีย</p>
              </div>

              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <p className="font-semibold text-white mb-1">⏰ การรักษาเวลาสนาม</p>
                <p className="text-slate-400 leading-relaxed">เมื่อถึงกำหนดเรียกแมตช์ หากไม่ลงสนามจะจับเวลา <span className="text-amber-400 font-medium">5 นาที</span> หากเกินกำหนดจะปรับเป็น <span className="text-red-400 font-medium">"แพ้บาย"</span> ทันที</p>
              </div>

              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <p className="font-semibold text-white mb-1">🚑 การบาดเจ็บระหว่างแมตช์</p>
                <p className="text-slate-400 leading-relaxed">อนุญาตให้ขอสิทธิ์หยุดพักเพื่อปฐมพยาบาลได้ <span className="text-white font-medium">2 ครั้ง รวมเวลาห้ามเกิน 7 นาที</span> หากแข่งต่อไม่ได้จะถูกปรับแพ้</p>
              </div>

              <div className="bg-black/30 border border-white/5 p-3 rounded-lg">
                <p className="font-semibold text-white mb-1">📝 การส่งใบคะแนนส่วนกลาง</p>
                <p className="text-slate-400 leading-relaxed">หลังจบแมตช์ นักกีฬาทั้ง 2 ฝ่ายต้องเซ็นชื่อรับรอง โดยให้ <span className="text-emerald-400 font-medium">ผู้ชนะในเซ็ตสุดท้าย</span> ถือใบสรุปผลส่งให้ทีมงานที่โต๊ะเทคนิค</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}