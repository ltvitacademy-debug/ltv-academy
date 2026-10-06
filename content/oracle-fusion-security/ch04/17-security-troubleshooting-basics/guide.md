# Security Troubleshooting Basics

Chapters 1 through 3 gave you the full vocabulary and mechanics. This lesson turns that into a repeatable troubleshooting method you can apply the moment someone says "I can't do the thing I'm supposed to be able to do."

## What you'll learn

- The first diagnostic question to ask, every time
- A step-by-step method for function security problems
- A step-by-step method for data security problems
- Common root causes to check first, because they're common

## Start with the Lesson 5 split

Before touching anything in the Security Console, ask the user (or reproduce yourself, ideally with a test account per Lesson 10): **can you reach the page or control at all, or can you reach it but something about the data looks wrong?** That single question sends you down one of two different troubleshooting paths, and conflating them wastes time.

## Path A: function security problems ("I can't even get to it")

1. Confirm the user's job/abstract role assignments in the Security Console — did the expected role actually get provisioned (Lesson 9), or did a role mapping fail to fire?
2. If the role is there, use **Simulate Navigator** (Lesson 10) on that role to confirm it includes the menu item or button in question.
3. If the role doesn't include it, trace down to the duty role that should carry that privilege (Lesson 4) — is it missing from the job role entirely, or present but somehow not inherited?
4. Check whether the privilege itself was recently modified — a prior admin change to a duty role's privilege list is a common, overlooked cause.

## Path B: data security problems ("I can get to it, but something's off")

1. Confirm the expected security context and value are actually assigned — business unit, data access set, or whatever's relevant (Lesson 8). A blank or wrong context value is the single most common root cause here.
2. Check whether the user has **multiple** roles with **overlapping but inconsistent** data access — for example, one role scoped to US Operations and another, unintentionally, scoped to nothing, which can produce confusing partial results.
3. Confirm the underlying data actually exists in the scope being checked — occasionally "access looks broken" is actually "there's no data in that business unit yet," which isn't a security problem at all.
4. Use a matching **test user account** (Lesson 10) to isolate whether the problem is the specific user's assignment or something broader affecting the role itself.

## Two traps to avoid

- **Over-provisioning as a "fix."** Adding a broader job role to make an access complaint go away, without ever confirming which specific duty role or data access was actually missing, is how segregation-of-duties conflicts (Lesson 13) get quietly created. Fix the specific gap, not the symptom.
- **Assuming it's always a security problem.** Sometimes the real issue is a setup gap (a business unit that was never assigned to any ledger, say) that happens to present exactly like a data security failure. The worked scenarios in Lesson 18 include at least one example of this.

## Key terms

| Term | Meaning |
|---|---|
| Function security path | Role assignment → Simulate Navigator → duty role/privilege trace |
| Data security path | Security context/value → overlapping roles → data existence → test account |
| Over-provisioning | Fixing a symptom by granting broader access than the actual gap requires |

## Recap

Split every access complaint into function security or data security first, then follow the matching trace — role assignment and duty roles for one, security context and data access for the other — using a test account to isolate the cause. Next up, Lesson 18: access issue practice scenarios, where you'll apply this method to real cases.
