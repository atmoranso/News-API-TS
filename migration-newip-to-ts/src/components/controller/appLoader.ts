import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '6d44acaa25434bd8a88cd67d5b43231c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
