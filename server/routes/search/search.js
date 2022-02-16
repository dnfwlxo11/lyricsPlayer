const express = require('express');
const router = express.Router();
const { auth } = require('../../modules/auth');

router.post('/:keyword', auth, async (req, res, next) => {
    console.log(req.query);
    let keyword = req.query.keyword;

    let searchQuery = []
    
    // { "query": { "match_phrase": { "lyrics": { "query": keyword, "slop": 3 }}}}

    Object.keys(req.query).forEach((item, idx) => {
        if (item != 'keyword') {
            let baseQuery = { "query": { "match_phrase": {}}};

            console.log(req.query[item])

            if (req.query[item]) {
                baseQuery['query']['match_phrase'][item] = { "query": keyword, "slop": 3 }
                searchQuery.push({ 'index': 'song'})
                searchQuery.push(baseQuery)
            }
        }
    })

    console.log(searchQuery)

    const searchResult = await global._modules.Elastic.searchData('song', JSON.stringify(searchQuery));
    res.send({ 'success': true, searchResult });
})

module.exports = router