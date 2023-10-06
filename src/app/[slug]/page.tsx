import dayjs from "dayjs";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Article, WithContext } from "schema-dts";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import ArticleHeading from "@/components/ArticleHeading";
import { getArticle, getSocials } from "../../helpers/api";

export const revalidate = 60;

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  const { author_name, description, heading } = article.attributes;
  return {
    title: heading,
    description,
    authors: [{ name: author_name.value }],
  };
}

export default async function Home({ params }: Props) {
  const article = await getArticle(params.slug);
  const socials = await getSocials();

  if (!article) return <></>;

  const {
    author_job_title,
    author_name,
    body,
    description,
    heading,
    min_read,
    slug,
    image,
    genre,
    keywords,
  } = article.attributes;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: heading,
    alternativeHeadline: heading,
    image: image.url,
    author: author_name.value,
    editor: author_name.value,
    genre: genre.value,
    keywords: keywords,
    publisher: {
      "@type": "Organization",
      name: "tinyfrog",
    },
    url: `https://tinyfrog.co/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tinyfrog.co/${slug}`,
    },
    datePublished: article.published_at,
    dateCreated: article.published_at,
    dateModified: article.updated_at,
    description: description,
    articleBody: body.html,
  };

  const headings = body.json.content?.filter(
    (content) => content.type === "heading"
  );

  const processor = unified()
    .use(rehypeParse)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeSlug)
    .use(rehypeStringify);

  const { value: processedBody } = await processor.process(
    article.attributes.body.html
  );

  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <main className="min-h-screen relative">
        <div className="max-w-screen absolute top-[-530px] z-[-1] overflow-hidden">
          <img
            src="/grid.svg"
            alt="fdsf"
            className="ml-[100px] md:ml-[700px]"
          />
        </div>
        <div className="container pt-20">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 mb-2 lg:col-span-2">
              <div className="flex items-center gap-1 text-slate-500 hover:text-slate-950">
                <ChevronLeft className="h-3.5 w-3.5" />
                <Link href="/" className="text-sm font-medium">
                  Back
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-12 xl:col-span-10">
              <div className="mb-16 max-w-5xl space-y-8">
                <div className="space-y-4">
                  <p className="text-indigo-700 font-semibold">Article</p>
                  <h1 className="text-3xl font-medium">{heading}</h1>
                  <div className="text-slate-700 flex space-x-3 text-sm">
                    <p>{dayjs(article.published_at).format("YYYY-MM-DD")}</p>
                    <p>•</p>
                    <p>{min_read} minute read</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex-1 flex flex-col gap-3 pt-6 md:flex-row md:gap-0 lg:gap-3">
                      <div className="mr-4 w-max">
                        <a
                          className="cursor-pointer"
                          href="https://github.com/awalias"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                {author_name.value}
                              </span>
                              <span className="text-xs text-slate-600">
                                {author_job_title.value}
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 lg:gap-16 xl:gap-8 pb-20">
                <div className="col-span-12 lg:col-span-7 xl:col-span-7">
                  <article>
                    <div className="border-slate-300 relative bg-slate-100 mb-16 h-[12rem] md:h-[24rem] w-full overflow-auto rounded-lg border shadow-sm">
                      <Image
                        fill={true}
                        alt=""
                        className="object-contain"
                        src={image.url}
                      />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: processedBody }}
                      className="prose"
                    ></div>
                  </article>
                </div>
                <div className="col-span-12 space-y-8 lg:col-span-5 xl:col-span-3 xl:col-start-9">
                  <div className="space-y-6 lg:sticky lg:top-36 lg:mb-48">
                    <div className="hidden lg:block">
                      <div className="space-y-8 py-8 lg:py-0">
                        <div>
                          <div>
                            <p className="mb-4 font-medium">On this page</p>
                            <div className="text-[0.85rem]">
                              <ul className="space-y-2">
                                {headings?.map((heading, i) => (
                                  <ArticleHeading key={i} heading={heading} />
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <p className="mb-4 font-medium text-sm">
                              Find us on social
                            </p>
                          </div>
                          <div className="flex gap-5">
                            {socials.data.entries.map((social) => (
                              <Link
                                href={social.attributes.url}
                                key={social.id}
                              >
                                <Image
                                  src={social.attributes.icon.url}
                                  height={15}
                                  width={15}
                                  alt="logo"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
