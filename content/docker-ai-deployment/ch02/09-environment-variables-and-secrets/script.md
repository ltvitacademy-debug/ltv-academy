# Script — Environment Variables & Secrets in Containers

## Segment 1 (title)

ENV, from Lesson 3, bakes a value into the image at build time — visible to anyone who pulls it. The dash-e flag, from Lesson 4, supplies a value only when a container starts. That difference is the whole rule for secrets.

## Segment 2 (code: ENV vs -e)

An API key, a database password, a provider token — anything that shouldn't be visible to anyone who pulls the image — goes in as dash-e at runtime. Never as ENV in the Dockerfile.

## Segment 3 (code: RUN with a secret)

Here's the trap: a value used inside a RUN instruction gets written into that layer's history permanently — even if a later instruction deletes the file. The layer is immutable. Deleting something afterward just hides it, it doesn't remove it. Anyone who pulls the image can recover it from the layer history. This is the single most common way real API keys leak from containerized apps.

## Segment 4 (code: env-file)

For more variables than fit comfortably on a command line, dash-dash-env-file reads them from a file instead of a long chain of flags. And that file belongs in gitignore, never in the repository.

## Segment 5 (code: build-time secrets)

And when a secret is needed during the build itself — a private package token, say — BuildKit's mount-type-secret makes it available only for the duration of one RUN instruction, without writing it into any layer. That's the safe version of the trap from before.

## Segment 6 (outro)

Bake configuration in with ENV; supply secrets at runtime, never at build time. Next up: shrinking the image all of this produces, with multi-stage builds.
