export type Source = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};
export type Callback<T> = (data?: T) => void;
export type Article = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};
export interface SourcesData {
    status: string;
    sources: Source[];
}
export interface NewsData {
    status: string;
    totalResults: number;
    articles: Article[];
}
