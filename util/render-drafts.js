const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const root = path.join(__dirname, "..");
const draftsDir = path.join(root, "scratchpad", "drafts");
const outDir = path.join(root, "scratchpad");
const dataPath = path.join(root, "assets", "data", "data.json");
const SITE_URL = "https://matthewclaw.github.io/profile/";

function normalizeDate(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function formatDateLong(dateStr) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function renderArticleHtml({ title, tagline, date, url }, bodyHtml) {
  const canonicalUrl = `${SITE_URL}${url}`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: tagline,
    datePublished: date,
    author: {
      "@type": "Person",
      name: "Matthew Law",
      sameAs: [
        "https://matthewclaw.github.io/profile/",
        "https://www.linkedin.com/in/matthew-c-law/",
        "https://github.com/matthewclaw",
      ],
    },
    image: `${SITE_URL}assets/img/og-image.png`,
    mainEntityOfPage: canonicalUrl,
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light-mode')}catch(e){}</script>
    <title>${title} | Matthew Law</title>
    <meta name="description" content="${tagline}">
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="icon" href="../assets/img/favicon.png">

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Matthew Law | Senior Software Engineer">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${tagline}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${SITE_URL}assets/img/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${tagline}">
    <meta name="twitter:image" content="${SITE_URL}assets/img/og-image.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="../assets/css/tailwind.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
        rel="stylesheet">
    <link href="../assets/css/style.css" rel="stylesheet">

    <script type="application/ld+json">
    ${jsonLd}
    </script>
</head>

<body class="antialiased">
    <main class="max-w-4xl mx-auto px-6 py-16">
        <a href="./index.html" class="text-xs token-comment hover:underline">&larr; back to scratchpad</a>

        <p class="token-comment text-xs mt-8 mb-2">// ${formatDateLong(date)}</p>
        <h1 class="text-2xl md:text-4xl font-bold mb-8 token-type">${title}</h1>

        <div class="article-body space-y-6 text-sm md:text-base leading-relaxed">
            ${bodyHtml}
        </div>
        <a href="/.index.html" class="inline-block mt-16 text-xs token-comment hover:underline">&larr;
            back to scratchpad</a>
    </main>
</body>

</html>
`;
}

function renderDrafts() {
  if (!fs.existsSync(draftsDir)) {
    return [];
  }

  const files = fs.readdirSync(draftsDir).filter(f => f.endsWith(".md") && f.toLowerCase() !== "readme.md");
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(draftsDir, file), "utf8");
    const { data: frontmatter, content } = matter(raw);

    if (!frontmatter.title || !frontmatter.tagline || !frontmatter.date) {
      throw new Error(`${file}: frontmatter must include title, tagline, and date`);
    }

    const slug = file.replace(/\.md$/, "");
    const url = `scratchpad/${slug}.html`;
    const date = normalizeDate(frontmatter.date);
    const bodyHtml = marked.parse(content);

    const html = renderArticleHtml({ title: frontmatter.title, tagline: frontmatter.tagline, date, url }, bodyHtml);
    fs.writeFileSync(path.join(outDir, `${slug}.html`), html);

    return { title: frontmatter.title, tagline: frontmatter.tagline, date, url };
  });

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

function updateDataJson(blogPosts) {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  if (!data.scratchpad) {
    data.scratchpad = { blog: [], linkedin: [] };
  }
  data.scratchpad.blog = blogPosts;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 4) + "\n");
}

const posts = renderDrafts();
updateDataJson(posts);
console.log(`Rendered ${posts.length} draft(s) from scratchpad/drafts/`);
