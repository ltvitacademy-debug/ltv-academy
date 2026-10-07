# CMD vs. ENTRYPOINT

Lesson 11 used `CMD ["node", "server.js"]` and left it at that. There's a second instruction, `ENTRYPOINT`, that looks similar but behaves differently — and understanding both is what lets Northbridge build one image that behaves sensibly by default but is still flexible for different environments.

## What you'll learn

- Exec form vs. shell form, and why exec form is almost always the right choice
- What `CMD` alone does, and how `docker run` can override it entirely
- What `ENTRYPOINT` alone does, and how it resists being overridden
- How combining `ENTRYPOINT` + `CMD` gives you a fixed command with overridable default arguments

## Exec form vs. shell form

```dockerfile
CMD ["node", "server.js"]        # exec form
CMD node server.js                # shell form
```

Exec form (the JSON array) runs the command directly as the container's main process, PID 1 — it receives signals like `SIGTERM` from `docker stop` directly. Shell form wraps the command in `/bin/sh -c`, which becomes PID 1 instead; signals go to the shell, not necessarily to `node`. Northbridge standardizes on exec form everywhere, specifically so `docker stop` can shut the app down cleanly.

## `CMD` alone — a fully overridable default

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY . .
CMD ["node", "server.js"]
```

```text
$ docker run northbridge/catalog:1.4
$ docker run northbridge/catalog:1.4 node debug.js
```

With only `CMD` set, `docker run` can replace the entire command by appending one — the second line above runs `node debug.js` instead of `node server.js`, no questions asked. That's useful for a one-off debugging session against the catalog image.

## `ENTRYPOINT` alone — a fixed command

```dockerfile
ENTRYPOINT ["node", "server.js"]
```

```text
$ docker run northbridge/catalog:1.4
$ docker run northbridge/catalog:1.4 --inspect
```

`ENTRYPOINT` is not replaced by arguments on `docker run` — they're appended to it instead. `docker run ... --inspect` doesn't override `node server.js`; it runs `node server.js --inspect`. Good for an image that should always run the same program, accepting only extra flags.

## Combining them — the Northbridge pattern

```dockerfile
ENTRYPOINT ["node", "server.js"]
CMD ["--port=3000"]
```

```text
$ docker run northbridge/catalog:1.4
# runs: node server.js --port=3000

$ docker run northbridge/catalog:1.4 --port=4000
# runs: node server.js --port=4000
```

`ENTRYPOINT` fixes the program; `CMD` supplies default arguments that `docker run` can still override by appending its own. This is the pattern Northbridge actually ships: the catalog image always runs `node server.js`, but the port is a default, not a hard rule.

## Key terms

- **Exec form** — `["cmd", "arg"]`; runs as PID 1 and receives signals directly
- **Shell form** — `cmd arg`; runs inside `/bin/sh -c`, which becomes PID 1 instead
- **`CMD`** — the default command, fully replaced if `docker run` supplies one
- **`ENTRYPOINT`** — the fixed command; arguments on `docker run` are appended, not substituted
- **`ENTRYPOINT` + `CMD`** — a fixed program with overridable default arguments
