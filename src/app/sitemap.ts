import tinyfrog from "@/helpers/tinyfrog";
import dayjs from "dayjs";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await tinyfrog("collections/articles");

  return res.data.entries.map((article) => {
    return {
      url: `https://tinyfrog.co/article/${article.attributes.slug}`,
      lastModified: dayjs(article.updated_at).toDate(),
      changeFrequency: "yearly",
      priority: 1,
    };
  });
}
