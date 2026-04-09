interface LogoProps {
  variant?: "default" | "footer";
  size?: "sm" | "md" | "lg";
}

function GlobeMascot({ size, color }: { size: number; color: string }) {
  const s = 5.5;
  return (
    <svg
      width={size}
      height={Math.round(size * 0.88)}
      viewBox="0 0 108 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        {/* Globe outer circle */}
        <circle cx="44" cy="58" r="34" />
        {/* Equatorial horizontal oval */}
        <ellipse cx="44" cy="58" rx="34" ry="13" />
        {/* Diagonal meridian arc — top-left to bottom-right */}
        <path d="M 20,31 C 32,45 44,58 62,86" />
        {/* Second diagonal arc — top-right to bottom-left */}
        <path d="M 68,31 C 56,45 44,58 26,86" />
        {/* Checkmark — anchored to globe upper-right, sweeps up */}
        <polyline points="65,27 76,44 104,6" />
      </g>
    </svg>
  );
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const isFooter = variant === "footer";

  const iconColor = isFooter ? "#ffffff" : "#0056d2";

  const textSize =
    size === "sm" ? "text-[28px]" :
    size === "lg" ? "text-[50px]" :
                    "text-[34px]";

  const iconSize =
    size === "sm" ? 88 :
    size === "lg" ? 176 :
                    120;

  return (
    <span
      className="flex items-center gap-1 leading-none select-none"
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
    >
      <GlobeMascot size={iconSize} color={iconColor} />
      <span className={textSize}>
        <span style={{ color: isFooter ? "#ffffff" : "#333333" }}>Legal</span>
        <span style={{ color: "#0056d2" }}>Nations</span>
      </span>
    </span>
  );
}
