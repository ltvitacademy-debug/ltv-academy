## Segment 1 (title)

Everything a container writes to stdout and stderr becomes its logs -- the first place to look when something breaks. The defaults have a couple of limits worth knowing before they bite you.

## Segment 2 (code)

Json-file is the default logging driver, and left unconfigured it's unbounded -- a noisy container can genuinely fill up disk over time. The local driver fixes that, rotating automatically once max-size and max-file are set -- here, ten megabytes times three files, a hard ceiling either way.

## Segment 3 (code)

Docker logs dash f tails new lines live, and dash dash tail fifty starts from recent history instead of everything ever logged. Docker stats shows live usage -- and that mem usage over limit column is exactly the memory cap from last lesson, in action.

## Segment 4 (steps)

Docker logs works fine for one host. It stops scaling once the stack spans multiple machines -- nobody wants to SSH into five servers hunting one error. The fix is centralizing: a log driver or sidecar agent ships every container's logs to one searchable place.

## Segment 5 (outro)

Northbridge doesn't need that yet on one host, but it's the natural next step once the stack grows past one machine -- exactly where the orchestration preview picks up later this chapter. Next: running as non-root and basic hardening.
