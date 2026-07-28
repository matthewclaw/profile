const fs = require("fs");
const data = require("../assets/data/data.json");

const name = "Matthew Law";
const title = "Senior Software Engineer";

// ------------------------
// NOSCRIPT GENERATION
// ------------------------

function generateNoScript() {
  const skills = data.skills.map(s => `<li>${s.name}</li>`).join("");

  const experience = data.experience.map(exp => `
    <h3>${exp.company} — ${exp.role} (${exp.period})</h3>
    <ul>
      ${exp.summary.map(s => `<li>${s}</li>`).join("")}
    </ul>
  `).join("");

  const education = data.education.map(edu => `
    <h3>${edu.course} — ${edu.institution}</h3>
    <p>${edu.period}</p>
  `).join("");

  const blogPosts = data.scratchpad?.blog || [];
  const linkedinPosts = data.scratchpad?.linkedin || [];
  const scratchpad = (blogPosts.length || linkedinPosts.length) ? `
<h2>Scratchpad</h2>
${blogPosts.length ? `<h3>Blog</h3>
<ul>${blogPosts.map(p => `<li><a href="${p.url}">${p.title}</a> — ${p.tagline}</li>`).join("")}</ul>` : ""}
${linkedinPosts.length ? `<h3>LinkedIn</h3>
<ul>${linkedinPosts.map(p => `<li><a href="${p.url}">${p.title}</a> — ${p.tagline}</li>`).join("")}</ul>` : ""}
` : "";

  return `
<h1>${name}</h1>
<p>${title}</p>

<h2>Skills</h2>
<ul>${skills}</ul>

<h2>Experience</h2>
${experience}

<h2>Education</h2>
${education}
${scratchpad}
`;
}

// ------------------------
// JSON-LD GENERATION
// ------------------------

function generateJsonLd() {
  const email = data.contact_links.find(c => c.type === "email")?.link;
  const phone = data.contact_links.find(c => c.type === "phone")?.link;

  const links = data.contact_links
    .filter(c => c.type === "url" || c.type === "profile")
    .map(c => c.link);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: title,
    image: "https://matthewclaw.github.io/profile/assets/img/matthew-law.jpg",
    email,
    telephone: phone,
    sameAs: links,
    knowsAbout: data.skills.map(s => s.name),
    worksFor: {
      "@type": "Organization",
      name: data.experience[0]?.company
    }
  };
}

// ------------------------
// MARKDOWN GENERATION
// ------------------------

function generateMarkdown() {
  return `# ${name}

## ${title}

## Skills
${data.skills.map(s => `- ${s.name}`).join("\n")}

## Experience
${data.experience.map(exp => `
### ${exp.company} — ${exp.role} (${exp.period})
${exp.summary.map(s => `- ${s}`).join("\n")}
`).join("\n")}

## Education
${data.education.map(edu => `
### ${edu.course} — ${edu.institution}
${edu.period}
`).join("\n")}
`;
}

// ------------------------
// WRITE FILES
// ------------------------

fs.mkdirSync("./generated", { recursive: true });

fs.writeFileSync("./generated/noscript.html", generateNoScript());
fs.writeFileSync(
  "./generated/schema.jsonld",
  JSON.stringify(generateJsonLd(), null, 2)
);
fs.writeFileSync("./generated/resume.md", generateMarkdown());
