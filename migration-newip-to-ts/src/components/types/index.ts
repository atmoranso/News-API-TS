type Source = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};
type Article = {
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
export interface Sources {
    status: string;
    sources: Source[];
}
export interface News {
    status: string;
    totalResults: number;
    articles: Article[];
}
