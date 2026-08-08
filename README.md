<p align="center">
  <a href="https://agentstatuscodes.org" aria-label="Agent Status Codes">
    <img src="docs/assets/images/asc-mark-v2.svg" width="96" height="96" alt="Agent Status Codes mark">
  </a>
</p>

# Agent Status Codes

[![CI](https://github.com/prassanna-ravishankar/agent-status-codes/actions/workflows/ci.yml/badge.svg)](https://github.com/prassanna-ravishankar/agent-status-codes/actions/workflows/ci.yml)
[![ASC 0.1](https://img.shields.io/badge/ASC-0.1%20experimental-1637f2)](https://agentstatuscodes.org/spec/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10172a.svg)](LICENSE)

Agent Status Codes (ASC) is an open specification for communication between
agents and the applications that use them. It gives both sides a portable,
machine-readable vocabulary for progress, outcomes, human input, and recovery.

**[Read the protocol at agentstatuscodes.org](https://agentstatuscodes.org)**

## Why agents need status codes

HTTP status codes let a client interpret a response without knowing how the
server is built. Because both sides share the same vocabulary, the client can
follow a redirect, request authentication, back off, or stop.

Agent interactions have no equivalent common language. Each agent and
application integration invents its own terms for running, waiting for a
person, partial success, policy refusal, and retry. Applications must then
translate those terms before they can decide what to display or do next.

ASC standardises that interaction. A report keeps five pieces of state
distinct: lifecycle phase, one primary code, any conditions that remain true,
events that occurred, and an explicit retry contract. The last part matters
because a transient failure does not make replay safe. A payment, message,
booking, or other mutation may have committed even when its response was lost.

## The code space

| Class | Meaning |
|---|---|
| [`1xxx`](https://agentstatuscodes.org/spec/registry/#1xxx-lifecycle-and-progress) | Lifecycle and progress |
| [`2xxx`](https://agentstatuscodes.org/spec/registry/#2xxx-successful-outcomes) | Successful outcomes |
| [`3xxx`](https://agentstatuscodes.org/spec/registry/#3xxx-interrupted-deferred-or-human-dependent) | Interrupted and human-dependent |
| [`4xxx`](https://agentstatuscodes.org/spec/registry/#4xxx-request-authorisation-capability-and-policy) | Request, authorisation, capability, and policy |
| [`5xxx`](https://agentstatuscodes.org/spec/registry/#5xxx-transient-operational-failures) | Transient operational failures |
| [`6xxx`](https://agentstatuscodes.org/spec/registry/#6xxx-fatal-indeterminate-or-integrity-threatening-failures) | Fatal, indeterminate, or integrity-threatening failures |
| [`7xxx`](https://agentstatuscodes.org/spec/registry/#7xxx-trust-quality-grounding-and-verification) | Trust, quality, grounding, and verification |
| [`8xxx`](https://agentstatuscodes.org/spec/registry/#8xxx-operational-and-efficiency-events) | Operational and efficiency events |
| [`9xxx`](https://agentstatuscodes.org/spec/registry/#9xxx-extension-space) | Extensions, private use, and experiments |

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

The code and name travel together. Scope identifies what is being reported;
terminality applies to that scope rather than the entire workflow.

## Start here

- [Why status needs a protocol](https://agentstatuscodes.org/why/)
- [Core concepts](https://agentstatuscodes.org/get-started/concepts/)
- [Implementation checklist](https://agentstatuscodes.org/get-started/implementation/)
- [ASC 0.1 specification](https://agentstatuscodes.org/spec/)
- [Code registry](https://agentstatuscodes.org/spec/registry/)
- [Retry contract](https://agentstatuscodes.org/spec/retry/)
- [Requests for Comments](https://agentstatuscodes.org/rfcs/)

## Work on the specification

The site uses [Zensical](https://zensical.org/) with a version pinned in
`uv.lock`.

```sh
uv sync
uv run zensical serve
```

Run the documentation gate before submitting changes:

```sh
uv run zensical build --clean --strict
```

Substantial interoperability changes begin with the
[RFC template](docs/rfcs/template.md). Corrections, examples, test vectors, and
clearer normative wording can use a normal pull request.

ASC 0.1 is experimental. Implement it, test its boundaries, and bring evidence
before the registry becomes stable.

## License

[MIT](LICENSE)
