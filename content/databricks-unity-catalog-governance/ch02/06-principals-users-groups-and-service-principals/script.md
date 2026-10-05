# Lesson 6 — Principals: Users, Groups and Service Principals · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter 2 starts here: principals — the users, groups, and service principals you'll actually be granting access to.

## S2 · STEPS — Who's on the other side of TO

Every GRANT statement ends with TO and a principal. Unity Catalog recognizes exactly three kinds. A user is a human, identified by their account email address. A group is a named collection of users, managed at the account level. And a service principal is a non-human identity for automated workloads — identified by its application ID, a UUID, not an email.

## S3 · CODE — Referencing each type in SQL

Here's the same GRANT SELECT statement, three ways. A user by email. A group by name. A service principal by its application ID. Databricks requires backticks around any principal name with special characters — and an email address always has one, so users and service principals are almost always backtick-quoted in practice.

## S4 · STEPS — Why service principals exist

A human's credentials shouldn't be embedded in a scheduled job or a CI/CD pipeline. If that person leaves or rotates their password, the automation either breaks or keeps running on stale, over-broad access. A service principal fixes this: an identity that exists independently of any one person, scoped only to what that automated process actually needs.

## S5 · CODE — The broadest possible grant

Unity Catalog ships one group you don't have to create: account users, which includes literally everyone on the account. Granting to it is the broadest possible grant — fine for something genuinely public, but Lesson 10's best practices will tell you to use it sparingly.

## S6 · OUTRO

Next lesson: privileges and GRANT — what you can actually grant a principal once you know who they are.
