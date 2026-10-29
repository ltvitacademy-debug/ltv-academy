# Lesson 25 — The Five Places a New Deployment Usually Breaks

**Chapter 7 · Troubleshooting Common Deployment Issues · Lesson 25 of 32**

## What you'll learn

- The five places a new cloud deployment overwhelmingly tends to break, in real environments —
  not a theoretical list, but a pattern this course has already hit twice
- Why almost every "it's broken" ticket is actually one of these five things wearing a different
  costume
- How Lesson 31's subnet mistake and Lesson 32's stale NSG rule both map onto this same short list
- Why knowing the list in advance turns a 45-minute guessing session into a 5-minute checklist

## The pattern behind "it's broken"

By this point in the path, you've already debugged two real incidents: Lesson 31's `meridian-web2`
instance launched into the wrong subnet with no public IP, and Lesson 32's new VM that couldn't be
reached because an NSG rule still pointed at an office's old IP range. Neither of those tickets said
"subnet placement" or "stale security rule" on arrival — both just said some version of "can't
connect" or "doesn't work." That gap, between the vague symptom and the specific cause, is where
most of a junior engineer's time goes. The fix isn't to get smarter at guessing; it's to know, before
you start, which small number of places almost always turn out to be the actual cause.

## The five places

1. **Network/routing misconfiguration** — a resource sitting in the wrong subnet, a missing route
   to the internet gateway, a route table that was never associated with the subnet it needs to
   cover. This was the entire root cause behind `meridian-web2` in Lesson 31.
2. **Security group / NSG rules — too tight or too loose** — a rule that's stale (Lesson 32's office
   IP that moved), a rule that was never written for the port actually in use, or the opposite
   problem: a rule left wide open (`0.0.0.0/0`) that passes a security review for the wrong reasons.
3. **DNS resolution** — a record that points at an old IP after a resource was recreated, a private
   DNS zone that isn't linked to the VNet that needs it, or a typo in a hostname that resolves to
   nothing instead of erroring loudly.
4. **IAM/RBAC permission gaps** — an app's managed identity or a user's role missing the one
   permission a new feature now depends on. This looks exactly like a broken resource until you
   read the actual error text.
5. **Resource quota/limit hit** — a subscription or account that's quietly hit a vCPU quota, an IP
   address limit, or an API rate limit, so a deployment or a scaling event fails with no obvious
   configuration error anywhere.

## Why this list, specifically

This isn't a guess — it's the direct generalization of what this path has already shown you working
end to end. Chapters 1-2 of the networking fundamentals course built the addressing and routing
layer (#1). Chapters 5-7 of that same course built the security groups and NSGs layer (#2 and part
of #4's permission mindset). The AWS and Azure courses both dedicated entire chapters to IAM roles
and RBAC (#4). And every cloud provider enforces default quotas specifically to protect shared
infrastructure, which is exactly why #5 shows up constantly in real accounts, especially new ones
that haven't requested a quota increase yet. The five places aren't five unrelated failure modes —
they're the five layers a deployment passes through, in roughly the order traffic or a request
actually travels: network, firewall rule, name resolution, identity, and capacity.

## A quick way to triage

When a ticket says "it's not working," run through the five mentally before touching anything:
is traffic getting routed there at all (#1)? Is a firewall rule blocking or wrongly allowing it
(#2)? Does the hostname resolve to the right place (#3)? Does the error message smell like
"access denied" rather than "connection timed out" (#4)? And did anything recently fail to
provision with a quota-sounding error (#5)? Lessons 26 and 27 turn the first four of these into
full, repeatable diagnostic sequences you can run on a real incident, not just a mental checklist.

## Key terms

| Term | Meaning |
|---|---|
| Stale rule | A security rule that was correct when written but no longer matches current conditions |
| RBAC | Role-Based Access Control — Azure's model for granting permissions through assigned roles |
| IAM policy | AWS's model for granting permissions, attached to users, groups, or roles |
| Quota/limit | A provider-enforced ceiling (vCPUs, IPs, API calls) that silently blocks an action once hit |

## Check yourself

Without looking back, name the five places. Then, for Lesson 31's `meridian-web2` incident and
Lesson 32's unreachable VM, say which one of the five each incident actually turned out to be.
