'use client';

import React, { useEffect, useMemo, useState } from 'react';

const API_URL =
  'https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec';

const DATES = [
  '5 ส.ค. 2569',
  '11 ส.ค. 2569',
  '18 ส.ค. 2569',
  '19 ส.ค. 2569',
];const COURTS = ['สนาม 1', 'สนาม 2', 'สนาม 3'];

const COURT_STYLE: Record<
  string,
  {
    text: string;
    border: string;
    background: string;
  }
  > = {
    'สนาม 1': {
    text: 'text-emerald-400',
    border: 'border-emerald-400/40',
    background: 'bg-emerald-500/10',
  },
  'สนาม 2': {
    text: 'text-blue-400',
    border: 'border-blue-400/40',
    background: 'bg-blue-500/10',
  },
  'สนาม 3': {
    text: 'text-violet-400',
    border: 'border-violet-400/40',
    background: 'bg-violet-500/10',
  },
};

function hasValue(value: unknown) {
  return value !== '' && value !== null && value !== undefined;
}

function getScoreSets(match: any[]) {
  return [
    [match[16], match[17]],
    [match[18], match[19]],
    [match[20], match[21]],
  ].filter(
    ([scoreA, scoreB]) => hasValue(scoreA) && hasValue(scoreB)
  );
}

function getTimeOrder(value: unknown) {
  const text = String(value || '');
  const match = text.match(/(\d{1,2})\s*:\s*(\d{2})/);

  if (!match) {
    return Number.MAX_SAFE_INTEGER;
  }

  return Number(match[1]) * 60 + Number(match[2]);
}

export default function ReplayPage() {
  const [matches, setMatches] = useState<any[][]>([]);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('โหลดข้อมูลการแข่งขันไม่สำเร็จ');
        }

        return response.json();
      })
      .then((data) => {
        setMatches(
          Array.isArray(data.matches)
            ? data.matches.slice(1)
            : []
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredMatches = useMemo(() => {
    return matches
      .filter((match) => {
        const stage = String(match[1] || '').trim();
        const date = String(match[2] || '').trim();

        if (stage !== 'รอบแบ่งกลุ่ม') {
          return false;
        }

        if (date !== selectedDate) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        return [
          match[0],  // MatchID
          match[3],  // MatchTime
          match[4],  // Court
          match[5],  // Group
          match[6],  // TeamA
          match[7],  // TeamAPlayer1
          match[9],  // TeamAPlayer2
          match[11], // TeamB
          match[12], // TeamBPlayer1
          match[14], // TeamBPlayer2
        ].some((value) =>
          String(value || '')
            .toLowerCase()
            .includes(normalizedSearch)
        );
      })
      .sort(
        (a, b) =>
          getTimeOrder(a[3]) - getTimeOrder(b[3])
      );
  }, [matches, normalizedSearch, selectedDate]);

  const timeSlots = useMemo(() => {
    const times = filteredMatches
      .map((match) => String(match[3] || '').trim())
      .filter(Boolean);

    return Array.from(new Set(times)).sort(
      (a, b) => getTimeOrder(a) - getTimeOrder(b)
    );
  }, [filteredMatches]);

  const displayedTimeSlots =
    timeSlots.length > 0
      ? timeSlots
      : ['19 : 00 น.', '19 : 30 น.', '20 : 00 น.', '20 : 30 น.'];

  const getMatch = (time: string, court: string) => {
    return filteredMatches.find(
      (match) =>
        String(match[3] || '').trim() === time &&
        String(match[4] || '').trim() === court
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#040b17] px-4 pb-10 pt-8 text-white md:px-8">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          alt="Badminton background"
          className="h-full w-full object-cover opacity-75"
        />

      <div className="absolute left-4 top-4 h-4 w-4 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,.8)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400">
              Tournament Replay
            </span>

            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              ดูการแข่งขันย้อนหลัง
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              เลือกวันที่และแมตช์ที่ต้องการรับชม
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 lg:w-auto lg:items-end">
            {/* Date buttons */}
            <div className="no-scrollbar flex w-full gap-2 overflow-x-auto lg:w-auto">
              {DATES.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 rounded-xl border px-5 py-3 text-sm font-black transition ${
                    selectedDate === date
                      ? 'border-emerald-400 bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,.35)]'
                      : 'border-white/20 bg-slate-950/70 text-slate-300 hover:border-white/40'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-[520px]">
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
                placeholder="ค้นหาแมตช์ ทีม ผู้เล่น หรือสนาม"
                className="w-full rounded-xl border border-white/20 bg-slate-950/80 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex flex-wrap items-center gap-5 text-sm">
          <div className="flex items-center gap-2 text-slate-300">
          <span className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,.8)]" />
            มีวิดีโอย้อนหลัง
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="h-3 w-3 rounded-full bg-slate-500" />
            ยังไม่มีวิดีโอ
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 py-24 text-center text-slate-400">
            กำลังโหลดตารางการแข่งขัน...
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-2xl border border-white/15 bg-slate-950/70">
            <div className="min-w-[1050px]">
              {/* Table header */}
              <div className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] border-b border-white/15">
                <div className="flex items-center justify-center border-r border-white/15 px-4 py-4 text-lg font-black">
                  คู่แข่งขัน
                </div>

                {COURTS.map((court) => {
                  const style = COURT_STYLE[court];

                  return (
                    <div
                      key={court}
                      className={`flex items-center justify-center gap-3 border-r border-white/15 px-4 py-4 text-xl font-black last:border-r-0 ${style.text}`}
                    >
                      <span>🏸</span>
                      {court}
                    </div>
                  );
                })}
              </div>

              {/* Table rows */}
              {displayedTimeSlots.map((time, rowIndex) => (
                <div
                  key={`${selectedDate}-${time}-${rowIndex}`}
                  className="grid grid-cols-[170px_repeat(3,minmax(0,1fr))] border-b border-white/15 last:border-b-0"
                >
                  {/* Time */}
                  <div className="flex min-h-[180px] flex-col items-center justify-center border-r border-white/15 px-4 text-center">
                    <div className="text-center">
                    <p className="text-2xl font-black">
                      คู่ที่ {rowIndex + 1}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-400">
                      (รอบวันที่ {selectedDate})
                    </p>
                  </div>

                    
                  </div>

                  {COURTS.map((court) => {
                    const match = getMatch(time, court);

                    if (!match) {
                      return (
                        <div
                          key={`${time}-${court}`}
                          className="flex min-h-[180px] items-center justify-center border-r border-white/15 p-4 last:border-r-0"
                        >
                          <div className="text-center text-sm text-slate-600">
                            ยังไม่มีข้อมูลการแข่งขัน
                          </div>
                        </div>
                      );
                    }

                    const teamA = String(match[6] || 'TBD');
                    const teamB = String(match[11] || 'TBD');
                    const group = String(match[5] || '-');
                    const replayUrl = String(match[27] || '').trim();
                    const scoreSets = getScoreSets(match);
                    const hasReplay = Boolean(replayUrl);

                    return (
                      <div
                        key={`${match[0]}-${court}`}
                        className="flex min-h-[180px] items-center justify-center border-r border-white/15 p-4 last:border-r-0"
                      >
                        <div
                          className={`relative flex h-full w-full flex-col items-center justify-center rounded-xl border p-4 text-center ${
                              hasReplay
                                ? 'border-red-500/70 bg-red-500/5 shadow-[0_0_20px_rgba(239,68,68,.18)]'
                                : 'border-slate-600/60 bg-slate-900/40'
                            }`}
                        >
                          <span
                            className={`absolute left-3 top-3 h-3 w-3 rounded-full ${
                              hasReplay
                                ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,.8)]'
                                : 'bg-slate-500'
                            }`}
                          />

                          <p className="text-sm text-slate-300">
                            สาย {group}
                          </p>

                          <div className="mt-2 flex items-center justify-center gap-8">
                          <div className="text-center">
                            <p className="text-lg font-black">{match[7]}</p>
                            <p className="text-lg font-black">{match[9]}</p>
                          </div>

                          <span className="text-xl font-black text-red-500">
                            VS
                          </span>

                          <div className="text-center">
                            <p className="text-lg font-black">{match[12]}</p>
                            <p className="text-lg font-black">{match[14]}</p>
                          </div>
                        </div>

                          {scoreSets.length > 0 ? (
                            <div className="mt-2 flex flex-wrap justify-center gap-3">
                              {scoreSets.map(
                                ([scoreA, scoreB], scoreIndex) => (
                                  <span
                                    key={scoreIndex}
                                    className="font-mono text-lg font-black text-red-500"
                                  >
                                    {scoreA}-{scoreB}
                                  </span>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="mt-2 text-sm text-slate-500">
                              ยังไม่มีผลการแข่งขัน
                            </p>
                          )}

                          {hasReplay ? (
                            <a
                              href={replayUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 flex w-full max-w-[280px] items-center justify-center gap-2 rounded-lg border border-red-500/70 bg-red-500/10 px-4 py-2 text-sm font-black text-red-400 transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-400 hover:shadow-[0_0_18px_rgba(239,68,68,.45)]"
                            >
                              <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M21.8 8.001a2.75 2.75 0 00-1.936-1.946C18.16 5.5 12 5.5 12 5.5s-6.16 0-7.864.555A2.75 2.75 0 002.2 8.001C1.65 9.72 1.65 12 1.65 12s0 2.28.55 3.999a2.75 2.75 0 001.936 1.946C5.84 18.5 12 18.5 12 18.5s6.16 0 7.864-.555a2.75 2.75 0 001.936-1.946c.55-1.719.55-3.999.55-3.999s0-2.28-.55-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
                            </svg>

                            <span>ดูย้อนหลัง YouTube</span>
                            </a>
                          ) : (
                            <div className="mt-3 text-sm text-slate-500">
                              ยังไม่มีวิดีโอย้อนหลัง
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}