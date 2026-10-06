# Lesson 19 — Common Security Mistakes

**Chapter 3 · Applying Security · Lesson 19 of 24**

## What you'll learn

- Five security mistakes that show up repeatedly in real Salesforce
  orgs
- Why each one feels like the easy choice in the moment
- What to do instead, using tools already covered in this course
- How to recognize the symptoms of each one during an access review

This lesson doesn't introduce anything new — it's a deliberate look
back at Chapters 1-3 through the lens of what goes wrong when the
tools already covered get used carelessly under deadline pressure.

## Mistake 1 — Public Read/Write as the default OWD

**The shortcut:** setting OWD to Public Read/Write on Account,
Contact, or Opportunity "to avoid dealing with sharing rules later."

**Why it's tempting:** it genuinely does avoid work — no sharing rules
to design, no role hierarchy to get right, nothing breaks during a
demo.

**What it actually costs:** nothing is private by default, which means
every piece of future access control has to be bolted on with
restriction rules instead of designed in from OWD and hierarchy — more
total work, done in the wrong order. Lesson 14 showed this exact
tradeoff.

**Instead:** choose OWD from the actual business shape (territories?
shared queues?) as the first design step, not the last.

## Mistake 2 — View All / Modify All as a troubleshooting shortcut

**The shortcut:** a user can't see something they need, so an admin
grants View All (or worse, Modify All) on the object "just to unblock
them," meaning to narrow it later.

**Why it's tempting:** it's a single checkbox that reliably makes the
symptom disappear immediately.

**What it actually costs:** View All and Modify All bypass restriction
rules and sharing entirely (Lessons 16 and 18) — and "narrow it later"
very often doesn't happen, because the user stops complaining and the
ticket closes.

**Instead:** diagnose which layer is actually missing access (Lesson
18's checklist) and grant that specifically — a permission set scoped
to the real gap, not a blanket override.

## Mistake 3 — Profiles doing permission sets' job

**The shortcut:** cloning a profile for every job variation —
"Sales Rep — East," "Sales Rep — West," "Sales Rep — National
Accounts" — instead of one base profile plus permission sets for the
differences.

**Why it's tempting:** profiles are familiar, and cloning one that
already "basically works" feels faster than designing permission sets
from scratch.

**What it actually costs:** a profile explosion — dozens of
near-identical profiles that all need updating independently when a
single company-wide setting changes, because there's no shared piece
holding the common behavior.

**Instead:** one profile per genuinely different access level (as
covered in Lesson 6), permission sets and permission set groups for
every variation on top of it.

## Mistake 4 — Sharing rules used to patch a wrong OWD

**The shortcut:** OWD is too restrictive for one group's workflow, so
instead of reconsidering whether that OWD is actually right, more and
more sharing rules get added until nearly everyone can see nearly
everything through rule stacking.

**Why it's tempting:** each individual sharing rule is a small,
locally reasonable fix to a locally reported problem.

**What it actually costs:** a sharing model nobody can reason about
holistically — by the time there are a dozen overlapping sharing
rules, predicting who can see what requires reading all of them
together, and new admins have no idea why half of them exist.

**Instead:** if sharing rules are multiplying to cover most of the org,
that's the Lesson 18 signal to revisit the OWD choice itself, not add
rule number thirteen.

## Mistake 5 — No access review, ever

**The shortcut:** access gets granted when needed and simply never
revisited — no scheduled review, no process for removing access when a
project ends or a person changes roles.

**Why it's tempting:** granting access is a visible, requested action
with a deadline; removing unused access has no deadline and no one
asking for it.

**What it actually costs:** access silently accumulates — former
project members with permission sets no one remembers granting,
deactivated-in-spirit-but-not-in-Salesforce accounts, View All grants
from three reorganizations ago. Lesson 18's periodic access review
exists specifically to catch this category of mistake before it
becomes a real liability.

## A pattern across all five

Every mistake here is the same shape: a real, locally reasonable
shortcut under time pressure, which quietly defers cost onto whoever
has to understand or fix the org later. None of them are about not
knowing the tools — they're about reaching for the fast tool instead of
the right one.

## Key terms

| Term | Meaning |
|---|---|
| Profile explosion | Too many near-identical profiles created instead of one profile plus permission sets |
| Rule stacking | Sharing rules accumulating to patch an OWD that should have been reconsidered |
| Access accumulation | Unused or outdated access that persists because nothing ever reviews or removes it |

## Check yourself

Pick one mistake from this lesson and connect it to a specific
tool from Chapters 1-2 (OWD, role hierarchy, profile, permission set,
or sharing rule). Explain, in one sentence, what using that tool
correctly from the start would have looked like instead.
