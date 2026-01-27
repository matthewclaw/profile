import {
    renderExperience, renderEducation, renderClients,
    renderSkills, renderProjects, renderHobbies,
    renderContactLinks,
    renderExperienceGit
} from './renderers.js'

async function renderPortfolio() {
    let portfolioData = await fetch('./assets/data/data.json').then(res => res.json());
    renderExperience(document.getElementById('experience-container'), portfolioData);
    renderEducation(document.getElementById('education-container'), portfolioData);
    renderClients(document.getElementById('clients-container'), portfolioData);
    renderSkills(document.getElementById('skills-container'), portfolioData);
    renderProjects(document.getElementById('projects-container'), portfolioData);
    renderHobbies(document.getElementById('hobbies-container'), portfolioData);
    renderContactLinks(document.getElementById('contact-container'), portfolioData);
    // TEMP
    renderExperienceGit(document.getElementById('experience-git-container'), portfolioData.experience);
    // TEMP
    setupObserver();
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
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('aside a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('aside div a').forEach(a => a.classList.remove('sidebar-active'));
            this.classList.add('sidebar-active');
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });
});
export function toggleTheme() {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};
window.onload = renderPortfolio;
window.toggleTheme = toggleTheme
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
}
