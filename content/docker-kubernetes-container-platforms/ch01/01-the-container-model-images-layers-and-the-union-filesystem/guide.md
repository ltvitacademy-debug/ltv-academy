# Lesson 1 — The Container Model: Images, Layers, and the Union Filesystem

**Chapter 1 · Docker for Platform Engineers · Lesson 1 of 4**

## What you'll learn

- What a Docker image actually is on disk: a stack of immutable,
  content-addressed **layers**, not a single file
- How the **union filesystem** (overlay2 on modern Linux hosts)
  merges those layers into one filesystem view at runtime
- The difference between an image layer and the thin **writable
  layer** a running container adds on top
- How to read `docker history` and `docker inspect` to see the real
  layer stack behind any image you pull

You already know how Terraform separates a declarative description
(HCL) from the engine that reconciles it against real infrastructure.
Docker images work on a similar split: a Dockerfile is the
declaration, and the image it produces is a reconciled, immutable
artifact — except instead of API calls, what gets produced is a stack
of filesystem diffs.

## An image is a stack of layers, not a file

Pull almost any image and Docker doesn't download one blob — it
downloads several:

```
docker pull nginx:1.27
```

```
1.27: Pulling from library/nginx
a378f10b3218: Pull complete
6e68a2eb3c8f: Pull complete
e9afc3e03ddb: Pull complete
e2bf0969d615: Pull complete
7f65d19cb81e: Pull complete
Status: Downloaded newer image for nginx:1.27
```

Each of those lines is a **layer** — a tarball of filesystem changes
(files added, modified, or marked deleted) relative to the layer
beneath it. The hash identifying each one isn't arbitrary: it's a
SHA-256 digest of that layer's own content, which is what "content-
addressed storage" means in practice. Pull the same base layer through
two different images and Docker only stores it once, because the hash
is identical either way — that's the mechanism behind the "Already
exists" lines you see when a second image shares layers with one you
already have.

`docker history` shows you that stack for any image already on disk:

```
docker history nginx:1.27
```

```
IMAGE          CREATED        CREATED BY                                      SIZE
f5a6b2c3d4e5   2 weeks ago    CMD ["nginx" "-g" "daemon off;"]                 0B
<missing>      2 weeks ago    STOPSIGNAL SIGQUIT                              0B
<missing>      2 weeks ago    EXPOSE 80                                       0B
<missing>      2 weeks ago    COPY docker-entrypoint.sh / # buildkit          1.2kB
<missing>      2 weeks ago    RUN /bin/sh -c set -x && addgroup...            68.1MB
<missing>      2 weeks ago    ENV NGINX_VERSION=1.27.0                        0B
<missing>      3 weeks ago    /bin/sh -c #(nop) CMD ["bash"]                   0B
```

Each row is one layer, in the order the Dockerfile instructions that
produced it ran. Rows with `0B` didn't change any files — metadata-
only instructions like `CMD`, `ENV`, and `EXPOSE` don't touch the
filesystem, so they don't create a filesystem layer at all, just a
config entry. The `RUN` line that installs packages is where the real
size lives.

## The union filesystem merges them at runtime

None of those layers get unpacked into one combined folder on disk.
Instead, the Docker storage driver — **overlay2** on virtually every
modern Linux host — stacks them using the kernel's `overlayfs` and
presents a single merged view to anything running inside the
container. Each layer is mounted read-only; overlayfs walks the stack
top-down and, for any given file path, serves whichever layer's
version is topmost. A file deleted in a later layer is represented by
a special "whiteout" marker, not actually erased from the layer
beneath it — which is exactly why a deleted file in a late Dockerfile
instruction doesn't shrink the image: the bytes are still sitting in
an earlier, read-only layer.

You can see the mount points directly on a Docker host:

```
docker inspect --format '{{json .GraphDriver}}' nginx:1.27
```

```json
{
  "Data": {
    "LowerDir": "/var/lib/docker/overlay2/3f2b.../diff:/var/lib/docker/overlay2/9a1c.../diff",
    "MergedDir": "/var/lib/docker/overlay2/7e4d.../merged",
    "UpperDir": "/var/lib/docker/overlay2/7e4d.../diff",
    "WorkDir": "/var/lib/docker/overlay2/7e4d.../work"
  },
  "Name": "overlay2"
}
```

`LowerDir` is the colon-separated stack of read-only image layers.
`UpperDir` is the one layer that actually matters once you run the
image: the container's own writable layer.

## The writable layer: what makes a container different from an image

An image is just layers sitting on disk — nothing is running, nothing
is writable. The moment you `docker run` that image, Docker adds one
more layer on top: a thin, container-specific **writable layer** where
every file write, create, or delete during that container's life
actually lands. The image layers underneath never change. This is
copy-on-write in practice: if a process in the container modifies a
file that exists in a lower, read-only layer, overlay2 copies that
file up into the writable layer first, then applies the change there
— the original in the image is untouched.

That's why ten containers started from the same image share the exact
same read-only layers on disk, and only the thin writable layer per
container differs. It's also why container storage is disposable by
design: `docker rm` deletes the writable layer and nothing else. If
you need data to outlive the container, it has to live outside that
writable layer entirely — in a **volume**, which Lesson 4 covers.

## Why this matters once you're writing Dockerfiles

Every instruction in a Dockerfile that touches the filesystem — `RUN`,
`COPY`, `ADD` — produces one new layer in this stack. Nothing about an
instruction is special beyond that: a `RUN` that installs an entire
toolchain and a `RUN` that touches one file are both "one layer,"
sized however big the resulting diff is. Layers are cached by the
instruction and its inputs, and once any layer's cache is invalidated,
every layer after it has to rebuild too, because each one is a diff
*relative to* the one before. That single fact — layers are ordered,
cached, and cumulative — is the entire reason Dockerfile instruction
order is a performance decision and not just a stylistic one. Lesson 2
builds directly on it.

## Key terms

| Term | Meaning |
|---|---|
| Layer | An immutable, content-addressed (SHA-256) filesystem diff; one Dockerfile instruction that touches disk produces one layer |
| overlay2 | Docker's storage driver on modern Linux; uses the kernel's overlayfs to merge read-only layers into one view |
| Writable layer | The one layer added when a container starts; every runtime file change lands here, never in the image layers |
| Copy-on-write | Modifying a file from a lower read-only layer copies it into the writable layer first, leaving the original untouched |
| `docker history` | Shows an image's layer stack, in build order, with each layer's size and the instruction that produced it |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does deleting a file in a later Dockerfile instruction not reduce the
final image size, and what's the actual difference between an image's
layers and a running container's writable layer?
