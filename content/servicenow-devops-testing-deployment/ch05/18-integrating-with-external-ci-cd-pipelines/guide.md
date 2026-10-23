# Lesson 18 — Integrating With External CI/CD Pipelines

**Chapter 5 · ServiceNow DevOps & CI/CD Concepts · Lesson 18 of 26**

## What you'll learn

- The real integration pattern that connects ServiceNow DevOps to external pipeline tools
- How this builds directly on the REST integration patterns from Course 7
- The practical, stage-by-stage flow of a pipeline notifying ServiceNow as code moves through it
- What ServiceNow-side visibility actually looks like once that connection is live

## The real integration pattern

Lesson 17 established that ServiceNow DevOps exists to keep external pipeline activity connected to governed Change Management. This lesson covers how that connection is actually made. ServiceNow DevOps integrates with common external CI/CD tools — **Jenkins**, **GitHub Actions**, and **Azure DevOps** among the most widely used — through APIs and webhooks, not through ServiceNow somehow taking over or replacing those tools.

This is the same integration vocabulary Course 7 spent real time on: `RESTMessageV2` for ServiceNow making outbound calls, Scripted REST APIs for ServiceNow exposing its own endpoints for others to call, and real authentication (API keys, OAuth) protecting both directions. None of that is new here — what's new is applying it specifically to CI/CD pipeline events instead of generic system-to-system data exchange.

## Which side calls which

The practical direction matters. The external pipeline tool is the one doing the work — building, testing, and deploying code — so it's the pipeline tool that notifies ServiceNow, typically via a webhook call into a Scripted REST API endpoint that ServiceNow DevOps exposes, or through a dedicated plugin/extension for that specific CI/CD tool that wraps the same underlying API calls. ServiceNow isn't polling the pipeline tool constantly asking "anything new?" — it's told, as events happen, the same event-driven pattern Course 7 covered for webhooks generally.

## The stage-by-stage flow

Picture a pipeline in GitHub Actions for a scoped application:

1. **Build stage.** A developer pushes a commit; the pipeline builds the application. The pipeline tool reports this event to ServiceNow DevOps.
2. **Test stage.** Automated tests run — potentially including the ATF tests Chapter 4 covered, if they're wired into the same pipeline. Pass or fail, that result gets reported too.
3. **Deploy stage.** If build and test succeed, the pipeline deploys the change toward a target environment. This is the event that matters most to Change Management: ServiceNow DevOps receives it and, as Lesson 17 covered, creates or updates the corresponding Change Request.

At each stage, the pipeline tool isn't just sending a status flag — it attaches real pipeline-run details: which commit, which build number, which test results, which environment. That detail lands on the Change Request itself, so anyone reviewing it in ServiceNow sees the real pipeline evidence, not just an abstract "a deployment happened."

## What this buys ServiceNow-side visibility

Before this integration, a Change Management reviewer looking at a Change Request tied to an automated pipeline would see, at best, whatever a human bothered to type in manually — if a Change Request existed at all. After it, the Change Request's status tracks the pipeline's real, current state, and its activity log carries real pipeline-run evidence. ServiceNow becomes a genuine window into a pipeline that is actually executing somewhere else entirely, instead of a disconnected paperwork trail running in parallel to the real work.

## Key terms

| Term | Meaning |
|---|---|
| Webhook | An external tool's automatic, event-driven HTTP call into a listening endpoint when something happens |
| Scripted REST API | ServiceNow's mechanism for exposing its own endpoints for external tools to call, covered in Course 7 |
| Pipeline-run details | The specific commit, build number, test results, and environment attached to a reported pipeline event |
| Event-driven integration | A pattern where the system with new information notifies the other side, rather than being polled repeatedly |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: in the build-test-deploy flow, which stage's event matters most to Change Management, and why does the pipeline tool notify ServiceNow rather than the other way around?
