# Lesson 12 — Caching Strategies

**Chapter 3 · Fixing Performance · Lesson 12 of 16**

## What you'll learn

- What Salesforce's Platform Cache actually is, and the two scopes it offers
- How to use Platform Cache in Apex to avoid re-querying the same data repeatedly
- A safe cache-miss pattern that doesn't assume cached data is always present
- Where caching fits relative to query optimization — a complement, not a substitute

## Platform Cache: a managed caching layer, not a workaround

**Platform Cache** is Salesforce's built-in, managed caching layer for storing session and org data so it can be retrieved quickly without re-running the original query or computation. It offers two scopes: **session cache**, tied to a specific user's session and ideal for data relevant only to that user's current interaction, and **org cache**, shared across all users and sessions in the org, suited to data that's expensive to compute but the same for everyone (a set of configuration records, a computed lookup table). Internally, Platform Cache uses a local cache with a least-recently-used (LRU) eviction policy, meaning infrequently accessed values can be evicted to make room for others — which is precisely why code reading from the cache always has to handle a cache miss gracefully, rather than assuming a previously-cached value is still there.

## Using org cache from Apex

```apex
public class SettingsCacheHelper {
    private static final String PARTITION = 'local.MyCachePartition';

    public static Map<String, Object> getOrgSettings() {
        Cache.OrgPartition orgPart = (Cache.OrgPartition) Cache.Org.getPartition(PARTITION);

        if (orgPart.contains('customSettingsMap')) {
            // Cache hit: no query needed at all
            return (Map<String, Object>) orgPart.get('customSettingsMap');
        }

        // Cache miss: compute it once, then store it for next time
        Map<String, Object> settings = loadSettingsFromDatabase();
        orgPart.put('customSettingsMap', settings, 3600); // seconds to live
        return settings;
    }

    private static Map<String, Object> loadSettingsFromDatabase() {
        Map<String, Object> result = new Map<String, Object>();
        for (My_Setting__mdt setting : [SELECT DeveloperName, Value__c FROM My_Setting__mdt]) {
            result.put(setting.DeveloperName, setting.Value__c);
        }
        return result;
    }
}
```

The `contains()` check before reading is not optional — because of LRU eviction and the explicit time-to-live passed to `put()`, a value that was cached a moment ago is not guaranteed to still be there. Code that skips this check and assumes a cache hit will throw a null reference error the first time an eviction happens, which is exactly the kind of bug that looks fine in testing (where the cache is freshly warmed) and fails intermittently in production.

## Platform Cache's actual best use case

Platform Cache earns its cost on data that is **expensive to compute or query, and shared or reused across many transactions, without changing often**. A configuration lookup read by every single page load across the whole org is a strong candidate — querying it fresh every time wastes a SOQL query (against the 100-query ceiling from Lesson 2) on data that was almost certainly identical to the last read. Data that's different per transaction, or that changes on every single write, gains little from caching and just adds complexity for no real benefit.

## Caching complements query optimization — it doesn't replace it

A common mistake is reaching for caching to paper over a genuinely non-selective or non-bulkified query, instead of fixing the underlying query per Lesson 4. Caching is the right tool when the query itself is already as efficient as it can be, but is still being run unnecessarily often against data that rarely changes. It is the wrong tool when the actual problem is a query that's expensive every single time it runs, regardless of caching — in that case, the query itself needs to be fixed first; caching a slow, non-selective query just delays when you pay its cost, rather than reducing it.

## Key terms

| Term | Meaning |
|---|---|
| Platform Cache | Salesforce's managed caching layer for session and org data, with LRU eviction |
| Session cache | Platform Cache scope tied to one user's current session |
| Org cache | Platform Cache scope shared across every user and session in the org |
| Cache miss | A read against the cache that finds no stored value, requiring the original computation to run |

## Lab

Identify a piece of data in a hypothetical org that's read frequently (on nearly every page load) but changes rarely (a handful of times a year) — for example, a custom metadata type holding feature-flag-style settings. Write the Apex, following the pattern above, to read that data from org cache with a proper cache-miss fallback to a database query, and explain in a sentence why this specific data (frequent reads, rare changes, shared across all users) is a strong fit for org cache rather than session cache or no caching at all.

## Check yourself

Can you explain the difference between session cache and org cache, and give an example of data that fits each one? Can you explain why skipping the `contains()` check before reading from Platform Cache is a bug waiting to happen, even if it works fine in a quick test? Can you explain why caching a non-selective query is not a substitute for actually fixing that query?
