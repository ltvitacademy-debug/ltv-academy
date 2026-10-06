# Script — State & Memory in Agents

## Segment 1 (title)

Every loop iteration's tool result goes back into the conversation, so the model technically remembers every prior step for free. That works until a long-running agent accumulates history that costs real tokens on every request and can eventually exceed the context window outright.

## Segment 2 (steps: three real mechanisms)

Conversation history is the default — everything stays in the message list, simple but unbounded. Scratchpads condense what's been learned into something far shorter than raw history. External memory stores state outside the context window entirely, retrieved only when actually relevant.

## Segment 3 (code: a real mechanism, the memory tool)

Anthropic's memory tool is in the same family as bash and the text editor tool. It lets Claude store and retrieve information across conversations in files it controls, rather than relying on everything staying inside one conversation's context window — the same tool_use and tool_result mechanism from Lesson 3, just aimed at persistence.

## Segment 4 (code: closing the loop on chapter 3)

Every pattern this chapter covered produces state that has to go somewhere — ReAct's thought history, a plan and its revisions, an orchestrator's collected results, a reflection loop's draft and feedback. None of those patterns specify where that state lives; conversation history, scratchpad, or external memory are the three real answers.

## Segment 5 (outro)

Choosing between them comes down to how long the state needs to persist and how much needs to stay immediately accessible versus retrieved on demand. That closes out agent architectures — Chapter 4 turns to keeping a human in the loop for the actions these agents actually take.
