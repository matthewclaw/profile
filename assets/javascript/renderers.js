export function renderExperience(container, portfolioData, animate = true) {
    // Consecutive roles at the same company collapse into one branch, so six
    // roles read as three companies instead of six jobs.
    const branches = [];
    portfolioData.experience.forEach(item => {
        const current = branches[branches.length - 1];
        if (current && current.company === item.company) current.roles.push(item);
        else branches.push({ company: item.company, roles: [item] });
    });

    // Entries are newest-first, so the branch spans the last role's start to
    // the first role's end.
    const start = period => period.split('–')[0].trim();
    const end = period => period.split('–').pop().trim();

    // Left the company => the branch merges back into main. Still there => it
    // stays open.
    const merged = branch => end(branch.roles[0].period) !== 'Present';

    container.innerHTML = branches.map((branch, bi) => `
                <div class="git-branch ${merged(branch) ? 'git-branch-merged' : ''} ${animate ? 'section-fade' : ''}">
                    ${merged(branch) ? '<div class="git-join git-join-merge"></div>' : ''}
                    <div class="git-branch-head">
                        <h3 class="font-bold text-lg">${branch.company}</h3>
                        <span class="token-comment text-xs">// ${start(branch.roles[branch.roles.length - 1].period)} – ${end(branch.roles[0].period)} · ${branch.roles.length} role${branch.roles.length > 1 ? 's' : ''}</span>
                    </div>
                    ${branch.roles.map((role, ri) => `
                    <div class="git-commit no-break">
                        <span class="token-comment text-xs">// ${role.period}</span>
                        <h4 class="font-bold mt-1">${role.role}</h4>
                        <ul class="mt-3 space-y-2 text-sm text-slate-400">
                            ${role.details.map(line => `<li>- ${line}</li>`).join('')}
                        </ul>
                        <div class="flex flex-wrap gap-2 mt-4">
                            ${role.tech.map(t => `<span class="text-[10px] px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2">${t}</span>`).join('')}
                        </div>
                    </div>`).join('')}
                    <div class="git-join git-join-fork"></div>
                </div>
            `).join('');
}

export function renderTimeline(container, data, forCv, animate) {
    container.innerHTML = data.map(item => {
        let tech = '';
        if (item.tech) {
            tech = `
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${item.tech.map(t => `<span class="text-[10px] px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2">${t}</span>`).join('')}
                    </div>
                    `;
        }
        const mainClass = forCv ? 'cv-item' : animate ? 'section-fade' : '';
        return `
                <div class="${mainClass} border-l-2 border-gray-500/20 pl-6 relative no-break ${forCv ? 'pb-5' : ''}">
                    <div class="absolute -left-[5px] ${forCv ? 'top-[33px]' : 'top-0'} w-2 h-2 rounded-full bg-blue-600 border-blue-600 border-2"></div>
                    <span class="token-comment text-xs">// ${item.period}</span>
                    <h3 class="${forCv ? '' : 'text-lg mt-1'} font-bold">${item.what} <span class="opacity-30">@</span> ${item.at}</h3>
                    <ul class="mt-4 space-y-2 tl-desc text-sm text-slate-400">
                        ${item.description.map(line => `<li>- ${line}</li>`).join('')}
                    </ul>
                    ${tech}
                </div>
            `}).join('');
}

export function renderClients(container, portfolioData, animate = true) {
    container.innerHTML = portfolioData.clients.map(client => `
                <a href="${client.url}" target="_blank" class="${animate ? 'section-fade' : ''} p-6 ide-card border flex items-center gap-4 hover:border-blue-500/50">
                    <div class="w-12 h-12 bg-white rounded flex items-center justify-center p-1 shrink-0">
                        <img src="${client.logoUrl}" alt="${client.name}" width="48" height="48" class="max-w-full max-h-full object-contain">
                    </div>
                    <div>
                        <h3 class="font-bold text-sm">${client.name}</h3>
                        <p class="text-[11px] opacity-60 mt-1">${client.workDescription}</p>
                    </div>
                </a>
            `).join('');

}

export function renderProjects(container, portfolioData, animate = true) {
    container.innerHTML = portfolioData.projects.map(proj => {
        let isPublic = proj.status === 'public';
        let tag = isPublic ? 'a' : 'div';
        return `
                <${tag} ${isPublic ? 'href="' + proj.url + '" target="_blank"' : ''} class="${animate ? 'section-fade' : ''} p-6 ide-card border ${isPublic ? 'hover:border-blue-500/50' : ''} transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <i class="fas fa-folder text-yellow-500 text-2xl"></i>
                        <span class="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">${proj.status}</span>
                    </div>
                    <h3 class="font-bold mb-2">${proj.title}${isPublic ? '<i class="fas fa-external-link-alt text-blue-400 ml-2"></i>' : ''}</h3>
                    <p class="text-xs text-slate-400 leading-relaxed mb-4">${proj.description}</p>
                    <div class="text-[10px] opacity-60 flex gap-4">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </${tag}>
            `}).join('');
}

export function renderHobbies(container, portfolioData, animate = true) {
    container.innerHTML = portfolioData.hobbies.map(hobby => `
                <div class="${animate ? 'section-fade' : ''} flex flex-col items-center justify-center p-4 ide-card border rounded hover:border-blue-500/50 transition-all group">
                    <i class="fas ${hobby.icon} text-2xl mb-3 token-type group-hover:scale-110 transition-transform"></i>
                    <span class="text-[10px] uppercase tracking-wider opacity-60 text-center">${hobby.name}</span>
                </div>
            `).join('');
}

// Homepage shows the latest few posts only. The LinkedIn entries and the full
// archive live on /scratchpad, so this renders blog posts and nothing else.
export function renderScratchpad(container, portfolioData, animate = true, { limit } = {}) {
    const entries = portfolioData.scratchpad?.blog || [];
    const shown = typeof limit === 'number' ? entries.slice(0, limit) : entries;
    container.innerHTML = shown.map(entry => `
                <a href="${entry.url}" class="${animate ? 'section-fade' : ''} h-full flex flex-col p-6 ide-card border hover:border-blue-500/50 transition-all duration-300">
                    <div class="flex justify-between items-start mb-3">
                        <i class="fas fa-file-lines text-blue-400"></i>
                        <span class="text-[10px] opacity-50 uppercase">${entry.date}</span>
                    </div>
                    <h4 class="font-bold mb-2">${entry.title}</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">${entry.tagline}</p>
                    ${entry.lesson ? `<p class="text-xs token-comment mt-auto pt-4"><span class="font-bold">// LESSON:</span> ${entry.lesson}</p>` : ''}
                </a>
            `).join('');
}

export function renderContactLinks(container, portfolioData, animate = true) {
    container.innerHTML = portfolioData.contact_links
        .filter(item => item.type !== 'profile' && item.type !== 'phone')
        .map(item => {
            let link = item.link;
            if (item.type === 'email') {
                link = `mailto:${link}`;
            }
            return `
                <a href="${link}" target="_blank" style="width:140px" class="${animate ? 'section-fade' : ''} flex items-center gap-3 px-6 py-3 ide-card border rounded hover:border-blue-500 transition-all group">
                    <i class="fab ${item.icon} text-xl text-blue-400"></i>
                    <span class="text-sm font-medium opacity-70 group-hover:opacity-100">${item.name}</span>
                </a>
            `}).join('');
}

export function renderExperienceCV(container, experience) {
    renderTimeline(container, experience.map(item => { return { ...item, description: item.summary, at: item.company, what: item.role } }), true);
}

export function renderEducationCV(container, education) {
    renderTimeline(container, education.map(item => { return { ...item, at: item.institution, what: item.course } }), true);
}

export function renderSkillsCV(container, skills) {
    container.innerHTML = skills
        .map(s => `<span class="inline-block text-xs px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2 mr-2 mb-1">${s.name}</span>`)
        .join('');
}

export function renderHobbiesCV(container, hobbies) {
    container.innerHTML = hobbies
        .map(h => `<span class="inline-block text-xs px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2 mr-2 mb-1">${h.name}</span>`)
        .join('');
}

export function renderContactsCV(container, contact_links) {
    container.innerHTML = contact_links
        .map(h => `<div class="mb-1"><p class="text-xs token-comment">// ${h.name}</p>
        <p class="text-xs">${h.link}</p></div>`)
        .join('');
}

export function renderTechnologiesCv(container, experience) {
    container.innerHTML = getTechnologies(experience).map(t => `<span class="inline-block text-xs px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2 mr-2 mb-1">${t}</span>`).join('');
}

function getTechnologies(experience) {
    let techHash = new Set(experience.flatMap(item => item.tech));
    return Array.from(techHash);
}