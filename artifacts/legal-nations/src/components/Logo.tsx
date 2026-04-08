interface LogoProps {
  variant?: "default" | "footer";
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "default", size = "md" }: LogoProps) {
  const imgSize = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-14 h-14" : "w-12 h-12";
  const isFooter = variant === "footer";

  return (
    <span className="flex items-center gap-2">
      <img
        src="/mascot.png"
        alt="Legal Nations mascot"
        className={`${imgSize} object-contain flex-shrink-0`}
      />
      <span className="leading-none" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>
        <span className={`text-2xl md:text-3xl ${isFooter ? "text-white" : "text-primary"}`}>
          Legal Nations
        </span>
      </span>
    </span>
  );
}
