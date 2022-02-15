const { Client } = require('@elastic/elasticsearch');

class Elastic {
    constructor() {
        this.init();
    }

    init() {
        this.client = new Client({ node: 'http://localhost:9200' });
    }

    async refreshClient() {
        await this.client.indices.refresh({ index: 'kibana_sample_data_flights' })
    }

    async searchData(query) {
        const result = await this.client.search(query)

        console.log(result.body.hits.hits[0])
    }

    putSongData() {

    }

    updataSongData() {

    }

    deleteSongData() {

    }
}

module.exports = Elastic;