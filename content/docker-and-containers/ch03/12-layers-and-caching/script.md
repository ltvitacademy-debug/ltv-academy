## Segment 1 (title)

Lesson Eleven built the catalog image once. Northbridge will build it dozens of times a day as they edit code, and most of those builds should take seconds, not eighteen. Here's why, by looking at what each Dockerfile instruction actually produces: a layer.

## Segment 2 (code)

Each RUN, COPY, and ADD produces its own filesystem layer, stacked on the one before it. Docker caches every layer by its instruction plus its inputs -- change nothing, and a rebuild just replays the cache from disk.

## Segment 3 (code)

Here, only server dot js changed since the last build -- package.json didn't. Docker reused the cached WORKDIR, COPY package.json, and RUN npm install layers exactly as they were, and only rebuilt the final COPY step to pick up the new code. That's a two-second build instead of eighteen.

## Segment 4 (code)

But this time package.json changed -- maybe a new dependency got added for a feature. Docker reruns that COPY, and because caching is sequential, every layer stacked after it reruns too, even the final COPY, which didn't actually change at all. The cache only protects layers before the first change, never after it.

## Segment 5 (steps)

So the order matters: put the rarely-changing package.json copy and npm install first, so the expensive install step stays cached through almost every code edit. Put the constantly-changing application code copy last, so its churn doesn't force the slow step to rerun every time.

## Segment 6 (outro)

That's why layer order isn't just style -- it's build speed. Next up: CMD versus ENTRYPOINT, two different ways to set what a container actually runs.
