# Script — Deploying to a Cloud Container Service

## Segment 1 (title)

Chapter 2 ended with an image sitting in a registry — built, tagged, and pushed, but going nowhere on its own. This lesson is about the thing that actually runs it: a managed cloud container service.

## Segment 2 (screenshot: configure the build)

Every one of these services asks for the same two things, starting with the build. A runtime, a build command, a start command, and a port. That's the same information as your Dockerfile's RUN and CMD instructions from Lesson 3 — just restated as form fields instead of file lines.

## Segment 3 (screenshot: configure the service)

The second screen is the resource envelope: CPU and memory per container instance, environment variables for the secrets from Lesson 9, and the two settings that matter most once real traffic shows up — the autoscaling policy and the health check endpoint the platform pings to decide whether an instance is alive.

## Segment 4 (screenshot: live dashboard)

Once you hit deploy, the console shows the service moving from pending to running. You get a real public HTTPS URL — the default domain — plus a service ARN and the source it was built from. An app that was a Dockerfile on your laptop an hour ago is now a public endpoint someone else can call.

## Segment 5 (steps: four vendors)

This walkthrough used AWS App Runner because it's the most compact version of the flow. But the same two screens — configure the build, configure the service — exist under different names in Amazon ECS on Fargate, Google Cloud Run, and Azure Container Apps. Learn the pattern once, and every vendor's console reads the same way.

## Segment 6 (outro)

A deployed service isn't automatically a service that's ready for real traffic. Next up: what actually sits in front of that default domain — API gateways and load balancing.
