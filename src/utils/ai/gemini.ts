import { GoogleGenerativeAI } from "@google/generative-ai";
import { getConfig } from "../config/get-config";

const config = getConfig()

const geminiAI = new GoogleGenerativeAI(config.GEMINI_API_KEY)

const model = geminiAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 100
  }
});

const commitPrompt = [
  'Generate a concise, present-tense git commit message for the given code diff based on the specifications below:',
  '1. Language: English',
  '2. Maximum length: 100 characters',
  '3. Follow the Conventional Commits specification according to the provided code diff',
  '4. Format: <type>(<optional scope>): <commit message>',
  '5. Exclude unnecessary information',
  '6. not include the code diff in the commit message'
];

export async function createCommitMessage (code: string) {
  const result = await model.generateContent([
    ...commitPrompt,
    'The code: ',
    code
  ])
  const response = result.response
  const text = response.text()
  return text.trim()
}