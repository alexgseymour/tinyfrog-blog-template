import tinyfrog from "@/helpers/tinyfrog";

export const getArticle = async (slug: string) => {
  const articles = await tinyfrog("collections/articles", {
    filters: { slug: { $eq: slug } },
  });
  const article = articles.data.entries[0];
  return article;
};

export const getSocials = async () => {
  const socials = await tinyfrog("collections/socials", undefined);
  return socials;
};
