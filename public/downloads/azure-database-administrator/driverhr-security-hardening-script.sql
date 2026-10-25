/* =====================================================================
   AZURE DBA COURSE — SENSITIVE-DATA SECURITY HARDENING TEMPLATE
   =====================================================================
   A reusable template compiled from Chapter 4 (Authentication &
   Authorization) and Chapter 6 (Data Security & Compliance), shaped
   around the Chapter 15 capstone problem: a table holding SSNs and
   license numbers behind one shared login nobody has reviewed in
   years (Meridian Fleet Logistics' DriverHR database).

   Swap SCHEMA/TABLE/COLUMN/GROUP names for your own environment.
   Run each section in order — least privilege and auditing first,
   encryption second, masking last — because masking and encryption
   are only meaningful once the audience that can bypass them is
   already narrowed down.
   ===================================================================== */


/* ---------------------------------------------------------------------
   STEP 1 — Replace the shared login with Entra ID groups and
   least-privilege roles (Lessons 20, 21, 22, 24).
   --------------------------------------------------------------------- */

-- Create a user mapped to a Microsoft Entra ID security group instead
-- of a single shared SQL login
CREATE USER [HRSupportTeam] FROM EXTERNAL PROVIDER;
CREATE USER [PayrollTeam]   FROM EXTERNAL PROVIDER;

-- A dedicated database role per function, not db_owner for anyone
CREATE ROLE db_hr_support;
CREATE ROLE db_payroll;

ALTER ROLE db_hr_support ADD MEMBER [HRSupportTeam];
ALTER ROLE db_payroll    ADD MEMBER [PayrollTeam];

-- Grant only what each role has been shown to need
GRANT SELECT ON dbo.Drivers TO db_hr_support;        -- lookups, no write
GRANT SELECT, UPDATE ON dbo.Drivers TO db_payroll;    -- payroll can update pay fields

-- Revoke the old shared login's access entirely once the new roles
-- are confirmed working end to end
-- DROP USER [shared_hr_login];


/* ---------------------------------------------------------------------
   STEP 2 — Turn on auditing BEFORE loosening anything else, so every
   access to this table from this point forward is reviewable
   (Lesson 36). "Nobody's checked in years" becomes a real log.
   --------------------------------------------------------------------- */

-- Server-level audit (Azure SQL: configured via Portal/CLI/PowerShell
-- as well; this is the T-SQL-visible shape of what gets created)
-- Policy: audit SELECT/UPDATE/DELETE against dbo.Drivers specifically
-- EXEC sp_audit_write ... (Azure SQL Auditing is primarily Portal/CLI-
-- configured; see Lesson 36 for the Portal walkthrough)


/* ---------------------------------------------------------------------
   STEP 3 — Always Encrypted for columns where the actual requirement
   is "nobody server-side should be able to read this," not just
   "protect the disk" (Lesson 32). TDE alone is not enough here
   because the worry is a permitted user reading plaintext, not
   storage theft.
   --------------------------------------------------------------------- */

CREATE TABLE dbo.Drivers (
    DriverID        INT PRIMARY KEY,
    FullName        NVARCHAR(100)   NOT NULL,
    SSN             CHAR(11)
        ENCRYPTED WITH (
            COLUMN_ENCRYPTION_KEY = CEK_DriverPII,
            ENCRYPTION_TYPE = DETERMINISTIC,
            ALGORITHM = 'AEAD_AES_256_CBC_HMAC_SHA_256'
        ) NOT NULL,
    LicenseNumber   VARCHAR(20)
        ENCRYPTED WITH (
            COLUMN_ENCRYPTION_KEY = CEK_DriverPII,
            ENCRYPTION_TYPE = DETERMINISTIC,
            ALGORITHM = 'AEAD_AES_256_CBC_HMAC_SHA_256'
        ) NOT NULL,
    HireDate        DATE            NOT NULL
);

-- Deterministic encryption is chosen here because the app still needs
-- to look a driver up BY license number (equality/joins). It would
-- NOT support a LIKE search or a range filter on this column — if
-- that were a real requirement, this is the point to evaluate Always
-- Encrypted with secure enclaves instead (Lesson 32).

-- The Column Master Key and Column Encryption Key themselves are
-- created once via the SSMS/Portal Always Encrypted wizard — they are
-- NOT created by typing a CREATE statement by hand in production,
-- because the whole point is the key material lives outside SQL
-- Server (Azure Key Vault), not inside this script.


/* ---------------------------------------------------------------------
   STEP 4 — Dynamic Data Masking for staff who only need to CONFIRM a
   value, not read it in full (Lesson 33). This is a convenience/
   least-exposure control, layered on top of Step 1's real access
   control — not a substitute for it.
   --------------------------------------------------------------------- */

ALTER TABLE dbo.Drivers
ALTER COLUMN LicenseNumber ADD MASKED WITH (FUNCTION = 'partial(2, "XXXXXXX", 2)');

-- Support staff see e.g. "D4XXXXXXX12" instead of the full number --
-- enough to confirm a match over the phone, not enough to read or
-- copy the real value.
GRANT SELECT ON dbo.Drivers TO db_hr_support;
-- db_hr_support intentionally does NOT get UNMASK — only accounts
-- that have a proven, specific need (e.g. a compliance review
-- account) should:
-- GRANT UNMASK TO ComplianceReviewAccount;


/* ---------------------------------------------------------------------
   STEP 5 — Network: confirm this database is NOT sitting on a public
   endpoint (Lessons 26-29). This script can't change network
   topology — flag it, then move the database behind a private
   endpoint inside a VNET via the Portal/CLI.
   --------------------------------------------------------------------- */

-- Check current firewall rules for a public endpoint still open wider
-- than it should be:
SELECT * FROM sys.resource_management_firewall_rules;   -- Managed Instance
-- or, for Azure SQL Database:
-- SELECT * FROM sys.database_firewall_rules;
