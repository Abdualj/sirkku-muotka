export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {/* Netlify injects a "Powered by Netlify" badge that covers the Publish button. */}
        <style>{`#nl-badge-frame, #nl-hud-frame { display: none !important; }`}</style>
        {children}
      </body>
    </html>
  );
}
