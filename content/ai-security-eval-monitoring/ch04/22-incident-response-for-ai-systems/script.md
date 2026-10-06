# Script — Incident Response for AI Systems

## Segment 1 (title)

Every defense this course has built — injection prevention, red-teaming, monitoring, bias testing — reduces the odds and shortens time-to-detection. None of them makes failure impossible. Incident response is the plan for the day one happens anyway.

## Segment 2 (steps: five stages)

Detect — an alert fires, or a user reports it. Triage — how many affected, is it still happening. Contain — roll back a version, tighten a prompt, disable the feature. Communicate — tell affected users honestly. Review — which earlier control should have caught this?

## Segment 3 (code: five stages detail)

The AI-specific wrinkle is mostly in containment. Unlike a traditional bug, there's often no single line of code to revert — it might mean rolling back a model version, tightening a system prompt, or disabling the feature while a real fix is built.

## Segment 4 (steps: three incident types)

A harmful hallucination — add the failure case to the eval dataset immediately, not just fix the one instance. A prompt injection that got through — patch the gap, then re-run red-teaming for siblings of the same attack. A valid bias complaint — treat it as a signal the existing tests missed something.

## Segment 5 (outro)

A postmortem's real job is closing the loop — feeding the incident back into evals, alerts, or documentation so it doesn't recur. An incident that doesn't change any of those was reviewed, not learned from. Chapter 4 is done — next: the capstone, building an eval and monitoring pipeline yourself.
