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

The habit or question the post left behind. It renders as a `// comment` on the
card, under the tagline: the title hooks, the tagline says what happened, the
lesson says what it changed.

**It has to be transferable, and written for the reader rather than about you.**
Two rules, and a lesson has to pass both:

1. **No "I".** Imperative (`don't assume...`, `write things down...`) or addressed
   to the reader (`would you be slower or blocked?`). First person turns a lesson
   into autobiography, and the reader can't take autobiography anywhere.
2. **No dependency on the post.** No pronouns pointing back at the article, no
   nouns only the article explains. Someone who never opens it should still be
   able to apply the lesson to their own work.

| | |
|---|---|
| ✗ | `if this disappeared, would I be slower or blocked?` |
| ✗ | `if something I'm using disappeared, would I be slower or would I be blocked?` |
| ✓ | `if something you're using disappeared, would you be slower or would you be blocked?` |
| ✗ | `I check the tenant column's indexing early now` |
| ✓ | `check for proper indexing sooner rather than later` |

The failed versions summarise the story or narrate the author. The working ones
hand the reader something to use. If it only makes sense after reading the post,
it's a tagline, not a lesson.

Also check it doesn't restate something already published as a LinkedIn entry in
`data.json` — both show on `/scratchpad`, so an overlap reads as repetition.

It appears on cards only, never on the article page. Printing the conclusion above
a piece whose value is watching you arrive at it would spoil the thing the post is
for.
