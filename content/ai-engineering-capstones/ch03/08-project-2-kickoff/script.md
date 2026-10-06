# Script — Project 2 Kickoff

## Segment 1 (title)

Project 1 was a RAG assistant that answers questions from documents. Project 2 is the structured-data version: an AI data analyst that turns a plain-English question into a real SQL query, runs it safely against a real database, and sometimes enriches the answer with a live API call. It's a genuinely different, and riskier, skill — generating a query against data the model has never seen.

## Segment 2 (steps: four lessons ahead)

Four lessons get you there. Lesson 9 builds a read-only, parameterized database connection — the safety foundation everything else sits on. Lesson 10 covers the actual prompt pattern for turning a question into a validated query. Lesson 11 enriches a database result with a live external API call. And Lesson 12 packages the finished project for your portfolio.

## Segment 3 (steps: scope your project)

This is project-based, so you're choosing both halves yourself. Pick a real database you can connect to, with at least two or three related tables — a single flat table won't give the natural-language-to-SQL work anything interesting to do. Pick one real external API that adds something the database doesn't have. And write down three to five real questions a user would actually ask that need both.

## Segment 4 (code: deliverables checklist)

By the end of Chapter 3 you should have a read-only parameterized connection, a natural-language-to-SQL function with schema-aware prompting and pre-execution validation, at least one question that joins a SQL result with a live API call, and a short walkthrough you could show in an interview.

## Segment 5 (outro)

Next up: Lesson 9, where you build the one piece every part of this project depends on — a database connection that can't be tricked into running something it shouldn't.
