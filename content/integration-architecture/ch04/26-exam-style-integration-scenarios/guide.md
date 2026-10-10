# Lesson 26 — Exam-Style Integration Scenarios

**Chapter 4 · Applying Integration Architecture · Lesson 26 of 28**

## What you'll learn

- How Salesforce architect-track certification exams typically frame an integration scenario question
- A method for reading a scenario question that separates signal (facts that drive the answer) from noise (realistic but irrelevant detail)
- Four worked scenario questions in the certification style, solved step by step using this course's vocabulary
- Why the "best" answer on these exams is usually the one that correctly weighs a trade-off, not the one that sounds most sophisticated

## How these questions are actually built

Salesforce's architect-track exams (and similarly-styled scenario questions throughout this course's review materials) describe a realistic business situation in a paragraph, embed several specific facts that matter, surround them with plausible-sounding detail that doesn't actually change the answer, and then ask which approach is "best" among four or five options that are all individually plausible-sounding. The skill being tested isn't memorizing facts — it's the same skill Lesson 11 taught: extracting the few facts that actually answer the four framing questions (who initiates, how often, how much data, how fast) from everything else in the paragraph, and reasoning from there to the option that actually fits, rather than the option that uses the most impressive-sounding vocabulary.

## A reading method

Read the scenario once for the general shape of the business situation. Read it a second time specifically hunting for the four questions' answers, underlining (mentally, or literally on scratch paper) the specific words that answer each one: a volume number, a word like "immediately" or "overnight," a phrase about who's waiting on what. Then look at the answer options and eliminate any option that contradicts a fact you just underlined — an option proposing a synchronous design when the scenario specified "the user does not need to see the result" is wrong regardless of how well-written it sounds, because it ignores an urgency fact the question explicitly gave you.

## Four worked scenarios

**Scenario 1.** "A company's Salesforce org needs to send a confirmation email receipt whenever an Order is marked Paid. The marketing team that manages the email templates has said a short delay of a few minutes before the email goes out is completely acceptable, and no part of the Order-closing process should ever be blocked waiting on the email system." The underlined facts: initiator is Salesforce (Order marked Paid), urgency is explicitly low (a few minutes is fine), and explicitly no blocking allowed. This rules out any synchronous option immediately and points to fire-and-forget, most likely via a Platform Event — exactly Lesson 7 and Lesson 8's vocabulary.

**Scenario 2.** "An integration needs to move 2 million historical case records from a legacy system into Salesforce as a one-time migration before a system cutover next month. The legacy system will be decommissioned immediately after the migration completes." The underlined facts: very large volume, one-time, with a hard timeline. This rules out a per-record REST API loop (Lesson 1's volume question alone rules it out) and points to Bulk API (Lesson 13), not an ongoing sync pattern, since the "one-time, then decommissioned" detail rules out building delta-sync infrastructure for a source that won't exist afterward.

**Scenario 3.** "A sales rep needs real-time inventory availability before confirming a large custom order, and the warehouse system has a documented 99.9% uptime and typically responds within 300 milliseconds." The underlined facts: the rep is blocked waiting, this is a per-transaction check, not a bulk operation, and urgency is immediate. This is Lesson 6 and Lesson 24's Flow 3 pattern again: synchronous communication is justified here specifically because the business process can't proceed without the answer right now — the uptime and latency figures are reassuring context, not the deciding factor (the deciding factor is still the urgency answer).

**Scenario 4.** "Three different internal systems all need to be notified independently whenever a Contract is activated, and the Contract-activation logic should not need to change if a fourth system is added next year that also needs to react to the same event." The underlined facts: multiple independent consumers, and an explicit requirement that adding a new consumer shouldn't require touching the producer. This is Lesson 8's event-driven architecture almost by name — the explicit "shouldn't need to change" requirement is the decoupling benefit EDA specifically provides, and any point-to-point-style option that would require modifying the Contract-activation code for a new consumer is wrong by definition.

## The best answer weighs a trade-off, not a vocabulary contest

A frequent exam-writing pattern offers one option that's technically correct in isolation but ignores a specific constraint the scenario gave (ignoring the stated volume, or proposing synchronous communication the scenario explicitly said shouldn't block anything), alongside the genuinely correct option that respects every fact given. The discipline this lesson is building is treating every fact in the scenario as load-bearing until proven otherwise, rather than skimming for a familiar-sounding keyword and picking the answer that uses the same keyword.

## Key terms

| Term | Meaning |
|---|---|
| Signal vs. noise (in a scenario question) | The specific facts that determine the correct answer, versus realistic but irrelevant surrounding detail |

## Lab

Write your own exam-style scenario (3-5 sentences) modeled on this lesson's four examples, describing a business situation that clearly points to one specific pattern from this course (your choice: synchronous, async fire-and-forget, async request-reply, batch, or event-driven). Then write the "signal" facts you deliberately embedded that a test-taker should underline, and one plausible-but-wrong answer option you'd include as a distractor, explaining exactly which fact it ignores.

## Check yourself

Can you describe, step by step, the reading method this lesson teaches for separating signal from noise in a scenario question? Can you work through all four of this lesson's worked scenarios again from memory and state which pattern each one points to and why?
