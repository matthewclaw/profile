---
title: "Slower Is a Tool. Blocked Is a Dependency."
tagline: "A friend ran out of AI credits and development stopped. The live site carried on serving customers. The only thing that had failed was the ability to change it."
date: "2026-07-27"
---

A friend of mine built an entire e-commerce site using an agentic coding harness. A side project, in their own time. Catalogue, checkout, payments, the whole thing. They put it live.

It worked.

It kept working, which is the part that stayed with me.

They showed it to me. The part that made me pay attention was that they weren't a Python developer. They were a junior Java developer, but the agent chose Python.

Something that would have been a multi-month project for someone at that stage existed, and it ran. I'm not building to a punchline about it being secretly rubbish. It wasn't.

I did say something at the time, in the slightly careful way you do when you don't want to be the person raining on someone's weekend project. Generating the code isn't the risky part, depending on code you don't understand is. I got a shrug back.

"The agent will handle it."

Which, honestly, was a completely reasonable answer at that moment. It was handling it.

## Then it wasn't

Some time later they wanted to add another feature. Nothing exotic. They couldn't.

What they said, more or less, was: "I've already spent so many credits, and now I need to spend more just to add something."

That sentence stuck with me, mostly for what it takes as given. Adding a feature had stopped being something you do and become something you buy.

Not because the feature was hard. Not because Python is impossible to learn. Four things were in the way:

They'd exhausted their credits. They didn't know the environment variables. They weren't sure about the credentials. And they didn't really understand how the application fit together.

Development stopped.

The site didn't. It carried on taking orders the entire time, which is the detail I find hardest to put down. Nothing was down. Nothing alerted. Not one customer noticed anything. The only thing that had failed was the ability to change any of it.

They bought more credits, and it started again.

## My first explanation didn't hold up

I assumed this was a Python problem. They'd built something in a language they didn't know, and now they couldn't maintain it.

That explanation didn't last very long.

Python wasn't what blocked them. The feature wasn't difficult. And three of those four blockers have nothing to do with the language at all. Environment variables, credentials, and a billing limit are operations problems. You could hand that exact list to a fluent Python developer and they'd still be stuck for a while.

So not knowing Python explains one of the four things. That isn't enough to carry the point.

Which also means the thing I'd said to them at the start was only about a quarter right. I'd warned about depending on code you don't understand, because that's the part that looks dangerous from the outside. What actually stopped them was mostly around the code rather than in it. Credentials, environment, billing. The boring perimeter I hadn't thought to mention.

## The bit I kept coming back to

The credits. Because that's such an unremarkable way for work to stop.

It isn't a technical limitation. Nobody made an architectural mistake. A billing limit was reached on an ordinary day, and that was sufficient to halt development on a working application.

And because that was the thing that stopped it, buying more credits started it again. Which is a completely rational response. It's the fastest route back to working, and I'd probably have done the same.

It just didn't change anything underneath. Development restarted from exactly the same position it had been in before, with the same four things still true, waiting for the next time one of them came up.

That's when it clicked, and it clicked into a shape I recognised.

The credits running out was the incident. Not understanding the system was why there was no failover.

Every postmortem I've ever sat in works this way. The trigger is almost never the interesting part. A disk fills up, a certificate expires, a rate limit gets hit. Nobody spends the meeting on that. The meeting is about why nothing caught it, why there was no degraded mode, why the whole thing went from fine to stopped with nothing in between.

Which is a question engineers are quite good at asking about systems, and apparently much worse at asking about ourselves.

## The awkward version of this

I've spent a lot of my career on this. Retries, fallbacks, timeouts, circuit breakers, the boring uncomfortable questions nobody enjoys sitting with. What happens when this third party stops responding. What happens when the cache is cold. What happens when this one thing is unavailable and everything downstream still has to do something sensible about it.

Then a lot of us have quietly introduced one of these into our own thinking, and it doesn't register as the same category of problem because it doesn't appear on any diagram.

And it isn't new, which is the part I have to keep reminding myself. I've inherited systems where the understanding had simply left the building. Nobody careless, nobody to blame, just enough turnover that the people who knew why a thing was built that way weren't there any more. What was left behind was code that worked and nobody could safely change. Same failure, no AI anywhere near it.

We have a name for that when it's people. Bus factor. How many of them need to disappear before a system becomes unmaintainable. I've asked that question about teams plenty of times. I don't think I'd ever asked it about a tool.

Being a side project is part of why this showed up so cleanly. On a team there would have been someone else with the credentials, someone who had stood the environment up before, a wiki page nobody trusts that happens to have the env vars on it. Redundancy nobody designed and nobody notices until it turns out to be the thing that saves them. Working alone, none of that existed to cushion it. One person, one live site taking real orders, and a fair amount of the understanding sitting somewhere that wasn't the person.

What's different now is the speed you can get there, and that you can do it to yourself without needing anyone else's help.

I don't think the line is "using AI." I use it every day and I think it's one of the largest productivity multipliers I've seen. The line is somewhere further along, at the point where it stops amplifying your thinking and starts doing it instead.

The test I've landed on is the same one I'd apply to anything else I depend on. If it goes away, what actually happens? If the answer is that I'm slower, it's a tool. If the answer is that I've stopped, it's a dependency, and I should probably be treating it like one.

It isn't a clean binary in practice. There's a lot of ground between slower and stopped, and most of it is occupied by "technically I could work this out, but not today and not without help." I'd count most of that ground as stopped, personally, but that's a judgment rather than a measurement.

That distinction isn't really about how much you use it. My friend and I might use these things a comparable amount. It only shows up on the day it isn't there, which is a bit late to be finding out.

## It doesn't need to be dramatic

The version of this I hear most often is "well, it's not going to disappear," which is fair, and also not what happened here.

Nothing disappeared. A billing limit was reached. That was enough.

Rate limits, a provider outage, a client whose network won't allow it, an air-gapped environment, a flight without wifi. None of these are catastrophes. They're Tuesday. If a normal Tuesday can take you from productive to stopped, the dependency was already load-bearing and you just hadn't been told yet.

## What they did next

The site is still up, still taking orders, and from what I hear doing alright.

They didn't stop using the harness. They didn't go away and learn Python out of penance either, which I think would have been the wrong lesson anyway.

On the next thing they built, they specified the tech stack up front.

That's the whole fix. Tell the agent what to build it in, and pick something you can actually read.

It sounds far too small to count, and I think it's exactly right. It doesn't make them any less dependent on the harness in a way you could measure. They're still generating most of it, and they're not using it less than they were before. What changes is only what happens on the bad day. When the credits run out, or the provider has a rough afternoon, or they're somewhere with no signal, they open the code, and it's Java, and they're slower.

Slower is fine. Slower was never the problem.

## The part I'm least comfortable with

The uncomfortable part is that I don't have a version of this story about myself. I've never hit the day where a rate limit or an empty balance stopped me shipping something.

It would be easy to read that as evidence I'm fine. I think it's more likely that the dependency just hasn't been tested yet.

Everything looks fine while it's up. That's the entire shape of the problem, and it makes checking yourself from the inside close to worthless.

My friend wasn't confused when this happened to them. They were annoyed about the cost. That's what it looks like from in there. Not a dependency, just an invoice.

What I keep coming back to is that I said roughly this to them, out loud, in advance, and it changed nothing. One billing limit sorted it in an afternoon.

I don't think that's because they weren't listening. I think it's because at the time there was no observable problem. The system was working. A warning about resilience always sounds theoretical while everything is still up, which is unfortunately the only window in which saying it is any use at all.

So I've stopped thinking of this as something to warn people about and started treating it as something to check. Not a discipline, and not a rule about how much AI is too much. Just an occasional question about where the understanding is actually sitting, and whether any of it exists outside the tool.

They came out of this with a fix. Specify the stack, pick something you can read, end up slower instead of stopped. I don't have anything that tidy. I'm still working out which of my own dependencies I've simply never had to test.

It's still the biggest multiplier I've got, and I'm not planning to use it less. I'd just rather it wasn't the only thing that knows how my own work fits together.
