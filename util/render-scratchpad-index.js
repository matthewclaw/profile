const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outPath = path.join(root, "scratchpad", "index.html");
const dataPath = path.join(root, "assets", "data", "data.json");
const SITE_URL = "https://matthewclaw.github.io/profile/";
const PAGE_URL = `${SITE_URL}scratchpad/index.html`;
const TITLE = "Scratchpad | Matthew Law";
const DESCRIPTION = "Notes, write-ups, and shared posts from Matthew Law — lessons pulled out of production systems.";

function toRelativeUrl(entryUrl) {
  return entryUrl.startsWith("scratchpad/") ? entryUrl.slice("scratchpad/".length) : entryUrl;
}

function renderCard({ title, tagline, lesson, date, url }, { iconClass, external }) {
  const href = external ? url : toRelativeUrl(url);
  return `
                <a href="${href}"${external ? ' target="_blank" rel="noopener"' : ''} class="p-6 ide-card border hover:border-blue-500/50 transition-all duration-300 block">
                    <div class="flex justify-between items-start mb-3">
                        <i class="${iconClass} text-blue-400"></i>
                        <span class="text-[10px] opacity-50 uppercase">${date}</span>
                    </div>
                    <h3 class="font-bold mb-2">${title}<i class="fas fa-external-link-alt text-blue-400 text-xs ml-2"></i></h3>
                    <p class="text-xs opacity-70 leading-relaxed">${tagline}</p>
                    ${lesson ? `<p class="text-xs token-comment mt-4">// ${lesson}</p>` : ''}
                </a>`;
}

function renderGroup(label, entries, opts) {
  if (!entries.length) {
    return "";
  }
  return `
        <details open class="scratchpad-group mb-12">
            <summary class="text-sm uppercase tracking-widest opacity-60 mb-4 flex items-center gap-2">
                <i class="fas fa-chevron-right chevron text-[10px]"></i> ${label}
            </summary>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                ${entries.map(entry => renderCard(entry, opts)).join('')}
            </div>
        </details>`;
}

function renderPage(data) {
  const blogPosts = data.scratchpad?.blog || [];
  const linkedinPosts = data.scratchpad?.linkedin || [];

  const blogSection = renderGroup("Blog", blogPosts, { iconClass: "fas fa-file-lines", external: false });
  const linkedinSection = renderGroup("LinkedIn", linkedinPosts, { iconClass: "fab fa-linkedin", external: true });

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light-mode')}catch(e){}function toggleTheme(){var l=document.documentElement.classList.toggle('light-mode');try{localStorage.setItem('theme',l?'light':'dark')}catch(e){}}</script>
    <title>${TITLE}</title>
    <meta name="author" content="Matthew Law">
    <meta name="description" content="${DESCRIPTION}">
    <link rel="canonical" href="${PAGE_URL}">
    <link rel="icon" href="../assets/img/favicon.png">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Matthew Law | Senior Software Engineer">
    <meta property="og:title" content="${TITLE}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGE_URL}">
    <meta property="og:image" content="${SITE_URL}assets/img/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:description" content="${DESCRIPTION}">
    <meta name="twitter:image" content="${SITE_URL}assets/img/og-image.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="../assets/css/tailwind.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <link href="../assets/css/style.css" rel="stylesheet">
</head>

<body class="antialiased">
    <div class="editor-tabbar">
        <button type="button" onclick="toggleTheme()" title="Toggle Theme" aria-label="Toggle theme" class="editor-tab inactive no-print">
            <i class="fas fa-sun text-yellow-400" aria-hidden="true"></i><i class="fas fa-moon text-blue-700"
                aria-hidden="true"></i> 
        </button>
        <span class="editor-tab"><i class="fas fa-folder-open token-func"></i> scratchpad <a
                href="../index.html" title="Close — back to matthew_law" class="close">&times;</a></span>
    </div>
    <nav class="editor-breadcrumb">
        <a href="../index.html#scratchpad" class="token-type hover:underline">matthew_law</a>
        <span class="sep">/</span>
        <span class="token-comment">scratchpad</span>
    </nav>
    <main class="px-6 py-16">
        <h1 class="text-2xl md:text-4xl font-bold mb-3 token-type">Scratchpad</h1>
        <p class="text-sm opacity-70 mb-10">A decade of git commits and perspective shifts.</p>
        <p class="text-sm opacity-70 mb-10">Not every note changed my thinking.<br>These did.</p>
${blogSection}${linkedinSection}
    </main>
    <footer
        class="no-print fixed bottom-0 w-full h-6 bg-blue-600 text-white text-[10px] flex items-center justify-between px-3 z-50">
        <div class="flex items-center gap-4"><span><i class="fas fa-code-branch"></i> main</span></div>
        <div class="flex items-center gap-4"><span>UTF-8</span><span>markdown</span></div>
    </footer>
    <a href="../index.html" title="Back to matthew_law" aria-label="Back to matthew_law" class="editor-fab left no-print">
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

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
fs.writeFileSync(outPath, renderPage(data));
console.log("Rendered scratchpad/index.html");
