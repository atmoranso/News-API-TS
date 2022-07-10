import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData, SourcesData } from '../types/index';

class App {
    controller: AppController;
    view: AppView;
    sourceClickHandler: (e: Event) => void;
    chooseButtonClickHandler: (e: Event) => void;
    toggleCallbackHolder: (e: Event) => void;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.sourceClickHandler = this.sourceClicked.bind(this);
        this.chooseButtonClickHandler = this.chooseButtonClicked.bind(this);
        this.toggleCallbackHolder = this.toggleHandler.bind(this);
    }
    sourceClicked(e: Event) {
        this.controller.menuHandler(() => this.view.drawMenu());
        this.controller.getNews(e, (data) => {
            if (typeof data !== 'undefined') {
                this.view.drawNews(data as NewsData);
            }
        });
    }
    toggleHandler(e: Event) {
        this.view.toggleSource(e);
    }
    chooseButtonClicked(e: Event) {
        this.controller.chooseSources(
            e,
            (sourcesBlock) => this.view.resetSources(sourcesBlock),
            this.toggleCallbackHolder,
            (sourcesBlock) => this.view.applyChosenSources(sourcesBlock),
            this.sourceClickHandler
        );
    }
    start() {
        document
            ?.querySelector('.burger')
            ?.addEventListener('click', () => this.controller.menuHandler(() => this.view.drawMenu()));
        document?.querySelector('.sources')?.addEventListener('click', this.sourceClickHandler);
        this.controller.getSources((data) => this.view.drawSources(data as SourcesData));
        document?.querySelector('.choose-sources')?.addEventListener('click', this.chooseButtonClickHandler);
    }
}

export default App;
