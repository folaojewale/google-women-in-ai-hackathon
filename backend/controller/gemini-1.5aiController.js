const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.api_key)

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const getAIResponse = async (req, res) => {
    const prompt = "Write a small quote."

    // Check if the prompt is provided
    if (!prompt) {
        res.status(400).json({ error: 'No prompt provided' })
        return
    }

    try {
        const result = await model.generateContent(prompt)

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getAISuggestions = async (req, res) => {
    const { titles } = req.body // Extract titles from the request body

    // Check if titles are provided
    if (!titles || titles.length === 0) {
        res.status(400).json({ error: 'No titles provided' })
        return
    }

    const prompt = `Write some suggestions on how these articles can help me: ${titles.join(', ')}`

    try {
        const result = await model.generateContent(prompt)

        res.status(200).json({ response: result.response.candidates[0].content.parts[0].text })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getTranslation = async (req, res) => {

}
module.exports = {
    getAIResponse,
    getAISuggestions,
    getTranslation
}
