export function renderExperience(container, portfolioData, animate = true) {
    renderTimeline(container, portfolioData.experience.map(item => { return { ...item, description: item.details, at: item.company, what: item.role } }));
}

export function renderEducation(container, portfolioData) {
    renderTimeline(container, portfolioData.education.map(item => { return { ...item, at: item.institution, what: item.course } }));
}

export function renderTimeline(container, data, forCv) {
    container.innerHTML = data.map(item => {
        let tech = '';
        if (item.tech) {
            tech = `
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${item.tech.map(t => `<span class="text-[10px] px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2">${t}</span>`).join('')}
                    </div>
                    `;
        }
        return `
                <div class="${forCv ? 'cv-item' : 'section-fade'} border-l-2 border-gray-500/20 pl-6 relative no-break ${forCv ? 'pb-5' : ''}">
                    <div class="absolute -left-[5px] ${forCv ? 'top-[33px]' : 'top-0'} w-2 h-2 rounded-full bg-blue-600 border-blue-600 border-2"></div>
                    <span class="token-comment text-xs">// ${item.period}</span>
                    <h4 class="${forCv ? '' : 'text-lg mt-1'} font-bold">${item.what} <span class="opacity-30">@</span> ${item.at}</h4>
                    <ul class="mt-4 space-y-2 tl-desc text-sm text-slate-400">
                        ${item.description.map(line => `<li>- ${line}</li>`).join('')}
                    </ul>
                    ${tech}
                </div>
            `}).join('');
}

export function renderClients(container, portfolioData) {
    container.innerHTML = portfolioData.clients.map(client => `
                <div class="section-fade p-6 ide-card border flex items-center gap-4 hover:border-blue-500/50">
                    <div class="w-12 h-12 bg-white rounded flex items-center justify-center p-1 shrink-0">
                        <img src="${client.logoUrl}" alt="${client.name}" class="max-w-full max-h-full object-contain">
                    </div>
                    <div>
                        <h4 class="font-bold text-sm">${client.name}</h4>
                        <p class="text-[11px] opacity-60 mt-1">${client.workDescription}</p>
                    </div>
                </div>
            `).join('');

}

export function renderSkills(container, portfolioData) {
    container.innerHTML = portfolioData.skills.map(skill => `
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

export function renderProjects(container, portfolioData) {
    container.innerHTML = portfolioData.projects.map(proj => {
        let isPublic = proj.status === 'public';
        let tag = isPublic ? 'a' : 'div';
        return `
                <${tag} ${isPublic ? 'href="' + proj.url + '" target="_blank"' : ''} class="section-fade p-6 ide-card border ${isPublic ? 'hover:border-blue-500/50' : ''} transition-all duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <i class="fas fa-folder text-yellow-500 text-2xl"></i>
                        <span class="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">${proj.status}</span>
                    </div>
                    <h4 class="font-bold mb-2">${proj.title}${isPublic ? '<i class="fas fa-external-link-alt text-blue-400 ml-2"></i>' : ''}</h4>
                    <p class="text-xs text-slate-500 leading-relaxed mb-4">${proj.description}</p>
                    <div class="text-[10px] opacity-60 flex gap-4">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </${tag}>
            `}).join('');
}

export function renderHobbies(container, portfolioData) {
    container.innerHTML = portfolioData.hobbies.map(hobby => `
                <div class="section-fade flex flex-col items-center justify-center p-4 ide-card border rounded hover:border-blue-500/50 transition-all group">
                    <i class="fas ${hobby.icon} text-2xl mb-3 token-type group-hover:scale-110 transition-transform"></i>
                    <span class="text-[10px] uppercase tracking-wider opacity-60 text-center">${hobby.name}</span>
                </div>
            `).join('');
}

export function renderContactLinks(container, portfolioData) {
    container.innerHTML = portfolioData.contact_links
        .filter(item => item.type !== 'profile')
        .map(item => {
            let link = item.link;
            if (item.type === 'email') {
                link = `mailto:${link}`;
            } else if (item.type === 'phone') {
                link = `tel:${link.replace(/\s/g, '')}`;
            }
            return `
                <a href="${link}" target="_blank" style="width:140px" class="section-fade flex items-center gap-3 px-6 py-3 ide-card border rounded hover:border-blue-500 transition-all group">
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

export function renderTechnologies(container, experience) {
    let techHash = new Set(experience.flatMap(item => item.tech));
    container.innerHTML = Array.from(techHash).map(t => `<span class="inline-block text-xs px-2 py-0.5 bg-gray-500/10 rounded token-type border-gray-500/10 border-2 mr-2 mb-1">${t}</span>`).join('');
}