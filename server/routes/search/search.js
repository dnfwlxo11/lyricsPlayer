const express = require('express');
const router = express.Router();
const { auth } = require('../../modules/auth');

router.post('/:keyword', auth, async (req, res, next) => {
    let queries = req.query;
    let keyword = queries.keyword;
    queries.pageNum ? queries.pageNum : queries.pageNum = 0;

    console.log(queries)

    let searchQuery = [];
    let options = Object.keys(queries).reduce((acc, item) => {
        if (item != 'keyword' && item != 'pageNum' && queries[item]) acc.push(item)
        return acc
    }, [])
    
    options.forEach((item, idx) => {
        let baseQuery = { "from": 0 + (queries.pageNum * 5), "size": 5, "query": { "bool": { "should": [] }}}

        if (req.query[item]) {
            let match_phrase = {}
            let wildcard = {}

            match_phrase[item] = { "query": keyword, "slop": 3 }
            wildcard[item] = `*${keyword}*`

            baseQuery["query"]["bool"]["should"].push({ "match_phrase": match_phrase})
            baseQuery["query"]["bool"]["should"].push({ "wildcard": wildcard})
            searchQuery.push({ "index": "song"})
            searchQuery.push(baseQuery)
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