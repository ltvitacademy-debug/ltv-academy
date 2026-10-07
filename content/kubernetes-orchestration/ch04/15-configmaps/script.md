# Script — ConfigMaps

## Segment 1 (title)

Northbridge's product-catalog service needs different settings in staging versus production — a different database host, a different log level — without rebuilding the image every time. A ConfigMap externalizes that configuration from the image entirely.

## Segment 2 (steps)

A ConfigMap is just a bag of key-value data, created as its own object, separate from the Pod. The same container image can then run in any environment, picking up whatever values that environment's ConfigMap provides at deploy time.

## Segment 3 (code)

The most common way to use it is envFrom, which injects every key in the ConfigMap as an environment variable in one block — no need to list each setting individually in the Pod spec.

## Segment 4 (code)

For larger configuration, like a full nginx.conf, mounting the ConfigMap as a volume fits better — each key becomes a file inside the mount path, named after the key.

## Segment 5 (outro)

One catch worth remembering: updating a ConfigMap doesn't restart Pods already using it. Mounted files eventually sync, but environment variables are captured once at startup and need a Pod restart to pick up new values. Next lesson: Secrets, the same pattern built for sensitive data.
