# Compose Basics

Northbridge Retail's checkout application needs more than one container: a web front end, an API, and a database, each built from its own image. Starting all three by hand means remembering image names, port mappings, and volume mounts for every `docker run` command -- and typing them again every time you restart. Docker Compose replaces that with a single YAML file and two commands.

## What you'll learn

- The structure of a `compose.yaml` file: `services:`, `image:`, `ports:`, `volumes:`
- How `docker compose up` and `docker compose down` manage an entire application at once
- How Compose automatically names containers and puts them on a shared network
- Why Compose runs on one host -- and where that stops being enough (more in Chapter 7)

## A minimal compose.yaml

Here's the whole Compose file for just Northbridge's product-catalog service, served as static files from nginx:

```yaml
services:
  catalog:
    image: northbridge/catalog:1.4
    ports:
      - "8080:80"
    volumes:
      - catalog-data:/usr/share/nginx/html

volumes:
  catalog-data:
```

- **`services:`** -- a top-level key listing every container the application needs. `catalog` is this service's name, and Compose uses it as the container's hostname on its private network.
- **`image:`** -- which image to run, same as the first argument to `docker run`.
- **`ports:`** -- `"8080:80"` maps host port 8080 to container port 80, identical syntax to `docker run -p`.
- **`volumes:`** -- `catalog-data` is a named volume, declared once more under the top-level `volumes:` key so Compose knows to create and track it.

## `docker compose up` and `docker compose down`

```bash
$ docker compose up -d
[+] Running 2/2
 ✔ Network ch06_default      Created
 ✔ Container ch06-catalog-1  Started

$ docker compose ps
NAME              IMAGE                     STATUS
ch06-catalog-1    northbridge/catalog:1.4   Up 4 seconds

$ docker compose down
[+] Running 2/2
 ✔ Container ch06-catalog-1  Removed
 ✔ Network ch06_default      Removed
```

`-d` runs detached, same meaning as with `docker run`. Compose also created a network (`ch06_default`, named after the project folder) so services can reach each other by name -- there was only one service here, but that network is what makes multi-container wiring possible, which Lesson 24 picks up next. `docker compose down` removes the containers and the network it created, but **not** named volumes -- `catalog-data` survives until you run `docker compose down -v`.

## Key terms

- **`compose.yaml`** -- the single file describing every service in an application
- **`services:`** -- top-level key; each entry is one container, named by its key
- **`docker compose up`** -- creates the network, then creates and starts every service
- **`docker compose down`** -- stops and removes containers and the network, keeping named volumes unless `-v` is added
- **Named volume** -- durable storage declared under the top-level `volumes:` key
