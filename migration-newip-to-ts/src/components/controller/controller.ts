import AppLoader from './appLoader';
import { Callback } from '../types/index';
import { SourcesData } from '../types/index';
import { NewsData } from '../types/index';

class AppController extends AppLoader {
    getSources(callback: Callback<SourcesData | NewsData>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<SourcesData | NewsData>) {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) throw new Error("Can't find attribute data-source-id");

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (target.parentNode === null) throw new Error("can't find parent node O_O");

            target = target.parentNode as Element;
        }
    }
}

export default AppController;
