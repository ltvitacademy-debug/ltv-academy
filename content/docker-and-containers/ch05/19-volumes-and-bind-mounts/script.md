## Segment 1 (title)

Every container filesystem so far has been disposable -- stop it, and anything written inside is gone. That's fine for a stateless app, but Northbridge's product-catalog database can't lose its data every time its container restarts.

## Segment 2 (code)

Here's the problem made concrete: write a file inside catalog-db, remove the container, start a fresh one from the same image, and that file is gone. A new container always starts from the image's original filesystem -- the old writable layer disappeared along with the old container.

## Segment 3 (code)

A named volume is storage Docker creates and manages outside any single container's lifecycle. Mount catalog-db-data into Postgres's data directory, and the container becomes disposable without the data being disposable -- remove it, start a new one mounting the same volume, and every row the old one wrote is still there.

## Segment 4 (code)

A bind mount is different -- it maps a specific path on the host machine straight into the container instead of Docker-managed storage. Northbridge's engineers use this for local development, mounting their own source code into the catalog container so edits on the host show up inside instantly.

## Segment 5 (steps)

dash v is the fast shorthand for either kind of mount. dash dash mount spells out every part as an explicit key -- source, target, type -- harder to get wrong on a long command with several mounts. docker volume ls lists what exists, and docker volume rm refuses to delete one a container's still using.

## Segment 6 (outro)

catalog-db's data now survives a restart. But that data's no good if the catalog container itself can't reach the database -- next lesson covers exactly how containers find and talk to each other.
