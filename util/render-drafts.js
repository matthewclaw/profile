const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

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
  const slug = url.replace(/^scratchpad\//, "").replace(/\.html$/, "");
  const fileName = `${slug}`;
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
    <script>try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light-mode')}catch(e){}function toggleTheme(){var l=document.documentElement.classList.toggle('light-mode');try{localStorage.setItem('theme',l?'light':'dark')}catch(e){}}</script>
    <title>${title} | Matthew Law</title>
    <meta name="author" content="Matthew Law">
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <link href="../assets/css/style.css" rel="stylesheet">

    <script type="application/ld+json">
    ${jsonLd}
    </script>
</head>

<body class="antialiased">
    <div class="editor-tabbar">
        <button type="button" onclick="toggleTheme()" title="Toggle Theme" aria-label="Toggle theme" class="editor-tab inactive no-print">
            <i class="fas fa-sun text-yellow-400" aria-hidden="true"></i><i class="fas fa-moon text-blue-700"
                aria-hidden="true"></i> 
        </button>
        <span class="editor-tab"><i class="fas fa-file-lines token-type"></i> ${fileName} <a
                href="./index.html" title="Close — back to scratchpad" class="close">&times;</a></span>
    </div>
    <nav class="editor-breadcrumb">
        <a href="../index.html" class="token-type hover:underline">matthew_law</a>
        <span class="sep">/</span>
        <a href="./index.html" class="hover:underline">scratchpad</a>
        <span class="sep">/</span>
        <span class="token-comment">${fileName}</span>
    </nav>
    <main class="max-w-4xl mx-auto px-6 py-16">
        <p class="token-comment text-xs mb-2">// ${formatDateLong(date)}</p>
        <h1 class="text-2xl md:text-4xl font-bold mb-8 token-type">${title}</h1>

        <div class="article-body space-y-6 text-sm md:text-base leading-relaxed">
            ${bodyHtml}
        </div>
        <p class="mt-16 pt-6 border-t text-sm" style="border-color: var(--border-color)">&mdash; <a
                href="${SITE_URL}" class="token-type hover:underline">Matthew Law</a></p>
        <a href="./index.html" class="inline-block mt-6 text-xs token-comment hover:underline">&larr;
            back to scratchpad</a>
    </main>
    <footer
        class="no-print fixed bottom-0 w-full h-6 bg-blue-600 text-white text-[10px] flex items-center justify-between px-3 z-50">
        <div class="flex items-center gap-4"><span><i class="fas fa-code-branch"></i> writing/${slug}</span></div>
        <div class="flex items-center gap-4"><span>UTF-8</span><span>markdown</span></div>
    </footer>
    <a href="./index.html" title="Back to scratchpad" aria-label="Back to scratchpad" class="editor-fab left no-print">
        <i class="fas fa-arrow-left"></i>
    </a>
    <button type="button" onclick="toggleTheme()" title="Toggle Theme" aria-label="Toggle theme"
        class="editor-fab right no-print">
        <i class="fas fa-sun text-yellow-400" aria-hidden="true"></i><i class="fas fa-moon text-blue-700"
            aria-hidden="true"></i>
    </button>
</body>

</html>
`;
}

async function renderDrafts() {
  if (!fs.existsSync(draftsDir)) {
    return [];
  }

  const { marked } = await import("marked"); // marked v18 is ESM-only
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

renderDrafts().then(posts => {
  updateDataJson(posts);
  console.log(`Rendered ${posts.length} draft(s) from scratchpad/drafts/`);
});
