# Rollback Planning

## What you'll learn

- Why "we'll roll it back if something goes wrong" is often a false promise for a major
  in-place upgrade
- What a real rollback plan actually consists of
- Why a fresh, verified backup immediately before any change is the one non-negotiable step

## The uncomfortable truth about rollback

For a minor change — a Cumulative Update, a configuration tweak — rollback is usually
realistic: uninstall the CU, or revert the setting. For a **major version in-place upgrade**,
it is often not realistic at all. Once setup.exe has upgraded the system databases and the user
databases have been touched by the new engine, there is generally no supported path to
downgrade a database back to the older version. SQL Server does not support attaching or
restoring a database backed up on a newer major version onto an older one — the on-disk format
and internal metadata move forward, not backward.

This is the single most important fact in this lesson, and it's one some DBAs learn the hard
way: **"rollback" for an in-place major upgrade almost always means restoring from a backup
taken before the upgrade, onto a separately available instance still running the old version —
not reversing the upgrade in place.** If that old-version instance and that pre-upgrade backup
don't both exist, there is no rollback, only "keep pushing forward and fix problems on the new
version."

## What a real rollback plan contains

A rollback plan that will actually work under pressure has concrete, verified pieces, not good
intentions:

1. **A full backup taken immediately before the change**, on the old version, verified restorable
   (not just "the backup job ran" — actually test-restore it, ideally to the same staging
   instance used for upgrade testing in the previous lesson).
2. **A place to restore it to that is ready before you need it** — either the original instance
   left untouched (side-by-side migration, Lesson 60) or a separate old-version instance kept
   available specifically as a fallback target.
3. **A defined decision point and decision-maker** — how long after the upgrade will you wait
   before declaring success, who has the authority to call "roll back," and what specific
   symptoms trigger that call. Deciding this in the moment, under pressure, is how bad calls get
   made.
4. **A tested cutover-back procedure** — how applications get re-pointed to the fallback
   instance, and how long that actually takes. If nobody has ever practiced it, the "plan" is a
   guess.

## Why side-by-side migration is the real safety net

This is why Lesson 60's recommendation — side-by-side migration over in-place upgrade for
anything business-critical — is really a rollback strategy in disguise. When the new version
runs on a new instance and the old instance is left running and untouched, "rollback" is just
re-pointing applications back to where they were: fast, tested, and genuinely reversible. An
in-place upgrade forces you to depend entirely on backup-and-restore as your only way back,
which works, but is slower and carries the operational risk of any large restore under time
pressure.

## Key terms

| Term | Meaning |
|---|---|
| Rollback (major upgrade) | Restoring a pre-upgrade backup to a still-available old-version instance — not reversing the upgrade in place |
| Verified/test-restored backup | A backup that has actually been restored somewhere to confirm it works, not just confirmed to have completed |
| Decision point | The pre-agreed time and symptom threshold at which a rollback is triggered, decided before the change, not during it |
| Cutover-back procedure | The tested steps for re-pointing applications to a fallback instance |

## Check yourself

A team plans an in-place major-version upgrade for Friday night with "we'll just roll it back
if there's a problem" as the entire rollback plan. What is actually going to happen if the
upgrade causes serious problems, and what should have been in place instead?
