# Lesson 6 — OneLake Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Two opens with the thing everything else in this chapter sits on top of: OneLake itself.

## S2 · STEPS — What OneLake is

OneLake is the single data lake underlying every workload in Fabric. Nobody provisions a separate lake per project — it exists the moment the tenant does, and every workspace draws from it. One lake, not one per tool.

## S3 · SCREENSHOT — The structure diagram

Here's Microsoft's own picture of it. OneLake contains a Fabric workspace, which contains a Lakehouse, a Warehouse, and a Semantic model — and each one's actual data lands as folders and files inside that same lake underneath.

## S4 · STEPS — The governance implication

Because every tool shares one lake, governance has to be applied at the OneLake layer itself — permissions, security roles, auditing — not separately per tool. A mistake isn't boxed into one product; it's visible wherever OneLake gets read from. That's what the rest of this chapter is about.

## S5 · SCREENSHOT — OneLake File Explorer

OneLake isn't only reachable through the web UI. OneLake File Explorer syncs it directly into Windows File Explorer, like OneDrive — workspaces show up as ordinary folders. Convenient, but worth remembering: it's the same OneLake, the same permissions, just a different window onto it.

## S6 · SCREENSHOT — The OneLake catalog, domain-filtered

Discovery runs through the OneLake catalog, filterable by domain — here it's scoped to Finance. A Finance analyst searching with that filter applied sees Finance's items, not the whole tenant's. The catalog gets its own full lesson in Chapter 4.

## S7 · OUTRO

Next lesson stays inside OneLake and goes specific: Lakehouses and Warehouses, the two main item types that actually store their data here.
