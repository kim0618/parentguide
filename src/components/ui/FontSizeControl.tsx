'use client';

import { useState, useEffect } from 'react';

/**
 * 글자 크기 3단계 조절 버튼
 * - 기본(112.5% = 18px), 크게(125% = 20px), 매우 크게(137.5% = 22px)
 * - localStorage에 저장하여 재방문 시 유지
 * - 헤더 우측에 배치
 */

const STEPS = [
  { label: '기본', size: '112.5%' },
  { label: '크게', size: '125%' },
  { label: '매우 크게', size: '137.5%' },
];

const STORAGE_KEY = 'parentguide-font-step';

export default function FontSizeControl() {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const idx = Number(saved);
      if (idx >= 0 && idx < STEPS.length) {
        setStep(idx);
        document.documentElement.style.fontSize = STEPS[idx].size;
      }
    }
    setMounted(true);
  }, []);

  const changeSize = (newStep: number) => {
    setStep(newStep);
    document.documentElement.style.fontSize = STEPS[newStep].size;
    localStorage.setItem(STORAGE_KEY, String(newStep));
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="글자 크기 조절">
      <button
        type="button"
        onClick={() => changeSize(Math.max(0, step - 1))}
        disabled={step === 0}
        className="inline-flex items-center justify-center rounded-md
                   min-h-[44px] min-w-[44px] text-xs font-semibold
                   text-gray-600 hover:bg-gray-100
                   disabled:opacity-30 disabled:cursor-default"
        aria-label="글자 작게"
      >
        가-
      </button>
      <span className="text-xs text-gray-500 w-[3.2rem] text-center select-none" aria-live="polite">
        {STEPS[step].label}
      </span>
      <button
        type="button"
        onClick={() => changeSize(Math.min(STEPS.length - 1, step + 1))}
        disabled={step === STEPS.length - 1}
        className="inline-flex items-center justify-center rounded-md
                   min-h-[44px] min-w-[44px] text-xs font-semibold
                   text-gray-600 hover:bg-gray-100
                   disabled:opacity-30 disabled:cursor-default"
        aria-label="글자 크게"
      >
        가+
      </button>
    </div>
  );
}
