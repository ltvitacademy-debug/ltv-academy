# Lesson 2 — Azure AI Foundry, Overview

**Chapter 1 · Azure AI Foundry & Cloud AI Concepts · Lesson 2 of 24**

## What you'll learn

- The four jobs the Azure AI Foundry portal does
- How to find and select a model in the catalog
- What the chat and agents playgrounds are for
- Why you'll see this product called three different names

## One portal, four jobs

Azure AI Foundry (reachable at **ai.azure.com**) is the portal this entire course works through. It does four things:

- **Model catalog** — browse and deploy more than 10,000 models from Azure OpenAI, Meta, Mistral, DeepSeek, and other providers.
- **Playgrounds** — chat, agents, images, and video playgrounds let you test a model interactively before writing any code.
- **Build & customize** — fine-tuning, prompt flow, and agent tools and knowledge sources live here.
- **Assess & improve** — tracing, evaluation, and safety + security tooling, so quality and compliance checks aren't an afterthought.

![The Foundry portal's model catalog, with the search box and a selected gpt-4o model card highlighted.](/courses/azure-ai-cloud/ch01/02-azure-ai-foundry-overview/start-building.png)
*The model catalog landing page — search for a model, select a card, and you're one click from a deployment.*

## The chat playground

Once you've deployed a chat model, you land in the **chat playground**. This is a browser-based way to test prompts before you write SDK code:

![The chat playground, with a deployment dropdown, a system message box, and a test prompt in the input field.](/courses/azure-ai-cloud/ch01/02-azure-ai-foundry-overview/chat-without-data.png)
*Pick a deployed model, set a system message, and test prompts right in the browser — no code required yet.*

You set the deployment, give the model instructions in a system message, and send a question. It's the fastest way to sanity-check a prompt before wiring it into an application.

## The agents playground

Agents get their own playground, with instructions, tools, knowledge sources, and — notably — a **Metrics** menu where you can turn on quick evaluation checks (task adherence, coherence, hate and unfairness, and more) without leaving the page:

![The agents playground with the Metrics menu open, showing a checklist of quick evaluation metrics.](/courses/azure-ai-cloud/ch01/02-azure-ai-foundry-overview/agent-playground-evaluation-metrics.png)
*Build an agent with instructions, tools, and knowledge, then turn on quick evaluation metrics before you ship it.*

## A brand in transition

You'll see this product under three different names, depending on how current the source is:

1. **Azure AI Studio** — the original name, retired.
2. **Azure AI Foundry** — what most documentation, job listings, and this course's lesson titles still call it.
3. **Microsoft Foundry** — the current official name as of 2026. The portal URL (`ai.azure.com`) and the underlying service haven't changed — only the brand has.

Expect to see "Azure AI Foundry" far more often than "Microsoft Foundry" for a while yet, since the rename is recent and much of the ecosystem — tutorials, course catalogs, job postings — hasn't caught up.

## Key terms

| Term | Meaning |
|---|---|
| Foundry portal | The web UI at ai.azure.com for building, testing, and managing AI models and agents |
| Model catalog | The searchable list of deployable models from Azure OpenAI and partner providers |
| Playground | An interactive, no-code way to test a deployed model or agent |
| Microsoft Foundry | The current (2026) brand name for what was Azure AI Foundry / Azure AI Studio |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: what are the four main areas of the Foundry portal, and what's the difference between the chat playground and the agents playground?
