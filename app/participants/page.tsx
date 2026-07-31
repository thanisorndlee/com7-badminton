'use client';

import { useEffect, useMemo, useState } from 'react';

type ParticipantRow = string[];

type Participant = {
  group: string;
  team: string;
  player1: string;
  department1: string;
  player2: string;
  department2: string;
};

const API_URL =
  'https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec';

const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const GROUP_STYLES: Record<
  string,
  {
    border: string;
    header: string;
    badge: string;
    text: string;
    glow: string;
  }
> = {
  A: {
    border: 'border-yellow-400',
    header: 'from-yellow-500/35 to-yellow-950/10',
    badge:
      'border-yellow-300 bg-yellow-500 text-black shadow-[0_0_18px_rgba(250,204,21,0.45)]',
    text: 'text-yellow-300',
    glow: 'shadow-[0_0_28px_rgba(250,204,21,0.16)]',
    
  },

  B: {
    border: 'border-blue-400',
    header: 'from-blue-500/35 to-blue-950/10',
    badge:
      'border-blue-300 bg-blue-500 text-white shadow-[0_0_18px_rgba(59,130,246,0.45)]',
    text: 'text-blue-300',
    glow: 'shadow-[0_0_28px_rgba(59,130,246,0.16)]',
    
  },

  C: {
    border: 'border-violet-400',
    header: 'from-violet-500/35 to-violet-950/10',
    badge:
      'border-violet-300 bg-violet-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.45)]',
    text: 'text-violet-300',
    glow: 'shadow-[0_0_28px_rgba(139,92,246,0.16)]',
    
  },

  D: {
    border: 'border-orange-400',
    header: 'from-orange-500/35 to-orange-950/10',
    badge:
      'border-orange-300 bg-orange-500 text-white shadow-[0_0_18px_rgba(249,115,22,0.45)]',
    text: 'text-orange-300',
    glow: 'shadow-[0_0_28px_rgba(249,115,22,0.16)]',
    
  },

  E: {
    border: 'border-pink-400',
    header: 'from-pink-500/35 to-pink-950/10',
    badge:
      'border-pink-300 bg-pink-500 text-white shadow-[0_0_18px_rgba(236,72,153,0.45)]',
    text: 'text-pink-300',
    glow: 'shadow-[0_0_28px_rgba(236,72,153,0.16)]',
    
  },

  F: {
    border: 'border-cyan-400',
    header: 'from-cyan-500/35 to-cyan-950/10',
    badge:
      'border-cyan-300 bg-cyan-500 text-white shadow-[0_0_18px_rgba(6,182,212,0.45)]',
    text: 'text-cyan-300',
    glow: 'shadow-[0_0_28px_rgba(6,182,212,0.16)]',
    
  },

  G: {
    border: 'border-lime-400',
    header: 'from-lime-500/35 to-lime-950/10',
    badge:
      'border-lime-300 bg-lime-500 text-black shadow-[0_0_18px_rgba(132,204,22,0.45)]',
    text: 'text-lime-300',
    glow: 'shadow-[0_0_28px_rgba(132,204,22,0.16)]',
    
  },
};
export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchParticipants() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`${API_URL}?t=${Date.now()}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('ไม่สามารถโหลดข้อมูลได้');
        }

        const data = await response.json();

        if (!isMounted) return;

        const rows = Array.isArray(data.participants)
          ? data.participants.slice(1)
          : [];

        setParticipants(rows);
      } catch (fetchError) {
        console.error(fetchError);

        if (isMounted) {
          setError('ไม่สามารถโหลดรายชื่อผู้เข้าแข่งขันได้');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchParticipants();

    return () => {
      isMounted = false;
    };
  }, []);

  const participantData = useMemo<Participant[]>(() => {
    return participants
      .map((row) => ({
        group: String(row[0] || '')
          .trim()
          .toUpperCase(),
        team: String(row[1] || '')
          .trim()
          .toUpperCase(),
        player1: String(row[2] || '').trim(),
        department1: String(row[3] || '').trim(),
        player2: String(row[4] || '').trim(),
        department2: String(row[5] || '').trim(),
      }))
      .filter((item) => item.group && item.team);
  }, [participants]);

  const filteredParticipants = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return participantData;
    }

    return participantData.filter((item) => {
      return [
        item.group,
        item.team,
        item.player1,
        item.department1,
        item.player2,
        item.department2,
      ].some((value) => value.toLowerCase().includes(keyword));
    });
  }, [participantData, search]);

  const groupedParticipants = useMemo(() => {
    return GROUPS.map((group) => ({
      group,
      teams: filteredParticipants
        .filter((item) => item.group === group)
        .sort((a, b) =>
          a.team.localeCompare(b.team, undefined, {
            numeric: true,
            sensitivity: 'base',
          }),
        ),
    })).filter((groupItem) => groupItem.teams.length > 0);
  }, [filteredParticipants]);

  const totalTeams = participantData.length;
  const totalPlayers = participantData.reduce((total, item) => {
    let count = total;

    if (item.player1) count += 1;
    if (item.player2) count += 1;

    return count;
  }, 0);

  return (
  <div className="relative flex min-h-screen w-full select-none flex-col overflow-x-hidden bg-[#070b14] pt-16 text-slate-100 md:pt-20">
    {/* Background */}
    <div className="absolute inset-0 z-0">
      <img
        src="/badminton-bg.jpg"
        alt="Tournament Background"
        className="h-full w-full object-fill opacity-85"
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 z-0 bg-[#020814]/45" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 sm:px-8 lg:px-12">
        {/* หัวหน้า */}
        <section className="-mt-4 mb-8">
          <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
            <div>
            <div className="mb-4 inline-flex items-center gap-3 rounded-xl border border-[#00D8A0]/30 bg-[#00D8A0]/10 px-5 py-3 shadow-[0_0_18px_rgba(0,216,160,0.12)] backdrop-blur-md">
            <ShuttleIcon />

            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#00D8A0]">
                TOURNAMENT PARTICIPANTS
            </p>
            </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                รายชื่อผู้เข้าแข่งขัน
              </h1>

              <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">
                การแข่งขันประเภทคู่ แบ่งออกเป็น 7 สาย รวมทั้งหมด{' '}
                <span className="font-black text-[#00D8A0]">
                  {totalTeams} ทีม
                </span>{' '}
                และ{' '}
                <span className="font-black text-[#00D8A0]">
                  {totalPlayers} ท่าน
                </span>
              </p>
            </div>

            {/* ช่องค้นหา */}
            <div className="w-full xl:max-w-md">
              <label htmlFor="participant-search" className="sr-only">
                ค้นหาทีมหรือผู้เข้าแข่งขัน
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-slate-300">
                <SearchIcon />
                </div>

                <input
                  id="participant-search"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="ค้นหาทีม ชื่อ หรือนามสกุล"
                  className="h-14 w-full rounded-2xl border border-[#00D8A0]/40 bg-slate-950/80 pl-16 pr-5 text-lg font-semibold text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="ล้างคำค้นหา"
                    className="absolute inset-y-0 right-4 flex items-center text-xl text-slate-400 transition hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-[420px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-lime-400" />
              <p className="mt-4 text-sm font-bold text-slate-400">
                กำลังโหลดรายชื่อผู้เข้าแข่งขัน...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center">
            <p className="font-black text-red-300">{error}</p>
            <p className="mt-2 text-sm text-red-200/70">
              กรุณาตรวจสอบ URL ของ Apps Script และการ Deploy
            </p>
          </div>
        )}

        {/* ไม่มีข้อมูล */}
        {!isLoading &&
          !error &&
          groupedParticipants.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-20 text-center backdrop-blur-xl">
              <p className="text-lg font-black text-white">
                ไม่พบรายชื่อผู้เข้าแข่งขัน
              </p>
              <p className="mt-2 text-sm text-slate-400">
                ลองค้นหาด้วยชื่อ นามสกุล หรือรหัสทีมอื่น
              </p>
            </div>
          )}

        {/* การ์ดแต่ละสาย */}
        {!isLoading && !error && groupedParticipants.length > 0 && (
        <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {groupedParticipants.map(({ group, teams }) => {
              const style = GROUP_STYLES[group];

              return (
                <section
                  key={group}
                  className={`flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl border bg-slate-950/75 backdrop-blur-xl ${style.border} ${style.glow}`}
                >
                  {/* Header สาย */}
                  <div
                    className={`flex items-center gap-4 border-b border-white/10 bg-gradient-to-r px-5 py-4 ${style.header}`}
                    >
                    <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-2xl font-black ${style.badge}`}
                    >
                      {group}
                    </div>

                    <div>
                      <p className={`text-2xl font-black ${style.text}`}>
                        สาย {group}
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-400">
                        {teams.length} ทีม · {teams.length * 2} คน
                      </p>
                    </div>
                  </div>

                  {/* ทีมในสาย */}
                  <div className="divide-y divide-white/10 px-4">
                    {teams.map((team) => (
                      <article
                        key={`${group}-${team.team}`}
                        className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 py-4"
                      >
                        {/* รหัสทีม */}
                        <div
                        className={`flex h-11 items-center justify-center rounded-lg border bg-black/40 text-base font-black shadow-[0_0_12px_rgba(255,255,255,0.04)] ${style.border} ${style.text}`}
                        >
                        {team.team}
                        </div>

                        {/* ผู้เล่น */}
                        <div className="min-w-0 space-y-3">
                          <PlayerItem
                            name={team.player1}
                            department={team.department1}
                          />

                                                    <PlayerItem
                            name={team.player2}
                            department={team.department2}
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* หมายเหตุ */}
        {!isLoading && !error && participantData.length > 0 && (
          <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur-xl">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#00D8A0]/40 text-xs font-black text-[#00D8A0]">
              i
            </div>

            <p className="text-sm leading-6 text-slate-300">
              <span className="font-black text-white">หมายเหตุ :</span>{' '}
              การแข่งขันรอบแบ่งกลุ่มใช้รูปแบบพบกันหมดภายในสาย
              โดยทีมอันดับที่ 1–2 ของแต่ละสายจะผ่านเข้าสู่รอบต่อไป
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type PlayerItemProps = {
  name: string;
  department: string;
};

function PlayerItem({
  name,
  department,
}: PlayerItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <div className="mt-0.5 shrink-0 text-slate-400">
        <UserIcon />
      </div>

      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-bold leading-5 text-white">
          {name || '-'}
        </p>

        {department && (
          <p className="mt-1 text-xs text-slate-400">
  {department}
</p>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="1.8"
        className="text-[#00D8A0]"
      />
      <path
        d="M16.5 16.5L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="text-slate-400"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.5 20C5.8 16.5 8.2 14.5 12 14.5C15.8 14.5 18.2 16.5 18.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShuttleIcon() {
  return (
    <span className="text-3xl leading-none">🏸</span>
  );
}