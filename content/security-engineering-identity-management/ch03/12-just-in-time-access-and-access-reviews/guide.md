# Lesson 12 — Just-in-Time Access and Access Reviews

**Chapter 3 · Authorization Models at Scale · Lesson 12 of 32**

## What you'll learn

- How just-in-time (JIT) access replaces standing privilege with a limited, approved window of elevation
- How Azure PIM implements JIT role activation concretely, end to end
- What an access review (certification campaign) is, and who's actually responsible for running one
- Why access accumulates into "access creep" without either discipline in place, and why that keeps happening

## Just-in-time access: privilege for a window, not forever

Lesson 11 established why standing privileged access is a real risk — an admin account that's privileged all day is exposed all day, for a benefit it only needs for a fraction of that time. **Just-in-time (JIT) access** removes that exposure directly: instead of holding a privileged role continuously, a user requests elevation only when they actually need it, the request is approved (sometimes automatically, sometimes requiring a second person's sign-off), the privileged role activates for a defined, limited window — an hour, four hours, whatever the task genuinely requires — and then it's automatically revoked when that window closes. No one has to remember to remove the access afterward, because the system was never designed to leave it standing in the first place.

## Azure PIM: JIT activation in practice

**Azure PIM (Privileged Identity Management)**, introduced in Lesson 11 as a PAM tool, is the concrete mechanism behind JIT access in Microsoft Entra ID. An administrator who's been made *eligible* for a role — say, Global Administrator — doesn't hold that role day to day. When they actually need it, they open PIM and **activate** the role: providing a justification, often completing an MFA challenge, and sometimes waiting for an approver to sign off, depending on how the role is configured. PIM then grants the role for a time-bound window — commonly a few hours — and automatically deactivates it when the window expires, with the entire activation logged, including who activated it, why, and for how long. The person goes back to being merely *eligible*, not actively privileged, the moment the window closes — exactly the standing-access problem from Lesson 11, solved structurally rather than by policy alone.

## Access reviews: the discipline for everything that isn't JIT

JIT handles privileged roles well, but most of an organization's access — file share permissions, application roles, group memberships — isn't activated per task the way PIM-managed roles are; it's granted once and then persists. **Access reviews** (also called certification campaigns) are the periodic discipline for that persistent access: on a defined schedule — typically quarterly or semi-annually — the actual manager or resource owner responsible for a system is asked to look at who currently has access and explicitly confirm, person by person, whether that access is still needed. Anything not affirmatively confirmed gets revoked. This puts the decision in the hands of the person positioned to actually know the answer — a central IT team reviewing a list in isolation usually can't tell whether a given employee still needs access to a given finance system, but that employee's manager, or the system's resource owner, usually can.

## Why access creep happens without this discipline

**Access creep** — the slow, unintentional buildup of access nobody actively granted maliciously but that nobody ever took back either — is the default outcome of ordinary organizational life, not a rare failure. People change teams and keep their old team's access because removing it wasn't anyone's job. Someone covers for a colleague on leave and is granted temporary access that's never revoked once the colleague returns. A project wraps up and the project-specific permissions granted for it just... stay. None of these are security incidents in the moment; each one is a small, reasonable-seeming decision. Access creep is simply what happens, reliably, when there's no recurring mechanism forcing a second look — which is exactly the gap access reviews are designed to close on a schedule, instead of relying on anyone noticing on their own.

## Key terms

| Term | Meaning |
|---|---|
| Just-in-time (JIT) access | Privileged access granted only for a limited window when actually needed, then automatically revoked |
| Eligible vs. active role | In PIM, "eligible" means a role a user can activate; "active" means it's currently granted and usable |
| Access review (certification campaign) | A periodic process where managers or resource owners confirm whether existing access is still needed |
| Access creep | The gradual, unintentional accumulation of unneeded access over time, absent a mechanism that actively revokes it |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: how does Azure PIM's eligible/active distinction structurally prevent the standing-access problem from Lesson 11, and why is the resource owner or manager — not central IT — the right person to answer "does this access review line item still need this access"?
