# The Software Delivery Lifecycle

Every pipeline you'll build in this course automates one journey: the path a change takes from an idea in someone's head to running code a customer actually uses. This lesson names every stage of that journey so the rest of the course has a shared map to point at. We'll track one example change through Northbridge Retail's delivery lifecycle: adding a "save for later" button to the shopping cart.

## What you'll learn

- The six stages every software delivery lifecycle (SDLC) passes through
- How a single change — Northbridge Retail's "save for later" button — moves through all six
- The difference between the SDLC as a whole and the specific slice CI/CD automates
- Why slower stages upstream (planning, coding) don't need to be automated the same way downstream stages do

## The six stages

1. **Plan** — the team decides what to build and why. A product manager at Northbridge Retail writes a one-paragraph spec for "save for later": shoppers can move a cart item to a saved list without losing their place at checkout.
2. **Code** — a developer writes the change on a feature branch, following the patterns set in the earlier Git & GitHub course in this path.
3. **Build** — the code is compiled, packaged, and (for this course's examples) baked into a container image. This is the first stage CI/CD actually touches.
4. **Test** — automated tests run against the build: unit tests, integration tests, sometimes security or performance scans. Chapter 4 of this course is entirely about this stage.
5. **Release** — a tested build is made available to deploy — tagged, versioned, and pushed to an artifact repository or container registry.
6. **Deploy / Operate** — the release actually runs where customers can reach it, and the team monitors it in production, feeding anything that goes wrong back into the next Plan stage.

## Following "save for later" through the lifecycle

- **Plan**: the spec is written and the ticket moves into the sprint.
- **Code**: a developer opens a branch, writes the button and the backend endpoint that moves the item, and opens a pull request.
- **Build**: merging the pull request into `main` triggers a pipeline that builds a new container image for Northbridge Retail's cart service.
- **Test**: that pipeline runs the cart service's unit tests and an integration test that actually calls the new endpoint.
- **Release**: once tests pass, the image is tagged `cart-service:1.14.0` and pushed to the container registry.
- **Deploy / Operate**: the pipeline (or a human clicking "approve," depending on the environment — see Chapter 5) rolls that image out to the Kubernetes cluster, and dashboards start showing how often shoppers actually use the new button.

## Where CI/CD fits — and where it doesn't

CI/CD automates stages 3 through 6: build, test, release, and deploy. Plan and Code stay fundamentally human — a pipeline can't decide what a product should do or write the first draft of a feature for you (AI coding assistants aside, that's a different course). What CI/CD removes is everything *manual and repetitive* that used to sit between a finished pull request and that code running in front of a customer: someone manually running tests, manually building an image, manually copying files to a server, manually restarting a service. Lesson 3 names exactly which of those automated stages count as "integration," which count as "delivery," and which count as "deployment" — three words people use interchangeably but that mean specific, different things.

## Key terms

- **Software Delivery Lifecycle (SDLC)** — the full path a change takes: plan, code, build, test, release, deploy/operate
- **Build** — compiling and packaging code into a deployable artifact (for this course, usually a container image)
- **Release** — a tested, versioned artifact made available to deploy
- **Deploy** — making a release actually run in an environment users or systems can reach
