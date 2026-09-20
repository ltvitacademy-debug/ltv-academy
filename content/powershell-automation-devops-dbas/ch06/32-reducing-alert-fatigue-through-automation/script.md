# Script — Reducing Alert Fatigue Through Automation

## Segment 1 (title)

Everything this chapter has built can make alert fatigue worse if it's not tuned carefully. A script that fires on every blip trains the team to ignore notifications entirely, which defeats the whole point. This closing lesson is about the discipline that keeps automation from becoming noise.

## Segment 2 (code: thresholds from real baselines, not guesses)

Alerting thresholds should come from a specific server's own real historical baseline, not a generic guessed number. A server that normally runs at 85% CPU during its nightly batch window doesn't need an alert at 80% — that's just Tuesday. A threshold set from real baseline data catches genuine anomalies instead of firing constantly on expected behavior.

## Segment 3 (code: suppressing duplicate alerts)

A condition that's still true five minutes after it first fired doesn't need five more separate notifications — it needs the team to already know about the one that fired. Tracking whether an alert for a specific condition already fired recently, before sending another, is simple state-tracking, not a specialized product.

## Segment 4 (outro)

That closes out monitoring and alerting automation. Next up, Chapter Seven: what DevOps actually changes for a DBA, day to day.
