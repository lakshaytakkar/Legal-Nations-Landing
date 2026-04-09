interface LogoProps {
  variant?: "default" | "footer";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const isFooter = variant === "footer";
  const textSize =
    size === "sm" ? "text-2xl md:text-3xl" :
    size === "lg" ? "text-4xl md:text-5xl" :
                    "text-3xl md:text-4xl";

  return (
    <span
      className="flex items-center leading-none select-none"
      style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
    >
      <span className={`${textSize} ${isFooter ? "text-white/90" : "text-[#1A1E3C]"}`}>
        Legal
      </span>
      <span className={`${textSize} text-primary`}>
        Nations
      </span>
    </span>
  );
}
