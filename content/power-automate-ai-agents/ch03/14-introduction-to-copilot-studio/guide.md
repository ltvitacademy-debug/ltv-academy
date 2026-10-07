# Introduction to Copilot Studio

So far in this course, every AI call you've made — AI Builder prompts, Azure AI Vision, Azure OpenAI — has lived inside a Power Automate flow that you designed, step by step, from start to finish. That works well when you already know the exact sequence of steps a task requires. But a lot of real work doesn't arrive in a fixed sequence. A customer support ticket might need one lookup, or five, depending on what it says. This lesson introduces Microsoft Copilot Studio, the tool Microsoft built for exactly that kind of task: conversational, reasoning AI agents that decide what to do next, and that can call your Power Automate flows to actually do it.

## What you'll learn

- What Microsoft Copilot Studio is and how it's licensed and accessed separately from Power Automate
- The three building blocks it offers — agents, workflows, and agent flows — and how they differ
- The three "harnesses" an agent can run on, and which one this chapter focuses on
- Why Power Automate and Copilot Studio are two halves of the same picture, not competing tools

## What Microsoft Copilot Studio is

Microsoft Copilot Studio is a graphical, low-code studio for building AI-powered **agents** — conversational assistants that understand a request in natural language, reason about what's being asked, and decide what to do about it. You access it separately from Power Automate, at copilotstudio.microsoft.com, and it's licensed on its own (either through a standalone Copilot Studio subscription or Microsoft 365 Copilot entitlements), so expect a different sign-in experience the first time you open it.

Where Power Automate flows are **deterministic** — you draw the exact path from trigger to outcome, and the flow always takes that path — a Copilot Studio agent is **reasoning-driven**. You give it instructions, knowledge, and a set of tools, and at runtime it decides which tools to use and in what order, based on what the user actually asked for. That's a meaningfully different design job: instead of drawing a flowchart, you're writing a job description.

## Agents, workflows, and agent flows — the building blocks

Copilot Studio gives you three things you can build, and this chapter is entirely about the first one and how it connects to the third:

- **Agents** — the conversational AI assistant itself. It holds instructions, connects to knowledge sources (documents, websites, Dataverse tables), and calls tools to take action. This is the new concept this chapter introduces.
- **Workflows** — a drag-and-drop automation builder native to Copilot Studio, similar in spirit to Power Automate but built to pair tightly with agents and generative AI steps.
- **Agent flows** — Copilot Studio's own flow format, with an authoring experience a lot like the Power Automate designer you already know. An agent flow can run standalone, or it can be attached to an agent as a **tool** the agent calls when it needs to. This is the bridge you'll use in Lesson 16 to connect an agent to real Power Automate-style automation.

A useful way to hold this in your head: the agent is the brain that decides *what* needs to happen; a flow — whether it's an agent flow or a Power Automate cloud flow exposed the right way — is the hands that actually *do* it.

## Choosing a harness

Whatever you build in Copilot Studio runs on a **harness** — the underlying engine that governs how it reasons, how complex a task it can take on, and how it's billed. There are three:

- The **GitHub Copilot harness**, built for reasoning-heavy, multi-step work and complex business processes.
- The **standard harness**, built for rule-based agents and structured, repeatable conversations — this is the one this chapter uses, because it's the most widely available and the one agent flows and "When an agent calls the flow" integrate with most directly.
- The **Copilot chat harness**, which extends Microsoft Copilot Chat with your organization's own knowledge.

You don't need to memorize every difference between them right now — just know the term "harness" will come up again, and that everything you build in this chapter assumes the standard harness unless stated otherwise.

![Screenshot of the Copilot Studio Home page, showing the "what do you want to build?" prompt with Agent and Workflow options.](/courses/power-automate-ai-agents/ch03/14-introduction-to-copilot-studio/home-page.png)
*The Copilot Studio Home page — this is where you choose to start building an agent or a workflow.*

## How this connects to everything you already know

Here's the reassuring part: nothing you learned about flows, triggers, actions, conditions, or JSON in Chapters 1 and 2 goes to waste. An agent flow in Copilot Studio uses the same trigger-and-action mental model as a Power Automate cloud flow. And by the end of this chapter, you'll connect a Copilot Studio agent directly to the kind of AI-powered flow you built in Chapter 2 — Castlebridge Logistics' agent will be the conversational front door, and your flow-building skills will be the engine room behind it.

## Key terms

- **Copilot Studio** — Microsoft's low-code studio for building AI agents, workflows, and agent flows, accessed separately from Power Automate
- **Agent** — a conversational AI assistant that reasons about a request and decides which tools, topics, or knowledge sources to use
- **Agent flow** — Copilot Studio's native flow format; can run standalone or be attached to an agent as a tool
- **Harness** — the underlying engine an agent or workflow runs on, determining how it reasons and how it's billed (GitHub Copilot, standard, or Copilot chat)
- **Deterministic vs. reasoning-driven** — a flow always takes the exact path you designed; an agent decides its own path based on the request
