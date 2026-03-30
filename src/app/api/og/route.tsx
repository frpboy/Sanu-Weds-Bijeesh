import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1c0e00 100%)",
        }}
      >
        {/* Gold top bar */}
        <div style={{ width: 80, height: 3, background: "#d4af37", marginBottom: 32 }} />

        <div
          style={{
            fontSize: 20,
            color: "#d4af37",
            letterSpacing: 10,
            marginBottom: 28,
            fontFamily: "serif",
          }}
        >
          SAVE THE DATE
        </div>

        <div
          style={{
            fontSize: 88,
            color: "#d4af37",
            fontFamily: "serif",
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Sanu &amp; Bijeesh
        </div>

        {/* Decorative line */}
        <div style={{ width: 160, height: 2, background: "rgba(212,175,55,0.5)", margin: "28px 0" }} />

        <div
          style={{
            fontSize: 38,
            color: "#ffffff",
            fontFamily: "serif",
            letterSpacing: 2,
          }}
        >
          April 8th, 2026
        </div>

        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            marginTop: 14,
            letterSpacing: 1,
          }}
        >
          Mannarmala, Kerala
        </div>

        {/* Gold bottom bar */}
        <div style={{ width: 80, height: 3, background: "#d4af37", marginTop: 32 }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
