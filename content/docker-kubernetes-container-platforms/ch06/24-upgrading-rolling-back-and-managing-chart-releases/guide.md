# Lesson 24 — Upgrading, Rolling Back, and Managing Chart Releases

**Chapter 6 · Deploying with Helm · Lesson 4 of 4**

## What you'll learn

- How `helm upgrade --install` safely handles both "first deploy" and
  "update an existing release" with one command
- What `--atomic` and `--wait` actually do when an upgrade goes wrong
- How to read `helm history` and use it to roll back to a specific
  known-good revision with `helm rollback`
- The release-management commands you'll reach for day to day:
  `helm list`, `helm status`, `helm get values`, `helm uninstall`

## One command for install and upgrade

Once a chart exists, you rarely type `helm install` and `helm upgrade`
as two separate commands. The pattern you'll actually use is:

```
helm upgrade --install myapp-prod ./myapp \
  --values values.yaml \
  --values values-prod.yaml \
  --namespace prod \
  --atomic \
  --wait
```

`--install` tells Helm to create the release if `myapp-prod` doesn't
exist yet, and upgrade it if it does — so the same command works
whether this is the very first deploy or the hundredth. `--wait` makes
Helm block until the Deployment's Pods report ready instead of
returning immediately after the API accepts the manifest. `--atomic`
is the safety net: if the upgrade fails or the wait times out, Helm
automatically rolls the release back to its previous working state
instead of leaving the cluster half-upgraded.

## Release history: every revision, tracked

Every `helm install` and `helm upgrade` against a release creates a
new, numbered **revision**. You can see the whole history:

```
helm history myapp-prod --namespace prod
```

```
REVISION  UPDATED                   STATUS      CHART         APP VERSION  DESCRIPTION
1         Mon Oct 12 09:02:11 2026  superseded  myapp-0.2.0   2.0.0        Install complete
2         Tue Oct 13 14:40:55 2026  superseded  myapp-0.3.0   2.1.0        Upgrade complete
3         Wed Oct 14 11:18:02 2026  deployed    myapp-0.3.0   2.1.4        Upgrade complete
```

That's the thing a `sed`-and-`kubectl apply` script never gave you:
an ordered, queryable record of exactly what was deployed, when, with
which chart version and which app version, without having to dig
through a separate CI log.

## Rolling back to a known-good revision

```
helm rollback myapp-prod 2 --namespace prod
```

This re-applies revision 2's rendered manifests and values as a new
revision — it doesn't erase history, it adds to it, the same way an
upgrade does. Leaving off the revision number (`helm rollback
myapp-prod`) rolls back to the immediately previous revision, which is
the fast path during an incident. Because `--atomic` on the earlier
upgrade would already have triggered this automatically on failure,
you'll most often run `helm rollback` by hand when a deploy "succeeded"
technically but the application is misbehaving in a way Kubernetes
itself can't detect — a bad feature flag, a broken downstream
dependency, something no readiness probe catches.

## Day-to-day release commands

```
helm list --namespace prod
```
shows every release currently installed in that namespace, its chart
version, and its status.

```
helm status myapp-prod --namespace prod
```
shows the current state of one specific release in detail.

```
helm get values myapp-prod --namespace prod
```
prints exactly which values are actually in effect for that release
right now — the single most useful command when a running release
doesn't match what you expect from reading `values.yaml` alone.

```
helm uninstall myapp-prod --namespace prod
```
removes the release and, by default, its revision history along with
it.

## Key terms

| Term | Meaning |
|---|---|
| `helm upgrade --install` | Creates the release if it doesn't exist, upgrades it if it does — one command for both |
| `--atomic` | Automatically rolls back to the previous revision if the upgrade fails or the wait times out |
| Revision | A numbered snapshot created by every install/upgrade/rollback against a release |
| `helm rollback <release> <rev>` | Re-applies an earlier revision's manifests/values as a new revision |
| `helm get values` | Shows the values actually in effect for a running release right now |

## Check yourself

You're ready to move on when you can explain, without looking: what
does `--atomic` protect you from that a plain `helm upgrade` doesn't,
and why does `helm rollback` add a new revision to history instead of
simply deleting the revisions that came after it?
