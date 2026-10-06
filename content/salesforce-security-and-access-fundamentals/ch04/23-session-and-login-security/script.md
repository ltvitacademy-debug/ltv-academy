# Script — Session and Login Security

## Segment 1 (title)

Every lesson so far has been about what a logged-in user can see and do. This one is about the layer underneath that: whether the session itself is actually secure, independent of what permissions the user holds.

## Segment 2 (code: the Session Settings page)

Setup's Session Settings page controls session timeout, whether timeout forces a real server-side logout, locking a session to its originating IP, HTTPS enforcement, and clickjack protection — separate from Sharing Settings and from any individual profile, applying org-wide.

## Segment 3 (steps: timeout and IP locking)

A shorter timeout is more secure but more disruptive — a real tradeoff, not a default to leave unexamined. And locking a session to its IP stops a stolen token from being replayed on a different network, at the cost of breaking sessions for legitimately mobile users switching networks mid-session.

## Segment 4 (steps: High Assurance and MFA)

High Assurance lets you require a stronger authentication level for specific sensitive actions, even when the user's normal session only reached Standard — the same narrowing idea as restriction rules, applied to authentication strength instead of records. And MFA — a second factor beyond password — has been required for direct UI logins org-wide since 2022. It's not optional anymore; it's what makes the rest of this course's assumption, that the logged-in user is who they say they are, actually safe to make.

## Segment 5 (code: Health Check)

Health Check, in Setup, compares an org's actual settings — session settings, password policies, and more — against Salesforce's recommended baseline, scores it 0 to 100, and lets you fix many findings in one click. It's a reasonable first stop on an unfamiliar org, the automated cousin of the audit from Lesson 20.

## Segment 6 (outro)

Session timeout, IP locking, High Assurance, mandatory MFA, and a dashboard that scores the whole picture. One lesson left: preparing for the Sharing and Visibility Architect path, and where this course hands off.
