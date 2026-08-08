---
hide:
  - navigation
  - toc
---

<!--
THESIS: ASC makes agent state interoperable; this surface refuses the generic documentation hero and feature-card grid.
OWN-WORLD: paper-white civic wayfinding, ink rules, compressed signage type, and nine semantic route colours.
STORY: status becomes protocol at a system boundary; readers inspect the five-part model, enter a numeric class, then implement ASC 0.1.
FIRST VIEWPORT: a decisive thesis sits beside one restrained status interchange; the 1xxx–9xxx registry begins immediately below as the primary action.
FORM: public-infrastructure registry atlas, grounded direction 6, seed 6d2ac4f3.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->

<div class="asc-home" markdown>

<section class="asc-opening" aria-labelledby="asc-title" markdown>

<div class="asc-opening-copy" markdown>

# Status codes for agents { #asc-title }

A shared, machine-readable vocabulary for agents and applications to report
progress, outcomes, human input, and recovery.

<div class="asc-actions">
  <a class="asc-action asc-action--primary" href="#code-space">Explore the code space <span aria-hidden="true">↓</span></a>
  <a class="asc-action" href="spec/">Read ASC 0.1 <span aria-hidden="true">→</span></a>
</div>

</div>

<figure class="asc-interchange" aria-labelledby="interchange-title">
  <div class="asc-interchange-head">
    <span id="interchange-title">Example status</span>
    <span>ASC 0.1 · experimental</span>
  </div>
  <div class="asc-route asc-route--phase">
    <span class="asc-route-label">Phase</span>
    <span class="asc-route-line" aria-hidden="true"></span>
    <code>WAITING</code>
  </div>
  <div class="asc-route asc-route--primary">
    <span class="asc-route-label">Primary</span>
    <span class="asc-route-line" aria-hidden="true"></span>
    <code>3002</code>
  </div>
  <div class="asc-route asc-route--condition">
    <span class="asc-route-label">Conditions</span>
    <span class="asc-route-line" aria-hidden="true"></span>
    <code>0..n</code>
  </div>
  <div class="asc-route asc-route--event">
    <span class="asc-route-label">Events</span>
    <span class="asc-route-line" aria-hidden="true"></span>
    <code>0..n</code>
  </div>
  <div class="asc-route asc-route--retry">
    <span class="asc-route-label">Retry</span>
    <span class="asc-route-line" aria-hidden="true"></span>
    <code>EXPLICIT</code>
  </div>
  <a class="asc-junction" href="spec/registry/#3xxx-interrupted-deferred-or-human-dependent">
    <span>ASC</span>
    <strong>3002</strong>
    <small>HUMAN_APPROVAL_REQUIRED</small>
  </a>
</figure>

</section>

<section class="asc-code-space" id="code-space" aria-labelledby="code-space-title" markdown>

<header class="asc-section-head">
  <h2 id="code-space-title">Browse the code classes</h2>
  <p>The first digit is the safe fallback when a consumer does not recognise a specific code.</p>
</header>

<nav class="asc-class-index" aria-label="Agent Status Code classes">
  <a class="asc-class asc-class--1" href="spec/registry/#1xxx-lifecycle-and-progress"><span class="asc-class-code">1xxx</span><strong>Lifecycle and progress</strong><span>Accepted, running, waiting, scheduled</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--2" href="spec/registry/#2xxx-successful-outcomes"><span class="asc-class-code">2xxx</span><strong>Successful outcomes</strong><span>Complete, partial, or no action required</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--3" href="spec/registry/#3xxx-interrupted-deferred-or-human-dependent"><span class="asc-class-code">3xxx</span><strong>Interrupted and human-dependent</strong><span>Input, approval, authentication, or terminal cancellation</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--4" href="spec/registry/#4xxx-request-authorisation-capability-and-policy"><span class="asc-class-code">4xxx</span><strong>Request and policy</strong><span>Validity, permission, capability, guardrails</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--5" href="spec/registry/#5xxx-transient-operational-failures"><span class="asc-class-code">5xxx</span><strong>Transient failures</strong><span>Rate limits, timeouts, unavailable dependencies</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--6" href="spec/registry/#6xxx-fatal-indeterminate-or-integrity-threatening-failures"><span class="asc-class-code">6xxx</span><strong>Fatal and indeterminate</strong><span>Internal error, data loss, unknown result state</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--7" href="spec/registry/#7xxx-trust-quality-grounding-and-verification"><span class="asc-class-code">7xxx</span><strong>Trust and verification</strong><span>Confidence, grounding, provenance, integrity</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--8" href="spec/registry/#8xxx-operational-and-efficiency-events"><span class="asc-class-code">8xxx</span><strong>Operational events</strong><span>Cache, fallback, and retry observations</span><i aria-hidden="true">→</i></a>
  <a class="asc-class asc-class--9" href="spec/registry/#9xxx-extension-space"><span class="asc-class-code">9xxx</span><strong>Extension space</strong><span>Registered, private, and experimental use</span><i aria-hidden="true">→</i></a>
</nav>

</section>

<section class="asc-protocol-claim" aria-labelledby="boundary-title" markdown>
  <div markdown>

## Why ASC exists { #boundary-title }

HTTP status codes let a client act on a response without knowing how the server
is built. Agent integrations lack that shared vocabulary, so every agent and
application pair invents terms for running, waiting, partial success, human
input, and recovery. ASC defines those meanings once so applications can act on
them consistently.

[Why ASC exists](why.md){ .asc-text-link }

  </div>
  <blockquote>
    <p>A retryable failure is not the same thing as a safe retry.</p>
    <cite>ASC retry contract</cite>
  </blockquote>
</section>

<section class="asc-five" aria-labelledby="five-title" markdown>

<header class="asc-section-head">
  <h2 id="five-title">The five parts of a status report</h2>
  <p>Each part answers a different control-flow question and remains independently useful.</p>
</header>

<ol class="asc-five-list">
  <li><span>Phase</span><p>Where is this scope in its lifecycle?</p></li>
  <li><span>Primary status</span><p>What is the best current summary?</p></li>
  <li><span>Conditions</span><p>What other durable facts remain true?</p></li>
  <li><span>Events</span><p>What happened without replacing the outcome?</p></li>
  <li><span>Retry contract</span><p>May another attempt happen safely?</p></li>
</ol>

[Learn the model](get-started/concepts.md){ .asc-text-link }

</section>

<section class="asc-envelope" aria-labelledby="envelope-title" markdown>
  <div markdown>

## Use ASC with existing protocols { #envelope-title }

ASC does not replace HTTP, gRPC, A2A, MCP, OpenTelemetry, or framework-native
types. It gives each of them a stable agent-status payload.

[Start implementing](get-started/implementation.md){ .asc-action .asc-action--primary }
[Protocol bindings](spec/bindings.md){ .asc-action }

  </div>

```json title="A resumable human gate"
{
  "spec_version": "0.1.0",
  "status": {
    "code": 3002,
    "name": "HUMAN_APPROVAL_REQUIRED",
    "scope": "task",
    "phase": "WAITING",
    "terminal": false
  },
  "occurred_at": "2026-08-08T12:00:00Z"
}
```
</section>

<section class="asc-open-draft" aria-labelledby="draft-title" markdown>
  <div>
    <h2 id="draft-title">ASC 0.1 is experimental</h2>
    <p>The draft is experimental. Implement it, identify ambiguous boundaries, and propose changes with concrete cases.</p>
  </div>
  <div class="asc-draft-links">
    <a href="rfcs/">Open an RFC <span aria-hidden="true">→</span></a>
    <a href="contributing/">Contribute <span aria-hidden="true">→</span></a>
  </div>
</section>

</div>
