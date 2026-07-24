# Relationship-Aware Access Pattern

## Problem

Role-based access alone cannot express trade relationships such as broker mandate, carrier custody, buyer-supplier contract, insurer coverage, customs jurisdiction, or temporary investigation assignment.

## Policy Context

Authorization evaluates:

- authenticated identity;
- requested action;
- resource and classification;
- active Relationship and role;
- delegation or mandate;
- jurisdiction;
- business purpose;
- case or workflow context;
- time;
- risk and evidence requirements.

## Example

A customs broker may submit a declaration for an importer only while a valid mandate exists for the applicable jurisdiction and commodity scope. Access to unrelated importer records is not implied.

## Controls

Relationship validity SHALL be checked at decision time. Revocation SHALL propagate promptly. Cached authorization SHALL not outlive delegation. Policy results SHALL record version and material inputs. Emergency access requires heightened logging, expiry, and review.
