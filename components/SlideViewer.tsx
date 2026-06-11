"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "@/lib/korean-talk-slides";

export default function SlideViewer() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(slides.length - 1, c + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-16 py-12">
        {slide.type === "cover" && (
          <div className="text-center max-w-4xl">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-8">{slide.label}</p>
            <h1 className="text-6xl font-bold leading-tight mb-6">{slide.title}</h1>
            <p className="text-2xl text-white/50">{slide.subtitle}</p>
          </div>
        )}

        {slide.type === "statement" && (
          <div className="max-w-3xl w-full">
            {slide.question && (
              <p className="text-white/50 text-sm mb-8 border-l-2 border-white/30 pl-4">{slide.question}</p>
            )}
            <h2 className="text-5xl font-bold leading-tight mb-8">{slide.title}</h2>
            {slide.body && <p className="text-xl text-white/60 leading-relaxed">{slide.body}</p>}
          </div>
        )}

        {slide.type === "timeline" && (
          <div className="max-w-3xl w-full">
            <h2 className="text-4xl font-bold mb-12">{slide.title}</h2>
            <div className="space-y-6">
              {slide.items?.map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <span className="text-white/20 text-sm mt-1 w-6 shrink-0">{i + 1}</span>
                  <p className="text-2xl text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "split" && (
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>
            <p className="text-xl text-white/60 leading-relaxed">{slide.body}</p>
          </div>
        )}

        {slide.type === "quote" && (
          <div className="max-w-3xl">
            <p className="text-3xl font-light leading-relaxed text-white/90 mb-8">"{slide.quote}"</p>
            <p className="text-white/40">— {slide.author}</p>
          </div>
        )}

        {slide.type === "list" && (
          <div className="max-w-3xl w-full">
            <h2 className="text-4xl font-bold mb-12">{slide.title}</h2>
            <ul className="space-y-5">
              {slide.items?.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-white/20 mt-1">—</span>
                  <p className="text-xl text-white/70">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {slide.type === "closing" && (
          <div className="text-center max-w-3xl">
            <h2 className="text-5xl font-bold leading-tight mb-6">{slide.title}</h2>
            <p className="text-xl text-white/50 mb-12">{slide.subtitle}</p>
            <p className="text-white/30 text-sm tracking-widest uppercase">{slide.label}</p>
          </div>
        )}

        {slide.type === "table" && (
          <div className="max-w-4xl w-full">
            {slide.question && (
              <p className="text-white/50 text-sm mb-8 border-l-2 border-white/30 pl-4">{slide.question}</p>
            )}
            <h2 className="text-4xl font-bold mb-8">{slide.title}</h2>
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/30 text-xs uppercase tracking-widest py-3 pr-8 font-normal w-2/5">Principle</th>
                    <th className="text-left text-white/30 text-xs uppercase tracking-widest py-3 font-normal">References</th>
                  </tr>
                </thead>
                <tbody>
                  {slide.rows?.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-4 pr-8 text-white font-medium text-lg">{row.principle}</td>
                      <td className="py-4 text-white/50 text-lg">{row.references}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Navigation bar */}
      <div className="flex items-center justify-between px-12 py-6 border-t border-white/10">
        <button
          onClick={prev}
          disabled={current === 0}
          className="text-white/40 hover:text-white disabled:opacity-20 transition-colors text-sm"
        >
          ← Prev
        </button>
        <span className="text-white/20 text-sm">
          {current + 1} / {slides.length}
        </span>
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="text-white/40 hover:text-white disabled:opacity-20 transition-colors text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
