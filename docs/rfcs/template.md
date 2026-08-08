# RFC template

Copy this template to `docs/rfcs/0000-short-name.md` and replace every placeholder.
The number is assigned when a proposal enters Draft.

````markdown
---
title: "ASC RFC 0000: Short title"
description: One-sentence summary of the proposed change.
---

# ASC RFC 0000: Short title

| Field | Value |
|---|---|
| Status | Proposal |
| Authors | Name or handle |
| Created | YYYY-MM-DD |
| Target version | ASC 0.x |
| Discussion | Pull request URL |

## Summary

State the proposal in a few sentences.

## Motivation

Describe the interoperability problem. Include concrete examples from agent
frameworks, protocols, or applications.

## Proposed specification

Write the normative change. Identify additions, removals, and exact boundaries
with existing semantics.

## Compatibility and migration

Explain producer, consumer, unknown-value, versioning, and rollout behaviour.

## Security and privacy

Describe disclosure, integrity, abuse, replay, retry, and side-effect risks.

## Alternatives

Record credible alternatives and why they were not selected.

## Open questions

- [ ] Question that must be resolved

## Implementation evidence

Link adapters, test vectors, prototypes, benchmarks, or independent
implementations.

## Changelog

| Date | Change |
|---|---|
| YYYY-MM-DD | Initial proposal |
````

Keep the document focused on the decision. Provider-specific detail that does
not affect interoperability belongs in examples or extension data, not the
normative core.
