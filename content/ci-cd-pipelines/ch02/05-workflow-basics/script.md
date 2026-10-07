## Segment 1 (title)

Northbridge Retail just containerized their storefront application and pushed it to a fresh GitHub repository. Before anything from that repo reaches Kubernetes automatically, GitHub Actions needs to build and test every change first. This lesson covers the one file that makes that possible — a workflow.

## Segment 2 (code: trigger and job)

Every GitHub Actions workflow is a YAML file saved inside dot-github-slash-workflows, and GitHub watches that folder automatically — there's no separate dashboard to register it in first. storefront's first workflow triggers on two events: every push to main, and every pull request targeting main. Below that sits one job, named build, running on a brand-new, disposable Ubuntu virtual machine that GitHub throws away once the run finishes.

## Segment 3 (code: steps)

Inside that job, four steps execute top to bottom. The checkout action clones storefront's code onto the runner — without it, the machine is completely empty. Setup-node installs a pinned Node.js version so the build behaves the same today as next year. Then npm ci and npm test install dependencies and run the test suite, the exact commands a developer runs on their own laptop.

## Segment 4 (screenshot: Actions tab)

Once this file is committed and pushed, GitHub picks it up immediately. Open the storefront repository on GitHub and click the Actions tab, sitting right alongside Code, Issues, and Pull requests in the top navigation.

## Segment 5 (screenshot: workflow sidebar)

Inside the Actions tab, the left sidebar lists every workflow file the repository has. CI appears here the first time it runs, named after its name field. Click into any run for a live, streaming log of every step — the exact view later lessons in this chapter lean on for debugging a failure.

## Segment 6 (outro)

Next lesson: the full range of events — beyond just push and pull request — that can start a workflow running, from a nightly schedule to a manual button click.
