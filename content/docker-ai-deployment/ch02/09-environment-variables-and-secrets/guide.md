# Lesson 9 — Environment Variables & Secrets in Containers

**Chapter 2 · Containerizing AI Applications · Lesson 9 of 25**

## What you'll learn

- The difference between an `ENV` (baked into the image) and a `-e` flag
  (supplied at runtime) — and why that difference matters for secrets
- Why a secret passed to `RUN` stays in the image forever, even if a
  later instruction deletes it
- `--env-file`, for managing more variables than fit comfortably on a
  command line
- BuildKit's `--mount=type=secret`, the one safe way to use a secret
  *during* a build without it ending up in a layer

## ENV vs. -e: baked in, or supplied at startup

Lesson 3's `ENV` instruction sets a value at build time — it becomes part
of the image, visible to anyone who pulls it. Lesson 4's `-e` flag sets a
value when a container starts — it exists only for that running
container, never written to the image:

```
# Dockerfile — baked into the image, same for every container
ENV LOG_LEVEL=info

# docker run — supplied per-container, never part of the image
docker run -e OPENAI_API_KEY=sk-... my-ai-app:1.0
```

That's the whole rule for secrets: an API key, a database password, a
model provider's token — anything that shouldn't be visible to anyone who
pulls the image — goes in as `-e` at runtime, never as `ENV` in the
Dockerfile.

## Why a RUN with a secret is a trap

A value used inside a `RUN` instruction is written into that layer
permanently — even if a *later* instruction deletes the file or unsets
the variable. The layer is immutable; deleting something in a later layer
just hides it, it doesn't remove it from the image's history:

```
# WRONG: the key is now permanently in this layer's history,
# findable with `docker history` even after the next line runs
RUN echo "sk-abc123" > /tmp/key.txt && curl -H "Authorization: Bearer $(cat /tmp/key.txt)" ...
RUN rm /tmp/key.txt   # does NOT remove it from the layer above
```

Anyone who pulls that image can inspect every layer's history and recover
the key. This is the single most common way real API keys leak from
containerized AI apps.

## `--env-file` for more than a few variables

```
# .env.production (never committed to git)
OPENAI_API_KEY=sk-...
DATABASE_URL=postgres://...
LOG_LEVEL=info
```

```
docker run --env-file .env.production my-ai-app:1.0
```

Same effect as a long chain of `-e` flags, read from a file instead —
and that file belongs in `.gitignore`, not your repository.

## Build-time secrets, done safely

Sometimes a secret is needed *during* the build itself — a private
package registry token, for example. BuildKit's `--mount=type=secret`
makes it available only for the duration of one `RUN` instruction,
without writing it into any layer:

```
RUN --mount=type=secret,id=pip_token \
  pip install --index-url https://$(cat /run/secrets/pip_token)@pypi.example.com
```

```
docker build --secret id=pip_token,src=./pip_token.txt -t my-ai-app .
```

The secret file exists only inside that one instruction's filesystem,
never committed to a layer — the safe version of the `RUN`-with-a-secret
pattern above.

## Key terms

| Term | Meaning |
|---|---|
| `ENV` | Baked into the image at build time — visible to anyone who pulls it |
| `-e` / `--env-file` | Supplied at container start — never written to the image |
| Layer history | Permanent; a later `RUN rm` hides a file, it doesn't erase it from history |
| `--mount=type=secret` | BuildKit's safe way to use a secret during a build without it landing in a layer |

## Check yourself

You're ready for Lesson 10 when you can explain: a teammate's Dockerfile
has `RUN curl -u admin:password123 https://internal.example.com/setup.sh
\| sh`, and a later line removes the setup script. Is the password still
recoverable from the built image — and how would you check?
