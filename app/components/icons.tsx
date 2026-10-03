import type { ReactElement, ReactNode } from "react";

/* =========================================================
   Tool icons
   ========================================================= */

export type IconProps = {
  color?: string;
};

export type IconComponent = (props?: IconProps) => ReactElement;

const make = (
  children: ReactNode,
  defaultColor = "currentColor",
): IconComponent =>
  function Icon({ color }: IconProps = {}): ReactElement {
    return (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke={color ?? defaultColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    );
  };

/* =========================================================
   React icon
   ========================================================= */

const react = make(
  <>
    <circle cx="12" cy="12" r="1.6" fill="#61DAFB" stroke="none" />

    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" />

    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4"
      transform="rotate(60 12 12)"
      stroke="#61DAFB"
    />

    <ellipse
      cx="12"
      cy="12"
      rx="10"
      ry="4"
      transform="rotate(120 12 12)"
      stroke="#61DAFB"
    />
  </>,
  "#61DAFB",
);

/* =========================================================
   Tool icon collection
   ========================================================= */

export const icons: Record<string, IconComponent> = {
  Figma: make(
    <>
      <rect
        x="5"
        y="2.5"
        width="7"
        height="6.5"
        rx="3.2"
        fill="#F24E1E"
        stroke="#F24E1E"
      />

      <rect
        x="12"
        y="2.5"
        width="7"
        height="6.5"
        rx="3.2"
        fill="#FF7262"
        stroke="#FF7262"
      />

      <rect
        x="5"
        y="9"
        width="7"
        height="6.5"
        rx="3.2"
        fill="#A259FF"
        stroke="#A259FF"
      />

      <circle
        cx="15.5"
        cy="12.25"
        r="3.5"
        fill="#1ABCFE"
        stroke="#1ABCFE"
      />

      <path
        d="M5 18.75A3.25 3.25 0 018.25 15.5H12v3.25a3.25 3.25 0 01-7 0z"
        fill="#0ACF83"
        stroke="#0ACF83"
      />
    </>,
  ),

  Framer: make(
    <path
      d="M5 3h14v6h-7zM5 9h7l7 6H5zM5 15h7v6z"
      fill="#0055FF"
      stroke="#0055FF"
    />,
  ),

  Storybook: make(
    <>
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2.5"
        fill="#FF4785"
        fillOpacity="0.12"
        stroke="#FF4785"
      />

      <path d="M9 3v8l2-1.5 2 1.5V3" stroke="#FF4785" />

      <path d="M8 17h8" stroke="#FF4785" opacity="0.7" />
    </>,
  ),

  React: react,

  "React Native": react,

  "Next.js": make(
    <>
      <circle cx="12" cy="12" r="9.5" stroke="#111111" />

      <path d="M9.5 16V8.5l6.5 9M15.5 8v5" stroke="#111111" />

      <path d="M8 18.5l8 0" stroke="#111111" opacity="0.35" />
    </>,
  ),

  TypeScript: make(
    <>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="#3178C6"
        stroke="#3178C6"
      />

      <path d="M7 10h5M9.5 10v7" stroke="#FFFFFF" />

      <path
        d="M18 10.5c-.8-.7-3.2-.9-3.2.8 0 2 3.4 1.2 3.4 3.3 0 1.6-2.7 1.6-3.7.6"
        stroke="#FFFFFF"
      />
    </>,
  ),

  Tailwind: make(
    <>
      <path d="M3 9c2-4 5-4 8-1.5s5.5 2 7.5-.5" stroke="#06B6D4" />

      <path d="M3 16c2-4 5-4 8-1.5s5.5 2 7.5-.5" stroke="#06B6D4" />
    </>,
  ),

  Vue: make(
    <>
      <path
        d="M2.5 4h4.5l5 8.5L17 4h4.5L12 20.5z"
        fill="#42B883"
        fillOpacity="0.18"
        stroke="#42B883"
      />

      <path d="M7.5 4l4.5 7.7L16.5 4" stroke="#35495E" />
    </>,
  ),

  Flutter: make(
    <path
      d="M13.5 3H19L8 14l-2.5-2.5zM13.5 12.5H19l-4 4 4 4.5h-5.5L9 16.5z"
      fill="#54C5F8"
      stroke="#54C5F8"
    />,
  ),

  Swift: make(
    <>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="#F05138"
        fillOpacity="0.12"
        stroke="#F05138"
      />

      <path
        d="M7 16.5c3 1.5 7 .5 9-2.5-3 1.5-6-.5-8.5-4.5 3 2.5 6 3.5 8 3.5"
        stroke="#F05138"
      />
    </>,
  ),

  Kotlin: make(
    <path
      d="M3.5 3.5h17L12 12l8.5 8.5h-17z"
      fill="#7F52FF"
      fillOpacity="0.16"
      stroke="#7F52FF"
    />,
  ),

  "Node.js": make(
    <>
      <path
        d="M12 2.5l8 4.7v9.6l-8 4.7-8-4.7V7.2z"
        fill="#339933"
        fillOpacity="0.14"
        stroke="#339933"
      />

      <path d="M9.5 15.5V9l5 6.5V9" stroke="#339933" />
    </>,
  ),

  Python: make(
    <>
      <rect
        x="3"
        y="3"
        width="12"
        height="12"
        rx="4.5"
        fill="#3776AB"
        fillOpacity="0.16"
        stroke="#3776AB"
      />

      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="4.5"
        fill="#FFD43B"
        fillOpacity="0.18"
        stroke="#FFD43B"
      />

      <circle cx="7" cy="7" r=".9" fill="#FFD43B" stroke="none" />

      <circle cx="17" cy="17" r=".9" fill="#3776AB" stroke="none" />
    </>,
  ),

  Java: make(
    <>
      <path
        d="M5 11h11v4a4 4 0 01-4 4H9a4 4 0 01-4-4z"
        fill="#ED8B00"
        fillOpacity="0.15"
        stroke="#ED8B00"
      />

      <path d="M16 12h1.5a2 2 0 010 4H16" stroke="#ED8B00" />

      <path d="M8 3c-1 1.5 1 2.5 0 4M12 3c-1 1.5 1 2.5 0 4" stroke="#5382A1" />
    </>,
  ),

  PostgreSQL: make(
    <>
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="3"
        fill="#4169E1"
        fillOpacity="0.14"
        stroke="#4169E1"
      />

      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#4169E1" />

      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#4169E1" />
    </>,
  ),

  GraphQL: make(
    <>
      <path
        d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9zM12 3L4.5 16.5h15z"
        stroke="#E10098"
      />

      {(
        [
          [12, 3],
          [19.5, 7.5],
          [19.5, 16.5],
          [12, 21],
          [4.5, 16.5],
          [4.5, 7.5],
        ] as const
      ).map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="1.3"
          fill="#E10098"
          stroke="none"
        />
      ))}
    </>,
  ),

  AWS: make(
    <>
      <path
        d="M7 18a4 4 0 01-.6-7.9A5.5 5.5 0 0117.2 8.8 4.6 4.6 0 0117 18z"
        fill="#FF9900"
        fillOpacity="0.15"
        stroke="#FF9900"
      />

      <path d="M8 18.5c3 1.5 7 1.5 10 .2" stroke="#232F3E" />
    </>,
  ),

  Docker: make(
    <>
      <path
        d="M2.5 12.5h17.5c1-.5 1.7-1.5 1.8-2.5-1 0-1.8-.3-2.3-1-.5 1-1.5 1.5-2.5 1.5M3 12.5c.5 4.5 4 7 8.5 7 5 0 7.8-2.8 8.5-7"
        stroke="#2496ED"
      />

      <rect x="5" y="9" width="3" height="3" fill="#2496ED" stroke="#2496ED" />

      <rect x="8" y="9" width="3" height="3" fill="#2496ED" stroke="#2496ED" />

      <rect x="11" y="9" width="3" height="3" fill="#2496ED" stroke="#2496ED" />

      <rect x="8" y="6" width="3" height="3" fill="#2496ED" stroke="#2496ED" />
    </>,
  ),
};

/* =========================================================
   Hero tile icons (services page):
   design, software, mobile (iOS + Android), website

   Brand style: sharp square-cornered line art on a 64 grid.
   Everything is drawn with currentColor (and tints of it), so
   the icon is mist on the dark tile and turns pine when the
   tile fills with lichen on hover. Each icon carries one solid
   square, echoing the square inside the Code Square logo.
   ========================================================= */

const tile = (children: ReactNode): IconComponent =>
  function TileIcon(): ReactElement {
    return (
      <svg
        viewBox="0 0 64 64"
        width="52"
        height="52"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {children}
      </svg>
    );
  };

export const tileIcons: IconComponent[] = [
  /* 0 - UI/UX design: artboard with selection handles */
  tile(
    <>
      {/* artboard + header rule */}
      <rect x="10" y="14" width="44" height="36" />
      <path d="M10 24 H54" />

      {/* image block (the brand square) + text lines */}
      <rect
        x="17"
        y="30"
        width="14"
        height="14"
        fill="currentColor"
        stroke="none"
      />
      <path d="M38 33 H48 M38 41 H45" />

      {/* corner selection handles */}
      <rect x="7" y="11" width="6" height="6" fill="currentColor" stroke="none" />
      <rect x="51" y="11" width="6" height="6" fill="currentColor" stroke="none" />
      <rect x="7" y="47" width="6" height="6" fill="currentColor" stroke="none" />
      <rect x="51" y="47" width="6" height="6" fill="currentColor" stroke="none" />
    </>,
  ),

  /* 1 - Custom software: code brackets around the brand square */
  tile(
    <>
      <path d="M22 16 L7 32 L22 48" />
      <path d="M42 16 L57 32 L42 48" />
      <rect
        x="25"
        y="25"
        width="14"
        height="14"
        fill="currentColor"
        stroke="none"
      />
    </>,
  ),

  /* 2 - Mobile apps: Android phone (low, left) + iOS phone (high, right) */
  tile(
    <>
      {/* Android: punch-hole camera, tinted app square, nav line */}
      <rect x="5" y="20" width="23" height="36" rx="3" />
      <circle cx="16.5" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
      <rect
        x="11"
        y="31"
        width="11"
        height="11"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="none"
      />
      <path d="M12 50 H21" />

      {/* iOS: dynamic island, solid app square, home bar */}
      <rect x="36" y="8" width="23" height="36" rx="3" />
      <rect
        x="43"
        y="12.5"
        width="9"
        height="3"
        rx="1.5"
        fill="currentColor"
        stroke="none"
      />
      <rect
        x="42"
        y="21"
        width="11"
        height="11"
        fill="currentColor"
        stroke="none"
      />
      <path d="M43 38 H52" />
    </>,
  ),

  /* 3 - Websites: browser window with a globe */
  tile(
    <>
      {/* window + title bar */}
      <rect x="8" y="11" width="48" height="42" />
      <path d="M8 21 H56" />
      <circle cx="14" cy="16" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="20" cy="16" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="26" cy="16" r="1.7" fill="currentColor" stroke="none" />

      {/* globe */}
      <circle
        cx="32"
        cy="37"
        r="11"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <ellipse cx="32" cy="37" rx="4.5" ry="11" />
      <path d="M21 37 H43" />
    </>,
  ),
];

/* =========================================================
   Service illustration system
   ========================================================= */

const INK = "#17201D";

const sw = {
  stroke: INK,
  strokeWidth: 2.4,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

/* A soft drop shadow filter, reused by every illustration */
function SoftShadow({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="6"
          stdDeviation="6"
          floodColor="#0b1a17"
          floodOpacity="0.18"
        />
      </filter>
    </defs>
  );
}

export function Illustration({ kind }: { kind: number }) {
  const art: ReactNode[] = [
    /* -----------------------------------------------------
       0 - UI/UX design
       ----------------------------------------------------- */
    <>
      <SoftShadow id="sh0" />

      {/* Back panel - wireframe sheet */}
      <g filter="url(#sh0)">
        <rect
          x="14"
          y="16"
          width="200"
          height="150"
          rx="12"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="2.2"
        />
      </g>

      {/* Browser chrome bar */}
      <rect x="14" y="16" width="200" height="22" rx="12" fill="#EEF1F4" />
      <rect x="14" y="28" width="200" height="10" fill="#EEF1F4" />
      <line
        x1="14"
        y1="38"
        x2="214"
        y2="38"
        stroke={INK}
        strokeWidth="1.6"
        opacity="0.35"
      />

      {/* Traffic dots */}
      <circle cx="28" cy="27" r="2.6" fill="#F26B5E" />
      <circle cx="38" cy="27" r="2.6" fill="#E5B94A" />
      <circle cx="48" cy="27" r="2.6" fill="#5E9F72" />

      {/* URL bar */}
      <rect
        x="62"
        y="22"
        width="130"
        height="10"
        rx="5"
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth="1.2"
        opacity="0.7"
      />

      {/* Hero block inside the sheet */}
      <rect x="26" y="52" width="80" height="54" rx="6" fill="#4F7CFF" />
      <rect x="34" y="64" width="52" height="5" rx="2.5" fill="#FFFFFF" opacity="0.95" />
      <rect x="34" y="76" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.7" />
      <rect x="34" y="86" width="30" height="10" rx="5" fill="#FFFFFF" opacity="0.9" />

      {/* Right column text lines */}
      <rect x="118" y="54" width="86" height="6" rx="3" fill={INK} opacity="0.85" />
      <rect x="118" y="66" width="66" height="4" rx="2" fill={INK} opacity="0.45" />
      <rect x="118" y="76" width="74" height="4" rx="2" fill={INK} opacity="0.45" />
      <rect x="118" y="86" width="54" height="4" rx="2" fill={INK} opacity="0.45" />

      {/* Lower cards row */}
      <rect
        x="26"
        y="118"
        width="56"
        height="36"
        rx="6"
        fill="#E8F0FF"
        stroke={INK}
        strokeWidth="2"
      />
      <rect x="34" y="128" width="28" height="4" rx="2" fill="#4F7CFF" opacity="0.9" />
      <rect x="34" y="138" width="20" height="4" rx="2" fill="#4F7CFF" opacity="0.55" />

      <rect
        x="90"
        y="118"
        width="56"
        height="36"
        rx="6"
        fill="#E7F3EA"
        stroke={INK}
        strokeWidth="2"
      />
      <rect x="98" y="128" width="28" height="4" rx="2" fill="#5E9F72" opacity="0.9" />
      <rect x="98" y="138" width="20" height="4" rx="2" fill="#5E9F72" opacity="0.55" />

      <rect
        x="154"
        y="118"
        width="50"
        height="36"
        rx="6"
        fill="#FFF0DC"
        stroke={INK}
        strokeWidth="2"
      />
      <rect x="162" y="128" width="28" height="4" rx="2" fill="#E59A45" opacity="0.9" />
      <rect x="162" y="138" width="20" height="4" rx="2" fill="#E59A45" opacity="0.55" />

      {/* Cursor */}
      <g filter="url(#sh0)">
        <path
          d="M172 92l30 12-14 4.5-5.5 14z"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </g>
    </>,

    /* -----------------------------------------------------
       1 - Custom software / dashboard
       ----------------------------------------------------- */
    <>
      <SoftShadow id="sh1" />

      <g filter="url(#sh1)">
        <rect
          x="14"
          y="16"
          width="200"
          height="150"
          rx="12"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="2.2"
        />
      </g>

      {/* Browser chrome */}
      <rect x="14" y="16" width="200" height="22" rx="12" fill="#EEF1F4" />
      <rect x="14" y="28" width="200" height="10" fill="#EEF1F4" />
      <line
        x1="14"
        y1="38"
        x2="214"
        y2="38"
        stroke={INK}
        strokeWidth="1.6"
        opacity="0.35"
      />

      <circle cx="28" cy="27" r="2.6" fill="#F26B5E" />
      <circle cx="38" cy="27" r="2.6" fill="#E5B94A" />
      <circle cx="48" cy="27" r="2.6" fill="#5E9F72" />

      {/* Sidebar */}
      <rect x="14" y="38" width="46" height="128" fill="#F3F5F7" />
      <line
        x1="60"
        y1="38"
        x2="60"
        y2="166"
        stroke={INK}
        strokeWidth="1.4"
        opacity="0.25"
      />

      <rect x="22" y="50" width="30" height="5" rx="2.5" fill={INK} opacity="0.75" />
      <rect x="22" y="64" width="26" height="4" rx="2" fill={INK} opacity="0.4" />
      <rect x="22" y="76" width="30" height="4" rx="2" fill={INK} opacity="0.4" />
      <rect x="22" y="88" width="22" height="4" rx="2" fill={INK} opacity="0.4" />
      <rect x="22" y="100" width="28" height="4" rx="2" fill={INK} opacity="0.4" />

      {/* Main: chart area */}
      <rect
        x="72"
        y="50"
        width="130"
        height="60"
        rx="6"
        fill="#F6F8FB"
        stroke={INK}
        strokeWidth="1.6"
        opacity="0.8"
      />

      {/* Grid lines */}
      <line x1="72" y1="72" x2="202" y2="72" stroke={INK} strokeWidth="1" opacity="0.15" />
      <line x1="72" y1="90" x2="202" y2="90" stroke={INK} strokeWidth="1" opacity="0.15" />

      {/* Bars */}
      <rect x="84" y="86" width="10" height="18" rx="2" fill="#8A73C7" />
      <rect x="100" y="72" width="10" height="32" rx="2" fill="#8A73C7" />
      <rect x="116" y="78" width="10" height="26" rx="2" fill="#4F7CFF" />
      <rect x="132" y="62" width="10" height="42" rx="2" fill="#4F7CFF" />
      <rect x="148" y="70" width="10" height="34" rx="2" fill="#E59A45" />
      <rect x="164" y="56" width="10" height="48" rx="2" fill="#E59A45" />
      <rect x="180" y="66" width="10" height="38" rx="2" fill="#5E9F72" />

      {/* Spark line overlay */}
      <path
        d="M88 76 L104 68 L120 72 L136 58 L152 64 L168 52 L184 60"
        fill="none"
        stroke="#0b1a17"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Stat cards row */}
      <rect
        x="72"
        y="118"
        width="60"
        height="36"
        rx="6"
        fill="#E7F3EA"
        stroke={INK}
        strokeWidth="1.6"
      />
      <rect x="80" y="126" width="22" height="4" rx="2" fill="#5E9F72" opacity="0.9" />
      <rect x="80" y="136" width="34" height="6" rx="3" fill="#0b1a17" opacity="0.8" />

      <rect
        x="140"
        y="118"
        width="62"
        height="36"
        rx="6"
        fill="#EEE8FF"
        stroke={INK}
        strokeWidth="1.6"
      />
      <rect x="148" y="126" width="22" height="4" rx="2" fill="#8067C8" opacity="0.9" />
      <rect x="148" y="136" width="36" height="6" rx="3" fill="#0b1a17" opacity="0.8" />
    </>,

    /* -----------------------------------------------------
       2 - Mobile application
       ----------------------------------------------------- */
    <>
      <SoftShadow id="sh2" />

      {/* Back phone */}
      <g filter="url(#sh2)">
        <rect
          x="42"
          y="34"
          width="86"
          height="140"
          rx="16"
          fill="#F0F4FF"
          stroke={INK}
          strokeWidth="2.2"
        />
      </g>
      <rect x="42" y="34" width="86" height="18" rx="16" fill="#F0F4FF" />
      <line
        x1="48"
        y1="52"
        x2="122"
        y2="52"
        stroke={INK}
        strokeWidth="1.4"
        opacity="0.25"
      />

      {/* Back phone content */}
      <rect x="52" y="64" width="66" height="40" rx="8" fill="#4F7CFF" />
      <rect x="60" y="74" width="40" height="5" rx="2.5" fill="#FFFFFF" opacity="0.95" />
      <rect x="60" y="86" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.65" />

      <rect x="52" y="112" width="66" height="8" rx="4" fill="#0b1a17" opacity="0.18" />
      <rect x="52" y="126" width="46" height="8" rx="4" fill="#0b1a17" opacity="0.18" />
      <rect x="52" y="140" width="56" height="8" rx="4" fill="#0b1a17" opacity="0.18" />

      {/* Front phone */}
      <g filter="url(#sh2)">
        <rect
          x="96"
          y="18"
          width="106"
          height="158"
          rx="20"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="2.4"
        />
      </g>

      {/* Notch */}
      <rect x="132" y="24" width="34" height="8" rx="4" fill={INK} opacity="0.85" />

      {/* Front phone header */}
      <rect x="106" y="42" width="86" height="50" rx="10" fill="#8067C8" />
      <rect x="114" y="54" width="50" height="6" rx="3" fill="#FFFFFF" opacity="0.95" />
      <rect x="114" y="66" width="36" height="4" rx="2" fill="#FFFFFF" opacity="0.65" />

      {/* Avatar row */}
      <circle cx="120" cy="106" r="8" fill="#E8F0FF" stroke={INK} strokeWidth="1.6" />
      <circle cx="140" cy="106" r="8" fill="#E7F3EA" stroke={INK} strokeWidth="1.6" />
      <circle cx="160" cy="106" r="8" fill="#FFF0DC" stroke={INK} strokeWidth="1.6" />
      <circle cx="180" cy="106" r="8" fill="#EEE8FF" stroke={INK} strokeWidth="1.6" />

      {/* Content lines */}
      <rect x="106" y="124" width="86" height="6" rx="3" fill={INK} opacity="0.85" />
      <rect x="106" y="136" width="64" height="4" rx="2" fill={INK} opacity="0.45" />
      <rect x="106" y="146" width="76" height="4" rx="2" fill={INK} opacity="0.45" />

      {/* Bottom nav pill */}
      <rect x="106" y="160" width="86" height="12" rx="6" fill="#F3F5F7" />
      <circle cx="120" cy="166" r="3" fill="#8067C8" />
      <circle cx="140" cy="166" r="3" fill={INK} opacity="0.3" />
      <circle cx="160" cy="166" r="3" fill={INK} opacity="0.3" />
      <circle cx="180" cy="166" r="3" fill={INK} opacity="0.3" />
    </>,

    /* -----------------------------------------------------
       3 - Web platform / product
       ----------------------------------------------------- */
    <>
      <SoftShadow id="sh3" />

      <g filter="url(#sh3)">
        <rect
          x="14"
          y="16"
          width="200"
          height="150"
          rx="12"
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth="2.2"
        />
      </g>

      {/* Browser chrome */}
      <rect x="14" y="16" width="200" height="22" rx="12" fill="#EEF1F4" />
      <rect x="14" y="28" width="200" height="10" fill="#EEF1F4" />
      <line
        x1="14"
        y1="38"
        x2="214"
        y2="38"
        stroke={INK}
        strokeWidth="1.6"
        opacity="0.35"
      />

      <circle cx="28" cy="27" r="2.6" fill="#F26B5E" />
      <circle cx="38" cy="27" r="2.6" fill="#E5B94A" />
      <circle cx="48" cy="27" r="2.6" fill="#5E9F72" />

      <rect
        x="62"
        y="22"
        width="130"
        height="10"
        rx="5"
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth="1.2"
        opacity="0.7"
      />

      {/* Hero banner */}
      <rect x="26" y="50" width="176" height="60" rx="8" fill="#4F7CFF" />
      <rect x="40" y="66" width="88" height="7" rx="3.5" fill="#FFFFFF" opacity="0.95" />
      <rect x="40" y="80" width="60" height="5" rx="2.5" fill="#FFFFFF" opacity="0.65" />

      <rect x="152" y="66" width="40" height="16" rx="8" fill="#FFFFFF" />
      <rect x="160" y="72" width="24" height="4" rx="2" fill="#4F7CFF" />

      {/* Feature cards row */}
      <rect
        x="26"
        y="122"
        width="54"
        height="34"
        rx="6"
        fill="#E7F3EA"
        stroke={INK}
        strokeWidth="1.6"
      />
      <circle cx="40" cy="132" r="4.5" fill="#5E9F72" />
      <rect x="34" y="144" width="36" height="4" rx="2" fill="#0b1a17" opacity="0.6" />

      <rect
        x="88"
        y="122"
        width="54"
        height="34"
        rx="6"
        fill="#FFF0DC"
        stroke={INK}
        strokeWidth="1.6"
      />
      <circle cx="102" cy="132" r="4.5" fill="#E59A45" />
      <rect x="96" y="144" width="36" height="4" rx="2" fill="#0b1a17" opacity="0.6" />

      <rect
        x="150"
        y="122"
        width="52"
        height="34"
        rx="6"
        fill="#EEE8FF"
        stroke={INK}
        strokeWidth="1.6"
      />
      <circle cx="164" cy="132" r="4.5" fill="#8067C8" />
      <rect x="158" y="144" width="34" height="4" rx="2" fill="#0b1a17" opacity="0.6" />
    </>,
  ];

  return (
    <svg
      viewBox="0 0 240 190"
      role="presentation"
      aria-hidden="true"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
    >
      {art[kind]}
    </svg>
  );
}