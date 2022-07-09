import AppLoader from './appLoader';
import { Callback, SourcesData, NewsData } from '../types/index';

class AppController extends AppLoader {
    chooseSources(
        e: Event,
        resetSources: Callback<Element>,
        callback1: (e: Event) => void,
        callback2: Callback<Element>,
        sourceClickHandler: (e: Event) => void
    ) {
        const chooseButton: Element = e.target as Element;
        const sourcesBlock = document.querySelector('.sources');
        if (sourcesBlock === null) throw new Error("Can't find .sources selector");

        if (chooseButton.innerHTML === 'Choose sources') {
            sourcesBlock.removeEventListener('click', sourceClickHandler);
            resetSources(sourcesBlock);
            sourcesBlock.addEventListener('click', callback1);
            chooseButton.innerHTML = 'Save';
        } else {
            sourcesBlock.removeEventListener('click', callback1);
            callback2(sourcesBlock);
            sourcesBlock.addEventListener('click', sourceClickHandler);
            chooseButton.innerHTML = 'Choose sources';
        }
    }
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
