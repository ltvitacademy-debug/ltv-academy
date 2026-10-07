# Running as Non-Root & Basic Hardening

By default, a process inside a container runs as root -- the same root the kernel recognizes on the host, with namespaces providing the only separation. If an attacker finds a way to break out of a container running as root, they're far closer to compromising the host than if that process never had root privileges to begin with. A few small Dockerfile and runtime changes close most of that gap.

## What you'll learn

- How `USER` in a Dockerfile switches a container off root
- What `--read-only` and `--tmpfs` protect against
- How `--cap-drop`/`--cap-add` apply least privilege to Linux capabilities
- Why a minimal base image reduces attack surface on its own

## `USER` in the Dockerfile

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node
CMD ["node", "server.js"]
```

`USER node` switches the container's running process to the non-root `node` user the official Node image already includes for exactly this purpose. `--chown=node:node` on the `COPY` matters too -- without it, the files would still be owned by `root`, and the non-root `node` user wouldn't be able to read them.

## Read-only filesystems and dropped capabilities

```bash
docker run -d \
  --read-only \
  --tmpfs /tmp \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  northbridge/storefront-api:2.1
```

- **`--read-only`** -- the container's filesystem is read-only except mounted volumes and `tmpfs` paths, so a compromised process can't rewrite the application's own code on disk.
- **`--tmpfs /tmp`** -- gives the container a small writable scratch space in memory, for whatever genuinely needs to write temporary files.
- **`--cap-drop=ALL`** -- root's power is actually a bundle of roughly 40 separate Linux capabilities; this removes every one of them.
- **`--cap-add=NET_BIND_SERVICE`** -- adds back only the single capability `api` actually needs (binding a privileged port), instead of leaving the full set.

The same thing in `compose.yaml`:

```yaml
services:
  api:
    image: northbridge/storefront-api:2.1
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
```

## Minimal base images

```text
ubuntu (full)   -- 80MB+, a full package manager and many installed
                   tools -- more for an attacker to work with if they
                   get code execution inside the container
node:20-slim    -- far fewer packages, smaller attack surface
distroless /    -- no shell, no package manager at all; even with
scratch            code execution, there's barely anything to pivot to
```

Each step down this list removes tools an attacker could otherwise use once inside a compromised container -- a shell to explore with, a package manager to install more tools with. A minimal image doesn't prevent every attack, but it meaningfully shrinks what's available after one succeeds.

## Key terms

- **`USER`** -- Dockerfile instruction setting the non-root user a container runs as
- **`--read-only`** -- makes the container filesystem read-only outside of volumes/tmpfs
- **Linux capability** -- one discrete piece of root's privileges (e.g. `NET_BIND_SERVICE`)
- **`--cap-drop` / `--cap-add`** -- remove all capabilities, then add back only what's needed
- **Minimal base image** -- an image with fewer packages and tools, reducing what's available to an attacker
