# Lesson 18 — SQL Injection and Cross-Site Scripting in Practice

**Chapter 5 · Web Application Penetration Testing · Lesson 2 of 4**

## What you'll learn

- How SQL injection actually happens at the query level, and the
  difference between error-based, UNION-based, and blind (boolean/
  time-based) injection
- How to test whether an application's parameterized queries are
  actually implemented everywhere they're needed, not just claimed
- How reflected, stored, and DOM-based XSS differ, and how a tester
  picks a payload based on exactly where attacker input lands
- Why every payload in this lesson is run only against an explicitly
  authorized test target inside a signed scope — never anywhere else

## SQL injection: where the query breaks

A SQL injection exists the moment untrusted input gets concatenated
directly into a query string instead of being passed as data. A classic
login form built like this:

```sql
SELECT * FROM users
WHERE username = '" + username + "' AND password = '" + password + "'
```

lets an attacker submit `' OR '1'='1' -- ` as the username. The query
becomes a tautology — `'1'='1'` is always true — and the `--` comments
out the rest of the line, so the password check never happens. That's
**authentication-bypass injection**, the simplest case. From there, a
tester walking an authorized assessment works through three broader
techniques:

- **Error-based injection** — feeding in characters like a lone `'`
  and reading the database error message the app leaks back. A verbose
  MySQL or MSSQL error naming a table or column is a tester's first
  confirmation that input reaches the query unsanitized.
- **UNION-based injection** — once you know the query is vulnerable,
  appending `UNION SELECT` with a matching column count lets you pull
  data from *other* tables into the same response the application
  already renders back to you.
- **Blind injection** — when the app shows no errors and no extra data,
  you ask the database yes/no questions indirectly: a **boolean-blind**
  payload like `' AND 1=1 --` vs `' AND 1=2 --` changes the page's
  behavior based on the answer, and a **time-blind** payload like
  `' AND SLEEP(5) --` confirms injection by making the response visibly
  slower when the condition is true.

## Testing whether parameterized queries are really there

Parameterized queries (prepared statements) are the actual fix — the
database driver binds user input as data, never as part of the SQL
text, so a submitted `'` can't break out of its slot. The tester's job
isn't to assume an app "uses an ORM so it's fine." It's to verify that
every input path — including ones a framework makes it easy to skip,
like raw SQL fragments inside an ORM's `.raw()` escape hatch, dynamic
SQL built inside a stored procedure, or a sort-column parameter taken
straight from a query string — actually goes through parameter binding.
**Parameterized query bypass testing** means deliberately targeting
those overlooked paths: `ORDER BY` clauses, dynamic table/column names,
and second-order injection, where a value stored safely in one request
gets pulled back out and concatenated unsafely in a *later* query.

## Cross-site scripting: payload depends on where you land

XSS happens when attacker-supplied input is reflected into a response
and executed as code by the victim's browser instead of being treated
as inert text. The three forms differ in where the payload lives:

- **Reflected XSS** — the payload rides in the request (a URL
  parameter, a search box) and comes straight back in the response,
  affecting only whoever clicks a crafted link.
- **Stored XSS** — the payload is saved server-side (a comment, a
  profile field) and executes for every user who later views that
  stored content — far higher impact, since no individual link needs
  to be clicked.
- **DOM-based XSS** — the payload never touches the server at all; a
  client-side script reads something attacker-controlled (like
  `location.hash`) and writes it unsafely into the page.

A tester's starting payload against an authorized target is usually
something inert and self-confirming, like `"><script>alert(document.domain)</script>`,
adjusted to the exact injection context: inside an HTML attribute,
inside a `<script>` block, or inside plain HTML body text each need a
different escape sequence to break out cleanly. Confirming the alert
fires proves execution; a real finding then documents exactly which
parameter, which context, and whether a Content Security Policy blocked
or allowed it.

## Staying inside authorized scope

Every payload above is destructive only in the sense that it proves a
flaw exists — none of it is run anywhere except an explicitly in-scope
test target under a signed Rules of Engagement, per Chapter 1. Stored
XSS payloads in particular must be cleaned up after confirmation, since
leaving a live payload sitting in a client's production data is itself
a finding you don't want to cause.

## Key terms

| Term | Meaning |
|---|---|
| SQL injection | Untrusted input concatenated into a query string instead of bound as data, letting an attacker alter the query's logic |
| Blind injection | SQL injection confirmed with no visible error or extra data, via boolean or time-based (`SLEEP`) side effects |
| Parameterized query | A query where user input is bound as data by the driver, never inserted into the SQL text itself — the actual fix for injection |
| Reflected / Stored / DOM-based XSS | XSS classified by where the malicious payload lives: in the request, saved server-side, or handled entirely client-side |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: how
does a time-based blind SQL injection payload prove injection exists
with no visible error, and why does "the app uses an ORM" not by itself
guarantee it's safe from injection?
