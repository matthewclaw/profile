---
title: "The Column That Looked Like Nothing"
tagline: "A TenantId column on every table, filtered on every query, and never once indexed, until scale finally noticed."
lesson: "I check for proper indexing sooner rather than later"
date: "2026-07-26"
---

I inherited this one rather than built it. Standard shared-database multi-tenancy: one schema, every table carries a TenantId column, every query filters on it. Nothing clever. Which is probably exactly why nobody had looked closely at it in years.

## Queries that timed out, but not consistently

The first sign was queries timing out. Not all of them, and not consistently, which made it worse to chase than a clean failure would have been. I assumed it was the query logic, maybe a join that had gotten heavier over time as the schema grew. That's normally where I'd start looking, and it's usually a reasonable place to start.

I actually checked twice, because the pattern didn't quite match what a bad join usually looks like. A heavy join tends to hit specific queries hard and leave others alone. This was too even, spread across queries that had nothing to do with each other, no shared table, no shared logic.

## Going looking somewhere else

That explanation didn't hold up, so I stopped looking at the query logic and started looking at what all of those queries actually had in common. The answer was TenantId. Every one of them filtered on it, which wasn't surprising in a shared-schema system. What was surprising was what I found when I checked the index.

TenantId wasn't indexed. Not under-indexed, not indexed on the wrong combination of columns. Just not indexed, at all.

## Why nobody noticed for years

For a long time that hadn't mattered. When the tables were small, a full scan came back fast enough that nobody would notice, and nothing in a code review flags a missing index the way it flags a suspicious join or a duplicated query. TenantId reads like metadata. It's the column you filter by, not the column you think about.

Then tenant count grew, and data volume grew with it, and the column that touches literally every query in the system was doing a full scan every single time it ran. It wasn't one slow query getting slower. It was the same small tax applied everywhere at once, which is exactly why it was hard to pin down. A single bad join has a shape you can point to on a graph. A missing index on the column every query depends on doesn't look like a spike. It looks like everything getting slightly, evenly worse.

## What that told me about the column itself

The interesting thing is that TenantId isn't really metadata in a shared-schema system, even though it reads that way in review. It's closer to the thing your entire query pattern is built around. Every access path in the system runs through it. Treating it as an afterthought column is treating the busiest column in the database like the least important one, just because it doesn't carry business meaning the way an OrderId or a CustomerName does.

## What I check now

I check the tenant column's indexing early now, whenever I inherit a shared-schema multi-tenant codebase. Not because I think it'll always be missing, but because it's exactly the kind of thing that looks fine in review and only announces itself once scale makes it expensive. Nothing about the column looks urgent. It just sits there, doing more work than any other column in the system, until one day it can't keep up quietly anymore.
