---
title: "We Were Waiting for Green. Green Was Never Coming."
tagline: "We lost days to a container that was failing exactly as intended. Nobody had written down what working looked like."
lesson: "now I ask how long it would take to onboard someone new"
date: "2026-08-02"
---

Being in the consultant space means you get exposed to a lot of projects. A lot of different ways of solving more or less the same problems. It also means you're regularly joining existing codebases that already have their own way of doing things, and you get used to that.

So this one looked familiar enough. There were separate environments, there was a docker compose for local development, nothing that made you stop and think. We figured we had the gist of it, and we jumped in.

The thing with existing codebases and pipelines though is that they sometimes have "quirks".

We needed to test a change, so we ran it.

The compose ran. It was broken.

And it wasn't broken because we'd rushed it. It was broken because of one of those quirks, and there was nothing in front of us that suggested there was a quirk to look for.

## Chasing green

We were told we needed to make a change to the bootstrap and test it locally. Nothing strange about that. It's the usual "don't touch the environment until local is happy".

And looking at it now, "until local is happy" implies the containers start, no alarm bells, everything green.

That's what cost us.

It was a few days of "I'm getting this, what are you getting?" messages, in between onboarding meetings and setup emails. That little itch at the back of your head, the "what am I missing here?"

The person who actually knew was fully booked...

## Five minutes

We finally managed to secure time with him and hopped on a Teams call. We were prepared. We had our evidence, we had our questions.

What we weren't prepared for was what he said.

"Oh yeah, that container crashes with a 401 because of an environment specific token. 401 is good, it means the rest of the service started okay."

That's it. That's what the few days were.

He wasn't apologetic about it, or even blunt. It was more like hearing someone who knows cars mention that McLarens are fast. Just stating something so obvious to them that it hadn't occurred to them that not everyone knew it.

## The missing translation

We had documentation, that's the thing.

There was a compose download link. There was a Confluence wiki telling us Service X is auth, Service Y is user management. All of it accurate. None of it wrong.

But the translation wasn't there. Nothing told us what the output actually meant. No page anywhere saying "401 is okay".

And I don't think he was gatekeeping it. I think he just didn't see it as something that needed writing down.

Which is the trope of almost every long-running project. There's always that one person. The one who knows the quirks, the one who answers instantly when you throw a log at them. They aren't hoarding anything. They're just too fluent in the system to realise that not everyone knows the translations.

## The awkward bit

The only ones who can see the gaps are the ones lost.

So the thought of writing documentation for a system you're still figuring out seems like an impossible task. At this point, working out whether the thing that threw you was important enough to pass on is tricky.

The reason these types of quirks go undocumented is because the window is short... When something clicks, it stops looking like knowledge and morphs into "obvious". Give it a month and you'll find yourself auto-translating, and you're the one saying "Oh yeah, it's meant to do that".

So while the "What do you mean this is good?" was still fresh, while that confusion was settling, I scribbled down some notes. "This error is good". "If you get X check Y". "This is supposed to fall over after XYZ". Nothing Confluence-worthy, nothing I'd show another human.

But I paused. We were confused and dependent on someone else for the translation, and a new joiner would be in exactly the same boat. So I tidied the notes up and gave them a proper structure.

As it turned out, I wasn't the only senior who'd seen the quirks. My little "How-to" got folded into a new, growing client knowledge base that went up on Confluence.

I was pleased I wasn't the only one worrying about the gaps. But it also says something that it took several experienced people independently hitting the same wall before any of it got captured. Nobody who understood the system was ever going to write it, because from in there, there was nothing to write.

## Where this meets agentic work

I've been considering this with AI-assisted development, and I think the parallel isn't the obvious version of "the agent set up your environment, you have no clue", because the same could be said if you join an existing project.

With a "deployment guru", the knowledge is there, it's in the building. You might be blocked by a congested calendar, which is frustrating, but someone has it.

Ask the agent why the service is throwing a 401 and you might get the answer straight away. But you might get a plausible reconstruction of the answer that sounds right, because the actual context was compacted or sitting in a different chat, and it throws you both down a rabbit hole.

One has you wait for the person with the decoder ring, the other has you hoping the decoder ring wasn't lost.

## From the other side

The only reason I made those notes, and ended up making the How-to, was because we got stuck.

We were blocked by something only someone with project context could answer, and that would have been the fate of every new joiner after us.

With agents, you're rarely hard-stopped in the same way. When something feels weird, you can continue, you can give the next prompt.

The confusion is still there, but it's not a stop-in-your-tracks blocker.

I recently wrote about being [slower or being blocked](https://matthewclaw.github.io/profile/scratchpad/slower-is-a-tool-blocked-is-a-dependency.html). Being stopped is expensive, but sometimes it's the price you pay to get knowledge out of one head and written down.

## Since then

Now when someone tells me "Oh yeah, that looks bad but it's actually good", I question whether it's noted down. Because that's a translation that someone new won't see as "obvious". Same when an agent explains something and I only half-follow it, context might not survive, so it gets noted.

I still think the fastest way to judge a project's health or clarity isn't from unit tests passing or SonarQube results, it's from asking how long it would take to onboard someone new.

I'd just add that sometimes, what slows down onboarding isn't missing at all. It's sitting in someone's head, invisible to them, an automatic translation they wouldn't think to write down.
