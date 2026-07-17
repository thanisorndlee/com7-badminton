'use client';

import { useEffect, useMemo, useState } from 'react';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F'];

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
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
    background: 'bg-emerald-500/5',
badge: 'shadow-[0_0_18px_rgba(16,185,129,.35)]',
  },
  B: {
    text: 'text-blue-400',
    border: 'border-blue-500/40',
    background: 'bg-blue-500/5',
badge: 'shadow-[0_0_18px_rgba(59,130,246,.35)]'
  },
  C: {
    text: 'text-rose-400',
    border: 'border-rose-500/40',
    background: 'bg-rose-500/5',
badge: 'shadow-[0_0_18px_rgba(236,72,153,.35)]'
  },
  D: {
    text: 'text-yellow-400',
    border: 'border-yellow-500/40',
    background: 'bg-yellow-500/5',
badge: 'shadow-[0_0_18px_rgba(245,158,11,.35)]'
  },
  E: {
    text: 'text-violet-400',
    border: 'border-violet-500/40',
    background: 'bg-violet-500/5',
badge: 'shadow-[0_0_18px_rgba(168,85,247,.35)]'
  },
  F: {
    text: 'text-orange-400',
    border: 'border-orange-500/40',
    background: 'bg-orange-500/5',
badge: 'shadow-[0_0_18px_rgba(6,182,212,.35)]'
  },
};

function getRankDisplay(rank: number) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return String(rank);
}

export default function ResultsPage() {
  const [matches, setMatches] = useState<any[][]>([]);
  const [standings, setStandings] = useState<any[][]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ทั้งหมด');
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

  const visibleGroups = useMemo(() => {
    if (selectedGroup === 'ทั้งหมด') {
      return GROUPS;
    }

    return [selectedGroup];
  }, [selectedGroup]);

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

  const getStandingsByGroup = (group: string) => {
    return filteredStandings
      .filter(
        (row) =>
          String(row[1] || '').trim() === group
      )
      .sort((a, b) => {
        const pointA = Number(a[6] || 0);
        const pointB = Number(b[6] || 0);

        if (pointB !== pointA) {
          return pointB - pointA;
        }

        const winA = Number(a[3] || 0);
        const winB = Number(b[3] || 0);

        if (winB !== winA) {
          return winB - winA;
        }

        return String(a[0] || '').localeCompare(
          String(b[0] || '')
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
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-[#070b14] p-4 pt-28 text-slate-100 md:p-8 md:pt-28">

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
        <div className="mb-5 flex flex-col gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
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

        {/* Tabs and group buttons */}
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Tabs */}
          <div className="inline-flex w-fit overflow-hidden rounded-lg border border-white/20 bg-slate-950/70">
            <button
              type="button"
              onClick={() =>
                setActiveTab('ตารางคะแนน')
              }
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
              onClick={() =>
                setActiveTab('ผลการแข่งขันทั้งหมด')
              }
              className={`px-6 py-3 text-sm font-black transition ${
                activeTab === 'ผลการแข่งขันทั้งหมด'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ผลการแข่งขันทั้งหมด
            </button>
          </div>

          {/* Group filter */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setSelectedGroup('ทั้งหมด')
              }
              className={`min-w-[76px] rounded-xl border-2 px-4 py-3 text-sm font-black transition-all ${
  selectedGroup === 'ทั้งหมด'
    ? 'border-emerald-400 bg-[#081221] text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,.35)]'
    : 'border-white/20 bg-[#081221] text-slate-300 hover:bg-[#0d1b2d]'
}`}
            >
              ทั้งหมด
            </button>

            {GROUPS.map((group) => {
              const style = GROUP_STYLES[group];

              return (
                <button
                  key={group}
                  type="button"
                  onClick={() =>
                    setSelectedGroup(group)
                  }
                  className={`min-w-[62px] rounded-xl border-2 px-4 py-3 text-sm font-black transition-all duration-200 ${
  selectedGroup === group
    ? `${style.border} bg-[#081221] ${style.text} shadow-lg`
    : `${style.border} bg-[#081221] ${style.text} hover:bg-[#0d1b2d]`
}`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {!isFetched ? (
          <div className="py-24 text-center text-slate-400">
            กำลังโหลดข้อมูลการแข่งขัน...
          </div>
        ) : activeTab === 'ตารางคะแนน' ? (

          /* ตารางคะแนนแบบการ์ด A-F */
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {visibleGroups.map((group) => {
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
                    className={`flex items-center gap-3 border-b px-4 py-3 ${style.border} ${style.background}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg font-black text-white ${style.badge}`}
                    >
                      {group}
                    </div>

                    <h2
                      className={`text-xl font-black ${style.text}`}
                    >
                      สาย {group}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr]">

                    {/* Standing table */}
                    <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
                      <div className="border-b border-white/10 bg-black/30 px-3 py-2 text-center text-xs font-black text-slate-200">
                        ตารางคะแนน
                      </div>

                      <table className="w-full border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-white/10 bg-black/20 text-slate-400">
                            <th className="px-2 py-2 text-center">
                              อันดับ
                            </th>
                            <th className="px-2 py-2 text-left">
                              ทีม
                            </th>
                            <th className="px-2 py-2 text-center">
                              แข่ง
                            </th>
                            <th className="px-2 py-2 text-center">
                              ชนะ
                            </th>
                            <th className="px-2 py-2 text-center">
                              แพ้
                            </th>
                            <th className="px-2 py-2 text-center">
                              คะแนน
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-white/10">
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
                    <div>
                      <div className="border-b border-white/10 bg-black/30 px-3 py-2 text-center text-xs font-black text-slate-200">
                        ผลการแข่งขัน
                      </div>

                      <div className="divide-y divide-white/10">
                        {matchesInGroup.length > 0 ? (
                          matchesInGroup.map(
                            (match, index) => {
                              const teamA =
                                String(
                                  match[6] || '-'
                                );
                              const teamB =
                                String(
                                  match[11] || '-'
                                );

                              const hasScoreA =
                                match[16] !== '' &&
                                match[16] !== null &&
                                match[16] !== undefined;

                              const hasScoreB =
                                match[17] !== '' &&
                                match[17] !== null &&
                                match[17] !== undefined;

                              return (
                                <div
                                  key={`${match[0]}-${index}`}
                                  className="grid grid-cols-[42px_1fr_65px_1fr] items-center gap-2 px-3 py-2 text-xs"
                                >
                                  <span className="font-black text-white">
                                    {teamA}
                                  </span>

                                  <span className="truncate text-slate-400">
                                    {match[7] || ''}
                                  </span>

                                  <span
                                    className={`text-center font-mono font-black ${
                                      hasScoreA &&
                                      hasScoreB
                                        ? 'text-emerald-400'
                                        : 'text-slate-600'
                                    }`}
                                  >
                                    {hasScoreA &&
                                    hasScoreB
                                      ? `${match[16]}–${match[17]}`
                                      : '–'}
                                  </span>

                                  <span className="text-right font-black text-white">
                                    {teamB}
                                  </span>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <div className="px-3 py-8 text-center text-xs text-slate-500">
                            ยังไม่มีการแข่งขันในสาย{' '}
                            {group}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        ) : (

          /* ผลการแข่งขันทั้งหมด */
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950/60">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/80 text-xs text-slate-400">
                  <th className="px-4 py-4 text-center">
                    แมตช์
                  </th>
                  <th className="px-4 py-4 text-center">
                    วันที่
                  </th>
                  <th className="px-4 py-4 text-center">
                    เวลา
                  </th>
                  <th className="px-4 py-4 text-center">
                    สนาม
                  </th>
                  <th className="px-4 py-4 text-center">
                    สาย
                  </th>
                  <th className="px-4 py-4 text-right">
                    ทีม
                  </th>
                  <th className="px-2 py-4 text-center">
                    ผล
                  </th>
                  <th className="px-4 py-4 text-left">
                    ทีม
                  </th>
                  <th className="px-4 py-4 text-center">
                    ผู้ชนะ
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {groupMatches
                  .filter(
                    (row) =>
                      selectedGroup === 'ทั้งหมด' ||
                      String(
                        row[5] || ''
                      ).trim() === selectedGroup
                  )
                  .map((row, index) => {
                    const hasScore =
                      row[16] !== '' &&
                      row[16] !== null &&
                      row[17] !== '' &&
                      row[17] !== null;

                    return (
                      <tr
                        key={`${row[0]}-${index}`}
                        className="hover:bg-white/5"
                      >
                        <td className="px-4 py-4 text-center text-xs text-slate-400">
                          {row[0]}
                        </td>

                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          {row[2] || '-'}
                        </td>

                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          {row[3] || '-'}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {row[4] || '-'}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {row[5] || '-'}
                        </td>

                        <td className="px-4 py-4 text-right font-black text-white">
                          {row[6] || 'TBD'}
                        </td>

                        <td className="px-2 py-4 text-center">
                          <span className="inline-flex min-w-[72px] justify-center rounded-lg border border-white/10 bg-black px-3 py-1 font-mono font-black text-emerald-400">
                            {hasScore
                              ? `${row[16]} : ${row[17]}`
                              : '- : -'}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-left font-black text-white">
                          {row[11] || 'TBD'}
                        </td>

                        <td className="px-4 py-4 text-center">
                          {row[18] ? (
                            <span className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-400">
                              🏆 {row[18]}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-600">
                              รอผล
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* Note */}
        <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/65 px-4 py-3 text-xs leading-6 text-slate-400">
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