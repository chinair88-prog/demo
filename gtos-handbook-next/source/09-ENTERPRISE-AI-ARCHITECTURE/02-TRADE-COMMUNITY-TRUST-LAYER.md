# ALLINB2C Trade Community and Trust Layer

## 1. Product definition

The Community capability is not a detached legacy forum. It is a domain layer that connects trade discussion, professional Q&A, verified case studies, reputation, route intelligence, and structured knowledge to the GTOS transaction lifecycle.

Its job is to convert lived trade experience into reusable decision support for buyers, suppliers, sourcing agents, logistics providers, customs specialists, tax specialists, and platform operators.

## 2. Strategic outcomes

The capability must:

- increase trust before transactions;
- reduce operational risk during transactions;
- capture lessons after transactions;
- create searchable and multilingual trade knowledge;
- support supplier, buyer, and service-provider reputation;
- improve organic discovery and retention;
- provide grounded retrieval sources for AI assistants;
- connect users across countries, industries, and routes.

## 3. Bounded contexts

### Community Content

Owns discussions, articles, alerts, comments, reactions, bookmarks, follows, attachments, drafts, publishing states, and content visibility.

### Questions and Answers

Owns questions, answers, accepted answers, expert and official answers, duplicate detection, related-question retrieval, and answer quality signals.

### Case Studies

Owns structured success, failure, risk, and retrospective cases. Cases may reference orders, suppliers, products, routes, shipments, inspections, customs events, payments, and disputes without exposing confidential fields.

### Reputation and Trust

Owns contributor reputation, verified expertise, badges, entity reviews, trust signals, dispute-sensitive risk notes, abuse prevention, and evidence provenance.

### Route and Category Intelligence

Owns content aggregation around country pairs, corridors, transport modes, industries, products, regulatory topics, and service nodes.

### Moderation and Safety

Owns reports, review queues, spam and promotion controls, conflict-of-interest disclosure, content restrictions, sanctions, appeals, and moderation audit logs.

## 4. Core content types

- Discussion
- Question
- Answer
- Case Study
- Comment
- Review
- Knowledge Article
- Risk Alert
- AI Summary

AI-generated summaries are derivative artifacts. They must retain links to source content, generation metadata, and freshness state, and must never silently replace human evidence.

## 5. Structured trade context

Community content should capture structured metadata where relevant:

- source and destination country;
- trade route or corridor;
- category and product references;
- incoterm;
- transport mode;
- shipment type;
- battery, liquid, hazardous, or sensitive-goods flags;
- trade stage;
- supplier, buyer, service provider, order, shipment, RFQ, and service-node references;
- amount range and confidentiality level;
- language and translation state.

This context powers search, recommendations, route pages, knowledge graphs, AI retrieval, and risk analytics.

## 6. GTOS integration points

### Product

Show related questions, cases, logistics and compliance discussions, verified reviews, and risk alerts.

### Supplier

Show relevant discussions, answered questions, verified feedback, case history, expertise, and moderated risk signals.

### Buyer and Service Provider

Show contribution quality, verified roles, relevant routes and categories, and transaction-grounded feedback where policy allows.

### Order and Shipment

After a meaningful milestone, offer a privacy-safe case-study or lessons-learned flow. Do not publish transactional details without explicit authorization and redaction.

### Route

Aggregate current questions, cases, official guides, service-provider expertise, common failure modes, and AI-assisted summaries.

### AI Core

Community content can be used for retrieval only when provenance, permission, language, freshness, and trust score are evaluated. AI must distinguish official policy from user experience and unverified opinion.

## 7. Reputation model

Reputation is multi-dimensional rather than a single popularity score.

Candidate dimensions:

- answer quality;
- accepted-answer rate;
- case-study usefulness;
- evidence quality;
- route expertise;
- category expertise;
- verified business identity;
- transaction-grounded contribution;
- moderation and violation history;
- conflict-of-interest disclosure.

Likes and follower count must not be treated as proof of trade reliability.

## 8. Search and knowledge graph

The system should index content for:

- full-text search;
- semantic retrieval;
- route, country, product, category, and service filters;
- entity relationships;
- multilingual discovery;
- duplicate-question detection;
- related-case and related-risk retrieval.

Graph relationships may include:

- user CONTRIBUTED content;
- supplier DISCUSSED_IN case;
- order GENERATED case;
- product SHIPPED_ON route;
- risk OBSERVED_ON route;
- expert SPECIALIZES_IN category;
- answer SUPPORTED_BY evidence.

## 9. Moderation and legal safety

The system requires strong controls for:

- defamatory or unverified accusations;
- fake reviews and coordinated manipulation;
- promotional spam;
- regulated and restricted trade topics;
- privacy and confidential transaction data;
- misleading customs, tax, or legal advice;
- counterfeit or fraudulent supplier claims;
- sanctions and jurisdiction restrictions.

Risk notes concerning a person or company require evidence, controlled visibility, review status, appeal handling, and an immutable moderation history.

## 10. MVP

The first production slice should include:

- Community home;
- Discussions;
- Q&A and accepted answers;
- Structured case studies;
- Tags, routes, categories, and trade context;
- Comments, reactions, bookmarks, and follows;
- Basic contributor profiles and reputation;
- Reporting and moderation queue;
- AI-assisted tagging, duplicate suggestions, and source-linked summaries;
- basic links to product and supplier entities.

## 11. Later stages

### V2

- supplier and product community tabs;
- service-provider trust pages;
- complete route hubs;
- order-to-case workflows;
- verified expert system;
- stronger multilingual and SEO support.

### V3

- trade knowledge graph;
- supplier trust graph;
- route intelligence dashboards;
- transaction-grounded risk analytics;
- community-informed recommendations;
- advanced AI retrieval and decision support.

## 12. Success metrics

Measure quality and business impact, not only activity:

- answer rate and time to first useful answer;
- accepted-answer rate;
- save and citation rate;
- verified case-study completion;
- report and confirmed-violation rate;
- community-assisted inquiry and order conversion;
- supplier and route page engagement;
- organic search coverage;
- retention of contributing and consuming users;
- AI answer grounding and source usefulness.
