# Lesson 2 — REST Fundamentals · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

REST stands for Representational State Transfer. It's not a protocol or
a piece of software — it's an architectural style, a set of conventions
for designing APIs. Most APIs you'll touch in this course, including AI
provider APIs, call themselves RESTful.

## S2 · STEPS CARD (three ideas)

Three ideas make an API RESTful. Resources: everything is a noun — a
user, an order — addressed by its own URL. Statelessness: every request
carries everything the server needs; nothing is remembered between
calls. Standard verbs: instead of inventing action names, REST reuses
GET, POST, PUT, PATCH, and DELETE.

## S3 · CODE CARD (resource URLs)

Here's resource-based design in practice. The user with id 42 lives at
slash users slash 42. Order 1001 lives at slash orders slash 1001.
Compare that to an older style — post slash get user by id, question
mark, id equals 42 — where the action is crammed into the URL instead of
the resource living there cleanly.

## S4 · STEPS CARD (statelessness in practice)

Statelessness is the one that surprises people. Every single request
carries its own auth token, even if you sent one five seconds ago. The
server remembers nothing about you between calls. That's actually a
feature — it means any server in a pool can handle any request, with
nothing "sticky" to one machine.

## S5 · OUTRO CARD

Resources, statelessness, standard verbs — that's REST. Next lesson, we
go deep on those verbs themselves: GET, POST, PUT, PATCH, DELETE, and
the status codes that tell you what actually happened.
