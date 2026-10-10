# Lesson 13 — Custom Code vs. Managed Packages

**Chapter 2 · Tradeoffs in Depth · Lesson 13 of 20**

## What you'll learn

- How this tradeoff differs from the general build-vs-buy decision in Lesson 4
- What's specifically locked away when you install a managed package versus writing your own Apex
- Concrete extension points architects actually use to customize around a managed package
- The real criteria for deciding when a package's constraints are acceptable versus disqualifying

## Narrower than build vs. buy — this is about what happens after you've already decided to buy

Lesson 4 covered the broader decision of whether to buy a solution at all. This lesson is about a sharper, more technical question that comes right after: once you've decided an AppExchange managed package is the right fit, what have you actually given up, technically, by choosing a managed package specifically instead of writing the equivalent logic yourself in custom Apex? The two decisions are related but distinct — an org can correctly decide "buy" and still get the specific *kind* of managed-package constraint wrong if nobody on the team understood what a managed package actually locks away.

A managed package is distributed through AppExchange with its Apex source hidden by default and its components namespaced — every field, object, and class the package creates carries a unique prefix that keeps it from colliding with anything else in the org, and also marks it as something you don't own and can't directly edit. You cannot open the package's Apex classes and change a line of logic, even a trivial one, the way you could in your own custom code. If the package's validation rule enforces a business rule slightly differently than your org needs, you cannot edit that validation rule — you can only work around it, disable what the package exposes as configurable, or request the change from the vendor and wait for their release cycle. This is the real, specific cost of "managed" that's easy to underweight when the broader build-vs-buy decision focused mostly on cost and functional fit: it's not just that you're paying a subscription, it's that you've permanently traded away direct edit access to that logic, for as long as the package stays installed.

## The extension points that make this livable

Managed packages aren't black boxes with zero flexibility — mature ones are deliberately built with specific, supported extension points, and knowing to look for these is the actual skill here:

- **Custom fields and objects you add alongside the package's own.** You can virtually always extend a package's data model with your own custom fields, and sometimes your own custom objects related to the package's objects, without touching the package's own schema.
- **Invocable Apex, platform events, or APIs the package exposes deliberately.** A well-built package often ships specific extension hooks — an invocable method a Flow can call, a platform event the package fires that your own code can subscribe to — specifically so subscribers can extend behavior without needing the hidden source.
- **Configuration the package genuinely exposes, versus configuration that only looks exposed.** Custom settings, custom metadata types, and admin-facing setup screens the package ships with are real configuration surface. It's worth distinguishing these, during evaluation, from a setting that looks adjustable in the UI but only toggles between two vendor-chosen behaviors rather than giving the org real control.
- **Apex that runs alongside the package rather than inside it.** A trigger you build on the same object the package also touches, careful about execution order and not fighting the package's own automation, lets you add org-specific logic without needing access to the package's internals at all.

## Deciding when the constraint is acceptable

- **Does the package expose an extension point for the specific customization this org actually needs, or would the gap require editing hidden source that isn't available?** If the answer is a real extension point exists, the managed-package constraint is livable. If the gap can only be closed by changing logic you don't have access to, that's a sign the fit may not be as good as it first looked, independent of cost.
- **How often does this org's process actually change?** A package covering a stable, slow-changing process is a safer long-term bet than one covering a process the org revises every quarter — frequent change means frequent collisions with whatever isn't configurable.
- **What's the vendor's track record on shipping requested changes?** A vendor with a responsive roadmap process and a visible history of taking customer-requested enhancements into future releases makes "wait for the vendor" a real option. A vendor with a slow or opaque roadmap makes that same wait a genuine risk.

## Key terms

| Term | Meaning |
|---|---|
| Namespace | A unique prefix Salesforce assigns to every component in a managed package, preventing naming collisions and marking the component as vendor-owned |
| Hidden Apex source | The default state of a managed package's code, which subscribers cannot view or directly edit |
| Extension point | A deliberately exposed hook (invocable method, platform event, custom setting, custom metadata type) that lets subscribers customize behavior without accessing hidden source |
| Vendor roadmap dependency | The constraint of needing to wait for a package vendor's own release cycle to get a desired change, since subscribers can't make it themselves |

## Lab

An org has installed a managed package for contract lifecycle management that covers 85% of their process. The remaining 15% is a specific approval routing rule unique to their industry that the package's configuration screens don't support. Using the criteria above, investigate (in writing) what you'd check before concluding this gap is a dealbreaker: what specific extension points would you look for, and what would make you recommend living with a workaround versus recommending the org reconsider the custom-build alternative entirely?

## Check yourself

Can you explain how this lesson's question ("what do you give up technically by choosing a managed package specifically") differs from the broader build-vs-buy decision in Lesson 4? Can you name at least two real extension points a managed package might expose, and explain why distinguishing a genuine extension point from a package's hidden internals matters to this decision?
