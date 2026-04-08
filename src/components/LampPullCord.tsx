"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

type PullStyle = CSSProperties & {
  "--pull": string;
  "--lamp-intensity": number;
};

type Theme = "light" | "dark";

export default function LampPullCord({
  theme,
  onToggleTheme,
}: {
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [pull, setPull] = useState(0);
  const pullRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [justToggled, setJustToggled] = useState(false);
  const rafRef = useRef<number | null>(null);

  const cordMax = 70;
  const threshold = 46;

  const intensity = useMemo(() => {
    const v = pull / threshold;
    return Math.max(0, Math.min(1, v));
  }, [pull]);

  const stopRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const updatePull = (v: number) => {
    pullRef.current = v;
    setPull(v);
  };

  const springBackToZero = (from: number) => {
    stopRaf();
    const start = performance.now();
    const duration = 520;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const decay = Math.exp(-t * 7.2);
      const wobble = Math.cos(t * Math.PI * 5.2);
      const next = from * decay * wobble;
      updatePull(next);

      if (t >= 1) {
        updatePull(0);
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => stopRaf(), []);

  const startYRef = useRef(0);
  const startPullRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopRaf();
    setDragging(true);
    setJustToggled(false);
    pointerIdRef.current = e.pointerId;
    startYRef.current = e.clientY;
    startPullRef.current = pullRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;
    const dy = e.clientY - startYRef.current;
    const next = Math.max(0, Math.min(cordMax, startPullRef.current + dy));
    updatePull(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;

    setDragging(false);
    const currentPull = pullRef.current;
    if (currentPull >= threshold && !justToggled) {
      setJustToggled(true);
      onToggleTheme();
    }

    springBackToZero(currentPull);
    pointerIdRef.current = null;
  };

  const pullStyle: PullStyle = {
    "--pull": `${pull}px`,
    "--lamp-intensity": intensity,
  };

  return (
    <div className="lamp-pull-area" aria-hidden="false">
      <div className="lamp-pull" data-theme={theme} style={pullStyle}>
        <div className="lamp-cord-line" aria-hidden="true" />
        <div className="lamp-pull-hint" aria-hidden="true">
          <span className="lamp-hint-arrow">←</span>
          <span className="lamp-hint-arrow">←</span>
          <span className="lamp-hint-arrow">←</span>
        </div>

        <div className="lamp-cord-bottom" aria-hidden="false">
          <button
            type="button"
            className="lamp-cord-handle"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            aria-label="拉一下"
          >
            <span className="lamp-cord-ring" aria-hidden="true" />
          </button>

          <div className="lamp-emoji" aria-hidden="true">
            💡
          </div>

          <div className="lamp-pull-sign" aria-hidden="true">
            拉一下
          </div>
        </div>
      </div>
    </div>
  );
}