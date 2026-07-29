const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const SITE_URL = "https://matthewclaw.github.io/profile/";

function replaceBetweenMarkers(content, marker, replacement, { keepMarkers = true } = {}) {
  const startMarker = `<!-- ${marker}:START -->`;
  const endMarker = `<!-- ${marker}:END -->`;
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Could not find ${marker} markers in index.html`);
  }

  if (keepMarkers) {
    return (
      content.slice(0, start + startMarker.length) +
      "\n" + replacement.trim() + "\n" +
      content.slice(end)
    );
  }

  // The marker comments themselves must not survive into the built output
  // here: this replaces the entire content of a <script type="application/ld+json">
  // tag, whose text must be strictly parseable JSON. HTML comments inside it
  // are invalid and break structured-data parsing (Google Rich Results flags
  // this as "Incorrect value type" since the parser chokes on the comment
  // text). The markers stay in the *source* index.html so the next build can
  // still find the injection point -- only this generated, never-committed
  // build output has them stripped.
  return (
    content.slice(0, start) +
    replacement.trim() +
    content.slice(end + endMarker.length)
  );
}

// ------------------------
// INJECT GENERATED CONTENT INTO index.html
// ------------------------

function injectIndexHtml(keepJsonLdMarkers) {
  const indexPath = path.join(root, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  const schema = fs.readFileSync(path.join(root, "generated", "schema.jsonld"), "utf8");
  const noscript = fs.readFileSync(path.join(root, "generated", "noscript.html"), "utf8");

  html = replaceBetweenMarkers(html, "JSONLD", schema, { keepMarkers: keepJsonLdMarkers });
  html = replaceBetweenMarkers(html, "NOSCRIPT", noscript);

  fs.writeFileSync(indexPath, html);
}

// ------------------------
// ROBOTS.TXT / SITEMAP.XML
// ------------------------

function writeRobotsTxt() {
  const content = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`;
  fs.writeFileSync(path.join(root, "robots.txt"), content);
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(fs.readFileSync(path.join(root, "assets", "data", "data.json"), "utf8"));

  const scratchpadDates = [
    ...(data.scratchpad?.blog || []).map(post => post.date),
    ...(data.scratchpad?.linkedin || []).map(post => post.date),
  ];
  const latestScratchpadDate = scratchpadDates.sort().pop() || today;

  const pages = [
    { path: "index.html", lastmod: today, priority: "1.0" },
    { path: "scratchpad/index.html", lastmod: latestScratchpadDate, priority: "0.7" },
    ...(data.scratchpad?.blog || []).map(post => ({
      path: post.url,
      lastmod: post.date,
      priority: "0.6",
    })),
  ];

  const urls = pages.map(p => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n");

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), content);
}

injectIndexHtml(process.argv.includes("--debug"));
writeRobotsTxt();
writeSitemap();

console.log("Build complete: injected metadata into index.html, wrote robots.txt and sitemap.xml");
