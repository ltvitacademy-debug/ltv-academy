# Script — Behavioral & Incident Interview Questions

## Segment 1 (title)

This is the stage where technical knowledge alone stops being enough. Behavioral interviews test how you actually work under pressure and with other people, and you already lived through the two best stories for this during the capstone itself.

## Segment 2 (steps)

The STAR method keeps an answer tight: Situation in one or two sentences of context, Task defining what you were specifically responsible for, Action describing what you actually did with real technical detail, and Result — the outcome, quantified if possible, plus what changed afterward. Interviewers remember the Action and the Result most, not a long backstory, so don't spend most of your time setting the scene.

## Segment 3 (code)

For "tell me about an incident," use the flash-sale drill point for point. Checkout's p99 latency spiked from a normal four hundred milliseconds to six point two seconds during a simulated flash sale, with no alert pointing at the real cause. Working through golden signals and the USE method traced it to a saturated database connection pool in the upstream inventory service. The result was a blameless postmortem with two concrete action items: a new saturation alert, and a circuit breaker in checkout.

## Segment 4 (code)

For "shift security left," use the near-miss. A teammate was about to commit a real PaymentPro API key inside a Helm values file destined for checkout's configuration. The gitleaks pre-commit hook flagged it before it was ever pushed, so there was no key rotation or git-history cleanup needed afterward — catching it at the source cost almost nothing compared to cleaning it up after the fact would have.

## Segment 5 (outro)

Next up, lesson twenty-five: certifications — AZ-400, AWS DevOps, CKA, and Terraform Associate — the final lesson of this capstone, and of the entire DevOps Engineer path.
