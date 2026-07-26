const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const SITE_URL = "https://matthewclaw.github.io/profile/";

function replaceBetweenMarkers(content, marker, replacement) {
  const startMarker = `<!-- ${marker}:START -->`;
  const endMarker = `<!-- ${marker}:END -->`;
  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Could not find ${marker} markers in index.html`);
  }
  return (
    content.slice(0, start + startMarker.length) +
    "\n" + replacement.trim() + "\n" +
    content.slice(end)
  );
}

// ------------------------
// INJECT GENERATED CONTENT INTO index.html
// ------------------------

function injectIndexHtml() {
  const indexPath = path.join(root, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  const schema = fs.readFileSync(path.join(root, "generated", "schema.jsonld"), "utf8");
  const noscript = fs.readFileSync(path.join(root, "generated", "noscript.html"), "utf8");

  html = replaceBetweenMarkers(html, "JSONLD", schema);
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

  const pages = [
    { path: "", lastmod: today, priority: "1.0" },
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

injectIndexHtml();
writeRobotsTxt();
writeSitemap();

console.log("Build complete: injected metadata into index.html, wrote robots.txt and sitemap.xml");
