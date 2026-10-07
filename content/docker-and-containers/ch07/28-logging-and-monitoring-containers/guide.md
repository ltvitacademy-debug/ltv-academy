# Logging & Monitoring Containers

Everything a containerized process writes to stdout and stderr becomes that container's logs. For Northbridge's `catalog` and `api` containers, that's the first place to look when something breaks -- but the defaults have limits worth knowing before they cause a problem of their own.

## What you'll learn

- The default `json-file` logging driver, and the more efficient `local` driver
- How to cap log growth with `max-size` and `max-file`
- `docker logs -f --tail` and `docker stats` for day-to-day debugging
- Why logs eventually need to be centralized off the container entirely

## Logging drivers: `json-file` and `local`

```bash
$ docker inspect --format='{{.HostConfig.LogConfig.Type}}' storefront-api
json-file
```

`json-file` is the default: every line a container writes to stdout/stderr is appended to a JSON file on the host's disk. Left unconfigured, that file has no size cap -- a noisy or looping container can genuinely fill up host disk over time. The `local` driver fixes that by using a more compact binary format with log rotation built in by default:

```yaml
services:
  api:
    image: northbridge/storefront-api:2.1
    logging:
      driver: local
      options:
        max-size: "10m"
        max-file: "3"
```

`max-size: "10m"` caps each log file at 10 MB; `max-file: "3"` keeps at most 3 rotated files before the oldest is discarded -- a hard ceiling of roughly 30 MB of logs per container, however long it runs.

## `docker logs` and `docker stats`

```bash
$ docker logs -f --tail 50 storefront-api
2026-10-07T14:02:11Z INFO  listening on :4000
2026-10-07T14:02:15Z INFO  GET /api/products 200 14ms

$ docker stats --no-stream
CONTAINER ID   NAME             CPU %   MEM USAGE / LIMIT   MEM %
a1b2c3d4e5f6   storefront-api   2.14%   84.2MiB / 512MiB    16.4%
```

`-f` follows new log lines as they're written; `--tail 50` starts from the last 50 lines instead of the whole history. `docker stats` shows live resource usage -- and the `MEM USAGE / LIMIT` column is exactly Lesson 27's `--memory` cap in action: `api` is using 84.2 MiB against the 512 MiB ceiling that was set.

## Centralizing logs, conceptually

```text
One host     -- docker logs works fine checking one container at a time
Many hosts   -- that stops scaling once Northbridge's stack spans more
               than one machine; nobody wants to SSH into five servers
               to find one error
A fix        -- a log driver (gelf, fluentd) or a sidecar agent ships
               every container's logs to one central aggregator, so
               the whole stack is searchable from one place
```

Northbridge doesn't need this yet on a single host, but it's the natural next step once the storefront stack grows past one machine -- which is exactly where Lesson 30's orchestration preview picks up.

## Key terms

- **Logging driver** -- the mechanism Docker uses to capture and store a container's stdout/stderr
- **`json-file`** -- the default driver; unbounded unless `max-size`/`max-file` are set
- **`local`** -- a more efficient driver with log rotation enabled by default
- **`docker logs -f --tail`** -- follow live logs, starting from recent history
- **`docker stats`** -- live per-container CPU and memory usage
