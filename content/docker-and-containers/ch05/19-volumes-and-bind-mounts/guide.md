# Volumes & Bind Mounts

Every container filesystem so far has been disposable — stop the container, and anything written inside it is gone. That's fine for a stateless app, but Northbridge's product-catalog database can't lose its data every time its container restarts. This lesson covers Docker's two answers to that problem: named volumes and bind mounts.

## What you'll learn

- Why a container's own filesystem can't be trusted to keep data
- Named volumes, and how `-v` persists a database's data directory across restarts
- Bind mounts, and when mounting a host directory in makes more sense than a volume
- The difference between the shorter `-v` syntax and the more explicit `--mount` syntax

## The problem: containers are disposable

```text
$ docker run -d --name catalog-db postgres:16
$ docker exec catalog-db sh -c 'echo saved > /var/lib/postgresql/data/test.txt'
$ docker rm -f catalog-db
$ docker run -d --name catalog-db postgres:16
$ docker exec catalog-db cat /var/lib/postgresql/data/test.txt
cat: /var/lib/postgresql/data/test.txt: No such file or directory
```

A fresh container starts from the image's original filesystem every time — any write made inside the old container's writable layer disappeared along with it. Northbridge's product-catalog data can't survive on that basis.

## Named volumes: Docker-managed storage

A **named volume** is storage Docker creates and manages outside any single container's lifecycle. Mounting one into Postgres's data directory means the data outlives the container entirely:

```text
$ docker volume create catalog-db-data
catalog-db-data

$ docker run -d --name catalog-db \
  -v catalog-db-data:/var/lib/postgresql/data \
  postgres:16

$ docker rm -f catalog-db
$ docker run -d --name catalog-db \
  -v catalog-db-data:/var/lib/postgresql/data \
  postgres:16
```

The second `catalog-db` container mounts the exact same volume as the first, so every row the first container's Postgres wrote is still there. The container is disposable; `catalog-db-data` isn't.

## Bind mounts: a host directory, mapped straight in

A **bind mount** maps a specific path on the host machine into the container, instead of a Docker-managed volume. Northbridge's engineers use this during local development, mounting their own source code into the catalog container so edits on the host show up inside it instantly:

```text
$ docker run -d --name catalog-dev \
  -v /home/dev/northbridge/catalog/src:/app/src \
  -p 8080:3000 \
  northbridge/catalog:1.5
```

Unlike a named volume, Docker doesn't manage this path — it's just the host's own filesystem, visible from both sides at once.

## `-v` vs. `--mount`

Both flags do the same job; `--mount` is longer but every part is an explicit key:

```text
$ docker run -d --name catalog-db \
  --mount type=volume,source=catalog-db-data,target=/var/lib/postgresql/data \
  postgres:16
```

`-v catalog-db-data:/var/lib/postgresql/data` is the shorthand for exactly that. `--mount` is harder to get wrong on a long command with several mounts, which is why Northbridge's deploy scripts favor it even though `-v` is faster to type by hand.

## Managing volumes

```text
$ docker volume ls
DRIVER    VOLUME NAME
local     catalog-db-data

$ docker volume inspect catalog-db-data
[
    {
        "Name": "catalog-db-data",
        "Driver": "local",
        "Mountpoint": "/var/lib/docker/volumes/catalog-db-data/_data"
    }
]

$ docker volume rm catalog-db-data
```

`docker volume rm` only works on a volume no container currently uses — a safety rail against accidentally deleting data something is still relying on.

## Key terms

- **Named volume** — storage Docker creates and manages, independent of any single container's lifecycle
- **Bind mount** — a host filesystem path mounted directly into a container
- **`-v host:container`** — shorthand flag for mounting either a named volume or a bind mount
- **`--mount`** — the longer, explicit-key syntax for the same thing
- **`docker volume ls` / `inspect` / `rm`** — list, inspect, and remove named volumes
