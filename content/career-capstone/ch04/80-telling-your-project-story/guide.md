# Lesson 80 — Telling Your Project Story in an Interview

**Chapter 4 · Added Projects — Capstones · Lesson 80 of 81**

## What you'll learn

- A four-part structure for walking through a project out loud
- Why "the why" matters more than "the what" in an interview
- Practicing the trade-off questions an interviewer will actually ask
- Turning Lesson 79's portfolio into a story you can tell without notes

## The four-part structure

Lesson 79 built the README; this lesson builds the spoken version of it,
which needs a different shape because an interviewer is listening, not
reading — they can't scroll back up.

```
1. Situation:   what the system needed to do, and the constraint that
                mattered most (Project 3's 300ms latency budget, say)
2. Design:      the shape you chose, and why it fit that constraint
3. Trade-off:   what you gave up to get that — every real design costs
                something
4. Retrospect:  what you'd do differently now, knowing what you know
```

This is the same shape a good case-study lesson used back in Chapter 1
(Lessons 20–23), just told about your own project instead of a
hypothetical one — and it's not a coincidence that "trade-off" and
"retrospect" map directly onto the retrospective questions from Lessons
74 and 78.

## The why matters more than the what

"I built a fraud detector using Eventstreams and KQL" is the what. It's
true, and it's also nearly interchangeable with any other candidate's
answer. The why is what actually differentiates: "I chose a sliding
window over a tumbling one because a tumbling window would split a fraud
burst across a boundary and undercount it" is a sentence only someone
who actually made that decision can say convincingly. Interviewers ask
follow-up questions specifically to find out whether "the what" has "the
why" behind it — and the honest retrospectives from Lessons 74 and 78 are
where that "why" already lives, written down.

## Practicing the trade-off questions

Every project in this capstone has at least one trade-off worth
rehearsing out loud, not just having an answer ready in your head:

| Project | Trade-off worth practicing |
|---|---|
| Project 2 (warehouse migration) | Why phased cutover over big-bang, given the migration's specific multi-source risk |
| Project 3 (fraud detector) | Why the watermark was set where it was — accuracy vs. the latency budget |
| Any project | "What would you do differently?" — the retrospective's own second question |

Rehearsing out loud matters specifically because a trade-off that's
perfectly clear in your head often comes out tangled the first time you
say it — the gap between "I understand this" and "I can explain this
smoothly" only closes with practice, not more reading.

## Key terms

| Term | Meaning |
|---|---|
| Situation → Design → Trade-off → Retrospect | The four-part structure for a spoken project walkthrough |
| The why | The reasoning behind a decision — what actually differentiates a candidate's answer from a generic one |

## Check yourself

You're ready for Lesson 81 when you can explain, without looking: why do
interviewers ask follow-up questions about a project, rather than
accepting the first answer at face value?
