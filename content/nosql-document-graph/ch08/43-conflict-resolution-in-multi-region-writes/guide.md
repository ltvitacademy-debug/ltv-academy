# Conflict Resolution in Multi-Region Writes

Multi-region writes buy you low write latency worldwide, but the previous lesson left an open
question: what actually happens when two regions accept conflicting writes to the same item
before either has replicated to the other? Cosmos DB doesn't leave that undefined — every
container in multi-region-write mode has an explicit **conflict resolution policy**.

## What you'll learn

- Why conflicts are only possible in multi-region-write mode, never in single-region-write mode
- The default policy — Last-Writer-Wins — and how it actually picks a winner
- How a custom conflict resolution stored procedure gives you real control when LWW isn't enough

## Last-Writer-Wins: the default

The default conflict resolution policy is **Last-Writer-Wins (LWW)**. When two writes to the same
item conflict, Cosmos DB keeps the one with the higher value on a designated numeric property —
by default, the system's internal timestamp, but you can point LWW at your own property instead
(a version number, a last-modified counter your application maintains).

```json
{
  "conflictResolutionPolicy": {
    "mode": "LastWriterWins",
    "conflictResolutionPath": "/_ts"
  }
}
```

Pointing the resolution path at your own application-maintained counter, rather than the system
timestamp, matters when clock skew across regions could otherwise make "last" ambiguous — your own
monotonically-increasing version number is a more reliable tiebreaker than wall-clock time.

## Custom conflict resolution: a stored procedure

LWW works well for data where simply discarding the "losing" write is an acceptable outcome — a
page view counter, a last-seen timestamp. It's the wrong choice for data where losing a write
silently is a real problem — a shopping cart, an inventory count, a financial ledger entry. For
those, Cosmos DB supports **custom conflict resolution**: a JavaScript stored procedure registered
on the container that receives all conflicting versions of the item and decides how to merge them,
rather than blindly picking one.

```js
// Custom merge stored procedure receives conflicting versions
function resolveConflict(incomingItem, existingItem, isTombstone, conflictingItems) {
  var context = getContext();
  var container = context.getCollection();
  // Example: merge instead of overwrite — e.g. sum a counter field
  var merged = existingItem;
  merged.viewCount = existingItem.viewCount + incomingItem.viewCount;
  container.replaceDocument(existingItem._self, merged);
}
```

## Manual mode: resolve asynchronously

A third mode, **manual**, doesn't resolve anything automatically — conflicting writes are written
to a **conflicts feed** the application reads and resolves on its own schedule. This is the right
choice when conflict resolution logic is too complex to express cleanly as a stored procedure, or
needs external input the database can't see.

## Key terms

| Term | Meaning |
|---|---|
| Conflict resolution policy | A container-level setting defining how Cosmos DB resolves conflicting writes in multi-region-write mode |
| Last-Writer-Wins (LWW) | The default policy: keeps the version with the higher value on a designated property |
| Custom conflict resolution | A registered stored procedure that merges or decides between conflicting versions itself |
| Conflicts feed | The manual-mode queue of unresolved conflicts an application reads and resolves itself |

## Check yourself

A team using Last-Writer-Wins on a shopping cart container notices that concurrent updates from
two regions sometimes silently drop items a customer added. Why does LWW cause this, and which
alternative should they use instead?
