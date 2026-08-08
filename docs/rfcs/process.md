# RFC process

The process is intentionally lightweight while ASC is experimental. Its purpose
is to make design reasoning and implementation evidence public, not to create a
large governance system.

## 1. Open a proposal

Copy the [RFC template](/rfcs/template/) into `docs/rfcs/NNNN-short-name.md`. Use
`0000` while the pull request is unnumbered. Include at least:

- the interoperability problem;
- the proposed normative change;
- compatibility and migration impact; and
- security, privacy, and retry implications.

The pull request is the initial discussion forum.

## 2. Enter Draft

A proposal becomes Draft when it is sufficiently distinct, cross-framework in
scope, and worth preserving in the public RFC set. It receives the next number,
is added to the RFC index and navigation, and may continue evolving.

Draft does not imply approval or stability. Experimental implementations should
identify the RFC and remain feature-gated where practical.

## 3. Become Active

An RFC becomes Active when concrete design, test vectors, adapters, or independent
implementations are being developed. It should have an owner, open questions,
and a plausible path to validation.

## 4. Reach a terminal decision

An RFC becomes:

- **Accepted** when its direction is approved and tied to a specification
  release;
- **Rejected** when the project deliberately chooses not to adopt it; or
- **Superseded** when a later RFC replaces it.

Final decision authority is **TBD**. Until that is resolved, no RFC should claim
a terminal decision without an explicit, publicly recorded project decision.

## Evidence expected before acceptance

The strength of evidence should match the change. A core registry or envelope
change should normally include:

- examples from more than one framework or runtime;
- boundary cases that distinguish it from existing semantics;
- unknown-value and backward-compatibility behaviour;
- security and privacy analysis;
- retry and side-effect analysis where applicable; and
- test vectors or interoperable implementation experience.

## Updating an RFC

RFCs are living documents before acceptance. Substantial changes should update
the changelog section and resolve or preserve earlier objections. Accepted RFCs
are historical records; amend the protocol through a new RFC rather than
silently rewriting the original decision.
