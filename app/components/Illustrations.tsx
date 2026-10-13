import { ReactNode } from 'react'

// Decorative SVG scenes for the content pages. Drawn in code, themed to the
// site's dark palette, animated with the .anim-* classes in globals.css.
// A designer can replace any of them: see docs/design-requests.md.

const BG = '#1b1d23'
const LINE = '#2c2f38'
const CREAM = '#e4ded7'
const MUTED = '#95979D'
const ACCENT = '#b9bcc4'

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id="illustration-clip">
          <rect width="480" height="320" rx="24" />
        </clipPath>
      </defs>
      <rect width="480" height="320" rx="24" fill={BG} />
      <g clipPath="url(#illustration-clip)">
        <circle cx="420" cy="50" r="90" fill={ACCENT} opacity="0.06" />
        <circle cx="60" cy="290" r="110" fill={CREAM} opacity="0.03" />
      </g>
      {children}
    </svg>
  )
}

function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 L0 22 L6 17 L10 26 L14 24 L10 15 L18 15 Z" fill={CREAM} />
    </g>
  )
}

// Figma frame turning into a website
export function WebsiteIllustration() {
  return (
    <Frame>
      <g className="anim-float-b">
        <rect x="28" y="92" width="120" height="150" rx="6" fill="none" stroke={ACCENT} strokeDasharray="5 4" />
        {[[28, 92], [148, 92], [28, 242], [148, 242]].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill={BG} stroke={ACCENT} />
        ))}
        <rect x="42" y="108" width="60" height="8" rx="4" fill={MUTED} opacity="0.7" />
        <rect x="42" y="124" width="92" height="6" rx="3" fill={LINE} />
        <rect x="42" y="136" width="76" height="6" rx="3" fill={LINE} />
        <rect x="42" y="156" width="54" height="16" rx="8" fill={ACCENT} opacity="0.8" />
        <rect x="42" y="184" width="40" height="40" rx="6" fill={LINE} />
        <rect x="90" y="184" width="44" height="40" rx="6" fill={LINE} />
      </g>
      <path d="M160 168 H198" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" className="anim-blink" />
      <path d="M192 161 L202 168 L192 175" fill="none" stroke={CREAM} strokeWidth="2" />
      <g className="anim-float">
        <rect x="214" y="58" width="236" height="204" rx="12" fill="#13151a" stroke={LINE} />
        <rect x="214" y="58" width="236" height="26" rx="12" fill={LINE} />
        <circle cx="232" cy="71" r="4" fill="#ff6b6b" />
        <circle cx="246" cy="71" r="4" fill="#ffd166" />
        <circle cx="260" cy="71" r="4" fill="#5ad19a" />
        <rect x="282" y="65" width="120" height="12" rx="6" fill={BG} />
        <rect x="232" y="102" width="110" height="12" rx="6" fill={CREAM} className="anim-grow-x" />
        <rect x="232" y="124" width="170" height="7" rx="3" fill={MUTED} opacity="0.6" className="anim-grow-x" style={{ animationDelay: '0.2s' }} />
        <rect x="232" y="138" width="140" height="7" rx="3" fill={MUTED} opacity="0.6" className="anim-grow-x" style={{ animationDelay: '0.4s' }} />
        <rect x="232" y="160" width="72" height="22" rx="11" fill={ACCENT} />
        <rect x="232" y="198" width="62" height="46" rx="8" fill={BG} stroke={LINE} />
        <rect x="302" y="198" width="62" height="46" rx="8" fill={BG} stroke={LINE} />
        <rect x="372" y="198" width="62" height="46" rx="8" fill={BG} stroke={LINE} />
      </g>
      <Cursor x={366} y={156} />
    </Frame>
  )
}

// UI/UX design canvas
export function DesignIllustration() {
  return (
    <Frame>
      <g className="anim-float">
        <rect x="40" y="56" width="110" height="200" rx="14" fill="#13151a" stroke={ACCENT} />
        <rect x="52" y="74" width="86" height="64" rx="8" fill={LINE} />
        <rect x="52" y="150" width="60" height="8" rx="4" fill={CREAM} />
        <rect x="52" y="166" width="86" height="6" rx="3" fill={MUTED} opacity="0.6" />
        <rect x="52" y="178" width="70" height="6" rx="3" fill={MUTED} opacity="0.6" />
        <rect x="52" y="204" width="86" height="28" rx="14" fill={ACCENT} opacity="0.85" />
      </g>
      <g className="anim-float-b">
        <rect x="178" y="82" width="170" height="124" rx="10" fill="#13151a" stroke={LINE} />
        <rect x="190" y="94" width="146" height="14" rx="4" fill={LINE} />
        <rect x="190" y="118" width="64" height="76" rx="6" fill={LINE} />
        <rect x="264" y="118" width="72" height="10" rx="5" fill={CREAM} />
        <rect x="264" y="136" width="72" height="6" rx="3" fill={MUTED} opacity="0.6" />
        <rect x="264" y="148" width="56" height="6" rx="3" fill={MUTED} opacity="0.6" />
        <rect x="264" y="168" width="48" height="18" rx="9" fill={ACCENT} opacity="0.85" />
      </g>
      <g>
        {[CREAM, ACCENT, '#c9c4bd', '#ffd166', '#ff6b6b'].map((color, i) => (
          <circle key={color} cx={382 + (i % 3) * 26} cy={72 + Math.floor(i / 3) * 26} r="10" fill={color} className="anim-blink" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>
      <rect x="196" y="228" width="140" height="40" rx="8" fill="none" stroke={MUTED} strokeDasharray="4 4" />
      <path d="M212 248 H320" stroke={MUTED} strokeWidth="1.5" opacity="0.6" />
      <Cursor x={300} y={206} />
    </Frame>
  )
}

// Dashboard / SaaS / CRM
export function DashboardIllustration() {
  const bars = [46, 78, 58, 96, 70, 112, 88]
  return (
    <Frame>
      <rect x="28" y="36" width="424" height="248" rx="14" fill="#13151a" stroke={LINE} />
      <rect x="28" y="36" width="64" height="248" rx="14" fill={LINE} opacity="0.7" />
      {[62, 94, 126, 158].map((y, i) => (
        <rect key={y} x="42" y={y} width="36" height="10" rx="5" fill={i === 0 ? ACCENT : MUTED} opacity={i === 0 ? 1 : 0.5} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} className="anim-float" style={{ animationDelay: `${-i * 1.5}s` }}>
          <rect x={108 + i * 114} y="52" width="104" height="52" rx="10" fill={BG} stroke={LINE} />
          <rect x={120 + i * 114} y="66" width="44" height="7" rx="3" fill={MUTED} opacity="0.7" />
          <rect x={120 + i * 114} y="82" width="64" height="12" rx="4" fill={CREAM} />
        </g>
      ))}
      <rect x="108" y="120" width="210" height="150" rx="10" fill={BG} stroke={LINE} />
      <path
        d="M122 238 L162 214 L198 226 L238 176 L278 192 L306 150"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="anim-draw"
      />
      <rect x="330" y="120" width="106" height="150" rx="10" fill={BG} stroke={LINE} />
      {bars.map((h, i) => (
        <rect key={i} x={340 + i * 13} y={256 - h} width="8" height={h} rx="2" fill={i === 5 ? ACCENT : MUTED} opacity={i === 5 ? 1 : 0.6} className="anim-grow-y" style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </Frame>
  )
}

// Mobile apps and e-commerce
export function PhoneIllustration() {
  return (
    <Frame>
      <g className="anim-float">
        <rect x="120" y="30" width="130" height="262" rx="22" fill="#13151a" stroke={CREAM} strokeOpacity="0.5" />
        <rect x="170" y="38" width="30" height="6" rx="3" fill={LINE} />
        <rect x="134" y="58" width="102" height="50" rx="10" fill={ACCENT} opacity="0.85" />
        <rect x="134" y="120" width="48" height="56" rx="8" fill={LINE} />
        <rect x="188" y="120" width="48" height="56" rx="8" fill={LINE} />
        <rect x="134" y="186" width="102" height="10" rx="5" fill={MUTED} opacity="0.6" />
        <rect x="134" y="204" width="70" height="8" rx="4" fill={MUTED} opacity="0.4" />
        <rect x="134" y="226" width="102" height="30" rx="15" fill={CREAM} />
        {[150, 185, 220].map((x) => (
          <circle key={x} cx={x} cy="276" r="4" fill={MUTED} opacity="0.7" />
        ))}
      </g>
      <g className="anim-float-b">
        <rect x="270" y="64" width="116" height="228" rx="20" fill="#13151a" stroke={LINE} />
        <rect x="284" y="84" width="88" height="14" rx="7" fill={LINE} />
        {[110, 150, 190, 230].map((y, i) => (
          <g key={y}>
            <rect x="284" y={y} width="34" height="34" rx="8" fill={i % 2 ? ACCENT : LINE} opacity={i % 2 ? 0.8 : 1} />
            <rect x="326" y={y + 6} width="46" height="7" rx="3" fill={CREAM} opacity="0.8" />
            <rect x="326" y={y + 19} width="30" height="6" rx="3" fill={MUTED} opacity="0.6" />
          </g>
        ))}
      </g>
      <g className="anim-float" style={{ animationDelay: '-2s' }}>
        <rect x="318" y="26" width="132" height="34" rx="10" fill={BG} stroke={ACCENT} />
        <circle cx="336" cy="43" r="7" fill={ACCENT} className="anim-blink" />
        <rect x="350" y="36" width="84" height="6" rx="3" fill={CREAM} opacity="0.8" />
        <rect x="350" y="47" width="58" height="5" rx="2" fill={MUTED} opacity="0.6" />
      </g>
    </Frame>
  )
}

// Code review and cleanup
export function CodeIllustration() {
  const rows: [number, number, string][] = [
    [0, 120, ACCENT],
    [16, 180, MUTED],
    [16, 140, MUTED],
    [32, 100, CREAM],
    [32, 160, MUTED],
    [16, 90, MUTED],
    [0, 60, ACCENT],
    [0, 150, MUTED],
    [16, 190, MUTED],
    [16, 110, CREAM],
  ]
  return (
    <Frame>
      <rect x="40" y="44" width="300" height="232" rx="12" fill="#13151a" stroke={LINE} />
      <rect x="40" y="44" width="300" height="26" rx="12" fill={LINE} />
      <circle cx="58" cy="57" r="4" fill="#ff6b6b" />
      <circle cx="72" cy="57" r="4" fill="#ffd166" />
      <circle cx="86" cy="57" r="4" fill="#5ad19a" />
      {rows.map(([indent, width, color], i) => (
        <rect key={i} x={60 + indent} y={90 + i * 17} width={width} height="7" rx="3.5" fill={color} opacity="0.75" />
      ))}
      <rect x="48" y="88" width="284" height="14" rx="3" fill={ACCENT} opacity="0.12" className="anim-scan" />
      <g className="anim-float">
        <rect x="352" y="68" width="96" height="44" rx="10" fill={BG} stroke="#5ad19a" />
        <path d="M368 90 L376 98 L392 80" fill="none" stroke="#5ad19a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="400" y="84" width="36" height="6" rx="3" fill={MUTED} opacity="0.7" />
      </g>
      <g className="anim-float-b">
        <rect x="352" y="132" width="96" height="44" rx="10" fill={BG} stroke="#ffd166" />
        <path d="M376 146 V160 M376 166 V167" stroke="#ffd166" strokeWidth="3" strokeLinecap="round" className="anim-blink" />
        <rect x="392" y="150" width="44" height="6" rx="3" fill={MUTED} opacity="0.7" />
      </g>
      <g className="anim-float" style={{ animationDelay: '-2s' }}>
        <rect x="352" y="196" width="96" height="44" rx="10" fill={BG} stroke={ACCENT} />
        <rect x="368" y="212" width="64" height="12" rx="6" fill={ACCENT} opacity="0.8" />
      </g>
    </Frame>
  )
}

// Planning and project management
export function RoadmapIllustration() {
  return (
    <Frame>
      <path d="M40 60 H440" stroke={LINE} strokeWidth="2" />
      {[70, 190, 310, 410].map((x, i) => (
        <circle key={x} cx={x} cy="60" r="9" fill={i < 2 ? ACCENT : BG} stroke={ACCENT} strokeWidth="2" className={i === 2 ? 'anim-blink' : undefined} />
      ))}
      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect x={40 + col * 140} y="100" width="124" height="176" rx="12" fill="#13151a" stroke={LINE} />
          <rect x={52 + col * 140} y="112" width="52" height="8" rx="4" fill={MUTED} opacity="0.7" />
          {Array.from({ length: 3 - col }).map((_, row) => (
            <g key={row} className="anim-float" style={{ animationDelay: `${-(col * 2 + row)}s` }}>
              <rect x={52 + col * 140} y={134 + row * 46} width="100" height="36" rx="8" fill={BG} stroke={LINE} />
              <rect x={62 + col * 140} y={144 + row * 46} width="60" height="6" rx="3" fill={CREAM} opacity="0.8" />
              <rect x={62 + col * 140} y={156 + row * 46} width="36" height="5" rx="2.5" fill={col === 2 ? '#c9c4bd' : ACCENT} opacity="0.8" />
            </g>
          ))}
        </g>
      ))}
    </Frame>
  )
}

// Learning and mentoring: steps up to a flag
export function LearnIllustration() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={50 + i * 68} y={236 - i * 36} width="68" height={64 + i * 36} fill={i === 4 ? ACCENT : LINE} opacity={i === 4 ? 0.9 : 0.5 + i * 0.1} className="anim-grow-y" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <g className="anim-float">
        <circle cx="132" cy="190" r="10" fill={CREAM} />
        <rect x="124" y="202" width="16" height="26" rx="6" fill={CREAM} />
      </g>
      <path d="M364 92 V50" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
      <path d="M364 50 L400 62 L364 74 Z" fill={ACCENT} className="anim-blink" />
      <g className="anim-float-b">
        <path d="M60 100 L100 82 L140 100 L100 118 Z" fill={CREAM} opacity="0.9" />
        <path d="M80 110 V128 C92 136 108 136 120 128 V110" fill="none" stroke={CREAM} strokeWidth="3" opacity="0.9" />
      </g>
      <path d="M170 160 C220 150 250 120 290 112" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="4 5" className="anim-blink" />
    </Frame>
  )
}

// Locations: a pin with pulses and connected nearby dots
export function LocationIllustration() {
  return (
    <Frame>
      {[60, 120, 180, 240].map((y) => (
        <path key={`h${y}`} d={`M24 ${y} H456`} stroke={LINE} strokeWidth="1" />
      ))}
      {[80, 160, 240, 320, 400].map((x) => (
        <path key={`v${x}`} d={`M${x} 24 V296`} stroke={LINE} strokeWidth="1" />
      ))}
      {[
        [110, 220],
        [380, 200],
        [330, 90],
        [150, 90],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M240 160 Q${(240 + x) / 2} ${Math.min(160, y) - 50} ${x} ${y}`} fill="none" stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.7" />
          <circle cx={x} cy={y} r="7" fill={BG} stroke={CREAM} strokeWidth="2" className="anim-blink" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      <circle cx="240" cy="160" r="26" fill="none" stroke={ACCENT} strokeWidth="2" className="anim-pulse-ring" />
      <circle cx="240" cy="160" r="26" fill="none" stroke={ACCENT} strokeWidth="2" className="anim-pulse-ring" style={{ animationDelay: '1.3s' }} />
      <g className="anim-float">
        <path d="M240 190 C222 166 214 154 214 142 A26 26 0 0 1 266 142 C266 154 258 166 240 190 Z" fill={ACCENT} />
        <circle cx="240" cy="142" r="9" fill={BG} />
      </g>
    </Frame>
  )
}

const BY_SLUG: Record<string, () => ReactNode> = {
  'figma-to-nextjs': WebsiteIllustration,
  'figma-ui-ux-design': DesignIllustration,
  'saas-dashboard-development': DashboardIllustration,
  'full-stack-web-app-development': WebsiteIllustration,
  'crm-custom-software-development': DashboardIllustration,
  'ecommerce-app-development': PhoneIllustration,
  'react-native-app-development': PhoneIllustration,
  'claude-code-export-cleanup': CodeIllustration,
  'ai-built-app-cleanup': CodeIllustration,
  'project-management': RoadmapIllustration,
}

export function ServiceIllustration({ slug }: { slug: string }) {
  const Scene = BY_SLUG[slug] ?? WebsiteIllustration
  return <Scene />
}
