"use client";

import { useState } from "react";
import Image from "next/image";
import { bookListByYear } from "@/data/books";
import { bookCoverByYear } from "@/data/bookCovers";

export default function YearBook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const activeYear = bookListByYear[activeIndex];
  const cover = bookCoverByYear[activeYear.year];

  const goPrev = () => {
    setIsFlipping(true);
    window.setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? bookListByYear.length - 1 : prev - 1));
      setIsFlipping(false);
    }, 220);
  };

  const goNext = () => {
    setIsFlipping(true);
    window.setTimeout(() => {
      setActiveIndex((prev) => (prev === bookListByYear.length - 1 ? 0 : prev + 1));
      setIsFlipping(false);
    }, 220);
  };

  return (
    <div className="book-library-stage">
      <div className="book-library-head">
        <span className="book-library-label">Library</span>
      </div>

      <div className={`book-shell ${isFlipping ? "flipping" : ""}`}>
        <div className="book-head">
          <button className="book-btn" onClick={goPrev} type="button">
            上一年
          </button>
          <p className="book-year">{activeYear.year}年</p>
          <button className="book-btn" onClick={goNext} type="button">
            下一年
          </button>
        </div>
        <div className="book-page">
          <ul>
            {activeYear.books.map((book) => (
              <li key={book}>{book}</li>
            ))}
          </ul>
        </div>
        <div className="book-pick-zone">
          <p className="book-pick-title">
            <span className="book-pick-star">★</span>
            <strong>{activeYear.bestPick}</strong>
          </p>
          <p className="book-review-text">{activeYear.reviewText}</p>
          <div className="book-cover-row">
            <div className="book-cover-frame-dark">
              <Image src={cover} alt={`${activeYear.year} best pick`} className="book-cover-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
