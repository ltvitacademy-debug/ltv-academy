# Script — Service Accounts & Configuration Manager

## Segment 1 (title)

Service accounts came up as a pre-install decision earlier in this chapter — here's the full picture of the options, and why one of them is the actual best practice.

## Segment 2 (steps: From worst to best practice)

Local System is the most privileged built-in account and a shared identity with no accountability — avoid it in production. A dedicated domain account gives least privilege but you have to manage its password rotation yourself. A gMSA gives that same least privilege while Active Directory rotates its password automatically.

## Segment 3 (code: Not services.msc)

Change a service account through SQL Server Configuration Manager, not through the Windows Services control panel. Configuration Manager grants the account the right to act as a service and adjusts the registry and file permissions SQL Server depends on — skipping that step through services.msc directly can leave the instance broken.

## Segment 4 (steps: What Configuration Manager actually manages)

Configuration Manager is a dedicated tool, separate from Management Studio, managing SQL Server Services, network protocol configuration like TCP/IP and Named Pipes, and the client-side Native Client Configuration.

## Segment 5 (outro)

Next up: Chapter Three begins with creating databases — putting file layout, collation, and recovery model decisions into an actual CREATE DATABASE statement.
