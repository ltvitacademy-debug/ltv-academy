# Lesson 4 — JSON Basics · Voiceover script

Segments map 1:1 to slides. Chapter 1 · API Foundations · Lesson 4 of 19.

---

## S1 · TITLE CARD

Every request body you send to Oracle Fusion's REST API, and every response you get back, is written in JSON — JavaScript Object Notation. It's plain text, structured in a small number of predictable ways.

## S2 · STEPS CARD

JSON has three building blocks. An object, in curly braces, is a set of named key-value pairs — one invoice record, for example. An array, in square brackets, is an ordered list — a list of invoice lines on that invoice. And a key-value pair is just a field name, a colon, then its value.

## S3 · CODE CARD

Here's what an invoice header looks like as JSON, with field names that mirror Oracle's real invoice attributes: InvoiceNumber, InvoiceAmount, InvoiceCurrency, InvoiceDate, and a boolean PaymentStatusFlag. Every key is a quoted string; the structure is the same whether Oracle Fusion is sending this to you or you're sending it to Oracle.

## S4 · STEPS CARD

A JSON value can be one of four types, plus null. Strings are text in double quotes. Numbers have no quotes at all. Booleans are the literal words true or false, unquoted. And null explicitly means "this field has no value," which is different from leaving the field out entirely.

## S5 · OUTRO CARD

Objects, arrays, and typed values — that's JSON, and it's the format underneath every request and response in this course. Next lesson, we take a real Oracle Fusion REST doc page and turn it into an actual working request.
