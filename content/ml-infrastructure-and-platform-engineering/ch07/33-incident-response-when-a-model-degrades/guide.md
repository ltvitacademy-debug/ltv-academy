# Incident Response When a Model Degrades

The hardest incidents on an ML platform aren't the ones where a service crashes — those are loud, they page immediately, and the fix is usually obvious. The hardest incidents are the ones where everything looks healthy and the model is quietly making worse decisions anyway. This lesson walks through exactly that scenario end to end: detection, triage, mitigation, and the postmortem that follows, using the on-call structure from Lesson 32 and the SLOs from Lesson 31.

## What you'll learn

- The four stages every incident moves through: detect, triage, mitigate, postmortem
- A worked scenario — silent model-quality degradation caused by upstream feature drift
- How to use a population stability index (PSI) check to confirm drift instead of guessing
- Real mitigation options when the model itself, not the infrastructure, is the problem
- Why the postmortem matters as much as the fix, and what a blameless one actually contains

## The four stages of an incident

Every incident, no matter the cause, moves through the same four stages:

1. **Detect** — something crosses a threshold and an alert fires, or a human notices something looks wrong before any alert does.
2. **Triage** — figure out what's actually happening, how bad it is, and whether it's getting worse, before touching anything.
3. **Mitigate** — stop the damage, even if the mitigation isn't the permanent fix. Rolling back is a mitigation; retraining a model from scratch is not something you do mid-incident.
4. **Postmortem** — once things are stable, write down what happened, why, and what changes so it's less likely to happen again — blamelessly.

The scenario below walks through all four for a specific, realistic failure mode.

## The scenario: a conversion metric drops, with no errors and no latency spike

A platform team gets a Slack message from the fraud team, not a page: "Our approval rate for a specific customer segment has dropped about 8% over the last four days, and we don't know why." The platform's own dashboards show nothing unusual — the fraud-scoring endpoint's availability SLO and latency SLOs from Lesson 31 are both green. No errors, no timeouts, no retrain pipeline failures. This is the signature of a **silent model-quality degradation**: the service is healthy, the model is not.

### Triage

The on-call engineer works outward from the model, following the lineage trail from Chapter 3:

1. **Confirm the model version hasn't changed.** The model registry shows the same version has been serving for three weeks — this isn't a bad deploy.
2. **Check feature freshness.** Lesson 31's freshness SLO is green — features are arriving on time.
3. **Check feature *distribution*, not just freshness.** This is the step most teams skip, and it's the one that matters here. A feature can be perfectly fresh and still be wrong, if whatever produces it upstream has changed. In this case, an upstream service that computes a "customer account age" feature shipped a change that altered how it buckets accounts under 30 days old — the feature is arriving on time, but its values no longer mean what the model was trained on.

This is **upstream feature drift**: the input distribution the model sees in production has shifted away from the distribution it was trained on, without any pipeline breaking and without any error being thrown anywhere. It's exactly the training/serving skew risk Chapter 2 warned about, except arriving weeks after launch instead of on day one.

### Confirming drift with a real check

Rather than guessing from a dashboard, the on-call engineer runs a population stability index (PSI) check comparing the feature's training-time distribution against the last 48 hours of production traffic. PSI is a standard, simple way to quantify how much a distribution has shifted:

```python
import numpy as np

def psi(expected: np.ndarray, actual: np.ndarray, bins: int = 10) -> float:
    """Population Stability Index between a training-time (expected)
    and current production (actual) distribution of one feature."""
    breakpoints = np.quantile(expected, np.linspace(0, 1, bins + 1))
    breakpoints[0], breakpoints[-1] = -np.inf, np.inf

    exp_pct = np.histogram(expected, bins=breakpoints)[0] / len(expected)
    act_pct = np.histogram(actual, bins=breakpoints)[0] / len(actual)

    # avoid divide-by-zero / log(0) on empty bins
    exp_pct = np.clip(exp_pct, 1e-6, None)
    act_pct = np.clip(act_pct, 1e-6, None)

    return float(np.sum((act_pct - exp_pct) * np.log(act_pct / exp_pct)))

score = psi(training_account_age_feature, last_48h_account_age_feature)
# score < 0.1  -> no meaningful shift
# score < 0.2  -> moderate shift, watch closely
# score >= 0.2 -> significant shift, likely cause of degradation
```

A PSI score above 0.2 on the `account_age` feature confirms the hypothesis: this feature's distribution has shifted enough to plausibly explain the drop in approval rate. Triage is done — the cause is identified, not just suspected.

### Mitigation — stop the damage now, fix it properly later

With upstream feature drift confirmed, the platform team has several real mitigation options, roughly fastest-to-slowest:

- **Feature killswitch** — fall back to a safe default or a previous, known-good version of the `account_age` feature while the upstream team fixes their bucketing change. Fastest option; doesn't touch the model itself.
- **Roll back to a previous model version** — if the current model was more sensitive to this feature than an older version, the model registry (Chapter 3) and the rollback strategies from Chapter 5 make this a known, rehearsed action rather than a scramble.
- **Fail over to a simpler fallback rule** — for a short window, route this customer segment through a conservative heuristic instead of the model entirely, accepting lower precision in exchange for safety.

None of these are "retrain the model" — that's correct. Retraining takes time, needs clean data, and isn't an incident-mitigation action; it belongs in the retraining pipeline from Chapter 4, run deliberately after the incident, not during it.

## The postmortem — blameless, and specific

Once the feature killswitch is in place and the approval rate recovers, the incident moves to its last stage. The Google SRE book's chapter on postmortem culture is explicit about the goal: identify contributing causes without indicting a person or team, because nearly everyone involved made a reasonable decision given what they could see at the time. The upstream team didn't know their bucketing change would affect a downstream model; the platform team didn't have a drift-detection alert in place because nobody had needed one yet.

A real postmortem for this incident includes:

- **Timeline** — when the upstream change shipped, when approval rate started dropping, when the fraud team noticed, when it was confirmed and mitigated.
- **Root cause** — the upstream bucketing change altering the `account_age` feature's distribution, not caught until a manual PSI check.
- **What went right** — the model registry made version-confirmation instant; the rollback path existed and worked.
- **What went wrong** — no automated drift detection existed on this feature; the first signal came from a human business team, not a platform alert.
- **Action items, each with an owner** — add an automated PSI check on key features, feeding a new freshness-and-drift SLO alongside Lesson 31's existing ones; require upstream feature-producing teams to notify the platform team of distribution-affecting changes.

The action items are what connect this single incident back to the whole platform: a drift check that used to be a manual, one-off Python script becomes a standing, automated SLO the next time Lesson 31's config file gets updated.

## Key terms

| Term | Meaning |
|---|---|
| Silent degradation | A model making worse decisions while every infrastructure metric stays healthy |
| Upstream feature drift | A feature's production distribution shifting away from its training-time distribution |
| Population Stability Index (PSI) | A statistic quantifying how much a distribution has shifted between two periods |
| Feature killswitch | A fallback to a safe default or prior feature version, used as a fast mitigation |
| Blameless postmortem | An incident review that identifies contributing causes without assigning individual fault |

## Recap

The hardest ML incidents are silent: no errors, no latency spike, just a model quietly making worse decisions because an upstream feature's distribution shifted under it. Triage means checking feature distribution, not just freshness, and a PSI check turns a hunch into a confirmed cause. Mitigation options — a feature killswitch, a model rollback, a fallback rule — stop the damage immediately, while a blameless postmortem turns the incident into a standing SLO or alert so the next one gets caught automatically. Next up, the course's capstone: Lesson 34 asks you to design a platform that addresses all of this, from scratch, for a team scaling past fifteen models.
