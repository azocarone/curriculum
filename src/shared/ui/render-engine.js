/**
 * Renderiza una sección estructurada con subgrupos dinámicos.
 * @param {string} containerId - ID del elemento contenedor en el DOM.
 * @param {Object} groups - Objeto con los datos agrupados por clave (slug).
 * @param {Object} [labels={}] - Diccionario para mapear las claves a títulos legibles.
 * @param {Function} itemRenderer - Callback para renderizar los elementos de cada sublista.
 * @param {Object} [options={}] - Opciones opcionales de configuración.
 */

const CLASS_MODIFIERS = {
  skills: { 
    list: "", 
    subList: " main__section-sublist--flex" 
  },
  education: { 
    list: " main__section-list--clean", 
    subList: "" 
  }
};

const SLUG_CLASS_MODIFIERS = {
  certifications: " main__section-sublist--certifications"
};

export function renderGroupedSection(containerId, groups, labels = {}, itemRenderer, options = {}) {
    const container = document.getElementById(containerId);
    if (!container || !groups) return;

    const {
        headingTag = "h2",
        titleClass = "main__section-title",
        wrapperClass = "",
        sectionTitle = ""
    } = options;

    const safeLabels = labels || {};

    const { list: listClassModifier, subList: subListClassModifier } =
        CLASS_MODIFIERS[containerId] ?? { list: "", subList: "" };

    // Generación del HTML para cada grupo/categoría
    const itemsHtml = Object.entries(groups).map(([slug, list]) => {
        const slugSubListModifier = SLUG_CLASS_MODIFIERS[slug] ?? "";
        
        return `
        <ul class="main__section-list${listClassModifier}">
            <li class="main__section-item">
                <${headingTag} class="${titleClass ? `${titleClass}` : ''} main__section-title--${slug}">
                    ${safeLabels[slug] || slug}
                </${headingTag}>
                <ul class="main__section-sublist${subListClassModifier}${slugSubListModifier}">
                    ${itemRenderer(list, slug)}
                </ul>
            </li>
        </ul>
    `}).join("");

    const innerContent = wrapperClass
        ? `<div class="${wrapperClass}">${itemsHtml}</div>`
        : itemsHtml;

    // Si se provee sectionTitle, inyecta todo de una sola vez sin insertAdjacentHTML
    if (sectionTitle) {
        const titleHtml = `<h2 class="main__section-title main__section-title--${containerId}">${sectionTitle}</h2>\n`;
        container.innerHTML = titleHtml + innerContent;
    } else {
        container.innerHTML = innerContent;
    }
}