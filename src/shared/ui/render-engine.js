export function renderGroupedSection(containerId, groups, labels, itemRenderer) {
    const container = document.getElementById(containerId);
    if (!container || !groups) return;

    container.innerHTML = Object.entries(groups).map(([slug, list]) => `
        <ul class="main__section-list">
            <li class="main__section-item">
                <h2 class="main__section-title main__section-title--${slug}">
                    ${labels[slug] || slug}
                </h2>
                <ul class="main__section-sublist main__section-sublist--flex">
                    ${itemRenderer(list, slug)}
                </ul>
            </li>
        </ul>
    `).join("");
}