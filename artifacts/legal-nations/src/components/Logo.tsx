interface LogoProps {
  variant?: "default" | "footer";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const isFooter = variant === "footer";
  const textSize =
    size === "sm" ? "text-3xl md:text-4xl" :
    size === "lg" ? "text-5xl md:text-6xl" :
                    "text-4xl md:text-5xl";

  return (
    <span
      className="flex items-center leading-none select-none"
      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800 }}
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
