import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";

export const alt = `${siteConfig.name} — Frontend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0f0e0d",
          color: "#f5f4f3",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f5f4f3",
              color: "#1c1917",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, maxWidth: 960 }}>
            Frontend Developer building production-ready web experiences.
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 24, color: "#a8a29e" }}>
            <span style={{ color: "#5eead4" }}>React</span>
            <span>·</span>
            <span>Next.js</span>
            <span>·</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
