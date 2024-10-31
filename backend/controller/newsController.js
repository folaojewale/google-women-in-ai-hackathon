const { Translate } = require('@google-cloud/translate').v2
const translate = new Translate({ key: process.env.api_key })

//get news
//Naszym głównym celem jest upraszczanie życia klientów i to napędza każdą innowację, której się podejmujemy. Patrząc w przyszłość, Weber skoncentru...
const { format, subDays } = require('date-fns')
const today = format(subDays(new Date(), 3), 'yyyy-MM-dd')
const getNews = async (req,res) => {
    const { search } = req.query
    
    // Check if name is provided 
    if (!search) {
        res.status(400).json({ error: 'Missing search parameter' })
        return // Return early to prevent further execution.
    }

    try {
        //api link
        const apiURL = `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.api_news_key}&search=${search}&published_after=${today}`
        const news = await fetch(apiURL)
    
        //if there's no results
        if(!news.ok){
            res.status(404).json({error: 'No result(s) found!'})
            return // Return early to prevent further execution.
        }
    
    //convert file to json format
    const data = await news.json()

        // Query useful information and translate each entry if needed
        const articles = await Promise.all(data.data.map(async (item) => {
            let title = item.title
            let description = item.description

            // Translate title and description if language is not English
            if (item.language !== 'en') {
                console.log(`Original Title: ${title}`)
                console.log(`Original Description: ${description}`)

                const [translatedTitle] = await translate.translate(title, 'en')
                const [translatedDescription] = await translate.translate(description, 'en')

                title = translatedTitle
                description = translatedDescription

            }

            // Return the article object with translated fields if applicable
            return {
                title,
                description,
                url: item.url,
                image_url: item.image_url,
                language: item.language,
                published_at: item.published_at,
                source: item.source,
            }
        }))

    res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

//get opportunites
const getOpportunitesNews = async (req,res) => {

    try {
        //api link
        const apiURL = `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.api_news_key}&search=women%27s%20opportunities%20OR%20career%20opportunities%20for%20women%20OR%20women%20empowerment%20OR%20women%20in%20tech&sortBy=publishedAt`
        const news = await fetch(apiURL)
    
        //if there's no results
        if(!news.ok){
            res.status(404).json({error: 'No result(s) found!'})
            return // Return early to prevent further execution.
        }
    
    //convert file to json format
    const data = await news.json()

    //query useful information
    const q = await data.data.map(data => ({
        title: data.title,
        description: data.description,
        url: data.url,
        image_url: data.image_url,
        language: data.language,
        published_at: data.published_at,
        source: data.source,
    }))

    
    res.status(200).json(q)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

//get health
const getHealth = async (req,res) => {

    try {
        //api link
        const apiURL = `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.api_news_key}&search=women%27s%20health%20issues%20OR%20reproductive%20health%20OR%20maternal%20health&sortBy=publishedAt`
        const news = await fetch(apiURL)
    
        //if there's no results
        if(!news.ok){
            res.status(404).json({error: 'No result(s) found!'})
            return // Return early to prevent further execution.
        }
    
    //convert file to json format
    const data = await news.json()

    //query useful information
    const q = await data.data.map(data => ({
        title: data.title,
        description: data.description,
        url: data.url,
        image_url: data.image_url,
        language: data.language,
        published_at: data.published_at,
        source: data.source,
    }))

    
    res.status(200).json(q)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

//get technology
const getTech = async (req,res) => {
  
    try {
        //api link
        const apiURL = `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.api_news_key}&search=women%20in%20STEM%20OR%20women%20in%20science%20OR%20women%20in%20technology%20OR%20women%20in%20engineering&sortBy=publishedAt`
        const news = await fetch(apiURL)
    
        //if there's no results
        if(!news.ok){
            res.status(404).json({error: 'No result(s) found!'})
            return // Return early to prevent further execution.
        }
    
    //convert file to json format
    const data = await news.json()

    //query useful information
    const q = await data.data.map(data => ({
        title: data.title,
        description: data.description,
        url: data.url,
        image_url: data.image_url,
        language: data.language,
        published_at: data.published_at,
        source: data.source,
    }))

    res.status(200).json(q)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = {
    getNews,
    getOpportunitesNews,
    getHealth,
    getTech
}