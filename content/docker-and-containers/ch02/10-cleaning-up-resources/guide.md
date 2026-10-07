# Cleaning Up Resources

Every pull, build, and stopped container leaves something behind. Left unchecked, a development machine that's been running Northbridge's containers for a few months quietly fills up with images nobody uses anymore and containers nobody remembered to remove. This lesson covers how to see what's actually taking up space, and how to reclaim it safely.

## What you'll learn

- How to see disk usage broken down by images, containers, and volumes with `docker system df`
- What a "dangling" image actually is, and why it exists
- The specific prune commands for containers, images, volumes, and networks
- Why `docker system prune` deserves caution before you run it

## Seeing what's using space: `docker system df`

```text
$ docker system df
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          14        3         4.8GB     3.9GB (81%)
Containers      6         2         340MB     280MB (82%)
Local Volumes   3         1         1.2GB     900MB (75%)
```

That `RECLAIMABLE` column is the number that matters — on a machine that's been building Northbridge's catalog and checkout images repeatedly, it's common to see most of the disk usage sitting in images and containers nobody is actively using.

## Dangling images

```text
$ docker images -f dangling=true
REPOSITORY   TAG       IMAGE ID       SIZE
<none>       <none>    9f3a1b2c4d5e   412MB
```

A dangling image is one with no tag pointing to it anymore — usually the previous version of an image after you rebuild it with the same tag (`northbridge/catalog:latest`, say). The old layers still exist on disk under a new, untagged ID; Docker just stopped calling them `catalog:latest`. They're not corrupted or broken, just orphaned.

## Targeted cleanup commands

```text
$ docker container prune      # removes all stopped containers
$ docker image prune          # removes dangling images only
$ docker image prune -a       # removes all images not used by any container
$ docker volume prune         # removes volumes not attached to any container
$ docker network prune        # removes networks not used by any container
```

Each of these only touches one category, and each asks for confirmation before deleting anything. Northbridge's engineers run `docker container prune` and `docker image prune` (without `-a`) regularly — safe cleanup that never touches an image still backing a container they might restart.

## `docker system prune` — the blunt instrument

```text
$ docker system prune -a --volumes
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all volumes not used by at least one container
  - all images without at least one container associated to them
Are you sure you want to continue? [y/N]
```

This one command does all of the above at once, and with `-a --volumes` it's as aggressive as cleanup gets — including images you haven't rebuilt in a while but might still need. Read the warning before typing `y`; on a shared build machine, someone else's not-yet-used image or volume is exactly what this command removes.

## Key terms

- **`docker system df`** — shows disk usage broken down by images, containers, and volumes
- **Dangling image** — an untagged image left behind after a tag was reassigned to a new build
- **`docker image prune`** — removes dangling images only, unless run with `-a`
- **`docker system prune`** — removes stopped containers, unused networks, unused volumes, and unused images in one pass
