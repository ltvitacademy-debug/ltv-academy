# Docker Hub & Private Registries

Every image Northbridge has pulled so far — `node`, `ubuntu`, `postgres` — came from the same place: Docker Hub, the default public registry Docker talks to unless told otherwise. This lesson flips the direction. Instead of only pulling other people's images, Northbridge pushes its own `northbridge/catalog` image to Docker Hub so the rest of the team — and the production servers — can pull it too.

## What you'll learn

- What a registry actually is, and why Docker Hub is the default one
- How to authenticate with `docker login`
- The full push workflow: `docker tag`, then `docker push`
- The real difference between a public and a private repository

## Registry vs. repository

A **registry** is a server that stores and serves images — Docker Hub is one, and it's been the quiet destination behind every `docker pull` in this course so far. Inside a registry, each image name like `northbridge/catalog` is a **repository**, and every tag pushed to it (`1.4`, `1.5`, `latest`) is a version living inside that one repository.

## Signing in with `docker login`

```text
$ docker login
Username: northbridgeretail
Password: ************
Login Succeeded
```

`docker login` stores a token locally so later `docker push` and `docker pull` commands against Hub are already authenticated — you don't retype credentials for every command.

## Tagging for Docker Hub, then pushing

A locally built image isn't automatically connected to a Hub repository. `docker push` only knows where to send an image once its tag starts with your Docker Hub namespace:

```text
$ docker tag northbridge/catalog:1.4 northbridgeretail/catalog:1.4
$ docker push northbridgeretail/catalog:1.4
The push refers to repository [docker.io/northbridgeretail/catalog]
a1b2c3d4e5f6: Pushed
f6e5d4c3b2a1: Pushed
1.4: digest: sha256:9d8c7b6a5e4f3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c size: 1788
```

Anyone — or any server — can now run `docker pull northbridgeretail/catalog:1.4` and get exactly that image.

## Public vs. private repositories

Creating a repository on Docker Hub asks for a visibility setting:

- **Public** — appears in Docker Hub search results, and anyone can pull it without logging in. Fine for open-source base images, wrong for an e-commerce company's proprietary checkout code.
- **Private** — invisible in search, pullable only by accounts you've explicitly granted access to. A free Docker Hub account includes a limited number of private repositories; Northbridge pays for more as the number of internal images grows.

Northbridge keeps `northbridgeretail/catalog` and `northbridgeretail/checkout` private — the images contain their actual application code, not something meant for the public internet.

## Key terms

- **Registry** — a server that stores and serves container images (Docker Hub is the default)
- **Repository** — a named collection of tagged versions of one image (`northbridgeretail/catalog`)
- **`docker login`** — authenticates the Docker CLI against a registry
- **`docker tag`** — creates a new tag pointing at an existing local image, often to prefix it with a registry namespace
- **`docker push`** — uploads a tagged image to the registry named in its tag
- **Private repository** — a repository only accessible to accounts explicitly granted access
