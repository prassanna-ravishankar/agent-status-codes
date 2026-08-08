# Agent Status Codes

[![CI](https://github.com/prassanna-ravishankar/agent-status-codes/actions/workflows/ci.yml/badge.svg)](https://github.com/prassanna-ravishankar/agent-status-codes/actions/workflows/ci.yml)
[![ASC 0.1](https://img.shields.io/badge/ASC-0.1%20experimental-7c3aed)](https://agentstatuscodes.org/spec/)
[![License: MIT](https://img.shields.io/badge/License-MIT-155eef.svg)](LICENSE)

Agent Status Codes (ASC) is an open specification for reporting the lifecycle,
outcome, conditions, events, and retry semantics of autonomous-agent work.

The first audience is framework authors and agent builders who currently have
to translate between exceptions, task states, tool-result strings, graph
interrupts, provider error codes, and dashboard-specific labels.

**Website:** [agentstatuscodes.org](https://agentstatuscodes.org)

**Current specification:** ASC 0.1, experimental draft

## Why another status system?

An agent can run for hours, invoke tools, delegate work, pause for a person,
partially complete a request, fail verification, or time out without knowing
whether an external action committed. A Boolean, exception, HTTP status, or
process exit code cannot express all of that safely.

ASC separates five constructs:

```text
agent status = phase + primary code + conditions + events + retry contract
```

The retry contract matters. A failure can be transient while repeating the
operation remains unsafe because a payment, message, booking, or other mutation
may already have committed.

## Minimum envelope

```json
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

The code and name travel together. The scope identifies what is being reported,
and the terminal flag applies to that scope rather than the entire workflow.

## Read the specification

- [Why ASC exists](https://agentstatuscodes.org/why/)
- [Core concepts](https://agentstatuscodes.org/get-started/concepts/)
- [Implementation checklist](https://agentstatuscodes.org/get-started/implementation/)
- [ASC 0.1 specification](https://agentstatuscodes.org/spec/)
- [Core code registry](https://agentstatuscodes.org/spec/registry/)
- [Canonical envelope](https://agentstatuscodes.org/spec/envelope/)
- [Retry contract](https://agentstatuscodes.org/spec/retry/)
- [Protocol bindings](https://agentstatuscodes.org/spec/bindings/)
- [Requests for Comments](https://agentstatuscodes.org/rfcs/)

## Local development

The site is built with [Zensical](https://zensical.org/) and its version is
pinned by `uv.lock`.

```sh
uv sync
uv run zensical serve
```

Run the same documentation gate as CI:

```sh
uv run zensical build --clean --strict
```

The complete local verification sequence is documented in [AGENTS.md](AGENTS.md).

## Repository map

| Path | Purpose |
|---|---|
| `docs/get-started/` | Short path from motivation to implementation |
| `docs/spec/` | Normative ASC 0.1 specification and registry |
| `docs/rfcs/` | Durable proposal space for substantial changes |
| `agent-status-codes.md` | Research source material; not normative |
| `zensical.toml` | Site navigation and presentation |

## RFCs and contributions

Substantial interoperability changes should begin with the
[RFC template](docs/rfcs/template.md). Corrections, examples, and clearer wording
can use a normal pull request.

ASC 0.1 is experimental. Its assignments may change before the first stable
release, and implementations should advertise that fact.

See [Contributing](docs/contributing.md) for the current process. Final RFC
decision authority remains TBD while the project is young.

## License

[MIT](LICENSE)
