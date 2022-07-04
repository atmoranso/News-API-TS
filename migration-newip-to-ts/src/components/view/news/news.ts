import './news.css';
import { Article } from '../../types/index';
class News {
    findBySelector<T extends Element>(parentElem: Element | Document, selector: string): T {
        const element: T | null = parentElem.querySelector(selector);
        if (element === null) throw new Error(`Can't find ${selector} selector`);
        else return element;
    }
    draw(data: Article[]) {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp === null) throw new Error("Can't find #newsItemTemp selector");

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as Element;

            if (newsClone === null) throw new Error('newsClone is null :(');

            // const newsItem = newsClone.querySelector('.news__item');
            // if (newsItem === null) throw new Error('newsItem is null :(');
            // if (idx % 2) newsItem.classList.add('alt');

            if (idx % 2) this.findBySelector<Element>(newsClone, '.news__item').classList.add('alt');

            this.findBySelector<HTMLElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;

            this.findBySelector<HTMLElement>(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            this.findBySelector<HTMLElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            this.findBySelector<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
            this.findBySelector<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
            this.findBySelector<HTMLElement>(newsClone, '.news__description-content').textContent = item.description;
            this.findBySelector<HTMLElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        this.findBySelector<HTMLElement>(document, '.news').innerHTML = '';
        this.findBySelector<HTMLElement>(document, '.news').appendChild(fragment);
    }
}

export default News;
