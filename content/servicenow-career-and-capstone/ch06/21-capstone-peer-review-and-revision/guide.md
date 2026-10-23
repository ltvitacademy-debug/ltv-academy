# Lesson 21 — Capstone: Peer Review & Revision

**Chapter 6 · Capstone: Wrap-Up & Presentation · Lesson 21 of 26**

## What you'll learn

- Why a tested, documented build from Lesson 17 and 18 can still have a genuine, specific design
  gap nobody has asked about yet
- The real gap a reviewing architect finds in Lesson 15's Access-request approval subflow, read
  line by line
- Why "it fails closed" was the right first answer and still an incomplete one
- How to revise the design in response — reusing a pattern this capstone already built elsewhere,
  instead of inventing a new one
- Why taking a specific, substantive critique seriously is a stronger signal in an interview than
  a build with no critique at all

## A peer review is not a compliment

A real peer review from an experienced architect does not say "looks good" and move on — it reads
the actual logic, asks what happens on every path, and names the path nobody tested because it
isn't the happy path. Lesson 17's test plan already proved this discipline works: TC-06 found a
real defect in the Prairie View upsert by testing an edge case, not the clean demo path. This lesson
runs that same discipline one layer up, against a part of the build no test case has touched yet —
the Access-request approval subflow Lesson 15 built.

## The reviewer's specific finding

Lesson 15's `ServiceNowApprovals`-style logic resolves a requester's manager, checks that the
manager sits in the requester's own domain, and returns `null` — refusing to guess — if that check
ever fails. A reviewing architect reads this and raises a specific, genuine gap: *"Your subflow
fails closed correctly. But what happens to the request when it does? Right now, a `null` return
just stops the subflow. If a cross-domain manager mismatch ever happens in production — someone's
manager field hasn't been corrected yet, or a sync hasn't caught up — an employee's legitimate
Access request silently never gets approved. No error reaches the requester. No one in their domain
is notified. The ticket just sits there, and nobody finds out until the requester asks why nothing
happened."* That is not a vague "good job" or a vague worry — it names the exact code path, the
exact missing behavior, and the exact person who'd be affected.

## Why "fail closed" was right, and still incomplete

The reviewer isn't arguing that failing closed was the wrong call — refusing to auto-approve across
a domain boundary that was never supposed to be crossed is exactly correct, and reversing it would
reintroduce the real risk the subflow was built to prevent. The gap isn't in the decision to fail
closed; it's in treating "fail closed" as a complete answer when it's only half of one. A safe
failure that nobody can see is still a failure employees experience as "the new system lost my
request" — exactly the kind of silent breakage that would undercut the trust Lesson 13's Prairie
View interview spent a whole lesson establishing.

## The revision: reusing a pattern this capstone already built

The fix doesn't invent new machinery — it reuses a pattern this build already proved. Lesson 15's
domain-routing Script Include never leaves a request unresolved either: when a domain mapping is
missing, it doesn't guess, and it doesn't silently drop the request — it falls back to a named,
documented corporate default queue. The approval subflow gets the same shape of answer. When
`getApproverForAccessRequest` returns `null`, the subflow routes the request to a defined fallback —
a domain's designated approval-escalation group — instead of stopping, and fires a notification to
the requester that their request needs manual review rather than letting it disappear. The domain
boundary is never crossed by auto-approving; a human in the right place gets a chance to resolve it
instead of the request vanishing from view.

## Key terms

| Term | Meaning |
|---|---|
| Peer review | A specific, substantive critique of a design's actual logic, not a general compliment or a vague worry |
| Fail closed (incomplete) | A safe refusal to guess that still leaves no visible path forward for the person affected |
| Escalation fallback | A named, documented destination for a case the normal path can't resolve, instead of a silent stop |
| Design revision | Changing a build in response to a specific critique, reusing an existing proven pattern where one fits |

## Check yourself

The reviewer's critique didn't argue that failing closed was wrong — only that it was incomplete.
In your own words, write the one-sentence difference between "this decision is wrong" and "this
decision is right but incomplete," and explain why that distinction mattered for how this capstone
revised its approval subflow.
