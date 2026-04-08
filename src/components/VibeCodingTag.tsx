"use client";

import { useEffect, useState } from "react";

const FULL = "vibe coding";

export default function VibeCodingTag() {
  const [len, setLen] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    const loop = async () => {
      while (!cancelled) {
        for (let i = 0; i <= FULL.length; i += 1) {
          if (cancelled) return;
          setLen(i);
          await sleep(75);
        }
        await sleep(900);
        for (let i = FULL.length; i >= 0; i -= 1) {
          if (cancelled) return;
          setLen(i);
          await sleep(45);
        }
        await sleep(420);
      }
    };

    void loop();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className="vibe-coding-tag">
      {FULL.slice(0, len)}
      <span className="vibe-coding-caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}
