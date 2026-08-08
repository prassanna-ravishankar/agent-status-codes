# Implement ASC

An initial implementation needs one envelope, a small core registry, and safe
unknown-value handling. It does not need to replace your framework's native
types.

## 1. Emit the minimum envelope

```json
{
  "spec_version": "0.1.0",
  "status": {
    "code": 5001,
    "name": "RATE_LIMITED",
    "kind": "status",
    "scope": "tool_call",
    "terminal": false
  },
  "occurred_at": "2026-08-08T12:00:00Z"
}
```

The code and name travel together. The scope states what the status describes;
the terminal flag says whether that scope is finished.

## 2. Keep lifecycle separate

Add `status.phase` when lifecycle position matters:

```json
{
  "code": 3002,
  "name": "HUMAN_APPROVAL_REQUIRED",
  "phase": "WAITING",
  "scope": "task",
  "terminal": false
}
```

Do not replace the reason with a generic `WAITING` state.

## 3. Add a retry contract where relevant

```json
{
  "retry": {
    "retryable": true,
    "safe": true,
    "after_ms": 2000,
    "attempt": 1,
    "max_attempts": 4,
    "side_effect_state": "none"
  }
}
```

Never infer `safe` only from the numeric class. See the
[retry contract](../spec/retry.md) before automating replay.

## 4. Handle values you do not recognise

A conforming consumer:

1. verifies known code/name pairs;
2. preserves unknown fields and codes where practical;
3. falls back to the first-digit class for an unknown code;
4. uses a safe generic user message; and
5. does not assume retry safety or terminality.

```python
def status_class(code: int) -> str:
    return {
        1: "lifecycle",
        2: "success",
        3: "interrupted",
        4: "request_or_policy",
        5: "transient_failure",
        6: "fatal_or_indeterminate",
        7: "quality_or_verification",
        8: "event",
        9: "extension",
    }.get(code // 1000, "unknown")
```

## Producer checklist

- [ ] Emit the ASC version and minimum envelope fields.
- [ ] Choose one primary status for one declared scope.
- [ ] Preserve child outcomes and committed side effects.
- [ ] Use conditions for simultaneous facts and `8xxx` for events.
- [ ] Supply explicit retry and side-effect metadata.
- [ ] Separate safe public messages from protected diagnostics.

## Consumer checklist

- [ ] Validate known code/name pairs.
- [ ] Tolerate unknown fields and codes.
- [ ] Use the explicit scope and terminal flag.
- [ ] Treat human-dependent states as resumable values.
- [ ] Reconcile `RESULT_STATE_UNKNOWN` before replay.
- [ ] Keep free-form messages out of metric labels.

## Carry ASC through an existing protocol

ASC can be embedded in HTTP Problem Details, gRPC status details, A2A extensions,
MCP tool results, and OpenTelemetry attributes. Use the native protocol outcome
for its own layer and ASC for agent semantics.

[Choose a protocol binding →](../spec/bindings.md)
