"use client";

import { RichTextJSON } from "@/helpers/tinyfrog";
import { checkVisible, cn } from "@/helpers/utils";
import { useEffect, useState } from "react";
import slugify from "slugify";

const ArticleHeading = ({ heading }: { heading: RichTextJSON }) => {
  const [visible, setVisible] = useState(false);

  const level = heading.attrs?.level as number;

  const textSizeMap: Record<number, string> = {
    1: "text-[0.9rem]",
    2: "text-[0.85rem] pl-1",
    3: "text-[0.8rem] pl-2",
    4: "text-[0.75rem] pl-3",
  };

  const slug = slugify(heading.content[0]?.text || "", {
    lower: true,
    strict: true,
  });

  const checkHeadingVisible = () => {
    const element = document.getElementById(slug);
    if (!element) return;
    const visible = checkVisible(element);
    setVisible(visible);
  };

  useEffect(() => {
    checkHeadingVisible();
    window.addEventListener("scroll", checkHeadingVisible);
  });

  return (
    <li>
      <a
        href={`#${slug}`}
        className={cn(
          "text-slate-500 font-medium hover:text-indigo-700 hover:ml-0.5 transition-all",
          textSizeMap[level],
          visible && "text-indigo-700 font-bold"
        )}
      >
        {heading.content[0]?.text}
      </a>
    </li>
  );
};

export default ArticleHeading;
