import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt =
  "tinyfrog |  A suite of tools needed to build, manage and grow your online projects";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const satoshi = fetch(
    new URL("./fonts/Satoshi-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: "6rem",
          backgroundImage:
            "linear-gradient(to bottom right, #c7d2fe 0%, white 40%, #c7d2fe 100%)",
          color: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10rem",
          paddingRight: "10rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingBottom: "3rem" }}>tinyfrog</div>
          <div
            style={{ fontSize: "2rem", textAlign: "center", color: "#334155" }}
          >
            A suite of tools needed to build, manage and grow your online
            projects.
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Satoshi",
          data: await satoshi,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
