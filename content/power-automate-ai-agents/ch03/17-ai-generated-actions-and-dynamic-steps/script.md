# Script — AI-Generated Actions and Dynamic Flow Steps

## Segment 1 (title)

Last lesson connected one flow to one agent. Real agents usually have several tools, and the agent has to pick the right one, fill in its inputs, and decide when it's done. This lesson is about that decision-making layer: generative orchestration, the mode that lets an agent dynamically choose its own steps instead of following a path you hard-coded.

## Segment 2 (steps)

Agents run in one of two modes. Classic orchestration matches a user's message against trigger phrases you defined, and runs the single best match — close to the fixed-path thinking you already know. Generative orchestration, the default for new agents, reads the descriptions of its tools, topics, and knowledge sources and reasons about which ones actually answer the request. It can chain more than one together, and nothing about the sequence is fixed at design time.

## Segment 3 (steps)

The agent weighs a tool's name, its description, and its input and output parameter names and descriptions. Description carries the most weight, which is why a clear one matters so much. If the agent needs information it doesn't have yet — a ticket ID, a category — it can generate the follow-up question itself, instead of you authoring a question node for every possible missing field.

## Segment 4 (screenshot)

You can watch this reasoning happen in the activity map during testing. In this real example, the user asked about the weather in Seattle. The agent recognized Seattle from the message and auto-filled the tool's location input — no Compose action, no manual mapping. It still needed a units value it didn't have, so it generated a clarifying question asking the user to choose.

## Segment 5 (steps)

Dynamic doesn't mean uncontrollable. Give every tool a specific, jargon-free description so similar tools don't get confused with each other. Use an End all topics node when a conversation needs to stop early. And remember the agent uses recent conversation history to fill inputs, which is powerful, but can also carry stale context forward in a long conversation.

## Segment 6 (outro)

Up next, Lesson 18: not every action an AI agent chooses to take should run unchecked — you'll add a human approval gate before anything irreversible happens.
