# Script — Reducing Alert Fatigue

## Segment 1 (title)

An on-call engineer who gets paged forty times a week, most of which turn out to be nothing, stops trusting pages — eventually including the one that matters. Alert fatigue is one of the most preventable causes of a slow incident response, and it's a design problem, not a personal one.

## Segment 2 (steps)

It happens for specific, fixable reasons. Alerting on causes instead of symptoms — CPU above 80% fires constantly even when nothing customer-facing is actually broken. Non-actionable alerts that never require a response train people to dismiss alerts on reflex. Paging someone awake for something that could wait miscalibrates what a page means. And no grouping means one root cause triggering twelve alerts across twelve services looks like twelve separate problems instead of one.

## Segment 3 (steps)

The fix isn't fewer alerts for their own sake. Alert on symptoms users actually feel, like checkout latency, not internal causes like CPU. Make every alert actionable — if there's nothing to do right now, it shouldn't page anyone, it should go to a dashboard or a daily digest instead. Match urgency to real impact using consistent severity levels. And group related alerts into one incident instead of one page per affected service.

## Segment 4 (code)

The clearest version of this is SLO-based alerting. A raw threshold like error rate over one percent fires on every short blip that recovers on its own. A burn-rate alert only fires when the error budget is being consumed fast enough to actually threaten the month's SLO — it filters out noise while still catching real, sustained problems quickly.

## Segment 5 (outro)

Get this right, and a page means something again. That closes out the troubleshooting and incident response chapter — next up, the capstone: instrumenting and monitoring a service of your own, lesson twenty-nine.
