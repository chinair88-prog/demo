# Evidence Chain Pattern

## Purpose

Trade decisions often depend on documents, sensor data, attestations, external registries, and human statements. Evidence must remain trustworthy even when copied or transformed.

## Evidence Record

An Evidence Item records source identity, collection method, original location, content hash or integrity proof, time, classification, retention, access policy, transformations, attestations, and related Claims.

## Transformations

Extraction, translation, OCR, summarization, and AI interpretation create derived evidence artifacts. They SHALL reference the source and declare method and quality. A derived summary SHALL NOT replace the original evidence.

## Chain of Custody

Transfers of evidence custody or storage SHALL be recorded where legal or investigative use requires it. Access and alteration attempts are auditable.

## Decision Use

Decision Records reference evidence versions actually considered. Later corrected evidence does not silently change the historical Decision Record, although it may trigger appeal or remediation.
