import tinyfrog from "@/helpers/tinyfrog";
import { Input } from "./ui/input";
import { useState } from "react";
import ArticlesList from "./ArticlesList";

export const revalidate = 60;

const ArticlesListData = async () => {
  const articles = await tinyfrog("collections/articles", undefined);
  return <ArticlesList articles={articles} />;
};

export default ArticlesListData;
