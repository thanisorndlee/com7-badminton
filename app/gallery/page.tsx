'use client';

import React, { useEffect, useMemo, useState } from 'react';

const API_URL =
  'https://script.google.com/macros/s/AKfycbz9NjLOayGMq9CA8V61wNih4h3CULqhj9x1qnfrkL4aSAogoPgmsocCN_bOth-wYc6gww/exec';

function convertGoogleDriveUrl(url: unknown) {
  const value = String(url || '').trim();

  if (!value) {
    return '';
  }

  const fileMatch = value.match(/\/file\/d\/([^/]+)/);

  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1600`;
  }

  const idMatch = value.match(/[?&]id=([^&]+)/);

  if (idMatch) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1600`;
  }

  return value;
}

export default function GalleryPage() {
  const [galleryRows, setGalleryRows] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  useEffect(() => {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('โหลดรูปภาพไม่สำเร็จ');
      }

      return response.json();
    })
    .then((data) => {
      setGalleryRows(
        Array.isArray(data.gallery)
          ? data.gallery.slice(1)
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
  const handleUpload = async () => {
  if (!selectedFile) {
    setUploadMessage('กรุณาเลือกรูปภาพก่อน');
    return;
  }

  const maxFileSize = 5 * 1024 * 1024;

  if (selectedFile.size > maxFileSize) {
    setUploadMessage(
      'รูปภาพมีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ไม่เกิน 5 MB'
    );
    return;
  }

  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, 60000);

  try {
    setIsUploading(true);
    setUploadMessage('');

    const base64Data = await new Promise<string>(
      (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const result = String(reader.result || '');
          const base64 = result.split(',')[1];

          if (!base64) {
            reject(
              new Error('ไม่สามารถอ่านข้อมูลรูปภาพได้')
            );
            return;
          }

          resolve(base64);
        };

        reader.onerror = () => {
          reject(
            new Error('ไม่สามารถอ่านไฟล์รูปภาพได้')
          );
        };

        reader.readAsDataURL(selectedFile);
      }
    );

    const response = await fetch(API_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },

      body: JSON.stringify({
        fileName: selectedFile.name,
        mimeType: selectedFile.type,
        base64Data: base64Data,
      }),

      redirect: 'follow',
      signal: controller.signal,
    });

    const responseText = await response.text();

    console.log('คำตอบจาก Apps Script:', responseText);

    if (!responseText) {
      throw new Error(
        'Apps Script ไม่ได้ส่งข้อมูลตอบกลับ'
      );
    }

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(
        'รูปอาจถูกอัปโหลดแล้ว แต่ไม่สามารถอ่านผลตอบกลับจาก Apps Script ได้'
      );
    }

    if (!data.success) {
      throw new Error(
        data.message || 'อัปโหลดรูปภาพไม่สำเร็จ'
      );
    }

    setUploadMessage(
      'อัปโหลดรูปภาพสำเร็จ รอทีมงานตรวจสอบก่อนแสดงบนเว็บไซต์'
    );
    setSelectedFile(null);
    window.location.reload();
    window.setTimeout(() => {
      setShowUploadForm(false);
      setUploadMessage('');
    }, 2500);
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === 'AbortError'
    ) {
      setUploadMessage(
        'ใช้เวลาอัปโหลดนานเกินไป กรุณาลองใช้รูปที่มีขนาดเล็กลง'
      );
    } else {
      setUploadMessage(
        error instanceof Error
          ? error.message
          : 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ'
      );
    }
  } finally {
    window.clearTimeout(timeoutId);
    setIsUploading(false);
  }
};
  const photos = useMemo(() => {
    return galleryRows
      .filter((row) => {
        const status = String(row[2] || '')
          .trim()
          .toUpperCase();

        return status === 'APPROVED';
      })
      .map((row) => convertGoogleDriveUrl(row[0]))
      .filter(Boolean);
  }, [galleryRows]);

  return (
    <div className="relative flex min-h-screen w-full select-none flex-col items-center overflow-x-hidden bg-[#070b14] p-4 pt-24 text-slate-100 md:p-10">
      <div className="absolute inset-0 z-0">
        <img
          src="/badminton-bg.jpg"
          className="h-full w-full object-fill opacity-85"
          alt="Tournament Background"
        />

        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-black uppercase tracking-widest text-[#39ff14] md:text-5xl">
            ภาพบรรยากาศการแข่งขัน
          </h1>

          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-[#39ff14]" />

          <button
            type="button"
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center justify-center rounded-xl border border-[#39ff14]/50 bg-[#39ff14]/10 px-6 py-3 text-sm font-black text-[#39ff14] transition-all hover:bg-[#39ff14] hover:text-black"
          >
            📸 คลิกเพื่อแชร์ภาพของคุณ
          </button>
        </div>

        {showUploadForm && (
          <div className="mb-10 rounded-2xl border border-white/15 bg-slate-950/90 p-6 shadow-2xl backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">
                  แชร์ภาพการแข่งขัน
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  เลือกรูปภาพจากโทรศัพท์ของคุณ
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white transition hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#39ff14]/40 bg-black/30 p-6 text-center transition hover:border-[#39ff14] hover:bg-[#39ff14]/5">
              <span className="mb-3 text-4xl">📷</span>

              <span className="font-black text-white">
                แตะเพื่อเลือกรูป
              </span>

              <span className="mt-1 text-xs text-slate-400">
                รองรับ JPG, PNG และ WEBP
              </span>

              {selectedFile && (
                <span className="mt-3 max-w-full truncate rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-[#39ff14]">
                  เลือกแล้ว: {selectedFile.name}
                </span>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;

                  setSelectedFile(file);
                  setUploadMessage('');
                }}
              />
            </label>

            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="mt-5 w-full rounded-xl bg-[#39ff14] px-6 py-3 font-black text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isUploading ? 'กำลังอัปโหลด...' : 'อัปโหลดรูปภาพ'}
            </button>
            {uploadMessage && (
            <p
              className={`mt-3 text-center text-sm font-semibold ${
                uploadMessage.includes('สำเร็จ')
                  ? 'text-[#39ff14]'
                  : 'text-red-400'
              }`}
            >
              {uploadMessage}
            </p>
          )}
            <p className="mt-3 text-center text-xs text-slate-500">
              รูปภาพจะได้รับการตรวจสอบก่อนแสดงบนเว็บไซต์
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 py-24 text-center text-slate-400">
            กำลังโหลดรูปภาพ...
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 py-24 text-center text-slate-400">
            ยังไม่มีภาพบรรยากาศการแข่งขัน
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <div
                key={`${photo}-${index}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-all duration-500 hover:border-[#39ff14]/50"
              >
                <img
                  src={photo}
                  alt={`Atmosphere ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}