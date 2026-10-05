# Lesson 10 — Access Control Best Practices · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 10, closing Chapter 2: access control best practices — turning everything we've covered into habits worth keeping.

## S2 · CODE — Grant to groups, not individuals

Every example in this chapter has granted to groups, and that's deliberate. Five individual GRANT statements to five email addresses are five things someone has to remember to revoke later. One grant to a group turns onboarding and offboarding into a membership change, auditable in one place.

## S3 · CODE — Least privilege: the narrowest level that works

Lesson 9 showed that a grant on a catalog reaches every schema and table inside it, present and future. That's powerful, which is exactly why it should be deliberate, not default. If a team only needs one schema, grant on that schema — not the whole catalog.

## S4 · STEPS — Two habits worth keeping

Two more habits. Use the built-in account users group sparingly — it's right for something genuinely public, wrong as a shortcut to avoid setting up a proper group. And make SHOW GRANTS routine, not reactive — checking it periodically catches the grant someone made for a project that ended months ago and was never revoked.

## S5 · CODE — The chapter, in one access request

Here's the whole chapter in one realistic request: a principal needs the usage-privilege chain to reach an object it has a specific privilege on, approved by whoever owns the catalog or schema in question.

## S6 · OUTRO

That's Chapter 2 complete. Next: Chapter 3, fine-grained security — row filters, column masks, and dynamic views.
