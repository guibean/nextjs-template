import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#fafafa",
        padding: "64px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            background: "#fafafa",
            color: "#0a0a0a",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          N
        </div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: "-0.045em",
            fontWeight: 600,
            maxWidth: 880,
          }}
        >
          Sites rápidos. Prontos para pessoas e para IA.
        </div>
        <div style={{ fontSize: 26, color: "#a3a3a3" }}>{siteConfig.tagline}</div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 20, color: "#a3a3a3" }}>
        <span>Performance</span>
        <span>SEO técnico</span>
        <span>Acessibilidade</span>
      </div>
    </div>,
    size,
  );
}
