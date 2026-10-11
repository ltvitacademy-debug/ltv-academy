# Script — The ReAct Pattern

## Segment 1 (title)

ReAct — reason plus act — comes from a 2022 research paper proposing a simple idea: an explicit Thought before every Action, with the resulting Observation fed back in before the next Thought. It's a pattern, not a separate framework.

## Segment 2 (code: why interleaving beats the alternatives)

Reasoning without acting lets a model talk itself into a confident, wrong answer with no way to check against reality. Acting without visible reasoning leaves no record of why a choice was made, which makes a wrong one much harder to debug. Interleaving both grounds each thought in the latest real observation.

## Segment 3 (code: a real trace)

A question needing two lookups in sequence shows the pattern clearly. Thought: I need the company name first. Action and observation give it. Thought: now I need the IPO date. Action and observation give that. Final thought computes the gap and answers — each thought depending directly on the observation before it.

## Segment 4 (code: ReAct is a style, not a new mechanism)

Nothing about ReAct requires new API fields. In the Claude API, the thought often shows up as narration text alongside a tool_use block, or as an explicit extended-thinking block. It's about how you prompt and structure the loop, not a different request shape underneath.

## Segment 5 (outro)

Reasoning before every action, grounded in the last real result — that's the whole pattern. Next up: what changes when an agent has to plan several steps ahead instead of deciding just one action at a time.
