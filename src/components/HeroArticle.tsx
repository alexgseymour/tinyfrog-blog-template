import tinyfrog from "@/helpers/tinyfrog";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const HeroArticle = async () => {
  const res = await tinyfrog.content.get({
    path: "collections/articles",
    filters: {
      attributes: {
        highlighted: { $eq: true },
      },
    },
    config: { cache: "no-cache" },
  });

  console.log(res);

  const article = res.data.entries[0];

  if (!article) return <></>;

  const { published_at, attributes } = article;
  const {
    author_job_title,
    author_name,
    description,
    heading,
    min_read,
    slug,
    image,
  } = attributes;

  return (
    <div className="relative overflow-hidden border-b">
      <img
        src="/grid.svg"
        alt="fdsf"
        className="absolute bottom-[-632px] md:left-[550px] min-w-[1402px] z-[-1]"
      />
      <div className="container pt-20 md:pb-12 pb-16">
        <Link href={`/${slug}`} className="group" prefetch={true}>
          <div className="relative">
            <div className="absolute h-[calc(100%+40px)] w-[calc(100%+40px)] rounded bg-transparent z-10 group-hover:bg-slate-700/5 transition-all duration-500 -inset-5"></div>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="h-[12rem] md:h-[24rem] w-full border rounded-lg bg-slate-100 relative overflow-hidden">
                <Image
                  fill={true}
                  alt="alt"
                  src={image.url}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="text-slate-600 flex space-x-2 text-sm">
                  <p>{dayjs(published_at).format("DD MMMM YYYY")}</p>
                  <p>•</p>
                  <p>{min_read} minute read</p>
                </div>
                <div className="pb-3">
                  <h2 className="text-3xl font-medium pb-3">{heading}</h2>
                  <p className="text-md text-slate-800">{description}</p>
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
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroArticle;
