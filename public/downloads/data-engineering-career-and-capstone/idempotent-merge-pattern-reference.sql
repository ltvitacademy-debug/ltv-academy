-- Idempotent MERGE Pattern Reference
-- The keyed-upsert pattern used throughout this course's capstone projects
-- (Project 1 Lesson 65's bronze ingestion, Project 3 Lesson 77's fraud
-- alerting) to make at-least-once delivery safe to retry.
--
-- The core idea: at-least-once delivery guarantees an event arrives AT
-- LEAST once, not EXACTLY once. "Exactly-once effect" is something you
-- build on top of that guarantee, not something the platform hands you
-- for free. A keyed MERGE is how you build it: redelivery matches the
-- existing row and does nothing, instead of inserting a duplicate.

-- ============================================================
-- Pattern 1: Idempotent landing (Project 1, Lesson 65)
-- Use when: raw events are landing in a bronze/raw table and a retry
-- or redelivery must not create a duplicate row.
-- ============================================================
MERGE INTO bronze.online_orders AS target
USING incoming_batch AS source
  ON target.event_id = source.event_id
WHEN NOT MATCHED THEN
  INSERT (event_id, order_payload, received_at)
  VALUES (source.event_id, source.order_payload, source.received_at);
-- WHEN MATCHED: intentionally absent -- a redelivered event is a no-op.

-- ============================================================
-- Pattern 2: Idempotent scoring / alerting (Project 3, Lesson 77;
-- also used for fraud scoring in the Lesson 21 case study)
-- Use when: a computed result (a score, a flag, an alert) must only
-- ever be written once per source key, no matter how many times the
-- triggering event is redelivered.
-- ============================================================
MERGE INTO FraudAlerts AS target
USING (SELECT @transaction_id AS transaction_id,
              @risk_score    AS risk_score) AS source
  ON target.transaction_id = source.transaction_id
WHEN NOT MATCHED THEN
  INSERT (transaction_id, risk_score, alerted_at)
  VALUES (source.transaction_id, source.risk_score, CURRENT_TIMESTAMP());
-- Same transaction arrives twice -> second MERGE matches the existing
-- row and does nothing. One alert, no matter how many redeliveries.

-- ============================================================
-- Pattern 3: SCD Type 2 update (Project 1, Lesson 66) -- a targeted
-- merge, not a dimension rewrite, used when the entity itself changes
-- over time and history needs to be preserved.
-- ============================================================
MERGE INTO gold.DimStore AS target
USING StoreUpdates AS source
  ON target.store_id = source.store_id AND target.is_current = 1
WHEN MATCHED AND target.region <> source.region THEN
  UPDATE SET target.end_date = CURRENT_DATE(), target.is_current = 0
WHEN NOT MATCHED THEN
  INSERT (store_id, region, category_mix, effective_date, is_current)
  VALUES (source.store_id, source.region, source.category_mix,
          CURRENT_DATE(), TRUE);

-- ============================================================
-- When to reach for this pattern vs. a plain INSERT
-- ============================================================
-- Plain INSERT is fine only when the source is guaranteed exactly-once
-- and never replayed (rare in a real streaming system). The moment a
-- retry, a redelivery, or a replay (Kappa's reprocessing case) is
-- possible, the write needs a key to MERGE on -- otherwise "just retry
-- it" turns from a safe recovery strategy into a data-corruption risk.
