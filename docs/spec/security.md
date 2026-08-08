# Security and privacy

Status data can expose protected resource existence, identities, policy logic,
provider choices, tool parameters, intended actions, financial amounts, and
internal infrastructure. Implementations MUST treat an ASC envelope as
potentially sensitive data.

## Disclosure profiles

| Profile | Recipient | Typical content |
|---|---|---|
| Public | End user or untrusted client | Code, safe message, broad remediation, opaque correlation ID |
| Developer | Authenticated application developer | Scope, retry contract, provider category, structured cause |
| Operator | Privileged operations team | Dependency detail, trace references, stack reference, resource state |
| Audit | Restricted governance or security function | Policy and evaluator versions, approval identity, tamper-evident history |

The same internal event MAY produce different public and privileged envelopes.
An implementation MAY return `NOT_FOUND` instead of `PERMISSION_DENIED` when
acknowledging resource existence would disclose protected information.

## Policy confidentiality

`GUARDRAIL_BLOCKED` SHOULD expose enough information for legitimate remediation
without revealing thresholds, classifier features, or indicators that enable
bypass. Exact policy logic belongs in restricted records.

## Authenticity and authority

A delegated agent or tool MUST NOT be assumed to have authority to declare its
parent task successful. Cross-boundary reports SHOULD identify:

```json
{
  "issuer": "inventory-agent",
  "observed_by": "commerce-orchestrator",
  "authority": "child_report",
  "integrity": {
    "method": "detached_signature",
    "key_id": "inventory-agent-2026-04",
    "verified": true
  }
}
```

The receiving orchestrator SHOULD validate, normalise, and apply local policy
before selecting the parent status.

## Retry and replay

Automated retry can duplicate messages, payments, bookings, or other external
actions. A retry-safe implementation MUST enforce the [retry contract](/spec/retry/)
and MUST reconcile `RESULT_STATE_UNKNOWN` before replay.

## Data minimisation

Full prompts, tool arguments, raw provider messages, and user identifiers SHOULD
be excluded by default. They require explicit collection, access control, and a
retention policy.

Metric labels MUST NOT contain unbounded or user-controlled strings. Trace and
run identifiers SHOULD be opaque and still treated as potentially personal when
they can be linked to account records.

## Evaluator limitations

A safety or quality detector is not automatically authoritative. Statuses based
on an evaluator SHOULD record its identity, version, method, evidence
availability, review state, and fail-open or fail-closed behaviour.

A detector timeout SHOULD normally produce `OUTPUT_UNVERIFIED`, not `SUCCESS`.
An uncertain detector result SHOULD use `HALLUCINATION_SUSPECTED`, not
`HALLUCINATION_DETECTED`.
