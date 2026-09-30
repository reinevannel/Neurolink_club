/**
 * Avatar abstrait : formes géométriques, jamais de visage.
 * `seed` choisit la couleur et la forme (0–7).
 */
export function AbstractAvatar({
  seed,
  size = 36,
  label,
}: {
  seed: number;
  size?: number;
  label?: string;
}) {
  const hues = [168, 195, 150, 32, 210, 140, 25, 185];
  const h = hues[Math.abs(seed) % hues.length];
  const s = Math.abs(seed) % 4;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      className="block shrink-0 rounded-full"
    >
      <circle cx="20" cy="20" r="20" fill={`hsl(${h} 28% 36%)`} />
      {s === 0 && <circle cx="20" cy="20" r="9" fill={`hsl(${h} 46% 70%)`} opacity="0.9" />}
      {s === 1 && (
        <rect x="12" y="12" width="16" height="16" rx="5" fill={`hsl(${h} 46% 70%)`} opacity="0.9" />
      )}
      {s === 2 && <polygon points="20,11 29,29 11,29" fill={`hsl(${h} 46% 70%)`} opacity="0.9" />}
      {s === 3 && (
        <>
          <ellipse cx="14" cy="20" rx="6" ry="9" fill={`hsl(${h} 46% 70%)`} opacity="0.75" />
          <ellipse cx="26" cy="20" rx="6" ry="9" fill={`hsl(${h} 46% 70%)`} opacity="0.75" />
        </>
      )}
    </svg>
  );
}
