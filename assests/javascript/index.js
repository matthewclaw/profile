
const portfolioData = {
    "skills": [
        { "name": "C# / .NET", "percentage": 100 },
        { "name": "System Architecture", "percentage": 95 },
        { "name": "API & Web Security", "percentage": 80 },
        { "name": "Multi-Tenant Design", "percentage": 75 },
        { "name": "TypeScript / Node.js", "percentage": 65 },
        { "name": "Unit Testing", "percentage": 90 }
    ],
    "clients": [
        {
            "name": "JSE",
            "logoUrl": "https://media.licdn.com/dms/image/v2/D4D0BAQFvHZNpU5vKMA/company-logo_200_200/company-logo_200_200/0/1688365299951/jse_limited_logo?e=1770854400&v=beta&t=UiAYKz7bDWzxAHbLAh6uuW_kxoNAz4c8XYiOuF0nvQM",
            "workDescription": "Assisted with improving integrations into Custodial and Broker-Back Offices."
        },
        {
            "name": "Absa",
            "logoUrl": "https://media.licdn.com/dms/image/v2/D4E0BAQHA1Ml0Wm71KA/company-logo_200_200/company-logo_200_200/0/1726123010716/absa_logo?e=1770854400&v=beta&t=WaRvRv9d8TwBAypCom2298-FYpglLUjYnCi_pnHBYN8",
            "workDescription": "Collaborated within the Corporate and Investment Banking (CIB) space, focusing on corporate client UX and integration."
        },
        {
            "name": "Computicket",
            "logoUrl": "https://media.licdn.com/dms/image/v2/C4D0BAQE6gXgVBoBJGg/company-logo_200_200/company-logo_200_200/0/1630554922808/computicket_logo?e=1770854400&v=beta&t=IPTO8z2Pm1-SQsNpOhJ9B6Daykyvk0Ib9NRbYoMIP4w",
            "workDescription": "Collaborated with their own development team to introduce the microservice architecture to the company."
        },
        {
            "name": "Standard Bank",
            "logoUrl": "https://media.licdn.com/dms/image/v2/C4D0BAQEMo-EgURgpnA/company-logo_200_200/company-logo_200_200/0/1630561374295/standard_bank_group_logo?e=1770854400&v=beta&t=RjSX0pdRRjn_aki6-IG3Hnp7HIT0RJj0TbocF0UZXnI",
            "workDescription": "Collaborated within the Corporate and Investment Banking (CIB) space, focusing on high-performance financial service integration."
        },
        {
            "name": "LibFin/Liberty",
            "logoUrl": "https://media.licdn.com/dms/image/v2/C4D0BAQGI7Dwsb5RGHA/company-logo_200_200/company-logo_200_200/0/1630522470672?e=1770854400&v=beta&t=-bUQVA3rAURspdzG99g5aN_4WAnZ5S-K5iyXodKnW-E",
            "workDescription": "Was part of the modernization team, focusing on improving performance, security and improving CI/CD."
        },
    ],
    "experience": [
        {
            "period": "2022.06 — Present",
            "title": "Senior Software Engineer",
            "company": "Entelect",
            "tech": ["C#", ".NET 8", "Architecture", "Mentorship"],
            "description": [
                "Ownership of C#/.NET backend systems and APIs for enterprise clients.",
                "Designed multi-tenant, extensible architectures and modernised legacy platforms.",
                "Mentoring engineers on code quality and best practices."
            ]
        },
        {
            "period": "2020.03 — 2022.05",
            "title": "Software Engineer + Mentor",
            "company": "Dariel",
            "tech": [".NET", "React", "Fullstack"],
            "description": [
                "Delivered full-stack solutions across multiple client projects.",
                "Provided one-on-one mentorship to junior engineers via formal programmes."
            ]
        },
        {
            "period": "2015.12 — 2020.02",
            "title": "Junior to Intermediate Developer",
            "company": "STT",
            "tech": ["Financial Systems", "C#", "SQL"],
            "description": [
                "Built production financial systems in regulated, high-reliability environments.",
                "Supported live market and custodial platforms."
            ]
        }
    ],
    "projects": [
        {
            "title": "D&D Campaign Manager",
            "description": "Real-time initiative tracking and monster stat manager for tabletop sessions.",
            "tech": ["SignalR", "React", ".NET"],
            "status": "public"
        },
        {
            "title": "API Framework Boilerplate",
            "description": "Multi-tenant architectural template for rapid secure API development.",
            "tech": ["EF Core", "Docker", "Swagger"],
            "status": "public"
        }
    ],
    "hobbies": [
        { "name": "Dungeons & Dragons", "icon": "fa-dice-d20" },
        { "name": "Side Projects", "icon": "fa-code" },
        { "name": "Video Games", "icon": "fa-gamepad" },
        { "name": "Reading", "icon": "fa-book-open" }
    ],
    "contact_links": [
        { "name": "Email", "icon": "fa-at", "link": "mailto:Matthew.mcsd@gmail.com" },
        { "name": "LinkedIn", "icon": "fa-linkedin", "link": "https://www.linkedin.com/in/matthew-c-law/" },
        { "name": "GitHub", "icon": "fa-github", "link": "https://github.com/matthewclaw" },
        { "name": "Phone", "icon": "fa-whatsapp", "link": "tel:+27763879572" }
    ]
};

function renderPortfolio() {
    populateExperience();
    populateClients();
    populateSkills();
    // Projects

    // Hobbies
    const hobbiesContainer = document.getElementById('hobbies-container');
    hobbiesContainer.innerHTML = portfolioData.hobbies.map(hobby => `
                <div class="section-fade flex flex-col items-center justify-center p-4 bg-[#252526] border border-[#333] rounded hover:border-cyan-500/50 transition-all group">
                    <i class="fas ${hobby.icon} text-2xl mb-3 text-cyan-400 group-hover:scale-110 transition-transform"></i>
                    <span class="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors text-center">${hobby.name}</span>
                </div>
            `).join('');

    // Contact Links
    const contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = portfolioData.contact_links.map(item => `
                <a href="${item.link}" target="_blank" class="section-fade flex items-center gap-3 px-6 py-3 bg-[#252526] border border-[#333] rounded hover:border-blue-500 transition-all group">
                    <i class="fab fa-light ${item.icon} text-xl text-blue-400 group-hover:scale-110 transition-transform"></i>
                    <span class="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">${item.name}</span>
                </a>
            `).join('');
    setupObserver();
}

function populateExperience() {
    const expContainer = document.getElementById('experience-container');
    expContainer.innerHTML = portfolioData.experience.map(item => `
                <div class="section-fade border-l-2 border-[#333] pl-6 relative">
                    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#1a1a1a]"></div>
                    <span class="token-comment text-xs">${item.period}</span>
                    <h4 class="text-lg font-bold text-white mt-1">${item.title} <span class="text-[#444]">@</span> ${item.company}</h4>
                    <ul class="mt-4 space-y-2 text-sm text-slate-400">
                        ${item.description.map(line => `<li>- ${line}</li>`).join('')}
                    </ul>
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${item.tech.map(t => `<span class="text-[10px] px-2 py-0.5 bg-[#333] rounded text-blue-400">${t}</span>`).join('')}
                    </div>
                </div>
            `).join('');
}

function populateClients() {
    const clientsContainer = document.getElementById('clients-container');
    clientsContainer.innerHTML = portfolioData.clients.map(client => `
                <div class="section-fade p-6 bg-[#252526] border border-[#333] flex items-center gap-4 hover:bg-[#2a2d2e] transition-colors">
                    <div class="w-12 h-12 bg-white rounded flex items-center justify-center p-1 shrink-0 opacity-80 grayscale hover:grayscale-0">
                        <img src="${client.logoUrl}" alt="${client.name}" style="object-fit:cover" class="max-h-full object-fit" onerror="this.src='https://via.placeholder.com/50?text=Logo'">
                    </div>
                    <div>
                        <h4 class="font-bold text-white text-sm">${client.name}</h4>
                        <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">${client.workDescription}</p>
                    </div>
                </div>
            `).join('');

}

function populateSkills() {
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = portfolioData.skills.map(skill => `
                <div class="section-fade">
                    <div class="flex justify-between text-xs mb-2">
                        <span class="token-type">${skill.name}</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-fill" data-width="${skill.percentage}%"></div>
                    </div>
                </div>
            `).join('');
}

function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = portfolioData.projects.map(proj => `
                <div class="section-fade p-6 bg-[#252526] border border-[#333] hover:border-blue-500/50 transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <i class="fas fa-folder text-yellow-500 text-2xl"></i>
                        <span class="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">${proj.status}</span>
                    </div>
                    <h4 class="font-bold text-white mb-2">${proj.title}</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">${proj.description}</p>
                    <div class="text-[10px] opacity-60 flex gap-4">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
            `).join('');
}

function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const bars = entry.target.querySelectorAll('.progress-fill');
                bars.forEach(bar => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, 100);
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade').forEach(el => observer.observe(el));
}

document.querySelectorAll('aside a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('aside a').forEach(a => a.classList.remove('sidebar-active'));
        this.classList.add('sidebar-active');
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});

window.onload = renderPortfolio;
