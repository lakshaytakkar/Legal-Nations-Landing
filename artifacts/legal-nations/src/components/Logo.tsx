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
      <span className="leading-none tracking-tight" style={{ fontFamily: "inherit" }}>
        <span
          className={`font-extrabold ${isFooter ? "text-white" : "text-primary"}`}
          style={{ letterSpacing: "-0.01em" }}
        >
          Legal
        </span>
        <span
          className={`font-light ${isFooter ? "text-blue-200" : "text-primary/70"}`}
          style={{ letterSpacing: "0.02em" }}
        >
          Nations
        </span>
      </span>
    </span>
  );
}
