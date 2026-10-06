# Script — Capstone: Containerizing & Deploying a Real AI App

## Segment 1 (title)

This lesson gives FeedbackScope a real Dockerfile, builds it, pushes it, and deploys it — the first full pass through everything Chapters 1 through 3 covered, on one actual project.

## Segment 2 (code: builder stage)

Stage one, the builder, installs every Python package, including any compilers pip needs along the way. None of those build tools make it into the final image — only the installed packages get copied forward into stage two.

## Segment 3 (code: runtime stage)

Stage two is the actual runtime image. That RUN line downloads and caches the model weights at build time, not on the first request — trading a bigger image for a running container that never pays a model-download delay later on.

## Segment 4 (code: build, tag, push)

Build it, tag it with a real version — v1, not latest — and push it to the registry. A specific version tag is what gives Lesson 16's rollback strategy something concrete to roll back to.

## Segment 5 (code: deploying it)

Deploying is Lesson 12's two-screen pattern again: point the platform at the pushed image and the port it listens on, and wire in a real health check endpoint for the platform to poll.

## Segment 6 (outro)

This deploy is deliberately minimal — one instance, platform defaults, no caching. That's exactly what's missing, and exactly what Lesson 24 adds next: a real autoscaling policy.
