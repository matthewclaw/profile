---
title: "The Question My Plugin Loader Couldn't Answer"
tagline: "A plugin loader that would happily load anything implementing the right interface, until someone asked what was actually stopping it from loading the wrong tenant's plugin."
lesson: "who decided this was allowed to load, and where does that decision live?"
date: "2026-07-26"
---

"Multi-tenant, plugin-based architecture" is a line I've had on more CVs than I can count. For a long time I could say it without being able to explain what actually makes it hard. This is the moment that changed that.

## Scan the folder, find a match, load it

The system had a plugin loader that did roughly what you'd expect. At startup it scanned a folder, looked for anything implementing a known interface, and registered whatever matched. I hadn't thought about that mechanism much. It just worked. Assemblies went in, plugins came out, tenants got the functionality they were supposed to have.

Then someone asked a fairly ordinary question: what stops a plugin built for one tenant from loading for a different one?

I remember answering almost automatically. The interface check already handled that, I said. If the type implements the right contract, it gets loaded, that's the whole point of the system. I was fairly confident saying it.

## That explanation stopped fitting the moment I said it out loud

Except it didn't hold up for more than a few seconds. Implementing an interface tells you the shape of a class matches something the loader expects. It says nothing about who wrote that class or which tenant it's actually supposed to belong to. A DLL that implements the interface will load regardless of who built it or who it was built for. I'd been treating "does this look like a plugin" as though it were the same question as "is this allowed to run here." They aren't. They never were.

I kept turning that over. Somewhere along the way those two questions had quietly merged into one in my head, and I'd never actually checked whether that merge was true. The loader wasn't careless or badly written, it was doing exactly what it had been built to do. It just had never been built to ask the second question at all.

## Where the actual difficulty was hiding

Once I saw the gap, the fix itself was almost anticlimactic. Assemblies still get scanned the same way they always did. What changed is that each tenant now has an explicit, registered list of plugin names it's allowed to load, and anything off that list stays invisible to the loader no matter what interface it implements.

Loading the assemblies was never the hard part. That part was basically solved the day someone wrote the scanning logic. The hard part was deciding, explicitly, what a given tenant was actually allowed to load, and then making that decision the thing the loader checked, instead of an interface match that was never designed to carry that weight.

That's a different kind of problem than writing a loader. Writing a loader is a reflection problem. Deciding what belongs to whom is closer to a permissions model, and permissions models don't fall out of "does the type match," no matter how good the reflection code is underneath it.

## What I check for now

I don't assume an interface check covers authorization anymore. When I look at a plugin or extension system now, one of the first questions I ask is who decided what's allowed to load here, and where that decision actually lives in the code. Sometimes the honest answer is nobody decided. The loader just accepts anything that fits the shape, and that answer is worth sitting with for a minute before moving on to anything else.
