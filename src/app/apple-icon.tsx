import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#00052F",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 136,
            height: 136,
            borderRadius: "50%",
            background: "#F5F0E6",
            border: "5px solid #CCA146",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#CF4520",
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            VJ
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 18,
              fontWeight: 600,
              color: "#00052F",
              letterSpacing: "0.22em",
              lineHeight: 1,
            }}
          >
            PRANA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
