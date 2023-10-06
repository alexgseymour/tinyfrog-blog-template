"use client";

import Article from "./Article";
import {
  ArticleAttributes,
  CollectionType,
  Response,
} from "@/helpers/tinyfrog";
import { Input } from "./ui/input";
import { useState } from "react";
import Fuse from "fuse.js";

const ArticlesList = ({
  articles,
}: {
  articles: Response<CollectionType<"articles", ArticleAttributes>>;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const fuse = new Fuse(articles.data.entries, {
    includeScore: true,
    keys: ["attributes.heading"],
  });
  const filteredArticles = fuse.search(searchValue);
  const showNoResults = searchValue
    ? filteredArticles.length === 0
    : articles.data.entries.length === 0;

  return (
    <div className="border-slate-300">
      <div className="container mx-auto pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Input
            placeholder="Search articles"
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
          />
        </div>
        <div className="grid grid-cols-12 py-16 lg:gap-16">
          {searchValue
            ? filteredArticles.map((article) => (
                <Article key={article.item.id} {...article.item} />
              ))
            : articles.data.entries.map((article) => (
                <Article key={article.id} {...article} />
              ))}
          {showNoResults && (
            <div className="col-span-12 text-sm text-slate-500">No results</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
