const fs = require("fs");
const path = require("path");
const renderers = require("./renderers.js");

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
// RENDER DYNAMIC SECTIONS INTO index.html AND cv.html
// ------------------------
// Same renderers the browser used to run on page load, now baked in here so
// the deployed page already has real content -- no client fetch/render pass,
// so crawlers and no-JS visitors see the page as it actually reads.
// index.js keeps only progressive enhancement (theme, nav, scroll-reveal);
// cv.js is gone, since cv.html has nothing left for it to do.

function renderPages() {
  const data = JSON.parse(fs.readFileSync(path.join(root, "assets", "data", "data.json"), "utf8"));

  const indexPath = path.join(root, "index.html");
  let indexHtml = fs.readFileSync(indexPath, "utf8");
  indexHtml = replaceBetweenMarkers(indexHtml, "EXPERIENCE", renderers.renderExperience(data));
  indexHtml = replaceBetweenMarkers(indexHtml, "CLIENTS", renderers.renderClients(data));
  indexHtml = replaceBetweenMarkers(indexHtml, "CREDENTIALS", renderers.renderCredentials(data));
  indexHtml = replaceBetweenMarkers(indexHtml, "HOBBIES", renderers.renderHobbies(data));
  indexHtml = replaceBetweenMarkers(indexHtml, "PROJECTS", renderers.renderProjects(data));
  indexHtml = replaceBetweenMarkers(indexHtml, "SCRATCHPAD", renderers.renderScratchpad(data, { limit: 2 }));
  indexHtml = replaceBetweenMarkers(indexHtml, "CONTACT", renderers.renderContactLinks(data));
  fs.writeFileSync(indexPath, indexHtml);

  const cvPath = path.join(root, "cv.html");
  let cvHtml = fs.readFileSync(cvPath, "utf8");
  cvHtml = replaceBetweenMarkers(cvHtml, "CV_EXPERIENCE", renderers.renderExperienceCV(data.experience));
  cvHtml = replaceBetweenMarkers(cvHtml, "CV_EDUCATION", renderers.renderEducationCV(data.education));
  cvHtml = replaceBetweenMarkers(cvHtml, "CV_SKILLS", renderers.renderSkillsCV(data.skills));
  cvHtml = replaceBetweenMarkers(cvHtml, "CV_TECH", renderers.renderTechnologiesCv(data.experience));
  cvHtml = replaceBetweenMarkers(cvHtml, "CV_HOBBIES", renderers.renderHobbiesCV(data.hobbies));
  cvHtml = replaceBetweenMarkers(cvHtml, "CV_CONTACTS", renderers.renderContactsCV(data.contact_links));
  fs.writeFileSync(cvPath, cvHtml);
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
    { path: "scratchpad/index.html", lastmod: latestScratchpadDate, priority: "0.9" },
    ...(data.scratchpad?.blog || []).map(post => ({
      path: post.url,
      lastmod: post.date,
      priority: "0.8",
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

renderPages();
injectIndexHtml(process.argv.includes("--debug"));
writeRobotsTxt();
writeSitemap();

console.log("Build complete: rendered dynamic sections, injected metadata into index.html, wrote robots.txt and sitemap.xml");
