# Lesson 16 — Model Approval Workflows · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Who actually decides a model is ready for production? If the answer is "whoever built it," this lesson is about why that stops working.

## S2 · STEPS — Why self-approval doesn't scale

In a lot of organizations, the person who built a model also decides it's ready and ships it. That's fine for a low-stakes internal tool. It breaks down the moment a model affects a customer or a regulator could ask about it — the same way a developer approving their own database change is a blind spot, not a trust issue.

## S3 · STEPS — The typical gates

Most mature workflows move a version through five gates: development, where the model card gets drafted; technical validation, checking the evaluation methodology; risk and compliance review; business sign-off confirming it solves the real problem; and production approval, which finally promotes the version.

## S4 · STEPS — Who signs off

Each gate has a different approver checking a different thing: a senior engineer validates methodology, risk or compliance checks policy fit, the business owner confirms it solves the actual problem, and a governance council clears final production approval once everything upstream is done.

## S5 · STEPS — Why approvals actually get rejected

The most common real rejections: the evaluation metric doesn't match what the business actually cares about, the model card is incomplete, performance is uneven across a subgroup that matters, or the registry entry is missing an owner. Every one of these is a concept from earlier in this chapter showing up as a real blocker.

## S6 · OUTRO

That closes Chapter Three: Model Governance. Chapter Four moves from governing the model itself to securing, accessing, and monitoring it once it's live.
