# Communicating Technical Risk to Non-Technical Stakeholders

Every lesson in this chapter so far has been about communicating with other engineers, who already share your technical vocabulary. This closing lesson covers the harder version: explaining a real technical risk to an executive, a customer, or a legal/compliance stakeholder who doesn't share that vocabulary at all — and who will make a real business decision based on how well (or badly) you explain it.

## What you'll learn

- Why a technically accurate risk explanation can still completely fail its audience
- A simple translation framework: likelihood, impact, and what's actually being asked of the listener
- A before/after example: the same real risk, explained badly and explained well
- Why vague reassurance is more dangerous than an honestly uncertain number

## Technically accurate and completely ineffective

Imagine an engineer telling Northbeam's VP of Customer Support: "our hallucination rate on the eval set is 3.2%, measured via a BLEU-score-adjacent semantic similarity threshold against ground truth, and the confidence interval widens under distribution shift." Every word of that is true and precise — and it has told the VP almost nothing they can actually use, because it doesn't answer the question they actually have, which is some version of "should I be worried, and if so, about what, specifically."

## A translation framework: likelihood, impact, ask

**Likelihood**: how often does this actually happen, stated in terms the listener can picture — "roughly 1 in 30 responses," not a raw percentage requiring mental conversion. **Impact**: what actually happens when it does — "the assistant states something false about a customer's account, which the support agent would need to catch before it reaches the customer" is concrete; "a quality issue" is not. **Ask**: what do you specifically want the listener to decide or approve — more budget for human review, a delay in launching a new feature, acceptance of a known, bounded risk. A risk explanation that's missing the "ask" leaves the listener informed but with no actual decision in front of them, which usually means nothing happens.

## Before and after: the same real risk, two ways

**Badly explained:** "There's some hallucination risk with the model, but we think it's manageable and we're monitoring it closely."

This reassures without actually informing — it gives no usable number, no concrete description of what could go wrong, and no specific decision for the listener to make. If something does go wrong later, this sentence also provides no record of what was actually disclosed and agreed to.

**Well explained:** "In our evaluation, about 1 in 30 responses contains a factual error serious enough that a customer could be misled if it reached them unreviewed. Right now, every response goes through a human support agent before the customer sees it, so that 1-in-30 risk is currently caught, not exposed to customers directly. If we remove that human review step to cut response time — which is the proposal on the table — that same error rate would reach customers directly, roughly 1 in 30 times. I'd recommend we keep human review in place until we get that error rate below 1 in 100, or build an automated check specifically for the highest-risk error types."

This version gives a real number, a concrete description of the failure, the current mitigation, what changes if a proposed decision goes through, and an explicit recommendation — everything the VP actually needs to make a real decision, in language that doesn't require any ML background to follow.

## Vague reassurance is more dangerous than honest uncertainty

"We think it's manageable" sounds safer to say than "about 1 in 30, and here's what that means" — but it's actually the riskier thing to say, for the communicator and the business. If the real number later turns out to matter (an incident happens, a customer is harmed, a regulator asks questions), "we said it was manageable" offers no defense and no paper trail, while a specific, honestly-stated number and its implications — even an imperfect one — shows the risk was actually understood, quantified, and knowingly accepted by the right people at the right time. Precision that's honestly uncertain ("we estimate around 1 in 30, with meaningful uncertainty on this specific eval set") is more useful and more defensible than false confidence dressed up as reassurance.

## Key terms

| Term | Meaning |
|---|---|
| Likelihood/impact/ask framework | A structure for explaining risk: how often it happens, what happens when it does, and what decision is being requested |
| Vague reassurance | A risk explanation that sounds safe but provides no actual number, mechanism, or decision point |

## Check yourself

Why is "we think it's manageable and we're monitoring it closely" actually a riskier thing to tell an executive than a specific, honestly-uncertain number like "about 1 in 30, with real uncertainty on this estimate"?
