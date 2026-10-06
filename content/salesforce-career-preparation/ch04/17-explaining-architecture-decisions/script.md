# Lesson 17 — Explaining Architecture Decisions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

"Best practice" is a weak answer on its own. This lesson covers a framework for explaining any technical decision, and how to answer "what would you do differently."

## S2 · STEPS — "Best practice" is a conclusion, not a reason

Saying "it's best practice" tells an interviewer you followed a rule, not that you understand why it exists. The stronger version names the actual tradeoff -- for permission sets, that's avoiding profile sprawl while still granting flexible access.

## S3 · STEPS — Option, reason, cost

Name what you chose, plainly. Explain why you chose it over the alternative -- the actual requirement that made it fit, not "it's standard." Then name what it costs. Every real decision trades something away, and naming that cost is what separates an engineer's answer from a sales pitch.

## S4 · STEPS — "What would you do differently?"

This isn't a trap or a request for a confession. It's a question about scale and hindsight -- what the design assumed, and what would strain at ten times the size. Answer it as a continuation of the tradeoff framework: the right call at this scale, reconsidered past a certain point.

## S5 · STEPS — Applying this to your capstone

Before the interview, not during it, write out the three-part answer for real decisions from your capstone: why you set org-wide defaults the way you did, why a validation rule or a Flow won in a specific case, and why a report exists and what question it answers.

## S6 · OUTRO

Next lesson: Your first 90 days in a Salesforce role -- what happens after you get the offer.
