# Script — External Data in CRM Analytics

## Segment 1 (title)

Real business questions rarely stay inside Salesforce. Finance data lives in a warehouse, usage data in another system. This lesson covers how external data gets into CRM Analytics, and what changes once it arrives.

## Segment 2 (steps: ways in)

There are several routes. External connections in Data Manager reach sources like cloud warehouses and storage, though the connector list changes, so check your org's current catalog. CSV upload works for small reference tables. The External Data API loads files programmatically. And Data 360, which was renamed from Data Cloud, can ingest external data through its own connectors and data streams.

## Segment 3 (screenshot)

Here's a real Data 360 screen from a Trailhead module, showing a new data stream being set up. External data lands in a data lake object, and you choose a category and a primary key before ingestion. Notice the screen still says Data Cloud, the older product name. Same product, new name.

## Segment 4 (steps: sync, prepare, secure)

Inside CRM Analytics, a connection syncs source data into a dataset on a schedule you control. Recipes then join it to Salesforce data. Schedule the connection sync first, and the recipe after it, so nothing processes stale data. And here's the catch: Salesforce sharing rules apply to Salesforce objects, not to warehouse rows or CSV files. External data needs a security predicate of its own, which the next chapter covers.

## Segment 5 (outro)

Every synced dataset is a copy, so track where it came from and how fresh it is. Next up: Keeping CRM and Warehouse Data in Sync.
