'use client';

import React, { useEffect, useMemo, useState } from 'react';

const API_URL =
  'https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec';

function getYoutubeEmbedUrl(url: unknown) {
  const value = String(url || '').trim();

  if (!value) {
    return '';
  }

  if (value.includes('youtube.com/embed/')) {
    return value;
  }

  const shortMatch = value.match(/youtu\.be\/([^?&/]+)/);

  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const watchMatch = value.match(/[?&]v=([^?&/]+)/);

  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  const liveMatch = value.match(/youtube\.com\/live\/([^?&/]+)/);

  if (liveMatch) {
    return `https://www.youtube.com/embed/${liveMatch[1]}`;
  }

  return value;
}

export default function StreamPage() {
  const [matches, setMatches] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('โหลดข้อมูลถ่ายทอดสดไม่สำเร็จ');
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

  const activeStreams = useMemo(() => {
  return matches
    .filter((match) => {
      const liveUrl = String(match[25] || '').trim();
      const liveStatus = String(match[26] || '')
        .trim()
        .toUpperCase();
      const court = String(match[4] || '').trim();

      return liveUrl && liveStatus === 'LIVE' && court;
    })
    .map((match, index) => {
      const group = String(match[5] || '').trim();

      return {
        id: String(match[0] || index),
        title: String(match[4] || `จอที่ ${index + 1}`),
        embedUrl: getYoutubeEmbedUrl(match[25]),
        stage: String(match[1] || '-'),
        group: group ? `กลุ่ม ${group}` : '-',
        teamAPlayer1: String(match[7] || '-'),
        teamAPlayer2: String(match[9] || '-'),
        teamBPlayer1: String(match[12] || '-'),
        teamBPlayer2: String(match[14] || '-'),
        court: String(match[4] || '-'),
        status: String(match[26] || 'LIVE'),
      };
    })
    .slice(0, 3);
}, [matches]);

  const gridClass =
    activeStreams.length === 1
      ? 'grid-cols-1 max-w-5xl'
      : activeStreams.length === 2
      ? 'grid-cols-1 lg:grid-cols-2 max-w-7xl'
      : 'grid-cols-1 lg:grid-cols-3 max-w-7xl';

  return (
    <div className="relative flex min-h-screen w-full select-none flex-col items-center overflow-x-hidden bg-[#070b14] p-4 pt-24 text-slate-100 md:p-8 md:pt-28">
      <div className="absolute inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          className="h-full w-full object-fill opacity-85"
          alt="Tournament Background"
        />
      </div>

      <div className="relative z-10 mb-8 w-full max-w-7xl rounded-[28px] border border-white/15 bg-slate-950/70 px-8 py-7 shadow-[0_20px_60px_rgba(0,0,0,.55)] backdrop-blur-md">
        <span className="mb-3 inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">
          Live Streams
        </span>

        <h1 className="text-3xl font-black text-white drop-shadow-md md:text-4xl">
          ถ่ายทอดสดการแข่งขัน
        </h1>

        <p className="mt-2 text-sm text-slate-300">
          เชิญรับชมการถ่ายทอดสดการแข่งขันแบดมินตัน COM7 Tournament
          จากทุกสนามแบบเรียลไทม์
          พร้อมติดตามการแข่งขันของแต่ละคู่ได้ตลอดการแข่งขัน
        </p>
      </div>

      <div
        className={`relative z-10 grid w-full gap-6 transition-all duration-500 ${gridClass}`}
      >
        {isLoading ? (
          <div className="col-span-full rounded-2xl border border-white/15 bg-slate-950/70 py-20 text-center text-slate-400">
            กำลังโหลดข้อมูลถ่ายทอดสด...
          </div>
        ) : activeStreams.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/15 bg-slate-950/70 py-20 text-center text-slate-400">
            ยังไม่มีการถ่ายทอดสดในขณะนี้
          </div>
        ) : (
          activeStreams.map((stream) => (
            <div
              key={stream.id}
              className="flex flex-col rounded-[24px] border border-white/20 bg-slate-950/80 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-md md:p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-400">
                  {stream.title}
                </span>

                <span className="flex items-center gap-2 text-xs font-black text-white">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
                  {stream.status}
                </span>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
                <iframe
                  className="h-full w-full border-0"
                  src={stream.embedUrl}
                  title={stream.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      TEAM A
                    </p>

                    <p className="text-base font-black text-white">
                      {stream.teamAPlayer1}
                    </p>

                    <p className="text-base font-black text-white">
                      {stream.teamAPlayer2}
                    </p>
                  </div>

                  <div className="text-xl font-black text-emerald-400">
                    VS
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase text-slate-400">
                      TEAM B
                    </p>

                    <p className="text-base font-black text-white">
                      {stream.teamBPlayer1}
                    </p>

                    <p className="text-base font-black text-white">
                      {stream.teamBPlayer2}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex justify-center gap-2 text-[11px] font-bold text-slate-300">
                  <span className="text-emerald-400">
                    {stream.stage}
                  </span>

                  <span>•</span>
                  <span>{stream.group}</span>
                  <span>•</span>
                  <span>{stream.court}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}