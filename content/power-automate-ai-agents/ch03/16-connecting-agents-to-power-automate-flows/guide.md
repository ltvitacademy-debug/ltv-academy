# Connecting a Copilot Studio Agent to Power Automate Flows

An agent that can only talk is a chatbot. An agent that can call a flow is automation. This lesson covers the exact mechanism Copilot Studio uses to let an agent trigger real work — the **agent flow**, added to an agent as a **tool** — and the specific requirements a flow must meet before Copilot Studio will even let you attach it.

## What you'll learn

- The two requirements a flow must satisfy before it can become a tool for an agent
- The difference between adding a flow at the agent level versus the topic level
- What the connected flow actually looks like once it's wired up
- Why response time matters more for an agent-connected flow than for a normal cloud flow

## The two things a flow needs

Not every flow can be handed to an agent. To appear as an option when you add a tool, a flow must have:

1. The **When an agent calls the flow** trigger — this is a dedicated trigger type, distinct from the HTTP, scheduled, and connector triggers you used in Chapters 1 and 2.
2. A **Respond to the agent** action — the flow's way of handing its result back to the agent that called it.

On top of that, the flow must be configured to respond **synchronously**: under the **Respond to the agent** action's **Networking** settings, the **Asynchronous response** toggle has to be **Off**. And because the agent is waiting on the other end of the call, the flow needs to finish within a **100-second action limit** — which means this is exactly the moment to apply what you learned about error handling and run-after logic in Lesson 6. A flow that occasionally hangs on a slow API call isn't just annoying here; it will time out the agent conversation.

Finally, the flow has to be **published**. A draft agent flow, like a draft Power Automate flow, isn't available to be called at runtime.

## Agent-level vs. topic-level tools

Once a flow meets those requirements, you can attach it to an agent in one of two places:

- **Agent-level tool** — go to the agent's **Tools** page, select **Add a tool**, choose **Flow**, pick the flow, and select **Add and configure**. Added this way, the agent's orchestrator can call the flow directly at runtime, whenever it decides the flow is the right tool for the user's request — this is the pattern generative orchestration depends on, and the one you'll use for the capstone.
- **Topic-level tool** — inside a specific topic's canvas, select **Add a node**, then **Add a tool**, and choose the flow. Added this way, the flow is only available within that one topic's conversation path — useful when you want tighter control over exactly when a flow can run.

Either way, once it's attached, update the flow's description inside the configuration panel so it clearly explains what the flow does and what inputs it needs — the agent's orchestrator reads that description to decide when to call it, exactly the same way it reads topic and knowledge-source descriptions.

## What a connected flow looks like in the designer

Agent flows are built and edited in the same classic visual designer you'd recognize from Power Automate: a canvas with a trigger card at the top and action cards flowing down from it, branches for conditions, and a toolbar for zoom, search, and the flow checker.

![Screenshot of the Copilot Studio flow designer showing a published "Customer feedback triage" flow: a trigger, a summarize-and-assign step, and a branching sort-by-category step routing to four different teams.](/courses/power-automate-ai-agents/ch03/16-connecting-agents-to-power-automate-flows/flow-example.png)
*A published agent flow in the Copilot Studio designer — notice the branch that routes feedback to different teams based on category. This is the same shape of flow you'll build for Castlebridge Logistics' support triage capstone.*

Look closely at that example: it's a trigger, an AI step that summarizes and assigns a category, and a branch that routes the result to different teams depending on what category came back. That's not a coincidence — it's structurally almost identical to the ticket-triage flow you'll build in Lesson 20. The main difference is where the trigger comes from: here, a new feedback item starts the flow directly; in an agent-connected flow, the trigger fires because the agent decided to call it.

## Testing the connection

Once a flow is attached as a tool, go back to the agent's test panel and ask a question that should trigger it — for example, something that matches the flow's description. If generative orchestration selects the right tool, you'll see the flow run and its result come back into the conversation. If it doesn't fire, the most common cause is a vague or mismatched tool description — the same lesson you'll apply again in Lesson 17, when the agent is choosing between several tools instead of just one.

## Key terms

- **Agent flow** — Copilot Studio's native flow format, built with the same trigger-and-action designer as Power Automate
- **"When an agent calls the flow" trigger** — the required trigger type that makes a flow eligible to become a tool
- **"Respond to the agent" action** — the action that returns a flow's result to the calling agent
- **Tool** — a flow (or other capability) an agent can call at runtime to take action or retrieve information
- **Agent-level vs. topic-level tool** — a tool available to the whole agent's orchestrator, versus one scoped to a single topic
