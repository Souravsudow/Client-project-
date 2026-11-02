import { ImageResponse } from "next/og";
import { company } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#fff",
          background:
            "linear-gradient(135deg, #050505 0%, #181310 42%, #123C3A 100%)",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            border: "2px solid rgba(216,190,131,.65)",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D8BE83",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          IM
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#D8BE83",
              letterSpacing: 8,
              textTransform: "uppercase",
              fontSize: 24,
              marginBottom: 28,
            }}
          >
            UAE Technical & Interior Solutions
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.02, maxWidth: 980 }}>
            {company.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: "rgba(255,255,255,.72)",
            }}
          >
            Engineering Excellence • Quality Workmanship • Trusted Service
          </div>
        </div>
      </div>
    ),
    size
  );
}
