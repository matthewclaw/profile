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
date: "2026-01-01"
---

Body in plain Markdown. Headings (`##`), `code`, *emphasis*, links, and lists
all work.
```

The filename becomes the slug: `my-post.md` → `scratchpad/my-post.html`.

All three frontmatter fields (`title`, `tagline`, `date`) are required — the
build fails loudly if one's missing rather than silently publishing a broken
card.
