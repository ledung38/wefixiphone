import React, { useState, useRef, useEffect } from "react";

const DIff = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const beforeAfterContainerRef = useRef<HTMLDivElement>(null);
  const handleBeforeAfterMove = (clientX: number) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleBeforeAfterMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || e.type === "mousemove") {
      handleBeforeAfterMove(e.clientX);
    }
  };

  return (
    <div>
      {" "}
      {/* 3. BEFORE / AFTER SECTION */}
      <section className="w-full py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Drag to See the Difference
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Shattered iPhone screens are replaced and perfectly restored in
              just 20 minutes.
            </p>
          </div>

          {/* Interactive Drag Slider */}
          <div
            ref={beforeAfterContainerRef}
            className="relative w-full max-w-4xl mx-auto h-[300px] sm:h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={(e) => handleBeforeAfterMove(e.clientX)}
          >
            {/* Repaired Image (After) */}
            <div className="absolute inset-0 w-full h-full bg-slate-100 dark:bg-slate-900 pointer-events-none">
              <img
                src="/repaired_iphone.png"
                alt="Repaired iPhone Screen"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 bg-emerald-500/90 text-white text-xs px-3 py-1 rounded-md font-bold backdrop-blur-sm">
                AFTER REPAIR
              </div>
            </div>

            {/* Cracked Image (Before - Clip Path) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              <img
                src="/cracked_iphone.png"
                alt="Cracked iPhone Screen"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 bg-rose-500/90 text-white text-xs px-3 py-1 rounded-md font-bold backdrop-blur-sm">
                BEFORE REPAIR
              </div>
            </div>

            {/* Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-2xl border-4 border-slate-900 select-none">
                <svg
                  className="w-5 h-5 text-slate-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l-3 3 3 3m8-6l3 3-3 3"
                  />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 italic">
            Hover or drag the slider side to side to compare
          </p>
        </div>
      </section>
    </div>
  );
};

export default DIff;
