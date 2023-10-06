import { ArticleAttributes, EntryType } from "@/helpers/tinyfrog";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const Article = ({
  attributes,
  published_at,
}: EntryType<ArticleAttributes>) => {
  const {
    author_job_title,
    author_name,
    description,
    heading,
    image,
    min_read,
    slug,
  } = attributes;
  return (
    <div className="col-span-12 mb-16 md:col-span-12 lg:col-span-6 xl:col-span-4">
      <Link href={`/${slug}`} className="group">
        <div className="relative">
          <div className="absolute h-[calc(100%+40px)] w-[calc(100%+40px)] rounded bg-transparent z-10 group-hover:bg-slate-700/5 transition-all duration-500 -inset-5"></div>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="border-scale-300 relative mb-4 h-[12rem] w-full bg-slate-100 overflow-auto rounded-lg border shadow-sm">
                <Image
                  fill={true}
                  alt=""
                  className="object-contain"
                  src={image.url}
                />
              </div>
              <h3 className="max-w-sm text-xl font-medium">{heading}</h3>
              <p className="max-w-sm text-slate-800 line-clamp-3">
                {description}
              </p>
              <div className="flex items-center space-x-1.5 text-sm text-slate-600">
                <p>{dayjs(published_at).format("DD MMMM YYYY")}</p>
                <p>•</p>
                <p>{min_read} minute read</p>
              </div>
            </div>
            <div className="grid w-max grid-flow-col grid-rows-1 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {author_name.value}
                  </span>
                  <span className="text-xs text-slate-600">
                    {author_job_title.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Article;
