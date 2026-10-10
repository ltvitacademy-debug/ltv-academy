# Lesson 2 — Translating Business Requirements

**Chapter 1 · Thinking Like a Technical Architect · Lesson 2 of 19**

## What you'll learn

- Why a business requirement and a technical requirement are not the same sentence, even when they describe the same project
- The gap between what a stakeholder says they want and what they actually need
- A simple technique (the "why" ladder) for getting from a stated request to its real business driver
- How to write a requirement down so it survives being handed to someone else

## "Build us a dashboard" is not a requirement

A sales VP says: "I need a dashboard that shows me which deals are at risk." That sentence sounds like a requirement. It isn't one yet — it's a request, and a request is the raw material a requirement gets built from, not the requirement itself. "At risk" could mean a deal with no activity logged in two weeks, a deal whose close date has already slipped twice, a deal where the champion contact left the company, or all three. Until an architect (or whoever is gathering requirements) pins down which of those the VP actually means, "build a dashboard" cannot be turned into field-level decisions, object relationships, or automation logic. Translating business requirements is the discipline of turning a stakeholder's plain-language request into something specific enough that two different people building from it would build the same thing.

This is squarely architect work, not just a business analyst's job, because the translation has to account for what's technically feasible and what trade-offs it implies — an architect sitting in on requirements gathering can catch a request that sounds simple but is actually expensive, or catch an ambiguity that a purely business-side analyst wouldn't think to ask about.

## The gap between stated want and actual need

Stakeholders are experts in their own job, not in Salesforce, and not always in their own underlying problem. A support manager who asks for "a button that closes five cases at once" has identified a symptom (closing cases individually is slow) and proposed their own solution (a bulk-close button), without necessarily having examined whether the real problem is that cases are being created unnecessarily in the first place, or that the closure criteria themselves are too granular. An architect's job during requirements gathering is to hear the proposed solution, but keep asking questions until the actual underlying need is visible — because the proposed solution is sometimes the right one, and sometimes isn't, and you can't tell which until you understand the need it's trying to serve.

## The "why" ladder

A practical technique for finding that underlying need is to ask "why" repeatedly, each time pushing one level past the previous answer, until you hit something that is actually a business outcome rather than a restatement of the request:

- "I need a dashboard that shows at-risk deals." *Why?*
- "So I can catch deals before they slip." *Why does catching them matter?*
- "Because last quarter we lost three deals we didn't realize were in trouble until it was too late." *Why didn't you realize it in time?*
- "Because nobody flags a deal as at-risk until it's already lost — there's no earlier signal." 

Three "whys" in, the real requirement has surfaced: the business doesn't actually need a dashboard as the end goal — it needs an earlier, more reliable signal that a deal is heading toward trouble, which a dashboard might deliver, but so might an automated alert, a required field, or a different sales process step. Stopping at the first answer ("they want a dashboard") would have architecture-locked a specific UI before anyone confirmed it solves the actual problem.

This technique isn't about interrogating stakeholders aggressively — in practice it's a handful of genuinely curious follow-up questions spread across a conversation, not a rapid-fire drill. The goal is understanding, not cross-examination.

## Writing it down so it survives a handoff

A requirement that lives only in one person's head, or in loose meeting notes, degrades the moment it's handed to someone else to build. A requirement worth building from states: who needs this and why (the business driver uncovered by the why-ladder), what "done" looks like in observable terms, and any constraint already known (a deadline, a data volume, an existing system it has to work with). "Sales managers need visibility into deals with no logged activity in 10+ days, so they can intervene before a deal goes cold, rolled out before next quarter's kickoff" is a requirement a developer, an admin, or another architect could pick up cold and build the right thing from. "Build us a dashboard" is not.

## Key terms

| Term | Meaning |
|---|---|
| Business requirement | A stakeholder's actual underlying need, expressed in business terms, independent of any specific solution |
| Technical requirement | The specific, buildable translation of a business requirement into system behavior |
| The "why" ladder | Repeatedly asking why a stated request matters, until the real business driver surfaces |
| Requirements gathering | The structured process of eliciting, clarifying, and documenting what a solution actually needs to do |

## Lab

A stakeholder tells you: "I need every customer record to show a red flag if they're unhappy." Apply the why-ladder on paper: write at least three rounds of "why does that matter?" with a plausible answer at each round, until you reach something that sounds like an actual business outcome rather than a restatement of "show a red flag." Then write one sentence capturing the real requirement you'd actually build from.

## Check yourself

Can you explain, with an example, the difference between a stated request and the actual underlying need it comes from? Can you walk through how the why-ladder technique works and apply it to a new request of your own invention? Can you list the three things a well-written requirement should capture so it survives being handed to someone else?
