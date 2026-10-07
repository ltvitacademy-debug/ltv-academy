# AI-Generated Actions and Dynamic Flow Steps

Lesson 16 connected one flow to one agent. Real agents usually have several tools — several topics, several flows, maybe a knowledge source too — and the agent has to pick the right one, fill in its inputs correctly, and decide when it's actually done. This lesson is about that decision-making layer: **generative orchestration**, the mode that lets an agent dynamically choose and sequence its own steps instead of following a path you hard-coded.

## What you'll learn

- The difference between classic orchestration and generative orchestration
- How an agent chooses among multiple tools, topics, and knowledge sources at runtime
- How an agent fills in a tool's inputs from the conversation, without you writing that logic
- How to watch this decision-making happen using the activity map

## Classic vs. generative orchestration

Agents on the standard harness can run in one of two orchestration modes:

- **Classic orchestration** — the agent matches a user's message against trigger phrases you defined for each topic, and runs the single best-matching topic. This is close to the fixed-path thinking you already know from flow design: you're still predicting, in advance, every way a user might phrase a request.
- **Generative orchestration** — the default for new agents — the agent reads the *descriptions* of its available topics, tools, knowledge sources, and connected agents, and reasons about which one (or several) actually answers the user's request. It can chain more than one together in sequence, and it can generate clarifying questions on its own when required information is missing.

That second mode is why this lesson is called "dynamic" steps: nothing about the sequence is fixed at design time. The same agent might call zero tools for one question and three tools, in a particular order, for another — all without you writing a single branch of logic.

## How the agent picks the right tool

When generative orchestration is on, the agent weighs several signals to decide what to call: the name of each topic, tool, or knowledge source; its description; and the names and descriptions of its input and output parameters. Of these, the **description** carries the most weight — which is exactly why Lesson 16 pushed you to write a clear one. A tool named "Get EPS" with the description "Gets EPS for any stock ticker" is a bad example for this reason: it leans on jargon ("EPS") instead of spelling out what it actually does, so the agent has a harder time matching it to a plainly worded user question.

If the agent needs information to call a tool — say, a ticket ID or a category — and that information isn't in the conversation yet, generative orchestration can generate the follow-up question itself, rather than you authoring a **Question** node for every possible missing field. That's a meaningful amount of flow-design work you no longer have to do by hand.

## Watching it happen: the activity map

When you test an agent that uses generative orchestration, Copilot Studio shows you its reasoning in real time through the **activity map** — a panel alongside the test chat that displays which tool, topic, or knowledge source the agent selected, and what inputs it filled in.

![Screenshot of the Copilot Studio activity map during a test conversation, showing a selected "Get forecast for today" connector tool with its Location input automatically filled in as "Seattle" from the user's message, next to a chat panel where the agent asks a clarifying follow-up question.](/courses/power-automate-ai-agents/ch03/17-ai-generated-actions-and-dynamic-steps/example-1.png)
*The activity map during testing: the agent selected a weather tool and auto-filled its Location input from the user's question — then asked a clarifying question for the input it still needed.*

In this example, the user asked "What's the weather like in Seattle?" The agent recognized "Seattle" from the message and pre-filled the tool's Location input automatically — no Compose action, no manual variable mapping, the kind of wiring you'd have had to build by hand in a classic Power Automate flow. It also needed a measurement-units value that wasn't in the question, so it generated a clarifying question asking the user to choose Imperial or Metric. That's generative orchestration doing two things at once: selecting the right tool, and filling what it can while asking for what it can't.

## Keeping it predictable

Dynamic doesn't mean uncontrollable. A few practices keep generative orchestration's choices sane as an agent grows more tools:

- Give every tool and topic a **specific, jargon-free description** that states what it does and, where it matters, what it *doesn't* do — this is how you prevent two similar tools from being ambiguous to the orchestrator.
- Use an **End all topics** node to cancel any remaining planned steps when a conversation needs to stop early.
- Remember that the agent uses **recent conversation history** to fill inputs and make decisions — which is powerful for follow-up questions, but also means a long, messy conversation can carry stale context forward if you don't clear it when appropriate.

## Key terms

- **Generative orchestration** — the default mode where an agent dynamically selects and sequences tools, topics, and knowledge sources based on their descriptions
- **Classic orchestration** — the mode where an agent matches a user's message to pre-authored trigger phrases for a single topic
- **Activity map** — the real-time panel in the test chat showing which tools/topics the agent selected and how it filled their inputs
- **Tool description** — the text the orchestrator reads to decide when a given tool is the right one to call
- **End all topics** — a node used to cancel any remaining planned steps mid-conversation
