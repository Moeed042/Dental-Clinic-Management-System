import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight, Columns, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  caption?: string;
  className?: string;
  aspectRatio?: string; // e.g., 'aspect-[4/3]' or 'aspect-[16/9]'
  compact?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  title,
  caption,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  compact = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`flex flex-col rounded-2xl bg-white shadow-lg border border-slate-100 overflow-hidden ${className}`}>
      {/* Top Header bar for card */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-600" />
          <span className="font-semibold text-xs sm:text-sm text-slate-800 truncate">
            {title || 'Smile Transformation'}
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              viewMode === 'slider' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <ChevronsLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              viewMode === 'side-by-side' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split</span>
          </button>
        </div>
      </div>

      {/* Main Image Area */}
      {viewMode === 'slider' ? (
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsDragging(true);
            handleMove(e.touches[0].clientX);
          }}
          className={`relative w-full ${aspectRatio} select-none cursor-ew-resize overflow-hidden bg-slate-900 group`}
        >
          {/* AFTER Image (Base Layer) */}
          <img
            src={afterImage}
            alt={afterLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* AFTER Label Badge */}
          <div className="absolute top-3 right-3 z-10 bg-emerald-600/90 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs tracking-wider uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
            {afterLabel}
          </div>

          {/* BEFORE Image (Clipped Layer on Left) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              referrerPolicy="no-referrer"
              className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                height: '100%',
              }}
            />
          </div>

          {/* BEFORE Label Badge */}
          <div className="absolute top-3 left-3 z-10 bg-slate-800/80 text-slate-100 font-bold text-xs px-2.5 py-1 rounded-full shadow-md backdrop-blur-xs tracking-wider uppercase">
            {beforeLabel}
          </div>

          {/* Slider Line Divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Center Handle Knob */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-sky-600 shadow-xl flex items-center justify-center text-sky-700 transition-transform group-hover:scale-110">
              <ChevronsLeftRight className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Instruction overlay prompt on hover */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-slate-900/70 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-xs flex items-center gap-1.5">
            <ChevronsLeftRight className="w-3 h-3 text-sky-300" />
            <span>Drag slider to compare</span>
          </div>
        </div>
      ) : (
        /* Side-by-Side View */
        <div className={`grid grid-cols-2 gap-0.5 bg-slate-200 w-full ${aspectRatio} relative overflow-hidden`}>
          <div className="relative h-full w-full overflow-hidden bg-slate-100">
            <img
              src={beforeImage}
              alt={beforeLabel}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-slate-800/80 text-slate-100 font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-xs uppercase">
              {beforeLabel}
            </div>
          </div>
          <div className="relative h-full w-full overflow-hidden bg-slate-100">
            <img
              src={afterImage}
              alt={afterLabel}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-emerald-600/90 text-white font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-md shadow-xs uppercase">
              {afterLabel}
            </div>
          </div>
        </div>
      )}

      {/* Caption footer */}
      {caption && (
        <div className={`p-3 text-slate-600 bg-white ${compact ? 'text-xs' : 'text-xs sm:text-sm'}`}>
          <p className="line-clamp-2">{caption}</p>
        </div>
      )}
    </div>
  );
};
