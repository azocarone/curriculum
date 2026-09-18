import * as Utils from '@shared/utils/contact-helpers';
import { LABELS } from '@shared/i18n/labels';
import * as Templates from '@shared/ui/templates';

export function renderContact(profile, trans, lang = "es") {
    const headerContact = document.getElementById("contact");
    if (!headerContact || !profile || !trans) return;

    const fields = Utils.prepareContactFields(profile, trans, LABELS, lang);

    const htmlContent = fields
        .map(f => Templates.createContactItem(f.key, f.label, f.content))
        .join("");

    headerContact.innerHTML = `
        <h1 class="header__name" id="full_name">${profile.full_name}</h1>
        <address class="header__contact-address">${htmlContent}</address>
    `;
}