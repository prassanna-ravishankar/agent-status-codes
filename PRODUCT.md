# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are framework authors and agent builders deciding how autonomous work reports state across runtime, protocol, provider, and application boundaries. They need semantics that software can act on without reconstructing intent from exceptions, logs, strings, or framework-specific enums.

Secondary users are protocol implementers and contributors evaluating, testing, and evolving the experimental specification.

## Product Purpose

Agent Status Codes (ASC) defines a shared semantic control layer for autonomous work: what an agent is doing, what happened at a declared scope, what remains true, and what may safely happen next.

Success means independently built runtimes, agents, tools, and user interfaces can exchange actionable task state without adopting the same framework or confusing transport success with agent outcome.

## Positioning

ASC separates lifecycle phase, one scoped primary status, simultaneous conditions, point-in-time events, and an explicit side-effect-aware retry contract. Together, these constructs turn status from an implementation detail into an interoperability surface.

## Operating Context

Readers evaluate ASC through the public specification, code registry, canonical envelope, protocol bindings, implementation examples, and RFC process. Implementations may carry ASC through HTTP, gRPC, A2A, MCP, OpenTelemetry, or framework-native types.

The primary public journey is to understand the model, inspect a concrete status envelope, and begin implementing ASC. Substantial changes proceed through RFCs.

## Capabilities and Constraints

- ASC 0.1 is an experimental draft, not a frozen standard.
- The specification is published with Zensical and released under the MIT License.
- Numeric meanings, scope, terminality, retry safety, and side-effect certainty are protocol facts, not visual metaphors.
- Human input, approval, and authentication are resumable control flow rather than generic failure.
- Transport outcome and agent-task outcome remain separate.
- Unknown values must degrade safely.
- Final governance and RFC decision authority remain open decisions.

## Brand Commitments

- Public name: Agent Status Codes.
- Short name: ASC.
- Voice: exact, confident, technically literate, and free of marketing filler. The implications may be ambitious; factual maturity must remain honest.
- The interface must not resemble a generic AI startup, crypto product, dressed-up documentation template, or bureaucratic standards portal.
- The current raster artwork is available evidence, not a protected identity asset.

## Evidence on Hand

- `agent-status-codes.md`: researched editorial source material; not normative.
- `docs/spec/`: the ASC 0.1 normative model and registry.
- `docs/examples.md`: informative scenarios showing approval, partial success, verification, and retry behavior.
- `docs/assets/images/`: incumbent raster mark and signal animation; replaceable.
- No external adoption, benchmark, customer, or implementation claims may be fabricated.

## Product Principles

1. Make state actionable across boundaries.
2. Preserve uncertainty instead of inventing safety.
3. Model autonomous work as scoped, composable control flow.
4. Prove the protocol through concrete envelopes and decisions.
5. Invite implementation evidence before claiming stability.

## Accessibility & Inclusion

The public specification must remain keyboard navigable, readable without motion, legible at narrow and wide viewports, and usable with system light, dark, contrast, and reduced-motion preferences.
