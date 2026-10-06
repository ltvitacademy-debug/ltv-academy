# Lesson 9 — Role-Based Prompting · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

So far we've worked on how a model reasons. Now let's look at a different
lever entirely: who the model is asked to be when it answers. That's
role-based prompting.

## S2 · CODE CARD (three roles, one question)

Same question — SQL or NoSQL for this project — asked under three roles.
A startup CTO weighs time to market and team size. A database architect
weighs consistency guarantees and schema evolution in real depth. A
cost-conscious freelancer weighs hosting cost above everything else.
Three legitimately different, defensible answers.

## S3 · CODE CARD (security review example)

Here's a sharper example: assign the role of a senior security engineer
reviewing a pull request, and ask it to flag vulnerabilities specifically.
Compare that to no role at all — a generic review tends to comment on
style and readability first, because nothing told the model security is
what matters here.

## S4 · CODE CARD (not a system-prompt duplicate)

This isn't the same as the system prompt's role field from Lesson 3. That
sets a standing identity for the whole application. A per-request role is
layered on for just one task — answer as a tax accountant for this one
question — without changing the assistant's identity for the rest of the
conversation.

## S5 · CODE CARD (vague vs specific role)

And roles can be weak. "Act like a doctor" gives the model a costume, not
expertise — it risks a shallow, stereotyped answer. "You are a
board-certified pediatrician explaining a fever to a worried parent"
specifies who, who for, and how — real expertise, not just a job title.

## S6 · OUTRO CARD

A role changes vocabulary, priorities, and depth — not just tone. Next
lesson, we combine everything so far into getting the model to return
output in an exact, predictable structure.
