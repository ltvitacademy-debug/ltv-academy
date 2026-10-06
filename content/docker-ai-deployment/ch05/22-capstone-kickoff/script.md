# Script — Capstone Kickoff

## Segment 1 (title)

This capstone builds one project across the next three lessons: FeedbackScope, a small service that takes customer feedback text and returns a sentiment score, using a real Hugging Face model loaded inside the container.

## Segment 2 (code: the project)

It's scoped small on purpose — one model, one endpoint, one clear job. The point of this capstone is proving you can take something real through the entire deployment pipeline, not building the most elaborate app possible.

## Segment 3 (steps: three more lessons)

Lesson 23 containerizes and deploys it. Lesson 24 adds a real autoscaling policy, a health check, and a caching decision. Lesson 25 wraps up what changed and how to talk about this project in an interview. Every lesson from here builds on the same running service — nothing gets thrown away and restarted.

## Segment 4 (code: success criteria)

Done means an image that builds cleanly from a Dockerfile you can explain line by line, pushed to a registry under a real tag, deployed with a public URL, a health check wired into the platform config, and an autoscaling policy with an explicit min and max — each with a stated reason, not just defaults left untouched.

## Segment 5 (outro)

"It works" isn't the bar here — being able to explain every configuration choice you made is. That's what actually transfers to a real job. Next up: FeedbackScope's first real build.
