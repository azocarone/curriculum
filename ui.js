export const UI = {
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