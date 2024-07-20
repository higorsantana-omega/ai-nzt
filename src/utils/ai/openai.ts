import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: 'sk-proj-Gsbn9fgdZoAsl3QfPs04T3BlbkFJnPM7bqzftAwGCJkYrcNS'
})

const commitPrompt = [
  'You are an assistant that generates commit messages following the Conventional Commits specification.',
  'The message should be concise and clearly describe the changes made in the code.'
]

export async function createCommitMessage (code: string) {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: commitPrompt.join('\n')
      },
      {
        role: 'user',
        // content: code
        content: 'oi'
      }
    ],
    max_tokens: 300
  })

  return chatCompletion.choices[0].message.content
}