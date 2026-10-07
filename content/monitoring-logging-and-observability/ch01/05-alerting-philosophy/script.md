# Script — Alerting Philosophy

## Segment 1 (title)

Collecting metrics, logs, and traces doesn't help anyone at 2 AM unless the right alert fires for the right reason. Bad alerting is one of the most damaging failures in monitoring — and this lesson sets the philosophy you'll use for the rest of the course.

## Segment 2 (steps)

Every alert has to pass one test: if a human is paged, can they actually do something right now? If not, it shouldn't page anyone. And symptom-based alerts — firing on user-visible impact like checkout success rate — are almost always a better default than cause-based alerts like raw CPU, because high CPU that isn't hurting users doesn't need a page, and a problem that doesn't show up as high CPU still gets caught.

## Segment 3 (code)

Set thresholds from the SLO math you already learned, not guesswork. If Northbridge's checkout SLO is 99.9% over 30 days, alert when the error-budget burn rate is fast enough to exhaust the whole month's budget within 2 hours. That's precise and defensible — not an arbitrary round number nobody can explain.

## Segment 4 (steps)

And paging a human should be the last resort. Try auto-remediation first — restarting, scaling, self-healing. Only page when that's exhausted, and when you do, hand over enough context — which service, which signal, how severe, a dashboard link — so the person can start working immediately.

## Segment 5 (outro)

That's the philosophy: actionable, symptom-based, SLO-driven, and human paging as a last resort. Chapter two puts these foundations to work in a real cloud-native tool: Azure Monitor.
