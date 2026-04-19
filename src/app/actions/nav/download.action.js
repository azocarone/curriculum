import { printCV } from '@shared/ui/print/print.service';

export function downloadAction(ctx, _, __) {
    const fullName = ctx.full_name;
    const lang = ctx.getLang();

    printCV(fullName, lang);
}
