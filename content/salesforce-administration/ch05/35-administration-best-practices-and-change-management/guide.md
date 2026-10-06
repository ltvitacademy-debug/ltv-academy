# Administration Best Practices and Change Management

**Chapter 5 · Administration in Practice · Lesson 35 of 36**

Every lesson so far has covered a specific feature — a setting, a page, a related list. This
lesson is different: it's about how the features in Chapters 1 through 5 actually get used
together, day to day, by an admin who's trying not to break anything. None of this is a new
button to click. It's judgment, built from everything already covered.

## What you'll learn

- Why "build it in production" is the single most common mistake new admins make
- How the tools from earlier chapters chain together into one real change-management habit
- What to check before making a change, not just after
- Why documentation is a discipline, not an afterthought

## Never build directly in production

Chapter 5 opened with Sandboxes for a reason: every change — a new field, a Flow, a page layout
edit — belongs in a sandbox first, not production. This isn't caution for its own sake. A change
that looks obviously safe can still have a side effect an admin didn't anticipate: a validation
rule that blocks an integration's API inserts, a Flow that fires more often than expected, a
page layout change that hides a field a different team depends on. A sandbox is where that
surprise happens to nobody real.

## The full loop, chained together

The individual pieces from this chapter aren't separate tools — they're stages of one loop:

1. **Build and test in a sandbox** — never production, no exceptions for "it's a small change."
2. **Move it with a Change Set** (or a more advanced deployment tool) — deliberately, reviewed,
   never by rebuilding the same change by hand in production and hoping it matches.
3. **Watch for Release Updates** that might affect the change before or after it ships — a
   platform behavior shift can interact with something just deployed in ways neither change
   anticipated alone.
4. **Check Setup Audit Trail and Login History** afterward if anything looks off — they're the
   fastest way to confirm what actually changed and who was logged in when it happened.

Skipping any one of these doesn't usually cause an immediate problem. It's the accumulation —
untested changes, undocumented ones, unreviewed release updates — that eventually produces an org
nobody fully understands anymore.

## Change management is a habit, not a form

"Change management" sounds like paperwork, but at its simplest it's three questions asked before
every change, not after:

- **What exactly is changing, and why?** Not "fixing the Lead process" — the specific field,
  rule, or Flow, and the specific problem it solves.
- **Who else does this affect?** A field change on Opportunity might affect a report, a Flow, an
  integration, and three different profiles' page layouts, not just the one team that asked for it.
- **How would this get rolled back if it's wrong?** If the honest answer is "I'm not sure,"
  that's a sign to slow down before deploying, not after something breaks.

## Documentation isn't optional once an org has more than one admin

A setting changed six months ago, with no note of why, is a trap for the next admin — including a
future version of the same admin who's forgotten the context. A short, consistent habit (a
change log, a comment on the Flow, a description field actually filled in) costs almost nothing in
the moment and saves real time later, the first time someone has to ask "why is this here?" and
an actual answer exists.

## Why this matters

Every individual feature in this course — profiles, Flow-adjacent settings, page layouts, related
lists, sandboxes, change sets — is something a new admin can learn in an afternoon. What takes
longer to build is the judgment to combine them safely: test first, deploy deliberately, watch for
platform changes, verify with the audit tools when something looks wrong, and leave a trail for
whoever comes next. That judgment is what actually separates a junior admin from a senior one.

## Key terms

| Term | Meaning |
|---|---|
| Change management | The discipline of testing, reviewing, and documenting changes before they reach production |
| Rollback plan | A deliberate answer, decided before deploying, to "how do we undo this if it's wrong?" |
| Build-in-production | The anti-pattern of making changes directly in the live org instead of a sandbox first |
| Documentation habit | Recording what changed and why, consistently, so later admins don't have to guess |

## Check yourself

An admin is asked to make "a quick field change" directly in production to save time. What are
the two or three questions worth asking before agreeing to that shortcut?
