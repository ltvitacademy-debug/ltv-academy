# Lesson 22 — Capstone Kickoff

**Chapter 5 · Capstone · Lesson 22 of 25**

## What you'll learn

- The one project this capstone builds across Lessons 23-25, and why it's
  deliberately small
- Exactly which decisions from Chapters 1-4 this project will force you
  to make for real
- What "done" looks like — the concrete success criteria for the capstone
- Why a small, finished, deployed project beats a bigger, half-built one
  for a portfolio

## The project: FeedbackScope

This capstone builds **FeedbackScope** — a small FastAPI service that
takes a piece of customer feedback text and returns a sentiment score and
label, using a real Hugging Face transformers sentiment model loaded
inside the container. It's intentionally scoped small: one model, one
endpoint, one clear job — because the point of this capstone is proving
you can take something real through the *entire* deployment pipeline, not
building the most elaborate possible app.

```
POST /analyze
  { "text": "Support fixed my issue in five minutes, fantastic." }

  -> { "label": "POSITIVE", "score": 0.98 }
```

## What this project will force you to decide

```
Lesson 23 — Containerizing & Deploying:
  - Dockerfile (Ch.1) with the model weights baked in or
    downloaded at build time (Lesson 8's trade-off, for real)
  - multi-stage build (Lesson 10) to keep the image reasonable
  - push to a registry, deploy to a cloud container service (Lesson 12)

Lesson 24 — Adding Autoscaling:
  - a real autoscaling policy with a min floor (Lessons 17-18)
  - a health check endpoint the platform can actually call
  - a decision about caching repeat requests (Lesson 19)

Lesson 25 — Wrap-Up:
  - what changed between the first deploy and the final one
  - how to talk about this project in an interview
```

Every lesson from here on adds to the *same* running service — nothing
gets thrown away and restarted. By Lesson 25, FeedbackScope is a
containerized, deployed, autoscaled service you built decision by
decision, not a tutorial you followed once and can't explain.

## Success criteria for this capstone

```
- Image builds cleanly from a Dockerfile you can explain line by line
- Image is pushed to a registry under a real tag (not just "latest")
- Service is deployed to a cloud container service with a public URL
- Health check endpoint exists and is wired into the platform config
- Autoscaling policy has an explicit min AND max, with a stated reason
  for each number -- not just defaults left untouched
```

"It works" isn't the bar — "you can explain every configuration choice
you made, and why" is. That's what actually transfers to a real job.

## Key terms

| Term | Meaning |
|---|---|
| FeedbackScope | This capstone's project: a small sentiment-analysis API |
| Scoped small | One model, one endpoint, deliberately simple -- finished beats elaborate |
| Success criteria | The concrete, checkable bar for "the capstone is done" |

## Check yourself

You're ready for Lesson 23 when you can state, in one sentence each, what
FeedbackScope does and why this capstone was deliberately kept to one
model and one endpoint instead of something bigger.
