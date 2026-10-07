## Segment 1 (title)

The capstone's built. This lesson is about making sure someone else -- a hiring manager, an interviewer -- actually sees what you did, and closing out this course.

## Segment 2 (steps)

You containerized a real multi-service application. Catalog and checkout, each a multi-stage, non-root Dockerfile. A compose.yaml wiring all three services -- catalog, checkout, and catalog-db -- together on a user-defined network, with a named volume so the database survives a restart. Health checks, restart policies, and resource limits on every service. And configuration through a dot-env file that never got committed, with both images tagged and pushed to a registry.

## Segment 3 (steps)

A README is where this gets seen. Lead with one sentence on what it is, list the three services and how they talk to each other, and give the exact commands to run it -- clone, copy dot-env-example to dot-env, docker compose up. A resume bullet should name the actual services and the actual hardening, not just say "used Docker." And a pinned, working repo is proof an interviewer can actually run.

## Segment 4 (steps)

Expect to be asked why. Why multi-stage builds -- smaller images, a smaller attack surface. Why non-root -- a compromised process inside the container still can't act as root on the host. Why health checks -- a container that's started isn't necessarily a container that's ready to take traffic. And what you'd change given more time shows judgment, not just that you followed steps.

## Segment 5 (outro)

That closes the capstone, and this course. Everything you just hardened by hand -- health checks, restart policies, resource limits, multiple containers working together -- is exactly what Kubernetes formalizes for a whole cluster instead of one host. That's where the next course picks up.
