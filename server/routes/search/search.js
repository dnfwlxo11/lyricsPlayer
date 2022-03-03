const express = require('express');
const router = express.Router();
const { auth } = require('../../modules/auth');

router.post('/multi', auth, async (req, res, next) => {
    let searchQuery = []
    let positive = req.body.positive;
    let negative = req.body.negative;

    let baseQuery = { "from": 0, "size": 5, "query": { "bool": { "should": [] }}};

    positive.forEach((item, acc) => {
        baseQuery["query"]["bool"]["should"].push({
            "match": {
                "songname": item.title
            }
        });
    });

    searchQuery.push({ "index": "song" });
    searchQuery.push(baseQuery);
    const positiveResult = await global._modules.Elastic.searchData('song', JSON.stringify(searchQuery));

    searchQuery = []
    baseQuery["query"]["bool"]["should"] = [];
    negative.forEach((item, idx) => {
        baseQuery["query"]["bool"]["should"].push({
            "match": {
                "songname": item.title
            }
        });
    });

    searchQuery.push({ "index": "song" });
    searchQuery.push(baseQuery);
    const negativeResult = await global._modules.Elastic.searchData('song', JSON.stringify(searchQuery));

    let positiveData = positiveResult.body.responses.reduce((acc, item, idx) => {
        let searchData = item.hits.hits;
        let hitsData = [];

        searchData.forEach((data) => {
            hitsData.push(data._source);
        })
        
        acc['result'] = hitsData;
        acc['total'] = item.hits.total.value;

        return acc
    }, {});

    let negativeData = negativeResult.body.responses.reduce((acc, item, idx) => {
        let searchData = item.hits.hits;
        let hitsData = [];

        searchData.forEach((data) => {
            hitsData.push(data._source);
        })
        
        acc['result'] = hitsData;
        acc['total'] = item.hits.total.value;

        return acc
    }, {});

    let result = {
        "positive": positiveData,
        "negative": negativeData,
    }

    res.send({ 'success': true, result });
})

router.post('/:keyword', auth, async (req, res, next) => {
    let queries = req.query;
    let keyword = queries.keyword;
    queries.pageNum ? queries.pageNum : queries.pageNum = 0;

    let searchQuery = [];
    let options = Object.keys(queries).reduce((acc, item) => {
        if (item != 'keyword' && item != 'pageNum' && queries[item]) acc.push(item)
        return acc
    }, [])
    
    options.forEach((item, idx) => {
        let baseQuery = { "from": 0 + (queries.pageNum * 5), "size": 5, "query": { "bool": { "should": [] }}}

        if (req.query[item]) {
            let query_string = {};
            let match_phrase = {};
            let match_phrase_prefix = {};

            query_string = {
                "fields": [item],
                "query": `*${keyword.split(' ').join('* AND *')}*`
            };
            match_phrase[item] = { 
                "query": keyword, 
                "slop": 3 
            };
            match_phrase_prefix[item] = {
                "query": keyword,
                "max_expansions": 50
            };
            
            baseQuery["query"]["bool"]["should"].push({ "query_string": query_string });
            baseQuery["query"]["bool"]["should"].push({ "match_phrase": match_phrase });
            baseQuery["query"]["bool"]["should"].push({ "match_phrase_prefix": match_phrase_prefix });
            
            searchQuery.push({ "index": "song"});
            searchQuery.push(baseQuery);
        }
    })

    const searchResult = await global._modules.Elastic.searchData('song', JSON.stringify(searchQuery));
    let result = searchResult.body.responses;

    result = result.reduce((acc, item, idx) => {
        let searchData = item.hits.hits;
        let hitsData = [];

        searchData.forEach((data) => {
            hitsData.push(data._source);
        })
        
        acc[options[idx]] = {
            'result': hitsData,
            'total': item.hits.total.value,

        };

        return acc
    }, {});

    res.send({ 'success': true, result });
})

module.exports = router