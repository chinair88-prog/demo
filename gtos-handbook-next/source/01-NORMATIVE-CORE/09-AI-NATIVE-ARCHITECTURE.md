# AI-Native Architecture

## AI control plane

GTOS AI consists of:

- AI Gateway and provider abstraction;
- Model Router and policy-aware selection;
- Context Builder and governed retrieval;
- Prompt and instruction registry;
- Agent Runtime and state machine;
- Planner, critic, verifier, and supervisor;
- Tool Registry and execution gateway;
- short-term, episodic, semantic, and organizational memory;
- evaluation, observability, safety, incident, and kill-switch systems.

## Autonomy levels

- A0: information only;
- A1: recommendation requiring human Decision;
- A2: automatic low-risk action with reviewable evidence;
- A3: bounded workflow autonomy under policy and approval thresholds;
- A4: exceptional high autonomy allowed only for explicitly certified domains.

Financial, legal, customs, quality release, custody, privileged security, and authoritative correction actions default to A0 or A1.

## Agent run record

Every run records tenant, principal, purpose, input, knowledge cutoff, context sources, prompt/model/tool versions, policy evaluations, approvals, tool calls, structured outputs, uncertainty, costs, observed outcomes, corrections, and evaluation.

## RAG and memory

Retrieved text is evidence, not authority. Sources require access control, version, effective time, provenance, and freshness. Memory cannot silently create canonical business facts.

## Evaluation

Evaluate quality, factuality, safety, security, policy compliance, tool correctness, business outcome, latency, cost, drift, and subgroup performance. Promotions require sample thresholds, human approval, rollback, and incident controls.
