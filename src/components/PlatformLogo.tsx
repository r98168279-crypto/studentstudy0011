import { useState } from "react";
import type { Platform } from "@/lib/platforms";

const PLATFORM_DOMAINS: Record<string, string> = {
  pw: "pw.live",
  nt: "nexttoppers.com",
  mj: "missionjeet.in",
  rwa: "rojgarwithankit.co.in",
  sa: "sachinacademy.com",
  yo: "yesofficer.com",
  "ua-on": "unacademy.com",
  "ua-off": "unacademy.com",
  ac: "apnacollege.in",
  vb: "vibrantacademy.com",
  pi: "learnxpw.site",
  ms: "youtube.com",
};

export function PlatformLogo({ p, size = 56 }: { p: Platform; size?: number }) {
  // Step 0: Google Favicon (high quality, reliable CDN)
  // Step 1: Local bundled SVG (/logos/[p.id].svg)
  // Step 2: Stylized initials badge
  const [sourceIndex, setSourceIndex] = useState(0);

  const domain = p.domain || PLATFORM_DOMAINS[p.id];
  const sources: string[] = [];

  if (domain) {
    sources.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
  }
  sources.push(`/logos/${p.id}.svg`);

  const currentSrc = sourceIndex < sources.length ? sources[sourceIndex] : null;

  return (
    <div
      className="brand-logo flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/20 bg-card p-1 shadow-md transition-transform hover:scale-105"
      style={{ width: size, height: size }}
    >
      {currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={`${p.name} logo`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain rounded-lg p-0.5"
          onError={() => setSourceIndex((prev) => prev + 1)}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center rounded-lg font-black"
          style={{
            background: `hsl(${p.hue} 60% 15%)`,
            color: `hsl(${p.hue} 90% 65%)`,
            border: `1px solid hsl(${p.hue} 80% 35% / 0.4)`,
          }}
        >
          <span className="font-mono text-xs font-black tracking-tight">{p.tag}</span>
        </div>
      )}
    </div>
  );
}
