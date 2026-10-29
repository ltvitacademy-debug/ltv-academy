# Lesson 15 — Avoiding Alert Fatigue from Day One

**Chapter 4 · Monitoring the Deployed Environment · Lesson 15 of 32**

## What you'll learn

- What alert fatigue actually is, and why this lesson looks at it from the configuration side instead of the analyst side
- Why setting thresholds too sensitively on day one guarantees a flood of noise, not extra safety
- The real practice of starting with a small, high-confidence alert set and expanding it deliberately
- A concrete example of a threshold that looks "safe" but actually trains a team to ignore alerts

## The same problem, seen from the other side

If this program's SOC course covered alert fatigue, it covered it from the analyst's side: a flood of alerts arrives, and the person on the other end starts tuning it all out. This lesson covers the exact same problem, but from where it actually starts — the configuration side. Alert fatigue isn't something that just happens to a SOC team; it's something a deployment creates for itself, on day one, the moment thresholds get set more sensitively than the environment can support.

## Why over-sensitive thresholds backfire

It feels responsible to set a CPU alert at 70% instead of 85%, on the theory that catching problems earlier is always better. In practice, it backfires. A web server doing completely normal work during business hours might sit at 70-75% CPU for stretches every single day — nothing is wrong, nothing needs attention, but the alert fires anyway, repeatedly. After the third or fourth time someone gets paged for a non-problem, the response stops being "investigate" and starts being "dismiss." That's alert fatigue, and once it sets in, it doesn't stay limited to the noisy alert — people start reflexively dismissing the alerts that matter too, because they've learned alerts in general don't mean much here.

## The real practice: start small, expand deliberately

The fix isn't fewer thresholds in the abstract — it's starting with the small, high-confidence set from Lesson 14 (sustained high CPU, low disk, failed health checks, failed logins) and genuinely watching how it behaves against this specific environment's real traffic for a while before adding anything else. If the 85% CPU threshold never fires during two weeks of normal operation, that's evidence it's tuned correctly — a real signal, not noise. Only then does it make sense to deliberately add a new alert, one at a time, each one earning its place the same way the first four did. Expanding the alert set should be a decision made from observed behavior, not a one-time setup checklist filled out before the environment has even taken real traffic.

## Example: catching the mistake before it ships

Imagine the CPU alert in Lesson 14 had been configured at 70% instead of 85%, without first checking what this web server's normal daytime load actually looks like. Within the first week, it would fire ten or more times for completely unremarkable load — and by week two, the on-call person would already be swiping the notification away without reading it. The fix is not a smarter alert; it's observing the real baseline first and setting the threshold to something that genuinely separates "normal" from "actually wrong," which is exactly what 85% was chosen to do in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Alert fatigue | The point where alerts fire so often for non-problems that people start ignoring alerts generally, including real ones |
| Over-sensitive threshold | An alert set to trigger on normal, expected variation instead of a genuine problem |
| High-confidence alert set | A small starting group of alerts chosen because each one reliably means something worth acting on |
| Deliberate expansion | Adding a new alert only after observing real behavior, one at a time, instead of all at once |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why does setting an alert threshold too sensitively on day one end up making an environment less safe, not more?
