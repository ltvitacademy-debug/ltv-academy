# Lesson 20 — Feature Flags and Decoupling Deploy from Release

**Chapter 5 · Advanced CI/CD Pipeline Design · Lesson 20 of 4**

## What you'll learn

- Why "deploy" and "release" are two different decisions, not one
  event
- How a feature flag lets new code reach production inert, and turns
  on for users as a completely separate, controlled action
- How flags combine with the canary and progressive-delivery
  mechanics from this chapter instead of replacing them
- How to read a real flag check in application code and a flag
  targeting rule

## Deploy and release are not the same event

Everything so far in this chapter — multi-stage pipelines, canary,
blue-green, automated analysis — operates at the infrastructure
level: which version of the code is running, and how much traffic
reaches it. **Deploy** means the new code is now running somewhere in
production. **Release** means users can actually see and use the new
behavior. Those sound like the same thing, and in a naive pipeline
they are — the moment code deploys, whatever it does is immediately
visible to whoever hits it. Feature flags exist to break that
coupling on purpose.

## What a feature flag actually is

A feature flag is a runtime check in the application — usually
backed by a flag-management service (LaunchDarkly and the open-source
Unleash are two real examples; the vendor-neutral `OpenFeature`
standard defines a common SDK interface across providers) — that
decides, per request, whether a given code path runs:

```javascript
const flags = await flagClient.getContext(request.userId);

if (flags.isEnabled("new-checkout-flow")) {
  return renderNewCheckout(request);
} else {
  return renderLegacyCheckout(request);
}
```

The new checkout code can be fully deployed to 100% of production
servers while `new-checkout-flow` stays off for everyone. Deploying
it and turning it on are now two separate actions, separated by as
much time as you want — minutes, or months.

## Why decoupling them is worth the extra moving part

With deploy and release coupled, every deploy is also a release,
which means every deploy carries release-level risk: if the new code
has a problem, your only options are rolling back the entire deploy
or living with it. Decoupling them gives you options a rollback
doesn't:

- **Deploy continuously, release deliberately.** New code can ship to
  production constantly — the normal CI/CD cadence from earlier in
  this chapter — without every deploy forcing a user-facing change at
  the same moment.
- **Targeted rollout.** A flag can be enabled for 5% of users, for
  internal staff only, or for one specific customer account, entirely
  independent of which servers are running the code.
- **Instant kill switch.** If a released feature turns out to be
  broken, flipping the flag off is immediate — no redeploy, no
  waiting for a pipeline to run, no rollback of infrastructure at all.

## A real flag targeting rule

```json
{
  "flag": "new-checkout-flow",
  "defaultValue": false,
  "rules": [
    { "if": "user.segment == 'internal'", "serve": true },
    { "if": "user.id in rollout_bucket(5)", "serve": true }
  ]
}
```

This is the same percentage-rollout idea as canary, but it operates
at the application layer, based on who the user is, instead of at the
infrastructure layer, based on which pods receive the request. The
two mechanisms aren't competitors — a canary rollout can gradually
shift infrastructure traffic to a new version while that version's
risky new feature stays behind a flag, released to only 5% of users
regardless of how much infrastructure traffic has shifted.

## What this chapter's tools still can't catch

Multi-stage pipelines, canary and blue-green, and automated rollback
all operate on deployed code and infrastructure-level traffic. None
of them can tell you how users actually behave once a feature is
fully released and visible — a bug in business logic that only
surfaces at real usage volume, or a feature that's technically
correct but confusing, won't show up in an error-rate query. That's
exactly why release is kept as its own deliberate decision, made
after deploy, instead of assumed to be the same moment.

## Key terms

| Term | Meaning |
|---|---|
| Deploy | New code is now running in production infrastructure |
| Release | Users can actually see and use the new behavior — a separate decision from deploy |
| Feature flag | A runtime check that decides, per request or per user, whether a code path executes |
| Kill switch | Turning a released feature off instantly by flipping its flag, with no redeploy |

## Check yourself

You're ready to move on when you can explain, in one sentence, why a
team that already has canary deployments and automated rollback still
benefits from feature flags — what does a flag let you control that
infrastructure-level traffic shifting cannot?
