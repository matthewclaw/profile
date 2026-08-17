# Drafts

Drop a Markdown file here to publish a new Scratchpad blog post. `npm run build`
(and the CI workflow, on every push to `main`) renders each `*.md` file into a
matching `scratchpad/<filename>.html` page and regenerates the Scratchpad
"Blog" entries in `assets/data/data.json` to match — nothing else needs to be
touched by hand.

## Format

```md
---
title: "Post title"
tagline: "One-line description, used as the card subtitle and meta description."
lesson: "what this changed about how you work, in your own words"
date: "2026-01-01"
---

Body in plain Markdown. Headings (`##`), `code`, *emphasis*, links, and lists
all work.
```

The filename becomes the slug: `my-post.md` → `scratchpad/my-post.html`.

All four frontmatter fields (`title`, `tagline`, `lesson`, `date`) are required —
the build fails loudly if one's missing rather than silently publishing a broken
card.

## `lesson`

The habit or question the post left behind, lifted from its own closing section.
It renders as a `// comment` on the card, under the tagline: the title hooks, the
tagline says what happened, the lesson says what it changed.

It appears on cards only, never on the article page. Printing the conclusion above
a piece whose value is watching you arrive at it would spoil the thing the post is
for.
