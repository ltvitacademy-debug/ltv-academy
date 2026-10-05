# Lesson 29 — Stakeholder Presentations and Communication

**Chapter 2 · Career Preparation · Lesson 29 of 35**

## What you'll learn

- Why the same piece of governance work needs two or three different
  explanations depending on who's in the room
- A simple way to adjust a message for executives, business
  stakeholders, and technical teams without changing the underlying
  facts
- How to structure a short governance update so a busy audience can
  follow it without a script
- A few habits that make written governance communication (status
  updates, policy explanations) easier to act on

## One fact, several audiences

A governance analyst routinely explains the same underlying fact to
very different audiences in the same week: to an executive sponsor, to
a business stakeholder whose team owns a dataset, and to a data
engineer who implements a control. The fact doesn't change. What
changes is which part of it matters to that listener, and how much
detail they need before they can act. Getting this wrong — giving an
executive a technical deep-dive, or giving an engineer only a vague
summary — is one of the most common reasons governance work stalls
even when the underlying analysis was correct.

## Adjusting for the audience

| Audience | What they need first | What to leave out (not hide — just not lead with) |
|---|---|---|
| **Executive sponsor** | The business impact and the decision you need from them, in one or two sentences | Implementation detail, tool names, step-by-step process |
| **Business stakeholder (data owner)** | What this means for their team's data and their responsibilities, in concrete terms | Governance jargon and framework references they haven't studied |
| **Technical team (engineers, analysts)** | The specific rule, field, or system involved, precisely | High-level business framing they already understand better than you do |

Leading with the right layer doesn't mean withholding the rest — an
executive can still ask for detail, and a good presenter has it ready.
It means not making every audience sit through the layer meant for
someone else before they get to the part that's actually theirs.

## Structuring a short governance update

Most governance updates — a steering committee check-in, a status
email, a five-minute standup slot — follow the same simple shape,
whether the news is good or bad:

1. **The headline.** One sentence stating the current state — on
   track, blocked, or newly completed.
2. **The "so what."** Why this matters to the person you're telling,
   specifically — not governance in the abstract.
3. **The ask, if there is one.** A decision, an approval, or a
   resource — stated plainly, not buried in the middle of a paragraph.
4. **The next checkpoint.** When they'll hear from you again, so
   silence afterward doesn't read as a problem.

A status update that skips the headline and starts with background
forces the listener to do the work of figuring out what you actually
need from them — and in a short meeting slot, that's often the
difference between getting a decision and getting pushed to next
week.

## A sample executive update

```
HEADLINE: The customer PII classification project is on track.

SO WHAT: Three of four source systems are now classified and
tagged. This unblocks the access-review work Compliance has
been waiting on.

ASK: None this week — flagging for visibility only.

NEXT CHECKPOINT: Final system complete by [date]; I'll confirm
once the access review can start.
```

Notice what this sample does *not* do: it doesn't open with how the
classification scheme was built, doesn't name the tool used to tag the
columns, and doesn't apologize for the parts that aren't done yet. It
states the current state, the business consequence, and what happens
next — the layer an executive sponsor actually needs.

## Habits for written communication

- **Lead with the conclusion, not the journey.** Put the headline
  first; let the detail support it rather than delay it.
- **Name the specific system, field, or policy**, not just "the data"
  — vague written updates generate more clarifying questions than they
  save.
- **State the ask explicitly** if there is one. "Thoughts welcome" is
  not the same as "I need your approval by Friday."
- **Keep a written record of decisions**, not just discussions —
  governance work often needs to point back to who approved what, and
  when.

## Key terms

| Term | Meaning |
|---|---|
| Audience layering | Adjusting which part of a message leads, based on who's receiving it, without changing the underlying facts |
| The "so what" | The specific consequence a piece of information has for the listener — the part that makes an update worth their attention |
| Steering committee | A recurring governance body of stakeholders and sponsors who review status and make cross-team decisions |

## Lab

Take one real or hypothetical piece of governance work you understand
well (a classification project, a glossary rollout, a data quality
fix). Write three one-paragraph versions of a status update on it: one
for an executive sponsor, one for the business stakeholder who owns
the affected data, and one for the engineer who'd implement a related
technical change. Compare what you led with in each.

## Check yourself

You're ready for Lesson 30 when you can explain, in your own words,
why the same governance fact needs different leading information for
an executive, a business stakeholder, and an engineer, and you have
three written update drafts of your own showing that adjustment.
