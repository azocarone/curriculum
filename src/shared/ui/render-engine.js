export function renderGroupedSection(containerId, groups, labels, itemRenderer) {
    const container = document.getElementById(containerId);
    if (!container || !groups) return;

    // Determina etiqueta y extra clase del título según el containerId
    const isSkills = containerId === "skills";
    const tag = isSkills ? "h3" : "h2";
    const extraClass = isSkills ? " main__section-title--skills" : "";  

    container.innerHTML = Object.entries(groups).map(([slug, list]) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <${tag} class="main__section-title main__section-title--${slug}${extraClass}">
                    ${labels[slug] || slug}
                </${tag}>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${itemRenderer(list, slug)}
                </ul>
            </li>
        </ul>
    `).join("");
}