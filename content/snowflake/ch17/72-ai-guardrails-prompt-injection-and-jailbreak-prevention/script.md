# Script — AI Guardrails: Prompt Injection & Jailbreak Prevention

## Segment 1 (title)

In Chapter 16 you built Cortex Search services that retrieve real documents — PDFs, wiki pages, support tickets — and feed them to an agent as context. That's exactly the attack surface a prompt injection exploits: instructions hidden inside a document, written to look like part of the content but actually aimed at the agent itself. A jailbreak is the related but distinct attack, where the user's own prompt tries to talk the model out of its safety behavior directly, rather than hiding the attack in a document.

## Segment 2 (steps: two attacks)

The agent didn't choose to read that malicious instruction — it arrived disguised as data, inside a tool output it was told to trust. That's the core distinction this lesson draws: prompt injection hides in content the agent reads, while a jailbreak shows up directly in the user's own message to the model.

## Segment 3 (steps: two layers of defense)

Snowflake runs a layered, defense-in-depth model rather than one single filter. An always-on security baseline covers every AI workload on Cortex Code and Snowflake Intelligence automatically, pattern-matching against already-known injection techniques. Cortex AI Guardrails is the opt-in layer on top of that — a specialized LLM post-trained specifically on adversarial prompt-injection attacks, applying contextual reasoning to catch sophisticated, zero-day-style attempts the baseline's pattern-matching wouldn't recognize, running in parallel with the agent loop so it adds no latency to every response.

## Segment 4 (code: turning it on)

Turning it on is one ALTER ACCOUNT statement, enabling advanced prompt injection under AI_SETTINGS. It requires Enterprise Edition and cross-region inference enabled for your account's region, and once it's on, it covers Cortex Code, Snowflake CoWork, and Cortex Agents — the three surfaces most likely to be reading untrusted, externally-sourced content as part of their job.

## Segment 5 (outro)

Next lesson: Agent Identity — how Snowflake tags every action an agent takes so you can tell exactly which agent did what, for audit purposes.
