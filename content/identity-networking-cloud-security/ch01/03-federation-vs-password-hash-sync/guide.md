# Lesson 3 — Federation vs. Password Hash Sync

**Chapter 1 · Hybrid Identity: Connecting On-Prem AD to the Cloud · Lesson 3 of 32**

## What you'll learn

- What Password Hash Sync (PHS) actually does, and what "a hash of the hash" means in practice
- What Federation (such as AD FS) does differently — why the cloud never sees the password at all
- The real operational tradeoffs: PHS is simpler to run, Federation keeps authentication fully on-prem
- Where Pass-Through Authentication fits as a real third option worth knowing about

## Password Hash Sync: Entra ID verifies you directly

**Password Hash Sync (PHS)** is the default authentication method Microsoft Entra Connect uses.
Entra Connect takes the password hash already stored in on-prem AD and runs it through an
additional round of hashing before syncing that result — a hash of the hash — to Entra ID, on a
schedule of its own (independent of the main 30-minute object sync, running every couple of
minutes for changed passwords). When a user signs into a cloud service, Entra ID checks their
entered password against that stored, re-hashed value directly in the cloud. No on-prem domain
controller is contacted at sign-in time at all.

## Federation: the cloud redirects the login back on-prem

**Federation**, most commonly using **AD FS (Active Directory Federation Services)**, works the
opposite way. Entra ID is configured to trust an on-prem federation server for the organization's
domain. When a user tries to sign in, Entra ID doesn't prompt for a password itself — it redirects
the browser to the on-prem AD FS server. The user authenticates there, checked against AD the same
way they would be for any other on-prem resource, and AD FS issues a signed token back to Entra ID
asserting who the user is. Entra ID trusts that assertion and lets the sign-in proceed. The
password — or even its hash — never leaves the on-prem network and never touches Entra ID.

## Real tradeoffs

**PHS** requires no extra servers to build or patch, it's simple to operate, and cloud sign-in
keeps working even if the on-prem network goes down, since the hash was already synced ahead of
time — which is why Microsoft treats it as the recommended default for most organizations.

**Federation** keeps every authentication decision on-prem, which some regulatory or compliance
requirements genuinely demand, and it can integrate with additional on-prem-only authentication
methods AD FS supports. The cost is real: it requires building and maintaining an AD FS server
farm (plus proxy servers for external access), it's a more complex topology to operate, and if that
AD FS infrastructure goes down, cloud sign-ins go down with it — on-prem becomes a hard dependency
for cloud access, not just a convenience.

## Pass-Through Authentication as a real third option

Worth knowing even though this lesson's focus is the two main approaches: **Pass-Through
Authentication (PTA)** is a middle ground. A lightweight on-prem agent validates the entered
password directly against on-prem AD in real time, for every sign-in — no password hash is ever
stored in the cloud at all — but it doesn't require the full AD FS server farm that Federation
does.

## Example: a company with a regulatory requirement

A healthcare or financial organization subject to a compliance requirement that passwords must
never leave the corporate network might choose, or already run, AD FS federation specifically to
satisfy that rule, even though it means operating additional servers. A small business with no
such requirement would typically choose Password Hash Sync instead, simply because there's nothing
extra to build or maintain.

## Key terms

| Term | Meaning |
|---|---|
| Password Hash Sync (PHS) | Entra Connect syncs a hash of the password hash to Entra ID; sign-in is verified directly in the cloud |
| Federation (e.g. AD FS) | Sign-in requests are redirected to an on-prem federation server; the cloud never receives the password or its hash |
| Pass-Through Authentication (PTA) | A lightweight on-prem agent validates the password against AD in real time, without storing a hash in the cloud or requiring a full AD FS farm |
| AD FS | Active Directory Federation Services — Microsoft's on-prem federation server role most commonly paired with federated sign-in |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why does Password Hash Sync keep
working for cloud sign-ins even if the on-prem network goes down, while Federation does not?
