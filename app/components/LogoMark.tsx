"use client";

/* =========================================================
   LOGO MARK
   ██  REPLACE THE <svg> WITH YOUR REAL LOGO  ██
   Keep the props. width/height come from `size`.
========================================================= */
export default function LogoMark({
  size = 32,
  twoTone = true,
}: {
  size?: number;
  twoTone?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      className="cs-mark"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M8,8 L44,8 L44,44 L8,44 Z" />
      <path
        d="M52,8 L88,8 L88,44 L64,44 L52,32 Z"
        style={twoTone ? { fill: "var(--cobalt)" } : undefined}
      />
      <path
        d="M8,52 L32,52 L44,64 L44,88 L8,88 Z"
        style={twoTone ? { fill: "var(--cobalt)" } : undefined}
      />
      <path d="M52,52 L88,52 L88,88 L52,88 Z" />
    </svg>
  );
}