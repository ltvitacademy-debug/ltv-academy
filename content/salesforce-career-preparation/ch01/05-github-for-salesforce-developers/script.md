# Lesson 5 — GitHub for Salesforce Developers · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Your Salesforce metadata can live in Git and GitHub, checkable like any other codebase -- if you build it source-driven from the start.

## S2 · STEPS — Source-driven development

Source-driven development means your local, version-controlled files are the source of truth, not the org. The Salesforce CLI is what moves metadata between the two -- that's what makes a Salesforce project something you can actually commit.

## S3 · CODE — The current CLI

The current Salesforce CLI ships as the npm package at-salesforce-slash-cli, and every command starts with sf. Older tutorials use sfdx -- that was the previous major version. Log in with sf org login web, then generate a real source-driven project with sf template generate project.

## S4 · CODE — Deploy and retrieve

Two commands move metadata in each direction. sf project deploy start pushes your local source into the org. sf project retrieve start pulls org changes back into your local source.

## S5 · STEPS — What belongs in the repo

Commit the real configuration: objects, fields, Flows, permission sets. Never commit real data, auth URLs, or security tokens -- the standard Salesforce DX gitignore already excludes those by default, so leave it alone.

## S6 · OUTRO

Next lesson: the Trailblazer Community -- where a surprising number of Salesforce careers actually get built.
