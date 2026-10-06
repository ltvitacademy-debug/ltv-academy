# Lesson 17 — Alerting on AI Failures

**Chapter 3 · Monitoring AI in Production · Lesson 17 of 25**

## What you'll learn

- Why every signal from Lessons 13–16 is useless if nobody sees it in time
- What actually belongs in an alert's definition: metric, threshold, and time window
- How a triggered alert reaches a human — dashboard, email, or chat
- Why "alert on everything" is its own failure mode, and how to avoid it

## A dashboard is not a notification

This chapter has built up a full observability picture: logs (Lesson 13), cost and latency (Lesson 14), drift (Lesson 15), hallucination scores (Lesson 16). Every one of those is pull-based — someone has to open the dashboard and look. Alerting is what makes it push-based: the system notices a threshold was crossed and tells a person, instead of waiting for a person to notice on their own. A cost spike discovered during a weekly check-in has already cost a week's worth of money; the same spike caught by an alert within the hour hasn't.

## What an alert definition actually needs

An alert isn't just "tell me if something's wrong" — it needs to be specific enough to fire correctly and rarely enough to still get attention when it does:

![Creating an alert — name, metric (cost, error rate, token count...), a numeric threshold, and a time window the threshold applies over.](/courses/ai-security-eval-monitoring/ch03/17-alerting-on-ai-failures/1AL-simple.webp)

The same shape applies regardless of what's being monitored: pick the metric (from Lesson 14's cost and latency, or an error rate), set the threshold that actually means "something's wrong" rather than normal variance, and set the window that threshold is measured over — a cost spike in one minute means something different than the same spike sustained over an hour.

## Where a triggered alert actually goes

A rule that fires into a void is no better than no rule. A real system routes a triggered alert somewhere a human will actually see it, and gives enough detail to act without having to dig first:

![A triggered alert as a Slack message — the exact metric, threshold, and which model violated it, with a direct link back to the dashboard. The information a person needs to decide "do I act on this right now" without leaving chat.](/courses/ai-security-eval-monitoring/ch03/17-alerting-on-ai-failures/AL-slack.webp)

## Watching the alerts themselves

Once several alerts exist, the alerts list becomes its own thing worth monitoring — which ones are currently triggered, which are healthy, and what each one is actually configured to watch:

![An alerts dashboard listing every configured alert — status (Triggered or Healthy), the metric and threshold each one watches, and how it's grouped — the operational view of the whole alerting setup, not just one notification.](/courses/ai-security-eval-monitoring/ch03/17-alerting-on-ai-failures/AL-alerts-view.webp)

## The failure mode on the other side: alert fatigue

It's tempting to alert on everything once the capability exists. The result is the opposite of the goal: when every minor fluctuation triggers a notification, the team stops reading them, and the one alert that actually matters gets lost in the noise along with the rest. The fix isn't fewer signals — it's thresholds calibrated to normal variance, and alerting on the handful of conditions that genuinely require a person to act right now.

## Key terms

| Term | Meaning |
|---|---|
| Threshold | The value a metric has to cross before an alert fires |
| Time window | The period a threshold is measured over (1 hour, 24 hours, etc.) |
| Alert fatigue | So many low-value alerts fire that the team stops responding to any of them |

## Lab

Using the cost and latency metrics from Lesson 14, design one alert: name it, pick its metric, set a threshold and time window, and write one sentence on why that specific threshold (not a round number picked at random) is the right line between "normal variance" and "something's actually wrong."

## Check yourself

Can you explain, without looking, why a system with perfect logging, drift detection, and hallucination scoring could still fail its users badly if it had no alerting at all?
