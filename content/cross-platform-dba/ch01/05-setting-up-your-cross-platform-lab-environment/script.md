# Script — Setting Up Your Cross-Platform Lab Environment

## Segment 1 (title)

This lesson sets up the lab environment the rest of this course runs on. Instead of installing three separate full database engines directly on your machine, you'll run each platform in its own Docker container — the same practical approach many real shops use for dev and test environments.

## Segment 2 (code: where each image comes from)

MySQL and PostgreSQL each publish official images straight on Docker Hub — mysql and postgres — so a single docker pull gets you a ready-to-run engine. Oracle is different: because of its licensing model, Oracle Database Free images live on Oracle's own Container Registry, not the public Docker Hub, so you'll need a free Oracle account and to accept the license terms before you can pull one.

## Segment 3 (steps: the setup flow)

The setup flow is the same shape for all three platforms: install Docker, pull each platform's image, run it as a container with a password and a mapped port, and connect with that platform's native client to confirm it's alive. You'll do exactly this in Chapter 2 for Oracle, Chapter 7 for MySQL, and Chapter 12 for PostgreSQL.

## Segment 4 (code: port and volume)

Each container gets its own named volume, so the database files survive a restart, and its own port on your machine, so all three engines can run side by side without conflicting. If a container gets into a bad state, you just delete it and recreate it from the image — try that with a real on-disk Oracle install.

## Segment 5 (outro)

With the lab environment in place, Chapter 2 starts the real work: Oracle Database architecture, beginning with a distinction that trips up almost every SQL Server DBA — the difference between an instance and a database.
