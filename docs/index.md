---
hide:
  - toc
---

<div class="asc-hero" markdown>

<p class="asc-kicker">Experimental draft · ASC 0.1</p>

# Status codes for autonomous agents

A shared, machine-readable vocabulary for what an agent is doing, what happened,
and what can safely happen next.

[Read the specification](spec/index.md){ .md-button .md-button--primary }
[Why ASC exists](why.md){ .md-button }

</div>

```json title="A status that software can act on"
{
  "spec_version": "0.1.0",
  "status": {
    "code": 3002,
    "name": "HUMAN_APPROVAL_REQUIRED",
    "kind": "status",
    "scope": "task",
    "phase": "WAITING",
    "terminal": false
  },
  "occurred_at": "2026-08-08T12:00:00Z"
}
```

<div class="asc-formula">
agent status = phase + primary code + conditions + events + retry contract
</div>

## More than success or failure

Agent work can run for hours, invoke tools, delegate to other agents, wait for a
person, partially complete a request, and lose certainty about external side
effects. A single Boolean or exception cannot express that safely.

<div class="asc-grid" markdown>

<div class="asc-card" markdown>
<strong>Portable control flow</strong>
React consistently to approval, rate limits, policy blocks, or partial success
across frameworks and providers.
</div>

<div class="asc-card" markdown>
<strong>Side-effect-aware retry</strong>
Separate a transient failure from permission to repeat an action that might
already have committed.
</div>

<div class="asc-card" markdown>
<strong>Composable status</strong>
Report task, step, tool, evaluation, and artefact outcomes without one scope
overwriting another.
</div>

</div>

## The code space

| Range | Meaning |
|---|---|
| `1xxx` | Lifecycle and progress |
| `2xxx` | Successful outcomes |
| `3xxx` | Interrupted, deferred, or human-dependent states |
| `4xxx` | Request, authorisation, capability, and policy outcomes |
| `5xxx` | Transient operational failures |
| `6xxx` | Fatal, indeterminate, or integrity-threatening failures |
| `7xxx` | Trust, quality, grounding, and verification outcomes |
| `8xxx` | Non-terminal operational and efficiency events |
| `9xxx` | Extensions, private use, experiments, and reserved space |

[Browse the core registry →](spec/registry.md)

!!! warning "Draft status"

    ASC 0.1 is an experimental open specification. Implement it, test it, and
    challenge its semantics—but do not yet treat its registry as frozen.
