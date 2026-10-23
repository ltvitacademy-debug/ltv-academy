# Lesson 1 — The ServiceNow Release Cycle

**Chapter 1 · Application Lifecycle Management · Lesson 1 of 26**

## What you'll learn

- Why ServiceNow ships new platform releases on a regular, ongoing cadence
- Why staying on a supported release is the customer's responsibility, not something ServiceNow handles for you
- The specific risk an upcoming release poses to a custom scoped application
- Why validating against a new release before the production upgrade happens is standard practice, not optional caution

## Releases keep coming — this isn't a one-time migration

Every course so far in this path has treated "the instance" as a stable thing you build on. It
isn't static. ServiceNow ships major platform releases on a real, regular periodic cadence —
historically on the order of a couple of times a year — each one a named release that updates the
underlying platform: new features, UI changes, security defaults, and, critically, changes to
which APIs are current, deprecated, or removed entirely. Every customer's instances eventually
move onto each new release in turn. This is not a special project a company opts into once; it is
an ongoing fact of life for anyone running on the platform.

## Who actually owns the upgrade

ServiceNow performs the technical work of moving an instance onto a new release. But *planning*
and *validating* that move is squarely the customer's responsibility. ServiceNow does not keep
every past release supported forever — older releases eventually reach end of support, which means
a customer who falls too far behind loses vendor support and patches for the release they're
stuck on. Staying current enough to remain on a supported release is something a customer has to
actively manage, release after release, not something that happens automatically in the
background.

## What this means for a developer building custom applications

For anyone writing scripts, business rules, or scoped applications — which, by this point in the
path, is you — an upcoming release carries a specific, concrete risk: code that relies on a
deprecated or soon-to-be-deprecated API. A script written against an older API can run perfectly
for years and then fail, silently or loudly, the moment a release finally removes what it depended
on. The practical discipline is straightforward: watch release notes for deprecation warnings, and
avoid building new work against anything already flagged as on its way out, even if it still works
today.

## The pre-upgrade sandbox: validating before it's real

The standard way organizations protect themselves is a dedicated pre-upgrade sandbox instance — a
sub-production instance ServiceNow upgrades to the new release *ahead* of production, specifically
so the customer can test real custom applications, integrations, and customizations against it
before anyone touches the live environment. If a scoped application breaks under the new release,
it breaks there first, with time to fix it, not in production on upgrade day. This pattern —
test the upcoming release on a disposable instance before the real upgrade — is the first concrete
piece of application lifecycle management this course covers, and it sets up exactly why the next
lesson's instance strategy matters so much.

## Key terms

| Term | Meaning |
|---|---|
| Platform release | A named, periodic update to the ServiceNow platform itself, shipped to every customer in turn |
| Deprecated API | An API flagged as being phased out; it may still work today but can be removed in a future release |
| End of support | The point at which ServiceNow stops supporting an older release, pressuring customers to upgrade |
| Pre-upgrade sandbox | A sub-production instance upgraded to a new release early, so custom work can be validated before production is touched |

## Check yourself

Without looking back: whose job is it to make sure a company stays on a release ServiceNow still
supports, and what's the specific risk an upcoming release poses to a scoped application that was
written against an API now flagged as deprecated?
