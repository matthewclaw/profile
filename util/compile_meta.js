const fs = require("fs");
const data = require("../assets/data/data.json");

const name = "Matthew Law";
const title = "Senior Software Engineer";

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
    image: "https://matthewclaw.github.io/profile/assets/img/matthew-law.png",
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

fs.writeFileSync(
  "./generated/schema.jsonld",
  JSON.stringify(generateJsonLd(), null, 2)
);
fs.writeFileSync("./generated/resume.md", generateMarkdown());
