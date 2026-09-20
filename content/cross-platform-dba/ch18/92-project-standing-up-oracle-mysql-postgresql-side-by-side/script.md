# Script — Project: Standing Up Oracle, MySQL & PostgreSQL Side by Side

## Segment 1 (title)

Day one at Harborline: before you can secure, back up, or tune anything, all three platforms need to be up and configured for the job each one actually does. Let's stand up ora-fin01, mysql-web01, and pg-analytics01 in your Docker lab.

## Segment 2 (code: Oracle)

Oracle instance FINPRD runs in the harborline-oracle container. After confirming the listener with lsnrctl status, you connect with SQL*Plus and put the database in ARCHIVELOG mode — that's what makes RMAN backups possible later. The finance schema gets its own tablespace, FIN_DATA, separate from the defaults.

## Segment 3 (code: MySQL)

MySQL runs the storefront in the harborline-mysql container. Because it's a transactional web application with lots of concurrent checkouts, every table uses the InnoDB storage engine for row-level locking, configured through my.cnf's mysqld section.

## Segment 4 (code: PostgreSQL)

PostgreSQL runs analytics in the harborline-postgres container. After creating the analytics database and a reporting schema, enabling the pg_stat_statements extension now means Lesson 94's performance work will have real query statistics to look at later.

## Segment 5 (outro)

All three platforms are up, each configured for the role it plays at Harborline. Next up, Lesson 93: securing each one with least-privilege accounts and putting a real backup strategy in place across all three.
