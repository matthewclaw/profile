---
title: "If You Skip the Reasoning, You Skip What It Teaches"
tagline: "The endpoints were protected. He knew the how. He didn't know the why."
lesson: "an answer you can't defend isn't understanding, it's just something that happened to work."
date: "2026-08-20"
---

A company ran a Java bootcamp. There's real demand for Java skills right now, and even though I'm primarily a .NET developer, I joined it anyway. Better to learn it properly than lose out on clientele.

There wasn't much hand-holding. A PDF describing what needed to be built, a BRS, a screenshot of how the Maven project was meant to be set up, and weekly milestones. Figure out the rest yourself. The one hard requirement, besides the code, was a demo every week. You couldn't disappear for seven days and claim you'd been working. You had to show it, and be able to talk about it.

## The same call, retyped

One of the devs was demoing the security setup that week. Spring Security, a JWT filter, the usual shape.

My version leaned on an exceptions list. His version went the other way. A `requestMatchers(...)` call, once per endpoint, for every route in the system that needed protecting. Not a loop, not a list passed in. The same call, retyped, over and over, once for every endpoint that existed so far.

One of the facilitators asked the obvious question: "Why did you do it that way?"

Then the follow-up, which was really the actual point: "If you do it this way, this needs to be maintained every time the API changes." He paused, then answered that the API needs to be protected, so he added security filters to protect it.

That's technically correct but it's also not an answer to the question that got asked. Nobody was questioning what the BRS stated. The question was why he'd chosen a shape that quietly breaks the moment someone adds an endpoint and forgets to add the matcher. He said he'd look at it, and carried on with the rest of his demo.

## My exceptions list

When it was my turn, I got asked something similar, and I could actually answer it. Not because my Java was better, it wasn't, I was still finding my feet in Java and it showed. But I could defend why I'd structured it the way I had. Most of the API needs auth. The exceptions are a small, stable set I already knew, login, registration and refresh mainly, so building the rule around the exceptions meant I didn't have to remember to update it every time a new endpoint showed up.

That's the whole difference, and it's smaller than it sounds. He knew the API needed protecting. I reasoned about what shape the protection should take, given what I already knew about this specific system.

## The wrong question

I'll be honest about where my head went at the time. It looked like AI. Duplicated blocks, one per endpoint, each one correct in isolation and none of them aware of the others, is roughly what you'd get if you prompted a tool endpoint by endpoint instead of giving it the whole picture at once. That was my gut feeling.
Don't get me wrong, an inexperienced dev can absolutely write the same duplicated pattern without any AI involved at all, plenty of us have. So "it looked like AI" isn't actually a claim I can stand behind, and I don't think it's the interesting part of this anyway.

What actually stuck with me was something smaller. He seemed to be discovering his own code while he was demoing it. Not presenting something he knew, but exploring it live in front of everyone. That's a different thing than not knowing the better pattern. Even someone who's never heard of a deny-by-default filter chain might notice that they've written the same six lines six times. Not knowing a better pattern is a knowledge gap. Not being able to notice and question the shape of your own code is something different.

I want to be fair here too. A blanked or fumbled answer under live-demo pressure isn't proof of much on its own. People freeze, or answer the question they expected instead of the one asked. I don't actually know how that code got written. What I do know is that the only way anyone found out anything was by asking why, and what came back was a textbook-correct answer, just not to the question that had actually been asked.

## Before you could even ask

This isn't new. Before AI, I remember plenty of afternoons scouring StackOverflow for an answer to a question someone had asked years earlier, reading through it, and hoping the ecosystem hadn't moved on since. You couldn't paste your exact code and expect a hit either. You had to abstract your actual problem into decent search terms first, which meant you had to understand your problem well enough to describe it to a stranger. Then whatever you found usually solved someone else's problem, not yours exactly, so you had to understand why it worked and adapt it. 
There was a running joke back then, if there are no answers on StackOverflow for the package you're using, use a different package.

All of that, phrasing the question, adapting an answer that wasn't quite yours, judging whether a three year old post still applied, was reasoning. None of it was optional. It's the same thing that was missing from that demo, just one step earlier in the process. You used to have to reason your way to the question before anyone could even help you. Now you can skip straight to your exact code and get an answer scoped to right now, no abstraction required.

## Coding vs. development

I keep coming back to something like this: writing code and developing something aren't quite the same activity, even though they produce the same file in the end. Coding is something you do. Development is something you reason through, applying what you know, what you've seen go wrong before, and what you're willing to test.

AI is getting very good at the first one, and in all honesty, it's getting better at the second one too. What it isn't doing is your reasoning for you, even when it's doing plenty of its own. That's exactly where it gets easy to fool yourself. When a tool can hand you a working answer, it's tempting to treat having the answer as the same thing as having understood the problem. Sometimes it isn't, and a PR or demo is the only place that actually gauges that.

## Since then

I don't think the junior did anything wrong, and I'd be lying if I said I always know why my own code looks the way it does either. That's not really what this is about.

What I keep checking now, in my own work and when I'm reviewing someone else's, isn't only whether the answer works, it's whether someone involved could explain the choice behind it to someone who asked why. An answer you can't defend isn't understanding, it's just something that happened to work.

So next time something looks a bit too clean, a bit too comprehensive for how far along someone actually is, I'm less interested in where it came from. I'm more interested in whether they can tell me why.
