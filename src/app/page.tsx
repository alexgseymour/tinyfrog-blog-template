import ArticlesSearch from "@/components/ArticlesListData";
import HeroArticle from "@/components/HeroArticle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">Blog</h1>
      <HeroArticle />
      <ArticlesSearch />
    </main>
  );
}
