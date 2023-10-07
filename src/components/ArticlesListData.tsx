import tinyfrog from "@/helpers/tinyfrog";
import ArticlesList from "./ArticlesList";

const ArticlesListData = async () => {
  const articles = await tinyfrog("collections/articles");
  return <ArticlesList articles={articles} />;
};

export default ArticlesListData;
