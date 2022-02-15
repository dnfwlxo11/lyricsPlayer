const { Client } = require('@elastic/elasticsearch');

class Elastic {
    constructor() {
        this.init();
    }

    init() {
        this.client = new Client({ node: 'http://localhost:9200' });
    }

    async createIndex(name, body) {
        let res = await this.client.indices.exists({ index: name });
        if (res.body) await this.client.indices.delete({ index: name });

        await this.client.indices.create({
            index: name
        });

        // await this.client.indices.putMapping({
        //     index: name,
        //     body: JSON.parse(body)
        // });
    }

    async refreshClient() {
        await this.client.indices.refresh({ index: 'song' });
    }

    async searchData(query) {
        const result = await this.client.search(query);
        console.log(JSON.stringify(result.body.hits))
    }

    async putSongData(query) {
        await this.client.index(query);
    }

    updataSongData() {

    }

    deleteSongData() {

    }
}

module.exports = Elastic;