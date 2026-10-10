# Lesson 8 — Risk Identification

**Chapter 2 · From Requirements to Blueprint · Lesson 8 of 19**

## What you'll learn

- What a risk is, as distinct from a problem that has already happened
- A simple way to reason about a risk using likelihood and impact together
- Where in a solution's design risks typically hide, so you know where to look
- How to write a risk down so it's actionable instead of just a vague worry

## A risk is a problem that hasn't happened yet

A **risk** is something that might go wrong, with a real (even if hard to quantify) chance of happening, and a real consequence if it does. That's a deliberately different thing from an **issue**, which is a problem that has already occurred and now needs fixing. Confusing the two causes real damage to a project: raising a risk and having it treated like an issue ("well, has it actually happened? no? then it's not a real problem") suppresses exactly the kind of early warning that risk identification exists to produce. The whole point of identifying a risk is to deal with it before it becomes an issue, when dealing with it is usually far cheaper.

## Likelihood and impact together, not separately

Two risks can sound equally alarming in a sentence and still deserve very different amounts of attention, because risk is really a combination of two separate questions: how likely is this to actually happen, and how bad is it if it does? A risk that's highly likely but has minor impact (a report sometimes takes a few extra seconds to load during month-end) deserves acknowledgment but not urgent redesign. A risk that's unlikely but catastrophic (a single misconfigured sharing rule exposes every customer's records to every internal user) deserves serious attention even though it might never actually occur, because the cost if it does occur is severe enough to justify real prevention effort. Architecture attention should scale with the combination of likelihood and impact together, not with how dramatic a risk sounds when described out loud.

## Where risks typically hide in a Salesforce solution

Several recurring categories are worth deliberately checking during any design, rather than waiting to notice them by accident:

- **Data volume and performance risk.** A design that works cleanly with today's 10,000 records might behave very differently at 10 million, especially around reporting, list views, or automation that runs per-record.
- **Integration dependency risk.** Any design that depends on another system being available, responsive, or behaving the way its documentation claims carries risk proportional to how much control you actually have over that other system.
- **Change-management risk.** A design that depends on users adopting a new process correctly carries risk if that process isn't intuitive, isn't trained on, or conflicts with an existing habit.
- **Security and access risk.** Any point where a sharing rule, a profile, or a permission set grants broader access than strictly needed is a risk, even if nothing has gone wrong with it yet.
- **Single point of failure risk.** A design that routes everything through one integration user, one middleware instance, or one undocumented piece of logic someone built years ago carries risk concentrated in that single point.

## Writing a risk down so it's useful

A risk worth raising states the specific thing that might go wrong, roughly how likely it is, what the impact would be if it happened, and ideally a mitigation or at least a monitoring idea. "Performance might be bad" is a vague worry nobody can act on. "If order volume exceeds roughly 50,000 records per month, the current nightly batch job risks exceeding its processing window before the next one starts, which would create a backlog that compounds daily — worth load-testing against 2x current peak volume before go-live" is a risk someone can actually decide what to do with: test it, accept it, or redesign around it now while that's still cheap.

## Key terms

| Term | Meaning |
|---|---|
| Risk | Something that might go wrong, with a real chance of happening and a real consequence if it does |
| Issue | A problem that has already occurred and now needs fixing, distinct from a risk |
| Likelihood | How probable it is that a given risk actually occurs |
| Impact | How severe the consequence would be if a given risk did occur |
| Mitigation | An action taken to reduce a risk's likelihood, its impact, or both |

## Lab

You're designing a solution where a single integration user account authenticates to three different external systems, and if that account's credentials ever expire or get revoked, all three integrations stop simultaneously. Write this up as a properly-stated risk: name the specific thing that might go wrong, estimate its likelihood and impact in your own words, and propose one realistic mitigation.

## Check yourself

Can you explain the difference between a risk and an issue, and why confusing the two damages a project? Can you describe why likelihood and impact need to be considered together, with an example of a risk that's high on one dimension but low on the other? Can you name at least three categories where risk typically hides in a Salesforce solution, and write one risk statement that includes likelihood, impact, and a mitigation idea?
