# Code registry

This page is the authoritative registry for the ASC 0.1 experimental draft.

## Numbering rules

1. Codes are unsigned four-digit decimal integers, displayed as `ASC-5001`.
2. Names use uppercase ASCII `SNAKE_CASE`.
3. Producers MUST include both `code` and `name`.
4. Consumers MUST treat a mismatched registered pair as an implementation or
   integrity error.
5. Codes describe portable semantics, not provider-specific exceptions.
6. Unknown codes MUST be handled by their first-digit class.
7. Assigned codes are sparse to leave room for related concepts.

The “retry” column is a default indication. It never overrides an explicit
[retry contract](/spec/retry/), idempotency requirements, side-effect certainty, or
attempt budget.

## 1xxx: Lifecycle and progress

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `1000` | `ACCEPTED` | Work was acknowledged but substantive execution has not started. | No | N/A |
| `1010` | `RUNNING` | Work is actively progressing. | No | N/A |
| `1020` | `WAITING_DEPENDENCY` | Work is paused until a declared dependency becomes available. | No | Conditional |
| `1030` | `RETRY_SCHEDULED` | Another attempt has been scheduled under policy. | No | Yes |

## 2xxx: Successful outcomes

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `2000` | `SUCCESS` | The requested goal was fully achieved. | Yes | No |
| `2001` | `SUCCESS_WITH_WARNINGS` | The goal was achieved with non-blocking caveats. | Yes | No |
| `2002` | `PARTIAL_SUCCESS` | Some independently requested units succeeded and others did not. | Yes | Per failed unit |
| `2003` | `NO_ACTION_REQUIRED` | The request was valid, but the desired state already held or no action was necessary. | Yes | No |

`SUCCESS_WITH_WARNINGS` means the goal was achieved. `PARTIAL_SUCCESS` means at
least one independently requested result or side effect was not achieved.

## 3xxx: Interrupted, deferred, or human-dependent

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `3001` | `HUMAN_INPUT_REQUIRED` | Missing or ambiguous information must be supplied by a person. | No | After input |
| `3002` | `HUMAN_APPROVAL_REQUIRED` | A proposed action awaits an explicit human decision. | No | After approval |
| `3003` | `AUTHENTICATION_REQUIRED` | Authentication, reauthentication, or delegated credentials are needed. | No | After authentication |
| `3004` | `CANCELLED` | Execution was cancelled by an authorised actor. | Yes | Normally no |

Human-dependent codes represent expected resumable control flow. Implementations
SHOULD return them as values rather than programming exceptions.

## 4xxx: Request, authorisation, capability, and policy

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `4000` | `INVALID_REQUEST` | Input is syntactically or semantically invalid. | Yes | After correction |
| `4001` | `FAILED_PRECONDITION` | A valid operation cannot proceed in the current state. | Yes | After state repair |
| `4002` | `PERMISSION_DENIED` | The authenticated principal is not authorised for the operation. | Yes | After permission change |
| `4003` | `GUARDRAIL_BLOCKED` | A policy or safety control prohibited the proposed action or output. | Yes | Normally no |
| `4004` | `POLICY_REDACTED` | Policy transformed, removed, or withheld part of an otherwise usable result. | Contextual | No |
| `4005` | `CONFLICT` | A concurrent update, version, or state conflict prevented completion. | Yes | Conditional |
| `4006` | `NOT_FOUND` | A required task, resource, agent, or tool could not be located. | Yes | Normally no |
| `4007` | `UNSUPPORTED_CAPABILITY` | The requested capability is not implemented or advertised. | Yes | No |

`PERMISSION_DENIED` is an authorisation decision about a principal and resource.
`GUARDRAIL_BLOCKED` is a policy decision about proposed content, context, or
action. Producers MUST NOT use them as synonyms.

## 5xxx: Transient operational failures

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `5000` | `RETRYABLE_ERROR` | An unclassified transient failure for which a bounded retry may succeed. | Contextual | With policy |
| `5001` | `RATE_LIMITED` | A provider, tenant, or tool rate limit was reached. | Contextual | After delay |
| `5002` | `RESOURCE_EXHAUSTED` | A token, memory, compute, context, storage, or quota resource was exhausted. | Contextual | Conditional |
| `5003` | `DEPENDENCY_UNAVAILABLE` | A required model, tool, agent, or service is temporarily unavailable. | Contextual | Usually |
| `5004` | `TIMEOUT` | A declared deadline expired before a definitive result was obtained. | Contextual | Conditional |
| `5005` | `TOOL_EXECUTION_FAILED` | A tool accepted an invocation but failed while executing it. | Contextual | Tool-specific |
| `5006` | `ABORTED_CONCURRENCY` | The operation was aborted due to concurrency or transactional conflict. | Yes | At a higher level |

`TIMEOUT` says that a deadline elapsed. It does not by itself say whether the
operation committed or whether replay is safe.

## 6xxx: Fatal, indeterminate, or integrity-threatening failures

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `6000` | `FATAL_ERROR` | An unrecoverable failure not represented by a more specific code. | Yes | No |
| `6001` | `INTERNAL_ERROR` | An unexpected exception, invariant violation, or implementation defect occurred. | Yes | Not automatically |
| `6002` | `MODEL_BEHAVIOUR_ERROR` | A model emitted malformed structure, an unknown tool call, or another protocol-invalid action. | Contextual | Conditional fallback |
| `6003` | `DATA_LOSS` | Required state, memory, evidence, or an artefact was lost or corrupted. | Yes | No |
| `6004` | `MAX_ITERATIONS_EXCEEDED` | A turn, step, recursion, or loop budget was exhausted. | Yes | Only under revised policy |
| `6005` | `RESULT_STATE_UNKNOWN` | The system cannot determine whether a potentially side-effecting operation committed. | Yes | Never blindly |

`RESULT_STATE_UNKNOWN` takes precedence over generic retry advice. Consumers
MUST reconcile the original operation before repeating it.

## 7xxx: Trust, quality, grounding, and verification

| Code | Name | Meaning | Default terminal | Retry |
|---:|---|---|:---:|---|
| `7000` | `OUTPUT_UNVERIFIED` | Required verification was unavailable or not completed. | Contextual | Conditional |
| `7001` | `LOW_CONFIDENCE` | A named quality metric fell below its declared threshold. | Contextual | Conditional |
| `7002` | `HALLUCINATION_SUSPECTED` | A detector found indicators of unsupported or contradictory content without conclusive verification. | Contextual | Regeneration possible |
| `7003` | `HALLUCINATION_DETECTED` | A declared verification procedure established that material output lacks required support or contradicts authoritative evidence. | Contextual | Repair or regenerate |
| `7004` | `PROVENANCE_INCOMPLETE` | Required source, evidence, or derivation lineage is missing. | Contextual | Conditional |
| `7005` | `INTEGRITY_CHECK_FAILED` | A signature, hash, schema, policy attestation, or equivalent integrity check failed. | Contextual | Normally no |

`HALLUCINATION_DETECTED` requires declared evidence and a verification method.
Heuristics, evaluator disagreement, and uncalibrated confidence SHOULD use
`HALLUCINATION_SUSPECTED`.

## 8xxx: Operational and efficiency events

| Code | Name | Meaning |
|---:|---|---|
| `8000` | `PROMPT_CACHE_HIT` | Eligible input was served wholly or partly from a prompt cache. |
| `8001` | `PROMPT_CACHE_MISS` | Eligible input was not served from a prompt cache. |
| `8002` | `FALLBACK_USED` | Execution switched to an alternate model, tool, agent, or route. |
| `8003` | `RETRY_ATTEMPTED` | Another execution attempt began. |

All `8xxx` assignments are event-only in ASC 0.1. They MUST NOT replace the
primary outcome of the reported scope.

## 9xxx: Extension space

| Range | Policy |
|---|---|
| `9000–9499` | Registered extensions; policy TBD |
| `9500–9799` | Private use; not portable between organisations |
| `9800–9899` | Time-bounded experiments; not permanent public contracts |
| `9900–9999` | Reserved for future specification work |
