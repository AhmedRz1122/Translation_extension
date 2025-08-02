require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Initialize OpenAI with LangChain
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.3, // Lower temperature for more consistent translations
});

const corsOptions = {
  origin: [
    'http://localhost:3000', // For development
    'chrome-extension://your-extension-id' // For production
  ],
  methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

// Translation template
const translationTemplate = `
You are an expert multilingual translator. 
Translate the following text from {sourceLang} to {targetLang}:

Text: "{text}"

Translation:`;

const promptTemplate = new PromptTemplate({
  template: translationTemplate,
  inputVariables: ["text", "sourceLang", "targetLang"],
});

// Supported languages mapping
const languageMap = {
  'English': 'English',
  'Spanish': 'Spanish',
  'French': 'French',
  'German': 'German',
  'Italian': 'Italian',
  'Chinese': 'Simplified Chinese',
  'Japanese': 'Japanese',
  'Korean': 'Korean',
  'Russian': 'Russian'
};

async function translateWithOpenAI(text, sourceLang, targetLang) {
  try {
    const formattedPrompt = await promptTemplate.format({
      text: text,
      sourceLang: languageMap[sourceLang] || sourceLang,
      targetLang: languageMap[targetLang] || targetLang,
    });

    const translation = await model.call(formattedPrompt);
    return translation.trim();
  } catch (error) {
    console.error('OpenAI translation error:', error);
    throw error;
  }
}

app.post('/translate', async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;
    
    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const translation = await translateWithOpenAI(text, sourceLang, targetLang);
    res.json({ translation });
    console.log('Translation:', translation);
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Translation backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});