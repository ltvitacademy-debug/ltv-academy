# Lesson 4 — Model & API Key Security

**Chapter 1 · AI-Specific Security Risks · Lesson 4 of 25**

## What you'll learn

- Why an exposed AI API key is worse than a typical leaked credential
- The most common, entirely preventable way keys end up exposed
- How model weights themselves become a theft target, not just the key
- A concrete checklist for keeping keys and models secure

## Why this is worse than a typical leaked credential

A leaked database password usually has a blast radius you can reason about: whatever that database holds. A leaked AI provider API key is different — it's effectively a leaked payment method with no spending cap you set in advance, attached to a compute-intensive product. Someone who finds your key can run large bills on your account, flood your rate limits so your own application stops working, or use your account's access to a model you've fine-tuned on proprietary data.

## The most common mistake: client-side exposure

By far the most common way an AI API key leaks is the simplest: it gets embedded directly in client-side code — a web app's JavaScript bundle, a mobile app's binary — where anyone can extract it by opening dev tools or decompiling the app. This isn't a sophisticated attack; it's a five-minute discovery for anyone who looks. The fix is architectural, not a "try harder" fix: the key should never leave your server. The browser or mobile app calls your backend; your backend calls the AI provider.

## Keys committed to source control

The second most common leak: a developer hardcodes a key "just for testing" and commits it, and it ends up in git history forever — even if a later commit removes it, the key is still recoverable from history unless the repository is rewritten. Automated bots scan public GitHub repositories specifically for exposed API keys within minutes of a push.

## Model weights as a theft target

For teams that fine-tune or host their own models, the model's weights are themselves valuable intellectual property — they encode training effort, proprietary data, and sometimes trade secrets about how a company solved a hard problem. Weight theft looks like ordinary infrastructure security: who can reach the storage bucket or server the weights live on, and with what permissions. It's less an "AI-specific" new risk and more a reminder that AI artifacts deserve the same access-control rigor as any other high-value asset.

## A concrete checklist

- **Never put a provider API key in client-side code.** Always proxy through your own backend.
- **Use scoped, short-lived keys where the provider supports them**, rather than one all-powerful key used everywhere.
- **Run secret scanning in CI** so a committed key gets caught before it merges, not after it's public.
- **Set spending caps and rate limits** on every key, so a leak is expensive, not catastrophic.
- **Rotate keys on any suspected exposure**, and have a documented process for doing it fast.
- **Control access to model weights and training data** with the same rigor as any other sensitive production asset.

## Key terms

| Term | Meaning |
|---|---|
| Client-side exposure | An API key embedded in code that runs in the user's browser or device |
| Secret scanning | Automated CI tooling that flags credentials before a commit merges |
| Scoped key | A credential limited to specific actions or resources, not full account access |

## Lab

Pick a web or mobile app you use that has an AI feature. Open your browser's network tab (or a mobile proxy tool, if you're comfortable with one) while using that feature. Can you see any request headers or URLs that look like they might carry a credential? You're not trying to extract anything — just building the habit of checking where a key could be exposed before you ship your own AI feature.

## Check yourself

Can you explain, in your own words, why putting an AI API key in client-side JavaScript is fundamentally different from a typical "don't hardcode secrets" best practice — what makes the AI case specifically costly?
