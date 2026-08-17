---
title: "Slower Is a Tool. Blocked Is a Dependency."
tagline: "A friend ran out of AI credits and development stopped. The live site carried on serving customers. The only thing that had failed was the ability to change it."
lesson: "if this disappeared, would I be slower or would I be blocked?"
date: "2026-07-27"
---

A friend of mine built an e-commerce site using agentic AI. It was a side project in his own time that had a catalogue, it had checkout, and it had payments. He got it up and live, and it worked, and it was stable.

He showed it to me. I was concerned, not with the site, but with the language the agent chose. Don't get me wrong, what the agent had written would have taken a solo dev multiple months. But the thing was the agent had chosen Python as the language. However, my mate was a Java dev. I did mention to him while he still had credits to rather get it to rewrite it in Java.

He shrugged it off and said, "Don't worry, the agent will handle it."

And in all fairness, it was handling it... for the time being.

## Then it wasn't

A few thousand tokens later. He wanted to add a feature, but he couldn't, because he had hit his budget limit.

He complained, "I've already spent so many on credits, and now I need to spend more just to add something."

And that's when I realised that depending on how you use AI, adding a feature stops being something you do and becomes something you have to buy.

It wasn't that the feature was difficult or hard, or that Python is an impossible language. But the fact that he knew Java, not Python, meant that the code was unreadable to him. And that he didn't have an idea of the system architecture.

And so because he hit his budget, development didn't slow down, it stopped. 

Eventually, he did just end up buying more credits and continued.

## The bit that stuck

What I realised was this wasn't a case of a tool or multiplier being unavailable, it was as if the lead engineer had packed up for lunch and left. No technical limitation, no architectural mistake. And since credits were the currency of choice, buying more got him looking at code again.

People often say, when it comes to generative code, "garbage in, garbage out". But sometimes people don't understand the weight of what happens when the output is alien, because something as simple as changing a button from rounded and blue to square and red or adding another adapter for a third-party becomes something you have to use credits for.

## Dependency vs. blocker

I've spent a lot of my career looking at fail states. Retries, fallbacks, circuit breakers, all the boring stuff on the wiki diagrams that no one wants to read. What happens when a third party stops responding? And how do we ensure that downstream services handle it gracefully? And then there's this.

At the core of it, it's not new. I've inherited systems where the understanding has simply left the building. It's got nothing to do with someone being careless or anyone to blame. It was just a case of the people that knew the system had left. When it comes to people, the expression is hit-by-bus syndrome. If one person holds all the knowledge, does it make the system unmaintainable if they quit or go on holiday?

I think this being a side project is part of why it showed up the way it did. On a team there'd be someone that understood this weird service, there would be someone that knew how the environment was set up, there would have been an outdated wiki page with at least some relevant information on it. But because it was one individual and one LLM, there was none of that cushioning. Then when the budget was hit, the prompt engineer was left waiting.

Nowadays with AI and agents, you can get to an MVP state very quickly on your own without anyone's help. So I don't think it's a case of "AI bad". I mean, it's the biggest productivity multiplier I've come across. Gone are the days of searching Stack Overflow for a question that someone answered four years ago, regarding this obscure package you're trying to get working. So the "line" isn't "Stop using AI", I think the line sits further along, somewhere around the point where it isn't speeding up your work, it's doing it for you.

So like with any tool, I ask myself: if this had to disappear, would I be slower or would I be blocked? Because there lies whether you're using it as a multiplier or you're depending on it.

Don't get me wrong. It's not as clean-cut as "don't have dependencies". We depend on things like NuGet and npm packages. It boils down to, if a package you're using had to be taken down, would you at least know what to Google for a replacement?

## It doesn't need to be dramatic

When I talk about AI and the dependency on it, the responses I usually get are... "well, it's not going to disappear", or "I can just use a different model". Which is fair. Nothing disappeared, and it's not what happened here. It was simply a budget that was reached, and that was enough.

Rate limits, congested providers, a client's network that's blocked, or a flight without Wi-Fi. None of those are catastrophes. No. That's just another Tuesday. And if a random Tuesday is enough to take you from productive to stopped, then that dependency was load-bearing, and no one noticed until it was too late.

## What he did next

The site kept running, the live environment stayed green. He didn't go and learn Python. He didn't give up on the agent, but what he took away from this experience was... "let me just specify the tech stack before we go too far."

And that's the whole fix. Pick something you can read, you can understand. Because if you lose signal or you run out of tokens, you'll be slower, yes, but at least you'll still be moving.

Slower is fine. It was never the problem.

## Where it leaves me

I don't have a version of the story about myself. I've never had a day where a rate limit stopped me from shipping something. It would be easy to read that as evidence I'm in the all clear. But I think that's more of a case where I've been burned by hit-by-bus syndrome, or the package I needed disappeared. Everything looks okay while it's up.

And that's the whole problem with it. My friend wasn't confused when it happened to him. He was annoyed by the cost. And that's what it looks like from that side: it's not a dependency, it's an invoice. And when I raised my concerns at the time, there was no observable problem. The system was working, so a warning about resilience sounded theoretical.

So this isn't a warning to stop using AI. This is more of a checkpoint. A checkpoint to ask yourself: am I using it? Or am I relying on it? And as I mentioned, it's one of the biggest multipliers I've got. So I'm not planning on using it less. I just make sure that it isn't the only thing that knows how my own work fits together.
