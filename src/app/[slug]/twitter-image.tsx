import tinyfrog from "@/helpers/tinyfrog";
import { ImageResponse } from "next/server";
import { getArticle } from "../../helpers/api";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Acme | Article";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) return;

  const { description, heading } = article.attributes;

  const satoshi = fetch(
    new URL("../fonts/Satoshi-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: "4rem",
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
          }}
        >
          <div style={{ paddingBottom: "3rem" }}>{heading}</div>
          <div
            style={{ fontSize: "1.75rem", textAlign: "left", color: "#334155" }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
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
