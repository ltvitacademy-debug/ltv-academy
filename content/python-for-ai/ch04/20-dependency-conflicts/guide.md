# Dependency Conflicts

**Chapter 4 · Virtual Environments & Package Management · Lesson 20 of 37**

Libraries depend on other libraries. Install enough packages into one environment, and eventually two of them will want incompatible versions of the same shared dependency. This lesson covers how to recognize that situation, read pip's error output, and resolve it.

## What you'll learn

- Why dependency conflicts happen (libraries depending on shared sub-libraries)
- How to read pip's dependency-resolution error output
- Strategies for resolving a conflict
- `pip check` — verifying your environment's dependencies are consistent

## Why conflicts happen

A library you install often brings its own dependencies along. If `package-a` requires `httpx>=0.27` and `package-b` requires `httpx<0.25`, pip cannot satisfy both inside one environment — there's no single `httpx` version that is both `>=0.27` and `<0.25`.

```
pip install package-a package-b
```

```
ERROR: Cannot install package-a and package-b because these
package versions have conflicting dependencies.

The conflict is caused by:
    package-a 2.0.0 depends on httpx>=0.27
    package-b 1.4.0 depends on httpx<0.25

To fix this you could try to:
1. loosen the range of package versions you've specified
2. remove package versions to allow pip to attempt to solve
   the dependency conflict
```

Modern pip's resolver refuses to silently install a broken combination — it reports the conflict instead of guessing.

## Resolving it

A few strategies, roughly in order of how often each one actually works:

1. **Upgrade the stricter package.** Check if a newer version of `package-b` supports a newer `httpx` range — library maintainers update their own dependency bounds over time.
2. **Loosen your own pin.** If you pinned `httpx==0.24` yourself for an unrelated reason, relaxing it might resolve the conflict without touching either package.
3. **Isolate the conflicting packages into separate environments.** If `package-a` and `package-b` are genuinely never needed together in the same script, give each its own virtual environment instead of forcing both into one.
4. **Check for a compatible middle version**, if one exists — sometimes the ranges aren't as mutually exclusive as the first error suggests once you look at the full dependency tree.

## Verifying an environment is consistent

`pip check` scans everything currently installed and reports any broken dependency relationships — useful after manually installing or upgrading packages one at a time, when you want to confirm you haven't quietly broken something.

```
pip check
# No broken requirements found.
```

If something's inconsistent, `pip check` names exactly which installed package has unmet requirements, which is usually the fastest way to find a conflict pip's installer let slip through (for instance, if you installed packages with `--no-deps` at some point).

## Why isolated environments are the real prevention

This is the payoff of Lesson 18's virtual environments: most "dependency conflict" headaches only happen because everything is crammed into one shared environment. Giving each project — or even each genuinely incompatible pair of tools — its own virtual environment sidesteps the whole problem before it starts.

## Recap

- Conflicts happen when two installed packages require incompatible version ranges of a shared dependency.
- pip's resolver reports the conflict explicitly rather than installing a broken combination.
- Resolve by upgrading, loosening your own pins, or isolating conflicting tools into separate environments.
- `pip check` verifies an already-installed environment has no unmet dependency requirements.
- Next lesson: a tour of the AI libraries you'll actually be installing throughout the rest of this course.
