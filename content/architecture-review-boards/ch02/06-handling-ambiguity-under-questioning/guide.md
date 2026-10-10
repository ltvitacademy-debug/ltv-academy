# Lesson 6 — Handling Ambiguity Under Questioning

**Chapter 2 · Performing Under Pressure · Lesson 6 of 14**

## What you'll learn

- Why reviewers deliberately ask questions with missing information, and what that's actually testing
- How to state an assumption out loud instead of silently guessing or freezing
- The difference between a reasonable, stated assumption and an unstated one that undermines your answer later
- A technique for reasoning out loud so the board can follow your thinking, not just your conclusion
- When to ask a clarifying question instead of assuming, and when asking too many becomes its own problem

## Ambiguity is often deliberate, not an oversight

New reviewers of this material sometimes assume an ambiguous or underspecified question is a mistake the board made. Often it's the opposite: real production environments are full of missing information, and an experienced panel wants to see how you operate when a requirement isn't fully specified — because that's exactly the condition you'll be in on real projects. A question like "how would this scale if volume tripled" without saying over what timeframe, or "what if that system is down" without specifying for how long, isn't incomplete by accident. It's testing whether you freeze on missing information or work with it.

## State your assumption, don't silently guess

The weakest response to an ambiguous question is to silently pick one interpretation and answer it as though it were the only one, because if you picked wrong, your entire answer gets evaluated against a question you weren't actually asked. The strongest response states the assumption explicitly before answering it: "I'll assume that tripling happens gradually over about a year rather than overnight — under that assumption, here's how the design holds up." This does three things at once: it shows the board you noticed the ambiguity rather than missing it, it gives them the chance to correct your assumption immediately if it's wrong, and it makes your subsequent answer actually evaluable, since everyone now knows what question you're answering.

## Reasonable versus unstated assumptions

Not every assumption needs to be litigated out loud — doing that for every minor detail would make you impossible to follow. The judgment call is distinguishing a **load-bearing assumption** (one that would change your answer significantly if wrong) from an incidental one. State the load-bearing ones out loud, every time. An unstated load-bearing assumption is the dangerous case: if a reviewer later asks a follow-up that reveals you were quietly assuming something they didn't know about, it can look like you were hiding the ball rather than reasoning carefully — even if that was never the intent.

## Reasoning out loud

A board evaluating your answer to an ambiguous question is often more interested in *how* you got to an answer than in the specific answer itself, especially when the question genuinely has more than one defensible answer. Narrating your reasoning as you work through it — "first I'd want to know whether this is a batch or real-time requirement, because that changes which pattern applies; assuming real-time based on the original scenario, then..." — lets the board follow your thought process and evaluate your judgment, not just your final sentence. A correct answer delivered with no visible reasoning is actually harder for a board to evaluate than a reasoned path that arrives at a defensible, if imperfect, conclusion.

## When to ask instead of assume

Stating an assumption works well when a reasonable person could defensibly pick either interpretation and move forward. Asking a clarifying question is the better move when the two interpretations would lead to genuinely different designs, not just different details within the same design — in that case, guessing wastes real time building out the wrong branch. The failure mode to avoid is the opposite extreme: asking a clarifying question for every small ambiguity turns the session into you interviewing the board instead of the board evaluating you, and reads as an inability to operate with any uncertainty at all. The skill is calibrating which kind of ambiguity you're facing, quickly.

## Key terms

| Term | Meaning |
|---|---|
| Load-bearing assumption | An assumption significant enough that the rest of your answer changes meaningfully if it's wrong |
| Stated assumption | An assumption named out loud before answering, so the board can correct it and evaluate the answer against the right question |
| Reasoning out loud | Narrating the steps of your thinking as you work toward an answer, not just stating a final conclusion |

## Lab

A reviewer asks: "How would your design handle a tenfold increase in order volume?" with no further detail given. Write out, in the acknowledge-then-reason style from this lesson, how you would respond: state the load-bearing assumption you'd need to make to answer meaningfully, explain briefly why you chose that assumption over an alternative, and sketch (in two or three sentences) how your answer would actually change if the opposite assumption were true instead.

## Check yourself

Can you explain why an experienced board asks deliberately underspecified questions rather than always fully specifying every scenario? Can you distinguish a load-bearing assumption from an incidental one with an example of each? Can you describe the specific situation where asking a clarifying question is the better move than stating an assumption and proceeding?
