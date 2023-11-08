import OpenAI from 'openai';
import { type ThreadCreateParams } from 'openai/resources/beta/threads/threads';
import { MAX_ITERATIONS, NO_RESPONSE, ThreadRunStatus } from '../config/copilotConstants';
import { type MessageContentImageFile, type MessageContentText } from 'openai/resources/beta/threads/messages/messages';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const params: ThreadCreateParams = {};

let assistantInstance: OpenAI.Beta.Assistants.Assistant;
let threadInstance: OpenAI.Beta.Threads.Thread;

// todo: create utils file
const waitForThreadRunCompletion = async (threadId: string, runId: string) => {
  let iterations = 0;
  while (iterations < MAX_ITERATIONS) {
    const status = await openai.beta.threads.runs.retrieve(
      threadId,
      runId
    );

    if (status.status === ThreadRunStatus.COMPLETED) {
      return;
    }
    iterations++;

    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error(`Max iterations (${MAX_ITERATIONS}) reached without completion.`);
};

// Create the assistant and thread during application startup
export async function iinitializeAssistant(): Promise<any> {
  assistantInstance = await openai.beta.assistants.create({
    name: 'Coding Tutor',
    instructions: 'You are a personal software engineer tutor. Write and run code to answer coding questions.',
    tools: [{ type: 'code_interpreter' }],
    model: 'gpt-4-1106-preview'
  });

  threadInstance = await openai.beta.threads.create(params);
  return true;
}

// Add a message to the thread and run the assistant
export async function addMessageToThread(content: string, instructions: string): Promise<MessageContentImageFile | MessageContentText> {
  await openai.beta.threads.messages.create(
    threadInstance.id,
    {
      role: 'user',
      content
    }
  );

  const run = await openai.beta.threads.runs.create(
    threadInstance.id,
    {
      assistant_id: assistantInstance.id,
      instructions: instructions ?? 'Please address the user as Big Pete. The user has a premium account.'
    }
  );

  await waitForThreadRunCompletion(threadInstance.id, run.id);

  const messages = await openai.beta.threads.messages.list(
    threadInstance.id
  );

  return messages?.data[0]?.content[0] ?? NO_RESPONSE;
}
