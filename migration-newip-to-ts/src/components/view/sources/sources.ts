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

        this.findBySelector<Element>(document, '.sources').append(fragment);
    }
}

export default Sources;
