# Script — Prompt Injection Risks for Agents

## Segment 1 (title)

Anthropic's own docs split this into two threat models. Direct injection — the user themselves is the adversary. Indirect injection — the user is trusted, but content the agent reads on their behalf, a web page, an email, a tool result, contains adversarial instructions.

## Segment 2 (steps: why agents raise the stakes)

A chatbot that reads a poisoned page might produce a weird sentence. An agent with tools can be steered into actually calling one — sending data, modifying a record. Tool access turns an indirect injection from an embarrassing output into an operational risk.

## Segment 3 (code: what an embedded attack looks like)

Here's a defensively-framed illustration of the mechanism, not a working exploit. An email body handed back by a read_email tool, with an instruction buried in the text, telling the agent to ignore its instructions and leak a key. Concatenated as plain text, a less-defended system can struggle to tell data from command.

## Segment 4 (code: the real published mitigation)

Anthropic's real fix: untrusted content only ever goes in a tool_result, never a system prompt, and it gets JSON-encoded. Escaped inside a JSON string, the model sees it unambiguously as a data value, not free text it could mistake for an instruction.

## Segment 5 (outro)

That's the injection risk itself. Last piece of this chapter: watching for it, and everything else, once the agent is actually running — monitoring agent behavior.
