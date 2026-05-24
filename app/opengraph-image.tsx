import { ImageResponse } from "next/og";

export const alt =
  "Maldonite | Full-Stack Development, AI, and Digital Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #0D1321 0%, #1a1a2e 50%, #0D1321 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold accent line */}
      <div
        style={{
          display: "flex",
          width: "80px",
          height: "4px",
          background: "#D4AF37",
          borderRadius: "2px",
          marginBottom: "30px",
        }}
      />

      {/* Brand name */}
      <div
        style={{
          display: "flex",
          fontSize: "72px",
          fontWeight: "bold",
          color: "#ffffff",
          letterSpacing: "-1px",
        }}
      >
        Maldon
        <span style={{ display: "flex", color: "#D4AF37" }}>i</span>
        te
      </div>

      {/* Tagline */}
      <div
        style={{
          display: "flex",
          fontSize: "28px",
          color: "#c0c0c0",
          marginTop: "16px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Shaping Digital Gold
      </div>

      {/* Description */}
      <div
        style={{
          display: "flex",
          fontSize: "22px",
          color: "#9ca3af",
          marginTop: "24px",
          textAlign: "center",
          maxWidth: "700px",
          lineHeight: "1.4",
        }}
      >
        Full-Stack Development · AI Integration · UI/UX Design · Digital
        Marketing
      </div>

      {/* Bottom text */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "40px",
          fontSize: "16px",
          color: "#D4AF37",
          letterSpacing: "3px",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        maldonite.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
