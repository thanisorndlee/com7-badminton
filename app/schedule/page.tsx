'use client';

import { useEffect, useState, useMemo } from 'react';

export default function SchedulePage() {
const [matches, setMatches] = useState<any[]>([]);
const [searchTerm, setSearchTerm] = useState('');
const [selectedDate, setSelectedDate] = useState('6 ส.ค. 2569');
const [selectedRound, setSelectedRound] =
  useState('รอบแบ่งกลุ่ม');
const [stageFilter, setStageFilter] = useState('ทั้งหมด');
const [groupFilter, setGroupFilter] = useState('ทั้งหมด');
const [isFetched, setIsFetched] = useState(false);
const TEAM_BADGE_STYLES: Record<string, string> = {
  A: 'border-yellow-300 bg-yellow-500 text-black shadow-[0_0_18px_rgba(234,179,8,0.45)]',
  B: 'border-blue-300 bg-blue-500 text-white shadow-[0_0_18px_rgba(59,130,246,0.45)]',
  C: 'border-violet-300 bg-violet-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.45)]',
  D: 'border-orange-300 bg-orange-500 text-white shadow-[0_0_18px_rgba(249,115,22,0.45)]',
  E: 'border-pink-300 bg-pink-500 text-white shadow-[0_0_18px_rgba(236,72,153,0.45)]',
  F: 'border-cyan-300 bg-cyan-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.45)]',
  G: 'border-lime-300 bg-lime-500 text-black shadow-[0_0_18px_rgba(132,204,22,0.45)]',
};
const roundDates: Record<string, string[]> = {
  'รอบแบ่งกลุ่ม': [
    '6 ส.ค. 2569',
    '11 ส.ค. 2569',
    '18 ส.ค. 2569',
    '19 ส.ค. 2569',
  ],

  'รอบ 16 คู่': [],
  'รอบ 8 คู่': [],
  'รอบรองชนะเลิศ': [],
  'รอบชิงชนะเลิศ': [],
};
const rounds = [
  'รอบแบ่งกลุ่ม',
  'รอบ 16 คู่',
  'รอบ 8 คู่',
  'รอบรองชนะเลิศ',
  'รอบชิงชนะเลิศ',
];

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec')
      .then((res) => res.json())
      .then((data) => {
        if (data.matches) setMatches(data.matches.slice(1));
        setIsFetched(true);
      })
      .catch(() => setIsFetched(true));
  }, []);

const tableMatches = useMemo(() => {
  if (!isFetched) return [];

  const search = searchTerm.trim().toLowerCase();

  const filtered = matches.filter((match) => {
    const stage = String(match[1] || '').trim();
    const matchDate = String(match[2] || '').trim();

    // เลือกตามรอบการแข่งขัน
    if (stage !== selectedRound) {
      return false;
    }

    // ถ้ารอบที่เลือกมีวันที่ ให้กรองตามวันที่
    const datesOfSelectedRound = roundDates[selectedRound] || [];

    if (
      datesOfSelectedRound.length > 0 &&
      matchDate !== selectedDate
    ) {
      return false;
    }

    // ถ้าไม่ได้ค้นหา
    if (!search) {
      return true;
    }

    return [
      match[0],
      match[1],
      match[2],
      match[3],
      match[4],
      match[5],
      match[6],
      match[7],
      match[8],
      match[9],
      match[10],
      match[11],
      match[12],
      match[13],
      match[14],
      match[15],
      match[16],
      match[17],
    ].some((value) =>
      String(value || '')
        .trim()
        .toLowerCase()
        .includes(search)
    );
  });

  // รอบ 16 คู่ แสดงในตารางจริงแค่ 8 คู่
  if (selectedRound === 'รอบ 16 คู่') {
    return filtered.slice(0, 8);
  }
   if (selectedRound === 'รอบ 8 คู่') {
    return filtered.slice(0, 4);
  }

  return filtered;
}, [
  isFetched,
  matches,
  searchTerm,
  selectedDate,
  selectedRound,
]);

  // =============================
// ข้อมูลแต่ละรอบของสายการแข่งขัน
// =============================

const round16 = useMemo(() => {
  return matches.filter((m) => String(m[1]) === "รอบ 16 คู่");
}, [matches]);

const round8 = useMemo(() => {
  return matches.filter((m) => String(m[1]) === "รอบ 8 คู่");
}, [matches]);


const semifinalRound = useMemo(() => {
  return matches.filter(
    (m) => String(m[1]).trim() === "รอบรองชนะเลิศ"
  );
}, [matches]);

const finalRound = useMemo(() => {
  return matches.filter(
    (m) => String(m[1]).trim() === "รอบชิงชนะเลิศ"
  );
}, [matches]);
const isKnockoutRound = [
  'รอบ 16 คู่',
  'รอบ 8 คู่',
  'รอบรองชนะเลิศ',
  'รอบชิงชนะเลิศ',
].includes(selectedRound);

console.log("Round 16:", round16);
console.log("Round 8:", round8);
console.log("Semifinal:", semifinalRound);
console.log("Final:", finalRound);

const BracketBox = ({ match }: { match: any }) => {
  return (
    <div className="flex h-12 w-36 items-center justify-center rounded-xl border border-emerald-500/30 bg-gradient-to-br from-black/90 to-slate-900/90 backdrop-blur-md shadow-[0_0_20px_rgba(52,211,153,0.15)] transition-all hover:scale-105">
      <span className="text-center text-sm font-bold text-white">
        {match[0] || '-'}
      </span>
    </div>
  );
};
const getGroupClass = (group: string) => {
  const normalizedGroup = String(group || '')
    .trim()
    .toUpperCase();

  const groupClasses: Record<string, string> = {
  A: 'bg-amber-500 border-amber-300 text-black shadow-[0_0_16px_rgba(245,158,11,.45)]',
  B: 'bg-blue-500 border-blue-300 text-white shadow-[0_0_14px_rgba(59,130,246,.35)]',
  C: 'bg-violet-500 border-violet-300 text-white shadow-[0_0_14px_rgba(139,92,246,.35)]',
  D: 'bg-orange-500 border-orange-300 text-white shadow-[0_0_14px_rgba(249,115,22,.35)]',
  E: 'bg-pink-500 border-pink-300 text-white shadow-[0_0_14px_rgba(236,72,153,.35)]',
  F: 'bg-cyan-500 border-cyan-300 text-white shadow-[0_0_14px_rgba(6,182,212,.35)]',
  G: 'bg-lime-500 border-lime-300 text-black shadow-[0_0_14px_rgba(132,204,22,.35)]',
};

  return (
    groupClasses[normalizedGroup] ||
    'bg-slate-600 border-slate-400/40 text-white'
  );
};

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-4 md:p-10 pt-28 select-none relative flex flex-col items-center font-sans">
      <div className="absolute inset-0 z-0">
        <img src="/badminton-bg.jpg"
         className="w-full h-full object-fill opacity-85" alt="Background" />
      </div>

<div className="max-w-6xl w-full bg-slate-950/75 border border-white/20 p-6 md:p-8 rounded-[24px] relative z-10 mb-12 shadow-2xl">
<div className="mb-8 border-b border-white/10 pb-6">
  <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">

{/* ฝั่งซ้าย: หัวข้อ + ปุ่มเลือกรอบ + วันที่ */}
<div className="flex-shrink-0">

  <span className="mb-1.5 inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 shadow-sm">
    Tournament Schedule
  </span>

  <h1 className="text-2xl font-black tracking-wide text-white drop-shadow-md md:text-3xl">
    ตารางการแข่งขัน
  </h1>


</div>
{/* ฝั่งขวา: รอบ + วันที่ + ค้นหา */}
<div className="flex w-full flex-col gap-3 xl:w-auto xl:items-end">

  {/* ปุ่มเลือกรอบ */}
  <div className="flex flex-wrap gap-2 xl:justify-end">
    {rounds.map((round) => (
      <button
        key={round}
        type="button"
        onClick={() => {
          setSelectedRound(round);

          const dates = roundDates[round] || [];

          if (dates.length > 0) {
            setSelectedDate(dates[0]);
          }
        }}
        className={`rounded-lg border px-4 py-2 text-xs font-black transition-all ${
          selectedRound === round
            ? 'border-yellow-400 bg-yellow-400 text-black shadow-[0_0_18px_rgba(250,204,21,.35)]'
            : 'border-white/15 bg-slate-900/80 text-slate-300 hover:border-yellow-400/50 hover:text-white'
        }`}
      >
        {round}
      </button>
    ))}
  </div>

  {/* ปุ่มวันที่ */}
  {roundDates[selectedRound]?.length > 0 && (
    <div className="flex flex-wrap gap-2 xl:justify-end">

      {roundDates[selectedRound].map((date) => (
        <button
          key={date}
          type="button"
          onClick={() => setSelectedDate(date)}
          className={`rounded-lg border px-4 py-2 text-xs font-black transition-all ${
            selectedDate === date
              ? 'border-emerald-400 bg-emerald-500 text-black shadow-[0_0_18px_rgba(16,185,129,.35)]'
              : 'border-white/15 bg-slate-900/80 text-slate-300 hover:border-emerald-500/50 hover:text-white'
          }`}
        >
          {date}
        </button>
      ))}

    </div>
  )}

</div>
  </div>
</div>
{/* Mobile cards */}
<div className="space-y-4 md:hidden">
  {tableMatches.length > 0 ? (
    tableMatches.map((m, i) => {
      const group = String(m[5] || '').trim();
        const matchOrder = i + 1;

const scoreA =
  m[22] !== '' && m[22] != null
    ? m[22]
    : '-';

const scoreB =
  m[23] !== '' && m[23] != null
    ? m[23]
    : '-';

      return (
        <article
          key={`${m[0]}-${i}`}
          className="overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 shadow-xl"
        >
          {/* Header */}
<div className="border-b border-white/15 px-4 py-3">
  <div className="flex items-center justify-between gap-3">
    <span className="rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-3 py-1.5 text-sm font-black text-emerald-400">
      {m[3] || '-'}
    </span>

    <span
  className={`inline-flex min-w-[64px] items-center justify-center rounded-lg border px-3 py-1.5 text-sm font-black ${
    isKnockoutRound
      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-400'
      : getGroupClass(group)
  }`}
>
  {isKnockoutRound
    ? `ลำดับ ${matchOrder}`
    : `สาย ${group || '-'}`}
</span>
  </div>

  <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-400">
    <span>{m[2] || '-'}</span>
    <span>🏸 {m[4] || '-'}</span>
  </div>
</div>

         {/* Content */}
<div className="p-4">
  {/* ทีมแข่งขัน */}
  <div className="grid grid-cols-[1fr_54px_1fr] items-center gap-3">
    {/* Team A */}
    <div className="min-w-0 text-center">
      <div
        className={`mx-auto flex h-12 w-16 items-center justify-center rounded-xl border-2 text-base font-black ${getGroupClass(
          group
        )}`}
      >
        {m[6] || '-'}
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <p className="break-words text-sm font-black text-white">
            {m[7] || '-'}
          </p>
          <p className="mt-1 text-[10px] font-semibold text-emerald-400">
            {m[8] ? `แผนก ${m[8]}` : 'ไม่ระบุแผนก'}
          </p>
        </div>

        <div>
          <p className="break-words text-sm font-black text-white">
            {m[9] || '-'}
          </p>
          <p className="mt-1 text-[10px] font-semibold text-emerald-400">
            {m[10] ? `แผนก ${m[10]}` : 'ไม่ระบุแผนก'}
          </p>
        </div>
      </div>
    </div>

    {/* VS */}
    <div className="flex items-center justify-center">
      <span className="text-xl font-black italic text-slate-400">
        VS
      </span>
    </div>

    {/* Team B */}
    <div className="min-w-0 text-center">
      <div
        className={`mx-auto flex h-12 w-16 items-center justify-center rounded-xl border-2 text-base font-black ${getGroupClass(
          group
        )}`}
      >
        {m[11] || '-'}
      </div>

      <div className="mt-3 space-y-3">
        <div>
          <p className="break-words text-sm font-black text-white">
            {m[12] || '-'}
          </p>
          <p className="mt-1 text-[10px] font-semibold text-emerald-400">
            {m[13] ? `แผนก ${m[13]}` : 'ไม่ระบุแผนก'}
          </p>
        </div>

        <div>
          <p className="break-words text-sm font-black text-white">
            {m[14] || '-'}
          </p>
          <p className="mt-1 text-[10px] font-semibold text-emerald-400">
            {m[15] ? `แผนก ${m[15]}` : 'ไม่ระบุแผนก'}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* คะแนน */}
  <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3">
    <div>
      <p className="text-[10px] font-bold text-slate-400">
        ผลคะแนน
      </p>
      <p className="mt-1 font-mono text-xl font-black text-emerald-400">
        {scoreA} : {scoreB}
      </p>
    </div>

    <div className="text-right">
      <p className="text-[10px] font-bold text-slate-400">
        วันที่แข่งขัน
      </p>
      <p className="mt-1 text-xs font-black text-white">
        {m[2] || '-'}
      </p>
    </div>
  </div>
</div>
        </article>
      );
    })
  ) : (
    <div className="rounded-xl border border-white/15 bg-slate-950/70 px-4 py-12 text-center text-slate-500">
      ไม่พบข้อมูลการแข่งขันของวันที่ {selectedDate}
    </div>
  )}
</div>
<div className="hidden md:block">
        {/* ตารางแสดงผล */}
<div className="mb-12 w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20">
  <table className="w-full min-w-[1040px] table-fixed border-collapse text-left text-sm">

    <colgroup>
  <col className="w-[9%]" />
  <col className="w-[8%]" />
  <col className="w-[11%]" />
  <col className="w-[7%]" />
  <col className="w-[25%]" />
  <col className="w-[5%]" />
  <col className="w-[25%]" />
  <col className="w-[10%]" />
</colgroup>

    <thead>
      <tr className="border-b border-white/15 bg-black/95 text-[11px] font-black uppercase text-slate-300">
        <th className="border-r border-white/10 px-3 py-5 text-center">
          วันที่
        </th>

        <th className="border-r border-white/10 px-3 py-5 text-center">
          สนาม
        </th>

        <th className="border-r border-white/10 px-3 py-5 text-center">
  เวลา
</th>

<th className="border-r border-white/10 px-3 py-5 text-center">
  {isKnockoutRound ? 'ลำดับ' : 'สาย'}
</th>

        <th className="px-4 py-5 text-center">
          TEAM
        </th>

        <th className="px-0 py-5 text-center">
          VS
        </th>

        <th className="border-r border-white/10 px-4 py-5 text-center">
          TEAM
        </th>

        <th className="px-3 py-5 text-center">
          ผลคะแนน
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-white/10 font-semibold">
      {tableMatches.length > 0 ? (
        tableMatches.map((m, i) => {
          const group = String(m[5] || '').trim();
const matchOrder = i + 1;
const scoreA =
  m[22] !== '' && m[22] != null
    ? m[22]
    : '-';

const scoreB =
  m[23] !== '' && m[23] != null
    ? m[23]
    : '-';

          return (
            <tr
              key={`${m[0]}-${i}`}
              className="transition-colors hover:bg-white/5"
            >
              {/* วันที่ */}
              <td className="border-r border-white/10 px-3 py-5 text-center text-xs text-slate-300 whitespace-nowrap">
                {m[2] || '-'}
              </td>

              {/* สนาม */}
              <td className="border-r border-white/10 px-3 py-5 text-center text-sm font-black text-white whitespace-nowrap">
                {m[4] || '-'}
              </td>

              {/* เวลาแข่งขัน */}
              <td className="border-r border-white/10 px-3 py-5 text-center text-sm font-black text-white whitespace-nowrap">
                {m[3] || '-'}
              </td>

              {/* สาย / ลำดับ */}
<td className="border-r border-white/10 px-3 py-5 text-center">
  {isKnockoutRound ? (
    <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 text-base font-black text-emerald-400">
      {matchOrder}
    </span>
  ) : (
    <span
      className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-base font-black ${getGroupClass(
        group
      )}`}
    >
      {group || '-'}
    </span>
  )}
</td>

              {/* TEAM ฝั่งซ้าย */}
              <td className="px-3 py-5 align-middle">
  <div className="flex items-start justify-end gap-1">

                  {/* รายชื่ออยู่ด้านซ้าย */}
                  <div className="min-w-0 flex-1 space-y-2 text-right">
                    <div>
                      <p className="break-words text-sm font-black leading-tight text-white">
                        {m[7] || '-'}
                      </p>

                      <p className="mt-1 break-words text-[10px] font-semibold text-emerald-400">
                        {m[8]
                          ? `แผนก ${m[8]}`
                          : 'ไม่ระบุแผนก'}
                      </p>
                    </div>

                    <div>
                      <p className="break-words text-sm font-black leading-tight text-white">
                        {m[9] || '-'}
                      </p>

                      <p className="mt-1 break-words text-[10px] font-semibold text-emerald-400">
                        {m[10]
                          ? `แผนก ${m[10]}`
                          : 'ไม่ระบุแผนก'}
                      </p>
                    </div>
                  </div>

                  {/* รหัสทีมติดใกล้ VS */}
                  <div
                    className={`ml-6 flex h-11 w-[58px] items-center justify-center rounded-lg border-2 text-sm font-black transition-all ${getGroupClass(
                      group
                    )}`}
                  >
                    {m[6] || '-'}
                  </div>
                </div>
              </td>

              {/* VS ขยับซ้ายเล็กน้อย */}
              <td className="px-0 py-5 text-center align-middle">
                <span className="relative -left-1 text-xl font-black italic text-slate-400">
                  VS
                </span>
              </td>

              {/* TEAM ฝั่งขวา */}
              <td className="border-r border-white/10 px-3 py-5 align-middle">
                <div className="flex items-start gap-3">

                  {/* รหัสทีมติดใกล้ VS */}
                  <div
                    className={`mr-6 flex h-11 w-[58px] items-center justify-center rounded-lg border-2 text-sm font-black transition-all ${getGroupClass(
                      group
                    )}`}
                  >
                    {m[11] || '-'}
                  </div>

                  {/* รายชื่ออยู่ด้านขวา */}
                  <div className="min-w-0 flex-1 space-y-2 text-left">
                    <div>
                      <p className="break-words text-sm font-black leading-tight text-white">
                        {m[12] || '-'}
                      </p>

                      <p className="mt-1 break-words text-[10px] font-semibold text-emerald-400">
                        {m[13]
                          ? `แผนก ${m[13]}`
                          : 'ไม่ระบุแผนก'}
                      </p>
                    </div>

                    <div>
                      <p className="break-words text-sm font-black leading-tight text-white">
                        {m[14] || '-'}
                      </p>

                      <p className="mt-1 break-words text-[10px] font-semibold text-emerald-400">
                        {m[15]
                          ? `แผนก ${m[15]}`
                          : 'ไม่ระบุแผนก'}
                      </p>
                    </div>
                  </div>
                </div>
              </td>

              {/* ผลคะแนน */}
              <td className="px-3 py-5 text-center">
                <div className="mx-auto flex w-[88px] items-center justify-center gap-2 rounded-lg border border-white/10 bg-black px-2 py-2 font-mono font-black text-emerald-400">
                  {scoreA} : {scoreB}
                </div>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={8}
            className="p-12 text-center text-slate-500"
          >
            ไม่พบข้อมูลการแข่งขันของวันที่ {selectedDate}
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
{/* =========================================
    แผนผังการแข่งขัน
========================================= */}

<h2 className="mb-12 text-center text-3xl font-black text-emerald-400">
  แผนผังการแข่งขัน
</h2>

<div className="w-full overflow-x-auto pb-10">
  <div className="relative mx-auto w-[1200px] px-6">

    {/* =====================================================
        พื้นที่ Bracket
        ทุกตำแหน่งใช้ระบบเดียวกัน

        กล่องสูง 48px
        รอบ 16 ห่างกัน 80px
        รอบ 8 ห่างกัน 160px
        รอบรอง ห่างกัน 320px
        รอบชิง ห่างกัน 640px
    ===================================================== */}

    <div className="relative h-[1320px]">

<svg
  xmlns="http://www.w3.org/2000/svg"
  className="
    pointer-events-none
    absolute
    left-0
    top-0
    z-0
    h-[1320px]
    w-full
  "
>
  {/* =====================================================
      รอบ 16 → รอบ 8
      ขยับเส้นลง 24px
  ===================================================== */}

  {Array.from({ length: 8 }).map((_, i) => {
    const offset = 48;

    const yTop = 24 + i * 160 + offset;
    const yBottom = yTop + 80;
    const yTarget = 64 + i * 160 + offset;

    return (
      <path
        key={`r16-r8-${i}`}
        d={`
          M 144 ${yTop}
          H 192
          V ${yTarget}
          H 240

          M 144 ${yBottom}
          H 192
          V ${yTarget}
        `}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  })}


  {/* =====================================================
      รอบ 8 → รอบรอง
      ขยับเส้นลง 24px
  ===================================================== */}

  {Array.from({ length: 4 }).map((_, i) => {
    const offset = 48;

    const yTop = 64 + i * 320 + offset;
    const yBottom = yTop + 160;
    const yTarget = 144 + i * 320 + offset;

    return (
      <path
        key={`r8-semi-${i}`}
        d={`
          M 384 ${yTop}
          H 432
          V ${yTarget}
          H 480

          M 384 ${yBottom}
          H 432
          V ${yTarget}
        `}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  })}


  {/* =====================================================
      รอบรอง → รอบชิง
      ขยับเส้นลง 24px
  ===================================================== */}

  {Array.from({ length: 2 }).map((_, i) => {
    const offset = 48;

    const yTop = 144 + i * 640 + offset;
    const yBottom = yTop + 320;
    const yTarget = 304 + i * 640 + offset;

    return (
      <path
        key={`semi-final-${i}`}
        d={`
          M 624 ${yTop}
          H 672
          V ${yTarget}
          H 720

          M 624 ${yBottom}
          H 672
          V ${yTarget}
        `}
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  })}


  {/* =====================================================
      รอบชิง → แชมป์
      ขยับเส้นลง 24px
  ===================================================== */}

<path
  d="
    M 864 344
    H 912
    V 664
    H 960
  "
    fill="none"
    stroke="#facc15"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

<path
  d="
    M 864 984
    H 912
    V 664
    H 960
  "
    fill="none"
    stroke="#facc15"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

</svg>

      {/* ===================================================
          รอบ 16 คู่
          16 กล่อง
      =================================================== */}

      <div className="absolute left-0 top-0 z-10 w-36">

        <h3 className="mb-6 text-center font-black text-emerald-400">
          รอบ 16 คู่
        </h3>

        <div className="relative h-[1280px]">

          {round16.slice(0, 16).map((match, i) => (

            <div
              key={`round16-${i}`}
              className="absolute left-0"
              style={{
                top: `${i * 80}px`,
              }}
            >
              <BracketBox match={match} />
            </div>

          ))}

        </div>

      </div>


      {/* ===================================================
          รอบ 8 คู่
          8 กล่อง
      =================================================== */}

      <div className="absolute left-[240px] top-0 z-10 w-36">

        <h3 className="mb-6 text-center font-black text-emerald-400">
          รอบ 8 คู่
        </h3>

        <div className="relative h-[1280px]">

          {round8.slice(0, 8).map((match, i) => (

            <div
              key={`round8-${i}`}
              className="absolute left-0"
              style={{
                top: `${40 + i * 160}px`,
              }}
            >
              <BracketBox match={match} />
            </div>

          ))}

        </div>

      </div>


      {/* ===================================================
          รอบรองชนะเลิศ
          4 กล่อง
      =================================================== */}

      <div className="absolute left-[480px] top-0 z-10 w-36">

        <h3 className="mb-6 text-center font-black text-emerald-400">
          รอบรองชนะเลิศ
        </h3>

        <div className="relative h-[1280px]">

          {semifinalRound.slice(0, 4).map((match, i) => (

            <div
              key={`semifinal-${i}`}
              className="absolute left-0"
              style={{
                top: `${120 + i * 320}px`,
              }}
            >
              <BracketBox match={match} />
            </div>

          ))}

        </div>

      </div>


      {/* ===================================================
          รอบชิงชนะเลิศ
          2 กล่อง
      =================================================== */}

      <div className="absolute left-[720px] top-0 z-10 w-36">

        <h3 className="mb-6 text-center font-black text-emerald-400">
          รอบชิงชนะเลิศ 🏆
        </h3>

        <div className="relative h-[1280px]">

          {finalRound.slice(0, 2).map((match, i) => (

            <div
              key={`final-${i}`}
              className="absolute left-0"
              style={{
                top: `${280 + i * 640}px`,
              }}
            >
              <BracketBox match={match} />
            </div>

          ))}

        </div>

      </div>


      {/* ===================================================
          ถ้วยแชมป์
      =================================================== */}

      <div className="absolute left-[1000px] top-0 z-10 w-36">

        <h3 className="mb-6 text-center font-black opacity-0">
          ถ้วย
        </h3>

        <div
          className="absolute left-0 flex w-36 flex-col items-center"
          style={{
            top: `360px`,
          }}
        >

          {/* Glow */}
          <div
            className="
              absolute
              -z-10
              h-40
              w-40
              rounded-full
              bg-yellow-400/20
              blur-3xl
            "
          />

          {/* Trophy */}
          <img
            src="/trophy.png"
            alt="Champion"
            className="
              w-28
              drop-shadow-[0_0_25px_rgba(255,215,0,.8)]
            "
          />

          <p className="mt-3 text-center text-xl font-black text-yellow-400">
            CHAMPION
          </p>

        </div>

      </div>

    </div>
  </div>
</div>
      </div>
    </div>
</div>
);
}