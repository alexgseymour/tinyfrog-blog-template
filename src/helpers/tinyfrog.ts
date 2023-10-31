import qs from "qs";

const publicApiKey = process.env.TINYFROG_PUBLIC_API_KEY;

// CONTENT

export type Image = {
  url: string;
  name: string;
  created_at: string;
  size: number;
  alt?: string;
};

export type Option = {
  name: string;
  value: string;
};

export type RichTextJSON = {
  type?: string;
  attrs?: Record<string, any>;
  content?: RichTextJSON[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
  }[];
  text?: string;
  [key: string]: any;
};

export type RichText = {
  text: string;
  json: RichTextJSON;
  html: string;
};

export type CollectionPluralApiId = "articles" | "examples" | "socials";

export type ArticleAttributes = {
  author_job_title: Option;
  author_name: Option;
  body: RichText;
  description: string;
  genre: Option;
  heading: string;
  highlighted: boolean;
  image: Image;
  keywords: string;
  min_read: string;
  slug: string;
};

export type ExampleAttributes = {
  [key: string]: string;
};

export type SocialAttributes = {
  icon: Image;
  name: string;
  url: string;
};

export type AttributesMap = {
  articles: ArticleAttributes;
  examples: ExampleAttributes;
  socials: SocialAttributes;
};

export type Response<T> = {
  data: T;
};

export type FilterMethods = "$eq";

export type SortMethods = "asc" | "desc";

export type FilterCondition<T> = {
  [key in FilterMethods]: T;
};

export type NestedFilters<T> = {
  [key in keyof T]?: T[key] extends Record<string, any>
    ? NestedFilters<T[key]>
    : FilterCondition<T[key]>;
};

export type NestedSort<T> = {
  [key in keyof T]?: T[key] extends Record<string, any>
    ? NestedSort<T[key]>
    : SortMethods;
};

export type Filters<T extends keyof AttributesMap> = {
  attributes?: NestedFilters<AttributesMap[T]>;
};

export type Sort = {
  published_at?: SortMethods;
  created_at?: SortMethods;
  updated_at?: SortMethods;
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

interface TinyfrogOptions<T extends CollectionPluralApiId> {
  path: Path<T>;
  filters?: Filters<T>;
  sort?: Sort;
  config?: RequestInit;
}

async function getContent<T extends CollectionPluralApiId>(
  options: TinyfrogOptions<T>
): Promise<Response<CollectionType<T, AttributesMap[T]>>> {
  const { path, filters, config, sort } = options;
  const parsedQuery = qs.stringify({ filters, sort });
  const url = new URL(
    `https://app.tinyfrog.co/api/${path}?publicApiKey=${publicApiKey}&${parsedQuery}`
  );
  const res = await fetch(url.toString(), config);
  return res.json();
}

// FORMS

export type FormApiId = string;

export type FormFieldsMap = {
  [key: string]: string;
};

export interface FormSubmissionOptions<T extends FormApiId> {
  id: T;
  values: FormFieldsMap[T];
  config?: RequestInit;
}

async function submitForm<T extends FormApiId>(
  options: FormSubmissionOptions<T>
): Promise<Response<any>> {
  const { id, values, config } = options;
  const url = new URL(`https://app.tinyfrog.co/api/forms/${id}`);
  const body = JSON.stringify({
    api_key: publicApiKey,
    values: values,
  });

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const res = await fetch(url.toString(), {
    method: "POST",
    body: body,
    headers: defaultHeaders,
    ...config,
  });

  return res.json();
}

const tinyfrog = {
  content: {
    get: getContent,
  },
  form: {
    submit: submitForm,
  },
};

export default tinyfrog;
