# Access Issue Practice Scenarios

Lesson 17 gave you the method. This lesson applies it to four concrete scenarios at Castellan Robotics Inc. — each one a realistic ticket, worked through the function-security/data-security split before landing on the actual fix.

## What you'll learn

- How to apply the Lesson 17 troubleshooting split to real-sounding tickets
- Why the "obvious" fix is sometimes the wrong one
- How a setup gap can disguise itself as an access problem
- How to word a root-cause explanation clearly enough for a non-technical stakeholder

## Scenario 1: "I can't even open the Create Invoice page"

A new Accounts Payable Specialist, hired last week, reports the Create Invoice page is simply missing from her navigation menu. **Diagnosis path:** this is a function security complaint — she can't reach the page at all. Checking her role assignments shows no job role was ever provisioned. **Root cause:** her worker record was created with a job title that didn't match any role mapping's conditions exactly (a trailing space in the job field, as it turns out), so autoprovisioning (Lesson 9) never fired. **Fix:** correct the job field, then either wait for the next autoprovisioning trigger or provision the Accounts Payable Specialist role manually as an interim step.

## Scenario 2: "I can open Payables invoices, but I only ever see three of them"

A Senior Accountant who recently took on EMEA Shared Services responsibilities, in addition to his existing US Operations work, reports he can open the Invoices page fine, but sees far fewer invoices than expected. **Diagnosis path:** this is a data security complaint — the page opens, but rows look wrong. **Root cause:** his business unit assignment (Lesson 7) was only ever updated to add EMEA Shared Services in one of his two roles; the other role still points at a stale, narrower business unit value from an old project assignment. **Fix:** correct the business unit assignment on both roles so they're consistent, rather than simply adding a third, broader role on top (which would risk the over-provisioning trap from Lesson 17).

## Scenario 3: "Our General Ledger numbers don't match what Treasury expects to see"

A regional controller reports that General Ledger balances for her division look off. **Diagnosis path:** initially treated as data security, but investigation shows she can see exactly the rows her data access set should show — the data access set itself is correct. **Root cause:** this isn't a security problem at all. A balancing segment value was never assigned a default ledger set during enterprise structure setup, so some transactions simply never landed where she was looking. **Lesson:** exactly the Lesson 17 warning about assuming every "wrong data" complaint is a security problem — this one belonged to the implementation team's enterprise structure configuration, not the security team.

## Scenario 4: "Can you just give him Accounts Payable Manager so he stops asking for things?"

An AP Supervisor keeps running into individual access gaps and a frustrated manager suggests simply granting him the full Accounts Payable Manager job role to end the back-and-forth. **Diagnosis path:** before agreeing, identify exactly which specific duty roles are actually missing from his current Accounts Payable Supervisor role. **Root cause:** he genuinely needed one additional capability — adjusting supplier payment terms — which turned out to be a narrow, specific duty role, not the full manager role. **Fix:** add that one duty role's access through the appropriate narrower role or a scoped custom role, rather than granting full AP Manager, which would have also handed him payment-approval and policy-setting access he didn't need or request — a textbook segregation-of-duties risk avoided.

## Key terms

| Term | Meaning |
|---|---|
| Stale role data | A security context value left over from an old assignment, inconsistent with current responsibilities |
| Setup gap disguised as access issue | A configuration problem outside security that presents identically to a data security failure |

## Recap

Each scenario confirms the same lesson: split function from data security first, resist the broad "just grant them everything" fix, and don't assume every "wrong data" complaint is a security problem. Next up, Lesson 19: security in implementation and testing, closing out the course by placing all of this within a full implementation project.
