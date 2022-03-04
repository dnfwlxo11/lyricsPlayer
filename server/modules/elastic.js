const { Client } = require('@elastic/elasticsearch');

class Elastic {
    constructor() {
        this.init();
    }

    init() {
        this.client = new Client({ node: 'http://daein-elastic:9200' });
    }

    async createIndex(name, body) {
        let res = await this.client.indices.exists({ index: name });
        // if (res.body) await this.client.indices.delete({ index: name });

        if (!res.body) {
            await this.client.indices.create({
                index: name,
                body: body
            });
        }
    }

    async refreshClient() {
        await this.client.indices.refresh({ index: 'song' });
    }

    async searchData(name, query) {
        const result = await this.client.msearch({ 
            body: JSON.parse(query)
        });
        
        return result;
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