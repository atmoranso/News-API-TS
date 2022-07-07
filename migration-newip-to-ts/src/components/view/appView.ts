import News from './news/news';
import Sources from './sources/sources';
import { SourcesData } from '../types/index';
import { NewsData } from '../types/index';

export class AppView {
    private _news: News;
    private _sources: Sources;
    constructor() {
        this._news = new News();
        this._sources = new Sources();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this._news.draw(values);
    }

    drawSources(data: SourcesData) {
        const values = data?.sources ? data?.sources : [];
        this._sources.draw(values);
    }
}

export default AppView;
