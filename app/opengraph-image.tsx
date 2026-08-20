import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/* The card that renders when the link is pasted into WhatsApp or LinkedIn,
   which is how most recruiters will meet this site first. */

/* Required by `output: "export"` so the card is rendered once at build time
   rather than on demand by a server we do not have. */
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.roles}`;

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
          background: "#f7f4ee",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 3,
            color: "#5f5950",
            textTransform: "uppercase",
            borderBottom: "2px solid rgba(23,20,15,0.42)",
            paddingBottom: 18,
          }}
        >
          <span>{profile.location}</span>
          <span>Portfolio / 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              lineHeight: 1.02,
              color: "#17140f",
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 30,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9c2d18",
            }}
          >
            {profile.roles}
          </div>
          <div style={{ marginTop: 16, fontSize: 27, color: "#3d3830" }}>
            SIEM deployment · identity and access · threat intelligence · APT analysis
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5f5950",
            borderTop: "2px solid #17140f",
            paddingTop: 18,
          }}
        >
          <span>Four write-ups, in full</span>
          <span>{profile.availability}</span>
        </div>
      </div>
    ),
    size,
  );
}
