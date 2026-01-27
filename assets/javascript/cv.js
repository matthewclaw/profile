import {
    renderExperienceCV,
    renderEducationCV,
    renderSkillsCV,
    renderHobbiesCV,
    renderContactsCV,
    renderTechnologies
} from './renderers.js';

async function initCV() {
    const data = await loadPortfolioData();

    renderContactsCV(
        document.getElementById('cv-contacts'),
        data.contact_links
    );

    renderExperienceCV(
        document.getElementById('cv-experience'),
        data.experience
    );

    renderTechnologies(
        document.getElementById('cv-tech'),
        data.experience
    );

    renderEducationCV(
        document.getElementById('cv-education'),
        data.education
    );

    renderSkillsCV(
        document.getElementById('cv-skills'),
        data.skills
    );

    renderHobbiesCV(
        document.getElementById('cv-hobbies'),
        data.hobbies
    );
}

window.onload = initCV;

function loadPortfolioData() {
    return fetch('./assets/data/data.json').then(res => res.json());
}
