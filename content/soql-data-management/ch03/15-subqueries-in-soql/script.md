# Script — Subqueries in SOQL

## Segment 1 (title)

This chapter had two very different subqueries: one in the SELECT list, one in the WHERE clause. Time to put them side by side.

## Segment 2 (code: two subqueries, two jobs)

A subquery in the SELECT list, like select LastName from Contacts, brings child records back, nested inside each parent. A subquery in the WHERE clause, like Id in select AccountId from Opportunity, only filters. It returns no data of its own.

## Segment 3 (steps: the FROM difference)

Here's what trips people up. In the SELECT list, the inner FROM uses the child relationship name, the plural, Contacts. In the WHERE clause, the inner FROM uses the real object name, Opportunity. Ask what the subquery is for. Returning child data goes through a relationship. Filtering names an object.

## Segment 4 (code: both together)

You can use both in one query. The WHERE semi-join decides which Accounts qualify, those with a Closed Won Opportunity. The SELECT-list subquery decides what each one carries, its Contacts. That's a very common reporting pattern.

## Segment 5 (outro)

Remember what SOQL doesn't allow: no subqueries in FROM, and no correlated subqueries. That wraps up Chapter 3. Next up, Chapter 4 and Lesson 16: What Is SOSL?
