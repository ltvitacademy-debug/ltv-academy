# Lesson 7 — Deployment & Wrap-Up · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lessons four through six gave you a working pipeline, but it's still
just functions in your own scripts. This lesson makes it reachable: an
API, then a container.

## S2 · STEPS CARD (from function to service)

A working pipeline that nobody else can call yet isn't a service.
Wrapping it in an API, then a container, is what turns it into
something a reviewer or teammate can actually run and hit.

## S3 · CODE CARD (minimal API)

One endpoint is enough here. A post to slash ask takes a question and
returns whatever answer_question already returns — the API layer
doesn't change what the pipeline does, it just makes it reachable over
HTTP.

## S4 · CODE CARD (Dockerfile)

Containerizing this is exactly what this path's Docker and AI
Deployment course covers — packaging a Python AI app and handling
environment variables and secrets in containers. Apply it here instead
of re-deriving it.

## S5 · STEPS CARD (secrets)

That ANTHROPIC_API_KEY line in the Dockerfile documents that the
container expects the variable — it does not set a real key. Pass the
actual value at run time, through docker run or your platform's
secret manager, never baked into the image.

## S6 · STEPS CARD (README)

A reviewer should be able to learn four things from your README
without running anything: the architecture, your measured evaluation
numbers before and after tuning, your stated tradeoffs and
out-of-scope list, and exactly how to run it.

## S7 · OUTRO CARD

Project 1 is complete. Next chapter: Project 2, an AI data analyst
that turns a natural-language question into safe SQL and combines it
with live API data.
