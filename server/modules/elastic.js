const { Client } = require('@elastic/elasticsearch');

class Elastic {
    constructor() {
        this.init();
    }

    async init() {
        let body = {
            "settings": {
                "analysis": {
                    "filter": {
                        "char_filter": {
                            "whitespace_remove": {
                              "type": "pattern_replace",
                              "pattern": "\\s+",
                              "replacement": ""
                            }
                        },
                        "ngram_filter": {
                            "type": "edgeNGram",
                            "min_gram": 2,
                            "max_gram": 5
                        }
                    }
                }
            },
            "mappings": {
                "properties": {
                    "songname": {
                        "type": "text",
                        "analyzer": "english"
                    },
                    "lyrics": {
                        "type": "text",
                        "analyzer": "english"
                    },
                    "author": {
                        "type": "text",
                        "analyzer": "english"
                    },
                    "album": {
                        "type": "text",
                        "analyzer": "english"
                    }
                }
            }
        };

        this.client = new Client({ node: 'http://daein-elastic:9200' });
        await this.createIndex('song', body);
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