# Lesson 9 — Data in Non-Production Environments

**Chapter 2 · Managing Environments · Lesson 9 of 14**

## What you'll learn

- Why copying real production data into a sandbox is a risk decision, not a free convenience
- The specific exposure Partial Copy and Full sandboxes create
- How sandbox access and sandbox data risk compound each other
- Why "it's just a sandbox" undersells what's actually at stake
- How this connects forward into Lesson 10's data masking and Lesson 11's access controls

## Real data doesn't stop being sensitive just because it's in a sandbox

Lesson 3 covered Partial Copy and Full sandboxes as the types that carry real production records. It's easy to think of that data as somehow lower-stakes once it's in a sandbox — after all, a sandbox is "just for testing." That instinct is wrong, and it's the starting point for this lesson: a customer's name, email, Social Security number, or health information is exactly as sensitive sitting in a sandbox as it is sitting in production. Copying it doesn't reduce its sensitivity; it just creates a second place that sensitive data now lives, with its own access list and its own risk of exposure.

This matters because sandboxes are, in practice, often treated with far less rigor than production. Sandbox credentials get shared more casually. Sandbox access lists grow faster because "it's just a sandbox" lowers everyone's guard. A sandbox can sit around for weeks between refreshes with the exact same real customer data production had on the day it was copied — meaning a sandbox is sometimes the *least* protected place an organization's most sensitive data exists, which is the opposite of what its "just for testing" reputation would suggest.

## The specific exposure

Two sandbox types create this exposure directly: a Partial Copy sandbox carries a sampled subset of real records, and a Full sandbox carries all of production's data, including anything sensitive production itself holds. Anyone with login access to either of those sandboxes can potentially see real customer PII, financial data, or health information — regardless of whether that person would ever be granted access to see the same data in production. A support engineer debugging a sandbox issue, a contractor doing short-term configuration work, or a partner firm helping with a one-off project might all reasonably need sandbox access without ever needing (or being approved for) access to that same data in production.

## Why access and data risk compound

This is why sandbox data risk and sandbox access control (covered fully in Lesson 11) can't really be considered separately. A Full sandbox holding real customer data, with a loosely managed access list that nobody has reviewed in months, is a materially bigger risk than either problem alone — not because the two risks simply add together, but because a wide-open access list turns "sensitive data exists in this sandbox" into "sensitive data is actually exposed to people who shouldn't see it." Shrinking either side of that equation reduces the real risk: fewer people with access, or less (or less sensitive) real data present.

## This is exactly what Lesson 10 exists to reduce

The standard way to shrink the data side of this risk — without giving up the realistic testing that Partial Copy and Full sandboxes exist to provide — is **data masking**: transforming real sensitive values into realistic-looking but fake ones once they land in a non-production environment, so testing still works against realistic data shapes without exposing anyone's actual personal information. That's the entire subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Sandbox data exposure | The risk created when real production records are copied into a non-production environment with its own, often looser, access controls |
| "Just a sandbox" assumption | The mistaken belief that data is lower-risk once it's copied into a sandbox |

## Lab

A company's Partial Copy sandbox was created eight months ago to support a project that finished within a few weeks. The sandbox hasn't been refreshed or reviewed since, and a contractor who worked on that original project still has an active login. Using what this lesson covered, identify exactly what's wrong with this picture from a data-risk standpoint (name both contributing factors), and describe what you'd check first to assess how serious the exposure actually is.

## Check yourself

Can you explain why the sensitivity of a piece of data doesn't change just because it's been copied from production into a sandbox? Can you describe, in your own words, why sandbox access control and the presence of real data in a sandbox are risks that compound each other rather than simply adding up independently?
