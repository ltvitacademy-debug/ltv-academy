# Lesson 26 — Multi-Department Implementation Strategy

**Chapter 8 · Governance & Multi-Department Implementation Strategy · Lesson 26 of 32**

## What you'll learn

- Why rolling a new capability out to every department at once is almost always the wrong sequencing choice
- How to pick a genuine pilot department — and why "simplest, most contained use case" beats "most important department" as the selection criterion
- The real line between shared, platform-wide customization and department-specific customization
- How that shared-versus-specific decision connects directly to Chapter 2's scoped-application architecture
- What a real rollout actually looks like once the pilot has proven the pattern

## Sequencing: who goes first, and why it isn't the biggest department

A Technical Architect rolling out a major new capability — a new module, a redesigned request process, an Employee Service Center — across several departments with genuinely different needs almost never launches everywhere simultaneously. Simultaneous rollout multiplies every unknown by the number of departments involved: if the design has a flaw, every department discovers it at once, with no department yet convinced the capability works at all.

The real alternative is picking one **pilot department** first — and the right pilot is rarely the organization's biggest or most strategically important department. It's the one with the clearest, most contained use case: simple approval chains, low customization need, a motivated stakeholder willing to work through rough edges. A clean pilot win there builds the organizational confidence — real, demonstrated proof the new capability works — that makes the second and third departments, including the harder ones, willing to adopt it without a fight. Picking the most complex department first because it's the most "important" one tends to produce the opposite: a visible struggle that makes every other department skeptical before they've even tried it.

## Shared versus department-specific: drawing the real line

Every multi-department rollout forces the same architectural decision Chapter 2's scoped-application lesson raised: how much should be one shared thing, and how much should be built per department? Two categories, concretely:

- **Shared, platform-wide.** The base intake form, the core data model, the underlying workflow engine, the notification framework — anything every department needs in essentially the same shape belongs in a shared scoped application, maintained once, benefiting from every future fix immediately.
- **Department-specific.** Approval routing rules, specific fields unique to one department's process, department-level reporting — anything that's genuinely different per department, not just differently preferred, belongs in a department-specific extension that builds on the shared base rather than forking it.

Getting this line wrong in either direction is expensive. Forcing a department-specific need into the shared base makes the shared application fragile and conditional-logic-heavy for everyone. Letting a genuinely shared capability get rebuilt per department recreates exactly the duplicate-customization problem Lesson 25's federated-governance guardrails exist to prevent.

## What a real rollout looks like, start to finish

1. Build the shared base and the pilot department's specific extension together, validated against that one department's real process.
2. Launch the pilot, gather real usage data and real friction points — not hypothetical ones from a design review.
3. Fix what the pilot actually surfaced in the shared base, since every later department benefits from a shared fix made once.
4. Sequence the remaining departments roughly by complexity, each adding only its own department-specific extension on top of an already-proven shared base.

## Key terms

| Term | Meaning |
|---|---|
| Pilot department | The first department to adopt a new capability, chosen for a clear and contained use case, not organizational importance |
| Shared, platform-wide customization | Functionality built once in a shared scoped application because every department needs it in essentially the same shape |
| Department-specific customization | Functionality built as an extension for one department because its need is genuinely different, not just differently preferred |
| Rollout sequencing | The deliberate order departments adopt a new capability in, chosen to build confidence before tackling complexity |

## Check yourself

Finance and Marketing both want a new request-intake capability. Finance's approval chain has four conditional steps; Marketing's has one. Which department would you pilot with, and what would you specifically be trying to prove before bringing Finance on?
