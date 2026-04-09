interface LogoProps {
  variant?: "default" | "footer";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const isFooter = variant === "footer";

  const textSize =
    size === "sm" ? "text-[28px]" :
    size === "lg" ? "text-[50px]" :
                    "text-[34px]";

  const iconSize =
    size === "sm" ? 34 :
    size === "lg" ? 60 :
                    42;

  return (
    <span
      className="flex items-center gap-2 leading-none select-none"
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" }}
    >
      <img
        src="/images/globe-check.svg"
        alt=""
        width={iconSize}
        height={iconSize}
        style={{
          width: iconSize,
          height: iconSize,
          objectFit: "contain",
          filter: isFooter ? "brightness(0) invert(1)" : "none",
        }}
        aria-hidden="true"
      />
      <span className={textSize}>
        <span style={{ color: isFooter ? "#ffffff" : "#333333" }}>Legal</span>
        <span style={{ color: "#0056d2" }}>Nations</span>
      </span>
    </span>
  );
}
