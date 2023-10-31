import tinyfrog from "@/helpers/tinyfrog";
import { ImageResponse } from "next/server";

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
  const articles = await tinyfrog.content.get({
    path: "collections/articles",
    filters: { attributes: { slug: { $eq: params.slug } } },
  });

  const article = articles.data.entries[0];

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
