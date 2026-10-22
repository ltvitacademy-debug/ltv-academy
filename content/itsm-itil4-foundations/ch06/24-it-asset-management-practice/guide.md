# Lesson 24 — IT Asset Management Practice

**Chapter 6 · Service Configuration & Asset Practices · Lesson 24 of 28**

## What you'll learn

- The purpose of the IT asset management practice, in ITIL 4's own terms
- The full lifecycle an IT asset moves through, from planning to retirement
- The precise distinction between an "asset" and a "CI" — and why the same laptop can be both
- Why license compliance and warranty tracking are asset management problems, not configuration ones
- How asset data feeds decisions about reuse, retirement, risk, and regulatory obligations

## The purpose, stated precisely

ITIL 4 defines the purpose of IT asset management as planning and managing the full lifecycle of
all IT assets, to help the organization maximize value, control costs, manage risks, support
decision-making about reuse and retirement, and meet regulatory and contractual requirements. Note
how much of that is financial and legal language — "cost," "risk," "regulatory," "contractual."
That's the tell. This practice exists because IT assets cost real money, carry real contractual
obligations (software licenses, lease terms, warranties), and create real compliance exposure if
mismanaged. It's a business practice wearing an IT hat, more than it's a technical practice.

## The lifecycle an asset moves through

An asset's story doesn't start when it's unboxed. It starts at planning — deciding what to buy,
when, and why. Then procurement: the purchase order, the vendor, the cost. Then deployment: who
has it, where, under what assignment. Then operation: is it still under warranty, is its license
still valid, is it still earning its keep. Then, eventually, retirement: decommissioning,
data wiping, and disposal — which itself can carry regulatory weight if the asset ever touched
regulated data. IT asset management owns visibility across that entire arc, not just the
"it exists" snapshot a casual inventory would give you.

## The distinction that trips people up: asset vs. CI

Here's the concept worth sitting with. A configuration item is tracked because it plays a role in
delivering a service — that's configuration management's lens, from the previous lesson. An asset
is tracked because it has financial, contractual, or lifecycle value — purchase date, warranty
expiration, license terms, depreciation schedule. A single laptop can be both at once: it's a CI
because an employee's work depends on it running correctly, and it's an asset because the
organization paid for it, is tracking its three-year depreciation, and needs to know if its OS
license is still compliant. Same physical object, two practices, two completely different reasons
for caring about it. Mixing up those reasons is a common and avoidable mistake.

## Why license compliance lives here, not in configuration management

Software license compliance is a textbook asset management problem. The question "are we running
more copies of this application than we're licensed for" has nothing to do with how that
application relates to other CIs — it's a contractual and financial question about what the
organization is entitled to use versus what it's actually using. Audits, true-up fees, and vendor
compliance reviews all live in this practice's territory, because they're about the terms under
which an asset was acquired, not about the asset's technical role in a service.

## What asset data actually enables

Good asset data isn't bookkeeping for its own sake. It's what lets an organization decide whether
to reuse an existing laptop for a new hire instead of buying one, retire hardware before its
warranty-free repair window closes instead of after, and prove license compliance before a vendor
audit forces the issue. Those are all reuse, retirement, risk, and compliance decisions —
exactly the four outcomes ITIL 4's purpose statement names.

## Key terms

| Term | Meaning |
|---|---|
| IT asset | An item with recognized financial, contractual, or lifecycle value to the organization |
| Asset lifecycle | The full arc from planning and procurement through deployment, operation, and retirement |
| License compliance | Confirming actual software usage doesn't exceed what the organization is contractually licensed to use |
| Depreciation | The scheduled reduction in an asset's recorded financial value over its useful life |

## Check yourself

Without looking back: a single laptop is tracked by both configuration management and asset
management at the same time. What question is configuration management asking about it, what
question is asset management asking about it, and why are those genuinely two different concerns
rather than one concern tracked twice?
