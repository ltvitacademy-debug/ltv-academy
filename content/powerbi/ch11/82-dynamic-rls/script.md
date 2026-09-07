# Lesson 82 — Dynamic Row-Level Security · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Forty territories would mean forty static roles. Dynamic RLS solves
that with just one.

## S2 · CODE: [UserEmail] = USERPRINCIPALNAME()

One role, one filter, adapting to whoever's actually signed in —
matched against a small user-mapping table you add to the model.

## S3 · CODE: Desktop: DOMAIN\username -> Service: user@contoso.com

Here's the classic bug: USERNAME and USERPRINCIPALNAME return
different formats in Desktop versus the service. Your mapping table
has to match the service's format, not what you saw while testing.

## S4 · IMAGE: row-level-security-test-role.png

Test as role validates the filter logic. Select it from the role's
More options — you're redirected to the underlying report, since
dashboards can't be tested this way.

## S5 · IMAGE: row-level-security-test-role-2.png

Now viewing as lets you test a role, a combination, or a specific
person. But remember: it still runs the dynamic function using your
own identity, not theirs.

## S6 · OUTRO CARD

That's the whole pattern working. Lesson 83 covers what happens when
RLS meets a genuinely complex model — bidirectional relationships and
beyond.
