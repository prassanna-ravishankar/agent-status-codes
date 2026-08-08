# Agent Status Codes 0.1

**Status:** Experimental draft
**Identifier:** ASC
**Version:** 0.1.0
**Licence:** MIT

This document defines Agent Status Codes (ASC), a shared vocabulary for status
reports exchanged between agents and applications. A conforming ASC payload
makes lifecycle, outcome, simultaneous conditions, events, and retry safety
portable without requiring a shared agent framework.

## Conformance language

The terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** express
normative requirements in this specification.

## Protocol invariants

1. **One scope, one primary status.** Every primary status describes a declared
   task, step, tool call, model call, handoff, policy decision, evaluation, or
   artefact.
2. **Transport and agent semantics remain separate.** Reading a failed run can
   still be a successful HTTP request.
3. **Severity is independent.** A status identifies what happened; deployment
   policy determines urgency.
4. **Retry safety is explicit.** A transient failure does not imply that replay
   is safe.
5. **Interruption is not failure.** Human input, approval, and authentication are
   resumable states.
6. **Unknown values degrade safely.** Consumers use the numeric class when they
   do not recognise a specific code.
7. **Provider detail remains available.** Standard codes normalise semantics
   without discarding causal or provider-specific diagnostics.

## Specification map

- [Status model](status-model.md) defines phases, scopes, status kinds, and
  composition.
- [Code registry](registry.md) defines the experimental core assignments.
- [Status envelope](envelope.md) defines the canonical JSON representation.
- [Retry contract](retry.md) defines safe replay and side-effect handling.
- [Protocol bindings](bindings.md) defines projections into existing protocols.
- [Security and privacy](security.md) defines disclosure and integrity rules.

## Compatibility contract

Within a stable major version:

- an assigned code's meaning MUST NOT change;
- an assigned code MUST NOT be reused;
- new optional fields MAY be added;
- consumers MUST ignore unknown fields;
- consumers MUST retain unknown codes where practical; and
- consumers MUST fall back to the code's first-digit class.

ASC 0.1 is experimental. Assignments may change before the first stable release,
and implementations SHOULD advertise that fact.

## Conformance profiles

| Profile | Requirement |
|---|---|
| Core producer | Emits a valid code/name pair, version, scope, terminal flag, and timestamp |
| Core consumer | Handles unknown codes and fields with a safe fallback |
| Retry-safe | Implements the retry contract and unknown-result handling |
| Observability | Exports bounded attributes, transitions, and trace correlation |
| Human interaction | Supports resumable input and approval states |
| Secure | Applies disclosure, redaction, integrity, and audit controls |
| Protocol binding | Implements and tests at least one defined binding |
