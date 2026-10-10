# Lesson 14 — Security and Sharing

**Chapter 3 · Architecture Domains · Lesson 14 of 19**

## What you'll learn

- Why Salesforce's record access model is layered, and what each layer actually controls
- The difference between object/field-level security and record-level sharing, and why confusing them causes real design mistakes
- The rule that governs how the layers combine (and the one setting that's the exception to it)
- How an architect should reason about the sharing model, rather than just configuring each layer in isolation

## Two different questions, often confused

"Can this user see this record?" and "can this user do anything with this kind of object at all?" sound like the same question. They aren't. **Object and field-level security** — controlled by profiles and permission sets — governs whether a user can create, read, edit, or delete a given object or field at all, independent of any specific record. **Record-level sharing** governs which specific records of an object a user who already has that baseline permission can actually see or touch. A user can have full edit permission on the Opportunity object and still be unable to see a specific opportunity they have no sharing access to. A user can technically be shared on a specific record and still be unable to do anything useful with it if their profile doesn't grant edit rights on that object in the first place. Both layers have to say yes before a user can actually act on a record — which is exactly why confusing them is a common, real architecture mistake: an architect who only thinks in terms of sharing rules while forgetting profile-level permissions (or vice versa) will design something that doesn't actually work the way they expect.

## The record-access layers, from floor to finest grain

Record-level sharing is itself built from several layers, each adding on top of the one below it:

- **Organization-wide defaults (OWD).** The baseline, set per object, ranging from the most restrictive (Private — only the owner and those above them in the role hierarchy can see a record) to the most permissive (Public Read/Write). OWD is the floor every other layer builds on top of.
- **Role hierarchy.** Opens access upward: a user's manager, and everyone above that manager in the hierarchy, can generally see and edit records owned by people below them, without needing a separate grant — modeling the idea that a manager needs visibility into their team's work.
- **Sharing rules.** Automatic, criteria-based or ownership-based exceptions that widen access beyond OWD and the hierarchy for a defined group — for example, sharing all opportunities owned by the West region sales team with the entire renewals team.
- **Manual sharing and sharing teams.** The most granular layer: sharing one specific record with one specific user or group, for a one-off situation that doesn't deserve a standing rule.

## The one rule that governs how it all combines

The layers combine additively: a user's actual access to a record is the most permissive result across every layer that applies to them. If any layer grants a user edit access, that access holds, regardless of what a more restrictive layer would have said on its own. This has one critical, non-obvious consequence worth stating plainly: sharing rules and the role hierarchy can only ever widen access beyond OWD — they can never be used to take access away from someone OWD or another layer has already granted. The only lever that actually restricts access is OWD itself, set as the deliberately restrictive floor. An architect designing a sharing model who starts from a permissive OWD and expects sharing rules to narrow it back down later has misunderstood how the model works; the model only ever opens, never closes.

## Designing the sharing model, not just configuring each layer

A sound sharing-model design starts from the data's actual sensitivity and the business's real visibility needs, not from whichever layer feels most familiar to configure. The practical sequence: set OWD as restrictive as the most sensitive use case for that object genuinely requires, let the role hierarchy handle the ordinary vertical visibility a management structure needs, add sharing rules sparingly for the specific cross-team visibility that's actually needed (not as a general-purpose patch for "some people need more access, let's figure out exactly who later"), and reserve manual sharing for genuinely one-off situations rather than a pattern that should really be a standing rule. Treating sharing rules as the default tool, rather than the targeted exception, is a common design smell: an org with dozens of broad, overlapping sharing rules usually means OWD was set more permissively than the data warranted in the first place, and sharing rules are now doing cleanup work they were never meant to do at scale.

## Key terms

| Term | Meaning |
|---|---|
| Object/field-level security | Whether a user can act on a given object or field at all, via profiles and permission sets |
| Record-level sharing | Which specific records of an object a user can actually see or touch |
| Organization-wide defaults (OWD) | The baseline record-access setting per object; the one layer that can actually restrict access |
| Role hierarchy | Opens record visibility upward through the management structure automatically |
| Sharing rule | An automatic, criteria- or ownership-based exception that widens access beyond OWD |

## Lab

A company sets Opportunity OWD to Public Read/Write so every rep can see every deal for cross-selling purposes, then later asks you to prevent junior reps from seeing enterprise-tier opportunities using a sharing rule. Explain, using this lesson's additive-access rule, why a sharing rule cannot accomplish this goal, and name the one setting that would actually need to change instead.

## Check yourself

Can you explain the difference between object/field-level security and record-level sharing, with an example where a user has one but not the other? Can you name the four record-access layers in order from floor to finest grain? Can you explain the additive-access rule and why OWD is the only layer that can actually restrict access?
