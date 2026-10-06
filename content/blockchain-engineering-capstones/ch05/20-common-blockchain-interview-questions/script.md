# Lesson 20 — Common Blockchain Interview Questions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson covers the questions that show up again and again in blockchain interviews -- and the shape of a strong answer for each.

## S2 · STEPS — The universal opener

"Walk me through a contract call" is close to a universal opener. A strong answer names the signature, the mempool, the nonce and gas ordering, block inclusion, EVM execution against state, and the revert behavior where gas spent isn't refunded.

## S3 · STEPS — EVM fundamentals

Interviewers probe gas and why storage writes are expensive, the difference between storage, memory, and calldata, and the real distinction between msg.sender and tx.origin -- and why tx.origin-based authorization is a known vulnerability.

## S4 · STEPS — Security pitfalls

Four come up at every level: reentrancy, from an external call made before state updates; integer overflow, checked by default since Solidity 0.8 but disabled inside an unchecked block; access control gaps, a sensitive function with no role check at all; and front-running, since pending transactions are visible before confirmation.

## S5 · STEPS — Gas optimization

Common questions: why uint256 often beats uint8 standalone, why minimizing storage writes matters more than reads, and why external can beat public. The honest answer explains the mechanism, not just the memorized rule.

## S6 · OUTRO

Next lesson: whiteboard and security-review exercises -- putting these same security pitfalls into practice, live.
