# Lesson 61 — The Limits of AI in Data Engineering, Honestly

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 61 of 81**

## What you'll learn

- What AI still can't reliably do in data engineering, without the hype
- Why deep system context is the biggest gap, and why that gap doesn't close with a bigger model
- Business-logic judgment calls an LLM cannot make on its own
- Genuinely novel debugging, and why this chapter's techniques don't cover it

## This lesson, plainly

This site's policy has been the same since the first course in this
catalog: don't invent content to fill a gap, and don't oversell what
a tool can do. This chapter has shown real, concrete places AI
assistance helps — drafting tests, RCAs, mappings, documentation. It
would be dishonest to end the chapter there without saying, just as
plainly, where it doesn't.

## Deep system context

Every AI technique in this chapter worked from what you fed it: a
spec, a log, a schema. It has no access to the tribal knowledge that
actually runs most real systems — that the nightly job silently
retries three times before it alerts anyone, that a particular
upstream team's "fixed" deploys have broken this pipeline twice
before, that the on-call rotation means Thursday failures get
slower triage. That context lives in people and in systems an LLM
was never connected to, and no amount of prompting recovers it if it
was never given in the first place.

```
What the AI chapter's tools worked from:  a spec, a log, a schema
What they never had access to:            the tribal knowledge that
                                           actually explains most
                                           real production behavior
```

## Business-logic judgment calls

Lesson 55's schema mapping and Lesson 53's test generation both
depend on a spec someone wrote down. The harder calls — should a
returned order still count toward this quarter's revenue, does a
customer who cancelled and re-subscribed count as "new" or
"returning," what's the actual business reason a legacy column
exists at all — are judgment calls that come from understanding the
business, not from pattern-matching text. An LLM can draft a
plausible-sounding answer to any of those questions. It cannot know
which answer is actually right for this business, because that isn't
a fact anywhere in its training data or your prompt — it's a
decision only the people who own the business logic can make.

## Genuinely novel debugging

Lesson 54 and Lesson 59 both leaned on a real strength: an LLM
pattern-matches an error against similar failures it's seen before.
That strength has a hard edge. A genuinely novel failure — a race
condition that only shows up under a load pattern nobody has hit
before, an interaction between two systems that has never been
described anywhere an LLM could have trained on — has no pattern to
match. The draft in that case isn't a weak hypothesis; it's often
just confidently wrong, because the model still generates a
plausible-sounding answer even when it has nothing real to base it
on.

```
Pattern exists (LLM helps):        No pattern exists (LLM doesn't):
- "connection timeout," 3rd time   - a novel race condition under
  this week, same as before          a load pattern never seen
- a documented error signature      - two systems interacting in
  matching training data             a way nobody has described
```

## Key terms

| Term | Meaning |
|---|---|
| Tribal knowledge | System context that lives in people and undocumented history, never in a prompt |
| Business-logic judgment | A decision that depends on understanding the business, not pattern-matching text |
| No-pattern failure | A genuinely novel bug with nothing in training data to match against — the AI's weakest case |

## Check yourself

You're ready for Lesson 62 when you can explain, without looking:
why does a genuinely novel bug produce a confidently wrong AI answer
rather than an honestly uncertain one?
