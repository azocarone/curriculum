export const UI = {
    renderHeader(profile, trans) {
        return `
            <h1>${profile.full_name}</h1>
            <p>${trans.location} | ${profile.phone} | ${profile.email}</p>
            <a href="https://${profile.website}" target="_blank">${profile.website}</a>
        `;
    },

    renderSummary(summaryObj) {
        const t = summaryObj?.summaries_translations[0];
        if (!t) return '';
        return `<h2>${t.label}</h2><p>${t.content}</p>`;
    },

    renderExperience(experiences) {
        const items = experiences.map(exp => {
            const t = exp.experiences_translations[0];
            const resps = exp.responsibilities
                .map(r => `<li>${r.responsibilities_translations[0].description}</li>`)
                .join('');
            
            const startYear = new Date(exp.start_date).getFullYear();
            const endYear = exp.end_date ? new Date(exp.end_date).getFullYear() : 'Presente';

            return `
                <div class="item">
                    <h3>${t.position} @ ${exp.company}</h3>
                    <small>${startYear} - ${endYear} | ${t.location}</small>
                    <ul>${resps}</ul>
                </div>
            `;
        }).join('');
        return `<h2>Experiencia Laboral</h2>${items}`;
    },

    renderEducation(education) {
        const items = education.map(edu => {
            const t = edu.education_translations[0];
            const year = new Date(edu.end_date).getFullYear();
            return `<p><strong>${t.title}</strong> - ${t.institution} (${year})</p>`;
        }).join('');
        return `<h2>Educación</h2>${items}`;
    },

    renderSkills(skills) {
        const items = skills.map(s => `<li>${s.skill_translations[0].name}</li>`).join('');
        return `<h2>Habilidades</h2><ul class="skills-grid">${items}</ul>`;
    }
};