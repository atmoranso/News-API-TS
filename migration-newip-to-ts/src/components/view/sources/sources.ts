import './sources.css';
import { Source } from '../../types/index';

class Sources {
    private findBySelector<T extends Element>(parentElem: Element | Document, selector: string): T {
        const element: T | null = parentElem.querySelector(selector);
        if (element === null) throw new Error(`Can't find ${selector} selector`);
        else return element;
    }
    public draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = this.findBySelector<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;

            this.findBySelector<Element>(sourceClone, '.source__item-name').textContent = item.name;
            this.findBySelector<Element>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        this.findBySelector<Element>(document, '.sources').innerHTML = '';
        this.findBySelector<Element>(document, '.sources').append(fragment);
    }
    public toggle(e: Event): void {
        (e.target as Element)?.closest('.source__item')?.classList.toggle('visible');
    }
    public apply(sourcesBlock: Element): void {
        const sources = sourcesBlock.querySelectorAll('.source__item');
        for (const source of sources) {
            if (source.classList.contains('visible')) source.classList.remove('visible');
            else (source as HTMLElement).style.display = 'none';
        }
    }
    reset(sourcesBlock: Element): void {
        const sources = sourcesBlock.querySelectorAll('.source__item');
        for (const source of sources) {
            if ((source as HTMLElement).style.display === 'block') source.classList.add('visible');
            else (source as HTMLElement).style.display = 'block';
        }
    }
}

export default Sources;
