# Lesson 24 — Web Application Attacks: Injection and XSS Basics

**Chapter 6 · Common Attack Types & Social Engineering · Lesson 24 of 32**

## What you'll learn

- How SQL injection turns unsanitized user input into a way to manipulate a database query
- How Cross-Site Scripting (XSS) gets malicious script to execute in another user's browser
- Why both attacks trace back to the same root cause: trusting user input
- Why input validation and sanitization are the real-world defense, not a nice-to-have

## The common root cause: trusting input

Both attacks in this lesson exist for the same underlying reason: a web application
took data a user typed into a form field or URL and used it directly, without checking
or cleaning it first, in a place where that data could change how the application
behaves. That single design mistake — trusting input instead of validating it — is the
root cause behind an enormous share of real-world web application breaches, which is
exactly why input validation and sanitization show up as the top defensive
recommendation in nearly every web security framework, including the OWASP Top 10 that
guides modern application security work.

## SQL injection: unsanitized input manipulating a database query

**SQL injection (SQLi)** happens when user-supplied input gets inserted directly into
a SQL query without being validated or escaped first, allowing an attacker to alter the
structure and meaning of that query. Conceptually: imagine a login form builds its
database query by directly pasting in whatever the user typed for a username, with no
checking. If the application trusts that input completely, a carefully crafted string
in that field can change the query's logic — for example, making a condition that was
supposed to require a correct password evaluate as true regardless of what password was
entered. The attacker never needs to guess a password; they manipulate the query's
logic instead. Depending on the privileges of the database account the application uses,
successful SQL injection can expose, modify, or delete data far beyond what the form was
ever meant to touch.

## Cross-Site Scripting (XSS): malicious script in someone else's browser

**Cross-Site Scripting (XSS)** happens when an attacker gets a malicious script
injected into a web page that other users will later view, so that the script executes
inside those other users' browsers — not the attacker's. A common scenario: a comment
field on a page stores whatever a user submits and displays it back to every visitor
without sanitizing it first. If an attacker submits a comment containing script instead
of plain text, and the application renders it as live code rather than as inert text,
that script runs in the browser of everyone who views the comment, with that browser's
own trust in the site intact — which is what makes XSS dangerous for stealing session
data or performing actions on a victim's behalf without their knowledge.

## Why input validation and sanitization are the real defense

Both attacks only work because input was trusted somewhere it shouldn't have been. The
practical fix on the defense side is **input validation** (checking that input matches
what's actually expected — a username shouldn't contain SQL syntax, a comment shouldn't
contain executable script) combined with **output encoding/sanitization** (treating
user-supplied content as data to display, never as code to run). Parameterized queries,
which separate a query's structure from the data plugged into it, close off SQL
injection at the database layer; encoding user input before rendering it back to a page
closes off XSS at the display layer. Neither defense is exotic — both are standard,
well-documented practices — which is exactly why so many real breaches trace back to a
form that simply skipped them.

## Key terms

| Term | Meaning |
|---|---|
| SQL injection (SQLi) | Unsanitized user input inserted directly into a SQL query, altering the query's logic |
| Cross-Site Scripting (XSS) | Malicious script injected into a page so it executes in another user's browser |
| Input validation | Checking that submitted input matches the format and content actually expected |
| Sanitization / output encoding | Treating user-supplied content as display data rather than executable code |
| OWASP Top 10 | A widely used reference list of the most critical web application security risks |

## Check yourself

A web application takes a search box's input and inserts it directly into a database
query with no checking, and a different page displays user comments exactly as typed,
with no encoding. Which specific vulnerability does each of those two design choices
create, and what's the one defensive principle that would close both?
