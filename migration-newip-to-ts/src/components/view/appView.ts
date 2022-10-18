import News from './news/news';
import Sources from './sources/sources';
import Menu from './menu';
import { SourcesData } from '../types/index';
import { NewsData } from '../types/index';

export class AppView {
    private _news: News;
    private _sources: Sources;
    private _menu: Menu;
    constructor() {
        this._news = new News();
        this._sources = new Sources();
        this._menu = new Menu();
    }

    drawNews(data: NewsData) {
        const values = data?.articles ? data?.articles : [];
        this._news.draw(values);
    }

    drawSources(data: SourcesData) {
        const values = data?.sources ? data?.sources : [];
        this._sources.draw(values);
    }
    resetSources(sourcesBlock?: Element | null) {
        if (!sourcesBlock) {
            sourcesBlock = document.querySelector('.sources');
            if (sourcesBlock === null) throw new Error("Cant't find .sources selector");
        }
        this._sources.reset(sourcesBlock);
    }
    toggleSource(e: Event) {
        this._sources.toggle(e);
    }
    applyChosenSources(sourcesBlock?: Element | null) {
        if (!sourcesBlock) {
            sourcesBlock = document.querySelector('.sources');
            if (sourcesBlock === null) throw new Error("Cant't find .sources selector");
        }
        this._sources.apply(sourcesBlock);
    }
    drawMenu() {
        this._menu.toggle();
    }
}

export default AppView;
