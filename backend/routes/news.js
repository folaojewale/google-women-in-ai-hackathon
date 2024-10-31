const express = require('express')
const router = express.Router()

const {
    getNews,
    getOpportunitesNews,
    getHealth,
    getTech
} = require('../controller/newsController')


//GET a response
router.get('/', getNews)

router.get('/opportunities', getOpportunitesNews)

router.get('/technology', getTech)

router.get('/health', getHealth)

module.exports = router