---
title: "Multi-Tenant, Plugin-Based Architecture: Two Lessons from Production"
tagline: "Allowlisting plugin DLLs per tenant, and the TenantId index nobody added until things started timing out."
date: "2026-07-26"
---

"Multi-tenant, plugin-based architecture" is a line I've written on more CVs than I can count. It's accurate, but it's also the kind of phrase that means nothing until you've hit the two problems that actually define it: how do you let a system be extended without letting it be broken, and how do you keep tenants from stepping on each other once they're all sharing the same database. Here's what those two problems actually looked like in practice.

## Plugins are an extensibility feature until they're an attack surface

The whole point of a plugin system is letting behavior be added without recompiling the core. In a single-tenant app, that's mostly a packaging problem. In a multi-tenant one, it's a security problem: if a plugin is just a DLL sitting in a folder that gets picked up on the next reflection scan, you've built a mechanism for arbitrary code execution, and the only thing standing between "extensible" and "exploitable" is trust you can't actually verify.

The system I worked on handled this by not trusting the folder. Plugin discovery still worked the way you'd expect — assemblies scanned at startup, types matching a known interface registered into the container — but which DLLs were even eligible to load was gated per tenant. Each tenant had an explicit, registered allowlist of plugin names; a DLL that wasn't on it was invisible to the loader regardless of what interface it implemented. It moved the trust boundary from "anything reflection can find" to "anything a tenant has been explicitly granted" — a much smaller, much more auditable surface.

## The index that wasn't there

The second lesson came from a brownfield system I inherited rather than one I designed. It used the most common shared-database multi-tenancy pattern there is: one schema, every table carrying a `TenantId` column, every query filtered by it. Simple, cheap to build, easy to reason about — right up until it isn't.

What I found was that `TenantId` wasn't indexed. Not missing an optimization — genuinely absent. For a while that didn't matter, because table sizes were small enough that a scan was still fast. As tenant count and data volume grew, queries that should have been narrow, indexed lookups became full scans, and things that used to return instantly started timing out.

It's an easy column to overlook in review — it looks like metadata, not like the thing your entire query pattern pivots on. But in a shared-schema multi-tenant system, it's arguably the single most important column to index, since every legitimate query touches it. It's the first thing I check now in any multi-tenant codebase I inherit.

The fix, refreshingly, was the easy kind. The client's schema had no indexes on that table at all — this wasn't a case of the wrong index or a subtle composite-key problem, just an absent one. Adding it was the whole story. Sometimes the hard part of a lesson isn't the fix, it's noticing the column that was never indexed in the first place.

## The common thread

Neither of these is a novel pattern on its own. What connects them is that both lessons came from the same root cause: building something extensible or shared is easy to get *working*. Building it so it stays correct and fast once real, unpredictable usage shows up is the actual job.
