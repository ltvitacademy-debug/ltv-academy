# Lesson 105 — Local vs. Global Temp Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Lesson 93 introduced hash temp tables as one of your three
intermediate-storage options. There's actually a second flavor — and
knowing the difference matters more than it might seem.

## S2 · CODE CARD (local)

A single pound sign creates a LOCAL temp table. It's visible only to the
session that created it — the one connection — plus anything that session
calls. Open a second query window on the same server, and it can't see it
at all. It's automatically cleaned up the moment that session disconnects.

## S3 · CODE CARD (global)

A DOUBLE pound sign creates a GLOBAL temp table. This one is visible to
EVERY session connected to the server, not just the one that made it. A
second query window, a totally different connection, can read it just
fine. It only gets dropped once the creator disconnects AND nobody else
is still using it.

## S4 · CODE CARD (risk)

That cross-session power is also the risk. Any connection can read and
write it, so two sessions can genuinely collide with each other. And
there's only one global temp table with that exact name across the whole
server — a naming collision between two unrelated scripts is a real
possibility. For most needs, a real permanent table is just the safer
choice.

## S5 · OUTRO CARD

Local for your own session's work, global only when you specifically need
to share across connections and you understand the risk. Next lesson: SQL
Server Profiler — watching every query hit the server in real time. See
you there.
