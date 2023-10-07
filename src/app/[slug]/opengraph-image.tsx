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
  // Font
  const satoshi = fetch(
    new URL("../fonts/Satoshi-Medium.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <img src={article.attributes.image.url} alt="alt tag" />,
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
