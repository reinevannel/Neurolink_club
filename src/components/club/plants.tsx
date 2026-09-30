/** Plantes SVG du jardin — 4 stades de croissance, 5 espèces. */

function Fern({ stage, color }: { stage: number; color: string }) {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" aria-hidden className="block">
      <line x1="26" y1="70" x2="26" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {stage >= 1 && (
        <>
          <path d="M26 56 Q13 46 9 34" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M26 56 Q39 46 43 34" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      {stage >= 2 && (
        <>
          <path d="M26 42 Q11 32 7 20" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M26 42 Q41 32 45 20" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      )}
      {stage >= 3 && (
        <>
          <path d="M26 28 Q16 18 14 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M26 28 Q36 18 38 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      )}
      {stage >= 4 && <circle cx="26" cy="16" r="4" fill={color} opacity="0.75" />}
    </svg>
  );
}

function Flower({ stage, color }: { stage: number; color: string }) {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" aria-hidden className="block">
      <line x1="26" y1="70" x2="26" y2="30" stroke="#6B9B7E" strokeWidth="2.5" strokeLinecap="round" />
      {stage >= 3
        ? [0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx={26 + Math.cos((a * Math.PI) / 180) * 10}
              cy={24 + Math.sin((a * Math.PI) / 180) * 10}
              rx="4.5"
              ry="3"
              fill={color}
              opacity="0.75"
            />
          ))
        : <ellipse cx="26" cy="26" rx="5" ry="7" fill={color} opacity="0.7" />}
      {stage >= 3 && <circle cx="26" cy="24" r="5" fill={color} />}
      {stage >= 4 && <circle cx="26" cy="24" r="3" fill="#E0A36A" />}
    </svg>
  );
}

function Mushroom({ stage, color }: { stage: number; color: string }) {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" aria-hidden className="block">
      <rect x="23" y="44" width="6" height="26" rx="3" fill="#B8956A" />
      <ellipse cx="26" cy="42" rx={7 + stage * 3} ry={5 + stage * 2} fill={color} />
      {stage >= 2 && (
        <>
          <circle cx="21" cy="38" r="2" fill="white" opacity="0.55" />
          <circle cx="28" cy="36" r="2.5" fill="white" opacity="0.55" />
        </>
      )}
    </svg>
  );
}

function Succulent({ stage, color }: { stage: number; color: string }) {
  const count = Math.min(stage * 2 + 3, 10);
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" aria-hidden className="block">
      <ellipse cx="26" cy="66" rx="11" ry="5" fill="#8B7355" opacity="0.35" />
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * 360;
        const d = 6 + (i % 2) * 3;
        return (
          <ellipse
            key={i}
            cx={26 + Math.cos((a * Math.PI) / 180) * d}
            cy={60 + Math.sin((a * Math.PI) / 180) * (d * 0.55)}
            rx="5"
            ry="8"
            fill={color}
            opacity="0.72"
          />
        );
      })}
      <circle cx="26" cy="60" r="5" fill={color} />
    </svg>
  );
}

function Tree({ stage, color }: { stage: number; color: string }) {
  return (
    <svg width="52" height="72" viewBox="0 0 52 72" aria-hidden className="block">
      <rect x="23" y="52" width="6" height="20" rx="2.5" fill="#8B7355" />
      {stage >= 1 && <polygon points="26,48 16,60 36,60" fill={color} opacity="0.75" />}
      {stage >= 2 && <polygon points="26,36 13,52 39,52" fill={color} opacity="0.82" />}
      {stage >= 3 && <polygon points="26,22 11,42 41,42" fill={color} opacity="0.9" />}
      {stage >= 4 && <polygon points="26,10 12,30 40,30" fill={color} />}
    </svg>
  );
}

export function Plant({
  type,
  stage,
  color,
}: {
  type: string;
  stage: number;
  color: string;
}) {
  if (type === "fern") return <Fern stage={stage} color={color} />;
  if (type === "flower") return <Flower stage={stage} color={color} />;
  if (type === "mushroom") return <Mushroom stage={stage} color={color} />;
  if (type === "succulent") return <Succulent stage={stage} color={color} />;
  return <Tree stage={stage} color={color} />;
}

export const PLANT_COLORS: Record<string, string> = {
  astronomy: "#7AB8C8",
  music: "#C87A9B",
  nature: "#6B9B7E",
  art: "#C4A87A",
  coding: "#9B8EC8",
  reading: "#A8C4B2",
  gaming: "#7AB8C8",
  trains: "#C4A87A",
  maps: "#7AB8C8",
  animals: "#6B9B7E",
};
