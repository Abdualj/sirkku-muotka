const ICON_PATHS: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8H17V4.5h-2.5c-2.2 0-3.5 1.4-3.5 3.6V10H8.5v3.5H11V21h3.5v-7.5H17l.5-3.5h-3V8.6c0-.4.2-.6.6-.6Z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11 16.5v-6M11 13c0-1.5 1-2.5 2.4-2.5s2.1.9 2.1 2.5v3.5" />
    </>
  ),
};

/** Icon for a known social platform, or the platform name as text. */
export default function SocialIcon({ platform }: { platform: string }) {
  const icon = ICON_PATHS[platform.trim().toLowerCase()];
  if (!icon) return <>{platform}</>;

  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
