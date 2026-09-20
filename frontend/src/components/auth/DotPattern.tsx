interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}
export function DotPattern({
  width = 30,
  height = 30,
  x = 20,
  y = 20,
  cx = 1,
  cy = 1,
  cr = 1,
}: DotPatternProps) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -z-30 inset-0 h-full w-full fill-slate-400/70 dark:fill-slate-500/50 md:fill-slate-400/90 md:dark:fill-slate-500/70"
    >
      <defs>
        <pattern
          id={"pattern"}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#pattern)`} />
    </svg>
  );
}
