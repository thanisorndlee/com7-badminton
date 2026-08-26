'use client';

import { useEffect, useMemo, useState } from 'react';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

type MatchRow = any[];
type StandingRow = any[];

const GROUP_STYLES: Record<
  string,
  {
    text: string;
    border: string;
    background: string;
    badge: string;
  }
> = {  
  A: {
  text: 'text-amber-400',
  border: 'border-amber-300/60',
  background: 'bg-amber-500/10',
  badge: 'bg-amber-500 border-amber-300 text-black shadow-[0_0_18px_rgba(245,158,11,.45)]',
},
  B: {
    text: 'text-white',
    border: 'border-blue-300/60',
    background: 'bg-blue-500/10',
    badge: 'bg-blue-500 border-blue-300 shadow-[0_0_18px_rgba(59,130,246,.45)]',
  },
  C: {
    text: 'text-white',
    border: 'border-violet-300/60',
    background: 'bg-violet-500/10',
    badge: 'bg-violet-500 border-violet-300 shadow-[0_0_18px_rgba(139,92,246,.45)]',
  },
  D: {
    text: 'text-white',
    border: 'border-orange-300/60',
    background: 'bg-orange-500/10',
    badge: 'bg-orange-500 border-orange-300 shadow-[0_0_18px_rgba(249,115,22,.45)]',
  },
  E: {
    text: 'text-white',
    border: 'border-pink-300/60',
    background: 'bg-pink-500/10',
    badge: 'bg-pink-500 border-pink-300 shadow-[0_0_18px_rgba(236,72,153,.45)]',
  },
  F: {
    text: 'text-white',
    border: 'border-cyan-300/60',
    background: 'bg-cyan-500/10',
    badge: 'bg-cyan-500 border-cyan-300 shadow-[0_0_18px_rgba(6,182,212,.45)]',
  },
  G: {
  text: 'text-black',
  border: 'border-lime-300/60',
  background: 'bg-lime-500/10',
  badge:
    'bg-lime-500 border-lime-300 text-black shadow-[0_0_18px_rgba(132,204,22,.45)]',
},
};
const GROUP_BUTTONS: Record<string, string> = {
  A: 'bg-yellow-500 border-yellow-300 text-black shadow-[0_0_14px_rgba(234,179,8,.35)]', 
  B: 'bg-blue-500 border-blue-300 text-white shadow-[0_0_14px_rgba(59,130,246,.35)]',
  C: 'bg-violet-500 border-violet-300 text-white shadow-[0_0_14px_rgba(139,92,246,.35)]',
  D: 'bg-orange-500 border-orange-300 text-white shadow-[0_0_14px_rgba(249,115,22,.35)]',
  E: 'bg-pink-500 border-pink-300 text-white shadow-[0_0_14px_rgba(236,72,153,.35)]',
  F: 'bg-cyan-500 border-cyan-300 text-white shadow-[0_0_14px_rgba(6,182,212,.35)]',
  G: 'bg-lime-500 border-lime-300 text-black shadow-[0_0_14px_rgba(132,204,22,.35)]',
};
function getRankDisplay(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return String(rank);
}
function splitScores(value: unknown) {
  return String(value ?? '')
    .trim()
    .split(/[\s,\/|]+/)
    .map((score) => score.trim())
    .filter(Boolean);
}

export default function ResultsPage() {
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [standings, setStandings] = useState<StandingRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ทั้งหมด');
  const [selectedRound, setSelectedRound] = useState('ทั้งหมด');
  const [activeTab, setActiveTab] = useState<
    'ตารางคะแนน' | 'ผลการแข่งขันทั้งหมด'
  >('ตารางคะแนน');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetch(
      'https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec'
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('โหลดข้อมูลไม่สำเร็จ');
        }

        return res.json();
      })
      .then((data) => {
        setMatches(
          Array.isArray(data.matches)
            ? data.matches.slice(1)
            : []
        );

        setStandings(
          Array.isArray(data.standings)
            ? data.standings.slice(1)
            : []
        );

        setIsFetched(true);
      })
      .catch((error) => {
        console.error(error);
        setIsFetched(true);
      });
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();


  const filteredStandings = useMemo(() => {
    return standings.filter((row) => {
      const team = String(row[0] || '').trim();
      const group = String(row[1] || '').trim();

      if (!team || !GROUPS.includes(group)) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [team, group].some((value) =>
        String(value)
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [standings, normalizedSearch]);

  const groupMatches = useMemo(() => {
    return matches.filter((row) => {
      const stage = String(row[1] || '').trim();
      const group = String(row[5] || '').trim();

      if (stage !== 'รอบแบ่งกลุ่ม') {
        return false;
      }

      if (!GROUPS.includes(group)) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [
        row[0],  // MatchID
        row[2],  // MatchDate
        row[3],  // MatchTime
        row[4],  // Court
        row[5],  // Group
        row[6],  // TeamA
        row[7],  // TeamAPlayer1
        row[8],  // TeamADept1
        row[9],  // TeamAPlayer2
        row[10], // TeamADept2
        row[11], // TeamB
        row[12], // TeamBPlayer1
        row[13], // TeamBDept1
        row[14], // TeamBPlayer2
        row[15], // TeamBDept2
      ].some((value) =>
        String(value || '')
          .trim()
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [matches, normalizedSearch]);
const allStageMatches = useMemo(() => {
  return matches.filter((row) => {
    const stage = String(row[1] || '').trim();

    const allowedStages = [
      'รอบแบ่งกลุ่ม',
      'รอบ 16 ทีม',
      'รอบ 8 ทีม',
      'รอบรองชนะเลิศ',
      'รอบชิงชนะเลิศ',
    ];

    if (!allowedStages.includes(stage)) {
      return false;
    }

    if (selectedRound !== 'ทั้งหมด' && stage !== selectedRound) {
      return false;
    }

    if (selectedGroup !== 'ทั้งหมด' && stage === 'รอบแบ่งกลุ่ม') {
      const group = String(row[5] || '').trim();

      if (group !== selectedGroup) {
        return false;
      }
    }

    if (!normalizedSearch) {
      return true;
    }

    return [
      row[0],
      row[1],
      row[2],
      row[3],
      row[4],
      row[5],
      row[6],
      row[7],
      row[8],
      row[9],
      row[10],
      row[11],
      row[12],
      row[13],
      row[14],
      row[15],
    ].some((value) =>
      String(value || '')
        .trim()
        .toLowerCase()
        .includes(normalizedSearch)
    );
  });
}, [
  matches,
  selectedRound,
  selectedGroup,
  normalizedSearch,
]);

const getStandingsByGroup = (group: string) => {
  return filteredStandings
    .filter(
      (row) =>
        String(row[1] || '').trim() === group
    )
    .sort((a, b) => {
      // 1. คะแนนมากกว่าอยู่สูงกว่า
      const pointA = Number(a[6] || 0);
      const pointB = Number(b[6] || 0);

      if (pointA !== pointB) {
        return pointB - pointA;
      }

      // 2. ถ้าคะแนนเท่ากัน → จำนวนชนะมากกว่าอยู่สูงกว่า
      const winA = Number(a[3] || 0);
      const winB = Number(b[3] || 0);

      if (winA !== winB) {
        return winB - winA;
      }

      // 3. ถ้าเท่ากันหมด → เรียงชื่อทีม
      return String(a[0] || '').localeCompare(
        String(b[0] || ''),
        'th'
      );
    });
};

  const getMatchesByGroup = (group: string) => {
    return groupMatches.filter(
      (row) =>
        String(row[5] || '').trim() === group
    );
  };

  return (
<div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#070b14] p-4 pt-20 text-slate-100 md:p-8 md:pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          alt="Tournament Background"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-slate-950/35" />
      </div>

      {/* Main dashboard */}
      <div className="relative z-10 mb-12 w-full max-w-[1500px] rounded-[24px] border border-white/20 bg-slate-950/80 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md md:p-7">

        {/* Header */}
        <div className="mb-5 flex flex-col gap-5 border-b border-white/20 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-2 inline-flex rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400">
              Tournament Results
            </span>

            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>

              <div>
                <h1 className="text-3xl font-black text-white md:text-4xl">
                  ผลการแข่งขัน
                </h1>

                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                  COM7 Badminton Tournament 2026
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[400px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="ค้นหาทีม หรือชื่อผู้เล่น"
              className="w-full rounded-xl border border-white/20 bg-slate-950/90 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
            />
          </div>
        </div>

{/* Tabs + Group filter */}
<div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

  {/* Tabs */}
  <div className="inline-flex w-fit overflow-hidden rounded-lg border border-white/20 bg-slate-950/70">
    <button
      type="button"
      onClick={() => setActiveTab('ตารางคะแนน')}
      className={`px-6 py-3 text-sm font-black transition ${
        activeTab === 'ตารางคะแนน'
          ? 'bg-emerald-600 text-white'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      ตารางคะแนน
    </button>

    <button
      type="button"
      onClick={() => {
        setActiveTab('ผลการแข่งขันทั้งหมด');
        setSelectedGroup('ทั้งหมด');
      }}
      className={`px-6 py-3 text-sm font-black transition ${
        activeTab === 'ผลการแข่งขันทั้งหมด'
          ? 'bg-emerald-600 text-white'
          : 'text-slate-400 hover:text-white'
      }`}
    >
      ผลการแข่งขันทั้งหมด
    </button>
  </div>

  {/* Filters */}
  {activeTab === 'ผลการแข่งขันทั้งหมด' && (
    <div className="flex flex-col gap-3">

      {/* รอบการแข่งขัน */}
      <div className="flex flex-wrap justify-end gap-2">
        {[
          'ทั้งหมด',
          'รอบแบ่งกลุ่ม',
          'รอบ 16 ทีม',
          'รอบ 8 ทีม',
          'รอบรองชนะเลิศ',
          'รอบชิงชนะเลิศ',
        ].map((round) => (
          <button
            key={round}
            type="button"
            onClick={() => {
              setSelectedRound(round);

              if (round !== 'รอบแบ่งกลุ่ม') {
                setSelectedGroup('ทั้งหมด');
              }
            }}
            className={`rounded-xl border-2 px-4 py-3 text-sm font-black transition-all ${
              selectedRound === round
                ? 'border-emerald-400 bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,.35)]'
                : 'border-white/20 bg-[#081221] text-slate-300 hover:border-emerald-400/50 hover:bg-[#0d1b2d]'
            }`}
          >
            {round}
          </button>
        ))}
      </div>

      {/* สาย */}
      {selectedRound === 'รอบแบ่งกลุ่ม' && (
        <div className="flex flex-wrap justify-end gap-2">

          <button
            type="button"
            onClick={() => setSelectedGroup('ทั้งหมด')}
            className={`min-w-[82px] rounded-xl border-2 px-4 py-3 text-sm font-black transition-all ${
              selectedGroup === 'ทั้งหมด'
                ? 'border-emerald-400 bg-[#081221] text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,.35)]'
                : 'border-white/20 bg-[#081221] text-slate-300 hover:bg-[#0d1b2d]'
            }`}
          >
            ทุกสาย
          </button>

          {GROUPS.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setSelectedGroup(group)}
              className={`min-w-[62px] rounded-xl border-2 px-4 py-3 text-sm font-black transition-all ${
                GROUP_BUTTONS[group]
              } ${
                selectedGroup === group
                  ? 'scale-105 ring-2 ring-white/60'
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              {group}
            </button>
          ))}

        </div>
      )}

    </div>
  )}

</div>
        {!isFetched ? (
          <div className="py-24 text-center text-slate-400">
            กำลังโหลดข้อมูลการแข่งขัน...
          </div>
        ) : activeTab === 'ตารางคะแนน' ? (

          /* ตารางคะแนนแบบการ์ด A-F */
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {GROUPS.map((group) => {
                const style = GROUP_STYLES[group];
              const groupStanding =
                getStandingsByGroup(group);
              const matchesInGroup =
                getMatchesByGroup(group);

              return (
                <section
                  key={group}
                  className={`overflow-hidden rounded-xl border bg-slate-950/65 ${style.border}`}
                >
                  {/* Group title */}
                  <div
                    className={`flex items-center gap-3 border-b px-4 py-2 ${style.border} ${style.background}`}
                  >
                    <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-base font-black text-white ${style.badge}`}                    
                    >
                      {group}
                    </div>

                    <h2 className="text-lg font-black text-white">
                        สาย {group}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr]">

                    {/* Standing table */}
                    <div className="border-b border-white/20 lg:border-b-0 lg:border-r">
                      <div className="border-b border-white/20 bg-black/30 px-3 py-1.5 text-center text-xs font-black text-slate-200">
                        ตารางคะแนน
                      </div>
      
                          <table className="w-full border-collapse text-xs">
                          <thead>
                        <tr className="h-[38px] border-b border-white/20 bg-black/20 text-slate-400">
                          <th className="px-2 py-0 text-center">
                            อันดับ
                          </th>

                          <th className="px-2 py-0 text-left">
                            ทีม (แต้มได้เสีย)
                          </th>

                          <th className="px-2 py-0 text-center">
                            แข่ง
                          </th>

                          <th className="px-2 py-0 text-center">
                            ชนะ
                          </th>

                          <th className="px-2 py-0 text-center">
                            แพ้
                          </th>

                          <th className="px-2 py-0 text-center">
                            คะแนน
                          </th>
                        </tr>
                      </thead>
                        <tbody className="divide-y divide-white/20">
                          {groupStanding.length > 0 ? (
                            groupStanding.map(
                              (row, index) => (
                                <tr key={row[0]}>
                                  <td className="px-2 py-2 text-center text-base">
                                    {getRankDisplay(
                                      index + 1
                                    )}
                                  </td>

                                  <td className="px-2 py-2 text-left text-sm font-black text-white">
                                    {row[0]}
                                  </td>

                                  <td className="px-2 py-2 text-center">
                                    {row[2] || 0}
                                  </td>

                                  <td className="px-2 py-2 text-center">
                                    {row[3] || 0}
                                  </td>

                                  <td className="px-2 py-2 text-center">
                                    {row[5] || 0}
                                  </td>

                                  <td className="px-2 py-2 text-center text-sm font-black text-white">
                                    {row[6] || 0}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-3 py-8 text-center text-slate-500"
                              >
                                ไม่พบทีมในสาย {group}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
{/* Match results */}
<div className="flex flex-col">
  <div className="border-b border-white/20 bg-black/30 px-3 py-1.5 text-center text-xs font-black text-slate-200">
    ผลการแข่งขัน
  </div>

  <div className="grid auto-rows-[38px] divide-y divide-white/20">
    {Array.from({ length: 6 }).map((_, index) => {
      const match = matchesInGroup[index];

      if (!match) {
        return (
          <div
            key={`empty-${group}-${index}`}
            className="grid h-[38px] grid-cols-[50px_1fr_50px] items-center gap-2 px-4 text-sm"
          >
            <span className="font-black text-slate-600">
              -
            </span>

            <span className="text-center text-xs text-slate-600">
              รอการแข่งขัน
            </span>

            <span className="text-right font-black text-slate-600">
              -
            </span>
          </div>
        );
      }

      const teamA = String(match[6] || '-');
      const teamB = String(match[11] || '-');

            const scoreSets = [
        [match[16], match[17]],
        [match[18], match[19]],
        [match[20], match[21]],
      ].filter(
        ([a, b]) =>
          a !== '' &&
          a != null &&
          b !== '' &&
          b != null
      );

      const setWinA = scoreSets.filter(
        ([a, b]) => Number(a) > Number(b)
      ).length;

      const setWinB = scoreSets.filter(
        ([a, b]) => Number(b) > Number(a)
      ).length;

      return (
        <div
          key={`${match[0]}-${index}`}
          className="grid h-[38px] grid-cols-[50px_1fr_50px] items-center gap-2 px-4 text-sm"
        >
          <span className="font-black text-white">
            {teamA}
          </span>

          <div className="flex items-center justify-center gap-4">
  {scoreSets.length > 0 ? (
    scoreSets.map(([scoreA, scoreB], scoreIndex) => {
      const a = Number(scoreA);
      const b = Number(scoreB);

      return (
        <div
          key={scoreIndex}
          className="flex items-center gap-1.5 border-l border-white/20 pl-4 first:border-l-0 first:pl-0"
        >
          <span className="text-[9px] font-black uppercase tracking-wide text-slate-500">
            Set {scoreIndex + 1}
          </span>

          <div className="flex items-center font-mono text-xs font-black">
            <span
              className={
                a > b
                  ? 'text-emerald-400'
                  : a < b
                    ? 'text-red-400'
                    : 'text-slate-300'
              }
            >
              {scoreA}
            </span>

            <span className="px-0.5 text-slate-500">-</span>

            <span
              className={
                b > a
                  ? 'text-emerald-400'
                  : b < a
                    ? 'text-red-400'
                    : 'text-slate-300'
              }
            >
              {scoreB}
            </span>
          </div>
        </div>
      );
    })
  ) : (
    <span className="font-medium text-slate-600">
      รอการแข่งขัน
    </span>
  )}
</div>

          <span className="text-right font-black text-white">
            {teamB}
          </span>
        </div>
      );
    })}
  </div>
</div>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (

 /* ผลการแข่งขันทั้งหมด */
<div>
  <div className="space-y-4">
    {allStageMatches.map((match, index) => {
    const stage = String(match[1] || '').trim();
    const group = String(match[5] || '-');
    const teamA = String(match[6] || 'TBD');
    const teamB = String(match[11] || 'TBD');

        const scoreSets = [
          [match[16], match[17]],
          [match[18], match[19]],
          [match[20], match[21]],
        ].filter(
          ([a, b]) =>
            a !== '' &&
            a != null &&
            b !== '' &&
            b != null
        );

        const setWinA = scoreSets.filter(
          ([a, b]) => Number(a) > Number(b)
        ).length;

        const setWinB = scoreSets.filter(
          ([a, b]) => Number(b) > Number(a)
        ).length;

const winner = String(match[24] || '')
  .replace(/\s+/g, '')
  .toUpperCase();

const teamAKey = String(teamA)
  .replace(/\s+/g, '')
  .toUpperCase();

const teamBKey = String(teamB)
  .replace(/\s+/g, '')
  .toUpperCase();

const teamAColor =
  scoreSets.length === 0
    ? 'text-white'
    : setWinA > setWinB
      ? 'text-emerald-400'
      : setWinA < setWinB
        ? 'text-red-400'
        : 'text-white';

const teamBColor =
  scoreSets.length === 0
    ? 'text-white'
    : setWinB > setWinA
      ? 'text-emerald-400'
      : setWinB < setWinA
        ? 'text-red-400'
        : 'text-white';
const winnerColor =
  winner === 'DRAW'
    ? 'text-yellow-400'
    : winner === teamAKey || winner === teamBKey
      ? 'text-emerald-400'
      : 'text-slate-400';
        return (
          <div
            key={`${match[0]}-${index}`}
            className="w-full"
          >
            {/* Mobile */}
            <article className="overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 md:hidden">
              <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
                <span
  className={`inline-flex min-w-[72px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-black ${
    stage === 'รอบแบ่งกลุ่ม'
      ? (
          GROUP_BUTTONS[group] ||
          'border-slate-500 bg-slate-600 text-white'
        )
      : 'border-emerald-400 bg-emerald-600 text-white'
  }`}
>
  {stage === 'รอบแบ่งกลุ่ม'
    ? `สาย ${group}`
    : stage}
</span>

                <span className="text-sm font-black text-slate-300">
                  ทีม {teamA} vs {teamB} 🏸
                </span>
              </div>

              <div className="grid grid-cols-[1fr_92px_1fr] items-center px-3 py-5">
                <div className="min-w-0 border-r border-white/15 pr-3 text-left">
                  <p
  className={`truncate text-base font-black ${teamAColor}`}
>
  ทีม {teamA}
</p>

                  <p className="mt-3 break-words text-lg font-black text-white">
                    {match[7] || '-'}
                  </p>

                  <p className="mt-1 break-words text-lg font-black text-white">
                    {match[9] || '-'}
                  </p>

                  <p className="mt-4 break-words text-xs font-black text-emerald-400">
                    แผนก {match[8]}
                    {match[10] && match[10] !== match[8]
                      ? ` / ${match[10]}`
                      : ''}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center px-2 text-center">
                  <span className="text-xl">🏆</span>

                  <p className="mt-1 text-[10px] font-black text-white">
                    ชนะ
                  </p>

                  <div className="mt-2 whitespace-nowrap text-3xl font-black text-emerald-400">
                    {setWinA} : {setWinB}
                  </div>
                </div>

                <div className="min-w-0 border-l border-white/15 pl-3 text-left">
                      <p
        className={`truncate text-base font-black ${teamBColor}`}
      >
        ทีม {teamB}
      </p>

                  <p className="mt-3 break-words text-lg font-black text-white">
                    {match[12] || '-'}
                  </p>

                  <p className="mt-1 break-words text-lg font-black text-white">
                    {match[14] || '-'}
                  </p>

                  <p className="mt-4 break-words text-xs font-black text-emerald-400">
                    แผนก {match[13]}
                    {match[15] && match[15] !== match[13]
                      ? ` / ${match[15]}`
                      : ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 border-t border-white/15 px-3 py-4">
                {scoreSets.length > 0 ? (
                  scoreSets.map(
                    ([scoreA, scoreB], scoreIndex) => (
                      <div
                        key={scoreIndex}
                        className="flex min-w-[112px] items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/30 px-3 py-2"
                      >
                        <span className="text-xs font-black text-slate-400">
                          SET {scoreIndex + 1}
                        </span>

                        <div className="font-mono text-sm font-black">
                          <span
                            className={
                            Number(scoreA) > Number(scoreB)
                              ? 'text-emerald-400'
                              : Number(scoreA) < Number(scoreB)
                                ? 'text-red-400'
                                : 'text-white'
                          }
                          >
                            {scoreA}
                          </span>

                          <span className="px-1.5 text-slate-500">
                            -
                          </span>

                          <span
                            className={
                            Number(scoreB) > Number(scoreA)
                              ? 'text-emerald-400'
                              : Number(scoreB) < Number(scoreA)
                                ? 'text-red-400'
                                : 'text-white'
                          }
                          >
                            {scoreB}
                          </span>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <span className="text-sm text-slate-500">
                    รอผลการแข่งขัน
                  </span>
                )}
              </div>

              <div className="border-t border-white/15 px-4 py-3 text-center">
                <span className="text-sm font-black text-emerald-400">
                  ผู้ชนะ: {
  winner === 'DRAW'
    ? 'เสมอ'
    : winner
      ? `ทีม ${winner}`
      : 'รอผล'
}
                </span>
              </div>
            </article>

            {/* Desktop */}
            <article className="hidden w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950/75 shadow-[0_12px_30px_rgba(0,0,0,.3)] md:block">
              <div className="grid grid-cols-[130px_1fr_230px_1fr_180px]">
                <div className="flex items-center justify-center border-r border-white/20 p-5">
                  <span
  className={`inline-flex min-w-[88px] items-center justify-center rounded-xl border px-4 py-3 text-base font-black ${
    stage === 'รอบแบ่งกลุ่ม'
      ? (
          GROUP_BUTTONS[group] ||
          'border-slate-500 bg-slate-600 text-white'
        )
      : 'border-emerald-400 bg-emerald-600 text-white'
  }`}
>
  {stage === 'รอบแบ่งกลุ่ม'
    ? `สาย ${group}`
    : stage}
</span>
                </div>

                <div className="border-r border-white/20 p-5">
                  <p className={`mb-3 text-xl font-black ${teamAColor}`}>
  ทีม {teamA}
</p>
                  <p className="text-base font-bold text-white">
                    {match[7] || '-'}
                  </p>
                  <p className="mt-1 text-base font-bold text-white">
                    {match[9] || '-'}
                  </p>
                  <p className="mt-3 text-sm font-black text-emerald-400">
                    แผนก {match[8]}
                    {match[10] && match[10] !== match[8]
                      ? ` / ${match[10]}`
                      : ''}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center border-r border-white/20 p-5">
                  <span className="mb-2 text-3xl">🏸</span>
                  <div className="text-4xl font-black text-emerald-400">
                    {setWinA} : {setWinB}
                  </div>

                  <div className="mt-5 flex w-full flex-col gap-2">
                    {scoreSets.length > 0 ? (
                      scoreSets.map(([scoreA, scoreB], scoreIndex) => (
                        <div
                          key={scoreIndex}
                          className="flex items-center justify-between rounded-lg border border-white/25 bg-black/40 px-4 py-2"
                        >
                          <span className="text-sm font-black uppercase tracking-wider text-slate-400">
                            Set {scoreIndex + 1}
                          </span>

                          <div className="flex items-center gap-2 font-mono text-base font-black">
                            <span
                              className={
                              Number(scoreA) > Number(scoreB)
                                ? 'text-emerald-400'
                                : Number(scoreA) < Number(scoreB)
                                  ? 'text-red-400'
                                  : 'text-white'
                            }
                            >
                              {scoreA}
                            </span>
                            <span className="text-slate-500">-</span>
                            <span
                              className={
                              Number(scoreB) > Number(scoreA)
                                ? 'text-emerald-400'
                                : Number(scoreB) < Number(scoreA)
                                  ? 'text-red-400'
                                  : 'text-white'
                            }
                            >
                              {scoreB}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-center text-sm text-slate-500">
                        รอผลการแข่งขัน
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-r border-white/20 p-5">
                  <p className={`mb-3 text-xl font-black ${teamBColor}`}>
                    ทีม {teamB}
                  </p>
                  <p className="text-base font-bold text-white">
                    {match[12] || '-'}
                  </p>
                  <p className="mt-1 text-base font-bold text-white">
                    {match[14] || '-'}
                  </p>
                  <p className="mt-3 text-sm font-black text-emerald-400">
                    แผนก {match[13]}
                    {match[15] && match[15] !== match[13]
                      ? ` / ${match[15]}`
                      : ''}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-5 text-center">
                  <span className="text-4xl">🏆</span>
                  <p className="mt-2 text-sm font-black text-emerald-400">
                    ผู้ชนะ
                  </p>
<p className="mt-1 text-2xl font-black text-emerald-400">
                      {winner === 'DRAW'
                      ? 'เสมอ'
                      : winner
                        ? `ทีม ${winner}`
                        : 'รอผล'}
                  </p>
                </div>
              </div>
            </article>
          </div>
        );
      })}

    {groupMatches.filter(
      (match) =>
        selectedGroup === 'ทั้งหมด' ||
        String(match[5] || '').trim() === selectedGroup
    ).length === 0 && (
      <div className="rounded-xl border border-white/20 bg-slate-950/60 px-4 py-16 text-center text-slate-500">
        ยังไม่มีผลการแข่งขันในสายที่เลือก
      </div>
    )}
  </div>
</div>
        )}

        {/* Note */}
        <div className="mt-5 rounded-xl border border-white/20 bg-slate-950/65 px-4 py-3 text-xs leading-6 text-slate-400">
          <span className="mr-2 text-blue-400">
            ℹ
          </span>
          การจัดอันดับอ้างอิงจากคะแนนรวม ตามด้วยจำนวนชนะ
          และชื่อทีมตามลำดับ
        </div>
      </div>
    </div>
  );
}