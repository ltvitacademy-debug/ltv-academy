# Calling Azure OpenAI and Azure AI Services from a Flow

Everything in Lessons 10 and 11 ran through AI Builder's prompt builder — Microsoft's wrapper around a generative model, with its own interface for writing instructions and defining output shape. That wrapper is convenient, but it isn't the only path. Because AI Builder prompts are powered by Azure OpenAI Service underneath, you can also reach the same kind of model more directly: either through the **Run a prompt** action pointed at an organization-managed Azure OpenAI resource, or through a plain **HTTP action**, the one you built in Chapter 1, calling an Azure AI service's REST API yourself.

## What you'll learn

- How AI Builder prompts, Azure OpenAI, and Azure AI services relate to each other
- When to stay inside the prompt builder versus calling Azure OpenAI more directly
- What an HTTP call to an Azure OpenAI chat completions endpoint looks like from a flow
- How to review and approve AI-generated output before it acts, using human review

## Three layers, one underlying model family

It helps to see the whole stack at once:

- **AI Builder prompts** (Lessons 10-11) — the simplest layer. You write instructions in prompt builder's interface, AI Builder handles the connection to the model for you.
- **Azure OpenAI Service** — the Azure resource that actually hosts the GPT-family model AI Builder prompts call under the hood. Organizations that need their own dedicated Azure OpenAI resource (for data residency, specific model versions, or cost tracking) can point AI Builder at it, or call it directly.
- **Azure AI Services** more broadly — the wider family that Azure OpenAI belongs to, alongside services like Azure AI Language (translation, sentiment, summarization) and Azure AI Document Intelligence (which powers AI Builder's document processing from Lesson 8). Each exposes its own REST API that any HTTP action can call.

For most flows, staying inside the prompt builder layer is the right call — it's less to maintain, and Lesson 11 already showed it can return structured JSON. You reach for a direct Azure OpenAI or Azure AI Services call when you need a capability, model version, or resource configuration the prompt builder's interface doesn't expose.

## Calling Azure OpenAI directly with HTTP

A direct call is a single HTTP action — the same action from Chapter 1, Lesson 4 — making a POST request to your Azure OpenAI resource's chat completions endpoint. The body is JSON: a list of messages (a system instruction, a user message built from dynamic content), and the response comes back as JSON you'd run through **Parse JSON**, exactly like any other API in Chapter 1, with the generated reply nested inside `choices[0].message.content`.

This is the same muscle memory as Lesson 5's Parse JSON lesson — nothing about calling Azure OpenAI is structurally different from calling any other REST API, because it is one. The only new pieces are the authentication header (an API key specific to your Azure OpenAI resource) and the request body shape the chat completions endpoint expects.

## Creating a new prompt from inside a flow

If you decide the prompt builder layer is still the right fit but you haven't built the prompt yet, you don't have to leave the flow designer to do it. Selecting **Run a prompt** and then **New custom prompt** from the dropdown opens prompt builder inline.

![The 'New custom prompt' option inside the Run a prompt action's dropdown, opened from within a flow.](/courses/power-automate-ai-agents/ch02/12-calling-azure-openai-from-a-flow/new-custom-prompt.png)
*You never have to leave the flow designer to author a brand-new prompt — it opens prompt builder on the spot.*

## Human review before acting on AI output

Whichever layer generates the text, Microsoft's own guidance is consistent: have a person review AI-generated output before it's treated as final, especially for anything customer-facing or financial. In a flow, that typically means a **Start and wait for an approval of text** action placed right after your prompt or HTTP call, with the generated text as the "suggested text" a reviewer can accept or edit.

![A Teams message confirming the outcome after an AI-generated response went through human review.](/courses/power-automate-ai-agents/ch02/12-calling-azure-openai-from-a-flow/teams-message-output.png)
*The reviewer's decision, not the raw model output, is what the rest of the flow actually acts on.*

Chapter 3 goes much further into human-in-the-loop patterns with Copilot Studio agents — this is the Power Automate-only version of the same idea.

## Key terms

- **Azure OpenAI Service** — the Azure resource hosting the GPT-family model AI Builder prompts call underneath
- **Azure AI Services** — the broader family of Azure AI REST APIs, including Azure OpenAI and Azure AI Document Intelligence
- **Chat completions endpoint** — the Azure OpenAI REST API that a direct HTTP action posts messages to
- **Human review** — a reviewer-in-the-loop step, such as Start and wait for an approval of text, placed after AI-generated output and before it's acted on
