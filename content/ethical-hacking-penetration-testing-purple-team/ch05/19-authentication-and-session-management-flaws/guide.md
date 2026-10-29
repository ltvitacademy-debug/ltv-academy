# Lesson 19 — Authentication and Session Management Flaws

**Chapter 5 · Web Application Penetration Testing · Lesson 3 of 4**

## What you'll learn

- How predictable or weakly generated session tokens let an attacker
  guess or brute-force their way into someone else's active session
- Why a session that's still valid after logout is a real, commonly
  missed finding — and how to test for it
- The specific ways a password reset flow breaks: predictable reset
  tokens, no expiration, and user enumeration through response
  differences
- How these map to **A07:2025 Authentication Failures** in the current
  OWASP Top 10, continuing directly from Lesson 17's checklist

## Session tokens: entropy is the whole defense

A session token's only job is being unguessable. If a token is a
sequential integer, a timestamp, or an MD5 hash of the username, an
attacker doesn't need to steal it — they can predict it. A real test
starts by capturing several tokens issued back-to-back (log in and out
repeatedly, or open several sessions) and looking for a pattern: is the
value increasing predictably? Does it change by a fixed offset? Decoding
a token that *looks* random — base64 or hex — and checking whether it's
actually a timestamp or a counter underneath is a standard early step.
A session token needs to come from a cryptographically secure random
generator with enough entropy that brute-forcing it is computationally
infeasible within the token's lifetime — not just "look" random to the
eye.

## Logout should actually end the session

This is one of the most commonly missed findings because it's invisible
in normal use: a user clicks "log out," the UI redirects to the login
page, and the session *looks* over. The real test is simple and often
skipped — capture the session cookie or token **before** logging out,
then log out, then replay that captured token directly against an
authenticated API endpoint. If the server still honors it, the
application only cleared the cookie client-side and never actually
invalidated the session server-side. The fix is server-side session
invalidation on logout — the token has to be revoked in a session
store or database, not just cleared from the browser. The same test
matters for password changes: changing a password should invalidate
every other active session for that account, not just the one that
changed it.

## Password reset flows: where account takeover hides

A password reset flow is a second, often weaker authentication path
into an account, and testers treat it that way. Three specific failures
show up constantly:

- **Predictable reset tokens** — the same entropy problem as session
  tokens, applied to the one-time link emailed to a user. A reset token
  built from a timestamp or a short numeric code is guessable within a
  realistic brute-force window.
- **Missing or excessive expiration** — a reset token that never
  expires, or stays valid for days, gives an attacker who intercepts an
  old email (or finds one in a shared inbox) a long window to use it.
- **User enumeration via response differences** — if "reset password
  for an email that exists" and "reset password for an email that
  doesn't" return different response times, different error text, or
  different status codes, an attacker can enumerate every valid account
  on the system before ever touching a password.

A thorough test also checks whether the reset link itself, once used,
is single-use and whether it's tied to the specific account it was
issued for — a reset token usable against *any* account, not just the
one it was emailed to, is a critical finding.

## Key terms

| Term | Meaning |
|---|---|
| Session token entropy | How unpredictable a session identifier is; low entropy (sequential IDs, timestamps) makes a token guessable rather than requiring theft |
| Server-side session invalidation | Revoking a session in the server's own store on logout or password change, not merely clearing the client-side cookie |
| A07:2025 Authentication Failures | The current OWASP Top 10 category covering weak lockout policy, session fixation, and broken password reset/MFA flows |
| User enumeration | Discovering which accounts exist by observing differences in an application's responses to valid vs. invalid identifiers |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: how
does replaying a captured token after logout reveal a server-side
invalidation flaw, and what three specific failures make a password
reset flow exploitable?
