const elasticsearch = require('elasticsearch');

class Es {
    constructor() {
        this.init();
    }

    init() {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace',
            apiVersion: '7.x'
        });
    }

    fingTest() {
        this.client.ping({ requestTimeout: 1000 }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('All is well');
            }
        });
    }
}

module.exports = Es;