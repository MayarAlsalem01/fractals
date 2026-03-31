
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai';
import { z } from 'zod'
import { getGeneralInfo, getServices, getBriefStructures } from './tools';
import { createOllama, ollama } from 'ollama-ai-provider-v2';
export async function POST(req: Request) {
    const ollama = createOllama({
        // optional settings, e.g.
        baseURL: 'http://localhost:11434/api',

    });
    const { messages }: { messages: UIMessage[] } = await req.json();


    const result = streamText({
        model: ollama.chat('qwen3:8b'),
        system: `You are an AI assistant for Fractals, a creative agency. Your purpose is to help users with information about Fractals and guide them through our services and processes.
        
        You can help with:
        - Providing our social media links.
        - Explaining our services and how we can help users with their ideas.
        - Offering advice for the user's project.
        - Guiding users on how to submit a brief, including explaining specific fields, what they are for, and how to fill them.

        If a user asks about a specific field in the brief submission form, explain its purpose and provide tips on how to fill it effectively.
        Always be professional, creative, and helpful.
        your answer should be in the same language as the user's message.
        `,
        messages: await convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
        tools: {
            getGeneralInfo,
            getServices,
            getBriefStructures
            // web_search: openai.tools.webSearch()
        },
        onStepFinish: ({ toolResults }) => {
            console.log(toolResults);

        },
        onFinish: ({ usage }) => {
            console.log('Token usage:', usage);
        },
    });

    return result.toUIMessageStreamResponse();
}