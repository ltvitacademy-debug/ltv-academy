# Script — Local Multi-Service Environment With Compose

## Segment 1 (title)

Two container images are only useful once you can run them together the way they actually run in production. This lesson wires product-catalog, checkout, and their dependencies up locally with Docker Compose — the last piece of Phase 1 before infrastructure work starts in Chapter 3.

## Segment 2 (code)

The compose file declares four services. Postgres backs both applications and keeps its data in a named volume. product-catalog is reachable on localhost 8081, checkout on localhost 8082, and checkout is wired to a fourth service, inventory-mock, through an INVENTORY_URL environment variable instead of the real legacy inventory service. depends_on makes sure Postgres and the mock are up before either application container starts.

## Segment 3 (steps)

That inventory-mock service is a small MockServer instance preloaded with a canned expectation that always reports stock as available, so checkout's stock check passes without needing the real service, which isn't reachable from a laptop anyway and isn't something this capstone builds. PaymentPro plays the same role for payments — checkout points at PaymentPro's own sandbox environment instead of a live one. And none of those values are hardcoded; they all come from a local-only dot-env file that's never committed to Git.

## Segment 4 (code)

Day to day, it's one command: docker compose up --build brings everything up and rebuilds images if a Dockerfile changed, docker compose logs follows one service's output, and docker compose down -v tears it all down including the Postgres volume for a clean slate. Mounted source volumes paired with nodemon and uvicorn's reload flag give both services hot reload for fast local iteration — strictly a local convenience, never part of the production images from the last lesson.

## Segment 5 (outro)

That closes out Phase 1 — both services now run together locally, backed by Postgres, with a working stand-in for every external dependency they'd normally call. Chapter 3 picks up from here with real Azure infrastructure, built with Terraform.
