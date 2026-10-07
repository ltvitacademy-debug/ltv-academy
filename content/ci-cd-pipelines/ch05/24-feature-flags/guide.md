# Feature Flags

Lesson 23 made deploying safer by controlling how much *traffic* reaches new code. A feature flag controls something different: whether a feature is actually turned *on*, independent of whether it's deployed. Northbridge Retail deploys `storefront-api` constantly — often several times a day — but a new checkout feature might sit deployed and dormant for days before anyone flips it on.

## What you'll learn

- Why "deployed" and "enabled" are two separate questions once feature flags exist
- A real feature-flag SDK call, and what each piece of it actually controls
- How a flag lets a feature ship to production safely before it's finished
- The operational cost of flags, and why Northbridge Retail retires them on a schedule

## Deployed vs. enabled — two separate switches

Without feature flags, shipping a feature means: merge it, deploy it, and it's live for everyone the moment the deployment finishes — deploying and releasing are the same event. A feature flag splits that into two independent actions. The code for a new "saved payment methods" feature can be merged and deployed to production today, completely inert, and turned on for real customers next week — or for 5% of customers first, or only for Northbridge Retail's own internal test accounts.

## A real flag check in application code

```python
from feature_flags import client

def checkout_view(request, cart):
    if client.is_enabled("saved-payment-methods", context={"user_id": request.user.id}):
        return render_saved_payment_checkout(request, cart)
    return render_standard_checkout(request, cart)
```

`client.is_enabled(...)` asks the flag service, at request time, whether this specific flag is on for this specific user — not whether the code exists, which it already does on every running pod. The `context` dictionary is what lets a flag target a subset of users: internal staff first, then a percentage rollout, then everyone, all without touching this code again or triggering a new deployment.

## Why this matters for a CI/CD pipeline specifically

Feature flags change what "deploy" means to the rest of this course:

- A deployment can ship **dark** — code present, flag off, zero customer-visible change — which makes deployments themselves lower-risk, since there's no new behavior to break even if the deploy succeeds.
- A broken feature can be turned off **instantly**, without a rollback, a new build, or a pipeline run at all — flipping a flag is a config change, not a deployment.
- Testing in production becomes safer: a flag can be enabled only for Northbridge Retail's own staff accounts in the production environment, exercising real infrastructure before any customer sees the feature.

## The cost: flags aren't free

Every flag is a branch in the code (`if enabled: ... else: ...`) that has to be maintained, and a flag left in place after a feature fully ships is a permanent fork nobody needs anymore — dead code with a decision buried inside it. Northbridge Retail tracks every flag's owner and a target removal date at creation time, and treats "delete the flag and the old code path" as the actual last step of shipping a feature, not an optional cleanup task that quietly never happens.

## Key terms

| Term | Meaning |
|---|---|
| Feature flag | A runtime switch that turns a feature on or off without a new deployment |
| Dark deployment | Shipping code with its feature flag off, so the deploy itself changes nothing visible |
| Targeting / rollout | Enabling a flag for a specific subset of users rather than everyone at once |
| Flag debt | Accumulated, unused flags and dead code paths left behind after a feature fully ships |
