# Script — Postmortems

## Segment 1 (title)

The incident is resolved, checkout is fast again — the work isn't actually done. A postmortem is what turns a resolved incident into something the whole organization learns from, so the next flash sale doesn't hit the same wall.

## Segment 2 (steps)

A postmortem's entire value depends on people telling the truth, including about their own mistakes. Blameless doesn't mean consequence-free for systemic issues — it means the document assumes everyone acted reasonably given what they knew at the time, and focuses on fixing the system instead of the person. Punish the person, and the next postmortem gets written defensively, with the important details left out.

## Segment 3 (code)

Every solid postmortem has five sections, in order. A timeline built from logs and alert history, not memory. Impact, quantified — sessions affected, carts abandoned, not just 'it was slow.' Root causes, plural, because there's often more than one and it's worth resisting the first plausible explanation. Contributing factors that made it worse without directly causing it. And action items with a real owner and a real due date — without both, it's a wish, not an action item.

## Segment 4 (steps)

For Northbridge's checkout incident, the root cause is the inventory database pool never being load-tested against flash-sale volume. Two contributing factors made it worse: no alert existed on saturation specifically, only on full exhaustion, which fired too late — and the runbook didn't yet point at that pool, costing the on-call engineer about twelve minutes reading traces live to find the connection. Both factors became their own action items with named owners.

## Segment 5 (outro)

A postmortem with great action items and zero owners is one nobody will remember was written. Next up, lesson twenty-eight: reducing alert fatigue, and why on-call engineers start ignoring pages in the first place.
