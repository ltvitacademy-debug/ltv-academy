# Lesson 40 — Autonomous Transactions in PL/SQL

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 6 of 8**

## What you'll learn

- `PRAGMA AUTONOMOUS_TRANSACTION`: a block whose transaction is fully independent of the caller's
- The real-world use case this exists for: audit logging that survives a rollback
- Why T-SQL's nested transactions are NOT independent in this same way
- The rule: an autonomous transaction must COMMIT or ROLLBACK before it returns control

## Declaring a block's transaction as independent

```sql
CREATE OR REPLACE PROCEDURE log_login_attempt (
  p_username IN VARCHAR2,
  p_success  IN BOOLEAN
) IS
  PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
  INSERT INTO login_audit (username, attempted_at, was_successful)
  VALUES (p_username, SYSTIMESTAMP, p_success);
  COMMIT;  -- commits ONLY this procedure's own insert, independent of the caller
END log_login_attempt;
/
```

`PRAGMA AUTONOMOUS_TRANSACTION`, declared right after the procedure or function header, tells
Oracle that this block starts a brand-new, fully independent transaction the moment it runs — one
that has no relationship to whatever transaction (if any) called it. It can `COMMIT` or `ROLLBACK`
entirely on its own, and neither of those actions touches the calling transaction's own pending
work in any way.

## The real use case: logging that survives the caller's rollback

```sql
CREATE OR REPLACE PROCEDURE transfer_funds (
  p_from_account IN NUMBER,
  p_to_account   IN NUMBER,
  p_amount       IN NUMBER
) IS
BEGIN
  log_login_attempt('system', TRUE);  -- autonomous: commits immediately, independently

  UPDATE accounts SET balance = balance - p_amount WHERE account_id = p_from_account;
  UPDATE accounts SET balance = balance + p_amount WHERE account_id = p_to_account;

  IF p_amount > 1000000 THEN
    RAISE_APPLICATION_ERROR(-20001, 'Amount exceeds transfer limit');
    -- this rolls back BOTH updates above...
    -- ...but the login_audit row from log_login_attempt is ALREADY committed
    -- and survives regardless
  END IF;

  COMMIT;
END transfer_funds;
/
```

This is the genuinely legitimate reason autonomous transactions exist: you often want a record
that *an attempt was made* to persist **even if** the main transaction that triggered it later
fails and rolls back — logging "a transfer was attempted" regardless of whether the transfer
itself ultimately succeeded. If `log_login_attempt` were an ordinary (non-autonomous) call, its
insert would be swept up into the same transaction as the fund transfer and vanish the moment that
transaction rolled back — defeating the entire purpose of an audit trail, which exists precisely to
record what happened even when things go wrong.

## The rule: an autonomous block must commit or roll back before returning

```sql
CREATE OR REPLACE PROCEDURE bad_autonomous_example IS
  PRAGMA AUTONOMOUS_TRANSACTION;
BEGIN
  INSERT INTO login_audit (username, attempted_at) VALUES ('test', SYSTIMESTAMP);
  -- Missing COMMIT or ROLLBACK here raises
  -- ORA-06519: active autonomous transaction detected and rolled back
END bad_autonomous_example;
/
```

Oracle enforces this strictly: every autonomous transaction must end with an explicit `COMMIT` or
`ROLLBACK` before control returns to whatever called it. Forget it, and Oracle raises an error and
rolls the autonomous work back itself — there's no implicit commit on exit the way there might be
elsewhere.

## Where T-SQL genuinely has no equivalent

```sql
-- T-SQL: nested transactions are NOT independent
BEGIN TRANSACTION;
  INSERT INTO LoginAudit (Username, AttemptedAt) VALUES ('system', GETDATE());
  BEGIN TRANSACTION;  -- "nested" — but NOT its own independent unit
    UPDATE Accounts SET Balance = Balance - 1000 WHERE AccountId = 1;
    -- if something fails here and the OUTER transaction rolls back...
  ROLLBACK TRANSACTION;
-- ...the LoginAudit insert above is rolled back TOO — it was never independent
```

T-SQL's nested `BEGIN TRANSACTION` calls are **not** independent transactions — SQL Server tracks a
single nesting count, and an outer `ROLLBACK` undoes everything, including work that was logically
"inner." There is no T-SQL mechanism that lets a block commit its own work irrevocably while a
surrounding transaction is still pending and might later roll back. This is exactly the real gap
`PRAGMA AUTONOMOUS_TRANSACTION` fills in Oracle, and it's a capability T-SQL developers often don't
realize they're missing until they need to build a rollback-proof audit trail.

## Key terms

| Term | Meaning |
|---|---|
| `PRAGMA AUTONOMOUS_TRANSACTION` | Declares a block's transaction fully independent of its caller's |
| Autonomous transaction | A transaction that can COMMIT/ROLLBACK without affecting, or being affected by, the calling transaction |
| `ORA-06519` | Error raised when an autonomous block exits without an explicit COMMIT or ROLLBACK |

## Lab

Write an autonomous procedure `log_event` that inserts one row into an audit table and commits.
Call it from an anonymous block, then deliberately raise an error in that outer block *after* the
call and let it propagate unhandled. Query the audit table afterward and confirm the logged row is
still there, despite the outer block having failed.

## Check yourself

You're ready for Lesson 41 when you can answer, without looking: what does
`PRAGMA AUTONOMOUS_TRANSACTION` actually guarantee, what real-world problem does it solve, and why
can't T-SQL's nested `BEGIN TRANSACTION` do the same thing?
