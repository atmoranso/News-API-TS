import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData } from '../types/index';
import { SourcesData } from '../types/index';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document?.querySelector('.sources')?.addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => {
                if (typeof data !== 'undefined') {
                    this.view.drawNews(data as NewsData);
                }
            })
        );
        this.controller.getSources((data) => this.view.drawSources(data as SourcesData));
    }
}

export default App;
