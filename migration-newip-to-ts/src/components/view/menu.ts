export default class Menu {
    private findBySelector<T extends Element>(parentElem: Element | Document, selector: string): T {
        const element: T | null = parentElem.querySelector(selector);
        if (element === null) throw new Error(`Can't find ${selector} selector`);
        else return element;
    }
    toggle(): void {
        const burgerButton: Element = this.findBySelector<Element>(document, '.burger');
        const menuBlock: Element = this.findBySelector<Element>(document, 'NAV');
        burgerButton.classList.toggle('open');
        menuBlock.classList.toggle('open');
        document.body.classList.toggle('open');
    }
}
