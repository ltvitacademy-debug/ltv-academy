# Lesson 20 — Monitoring Models in Production · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

The model shipped, the dashboard is green — done, right? Not quite. This lesson is about what happens after launch.

## S2 · STEPS — Shipping isn't the finish line

A model that passed evaluation on last year's data doesn't stay validated by default. The world it's making decisions about keeps changing, and nothing stops that automatically. Monitoring is what turns "we validated this once" into "we know this is still working," continuously.

## S3 · STEPS — Four things to watch

Four signal categories matter: volume, since a sudden drop can mean an upstream system broke; latency and error rate, standard application monitoring; output distribution, whether predictions are shaped the way they were during validation; and business outcome, whether the decision actually tracked the real-world result. The last two are the ones most teams skip.

## S4 · CODE — An illustrative monitoring config

Here's the shape every monitoring setup needs, whatever the actual tool: a metric, a threshold that defines "something's wrong," and what happens when it's crossed — volume, latency, error rate, and distribution shift, each with its own alert condition.

## S5 · STEPS — Who gets paged

An alert with nobody assigned to receive it isn't monitoring, it's a log entry nobody reads. Who's on call, and what they're authorized to do — roll back, page a reviewer, escalate to the registered owner — has to be decided before the model ships, not improvised the first time something breaks.

## S6 · OUTRO

Next lesson goes deeper on one specific signal from this one: drift. We cover exactly how to detect it, and what to do once you have.
