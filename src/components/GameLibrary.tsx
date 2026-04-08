"use client";

import Image from "next/image";

type Game = {
  year: string;
  title: string;
  imageSrc: string;
  themes: string[];
};

const games: Game[] = [
  { year: "2020", title: "糖豆人", imageSrc: "/game_1.jpg", themes: ["欢乐联机"] },
  { year: "2021", title: "锈湖根源", imageSrc: "/game_3.jpg", themes: ["双人"] },
  { year: "2022", title: "双人成行", imageSrc: "/game_2.jpg", themes: ["家族", "解密"] },
  { year: "2023", title: "Beholder", imageSrc: "/game_4.jpg", themes: ["反乌托邦", "极道德抉择"] },
  { year: "2023", title: "笼中窥梦", imageSrc: "/game_5.jpg", themes: ["温情", "推理", "多周目"] },
  { year: "2024", title: "星露谷物语", imageSrc: "/game_6.png", themes: ["休闲治愈", "模拟经营"] },
  { year: "2025", title: "逆转裁判123", imageSrc: "/game_7.jpg", themes: ["法庭推理", "视觉小说"] },
  { year: "2025", title: "奥伯拉丁的回归", imageSrc: "/game_8.png", themes: ["侦探", "悬疑", "解谜"] },
  { year: "2026", title: "巴别塔圣歌", imageSrc: "/game_9.jpeg", themes: ["语言破译", "异文明交流"] },
];

export default function GameLibrary() {
  return (
    <div className="game-library-wrap">
      <div className="game-library-head">
        <span className="game-library-label">Game Library</span>
        <span className="game-library-note">个人历年最佳pick游戏</span>
      </div>

      <div className="game-library-grid" role="region" aria-label="Game Library">
        {games.map((g, idx) => (
          <div key={`${g.year}-${g.imageSrc}-${idx}`} className="game-card">
            <div className="game-image-frame">
              <div className="game-year-tag">{g.year}</div>
              <Image
                src={g.imageSrc}
                alt={g.title}
                fill
                className="game-image"
                sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 560px"
              />
            </div>

            <div className="game-title-chip">{g.title}</div>

            <div className="game-theme-tags">
              {g.themes.map((t) => (
                <span key={t} className="game-theme-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}