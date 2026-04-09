interface LogoProps {
  variant?: "default" | "footer";
  size?: "sm" | "md" | "lg";
}

let _id = 0;

function GlobeMascot({ size, color }: { size: number; color: string }) {
  const id = `gc-${++_id}`;
  const sw = 5.2;
  return (
    <svg
      width={size}
      height={Math.round(size * 0.87)}
      viewBox="0 0 108 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id}>
          <circle cx="43" cy="56" r="33" />
        </clipPath>
      </defs>
      <g stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {/* Globe outer circle */}
        <circle cx="43" cy="56" r="33" />
        {/* Clipped interior — horizontal equatorial oval + tilted longitude oval */}
        <g clipPath={`url(#${id})`}>
          {/* Horizontal equatorial ring */}
          <ellipse cx="43" cy="56" rx="33" ry="12" />
          {/* Tilted longitude ring — rotated 45° around globe center */}
          <ellipse
            cx="43"
            cy="56"
            rx="33"
            ry="12"
            transform="rotate(-45 43 56)"
          />
        </g>
        {/* Checkmark swoosh anchored to globe upper-right */}
        <polyline points="64,26 75,43 103,6" />
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
