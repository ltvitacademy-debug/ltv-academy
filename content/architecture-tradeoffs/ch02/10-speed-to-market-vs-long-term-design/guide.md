# Lesson 10 — Speed to Market vs. Long-Term Design

**Chapter 2 · Tradeoffs in Depth · Lesson 10 of 20**

## What you'll learn

- Why shipping fast and building for the long term pull against each other structurally, not just in effort
- Concrete Salesforce examples: quick-win declarative fixes vs. a proper data model, hardcoded record types vs. a configurable metadata-driven design
- How to tell deliberate technical debt from accidental technical debt
- The real criteria for deciding how much long-term investment a given project deserves

## The debt metaphor is accurate, and that's the point

"Technical debt" is a useful phrase because debt is a genuinely neutral financial tool, not an inherently bad one. Borrowing money to open a business that will generate more revenue than the loan's interest is a good financial decision. Borrowing money with no plan to pay it back, financing a liability that never generates returns, is a bad one. Shipping a quick, simpler Salesforce solution to hit a launch deadline is exactly the same kind of decision: it's good debt if the team knows what was deferred, has a plan to pay it down, and the interest (the ongoing cost of the shortcut) is smaller than the value of shipping on time. It's bad debt if nobody tracked what was skipped, the shortcut compounds in ways nobody predicted, and six months later the org is paying far more to untangle it than it would have cost to build it properly the first time.

Concretely: a team under deadline pressure might hardcode a handful of Record Types and page-layout assignments to handle three known business units, rather than building a configurable, metadata-driven assignment rule that would handle an arbitrary future number of business units. That's a real shortcut with a real cost — adding a fourth business unit later means another round of hardcoded changes instead of a configuration change — and it might be exactly the right call if the org has no credible plan to add a fourth business unit in the foreseeable future. The same shortcut, taken by a team that already knows the company is acquiring two more business units next year, is a mistake dressed up as a shortcut, because the "debt" was never going to be small or short-lived.

## Telling deliberate debt from accidental debt

The difference isn't the shortcut itself — it's whether the decision was made with eyes open:

- **Deliberate technical debt** is named explicitly at the time it's taken on, usually in an Architecture Decision Record (see Lesson 8): "we are hardcoding record-type assignment for the three known business units to hit the Q3 launch date; if a fourth is added, this needs rebuilding as configuration, estimated at roughly two sprints of work." Someone made the call, the cost is written down, and a future team knows exactly what they're looking at and why.
- **Accidental technical debt** is a shortcut nobody flagged as a shortcut — it was built as if it were the permanent, correct design, and the team that inherits it has no way to tell whether the limitation was intentional or an oversight, whether it's safe to build around, or whether rebuilding it is overdue. The cost is identical to deliberate debt in the code itself; the real cost is the loss of knowledge about what was deferred and why.

A mature architect doesn't avoid debt entirely — that would mean gold-plating every feature regardless of whether speed actually mattered, which is its own mistake (see Lesson 20 on common tradeoff mistakes). A mature architect takes debt deliberately, names it, and tracks it the same way an ADR tracks any other tradeoff.

## The actual decision criteria

- **How real is the deadline, and what's actually lost if it slips?** A launch date tied to a contractual commitment or a regulatory deadline is a real forcing function. A self-imposed deadline with no external consequence is weaker justification for cutting a corner that will be expensive to fix.
- **How likely, and how soon, is the scenario the shortcut doesn't handle?** A shortcut that fails only in a scenario with no credible near-term likelihood (a business unit count going from 3 to 4 when there's no acquisition pipeline) is low-risk debt. A shortcut that fails in a scenario already on the roadmap is high-risk debt disguised as a shortcut.
- **What's the cost to fix it later, compared to the cost to build it right now?** Some shortcuts are cheap to unwind later (a few extra Record Types to add). Some compound badly (a data model shortcut that gets built on top of by five more features before anyone circles back) — the earlier kind is safer debt to take on than the latter.
- **Is the debt visible to whoever inherits it?** If the answer is no, that's the actual problem to fix first, independent of whether the original shortcut was reasonable.

## Key terms

| Term | Meaning |
|---|---|
| Technical debt | A deliberate or accidental shortcut taken now that creates an ongoing cost to be paid later, structurally similar to financial debt |
| Deliberate technical debt | A shortcut explicitly named and documented at the time it's taken, with its cost and conditions for revisiting written down |
| Accidental technical debt | A shortcut built as if it were the permanent design, with no record of what was deferred or why |
| Metadata-driven design | A configurable architecture (custom settings, custom metadata types) that handles new cases through configuration rather than code or hardcoded values |

## Lab

A fast-growing company needs a partner-portal feature live in six weeks for a major trade show commitment. The proposed shortcut: hardcode the three current partner tiers' discount logic directly in a validation rule, instead of building a configurable discount-tier custom metadata type that would take an extra two weeks. The sales VP mentions, almost in passing, that two new partner tiers are "probably coming sometime next year, not sure when." Using the criteria above, write a short recommendation: take the shortcut or not, and what would you want documented regardless of which way you decide?

## Check yourself

Can you explain, using the debt metaphor, why a shortcut taken under deadline pressure isn't automatically a mistake? Can you describe the actual difference between deliberate and accidental technical debt, and why that difference — not the shortcut itself — is what determines whether it becomes a real problem later?
