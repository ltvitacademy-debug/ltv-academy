# Script — The Sample Application

## Segment 1 (title)

Chapter 1 gave you the brief, the repo layout, and the project plan. Now it's time to actually open the code. This lesson walks through both services in the storefront monorepo, endpoint by endpoint, so you know exactly what you're containerizing in the next lesson and deploying for the rest of this course.

## Segment 2 (steps)

`product-catalog` is a Node and Express service listening on port 8080, with exactly two real routes plus a health check: `GET /products` lists products out of Postgres, and `GET /products/:id` looks up one by its ID, returning a 404 if it doesn't exist. It has one dependency — Postgres — and no outbound calls to anything else. That simplicity is why its traffic is steady: people browsing don't spike load the way buying does, and it's exactly why this service gets the smaller autoscaling range later on.

## Segment 3 (steps)

`checkout` is where the real complexity lives. `POST /cart` builds up the order, and `POST /checkout` runs the actual workflow: it confirms stock with the existing legacy inventory service, charges the card through PaymentPro using an OAuth2 client-credentials token, and then fires a webhook so the shipping carrier can pick up the completed order. Any one of those three calls being slow makes checkout slow — hold onto that, it matters a lot later in the course, especially once you get to the incident drill in Chapter 5.

## Segment 4 (steps)

So why two services instead of one monolith? They do fundamentally different jobs — thin data access versus multi-call orchestration. They scale differently, since checkout spikes hard during flash sales and product-catalog doesn't. And splitting them keeps the blast radius small: a bug in checkout can't take product browsing down with it, and each service gets its own pipeline, its own container image, and its own release schedule.

## Segment 5 (outro)

Right now both services only run on a developer's laptop with a plain `node server.js` or `uvicorn main:app` — no containers, no cloud infrastructure, no pipeline yet. Next lesson, you'll write production-grade multi-stage Dockerfiles for both of them, the first real step of Phase 1.
