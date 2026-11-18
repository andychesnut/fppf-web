export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 30 30">
      <rect x="11" y="1" width="8" height="3" fill="#0F172A" />
      <rect x="9" y="6" width="12" height="3" fill="#0F172A" />
      <rect x="7" y="11" width="16" height="3" fill="#0F172A" />
      <rect x="5" y="16" width="20" height="3" fill="#0F172A" />
      <rect x="3" y="21" width="24" height="3" fill="#0F172A" />
      <rect x="1" y="26" width="28" height="3" fill="#1D4ED8" />
    </svg>
  );
}
