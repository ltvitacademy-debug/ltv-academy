# Code Review Rubric

> Use this on your own capstone project before calling it finished, or
> trade projects with a study partner and review each other's. Six
> dimensions, each scored 1-4. There's no single passing number —
> the point is specific, honest findings per dimension, not a final
> grade. A 2 you can name exactly what to fix is more useful than a
> vague 4.

## 1. Correctness

*Does the code actually do what it's supposed to do, including the
edge cases?*

- [ ] The happy path works as designed.
- [ ] Boundary values are handled correctly (zero, the maximum, the
      very first interaction with no prior state).
- [ ] Every `require`/`revert` condition fires exactly when it should
      — not too eagerly, not too late.
- [ ] No function silently does nothing when it should revert, or
      silently succeeds when it should fail.

**Score:** 1 (doesn't work) · 2 (happy path only) · 3 (happy path + most
edge cases) · 4 (happy path + edge cases + a test proving each one)

## 2. Security

*Could this contract be exploited, drained, or permanently broken by
an adversarial user?*

- [ ] Checks-effects-interactions is followed everywhere an external
      call happens.
- [ ] Access control exists on every function that should have it —
      and its absence on any function is a stated, deliberate choice.
- [ ] No unchecked arithmetic without an explicit justification.
- [ ] No external call whose failure can block a transaction that
      should otherwise have succeeded for other parties (the
      payment-griefing pattern from this course's Worked Example 2).
- [ ] The Self-Review Security Checklist (this same download folder)
      is filled in with real findings, not left blank.

**Score:** 1 (a known, unmitigated vulnerability exists) · 2 (checklist
incomplete) · 3 (checklist complete, no known issues) · 4 (checklist
complete, plus at least one issue found and fixed during review)

## 3. Gas efficiency

*Is anything obviously wasteful, given what this project already
knows about gas?*

- [ ] No redundant storage reads inside a loop (cache a storage
      variable in memory before looping over it).
- [ ] No storage write that could be a cheaper memory/calldata
      operation instead.
- [ ] Events are used where they genuinely help (Lesson 6), not added
      or omitted carelessly.

**Score:** 1 (obviously wasteful patterns throughout) · 2 (a few
obvious inefficiencies) · 3 (reasonably efficient) · 4 (efficient, and
you can explain a specific gas tradeoff you made on purpose)

## 4. Readability

*Could someone else — or you, in six months — understand this
without asking you questions?*

- [ ] Function and variable names say what they hold or do, not `tmp`,
      `x`, `data2`.
- [ ] Non-obvious logic has a comment explaining *why*, not restating
      *what* the code already says.
- [ ] Functions do one clear thing each, rather than one long function
      doing five unrelated things.

**Score:** 1 (hard to follow even for the author) · 2 (follow-able with
effort) · 3 (clear) · 4 (clear, and a stranger could onboard from the
README + code alone, no verbal explanation needed)

## 5. Test coverage

*Does the test suite actually prove the contract is correct, not just
that it ran?*

- [ ] Unit tests cover the happy path and the explicit failure cases.
- [ ] Fuzz tests exist for any function taking a numeric input with a
      meaningful valid range.
- [ ] An invariant test exists for the one property that must never
      break, no matter what sequence of calls happens.
- [ ] `forge coverage` (or equivalent) was actually run, and a human
      read which lines/branches are uncovered — not just the summary
      percentage.

**Score:** 1 (no real tests) · 2 (unit tests only) · 3 (unit + fuzz) ·
4 (unit + fuzz + invariant, with coverage gaps actually reviewed)

## 6. Maintainability

*If this project needed a new feature added next month, how painful
would that be?*

- [ ] Configuration (fee percentages, thresholds, addresses) isn't
      hardcoded inline where it could be a named constant or
      constructor argument.
- [ ] The architecture decisions (Lesson 4/9/14-16) are documented
      well enough that a new contributor wouldn't have to reverse-
      engineer them from the code alone.
- [ ] Known limitations are stated explicitly, not discovered by
      surprise later.

**Score:** 1 (would require a rewrite) · 2 (would require significant
rework) · 3 (addable with care) · 4 (addable cleanly, and the README
already anticipates likely future additions)

## How to use this as a real review

1. Score your own project honestly, dimension by dimension, before
   showing it to anyone else.
2. If you have a study partner, trade projects and score each other's
   independently, then compare notes — disagreements are usually the
   most useful part of a review.
3. For every dimension scored below a 3, write one sentence: what's
   missing, and what you'd do about it. That sentence is the actual
   deliverable — the number alone isn't.
