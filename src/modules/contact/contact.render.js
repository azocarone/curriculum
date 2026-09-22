import * as Utils from '@shared/utils/contact-helpers';
import { LABELS } from '@shared/i18n/labels';
import * as Templates from '@shared/ui/templates';

export function renderContact(contact, lang = "es") {
    const headerContact = document.getElementById("contact");
    if (!headerContact || !contact) return;

    const fields = Utils.prepareContactFields(contact, LABELS, lang);

    const htmlContent = fields
        .map(f => Templates.createContactItem(f.key, f.label, f.content))
        .join("");

    headerContact.innerHTML = `
        <h1 class="header__name" id="full_name">${contact.full_name}</h1>
        <p><strong>${contact.title}</strong></p> 
        <address class="header__contact-address">${htmlContent}</address>
    `;
}