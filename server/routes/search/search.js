const express = require('express');
const router = express.Router();
const { auth } = require('../../modules/auth');

router.post('/:keyword', auth, async (req, res, next) => {
    let querys = req.query;
    let keyword = querys.keyword;
    let searchQuery = [];
    let options = Object.keys(querys).reduce((acc, item) => {
        if (item != 'keyword' && querys[item]) acc.push(item)
        return acc
    }, [])
    
    options.forEach((item, idx) => {
        let baseQuery = { "from": 0, "size": 5, "query": { "bool": { "should": [] }}}

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

    console.log(JSON.stringify(searchQuery[5]))

    const searchResult = await global._modules.Elastic.searchData('song', JSON.stringify(searchQuery));
    let result = searchResult.body.responses;

    result = result.reduce((acc, item, idx) => {
        let searchData = item.hits.hits;
        let hitsData = [];

        searchData.forEach((data) => {
            hitsData.push(data._source);

            let pushData = {}
            pushData[options[idx]] = hitsData;

            acc.push( pushData)
        })
            
        return acc
    }, [])

    res.send({ 'success': true, result });
})

module.exports = router