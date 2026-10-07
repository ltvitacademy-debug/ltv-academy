# Script — High-Throughput Data Loading

## Segment 1 (title)

Chapter 4 made sure Solara-70B's training run survives a crash. But fault tolerance only protects progress the cluster has already made — it does nothing about five hundred twelve H100s sitting partially idle every step because the data to train on hasn't arrived yet. This chapter is about making sure that never happens, starting with what "fast enough" actually means.

## Segment 2 (steps)

Before tuning anything, work out the target. Say Solara-70B trains on a global batch of four million tokens a step, around a thousand sequences, with a measured step time of six seconds. Spread across sixty-four nodes, each node has to read and prepare its slice of that batch comfortably inside that six-second window, every single step, for the life of the run. If a node's loader can only sustain half that rate, the job doesn't crash — it just quietly trains at half speed, and that's what the Solara ML Platform team calls GPU starvation.

## Segment 3 (code)

PyTorch's DataLoader has four settings that do most of the work. num_workers spins up separate processes to read and preprocess data so it doesn't block the GPU-facing loop. prefetch_factor controls how many batches each worker prepares in advance. pin_memory allocates batches in page-locked host memory for a faster, asynchronous copy onto the GPU. And persistent_workers keeps those worker processes alive across epochs instead of respawning them on every node, every epoch.

## Segment 4 (steps)

Layout matters as much as settings. Object storage like S3 has real per-request latency, tens of milliseconds is typical, and a dataset split into millions of tiny files turns every sample into its own request. At this scale that latency multiplies into real wasted time across every rank, every step. The fix is packing samples into large sequential shards and streaming through them, so one request pulls many samples instead of one.

## Segment 5 (outro)

A training step has a hard throughput requirement, and DataLoader tuning plus avoiding small-file latency is how a node meets it. Next, Lesson 25: how Solara AI actually shards its data to make that streaming possible.
