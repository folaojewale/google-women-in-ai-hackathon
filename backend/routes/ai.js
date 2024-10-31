const express = require('express')
const router = express.Router()

const {
    getAIResponse,
    getAISuggestions,
    getTranslation
} = require('../controller/gemini-1.5aiController')


//GET a response
router.get('/', getAIResponse)

router.post('/suggestions', getAISuggestions)

router.post('/translate', getTranslation)

module.exports = router