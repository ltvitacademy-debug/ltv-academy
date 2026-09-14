# Script — Using an LLM to Draft a Root Cause Analysis

## Segment 1 (title)

Root cause analysis still means reproduce, isolate, and confirm — what an LLM adds is speed on the very first step: reading a wall of logs and proposing where to look. That's a draft hypothesis, not a verdict.

## Segment 2 (code: what to paste in)

A useful draft needs the exact error message and stack trace, the log lines right before the failure, which pipeline stage failed, and anything that changed recently. Paste in less than that and the draft is just a guess dressed up as an answer.

## Segment 3 (code: draft vs confirmed)

An LLM's draft reads persuasively and cites specific line numbers — but that confidence isn't evidence. It's pattern-matching your error against similar failures it has seen before. Every claim in the draft still has to be actually checked before it goes in the incident report.

## Segment 4 (code: where it earns its keep)

The draft earns its keep on repetitive failures — the third connection-timeout alert this week — where it confirms a human's instinct in seconds. It's worth far less on a genuinely novel failure with no pattern to match against.

## Segment 5 (outro)

A fast first hypothesis, always confirmed before it's trusted. Next up: using an LLM to propose field mappings between two schemas.
