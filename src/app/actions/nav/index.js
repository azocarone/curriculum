import { downloadAction } from '@app/actions/nav/download.action.js';
import { themeAction } from '@app/actions/nav/theme.action.js';
import { langAction } from '@app/actions/nav/lang.action.js';
import { navAction } from '@/app/actions/nav/nav.action.js';

export const navActions = {
    download: downloadAction,
    theme: themeAction,
    lang: langAction,
    nav: navAction
};