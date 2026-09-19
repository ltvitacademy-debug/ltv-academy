# Script — Principle of Least Privilege

## Segment 1 (title)

The fast, common, wrong answer to "the app can't read this table" is adding it to db_owner. It works immediately, which is exactly the problem -- nobody ever confirms what access was actually needed.

## Segment 2 (code: the anti-pattern)

That app service account can now drop tables and read every row of every table, because one query needed to read one table. This is the single most common real-world permissions mistake a DBA inherits from someone else's shortcut.

## Segment 3 (code: the actual discipline)

Start with an account that can do nothing, then add exactly what the app's real queries require, confirmed by reading the code, not guessed. Every permission traces back to a real, specific need.

## Segment 4 (steps: why the anti-pattern happens anyway)

Time pressure, nobody owning the cleanup, and fear of breaking something by narrowing access later. All three keep db_owner grants alive long after the reason for them is gone.

## Segment 5 (outro)

Least privilege is a habit, not a setup step -- audit what's used, grant additively, and revisit access as roles change. Next up: troubleshooting login, authentication, and permission problems.
