# Lesson 21 — Data Sharing and Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every lesson in this course up to now has governed access within one Snowflake account. A share extends that same discipline across an account boundary.

## S2 · STEPS CARD (a share, governed)

A share is a named, governed window into your data for another account — no data copied, the consumer queries your storage directly, live. And critically, a share starts empty: nothing is exposed until you explicitly grant it.

## S3 · CODE CARD (creating and populating a share)

Here's the real SQL. Creating the share does nothing on its own. You grant USAGE on the database and schema so the share can see the container, then SELECT on exactly one table — object by object, no default inheritance.

## S4 · CODE CARD (adding a consumer, auditing)

A share still isn't visible to anyone until you name who can consume it, with ALTER SHARE ADD ACCOUNTS. And because this is governance, not just plumbing, GRANTS_TO_SHARES — a real ACCOUNT_USAGE view — audits every grant made to every share in your account.

## S5 · STEPS CARD (three questions)

Before you share anything: what exactly are you exposing — name the table, don't grant at the database level out of convenience. Who consumes it — treat a new consumer account like any other privileged grant. And does masking still apply — share through a secure view and its masking policy travels with it.

## S6 · OUTRO CARD

Next lesson: Data Retention and Time Travel — governance isn't just who can see data today, it's how long that data exists at all.
