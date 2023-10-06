import qs from "qs";

const publicApiKey = process.env.TINYFROG_PUBLIC_API_KEY;

export type Image = {
  url: string;
  name: string;
  created_at: string;
  size: number;
};

export type Option = {
  name: string;
  value: string;
};

export type RichTextJSON = {
  type: string;
  attrs: Record<string, any>;
  content: RichTextJSON[];
  marks: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text: string;
  [key: string]: any;
};

export type RichText = {
  text: string;
  json: RichTextJSON;
  html: string;
};

export type CollectionPluralApiId = "articles" | "socials";

export type ArticleAttributes = {
  body: RichText;
  author_job_title: Option;
  author_name: Option;
  description: string;
  genre: Option;
  heading: string;
  highlighted: boolean;
  image: Image;
  min_read: string;
  slug: string;
  keywords: string;
};

export type SocialAttributes = {
  name: string;
  icon: Image;
  url: string;
};

export type AttributesMap = {
  articles: ArticleAttributes;
  socials: SocialAttributes;
};

export type Response<T> = {
  data: T;
};

export type FilterMethods = "$eq";

export type FilterCondition<T> = {
  [key in FilterMethods]: T;
};

export type NestedFilters<T> = {
  [key in keyof T]?: T[key] extends Record<string, any>
    ? NestedFilters<T[key]>
    : FilterCondition<T[key]>;
};

export type Filters<T extends keyof AttributesMap> = {
  filters?: NestedFilters<AttributesMap[T]>;
};

export type Path<T extends CollectionPluralApiId> =
  | `collections/${T}`
  | `collections/${T}/${string}`;

export type EntryType<Attributes> = {
  id: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  attributes: Attributes;
};

export type CollectionType<
  Name extends CollectionPluralApiId,
  EntryAttributes
> = {
  name: Name;
  entries: EntryType<EntryAttributes>[];
};

async function tinyfrog<T extends CollectionPluralApiId>(
  path: Path<T>,
  query?: Filters<T>,
  config?: RequestInit
): Promise<Response<CollectionType<T, AttributesMap[T]>>> {
  const parsedQuery = qs.stringify(query);
  const url = new URL(
    `https://tinyfrog.co/api/${path}?publicApiKey=${publicApiKey}&${parsedQuery}`
  );
  const res = await fetch(url.toString(), config);
  return res.json();
}

export default tinyfrog;
