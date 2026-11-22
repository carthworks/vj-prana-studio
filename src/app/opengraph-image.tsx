import { ImageResponse } from "next/og";

export const alt = "VJ PRANA | Yoga, Nutrition & Wellness Studio in Salem";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          background: "linear-gradient(135deg, #F5F0E6 0%, #FFFFFF 55%, #F5F0E6 100%)",
          color: "#00052F",
          position: "relative",
        }}
      >
        {/* Top Brand Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "#00052F",
                border: "3px solid #CCA146",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F5F0E6",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              VJ
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#00052F",
                }}
              >
                VJ PRANA
              </div>
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: "0.22em",
                  color: "#676055",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                Health &amp; Wellness Studio
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background: "#00052F",
              color: "#CCA146",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Salem &middot; Online &amp; Offline
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#00052F",
              fontFamily: "Georgia, serif",
            }}
          >
            Breathe Better. Move Better. Live Better.
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 25,
              lineHeight: 1.45,
              color: "#676055",
            }}
          >
            Yoga &bull; Therapeutic Yoga &bull; Pranayama &amp; Meditation &bull;
            Personalised Nutrition &bull; Strength &amp; Women&rsquo;s Wellness
          </div>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E4DED4",
            paddingTop: 24,
            fontSize: 19,
            color: "#28231E",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#CF4520", fontWeight: 700 }}>
              Sastha Nagar, Salem – 636005
            </span>
          </div>
          <div style={{ color: "#676055", fontWeight: 600 }}>
            097917 85007 &middot; 97902 38264
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
